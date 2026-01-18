#!/usr/bin/env node

/**
 * Test du convertisseur HTML vers Markdown
 */

const { htmlToMarkdown } = require('./scraper-md.js');

const testHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Guide de Test</title>
  <style>.hidden { display: none; }</style>
</head>
<body>
  <nav><a href="/menu">Menu</a></nav>

  <h1>Guide Complet de Test</h1>

  <p>Ceci est un <strong>paragraphe important</strong> avec du <em>texte en italique</em>.</p>

  <h2>Fonctionnalités</h2>

  <ul>
    <li>Support du Markdown</li>
    <li>Conversion automatique</li>
    <li>Préservation de la structure</li>
  </ul>

  <h3>Code Exemple</h3>

  <pre><code>function hello() {
  console.log("Hello World");
}</code></pre>

  <p>Vous pouvez aussi utiliser <code>inline code</code> dans le texte.</p>

  <blockquote>
    <p>Ceci est une citation importante.</p>
  </blockquote>

  <p>Visitez <a href="https://example.com">notre site</a> pour plus d'infos.</p>

  <h2>Images</h2>

  <p><img src="https://example.com/image.jpg" alt="Image de test" /></p>

  <hr>

  <footer>Copyright 2026</footer>

  <script>console.log('test');</script>
</body>
</html>
`;

console.log('🧪 Test de conversion HTML → Markdown\n');
console.log('HTML d\'entrée:');
console.log('═'.repeat(60));
console.log(testHtml.trim());
console.log('═'.repeat(60));
console.log('');

const { title, markdown } = htmlToMarkdown(testHtml, 'https://example.com/test');

console.log('📝 Markdown généré:');
console.log('═'.repeat(60));
console.log(markdown);
console.log('═'.repeat(60));
console.log('');

console.log('✅ Résultats:');
console.log(`  Titre extrait: "${title}"`);
console.log(`  Longueur: ${markdown.length} caractères`);
console.log('');

// Vérifications
const checks = {
  'Titre H1': markdown.includes('# Guide Complet de Test'),
  'Titre H2': markdown.includes('## Fonctionnalités'),
  'Titre H3': markdown.includes('### Code Exemple'),
  'Texte gras': markdown.includes('**paragraphe important**'),
  'Texte italique': markdown.includes('*texte en italique*'),
  'Liste': markdown.includes('- Support du Markdown'),
  'Bloc de code': markdown.includes('```'),
  'Code inline': markdown.includes('`inline code`'),
  'Citation': markdown.includes('>'),
  'Lien': markdown.includes('[notre site](https://example.com'),
  'Image': markdown.includes('![Image de test]'),
  'Ligne horizontale': markdown.includes('---'),
  'Pas de nav': !markdown.includes('Menu'),
  'Pas de footer': !markdown.includes('Copyright'),
  'Pas de script': !markdown.toLowerCase().includes('<script')
};

console.log('🔍 Vérifications:');
let passed = 0;
let failed = 0;

Object.entries(checks).forEach(([check, result]) => {
  if (result) {
    console.log(`  ✅ ${check}`);
    passed++;
  } else {
    console.log(`  ❌ ${check}`);
    failed++;
  }
});

console.log('');
console.log(`📊 Résultat: ${passed}/${passed + failed} tests passés`);

if (failed === 0) {
  console.log('');
  console.log('🎉 Tous les tests sont OK!');
  console.log('Le convertisseur HTML → Markdown fonctionne parfaitement.');
  console.log('');
  console.log('Utilisation:');
  console.log('  node scraper-md.js https://votre-site.com');
  console.log('  npm run scrape:md https://votre-site.com');
} else {
  console.log('');
  console.log('⚠️  Certains tests ont échoué.');
  process.exit(1);
}
