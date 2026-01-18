# Guide d'Utilisation - Scraper Standalone

Ce script fonctionne **sans n8n** et utilise uniquement Node.js. Parfait pour un démarrage rapide!

## 🚀 Démarrage Rapide (Sans Installation)

### 1. Scraping Simple (Sans Traduction)

```bash
node scraper.js https://example.com
```

Les résultats seront sauvegardés dans `scraped_data/`

### 2. Avec Traduction Gratuite (LibreTranslate)

D'abord, lancez LibreTranslate en local avec Docker:

```bash
docker run -d -p 5000:5000 libretranslate/libretranslate
```

Puis lancez le scraper:

```bash
TRANSLATE_SERVICE=libre node scraper.js https://example.com
```

### 3. Avec Google Translate

```bash
API_KEY=votre_cle_google TRANSLATE_SERVICE=google node scraper.js https://example.com
```

### 4. Avec DeepL (Recommandé pour la qualité)

```bash
API_KEY=votre_cle_deepl TRANSLATE_SERVICE=deepl node scraper.js https://example.com
```

### 5. Avec OpenAI

```bash
API_KEY=votre_cle_openai TRANSLATE_SERVICE=openai node scraper.js https://example.com
```

## ⚙️ Configuration Avancée

### Variables d'Environnement

Créez un fichier `.env` (copier depuis `.env.example`):

```bash
TRANSLATE_SERVICE=libre
API_KEY=votre_cle_api
LIBRE_TRANSLATE_URL=http://localhost:5000
```

Puis lancez:

```bash
source .env
node scraper.js https://example.com
```

### Options dans le Script

Éditez le fichier `scraper.js` ligne 13-22 pour personnaliser:

```javascript
const config = {
  baseUrl: process.argv[2] || 'https://example.com',
  targetLanguage: 'fr',        // Langue cible
  maxDepth: 3,                  // Profondeur de crawling
  maxPages: 50,                 // Nombre max de pages
  outputDir: './scraped_data',  // Dossier de sortie
  delay: 1000,                  // Délai entre requêtes (ms)
  translateService: 'libre',    // Service de traduction
};
```

## 📊 Résultats

### Structure des Fichiers

```
scraped_data/
├── summary.json          # Résumé global
├── category1/
│   ├── page1.json
│   └── page2.json
└── category2/
    └── page3.json
```

### Contenu d'un Fichier

Chaque fichier JSON contient:

```json
{
  "url": "https://example.com/page",
  "relativePath": "/page",
  "category": "root",
  "originalTitle": "Example Page",
  "translatedTitle": "Page Exemple",
  "originalContent": "Content...",
  "translatedContent": "Contenu...",
  "scrapedAt": "2026-01-18T..."
}
```

## 🔧 Services de Traduction

### LibreTranslate (Gratuit, Open Source) ⭐ Recommandé pour débuter

**Avantages:**
- Gratuit et illimité
- Fonctionne en local
- Respecte la vie privée

**Installation:**
```bash
docker run -d -p 5000:5000 libretranslate/libretranslate
```

**Utilisation:**
```bash
TRANSLATE_SERVICE=libre node scraper.js https://example.com
```

### Google Translate

**Avantages:**
- Bonne qualité
- Supporte beaucoup de langues

**Inconvénients:**
- Nécessite une clé API (payant après quota gratuit)
- 500,000 caractères gratuits/mois

**Obtenir une clé:**
1. Aller sur https://cloud.google.com/translate
2. Activer l'API
3. Créer une clé API

**Utilisation:**
```bash
API_KEY=votre_cle TRANSLATE_SERVICE=google node scraper.js https://example.com
```

### DeepL ⭐ Meilleure qualité

**Avantages:**
- Excellente qualité de traduction
- 500,000 caractères gratuits/mois

**Obtenir une clé:**
1. Créer un compte sur https://www.deepl.com/pro-api
2. Choisir le plan gratuit
3. Récupérer la clé API

**Utilisation:**
```bash
API_KEY=votre_cle TRANSLATE_SERVICE=deepl node scraper.js https://example.com
```

### OpenAI

**Avantages:**
- Très bonne qualité contextuelle
- Traduction naturelle

**Inconvénients:**
- Payant (environ $0.002 pour 1000 tokens)

**Obtenir une clé:**
1. Aller sur https://platform.openai.com/api-keys
2. Créer une clé API

**Utilisation:**
```bash
API_KEY=votre_cle TRANSLATE_SERVICE=openai node scraper.js https://example.com
```

## 💡 Exemples d'Utilisation

### Exemple 1: Scraper un blog

```bash
node scraper.js https://blog.example.com
```

### Exemple 2: Scraper et traduire une documentation

```bash
TRANSLATE_SERVICE=deepl API_KEY=votre_cle node scraper.js https://docs.example.com
```

### Exemple 3: Limiter à 10 pages

Éditez `scraper.js` et changez `maxPages: 10`

### Exemple 4: Augmenter la profondeur

Éditez `scraper.js` et changez `maxDepth: 5`

## 📝 Scripts NPM

Pour faciliter l'utilisation, utilisez les scripts npm:

```bash
# Scraper basique
npm run scrape https://example.com

# Scraper avec exemple
npm run scrape:example

# Générer un site HTML à partir des données
npm run generate-site

# Exporter en Markdown
npm run export-markdown
```

## 🐛 Dépannage

### "ECONNREFUSED" lors de la traduction avec LibreTranslate

LibreTranslate n'est pas démarré. Lancez:
```bash
docker run -d -p 5000:5000 libretranslate/libretranslate
```

### "401 Unauthorized" avec les API

Votre clé API est incorrecte ou expirée. Vérifiez votre clé.

### Pages non trouvées ou erreur 403

Le site bloque les scrapers. Le script utilise déjà un User-Agent, mais certains sites ont des protections plus strictes.

### Traduction incomplète

Le contenu est limité à 5000 caractères par chunk. Pour des contenus plus longs, il faudrait découper le texte.

### Trop lent

- Réduisez `maxDepth` et `maxPages`
- Augmentez `delay` pour éviter de surcharger le serveur
- Désactivez la traduction pour scraper plus vite

## ⚖️ Considérations Légales

- Vérifiez toujours le fichier `robots.txt` du site
- Respectez les conditions d'utilisation
- Ne surchargez pas les serveurs (utilisez un délai raisonnable)
- Certains contenus peuvent être protégés par le droit d'auteur

## 🔄 Mise à Jour

Pour obtenir la dernière version:

```bash
git pull origin main
```

## 🆘 Support

Si vous avez des questions ou des problèmes, créez une issue sur GitHub.

## 🎉 Profiter!

Vous êtes maintenant prêt à scraper et traduire des sites web entiers!

```bash
node scraper.js https://votre-site-prefere.com
```
