#!/usr/bin/env node

/**
 * Standalone Web Scraper & Translator
 * Alternative à n8n qui fonctionne directement avec Node.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const { URL } = require('url');

// Configuration
const config = {
  baseUrl: process.argv[2] || 'https://example.com',
  targetLanguage: 'fr',
  maxDepth: 3,
  maxPages: 50,
  outputDir: './scraped_data',
  delay: 1000, // Délai entre les requêtes (ms)
  translateService: process.env.TRANSLATE_SERVICE || 'libre', // 'libre', 'google', 'deepl', 'openai'
  apiKey: process.env.API_KEY || '',
  libreTranslateUrl: process.env.LIBRE_TRANSLATE_URL || 'http://localhost:5000'
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
        'User-Agent': 'Mozilla/5.0 (compatible; ScraperBot/1.0)'
      }
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
    }).on('error', reject);
  });
}

/**
 * Extrait le texte d'un HTML simple (sans cheerio)
 */
function parseHtml(html) {
  // Extraire le titre
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : 'Sans titre';

  // Extraire les liens
  const links = [];
  const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    links.push(match[1]);
  }

  // Extraire le contenu (enlever les scripts, styles, etc.)
  let content = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();

  return { title, links, content };
}

/**
 * Traduit un texte
 */
async function translate(text, targetLang = 'fr') {
  if (!text || text.length === 0) return text;

  // Limiter la taille pour éviter les erreurs
  const maxLength = 5000;
  const textToTranslate = text.length > maxLength ? text.substring(0, maxLength) + '...' : text;

  try {
    switch (config.translateService) {
      case 'libre':
        return await translateLibre(textToTranslate, targetLang);
      case 'google':
        return await translateGoogle(textToTranslate, targetLang);
      case 'deepl':
        return await translateDeepL(textToTranslate, targetLang);
      case 'openai':
        return await translateOpenAI(textToTranslate, targetLang);
      default:
        console.log('⚠️  Aucun service de traduction configuré, texte original conservé');
        return textToTranslate;
    }
  } catch (error) {
    console.error('❌ Erreur de traduction:', error.message);
    return textToTranslate;
  }
}

/**
 * Traduction avec LibreTranslate (gratuit, open source)
 */
function translateLibre(text, targetLang) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      q: text,
      source: 'auto',
      target: targetLang,
      format: 'text'
    });

    const url = new URL('/translate', config.libreTranslateUrl);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const client = url.protocol === 'https:' ? https : http;

    const req = client.request(url, options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          resolve(result.translatedText || text);
        } catch (e) {
          reject(new Error('Erreur de parsing de la réponse'));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

/**
 * Traduction avec Google Translate (nécessite API key)
 */
function translateGoogle(text, targetLang) {
  return new Promise((resolve, reject) => {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${config.apiKey}&q=${encodeURIComponent(text)}&target=${targetLang}`;

    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(result.data.translations[0].translatedText);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

/**
 * Traduction avec DeepL (nécessite API key)
 */
function translateDeepL(text, targetLang) {
  return new Promise((resolve, reject) => {
    const data = new URLSearchParams({
      auth_key: config.apiKey,
      text: text,
      target_lang: targetLang.toUpperCase()
    }).toString();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': data.length
      }
    };

    const req = https.request('https://api-free.deepl.com/v2/translate', options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          resolve(result.translations[0].text);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

/**
 * Traduction avec OpenAI (nécessite API key)
 */
function translateOpenAI(text, targetLang) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `Tu es un traducteur professionnel. Traduis le texte suivant en ${targetLang === 'fr' ? 'français' : targetLang} de manière naturelle.`
        },
        {
          role: 'user',
          content: text
        }
      ],
      temperature: 0.3
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Length': data.length
      }
    };

    const req = https.request('https://api.openai.com/v1/chat/completions', options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          resolve(result.choices[0].message.content);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

/**
 * Attend un certain temps
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
    const { title, links, content } = parseHtml(html);

    // Extraire le chemin relatif
    const urlObj = new URL(url);
    const relativePath = urlObj.pathname;
    const pathParts = relativePath.split('/').filter(p => p);
    const category = pathParts[0] || 'root';

    // Traduire
    console.log(`🌍 Traduction du contenu...`);
    const translatedTitle = await translate(title, config.targetLanguage);
    const translatedContent = await translate(content, config.targetLanguage);

    // Sauvegarder
    const result = {
      url,
      relativePath,
      category,
      pathParts,
      originalTitle: title,
      translatedTitle,
      originalContent: content.substring(0, 1000), // Limiter pour le stockage
      translatedContent: translatedContent.substring(0, 1000),
      contentLength: content.length,
      scrapedAt: new Date().toISOString()
    };

    results.push(result);

    // Sauvegarder immédiatement
    const categoryDir = path.join(config.outputDir, category);
    await fs.mkdir(categoryDir, { recursive: true });
    const filename = path.join(categoryDir, `${pathParts.join('_') || 'index'}.json`);
    await fs.writeFile(filename, JSON.stringify(result, null, 2));

    console.log(`✅ Sauvegardé: ${filename}`);

    // Attendre avant la prochaine requête
    await sleep(config.delay);

    // Crawler les liens
    const baseUrl = new URL(config.baseUrl);
    for (const link of links) {
      try {
        let absoluteUrl;
        if (link.startsWith('http')) {
          absoluteUrl = link;
        } else if (link.startsWith('/')) {
          absoluteUrl = new URL(link, config.baseUrl).href;
        } else {
          absoluteUrl = new URL(link, url).href;
        }

        const linkUrl = new URL(absoluteUrl);

        // Seulement les liens du même domaine
        if (linkUrl.hostname === baseUrl.hostname) {
          await crawlUrl(absoluteUrl, depth + 1);
        }
      } catch (e) {
        // Ignorer les liens invalides
      }
    }
  } catch (error) {
    console.error(`❌ Erreur sur ${url}:`, error.message);
  }
}

/**
 * Fonction principale
 */
async function main() {
  console.log('🚀 Démarrage du scraper...\n');
  console.log('Configuration:');
  console.log(`  URL de base: ${config.baseUrl}`);
  console.log(`  Langue cible: ${config.targetLanguage}`);
  console.log(`  Profondeur max: ${config.maxDepth}`);
  console.log(`  Pages max: ${config.maxPages}`);
  console.log(`  Service de traduction: ${config.translateService}`);
  console.log(`  Dossier de sortie: ${config.outputDir}\n`);

  // Créer le dossier de sortie
  await fs.mkdir(config.outputDir, { recursive: true });

  // Commencer le crawl
  await crawlUrl(config.baseUrl);

  // Sauvegarder le résumé
  const summary = {
    totalPages: results.length,
    baseUrl: config.baseUrl,
    targetLanguage: config.targetLanguage,
    scrapedAt: new Date().toISOString(),
    categories: {},
    pages: results.map(r => ({
      url: r.url,
      category: r.category,
      translatedTitle: r.translatedTitle
    }))
  };

  // Compter par catégorie
  results.forEach(r => {
    summary.categories[r.category] = (summary.categories[r.category] || 0) + 1;
  });

  await fs.writeFile(
    path.join(config.outputDir, 'summary.json'),
    JSON.stringify(summary, null, 2)
  );

  console.log('\n✅ Scraping terminé!');
  console.log(`📊 ${results.length} pages scrapées et traduites`);
  console.log(`📁 Résultats sauvegardés dans: ${config.outputDir}`);
  console.log('\nCatégories:');
  Object.entries(summary.categories).forEach(([cat, count]) => {
    console.log(`  - ${cat}: ${count} page(s)`);
  });
}

// Lancer le script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { crawlUrl, translate };
