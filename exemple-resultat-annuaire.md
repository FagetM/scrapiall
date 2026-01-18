# Exemple de Résultat - Annuaire Orthoptiste

## 📁 Structure Attendue

Après avoir scrapé https://www.orthoptiste.pro/annuaire/, vous obtiendrez une structure comme:

```
scraped_content/
├── INDEX.md
├── summary.json
├── annuaire/
│   ├── index.md
│   ├── ile-de-france_paris-15eme_cabinet-dupont.md
│   ├── ile-de-france_paris-5eme_dr-martin.md
│   ├── auvergne-rhone-alpes_lyon_cabinet-durand.md
│   ├── provence-alpes-cote-azur_marseille_dr-bernard.md
│   └── ...
```

## 📄 Exemple de Fichier: cabinet-dupont.md

```markdown
---
title: Cabinet Dupont - Orthoptiste Paris 15ème
url: https://www.orthoptiste.pro/annuaire/ile-de-france/paris-15eme/cabinet-dupont
scraped_at: 2026-01-18T12:34:56.789Z
---

# Cabinet Dupont - Orthoptiste Paris 15ème

## Informations Pratiques

**Adresse:**
45 Avenue de Suffren
75015 Paris
France

**Téléphone:** 01 45 67 89 10

**Email:** contact@cabinet-dupont.fr

## Horaires d'Ouverture

- Lundi: 9h00 - 18h00
- Mardi: 9h00 - 18h00
- Mercredi: 9h00 - 12h00
- Jeudi: 9h00 - 18h00
- Vendredi: 9h00 - 17h00
- Samedi: Fermé
- Dimanche: Fermé

## Spécialités

- Bilan orthoptique
- Rééducation oculomotrice
- Troubles de la convergence
- Strabisme
- Basse vision

## Informations Complémentaires

**Conventionné:** Oui
**Carte Vitale:** Acceptée
**Accessibilité PMR:** Oui

## Transport

**Métro:** La Motte-Picquet Grenelle (lignes 6, 8, 10)
**Bus:** Lignes 28, 80, 82
**Parking:** Parking souterrain à 50m

## Prendre Rendez-vous

[Prendre rendez-vous en ligne](https://www.orthoptiste.pro/annuaire/ile-de-france/paris-15eme/cabinet-dupont#rdv)
```

## 📄 Exemple de Fichier: dr-martin.md

```markdown
---
title: Dr. Sophie Martin - Orthoptiste Paris 5ème
url: https://www.orthoptiste.pro/annuaire/ile-de-france/paris-5eme/dr-martin
scraped_at: 2026-01-18T12:35:12.456Z
---

# Dr. Sophie Martin - Orthoptiste Paris 5ème

## Informations Pratiques

**Adresse:**
12 Rue Mouffetard
75005 Paris
France

**Téléphone:** 01 43 31 25 67

## Horaires d'Ouverture

- Lundi: 14h00 - 19h00
- Mardi: 9h00 - 13h00
- Mercredi: 9h00 - 18h00
- Jeudi: 14h00 - 19h00
- Vendredi: 9h00 - 13h00

## Spécialités

- Orthoptie pédiatrique
- Dépistage précoce
- Bilan visuel enfant
- Rééducation strabisme

## Langues Parlées

- Français
- Anglais
- Espagnol
```

## 📄 INDEX.md

```markdown
# Index des Pages Scrapées

**Site source:** https://www.orthoptiste.pro/annuaire/
**Date:** 2026-01-18T12:34:00.000Z
**Pages scrapées:** 87
**Durée:** 134.5s

## annuaire

- [Page principale Annuaire](annuaire/index.md) - [Source](https://www.orthoptiste.pro/annuaire/)
- [Cabinet Dupont - Paris 15ème](annuaire/ile-de-france_paris-15eme_cabinet-dupont.md) - [Source](https://www.orthoptiste.pro/annuaire/ile-de-france/paris-15eme/cabinet-dupont)
- [Dr. Sophie Martin - Paris 5ème](annuaire/ile-de-france_paris-5eme_dr-martin.md) - [Source](https://www.orthoptiste.pro/annuaire/ile-de-france/paris-5eme/dr-martin)
- [Cabinet Durand - Lyon](annuaire/auvergne-rhone-alpes_lyon_cabinet-durand.md) - [Source](https://www.orthoptiste.pro/annuaire/auvergne-rhone-alpes/lyon/cabinet-durand)
- [Dr. Bernard - Marseille](annuaire/provence-alpes-cote-azur_marseille_dr-bernard.md) - [Source](https://www.orthoptiste.pro/annuaire/provence-alpes-cote-azur/marseille/dr-bernard)
- ... (83 autres pages)

## ile-de-france

- [Annuaire Île-de-France](ile-de-france/index.md) - [Source](https://www.orthoptiste.pro/annuaire/ile-de-france/)
- ... (32 pages)

## auvergne-rhone-alpes

- [Annuaire Auvergne-Rhône-Alpes](auvergne-rhone-alpes/index.md) - [Source](https://www.orthoptiste.pro/annuaire/auvergne-rhone-alpes/)
- ... (18 pages)

## provence-alpes-cote-azur

- [Annuaire PACA](provence-alpes-cote-azur/index.md) - [Source](https://www.orthoptiste.pro/annuaire/provence-alpes-cote-azur/)
- ... (15 pages)
```

## 📄 summary.json

```json
{
  "baseUrl": "https://www.orthoptiste.pro/annuaire/",
  "totalPages": 87,
  "scrapedAt": "2026-01-18T12:34:00.000Z",
  "duration": "134.5s",
  "categories": {
    "annuaire": 22,
    "ile-de-france": 32,
    "auvergne-rhone-alpes": 18,
    "provence-alpes-cote-azur": 15
  },
  "pages": [
    {
      "title": "Annuaire des Orthoptistes en France",
      "url": "https://www.orthoptiste.pro/annuaire/",
      "category": "annuaire",
      "path": "scraped_content/annuaire/index.md",
      "size": 2456
    },
    {
      "title": "Cabinet Dupont - Orthoptiste Paris 15ème",
      "url": "https://www.orthoptiste.pro/annuaire/ile-de-france/paris-15eme/cabinet-dupont",
      "category": "annuaire",
      "path": "scraped_content/annuaire/ile-de-france_paris-15eme_cabinet-dupont.md",
      "size": 1823
    }
  ]
}
```

## 📊 Statistiques Attendues

### Console Output

```
🚀 Démarrage du scraper Markdown...

Configuration:
  URL de base: https://www.orthoptiste.pro/annuaire/
  Profondeur max: 3
  Pages max: 100
  Dossier de sortie: ./scraped_content
  Délai entre requêtes: 1000ms

📄 Scraping [1/100] (profondeur 0): https://www.orthoptiste.pro/annuaire/
✅ Sauvegardé: scraped_content/annuaire/index.md
📄 Scraping [2/100] (profondeur 1): https://www.orthoptiste.pro/annuaire/ile-de-france/
✅ Sauvegardé: scraped_content/ile-de-france/index.md
📄 Scraping [3/100] (profondeur 2): https://www.orthoptiste.pro/annuaire/ile-de-france/paris-15eme/cabinet-dupont
✅ Sauvegardé: scraped_content/annuaire/ile-de-france_paris-15eme_cabinet-dupont.md
...
📄 Scraping [87/100] (profondeur 2): https://www.orthoptiste.pro/annuaire/paca/marseille/dr-bernard
✅ Sauvegardé: scraped_content/annuaire/provence-alpes-cote-azur_marseille_dr-bernard.md

✅ Scraping terminé!
📊 87 pages converties en Markdown
⏱️  Durée: 134.5s
📁 Résultats dans: ./scraped_content
📝 Index: scraped_content/INDEX.md

Catégories:
  - annuaire: 22 page(s)
  - ile-de-france: 32 page(s)
  - auvergne-rhone-alpes: 18 page(s)
  - provence-alpes-cote-azur: 15 page(s)
```

## 💡 Utilisation des Données

### 1. Recherche par Ville

```bash
# Trouver tous les orthoptistes à Paris
grep -r "75015 Paris" scraped_content/annuaire/
```

### 2. Extraction d'Emails

```bash
# Extraire tous les emails
grep -rh "Email:" scraped_content/annuaire/ | sort | uniq
```

### 3. Compter par Région

```bash
# Compter combien par région
ls scraped_content/annuaire/ | cut -d_ -f1 | sort | uniq -c
```

### 4. Créer une Liste de Téléphones

```bash
# Extraire tous les numéros de téléphone
grep -rh "Téléphone:" scraped_content/annuaire/ > telephones.txt
```

## 🔄 Traduction

Si vous voulez traduire l'annuaire dans une autre langue:

```bash
# Utiliser DeepL, Google Translate, ou ChatGPT sur chaque fichier .md
# Les fichiers Markdown sont faciles à traduire automatiquement
```

## 📱 Créer une Application

Les données Markdown peuvent servir à:

1. **Site Web**: Générer un site statique avec Jekyll/Hugo
2. **App Mobile**: Parser les .md pour créer une base de données
3. **API**: Créer une API REST avec les données
4. **Carte Interactive**: Géocoder les adresses et afficher sur une carte

## ✅ Validation des Données

Après le scraping, vérifiez:

- [ ] Tous les fichiers ont un titre
- [ ] Les adresses sont complètes
- [ ] Les téléphones sont au bon format
- [ ] Pas de pages en double
- [ ] INDEX.md est lisible

---

**Prêt à scraper l'annuaire orthoptiste?**

```bash
node scraper-md.js https://www.orthoptiste.pro/annuaire/ 3 100
```
