# 🚀 Démarrage Immédiat - Scraper & Traducteur

## ✅ TOUT EST PRÊT À UTILISER!

Le scraper est **déjà installé et testé**. Vous pouvez commencer immédiatement.

## 🎯 Utilisation Simple

### Option 1: Scraper SANS traduction (le plus simple)

```bash
node scraper.js https://votre-site.com
```

Les pages seront scrapées et sauvegardées dans `scraped_data/` avec le texte original.

### Option 2: Scraper AVEC traduction gratuite

1. **Installez LibreTranslate** (service de traduction gratuit):

```bash
docker run -d -p 5000:5000 libretranslate/libretranslate
```

2. **Lancez le scraper avec traduction**:

```bash
TRANSLATE_SERVICE=libre node scraper.js https://votre-site.com
```

### Option 3: Utilisation avec npm

```bash
npm run scrape https://votre-site.com
```

## 📖 Documentation Complète

- **STANDALONE_GUIDE.md** - Guide complet du scraper standalone
- **README.md** - Documentation complète avec n8n et toutes les fonctionnalités
- **QUICKSTART.md** - Guide de démarrage rapide pour n8n

## ⚙️ Configuration Rapide

Pour changer les paramètres, éditez `scraper.js` lignes 13-22:

```javascript
const config = {
  maxDepth: 3,      // Profondeur de crawling (3 niveaux)
  maxPages: 50,     // Maximum 50 pages
  delay: 1000,      // 1 seconde entre chaque page
};
```

## 📊 Résultats

Les données scrapées sont dans `scraped_data/`:

```
scraped_data/
├── summary.json       # Résumé de tout ce qui a été scrapé
├── category1/
│   ├── page1.json    # Contenu original + traduit
│   └── page2.json
└── category2/
    └── page3.json
```

Chaque fichier contient:
- URL originale
- Titre original et traduit
- Contenu original et traduit
- Structure du site (catégorie, chemin)

## 🌍 Services de Traduction

| Service | Gratuit? | Qualité | Installation |
|---------|----------|---------|--------------|
| **LibreTranslate** ⭐ | Oui, illimité | Bonne | `docker run -d -p 5000:5000 libretranslate/libretranslate` |
| **DeepL** | 500k chars/mois | Excellente | Créer compte sur deepl.com |
| **Google Translate** | 500k chars/mois | Bonne | Créer compte GCP |
| **OpenAI** | Non | Excellente | Créer compte OpenAI |

### Utiliser un service de traduction

```bash
# LibreTranslate (gratuit, local)
TRANSLATE_SERVICE=libre node scraper.js https://site.com

# DeepL (meilleure qualité)
API_KEY=votre_cle TRANSLATE_SERVICE=deepl node scraper.js https://site.com

# Google Translate
API_KEY=votre_cle TRANSLATE_SERVICE=google node scraper.js https://site.com

# OpenAI
API_KEY=votre_cle TRANSLATE_SERVICE=openai node scraper.js https://site.com
```

## 🧪 Test

Pour vérifier que tout fonctionne:

```bash
node test-parser.js
```

Vous devriez voir:
```
✅ Le parser fonctionne correctement!
```

## 💡 Exemples

### Scraper un blog WordPress

```bash
node scraper.js https://blog.example.com
```

### Scraper et traduire une documentation

```bash
TRANSLATE_SERVICE=libre node scraper.js https://docs.example.com
```

### Limiter à 10 pages pour un test rapide

Éditez `scraper.js` et changez:
```javascript
maxPages: 10,
```

## 🔧 Générer un Site HTML à partir des Données

Une fois le scraping terminé, générez un site HTML navigable:

```bash
npm run generate-site
```

Ouvrez ensuite `output/index.html` dans votre navigateur.

## 🆘 Besoin d'Aide?

**Le scraper ne trouve pas de contenu?**
- Certains sites chargent le contenu en JavaScript (sites React, Vue, etc.)
- Le scraper fonctionne mieux avec du HTML statique

**Erreur de traduction?**
- Vérifiez que LibreTranslate est bien démarré: `docker ps`
- Vérifiez votre clé API si vous utilisez DeepL/Google/OpenAI

**Trop lent?**
- Réduisez `maxPages` et `maxDepth`
- Le délai de 1000ms entre requêtes est normal (respecte les serveurs)

## 📚 Pour Aller Plus Loin

- **STANDALONE_GUIDE.md** - Guide détaillé avec tous les paramètres
- **README.md** - Documentation complète incluant n8n

## 🎉 C'est Parti!

```bash
node scraper.js https://votre-site-prefere.com
```

Bon scraping! 🚀
