#!/usr/bin/env node

/**
 * Génère un site HTML statique à partir des données scrapées
 * Usage: node scripts/generate-website.js
 */

const fs = require('fs');
const path = require('path');

const SCRAPED_DATA_DIR = path.join(__dirname, '..', 'scraped_data');
const OUTPUT_DIR = path.join(__dirname, '..', 'output');

// Template HTML de base
const htmlTemplate = (title, content, navigation) => `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem;
            border-radius: 10px;
            margin-bottom: 2rem;
        }
        h1 { margin-bottom: 1rem; }
        .container {
            display: grid;
            grid-template-columns: 250px 1fr;
            gap: 2rem;
        }
        nav {
            background: #f5f5f5;
            padding: 1.5rem;
            border-radius: 10px;
            height: fit-content;
            position: sticky;
            top: 20px;
        }
        nav h2 {
            font-size: 1.2rem;
            margin-bottom: 1rem;
            color: #667eea;
        }
        nav ul { list-style: none; }
        nav li { margin-bottom: 0.5rem; }
        nav a {
            color: #333;
            text-decoration: none;
            transition: color 0.3s;
        }
        nav a:hover { color: #667eea; }
        .content {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .content h2 {
            color: #667eea;
            margin: 1.5rem 0 1rem;
        }
        .content p {
            margin-bottom: 1rem;
            text-align: justify;
        }
        .meta {
            background: #f9f9f9;
            padding: 1rem;
            border-radius: 5px;
            margin-bottom: 1.5rem;
            font-size: 0.9rem;
            color: #666;
        }
        .original-link {
            margin-top: 2rem;
            padding-top: 1rem;
            border-top: 1px solid #eee;
            font-size: 0.9rem;
        }
        .original-link a {
            color: #667eea;
            text-decoration: none;
        }
        @media (max-width: 768px) {
            .container {
                grid-template-columns: 1fr;
            }
            nav {
                position: static;
            }
        }
    </style>
</head>
<body>
    <header>
        <h1>📚 Site Traduit</h1>
        <p>Contenu traduit automatiquement en français</p>
    </header>
    <div class="container">
        <nav>
            <h2>📑 Navigation</h2>
            ${navigation}
        </nav>
        <main class="content">
            ${content}
        </main>
    </div>
</body>
</html>
`;

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

function generateNavigation(pages) {
    const categories = {};

    // Grouper par catégorie
    pages.forEach(page => {
        const cat = page.category || 'root';
        if (!categories[cat]) {
            categories[cat] = [];
        }
        categories[cat].push(page);
    });

    let nav = '<ul>';

    Object.keys(categories).sort().forEach(category => {
        nav += `<li><strong>${category}</strong><ul>`;
        categories[category].forEach(page => {
            const filename = sanitizeFilename(page.relativePath) + '.html';
            nav += `<li><a href="${filename}">${page.translatedTitle || page.originalTitle}</a></li>`;
        });
        nav += '</ul></li>';
    });

    nav += '</ul>';
    return nav;
}

function sanitizeFilename(str) {
    return str.replace(/[^a-z0-9]/gi, '_').replace(/_+/g, '_');
}

function generatePages(pages) {
    const navigation = generateNavigation(pages);

    // Créer le dossier de sortie
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Générer une page pour chaque contenu
    pages.forEach(page => {
        const filename = sanitizeFilename(page.relativePath) + '.html';
        const filepath = path.join(OUTPUT_DIR, filename);

        const content = `
            <div class="meta">
                <strong>Catégorie:</strong> ${page.category || 'N/A'} |
                <strong>Date:</strong> ${new Date(page.timestamp).toLocaleDateString('fr-FR')}
            </div>

            <h1>${page.translatedTitle || page.originalTitle}</h1>

            <div>
                ${formatContent(page.translatedContent || page.originalContent)}
            </div>

            <div class="original-link">
                <strong>📎 Page originale:</strong>
                <a href="${page.url}" target="_blank">${page.url}</a>
            </div>
        `;

        const html = htmlTemplate(
            page.translatedTitle || page.originalTitle,
            content,
            navigation
        );

        fs.writeFileSync(filepath, html);
        console.log(`✅ Généré: ${filename}`);
    });

    // Générer la page d'index
    generateIndex(pages, navigation);
}

function formatContent(content) {
    // Séparer le contenu en paragraphes
    const paragraphs = content.split(/\n\n+/);
    return paragraphs
        .filter(p => p.trim().length > 0)
        .map(p => `<p>${p.trim()}</p>`)
        .join('\n');
}

function generateIndex(pages, navigation) {
    const categories = {};

    pages.forEach(page => {
        const cat = page.category || 'root';
        if (!categories[cat]) {
            categories[cat] = 0;
        }
        categories[cat]++;
    });

    let content = `
        <h1>🏠 Accueil</h1>
        <p>Bienvenue sur ce site traduit automatiquement. Vous trouverez ci-dessous un résumé du contenu disponible.</p>

        <h2>📊 Statistiques</h2>
        <ul>
            <li><strong>Nombre total de pages:</strong> ${pages.length}</li>
            <li><strong>Nombre de catégories:</strong> ${Object.keys(categories).length}</li>
        </ul>

        <h2>📂 Catégories</h2>
        <ul>
    `;

    Object.keys(categories).sort().forEach(cat => {
        content += `<li><strong>${cat}:</strong> ${categories[cat]} page(s)</li>`;
    });

    content += `
        </ul>

        <h2>🔍 Dernières pages ajoutées</h2>
        <ul>
    `;

    pages
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 10)
        .forEach(page => {
            const filename = sanitizeFilename(page.relativePath) + '.html';
            content += `<li><a href="${filename}">${page.translatedTitle || page.originalTitle}</a></li>`;
        });

    content += '</ul>';

    const html = htmlTemplate('Accueil - Site Traduit', content, navigation);
    fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), html);
    console.log('✅ Généré: index.html');
}

// Exécution principale
console.log('🚀 Génération du site HTML...\n');

const pages = readAllScrapedData();

if (pages.length === 0) {
    console.error('❌ Aucune donnée scrapée trouvée dans', SCRAPED_DATA_DIR);
    console.error('Assurez-vous d\'avoir exécuté le workflow n8n d\'abord.');
    process.exit(1);
}

console.log(`📄 ${pages.length} pages trouvées\n`);

generatePages(pages);

console.log(`\n✨ Site généré avec succès dans: ${OUTPUT_DIR}`);
console.log(`\n🌐 Ouvrez ${path.join(OUTPUT_DIR, 'index.html')} dans votre navigateur`);
