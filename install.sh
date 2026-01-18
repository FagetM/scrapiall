#!/bin/bash

# Script d'installation automatique pour Scrapiall
# Usage: bash install.sh

set -e

echo "🚀 Installation de Scrapiall..."
echo ""

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker n'est pas installé."
    echo "Voulez-vous installer Docker? (y/n)"
    read -r install_docker

    if [ "$install_docker" = "y" ]; then
        echo "📦 Installation de Docker..."
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
        sudo usermod -aG docker $USER
        rm get-docker.sh
        echo "✅ Docker installé!"
        echo "⚠️  Vous devrez peut-être vous déconnecter et vous reconnecter pour utiliser Docker"
    else
        echo "Installation annulée. Docker est requis."
        exit 1
    fi
fi

# Vérifier si Docker Compose est installé
if ! command -v docker-compose &> /dev/null; then
    echo "📦 Installation de Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo "✅ Docker Compose installé!"
fi

# Créer les dossiers nécessaires
echo "📁 Création des dossiers..."
mkdir -p workflows scraped_data scripts output

# Copier .env.example vers .env si .env n'existe pas
if [ ! -f .env ]; then
    echo "📝 Création du fichier .env..."
    cp .env.example .env
    echo "✅ Fichier .env créé. N'oubliez pas de le configurer avec vos clés API!"
fi

# Installer les dépendances Node.js si npm est disponible
if command -v npm &> /dev/null; then
    echo "📦 Installation des dépendances Node.js..."
    npm install
    echo "✅ Dépendances installées!"
else
    echo "⚠️  npm n'est pas installé. Les scripts de génération ne seront pas disponibles."
    echo "   Pour les installer plus tard: npm install"
fi

# Rendre les scripts exécutables
chmod +x scripts/*.js 2>/dev/null || true

echo ""
echo "✨ Installation terminée!"
echo ""
echo "📚 Prochaines étapes:"
echo "   1. Configurez vos clés API dans le fichier .env (optionnel)"
echo "   2. Démarrez n8n: docker-compose up -d"
echo "   3. Accédez à n8n: http://localhost:5678"
echo "   4. Identifiants: admin / admin123"
echo "   5. Importez le workflow: workflows/website-scraper-translator.json"
echo ""
echo "📖 Documentation complète: README.md"
echo "🚀 Guide rapide: QUICKSTART.md"
echo ""
