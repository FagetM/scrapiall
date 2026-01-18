#!/usr/bin/env node

/**
 * Exporte les données scrapées en fichiers Markdown
 * Usage: node scripts/export-markdown.js
 */

const fs = require('fs');
const path = require('path');

const SCRAPED_DATA_DIR = path.join(__dirname, '..', 'scraped_data');
const OUTPUT_DIR = path.join(__dirname, '..', 'output_markdown');

function readAllScrapedData() {
    const data = [];

    function readDir(dir) {
        const files = fs.readdirSync(dir);

        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                readDir(filePath);
            } else if (file.endsWith('.json') && file !== 'summary.json') {
                try {
                    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                    data.push(content);
                } catch (e) {
                    console.error(`Erreur lors de la lecture de ${filePath}:`, e.message);
                }
            }
        }
    }

    if (fs.existsSync(SCRAPED_DATA_DIR)) {
        readDir(SCRAPED_DATA_DIR);
    }

    return data;
}

function generateMarkdown(pages) {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Créer un fichier par page
    pages.forEach(page => {
        const category = page.category || 'root';
        const categoryDir = path.join(OUTPUT_DIR, category);

        if (!fs.existsSync(categoryDir)) {
            fs.mkdirSync(categoryDir, { recursive: true });
        }

        const filename = sanitizeFilename(page.relativePath) + '.md';
        const filepath = path.join(categoryDir, filename);

        const markdown = `# ${page.translatedTitle || page.originalTitle}

**Catégorie:** ${category}
**URL originale:** ${page.url}
**Date:** ${new Date(page.timestamp).toLocaleDateString('fr-FR')}

---

## Contenu

${page.translatedContent || page.originalContent}

---

## Informations originales

**Titre original:** ${page.originalTitle}

${page.originalContent ? '**Contenu original:** (voir données brutes)' : ''}

**Chemin relatif:** ${page.relativePath}
`;

        fs.writeFileSync(filepath, markdown);
        console.log(`✅ Exporté: ${category}/${filename}`);
    });

    // Créer un index
    generateMarkdownIndex(pages);
}

function generateMarkdownIndex(pages) {
    const categories = {};

    pages.forEach(page => {
        const cat = page.category || 'root';
        if (!categories[cat]) {
            categories[cat] = [];
        }
        categories[cat].push(page);
    });

    let index = `# Index du site traduit

**Nombre total de pages:** ${pages.length}
**Date de génération:** ${new Date().toLocaleDateString('fr-FR')}

## Catégories

`;

    Object.keys(categories).sort().forEach(category => {
        index += `\n### ${category} (${categories[category].length} pages)\n\n`;

        categories[category].forEach(page => {
            const filename = sanitizeFilename(page.relativePath) + '.md';
            index += `- [${page.translatedTitle || page.originalTitle}](./${category}/${filename})\n`;
        });
    });

    fs.writeFileSync(path.join(OUTPUT_DIR, 'INDEX.md'), index);
    console.log('✅ Exporté: INDEX.md');
}

function sanitizeFilename(str) {
    return str.replace(/[^a-z0-9]/gi, '_').replace(/_+/g, '_');
}

// Exécution principale
console.log('🚀 Export en Markdown...\n');

const pages = readAllScrapedData();

if (pages.length === 0) {
    console.error('❌ Aucune donnée scrapée trouvée dans', SCRAPED_DATA_DIR);
    process.exit(1);
}

console.log(`📄 ${pages.length} pages trouvées\n`);

generateMarkdown(pages);

console.log(`\n✨ Export terminé dans: ${OUTPUT_DIR}`);
