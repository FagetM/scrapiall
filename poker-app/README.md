# PokerLingo

Une application web pour apprendre le **poker Texas Hold'em** en s'amusant, façon Duolingo.

## Fonctionnalités

- 12 leçons réparties en 5 unités progressives
- Quiz interactifs : choix multiples, identification de cartes, classement de mains
- Système d'XP, vies (cœurs) et série quotidienne (streak)
- Cartes à jouer affichées graphiquement
- Sauvegarde automatique dans le navigateur (localStorage)
- 100% statique — aucune installation requise
- Responsive (mobile, tablette, desktop)

## Lancer l'application

### Option 1 : Ouvrir directement
Double-clique simplement sur `index.html`.

### Option 2 : Serveur local (recommandé)
```bash
cd poker-app
python3 -m http.server 8000
# puis ouvre http://localhost:8000
```

Ou avec Node :
```bash
npx serve poker-app
```

## Contenu des leçons

**Unité 1 — Les bases**
- Bienvenue au poker
- Les cartes et les couleurs
- Le déroulement d'une main

**Unité 2 — Les mains**
- Paire, brelan, carré
- Quinte, couleur, full
- Le classement des mains

**Unité 3 — Le jeu**
- Les actions possibles (fold, check, call, raise)
- Les positions à table

**Unité 4 — Stratégie**
- Les mains de départ
- Probabilités essentielles
- Bankroll & discipline

**Unité 5 — Expertise**
- Le jargon du poker
- Examen final

## Réinitialiser sa progression

Clique sur l'icône `↺` en haut à droite.
