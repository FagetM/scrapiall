#!/usr/bin/env node

/**
 * Test rapide du scraper
 */

const https = require('https');
const http = require('http');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const { URL } = require('url');
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;

    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ScraperBot/1.0)'
      }
    };

    client.get(url, options, (res) => {
      let data = '';

      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode}`));
      }

      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function parseHtml(html) {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : 'Sans titre';

  const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  const h1 = h1Match ? h1Match[1].trim() : '';

  let content = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 500);

  return { title, h1, content };
}

async function test() {
  console.log('🧪 Test du scraper...\n');

  try {
    console.log('📄 Fetching https://example.com...');
    const html = await fetchUrl('https://example.com');
    const { title, h1, content } = parseHtml(html);

    console.log('✅ Succès!\n');
    console.log('Résultats:');
    console.log(`  Titre: ${title}`);
    console.log(`  H1: ${h1}`);
    console.log(`  Contenu (extrait): ${content.substring(0, 200)}...\n`);

    console.log('✅ Le scraper fonctionne correctement!');
    console.log('');
    console.log('Pour scraper un site complet avec traduction:');
    console.log('  node scraper.js https://example.com');
    console.log('');
    console.log('Ou utilisez le script npm:');
    console.log('  npm run scrape https://example.com');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

test();
