@echo off
REM Script pour scraper l'annuaire orthoptiste sur Windows
REM Usage: scrape-orthoptiste.bat [region] [ville]

echo.
echo 🏥 Scraper Annuaire Orthoptiste
echo.

SET BASE_URL=https://www.orthoptiste.pro/annuaire
SET DEPTH=3
SET MAX_PAGES=100

IF "%1"=="" (
  SET URL=%BASE_URL%/
  echo 📍 Scraping complet de l'annuaire
) ELSE (
  SET REGION=%1
  SET URL=%BASE_URL%/%REGION%
  echo 📍 Région: %REGION%

  IF NOT "%2"=="" (
    SET VILLE=%2
    SET URL=%BASE_URL%/%REGION%/%VILLE%
    SET DEPTH=2
    SET MAX_PAGES=30
    echo 📍 Ville: %VILLE%
  )
)

echo 🔗 URL: %URL%
echo 📊 Profondeur: %DEPTH%
echo 📄 Pages max: %MAX_PAGES%
echo.

SET /P CONFIRM=Continuer? (O/N):
IF /I NOT "%CONFIRM%"=="O" (
  echo ❌ Annulé
  exit /b
)

echo.
echo 🚀 Démarrage du scraping...
echo.

node scraper-md.js %URL% %DEPTH% %MAX_PAGES%

echo.
echo ✅ Terminé!
echo.
echo 📁 Résultats dans: scraped_content\
echo 📝 Voir INDEX.md pour naviguer
echo.
echo 💡 Commandes utiles:
echo   - Voir l'index: type scraped_content\INDEX.md
echo   - Chercher: findstr /S "Paris" scraped_content\*
echo.

pause
