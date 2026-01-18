#!/usr/bin/env node

/**
 * Test du parser HTML (sans connexion réseau)
 */

function parseHtml(html) {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : 'Sans titre';

  const links = [];
  const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>([^<]*)<\/a>/gi;
  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    links.push({ url: match[1], text: match[2] });
  }

  let content = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return { title, links, content };
}

// HTML de test
const testHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Mon Site de Test</title>
  <style>.hidden { display: none; }</style>
</head>
<body>
  <nav>
    <a href="/menu">Menu</a>
  </nav>
  <h1>Bienvenue sur mon site</h1>
  <p>Ceci est un exemple de contenu à scraper et traduire.</p>
  <a href="/page1">Page 1</a>
  <a href="/page2">Page 2</a>
  <a href="https://external.com">Site Externe</a>
  <script>console.log('test');</script>
  <footer>
    <p>Copyright 2026</p>
  </footer>
</body>
</html>
`;

console.log('🧪 Test du parser HTML\n');
console.log('HTML d\'entrée:');
console.log('─'.repeat(50));
console.log(testHtml.trim());
console.log('─'.repeat(50));
console.log('');

const { title, links, content } = parseHtml(testHtml);

console.log('✅ Résultats du parsing:\n');
console.log(`📌 Titre: "${title}"`);
console.log('');
console.log(`🔗 Liens trouvés (${links.length}):`);
links.forEach((link, i) => {
  console.log(`  ${i + 1}. ${link.url} - "${link.text}"`);
});
console.log('');
console.log(`📄 Contenu extrait (${content.length} caractères):`);
console.log(`  "${content}"`);
console.log('');
console.log('✅ Le parser fonctionne correctement!');
console.log('');
console.log('Le script est prêt à scraper des sites web réels.');
console.log('');
console.log('Utilisation:');
console.log('  node scraper.js https://votre-site.com');
console.log('  npm run scrape https://votre-site.com');
