#!/usr/bin/env node

/**
 * Scraper Web vers Markdown
 * Extrait le contenu des sites web et le convertit en Markdown
 * Préserve l'arborescence du site original
 */

const https = require('https');
const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const { URL } = require('url');

// Configuration
const config = {
  baseUrl: process.argv[2] || 'https://example.com',
  maxDepth: parseInt(process.argv[3]) || 3,
  maxPages: parseInt(process.argv[4]) || 50,
  outputDir: './scraped_content',
  delay: 1000, // Délai entre les requêtes (ms)
  includeImages: true,
  includeLinks: true
};

// Ensemble des URLs visitées
const visited = new Set();
const results = [];

/**
 * Fait une requête HTTP/HTTPS
 */
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;

    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ScraperBot/1.0)',
        'Accept': 'text/html,application/xhtml+xml'
      },
      timeout: 10000
    };

    client.get(url, options, (res) => {
      let data = '';

      // Gérer les redirections
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchUrl(res.headers.location));
      }

      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode}`));
      }

      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject).on('timeout', () => reject(new Error('Timeout')));
  });
}

/**
 * Convertit HTML en Markdown basique
 */
function htmlToMarkdown(html, pageUrl) {
  let markdown = html;

  // Extraire le titre
  const titleMatch = markdown.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : 'Sans titre';

  // Supprimer les éléments non désirés
  markdown = markdown
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');

  // Convertir les headings
  markdown = markdown.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '\n# $1\n');
  markdown = markdown.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n');
  markdown = markdown.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n');
  markdown = markdown.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n#### $1\n');
  markdown = markdown.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '\n##### $1\n');
  markdown = markdown.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '\n###### $1\n');

  // Convertir les paragraphes
  markdown = markdown.replace(/<p[^>]*>(.*?)<\/p>/gi, '\n$1\n');

  // Convertir les listes
  markdown = markdown.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');
  markdown = markdown.replace(/<ul[^>]*>/gi, '\n');
  markdown = markdown.replace(/<\/ul>/gi, '\n');
  markdown = markdown.replace(/<ol[^>]*>/gi, '\n');
  markdown = markdown.replace(/<\/ol>/gi, '\n');

  // Convertir les liens
  if (config.includeLinks) {
    markdown = markdown.replace(/<a[^>]+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi, (match, href, text) => {
      // Convertir les liens relatifs en absolus
      try {
        const absoluteUrl = new URL(href, pageUrl).href;
        return `[${text}](${absoluteUrl})`;
      } catch (e) {
        return text;
      }
    });
  } else {
    markdown = markdown.replace(/<a[^>]*>(.*?)<\/a>/gi, '$1');
  }

  // Convertir les images
  if (config.includeImages) {
    markdown = markdown.replace(/<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi, '![$2]($1)');
    markdown = markdown.replace(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi, '![Image]($1)');
  } else {
    markdown = markdown.replace(/<img[^>]*>/gi, '');
  }

  // Convertir le gras et italique
  markdown = markdown.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
  markdown = markdown.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
  markdown = markdown.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
  markdown = markdown.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');

  // Convertir les blocs de code
  markdown = markdown.replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gis, '\n```\n$1\n```\n');
  markdown = markdown.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');

  // Convertir les citations
  markdown = markdown.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, (match, content) => {
    return '\n> ' + content.trim().replace(/\n/g, '\n> ') + '\n';
  });

  // Convertir les sauts de ligne
  markdown = markdown.replace(/<br\s*\/?>/gi, '\n');
  markdown = markdown.replace(/<hr\s*\/?>/gi, '\n---\n');

  // Supprimer tous les autres tags HTML
  markdown = markdown.replace(/<[^>]+>/g, '');

  // Décoder les entités HTML
  markdown = markdown
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–');

  // Nettoyer les espaces multiples et les lignes vides excessives
  markdown = markdown
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();

  return { title, markdown };
}

/**
 * Extrait les liens d'une page HTML
 */
function extractLinks(html, baseUrl) {
  const links = [];
  const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi;
  let match;

  while ((match = linkRegex.exec(html)) !== null) {
    try {
      let href = match[1];

      // Ignorer les ancres, mailto, tel, etc.
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
        continue;
      }

      // Convertir en URL absolue
      let absoluteUrl;
      if (href.startsWith('http')) {
        absoluteUrl = href;
      } else if (href.startsWith('/')) {
        absoluteUrl = new URL(href, baseUrl).href;
      } else {
        absoluteUrl = new URL(href, baseUrl).href;
      }

      const linkUrl = new URL(absoluteUrl);
      const baseUrlObj = new URL(baseUrl);

      // Seulement les liens du même domaine
      if (linkUrl.hostname === baseUrlObj.hostname) {
        links.push(absoluteUrl);
      }
    } catch (e) {
      // Ignorer les URLs invalides
    }
  }

  return [...new Set(links)]; // Supprimer les doublons
}

/**
 * Attend un certain temps
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Génère un nom de fichier à partir de l'URL
 */
function urlToFilename(url) {
  const urlObj = new URL(url);
  let pathname = urlObj.pathname;

  // Supprimer le slash final
  if (pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }

  // Si c'est la racine, utiliser index
  if (!pathname || pathname === '/') {
    return 'index.md';
  }

  // Remplacer les slashes par des underscores et ajouter .md
  const filename = pathname.replace(/^\//, '').replace(/\//g, '_') + '.md';
  return filename;
}

/**
 * Obtient le chemin de dossier pour une URL
 */
function urlToPath(url) {
  const urlObj = new URL(url);
  let pathname = urlObj.pathname;

  // Supprimer le slash final
  if (pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }

  // Diviser le chemin
  const parts = pathname.split('/').filter(p => p);

  if (parts.length === 0) {
    return { category: 'root', subcategories: [] };
  }

  return {
    category: parts[0],
    subcategories: parts.slice(1)
  };
}

/**
 * Crawl une URL
 */
async function crawlUrl(url, depth = 0) {
  // Vérifier les limites
  if (depth > config.maxDepth) return;
  if (visited.size >= config.maxPages) return;
  if (visited.has(url)) return;

  visited.add(url);

  try {
    console.log(`📄 Scraping [${visited.size}/${config.maxPages}] (profondeur ${depth}): ${url}`);

    // Fetch la page
    const html = await fetchUrl(url);

    // Convertir en Markdown
    const { title, markdown } = htmlToMarkdown(html, url);

    // Obtenir le chemin
    const { category, subcategories } = urlToPath(url);

    // Créer le chemin de dossier
    const dirPath = path.join(config.outputDir, category, ...subcategories);
    await fs.mkdir(dirPath, { recursive: true });

    // Nom du fichier
    const filename = urlToFilename(url);
    const filePath = path.join(dirPath, filename);

    // Créer le contenu Markdown avec métadonnées
    const frontmatter = `---
title: ${title.replace(/:/g, '-')}
url: ${url}
scraped_at: ${new Date().toISOString()}
---

# ${title}

`;

    const fullMarkdown = frontmatter + markdown;

    // Sauvegarder
    await fs.writeFile(filePath, fullMarkdown, 'utf-8');

    console.log(`✅ Sauvegardé: ${filePath}`);

    // Stocker les infos pour le résumé
    results.push({
      url,
      title,
      category,
      path: filePath,
      size: markdown.length
    });

    // Attendre avant la prochaine requête
    await sleep(config.delay);

    // Extraire et crawler les liens
    const links = extractLinks(html, url);

    for (const link of links) {
      if (visited.size >= config.maxPages) break;
      await crawlUrl(link, depth + 1);
    }

  } catch (error) {
    console.error(`❌ Erreur sur ${url}:`, error.message);
  }
}

/**
 * Fonction principale
 */
async function main() {
  console.log('🚀 Démarrage du scraper Markdown...\n');
  console.log('Configuration:');
  console.log(`  URL de base: ${config.baseUrl}`);
  console.log(`  Profondeur max: ${config.maxDepth}`);
  console.log(`  Pages max: ${config.maxPages}`);
  console.log(`  Dossier de sortie: ${config.outputDir}`);
  console.log(`  Délai entre requêtes: ${config.delay}ms\n`);

  // Créer le dossier de sortie
  await fs.mkdir(config.outputDir, { recursive: true });

  // Commencer le crawl
  const startTime = Date.now();
  await crawlUrl(config.baseUrl);
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  // Sauvegarder le résumé
  const summary = {
    baseUrl: config.baseUrl,
    totalPages: results.length,
    scrapedAt: new Date().toISOString(),
    duration: `${duration}s`,
    categories: {},
    pages: results.map(r => ({
      title: r.title,
      url: r.url,
      category: r.category,
      path: r.path,
      size: r.size
    }))
  };

  // Compter par catégorie
  results.forEach(r => {
    summary.categories[r.category] = (summary.categories[r.category] || 0) + 1;
  });

  // Sauvegarder le résumé en JSON
  await fs.writeFile(
    path.join(config.outputDir, 'summary.json'),
    JSON.stringify(summary, null, 2)
  );

  // Créer un index Markdown
  let indexMd = `# Index des Pages Scrapées\n\n`;
  indexMd += `**Site source:** ${config.baseUrl}  \n`;
  indexMd += `**Date:** ${new Date().toISOString()}  \n`;
  indexMd += `**Pages scrapées:** ${results.length}  \n`;
  indexMd += `**Durée:** ${duration}s  \n\n`;

  // Grouper par catégorie
  const byCategory = {};
  results.forEach(r => {
    if (!byCategory[r.category]) {
      byCategory[r.category] = [];
    }
    byCategory[r.category].push(r);
  });

  Object.keys(byCategory).sort().forEach(category => {
    indexMd += `## ${category}\n\n`;
    byCategory[category].forEach(page => {
      const relativePath = path.relative(config.outputDir, page.path);
      indexMd += `- [${page.title}](${relativePath}) - [Source](${page.url})\n`;
    });
    indexMd += '\n';
  });

  await fs.writeFile(
    path.join(config.outputDir, 'INDEX.md'),
    indexMd
  );

  console.log('\n✅ Scraping terminé!');
  console.log(`📊 ${results.length} pages converties en Markdown`);
  console.log(`⏱️  Durée: ${duration}s`);
  console.log(`📁 Résultats dans: ${config.outputDir}`);
  console.log(`📝 Index: ${path.join(config.outputDir, 'INDEX.md')}`);
  console.log('\nCatégories:');
  Object.entries(summary.categories).forEach(([cat, count]) => {
    console.log(`  - ${cat}: ${count} page(s)`);
  });
}

// Lancer le script
if (require.main === module) {
  if (!process.argv[2] || process.argv[2] === '--help' || process.argv[2] === '-h') {
    console.log('Usage: node scraper-md.js <URL> [profondeur] [max-pages]');
    console.log('');
    console.log('Exemples:');
    console.log('  node scraper-md.js https://example.com');
    console.log('  node scraper-md.js https://example.com 5');
    console.log('  node scraper-md.js https://example.com 3 100');
    console.log('');
    process.exit(0);
  }

  main().catch(console.error);
}

module.exports = { crawlUrl, htmlToMarkdown };
