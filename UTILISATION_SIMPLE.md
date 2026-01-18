# 🎯 Utilisation Simple - Scraper vers Markdown

## ✅ C'EST PRÊT!

Le scraper Markdown est installé, testé et prêt à utiliser.

## 🚀 Commande Simple

```bash
node scraper-md.js https://votre-site.com
```

**C'est tout!**

## 📊 Ce Que Vous Obtenez

```
scraped_content/
├── INDEX.md              ← Ouvrez ce fichier pour voir tous les liens
├── summary.json          ← Statistiques
├── category1/
│   ├── page1.md         ← Contenu en Markdown
│   └── page2.md
└── category2/
    └── page3.md
```

## 📝 Format des Fichiers

Chaque `.md` contient:

```markdown
---
title: Titre de la Page
url: https://example.com/page
scraped_at: 2026-01-18T...
---

# Titre de la Page

Votre contenu converti en Markdown...

## Sous-titres préservés

Texte, **gras**, *italique*, [liens](url), etc.
```

## ⚙️ Options

### Limiter la Profondeur

```bash
# Seulement 2 niveaux de pages
node scraper-md.js https://site.com 2
```

### Limiter le Nombre de Pages

```bash
# Maximum 20 pages
node scraper-md.js https://site.com 3 20
```

### Test Rapide

```bash
# Profondeur 1, max 5 pages
node scraper-md.js https://site.com 1 5
```

## 💡 Exemples Concrets

### Scraper un Blog

```bash
node scraper-md.js https://blog.example.com
```

**Résultat:** Tous les articles en Markdown dans `scraped_content/`

### Scraper une Documentation

```bash
node scraper-md.js https://docs.example.com 5 200
```

**Résultat:** Documentation complète en Markdown

### Scraper une Seule Section

```bash
node scraper-md.js https://site.com/blog 2 30
```

**Résultat:** Seulement la section blog

## 📖 Workflow Complet

### 1. Scraper

```bash
node scraper-md.js https://site-etranger.com
```

### 2. Vérifier

Ouvrir `scraped_content/INDEX.md` pour voir toutes les pages

### 3. Traduire

Vous pouvez maintenant traduire les fichiers `.md` avec:
- ChatGPT / Claude (copier-coller)
- DeepL (upload de fichiers)
- Google Translate
- Outil CLI de traduction
- Manuellement

### 4. Utiliser

Les fichiers Markdown sont prêts pour:
- Publication (Jekyll, Hugo, Gatsby, etc.)
- Import (Notion, Obsidian, etc.)
- Conversion PDF
- Documentation locale

## 🔧 Script NPM

```bash
npm run scrape:md https://votre-site.com
```

## 📚 Documentation Complète

- **GUIDE_MARKDOWN.md** - Guide détaillé avec tous les paramètres
- **STANDALONE_GUIDE.md** - Scraper avec traduction intégrée
- **README.md** - Documentation n8n

## ✅ Tests

Le scraper a été testé et tous les tests passent (15/15):

```bash
node test-md-parser.js
```

```
🎉 Tous les tests sont OK!
Le convertisseur HTML → Markdown fonctionne parfaitement.
```

## 🎯 Cas d'Usage Typiques

### Documentation Technique

```bash
# Scraper la doc Python
node scraper-md.js https://docs.python.org/3/ 4 300

# Résultat: Doc complète en Markdown local
# Cherchez, annotez, traduisez à votre rythme
```

### Site à Traduire

```bash
# 1. Scraper
node scraper-md.js https://foreign-site.com

# 2. Traduire les .md avec votre outil préféré

# 3. Publier le site traduit
```

### Backup de Blog

```bash
# Sauvegarder votre contenu
node scraper-md.js https://monblog.com

# Résultat: Backup complet en Markdown
```

## ⚡ Performance

- **Vitesse:** ~1 page/seconde (délai de 1s pour respecter les serveurs)
- **45 pages = ~67 secondes**
- **Ajustable** via le paramètre `delay` dans le code

## 🐛 Si Problème

### Contenu Incomplet

Certains sites chargent le contenu en JavaScript. Le scraper fonctionne mieux avec du HTML statique.

### Trop Lent

Réduisez le nombre de pages:
```bash
node scraper-md.js https://site.com 2 10
```

### Site Bloque

Augmentez le délai dans `scraper-md.js` (ligne 18):
```javascript
delay: 2000,  // 2 secondes au lieu de 1
```

## 🎉 C'est Tout!

**Commande unique pour commencer:**

```bash
node scraper-md.js https://votre-site.com
```

**Profitez de vos fichiers Markdown!** 📝
