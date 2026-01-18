# 🏥 Guide pour Scraper l'Annuaire Orthoptiste

## Site à Scraper
**URL:** https://www.orthoptiste.pro/annuaire/

## 🚀 Commande à Exécuter

### Sur Votre Machine Locale

```bash
# Aller dans le dossier du projet
cd /chemin/vers/scrapiall

# Lancer le scraper
node scraper-md.js https://www.orthoptiste.pro/annuaire/ 3 100
```

### Paramètres Expliqués

- `https://www.orthoptiste.pro/annuaire/` - URL de départ
- `3` - Profondeur de 3 niveaux (pour explorer les sous-pages)
- `100` - Maximum 100 pages

## 📊 Ce Que Vous Obtiendrez

```
scraped_content/
├── INDEX.md                    # Index avec tous les liens
├── summary.json                # Statistiques
├── annuaire/
│   ├── index.md               # Page principale annuaire
│   ├── [ville]_[nom].md       # Fiches orthoptistes
│   └── ...
└── ...
```

### Contenu des Fichiers

Chaque fichier `.md` contiendra:
- **Nom de l'orthoptiste**
- **Adresse du cabinet**
- **Coordonnées** (téléphone, email si disponible)
- **Informations pratiques**
- **Spécialités** (si mentionnées)

Format:
```markdown
---
title: Dr. Dupont - Orthoptiste Paris
url: https://www.orthoptiste.pro/annuaire/paris/dupont
scraped_at: 2026-01-18T...
---

# Dr. Dupont - Orthoptiste Paris

**Adresse:**
123 Rue de la Santé
75014 Paris

**Téléphone:** 01 23 45 67 89

**Horaires:**
Lun-Ven: 9h-18h
...
```

## 🔧 Ajuster le Scraping

### Plus de Pages

Si l'annuaire contient plus de 100 orthoptistes:

```bash
node scraper-md.js https://www.orthoptiste.pro/annuaire/ 4 500
```

### Moins de Pages (Test)

Pour tester d'abord:

```bash
node scraper-md.js https://www.orthoptiste.pro/annuaire/ 2 20
```

### Une Région Spécifique

Si vous voulez seulement une région (ex: Île-de-France):

```bash
node scraper-md.js https://www.orthoptiste.pro/annuaire/ile-de-france/ 3 50
```

### Une Ville Spécifique

Pour une ville précise (ex: Paris):

```bash
node scraper-md.js https://www.orthoptiste.pro/annuaire/paris/ 2 30
```

## 📝 Après le Scraping

### 1. Vérifier les Résultats

```bash
# Voir l'index
cat scraped_content/INDEX.md

# Voir les statistiques
cat scraped_content/summary.json
```

### 2. Organiser les Données

Les fichiers Markdown seront organisés par:
- Région
- Ville
- Nom de l'orthoptiste

### 3. Utiliser les Données

Vous pouvez:
- **Importer dans une base de données**
- **Créer une carte interactive**
- **Publier sur un site web**
- **Analyser les données** (nombre par ville, etc.)
- **Créer un annuaire local**

## 🗂️ Script pour Convertir en CSV

Si vous voulez un fichier CSV pour Excel/Google Sheets:

```bash
# Créer un script de conversion
node -e "
const fs = require('fs');
const path = require('path');

// Lire tous les fichiers .md
const files = fs.readdirSync('scraped_content/annuaire', {recursive: true});
const mdFiles = files.filter(f => f.endsWith('.md'));

let csv = 'Nom,Ville,Adresse,Téléphone,URL\n';

mdFiles.forEach(file => {
  const content = fs.readFileSync(path.join('scraped_content/annuaire', file), 'utf-8');

  // Extraire les infos (exemple simplifié)
  const titleMatch = content.match(/title: (.+)/);
  const urlMatch = content.match(/url: (.+)/);

  if (titleMatch && urlMatch) {
    const name = titleMatch[1].replace(/,/g, ';');
    const url = urlMatch[1];
    csv += \`\${name},,,,\${url}\n\`;
  }
});

fs.writeFileSync('annuaire.csv', csv);
console.log('✅ Fichier CSV créé: annuaire.csv');
"
```

## 📊 Analyser les Données

### Compter par Ville

```bash
# Dans scraped_content/
grep -r "^title:" annuaire/ | cut -d: -f2 | sort | uniq -c | sort -rn
```

### Rechercher dans l'Annuaire

```bash
# Chercher "Paris"
grep -r "Paris" scraped_content/annuaire/

# Chercher un nom spécifique
grep -r "Dupont" scraped_content/annuaire/
```

## 🌐 Créer une Version Web

Si vous voulez publier l'annuaire sur un site web:

```bash
# Installer un générateur de site statique
npm install -g @11ty/eleventy

# Créer la structure
mkdir -p site/annuaire
cp -r scraped_content/annuaire/*.md site/annuaire/

# Générer le site
cd site && eleventy
```

## ⚡ Optimisations

### Scraping Rapide

Si le site est lent, ajoutez un délai plus long dans `scraper-md.js`:

```javascript
// Ligne 18
delay: 2000,  // 2 secondes entre chaque page
```

### Reprendre un Scraping Interrompu

Le scraper crée les fichiers au fur et à mesure. Si interrompu:

1. Regarder ce qui a été scrapé dans `scraped_content/`
2. Relancer avec un URL plus spécifique pour compléter

## 📋 Checklist Complète

- [ ] Cloner le repo sur votre machine
- [ ] Lancer `node scraper-md.js https://www.orthoptiste.pro/annuaire/ 3 100`
- [ ] Attendre la fin du scraping (~2 minutes pour 100 pages)
- [ ] Vérifier `scraped_content/INDEX.md`
- [ ] Explorer les fichiers Markdown
- [ ] Optionnel: Convertir en CSV ou autre format
- [ ] Optionnel: Traduire si besoin
- [ ] Utiliser les données selon vos besoins

## 🎯 Résultat Attendu

Après le scraping, vous aurez:

- ✅ **Tous les orthoptistes** de l'annuaire
- ✅ **Leurs coordonnées** en format structuré
- ✅ **Organisation par région/ville**
- ✅ **Format Markdown** facile à lire et traiter
- ✅ **Index navigable**
- ✅ **Données prêtes** pour traduction ou publication

## 💡 Cas d'Usage

### 1. Créer votre propre annuaire
Scraper → Traduire → Publier sur votre site

### 2. Analyse de données
Combien d'orthoptistes par région? Zones mal couvertes?

### 3. Application mobile
Utiliser les données pour une app de prise de RDV

### 4. Base de données
Importer dans MySQL/PostgreSQL pour recherche avancée

## 🆘 Si Problème

### Site trop grand
Scraper par région:
```bash
for region in ile-de-france paca auvergne; do
  node scraper-md.js https://www.orthoptiste.pro/annuaire/$region/ 3 100
done
```

### Contenu manquant
Certaines pages peuvent être en JavaScript. Vérifier manuellement.

### Erreur de connexion
Vérifier votre connexion Internet et réessayer.

---

**Prêt à scraper?**

```bash
node scraper-md.js https://www.orthoptiste.pro/annuaire/ 3 100
```

Durée estimée: **~2-3 minutes** pour 100 pages
