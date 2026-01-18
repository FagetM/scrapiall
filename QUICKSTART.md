# Guide de Démarrage Rapide 🚀

## Installation en 5 minutes

### 1. Démarrer n8n

```bash
# Option A: Avec Docker (recommandé)
docker-compose up -d

# Option B: Avec npm
npm install -g n8n && n8n start
```

### 2. Accéder à n8n

Ouvrez votre navigateur: http://localhost:5678

Connectez-vous avec:
- Username: `admin`
- Password: `admin123`

### 3. Importer le workflow

1. Cliquez sur "➕" en haut à gauche
2. Sélectionnez "Import from File"
3. Choisissez `workflows/website-scraper-translator.json`
4. Cliquez sur "Import"

### 4. Configurer le site à scraper

Dans le workflow, trouvez le premier node "Configuration" et modifiez:

```javascript
baseUrl: "https://example.com"  // Remplacez par le site à scraper
targetLanguage: "fr"            // Langue cible
maxDepth: "3"                   // Profondeur de crawl
```

### 5. Choisir le service de traduction

#### Option 1: Sans API (Mode test)
Laissez tous les nodes de traduction désactivés. Le workflow copiera simplement le contenu original.

#### Option 2: Avec OpenAI (Meilleure qualité)
1. Obtenez une clé API: https://platform.openai.com/api-keys
2. Dans n8n: Settings > Credentials > Add Credential > HTTP Header Auth
3. Ajoutez:
   - Name: `Authorization`
   - Value: `Bearer sk-votre-cle-api`
4. Dans le workflow, activez le node "Translate with OpenAI"
5. Associez la credential au node

#### Option 3: Avec Google Translate (Gratuit)
1. Obtenez une clé API: https://console.cloud.google.com/
2. Activez l'API Cloud Translation
3. Dans le workflow, activez le node "Translate with Google"
4. Ajoutez votre clé API dans les variables d'environnement

### 6. Exécuter le workflow

1. Cliquez sur "Execute Workflow" en haut à droite
2. Attendez que le workflow se termine (cela peut prendre quelques minutes)
3. Vérifiez les résultats dans le dossier `scraped_data/`

### 7. Générer le site HTML

```bash
npm run generate-site
```

Ouvrez ensuite `output/index.html` dans votre navigateur.

## Exemple Complet

Scraper et traduire un site de documentation:

```javascript
// Dans le node Configuration
{
  "baseUrl": "https://docs.example.com",
  "targetLanguage": "fr",
  "maxDepth": "2"
}
```

Exécutez le workflow et vous obtiendrez:
- ✅ Toutes les pages scrapées
- ✅ Contenu traduit en français
- ✅ Arborescence préservée
- ✅ Site HTML navigable

## Cas d'Usage Courants

### Blog étranger
```javascript
baseUrl: "https://blog.example.com"
maxDepth: "2"  // Ne scraper que les articles principaux
```

### Documentation technique
```javascript
baseUrl: "https://docs.example.com"
maxDepth: "3"  // Explorer toutes les sections
```

### Site e-commerce (pages produits)
```javascript
baseUrl: "https://shop.example.com"
// Ajoutez un filtre dans "Extract All Links":
if (href.includes('/product/')) {
  links.add(href);
}
```

## Problèmes Courants

### "Cannot connect to Docker daemon"
```bash
sudo systemctl start docker
```

### Port 5678 déjà utilisé
Modifiez le port dans `docker-compose.yml`:
```yaml
ports:
  - "8080:5678"  # Utilisez le port 8080 à la place
```

### Scraping bloqué
Certains sites bloquent les scrapers. Dans le node "Fetch Each Page", ajoutez:
```javascript
headers: {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}
```

### Traduction incomplète
Le contenu est peut-être trop long. Divisez-le en morceaux de 3000 caractères max.

## Prochaines Étapes

1. 📖 Lisez le [README complet](README.md) pour les fonctionnalités avancées
2. 🔧 Personnalisez le workflow selon vos besoins
3. 📊 Explorez les scripts d'export (Markdown, CSV)
4. 🚀 Automatisez avec des schedules n8n

## Astuces Pro

- **Sauvegardez vos workflows**: File > Export
- **Testez sur une petite partie**: Utilisez `maxDepth: 1` d'abord
- **Vérifiez robots.txt**: Respectez les règles du site
- **Utilisez des proxies**: Pour éviter les bans IP
- **Ajoutez des délais**: Entre les requêtes (option `delay`)

Besoin d'aide? Consultez la documentation complète dans [README.md](README.md)
