#!/bin/bash

# Script pour scraper l'annuaire orthoptiste
# Usage: ./scrape-orthoptiste.sh [region] [ville]

set -e

echo "🏥 Scraper Annuaire Orthoptiste"
echo ""

# URL de base
BASE_URL="https://www.orthoptiste.pro/annuaire"

# Paramètres par défaut
DEPTH=3
MAX_PAGES=100

# Si une région est spécifiée
if [ ! -z "$1" ]; then
  REGION=$1
  URL="$BASE_URL/$REGION"
  echo "📍 Région: $REGION"

  # Si une ville est spécifiée
  if [ ! -z "$2" ]; then
    VILLE=$2
    URL="$BASE_URL/$REGION/$VILLE"
    DEPTH=2
    MAX_PAGES=30
    echo "📍 Ville: $VILLE"
  fi
else
  URL="$BASE_URL/"
  echo "📍 Scraping complet de l'annuaire"
fi

echo "🔗 URL: $URL"
echo "📊 Profondeur: $DEPTH"
echo "📄 Pages max: $MAX_PAGES"
echo ""

# Demander confirmation
read -p "Continuer? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "❌ Annulé"
  exit 1
fi

echo ""
echo "🚀 Démarrage du scraping..."
echo ""

# Lancer le scraper
node scraper-md.js "$URL" $DEPTH $MAX_PAGES

echo ""
echo "✅ Terminé!"
echo ""
echo "📁 Résultats dans: scraped_content/"
echo "📝 Voir INDEX.md pour naviguer"
echo ""

# Afficher quelques statistiques
if [ -f "scraped_content/summary.json" ]; then
  echo "📊 Statistiques:"
  cat scraped_content/summary.json | grep -E "(totalPages|duration)" | head -2
  echo ""
fi

echo "💡 Commandes utiles:"
echo "  - Voir l'index: cat scraped_content/INDEX.md"
echo "  - Chercher à Paris: grep -r 'Paris' scraped_content/"
echo "  - Compter par région: ls scraped_content/annuaire/ | cut -d_ -f1 | sort | uniq -c"
echo ""
