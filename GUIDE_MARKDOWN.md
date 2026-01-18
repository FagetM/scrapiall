# 📝 Guide Scraper Markdown

Scraper simplifié qui convertit directement les sites web en fichiers Markdown.
**Aucune traduction** - juste le contenu en Markdown pour traiter après.

## 🚀 Utilisation Ultra-Simple

### Commande de Base

```bash
node scraper-md.js https://votre-site.com
```

### Avec Scripts NPM

```bash
npm run scrape:md https://votre-site.com
```

### Avec Paramètres

```bash
# Syntax: node scraper-md.js <URL> [profondeur] [max-pages]

# Profondeur 5, max 100 pages
node scraper-md.js https://example.com 5 100

# Profondeur 2, max 20 pages
node scraper-md.js https://example.com 2 20
```

## 📊 Ce que Vous Obtenez

### Structure des Fichiers

```
scraped_content/
├── INDEX.md              # Index de toutes les pages avec liens
├── summary.json          # Résumé en JSON
├── root/
│   └── index.md         # Page d'accueil
├── blog/
│   ├── article-1.md
│   ├── article-2.md
│   └── category_tech.md
└── docs/
    ├── getting-started.md
    └── api_reference.md
```

### Format des Fichiers Markdown

Chaque fichier `.md` contient:

```markdown
---
title: Titre de la Page
url: https://example.com/page
scraped_at: 2026-01-18T...
---

# Titre de la Page

Le contenu converti en Markdown...

## Sous-titre

Paragraphes, **gras**, *italique*, [liens](url), etc.

- Liste
- D'items

```code blocks```
```

## ✨ Fonctionnalités

### Conversion Automatique

Le scraper convertit automatiquement:

- ✅ **Titres** (H1-H6) → `# ## ###` etc.
- ✅ **Paragraphes** → Texte normal
- ✅ **Listes** (ul/ol) → `-` puces
- ✅ **Liens** → `[texte](url)`
- ✅ **Images** → `![alt](url)`
- ✅ **Gras/Italique** → `**gras**` `*italique*`
- ✅ **Code** → `` `code` `` et ` ```blocs``` `
- ✅ **Citations** → `> citation`
- ✅ **Lignes horizontales** → `---`

### Nettoyage Automatique

Retire automatiquement:

- ❌ Scripts JavaScript
- ❌ Styles CSS
- ❌ Navigation (nav)
- ❌ En-têtes (header)
- ❌ Pieds de page (footer)
- ❌ Commentaires HTML

### Préservation de l'Arborescence

Le scraper crée la même structure que le site original:

```
Site: https://example.com/blog/tech/article-1
Fichier: scraped_content/blog/tech/article-1.md
```

## 📚 Exemples Concrets

### Exemple 1: Scraper un Blog

```bash
node scraper-md.js https://blog.example.com
```

**Résultat:**
- Tous les articles en Markdown
- Structure du blog préservée
- INDEX.md avec liens vers tous les articles

### Exemple 2: Scraper une Documentation

```bash
node scraper-md.js https://docs.example.com 4 200
```

- Profondeur 4 (4 niveaux de sous-pages)
- Maximum 200 pages
- Parfait pour les docs avec beaucoup de pages

### Exemple 3: Test Rapide (10 pages)

```bash
node scraper-md.js https://example.com 2 10
```

- Profondeur 2 seulement
- Maximum 10 pages
- Rapide pour tester

## 📖 Fichier INDEX.md

Un fichier `INDEX.md` est automatiquement créé avec:

- Liste de toutes les pages scrapées
- Liens vers les fichiers Markdown locaux
- Liens vers les sources originales
- Groupement par catégorie

Exemple:

```markdown
# Index des Pages Scrapées

**Site source:** https://example.com
**Pages scrapées:** 25

## blog

- [Mon Premier Article](blog/mon-premier-article.md) - [Source](https://example.com/blog/premier)
- [Deuxième Article](blog/deuxieme.md) - [Source](https://example.com/blog/deuxieme)

## docs

- [Guide de Démarrage](docs/getting-started.md) - [Source](https://example.com/docs/start)
```

## ⚙️ Configuration

### Paramètres par Défaut

- **Profondeur:** 3 niveaux
- **Pages max:** 50 pages
- **Délai:** 1000ms (1 seconde entre chaque page)
- **Dossier:** `./scraped_content`

### Modifier les Paramètres

Éditez `scraper-md.js` lignes 13-20:

```javascript
const config = {
  maxDepth: 3,           // Profondeur de crawling
  maxPages: 50,          // Nombre max de pages
  outputDir: './scraped_content',  // Dossier de sortie
  delay: 1000,           // Délai entre requêtes (ms)
  includeImages: true,   // Inclure les images
  includeLinks: true     // Inclure les liens
};
```

## 🔄 Workflow Recommandé

### 1. Scraper en Markdown

```bash
node scraper-md.js https://site-etranger.com
```

### 2. Vérifier le Contenu

Ouvrir `scraped_content/INDEX.md` pour voir toutes les pages.

### 3. Traduire Après

Vous pouvez maintenant:

- Traduire avec ChatGPT/Claude en copiant les fichiers .md
- Utiliser un outil de traduction de fichiers Markdown
- Traduire manuellement les fichiers importants
- Utiliser DeepL ou Google Translate sur les fichiers

### 4. Publier ou Utiliser

Les fichiers Markdown sont prêts à être:

- Publiés sur un site statique (Jekyll, Hugo, etc.)
- Importés dans Notion, Obsidian, etc.
- Convertis en PDF
- Utilisés comme documentation

## 🎯 Cas d'Usage

### Documentation Technique

```bash
# Scraper docs Python
node scraper-md.js https://docs.python.org/3/ 5 500

# Résultat: Toute la doc en Markdown local
# Vous pouvez chercher, annoter, traduire à votre rythme
```

### Blog Personnel

```bash
# Sauvegarder votre blog
node scraper-md.js https://monblog.com 3 100

# Résultat: Backup complet en Markdown
```

### Site Étranger à Traduire

```bash
# Scraper le site
node scraper-md.js https://foreign-site.com

# Résultat: Tous les .md à traduire
# Puis traduire avec votre outil préféré
```

### Wiki ou Base de Connaissance

```bash
# Scraper un wiki
node scraper-md.js https://wiki.example.com 6 1000

# Résultat: Wiki entier en Markdown
```

## 💡 Astuces

### Astuce 1: Tester d'Abord

Commencez avec peu de pages pour tester:

```bash
node scraper-md.js https://site.com 1 5
```

### Astuce 2: Respecter les Serveurs

Si le site est lent ou vous bloque, augmentez le délai:

```javascript
// Dans scraper-md.js
delay: 2000,  // 2 secondes au lieu de 1
```

### Astuce 3: Cibler une Section

Si vous voulez seulement le blog:

```bash
node scraper-md.js https://example.com/blog
```

### Astuce 4: Conversion Bulk

Pour traduire tous les fichiers d'un coup:

```bash
# Installer un outil de traduction
npm install -g markdown-translate

# Traduire tous les .md
find scraped_content -name "*.md" -exec markdown-translate {} fr \;
```

## 🐛 Dépannage

### Le contenu est incomplet

- Certains sites chargent le contenu en JavaScript (React, Vue, etc.)
- Le scraper fonctionne mieux avec HTML statique
- Solution: Utiliser un browser headless (Puppeteer) pour ces cas

### Trop de pages

- Réduisez `maxDepth` et `maxPages`
- Ou ciblez une section spécifique du site

### Fichiers avec caractères bizarres

- Le scraper nettoie les entités HTML
- Vérifiez l'encodage si problème persiste

### Site bloque le scraper

- Augmentez le `delay`
- Vérifiez `robots.txt` du site
- Certains sites bloquent tous les scrapers

## 📊 Statistiques Après Scraping

Le scraper affiche:

```
✅ Scraping terminé!
📊 45 pages converties en Markdown
⏱️  Durée: 67.3s
📁 Résultats dans: ./scraped_content
📝 Index: ./scraped_content/INDEX.md

Catégories:
  - blog: 25 page(s)
  - docs: 15 page(s)
  - about: 5 page(s)
```

## ⚖️ Légal

- Vérifiez toujours `robots.txt`
- Respectez les conditions d'utilisation
- Ne surchargez pas les serveurs (utilisez un délai)
- Usage personnel et éducatif recommandé

## 🚀 C'est Tout!

```bash
# Commande simple pour démarrer
node scraper-md.js https://votre-site.com

# Profitez de vos fichiers Markdown!
```

Pour des questions, consultez les autres guides:
- `START_HERE.md` - Guide général
- `STANDALONE_GUIDE.md` - Scraper avec traduction
