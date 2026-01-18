# Scrapiall - Web Scraper & Translator avec n8n

Un système complet pour scraper des sites web, extraire leur contenu et le traduire automatiquement en français tout en préservant l'arborescence du site.

## Installation

### Option 1: Installation avec Docker (Recommandé)

1. Assurez-vous d'avoir Docker et Docker Compose installés sur votre machine

2. Clonez ce repo et naviguez dans le dossier:
```bash
cd scrapiall
```

3. Démarrez n8n:
```bash
docker-compose up -d
```

4. Accédez à n8n dans votre navigateur:
```
http://localhost:5678
```

Identifiants par défaut:
- Username: `admin`
- Password: `admin123`

### Option 2: Installation avec npm

```bash
npm install -g n8n
n8n start
```

## Configuration

### 1. Importer le workflow

1. Connectez-vous à n8n (http://localhost:5678)
2. Cliquez sur "Add workflow" puis "Import from File"
3. Sélectionnez le fichier `workflows/website-scraper-translator.json`

### 2. Configurer la traduction

Le workflow supporte plusieurs services de traduction:

#### Option A: OpenAI (Meilleure qualité)
1. Obtenez une clé API sur https://platform.openai.com/api-keys
2. Dans n8n, allez dans Settings > Credentials
3. Ajoutez une nouvelle credential "HTTP Header Auth"
4. Nom: `Authorization`, Valeur: `Bearer VOTRE_CLE_API`
5. Activez le node "Translate with OpenAI" dans le workflow

#### Option B: DeepL (Bon compromis)
1. Créez un compte gratuit sur https://www.deepl.com/pro-api
2. Configurez la clé API dans les credentials n8n
3. Le plan gratuit permet 500,000 caractères/mois

#### Option C: Google Translate (Gratuit avec limitations)
1. Activez l'API Google Translate dans Google Cloud Console
2. Obtenez une clé API
3. Activez le node "Translate with Google" dans le workflow

#### Option D: LibreTranslate (Open Source, gratuit)
Vous pouvez déployer votre propre instance LibreTranslate:
```bash
docker run -d -p 5000:5000 libretranslate/libretranslate
```

## Utilisation

### 1. Configuration du workflow

Dans le node "Configuration" du workflow, modifiez:
- `baseUrl`: L'URL du site à scraper (ex: "https://example.com")
- `targetLanguage`: Langue cible (ex: "fr" pour français)
- `maxDepth`: Profondeur maximale de crawling (ex: 3)

### 2. Exécution du workflow

1. Ouvrez le workflow "Website Scraper & Translator"
2. Cliquez sur "Execute Workflow"
3. Le workflow va:
   - Récupérer la page d'accueil
   - Extraire tous les liens du même domaine
   - Scraper chaque page
   - Analyser la structure et le contenu
   - Traduire le contenu en français
   - Sauvegarder les résultats dans `/scraped_data`

### 3. Structure des résultats

Les données scrapées sont organisées comme suit:
```
scraped_data/
├── summary.json          # Résumé de tous les contenus scrapés
├── category1/
│   ├── page1.json
│   └── page2.json
├── category2/
│   └── page3.json
└── ...
```

Chaque fichier JSON contient:
```json
{
  "url": "https://example.com/page",
  "relativePath": "/category/page",
  "category": "category",
  "originalTitle": "Original Title",
  "translatedTitle": "Titre Traduit",
  "originalContent": "Original content...",
  "translatedContent": "Contenu traduit...",
  "timestamp": "2026-01-18T..."
}
```

## Scripts Utilitaires

### Générer un site HTML à partir des données scrapées

```bash
node scripts/generate-website.js
```

Cela créera un site HTML statique dans `output/` avec la même arborescence que le site original mais en français.

### Exporter vers d'autres formats

```bash
# Exporter en Markdown
node scripts/export-markdown.js

# Exporter en CSV
node scripts/export-csv.js
```

## Fonctionnalités Avancées

### Filtrer les pages à scraper

Modifiez le node "Extract All Links" pour ajouter des filtres:

```javascript
// Exemple: Ne scraper que les pages blog
if (href.includes('/blog/')) {
  links.add(href);
}

// Exemple: Exclure certaines pages
if (!href.includes('/admin') && !href.includes('/login')) {
  links.add(href);
}
```

### Personnaliser l'extraction de contenu

Dans le node "Parse Content & Structure", vous pouvez ajuster les sélecteurs CSS selon la structure du site cible:

```javascript
const contentSelectors = [
  'article',           // Pour les blogs
  'main',              // Pour les sites modernes
  '.content',          // Classe commune
  '#main-content',     // ID commun
  '.post-content'      // Pour WordPress
];
```

### Limiter le crawling

Pour éviter de surcharger les serveurs:

1. Ajoutez un délai entre les requêtes:
   - Dans le node "Fetch Each Page", ajoutez une option `delay`

2. Limitez le nombre de pages:
   - Dans "Extract All Links", ajoutez: `return Array.from(links).slice(0, 100)`

3. Respectez le robots.txt:
   - Vérifiez `https://example.com/robots.txt` avant de scraper

## Dépannage

### n8n ne démarre pas
- Vérifiez que le port 5678 n'est pas déjà utilisé: `lsof -i :5678`
- Consultez les logs: `docker-compose logs -f n8n`

### Erreurs de scraping
- Certains sites bloquent les scrapers. Ajoutez un User-Agent dans les requêtes HTTP
- Vérifiez que le site est accessible et ne requiert pas d'authentification

### Traduction incomplète
- Le contenu peut être trop long pour l'API. Divisez-le en chunks plus petits
- Vérifiez vos quotas API (OpenAI, DeepL, Google)

### Performance lente
- Réduisez le nombre de pages avec `maxDepth`
- Utilisez le mode batch pour traiter plusieurs pages simultanément
- Augmentez les ressources Docker si nécessaire

## Arrêt et maintenance

```bash
# Arrêter n8n
docker-compose down

# Arrêter et supprimer les volumes (ATTENTION: supprime les données)
docker-compose down -v

# Voir les logs
docker-compose logs -f n8n

# Redémarrer
docker-compose restart
```

## Sauvegardes

Les données n8n sont stockées dans le volume Docker `n8n_data`. Pour sauvegarder:

```bash
# Sauvegarder les workflows
docker cp n8n:/home/node/.n8n/workflows ./backup/

# Sauvegarder les données scrapées
cp -r scraped_data ./backup/
```

## Considérations légales

- Respectez les conditions d'utilisation des sites web
- Vérifiez le fichier `robots.txt` avant de scraper
- Ne surchargez pas les serveurs (ajoutez des délais)
- Certains contenus peuvent être protégés par le droit d'auteur

## Support et Contribution

Pour des questions ou des améliorations, créez une issue sur GitHub.

## Licence

MIT
