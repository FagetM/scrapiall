# 🏥 Scraper l'Annuaire Orthoptiste - Guide Rapide

## 🎯 Objectif

Scraper le site **https://www.orthoptiste.pro/annuaire/** et convertir tout le contenu en fichiers Markdown.

## 🚀 Démarrage Rapide

### Sur Mac/Linux

```bash
# Méthode 1: Script automatique
./scrape-orthoptiste.sh

# Méthode 2: Commande directe
node scraper-md.js https://www.orthoptiste.pro/annuaire/ 3 100
```

### Sur Windows

```batch
REM Méthode 1: Script automatique
scrape-orthoptiste.bat

REM Méthode 2: Commande directe
node scraper-md.js https://www.orthoptiste.pro/annuaire/ 3 100
```

## 📊 Résultat

Après ~2-3 minutes, vous aurez:

```
scraped_content/
├── INDEX.md                    ← Commencez par ouvrir ce fichier!
├── summary.json                ← Statistiques
└── annuaire/
    ├── index.md               ← Page principale
    ├── paris_cabinet-dupont.md
    ├── lyon_dr-martin.md
    └── ... (toutes les fiches)
```

## 🎯 Cas d'Usage Spécifiques

### Scraper une Région

```bash
# Île-de-France uniquement
./scrape-orthoptiste.sh ile-de-france

# Ou directement
node scraper-md.js https://www.orthoptiste.pro/annuaire/ile-de-france/ 3 50
```

### Scraper une Ville

```bash
# Paris uniquement
./scrape-orthoptiste.sh ile-de-france paris

# Ou directement
node scraper-md.js https://www.orthoptiste.pro/annuaire/ile-de-france/paris/ 2 30
```

### Test Rapide (10 pages)

```bash
node scraper-md.js https://www.orthoptiste.pro/annuaire/ 1 10
```

## 📝 Format des Données

Chaque orthoptiste aura un fichier `.md` avec:

```markdown
---
title: Cabinet Dupont - Paris 15ème
url: https://www.orthoptiste.pro/annuaire/...
scraped_at: 2026-01-18T...
---

# Cabinet Dupont - Paris 15ème

**Adresse:**
45 Avenue de Suffren
75015 Paris

**Téléphone:** 01 45 67 89 10

**Horaires:** ...

**Spécialités:** ...
```

## 📚 Documentation Complète

| Fichier | Description |
|---------|-------------|
| **LISEZMOI_ORTHOPTISTE.md** | Ce fichier - Guide rapide |
| **GUIDE_ANNUAIRE_ORTHOPTISTE.md** | Guide complet avec toutes les options |
| **exemple-resultat-annuaire.md** | Exemples de ce que vous allez obtenir |
| **GUIDE_MARKDOWN.md** | Guide général du scraper Markdown |
| **UTILISATION_SIMPLE.md** | Guide ultra-simple pour débuter |

## 🔧 Scripts Disponibles

| Script | Usage |
|--------|-------|
| `scrape-orthoptiste.sh` | Script automatique (Mac/Linux) |
| `scrape-orthoptiste.bat` | Script automatique (Windows) |
| `scraper-md.js` | Scraper principal |
| `npm run scrape:md` | Via npm |

## 💡 Après le Scraping

### 1. Naviguer les Résultats

```bash
# Ouvrir l'index
cat scraped_content/INDEX.md

# Ou dans votre éditeur de texte/Markdown
code scraped_content/
```

### 2. Rechercher

```bash
# Chercher tous les orthoptistes à Paris
grep -r "Paris" scraped_content/annuaire/

# Chercher un nom
grep -r "Dupont" scraped_content/annuaire/
```

### 3. Statistiques

```bash
# Compter par région
ls scraped_content/annuaire/*.md | wc -l

# Voir le résumé
cat scraped_content/summary.json
```

### 4. Convertir en CSV (pour Excel)

```bash
# Créer un fichier CSV simple
echo "Titre,URL" > annuaire.csv
grep -h "^title:" scraped_content/annuaire/*.md | cut -d: -f2- | while read title; do
  echo "$title," >> annuaire.csv
done
```

## 🌍 Traduire les Données

Si vous voulez traduire l'annuaire:

1. **Option 1: En masse avec ChatGPT/Claude**
   - Copier le contenu de plusieurs fichiers .md
   - Demander la traduction
   - Coller dans de nouveaux fichiers

2. **Option 2: Avec DeepL**
   - Upload des fichiers .md sur DeepL
   - Télécharger les traductions

3. **Option 3: Outil CLI**
   ```bash
   # Exemple avec un outil de traduction
   for file in scraped_content/annuaire/*.md; do
     translate-md "$file" fr en
   done
   ```

## 📱 Créer une Application

Les données Markdown peuvent servir à créer:

### Site Web Statique

```bash
# Avec Jekyll
gem install jekyll
jekyll new mon-annuaire
cp scraped_content/annuaire/*.md mon-annuaire/_posts/
jekyll serve
```

### Base de Données

```javascript
// Parser les fichiers .md et insérer dans MySQL/PostgreSQL
const fs = require('fs');
const files = fs.readdirSync('scraped_content/annuaire');

files.forEach(file => {
  const content = fs.readFileSync(`scraped_content/annuaire/${file}`, 'utf-8');
  // Extraire les données et insérer dans DB
});
```

### API REST

```javascript
// Créer une API avec Express
const express = require('express');
const app = express();

app.get('/api/orthoptistes', (req, res) => {
  // Lire les fichiers .md et retourner en JSON
});
```

## ⚡ Performance

- **Vitesse:** ~1 page/seconde (pour respecter le serveur)
- **100 pages:** ~2-3 minutes
- **Configurable:** Ajuster le délai dans `scraper-md.js`

## 🆘 Dépannage

### Erreur de connexion

```
❌ Erreur: getaddrinfo EAI_AGAIN
```

**Solution:** Vérifier votre connexion Internet

### Trop lent

**Solution:** Réduire le nombre de pages
```bash
node scraper-md.js https://www.orthoptiste.pro/annuaire/ 2 20
```

### Contenu incomplet

**Solution:** Le site peut charger du contenu en JavaScript. Vérifier manuellement les pages importantes.

### Script ne démarre pas

**Solution:** Vérifier que Node.js est installé
```bash
node --version  # Doit afficher v14+ ou plus
```

## ✅ Checklist Complète

- [ ] Node.js installé (v14+)
- [ ] Projet cloné sur votre machine
- [ ] Connexion Internet active
- [ ] Lancer le script de scraping
- [ ] Vérifier `scraped_content/INDEX.md`
- [ ] Explorer les fichiers Markdown
- [ ] Utiliser les données selon vos besoins

## 🎯 Exemples Concrets

### Exemple 1: Annuaire Complet

```bash
# Scraper tout l'annuaire
node scraper-md.js https://www.orthoptiste.pro/annuaire/ 3 200

# Résultat: Tous les orthoptistes de France en Markdown
```

### Exemple 2: Par Région

```bash
# Seulement Île-de-France
./scrape-orthoptiste.sh ile-de-france

# Résultat: Orthoptistes d'IdF uniquement
```

### Exemple 3: Test Rapide

```bash
# 10 pages pour tester
node scraper-md.js https://www.orthoptiste.pro/annuaire/ 1 10

# Résultat: Quelques pages pour voir le format
```

## 📊 Ce Que Vous Pouvez Faire

Avec les données scrapées, vous pouvez:

✅ Créer votre propre annuaire web
✅ Développer une application mobile
✅ Faire des analyses (nombre par région, etc.)
✅ Créer une carte interactive
✅ Publier un annuaire traduit
✅ Créer une API de recherche
✅ Générer des statistiques
✅ Exporter vers Excel/Google Sheets

## 🚀 Commencer Maintenant

**Commande simple pour démarrer:**

```bash
node scraper-md.js https://www.orthoptiste.pro/annuaire/ 3 100
```

**Durée:** ~2-3 minutes
**Résultat:** Tous les orthoptistes en Markdown dans `scraped_content/`

---

**Besoin d'aide?** Consultez **GUIDE_ANNUAIRE_ORTHOPTISTE.md** pour plus de détails!
