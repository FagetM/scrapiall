// PokerLingo - Données des leçons
// Texas Hold'em pour débutants

const CARD = {
  // Helpers pour générer des objets carte
  // rang: '2'..'10', 'J', 'Q', 'K', 'A'  |  couleur: '♠' '♥' '♦' '♣'
};

function c(rank, suit) {
  return { rank, suit };
}

const LESSONS = [
  // ========== UNITÉ 1 : LES BASES ==========
  {
    id: 'u1-l1',
    unit: 1,
    title: 'Bienvenue au poker',
    icon: '👋',
    exercises: [
      {
        type: 'intro',
        title: 'Qu\'est-ce que le poker ?',
        content: `Le poker est un jeu de cartes où l'objectif n'est pas d'avoir la meilleure main, mais de prendre les meilleures décisions.`,
        bullets: [
          'On joue avec un jeu de 52 cartes',
          'Le but : remporter des jetons (pot) en gagnant les mains',
          'Le Texas Hold\'em est la variante la plus populaire',
          'C\'est un jeu de stratégie, de psychologie et de mathématiques'
        ]
      },
      {
        type: 'multiple',
        prompt: 'Quel est le vrai but du poker ?',
        choices: [
          'Avoir toujours la meilleure main',
          'Gagner le maximum de jetons sur le long terme',
          'Bluffer à chaque main',
          'Voir le maximum de flops'
        ],
        answer: 1,
        explanation: 'Au poker, on cherche à maximiser ses gains à long terme. Une bonne décision peut perdre une main, mais reste rentable sur la durée.'
      },
      {
        type: 'multiple',
        prompt: 'Combien de cartes contient un jeu de poker standard ?',
        choices: ['32', '48', '52', '54'],
        answer: 2,
        explanation: 'Un jeu standard de poker contient 52 cartes (sans les jokers), réparties en 4 couleurs de 13 cartes chacune.'
      },
      {
        type: 'multiple',
        prompt: 'Quelle est la variante de poker la plus jouée dans le monde ?',
        choices: ['Omaha', 'Stud à 7 cartes', 'Texas Hold\'em', 'Razz'],
        answer: 2,
        explanation: 'Le Texas Hold\'em est devenu la variante reine, notamment grâce à sa diffusion télévisée.'
      }
    ]
  },

  {
    id: 'u1-l2',
    unit: 1,
    title: 'Les cartes et les couleurs',
    icon: '🃏',
    exercises: [
      {
        type: 'intro',
        title: 'Le jeu de 52 cartes',
        content: 'Un jeu de poker contient 4 couleurs (symboles) et 13 rangs par couleur.',
        bullets: [
          '♠ Pique (spades) — noir',
          '♥ Cœur (hearts) — rouge',
          '♦ Carreau (diamonds) — rouge',
          '♣ Trèfle (clubs) — noir',
          'Rangs : 2, 3, 4, 5, 6, 7, 8, 9, 10, V (J), D (Q), R (K), A',
          'L\'As (A) est la carte la plus haute (sauf dans certaines quintes)'
        ]
      },
      {
        type: 'multiple',
        prompt: 'Quelle est la carte la plus forte au poker ?',
        choices: ['Le Roi', 'La Dame', 'L\'As', 'Le Valet'],
        answer: 2,
        explanation: 'L\'As (A) est généralement la carte la plus forte. Il peut aussi compter comme "1" dans la quinte A-2-3-4-5.'
      },
      {
        type: 'cardChoice',
        prompt: 'Laquelle de ces cartes est la plus forte ?',
        cards: [
          [c('10', '♠')],
          [c('K', '♥')],
          [c('Q', '♦')],
          [c('J', '♣')]
        ],
        labels: ['10 de pique', 'Roi de cœur', 'Dame de carreau', 'Valet de trèfle'],
        answer: 1,
        explanation: 'Ordre décroissant : A > K (Roi) > Q (Dame) > J (Valet) > 10 > 9...'
      },
      {
        type: 'multiple',
        prompt: 'Combien y a-t-il de couleurs dans un jeu ?',
        choices: ['2', '3', '4', '5'],
        answer: 2,
        explanation: 'Il y a 4 couleurs : pique ♠, cœur ♥, carreau ♦ et trèfle ♣. Aucune n\'est plus forte qu\'une autre au poker.'
      },
      {
        type: 'multiple',
        prompt: 'Au poker, une couleur (ex: pique) est-elle plus forte qu\'une autre ?',
        choices: ['Oui, le pique gagne toujours', 'Oui, le cœur est le plus fort', 'Non, toutes les couleurs sont égales', 'Ça dépend de la variante'],
        answer: 2,
        explanation: 'Contrairement à certains jeux (bridge, belote), les couleurs ont la même valeur au poker.'
      }
    ]
  },

  {
    id: 'u1-l3',
    unit: 1,
    title: 'Le déroulement d\'une main',
    icon: '🎬',
    exercises: [
      {
        type: 'intro',
        title: 'Les 4 phases du Texas Hold\'em',
        content: 'Une main de Hold\'em se déroule en 4 tours d\'enchères :',
        bullets: [
          '1️⃣ PRE-FLOP : chaque joueur reçoit 2 cartes privatives',
          '2️⃣ FLOP : 3 cartes communes sont dévoilées au centre',
          '3️⃣ TURN : une 4e carte commune apparaît',
          '4️⃣ RIVER : la 5e et dernière carte commune',
          'Après la river, c\'est l\'abattage (showdown) : meilleure main de 5 cartes parmi les 7 disponibles'
        ]
      },
      {
        type: 'multiple',
        prompt: 'Combien de cartes communes y a-t-il au total ?',
        choices: ['3', '4', '5', '7'],
        answer: 2,
        explanation: '5 cartes communes : 3 au flop + 1 au turn + 1 à la river. Chaque joueur en a aussi 2 privatives.'
      },
      {
        type: 'order',
        prompt: 'Remets ces étapes dans le bon ordre',
        items: ['River', 'Pre-flop', 'Flop', 'Turn'],
        answer: ['Pre-flop', 'Flop', 'Turn', 'River'],
        explanation: 'L\'ordre est toujours : Pre-flop → Flop → Turn → River → Showdown.'
      },
      {
        type: 'multiple',
        prompt: 'Combien de cartes privatives un joueur reçoit-il au Texas Hold\'em ?',
        choices: ['1', '2', '3', '4'],
        answer: 1,
        explanation: '2 cartes privatives au Hold\'em. À l\'Omaha, on en reçoit 4.'
      },
      {
        type: 'multiple',
        prompt: 'Au showdown, avec combien de cartes forme-t-on sa meilleure main ?',
        choices: ['2 cartes', '3 cartes', '5 cartes', '7 cartes'],
        answer: 2,
        explanation: 'On forme la meilleure combinaison de 5 cartes, parmi les 7 disponibles (2 privatives + 5 communes).'
      }
    ]
  },

  // ========== UNITÉ 2 : LES MAINS ==========
  {
    id: 'u2-l1',
    unit: 2,
    title: 'Paire, brelan, carré',
    icon: '🎯',
    exercises: [
      {
        type: 'intro',
        title: 'Les combinaisons "multiples"',
        content: 'Voici les combinaisons formées par des cartes de même rang :',
        bullets: [
          '👯 PAIRE : 2 cartes du même rang (ex: 8♠ 8♥)',
          '👯👯 DEUX PAIRES : 2 paires différentes (ex: K♠ K♥ + 5♦ 5♣)',
          '🎯 BRELAN (trois) : 3 cartes du même rang (ex: 7♠ 7♥ 7♦)',
          '🏆 CARRÉ (four of a kind) : 4 cartes du même rang (ex: A♠ A♥ A♦ A♣)'
        ]
      },
      {
        type: 'cardChoice',
        prompt: 'Quelle main contient un brelan ?',
        cards: [
          [c('A', '♠'), c('A', '♥'), c('K', '♦'), c('5', '♣'), c('2', '♠')],
          [c('9', '♠'), c('9', '♥'), c('9', '♦'), c('4', '♣'), c('2', '♥')],
          [c('J', '♠'), c('J', '♥'), c('5', '♦'), c('5', '♣'), c('K', '♥')],
          [c('Q', '♠'), c('Q', '♥'), c('Q', '♦'), c('Q', '♣'), c('3', '♠')]
        ],
        labels: ['Paire d\'As', 'Brelan de 9', 'Deux paires (V & 5)', 'Carré de Dames'],
        answer: 1,
        explanation: 'Un brelan = exactement 3 cartes du même rang. Ici, trois 9.'
      },
      {
        type: 'multiple',
        prompt: 'Comment appelle-t-on 4 cartes du même rang ?',
        choices: ['Brelan', 'Carré', 'Full', 'Quinte'],
        answer: 1,
        explanation: 'Un carré (ou "four of a kind") = 4 cartes du même rang. C\'est extrêmement rare et très fort.'
      },
      {
        type: 'cardChoice',
        prompt: 'Identifie deux paires',
        cards: [
          [c('K', '♠'), c('K', '♥'), c('K', '♦'), c('Q', '♣'), c('Q', '♠')],
          [c('10', '♠'), c('10', '♥'), c('7', '♦'), c('7', '♣'), c('3', '♥')],
          [c('A', '♠'), c('A', '♥'), c('A', '♦'), c('5', '♣'), c('2', '♠')],
          [c('8', '♠'), c('8', '♥'), c('8', '♦'), c('8', '♣'), c('K', '♠')]
        ],
        labels: ['Brelan K + paire Q (full)', '10-10 + 7-7', 'Brelan d\'As', 'Carré de 8'],
        answer: 1,
        explanation: 'Deux paires = exactement deux paires différentes. Une paire + un brelan = un full, pas deux paires.'
      }
    ]
  },

  {
    id: 'u2-l2',
    unit: 2,
    title: 'Quinte, couleur, full',
    icon: '🌈',
    exercises: [
      {
        type: 'intro',
        title: 'Les combinaisons "complexes"',
        content: 'Au-dessus du brelan, on trouve :',
        bullets: [
          '➡️ QUINTE (suite) : 5 cartes qui se suivent (ex: 5♠ 6♥ 7♦ 8♣ 9♠)',
          '🎨 COULEUR (flush) : 5 cartes de la même couleur (peu importe l\'ordre)',
          '🏠 FULL : un brelan + une paire (ex: Q♠ Q♥ Q♦ + 7♣ 7♥)',
          '💎 QUINTE FLUSH : 5 cartes qui se suivent ET de la même couleur',
          '👑 QUINTE FLUSH ROYALE : 10-J-Q-K-A de la même couleur (la main parfaite)'
        ]
      },
      {
        type: 'cardChoice',
        prompt: 'Quelle main est une couleur ?',
        cards: [
          [c('2', '♠'), c('5', '♠'), c('8', '♠'), c('J', '♠'), c('K', '♠')],
          [c('3', '♥'), c('4', '♦'), c('5', '♠'), c('6', '♣'), c('7', '♥')],
          [c('9', '♠'), c('9', '♥'), c('9', '♦'), c('4', '♣'), c('4', '♠')],
          [c('A', '♥'), c('K', '♥'), c('Q', '♥'), c('J', '♠'), c('10', '♥')]
        ],
        labels: ['5 cartes ♠', 'Quinte 3-7', 'Full 9 par 4', 'Quinte mixte'],
        answer: 0,
        explanation: 'Une couleur = 5 cartes de la même couleur (ici ♠). L\'ordre n\'a pas d\'importance.'
      },
      {
        type: 'cardChoice',
        prompt: 'Identifie un full',
        cards: [
          [c('J', '♠'), c('J', '♥'), c('J', '♦'), c('J', '♣'), c('5', '♠')],
          [c('K', '♠'), c('K', '♥'), c('K', '♦'), c('3', '♣'), c('3', '♥')],
          [c('A', '♠'), c('2', '♠'), c('3', '♠'), c('4', '♠'), c('5', '♠')],
          [c('7', '♠'), c('7', '♥'), c('8', '♦'), c('8', '♣'), c('K', '♠')]
        ],
        labels: ['Carré de V', 'Brelan K + paire 3', 'Quinte flush', 'Deux paires'],
        answer: 1,
        explanation: 'Un full = un brelan + une paire (3+2). Ici : brelan de Rois + paire de 3.'
      },
      {
        type: 'multiple',
        prompt: 'Une quinte flush royale est composée de :',
        choices: [
          '5 cartes au hasard de la même couleur',
          'A-K-Q-J-10 de la même couleur',
          'Toutes les figures du jeu',
          '5 As'
        ],
        answer: 1,
        explanation: 'La main ultime : 10, J, Q, K, A — tous de la même couleur. Probabilité ≈ 1 sur 650 000.'
      },
      {
        type: 'multiple',
        prompt: 'Une quinte au poker, c\'est :',
        choices: [
          '5 cartes de la même couleur',
          '5 cartes qui se suivent (ordre des rangs)',
          '4 cartes du même rang',
          '3 cartes identiques + 2 autres'
        ],
        answer: 1,
        explanation: '5 cartes consécutives, peu importe la couleur. Ex: 4-5-6-7-8.'
      }
    ]
  },

  {
    id: 'u2-l3',
    unit: 2,
    title: 'Le classement des mains',
    icon: '🏆',
    exercises: [
      {
        type: 'intro',
        title: 'Ordre des mains (du plus fort au plus faible)',
        content: 'Apprends ce classement par cœur — c\'est la base du poker :',
        bullets: [
          '1. 👑 Quinte flush royale',
          '2. 💎 Quinte flush',
          '3. 🏆 Carré',
          '4. 🏠 Full',
          '5. 🎨 Couleur (flush)',
          '6. ➡️ Quinte (suite)',
          '7. 🎯 Brelan',
          '8. 👯👯 Deux paires',
          '9. 👯 Paire',
          '10. 🃏 Carte haute (high card)'
        ]
      },
      {
        type: 'order',
        prompt: 'Range ces mains de la PLUS FORTE à la plus faible',
        items: ['Paire', 'Carré', 'Couleur', 'Brelan'],
        answer: ['Carré', 'Couleur', 'Brelan', 'Paire'],
        explanation: 'Carré > Full > Couleur > Quinte > Brelan > Deux paires > Paire > Carte haute.'
      },
      {
        type: 'multiple',
        prompt: 'Qui gagne : Full vs Couleur ?',
        choices: ['La couleur', 'Le full', 'Ça dépend de la couleur', 'Ils sont à égalité'],
        answer: 1,
        explanation: 'Le full bat la couleur. Ordre : Carré > Full > Couleur.'
      },
      {
        type: 'multiple',
        prompt: 'Qui gagne : Brelan d\'As vs Deux paires (Rois et Dames) ?',
        choices: ['Le brelan d\'As', 'Les deux paires K-Q', 'Égalité', 'Ça dépend de la 5e carte'],
        answer: 0,
        explanation: 'Le brelan bat TOUJOURS deux paires, même les plus hautes (KK-QQ). Un brelan de 2 bat KK-QQ.'
      },
      {
        type: 'multiple',
        prompt: 'Quelle est la main la plus rare et la plus forte ?',
        choices: ['Carré d\'As', 'Quinte flush royale', 'Full aux As', 'Couleur à l\'As'],
        answer: 1,
        explanation: 'La quinte flush royale (10-J-Q-K-A même couleur) est la main ultime, imbattable.'
      },
      {
        type: 'order',
        prompt: 'Range : Quinte, Full, Brelan, Paire (plus fort → plus faible)',
        items: ['Brelan', 'Paire', 'Full', 'Quinte'],
        answer: ['Full', 'Quinte', 'Brelan', 'Paire'],
        explanation: 'Full > Couleur > Quinte > Brelan > Deux paires > Paire.'
      }
    ]
  },

  // ========== UNITÉ 3 : POSITIONS & ACTIONS ==========
  {
    id: 'u3-l1',
    unit: 3,
    title: 'Les actions possibles',
    icon: '🎮',
    exercises: [
      {
        type: 'intro',
        title: 'Que peut-on faire à son tour ?',
        content: 'À chaque tour d\'enchères, tu as 4 actions possibles :',
        bullets: [
          '🚪 FOLD (se coucher) : jeter ses cartes, abandonner la main',
          '✋ CHECK (parole) : passer son tour sans miser (possible seulement si personne n\'a misé)',
          '✅ CALL (suivre) : payer la mise en cours pour rester dans le coup',
          '⬆️ BET / RAISE (miser / relancer) : mettre des jetons, ou augmenter la mise précédente'
        ]
      },
      {
        type: 'multiple',
        prompt: 'Tu as une main faible et un adversaire a misé fort. Quelle action évite de perdre des jetons ?',
        choices: ['Call', 'Raise', 'Fold', 'Check'],
        answer: 2,
        explanation: 'Fold (se coucher) = abandonner la main pour ne pas payer. Souvent la meilleure décision avec une main faible.'
      },
      {
        type: 'multiple',
        prompt: 'Personne n\'a misé avant toi. Tu ne veux pas miser mais rester dans le coup. Tu fais :',
        choices: ['Fold', 'Check', 'Call', 'All-in'],
        answer: 1,
        explanation: 'Check (parole) = passer son tour gratuitement. Possible seulement si personne n\'a misé.'
      },
      {
        type: 'multiple',
        prompt: 'Que veut dire "raise" ?',
        choices: ['Se coucher', 'Suivre la mise', 'Augmenter la mise', 'Passer son tour'],
        answer: 2,
        explanation: 'Raise = relancer, c\'est-à-dire augmenter la mise en cours. Action agressive.'
      },
      {
        type: 'multiple',
        prompt: 'Un adversaire a misé 10. Tu paies exactement 10 pour continuer. C\'est :',
        choices: ['Un check', 'Un call', 'Un raise', 'Un all-in'],
        answer: 1,
        explanation: 'Call (suivre) = payer la mise en cours sans relancer.'
      }
    ]
  },

  {
    id: 'u3-l2',
    unit: 3,
    title: 'Les positions à table',
    icon: '🪑',
    exercises: [
      {
        type: 'intro',
        title: 'Pourquoi la position est CRUCIALE',
        content: 'La position détermine quand tu joues. Plus tu joues tard, plus tu as d\'informations !',
        bullets: [
          '🔘 BOUTON (dealer) : meilleure position, joue en dernier post-flop',
          '🪙 SMALL BLIND (SB) : juste à gauche du bouton, mise une petite blind obligatoire',
          '💰 BIG BLIND (BB) : à gauche de la SB, mise la grosse blind',
          '👶 EARLY POSITION (UTG, etc.) : joue en premier — position la plus difficile',
          '🎯 LATE POSITION : joue en dernier — position la plus avantageuse'
        ]
      },
      {
        type: 'multiple',
        prompt: 'Quelle est la meilleure position à table ?',
        choices: ['Big blind', 'UTG (under the gun)', 'Bouton (dealer)', 'Small blind'],
        answer: 2,
        explanation: 'Le bouton est la position reine : tu joues en dernier après le flop et tu as toute l\'information sur tes adversaires.'
      },
      {
        type: 'multiple',
        prompt: 'Pourquoi la position tardive est-elle un avantage ?',
        choices: [
          'Les cartes sont meilleures',
          'Tu vois les actions des autres avant de décider',
          'Tu gagnes plus d\'XP',
          'Le dealer te donne de meilleures cartes'
        ],
        answer: 1,
        explanation: 'L\'information = pouvoir. En position tardive, tu sais qui a misé, relancé ou suivi avant ta décision.'
      },
      {
        type: 'multiple',
        prompt: 'Qu\'est-ce que la "big blind" ?',
        choices: [
          'Le plus gros stack de la table',
          'Une mise obligatoire avant la distribution',
          'La meilleure main possible',
          'Le joueur le plus expérimenté'
        ],
        answer: 1,
        explanation: 'La grosse blind est une mise forcée payée avant de voir ses cartes. Elle lance l\'action.'
      },
      {
        type: 'multiple',
        prompt: 'Qui parle EN PREMIER au pre-flop (après les blinds) ?',
        choices: ['Le bouton', 'La big blind', 'UTG (joueur à gauche de la BB)', 'La small blind'],
        answer: 2,
        explanation: 'Au pre-flop, l\'action commence à gauche de la big blind, c\'est UTG ("under the gun").'
      }
    ]
  },

  // ========== UNITÉ 4 : STRATÉGIE DÉBUTANT ==========
  {
    id: 'u4-l1',
    unit: 4,
    title: 'Les mains de départ',
    icon: '🚀',
    exercises: [
      {
        type: 'intro',
        title: 'Quelles mains jouer au pre-flop ?',
        content: 'Toutes les mains ne se valent pas. Voici les grandes catégories :',
        bullets: [
          '💎 PREMIUM : AA, KK, QQ, JJ, AK — joue-les agressivement',
          '⭐ FORTES : TT, 99, AQ, AJ, KQ — bonnes en position',
          '🟢 SPÉCULATIVES : petites paires (22-88), connecteurs assortis (76s) — jouables à bas prix',
          '🛑 FAIBLES : 72o, 83o, etc. — jette-les sans hésiter',
          'Règle d\'or : joue serré (peu de mains) et agressif (mise/relance)'
        ]
      },
      {
        type: 'cardChoice',
        prompt: 'Quelle est la MEILLEURE main de départ ?',
        cards: [
          [c('A', '♠'), c('A', '♥')],
          [c('K', '♠'), c('Q', '♥')],
          [c('10', '♠'), c('10', '♣')],
          [c('A', '♠'), c('K', '♠')]
        ],
        labels: ['Paire d\'As', 'KQ off-suit', 'Paire de 10', 'AK assorti'],
        answer: 0,
        explanation: 'AA ("pocket rockets") est la meilleure main de départ au Hold\'em. Elle gagne ~85% du temps contre une main aléatoire.'
      },
      {
        type: 'cardChoice',
        prompt: 'Tu dois fold laquelle de ces mains ?',
        cards: [
          [c('A', '♠'), c('A', '♣')],
          [c('K', '♠'), c('K', '♥')],
          [c('7', '♠'), c('2', '♦')],
          [c('Q', '♠'), c('Q', '♥')]
        ],
        labels: ['Paire d\'As', 'Paire de Rois', '7-2 dépareillé', 'Paire de Dames'],
        answer: 2,
        explanation: '7-2 dépareillé est statistiquement la PIRE main au Hold\'em. À jeter sans pitié.'
      },
      {
        type: 'multiple',
        prompt: 'Que signifie "jouer serré" ?',
        choices: [
          'Miser souvent',
          'Sélectionner peu de mains, mais les jouer fort',
          'Bluffer beaucoup',
          'Ne jamais fold'
        ],
        answer: 1,
        explanation: 'Serré = peu de mains mais bien choisies. C\'est la base d\'une stratégie gagnante pour débuter (tight-aggressive ou TAG).'
      },
      {
        type: 'multiple',
        prompt: 'Une "paire servie" (pocket pair) c\'est :',
        choices: [
          'Deux cartes de la même couleur',
          'Deux cartes de même rang dans tes cartes privatives',
          'Deux cartes qui se suivent',
          'Deux As'
        ],
        answer: 1,
        explanation: 'Pocket pair = tes 2 cartes privatives sont de même rang (ex: 8-8, KK). Tu touches déjà une paire avant le flop.'
      }
    ]
  },

  {
    id: 'u4-l2',
    unit: 4,
    title: 'Probabilités essentielles',
    icon: '🎲',
    exercises: [
      {
        type: 'intro',
        title: 'Les chiffres à connaître',
        content: 'Le poker est un jeu de mathématiques. Quelques pourcentages essentiels :',
        bullets: [
          '🎯 AA vs main aléatoire : ~85% de victoire',
          '🎯 Toucher une paire au flop avec 2 cartes différentes : ~32%',
          '🎯 Toucher un set (brelan) avec une paire au flop : ~12% (≈ 1 sur 8)',
          '🎯 Compléter une couleur au turn avec 4 cartes : ~19%',
          '🎯 Compléter une quinte ouverte (8 outs) à la river : ~32%'
        ]
      },
      {
        type: 'multiple',
        prompt: 'Tu as une paire dans ta main. Quelle est la probabilité de toucher un brelan au flop ?',
        choices: ['Environ 1%', 'Environ 12% (1 sur 8)', 'Environ 50%', 'Environ 32%'],
        answer: 1,
        explanation: 'Avec une pocket pair, tu touches un set au flop ~12% du temps. C\'est pour ça qu\'on aime "voir le flop" pas cher avec une petite paire.'
      },
      {
        type: 'multiple',
        prompt: 'Tu as 2 cœurs en main, et le flop apporte 2 autres cœurs. Tu as un tirage couleur. Quelle est ta probabilité d\'achever la couleur d\'ici la river ?',
        choices: ['~10%', '~25%', '~35%', '~50%'],
        answer: 2,
        explanation: 'Avec 9 outs (les 9 cœurs restants) et 2 cartes à venir, tu as environ 35% de toucher ta couleur (règle des 4 : 9×4 ≈ 36%).'
      },
      {
        type: 'multiple',
        prompt: 'Qu\'est-ce qu\'un "out" ?',
        choices: [
          'Une carte qui te fait perdre',
          'Une carte qui améliore ta main',
          'Un joueur qui se couche',
          'Une carte brûlée par le dealer'
        ],
        answer: 1,
        explanation: 'Un out = une carte non vue qui améliorerait ta main. Plus tu as d\'outs, plus tu as de chances de gagner.'
      },
      {
        type: 'multiple',
        prompt: 'La "règle des 2 et 4" sert à :',
        choices: [
          'Compter les paires',
          'Estimer rapidement la probabilité d\'achever un tirage',
          'Calculer le pot',
          'Décider quand bluffer'
        ],
        answer: 1,
        explanation: 'Outs × 2 = % à la prochaine carte. Outs × 4 = % avec 2 cartes à venir. Une raccourci mental indispensable.'
      },
      {
        type: 'multiple',
        prompt: 'Avec AA pre-flop, tu gagnes contre une main aléatoire environ :',
        choices: ['50%', '65%', '85%', '99%'],
        answer: 2,
        explanation: 'AA gagne ~85% des fois face à une main au hasard. Mais ce n\'est pas 100% : attention au flop !'
      }
    ]
  },

  {
    id: 'u4-l3',
    unit: 4,
    title: 'Bankroll & discipline',
    icon: '💰',
    exercises: [
      {
        type: 'intro',
        title: 'Gérer son argent et ses émotions',
        content: 'Le meilleur joueur du monde perd s\'il ne gère pas sa bankroll et son tilt :',
        bullets: [
          '💼 BANKROLL : ton capital dédié au poker, séparé de ton argent du quotidien',
          '📏 RÈGLE : au moins 20 à 30 buy-ins pour la limite à laquelle tu joues',
          '🧠 TILT : état émotionnel négatif qui fait jouer mal — DOIT être évité',
          '⏸️ Sache t\'arrêter quand tu es fatigué, énervé ou sur une mauvaise série',
          '📒 Suis tes résultats : on ne juge un joueur qu\'après des milliers de mains'
        ]
      },
      {
        type: 'multiple',
        prompt: 'Qu\'est-ce que le "tilt" ?',
        choices: [
          'Une variante du poker',
          'Un mouvement de jetons',
          'Un état émotionnel négatif qui détériore ton jeu',
          'Une stratégie agressive'
        ],
        answer: 2,
        explanation: 'Le tilt = jouer sous l\'effet de la frustration, de la colère ou de la fatigue. C\'est l\'ennemi N°1 de tout joueur.'
      },
      {
        type: 'multiple',
        prompt: 'Tu joues des parties à 10€ le buy-in. Une bankroll saine devrait être d\'environ :',
        choices: ['20-30€', '100€', '200-300€', '1000€'],
        answer: 2,
        explanation: 'Règle classique : 20 à 30 buy-ins. Pour des tables à 10€, vise 200-300€ minimum pour absorber la variance.'
      },
      {
        type: 'multiple',
        prompt: 'Tu viens de perdre 3 grosses mains de suite. Que faire ?',
        choices: [
          'Augmenter les mises pour récupérer vite',
          'Faire une pause, prendre du recul',
          'Tout miser sur la prochaine main',
          'Changer de table sans réfléchir'
        ],
        answer: 1,
        explanation: 'Une pause prévient le tilt. Augmenter ses mises après une perte = "chasing losses", recette désastreuse.'
      },
      {
        type: 'multiple',
        prompt: 'Sur combien de mains peut-on vraiment juger le niveau d\'un joueur ?',
        choices: ['100', '1 000', '10 000+', 'Une seule suffit'],
        answer: 2,
        explanation: 'La variance au poker est énorme. Il faut plusieurs dizaines de milliers de mains pour avoir des stats fiables.'
      }
    ]
  },

  // ========== UNITÉ 5 : VOCABULAIRE & FINALE ==========
  {
    id: 'u5-l1',
    unit: 5,
    title: 'Le jargon du poker',
    icon: '📖',
    exercises: [
      {
        type: 'intro',
        title: 'Le vocabulaire essentiel',
        content: 'Pour parler poker, voici les mots à connaître :',
        bullets: [
          '🌊 BAD BEAT : perdre une main qu\'on aurait dû gagner statistiquement',
          '🎣 NUTS : la meilleure main possible sur un tableau donné',
          '👻 BLUFF : miser fort avec une main faible pour faire fold l\'adversaire',
          '🏃 ALL-IN : miser tous ses jetons',
          '🚪 SHORT-STACK : avoir peu de jetons par rapport à la table',
          '🐟 FISH : joueur faible, qui perd souvent (à l\'inverse : "shark")',
          '📊 ÉQUITÉ : ta part du pot à long terme selon ta probabilité de gagner'
        ]
      },
      {
        type: 'multiple',
        prompt: 'Qu\'est-ce qu\'un "bluff" ?',
        choices: [
          'Une main très forte',
          'Miser fort avec une main faible pour faire fold',
          'Recevoir de bonnes cartes',
          'Compter les outs'
        ],
        answer: 1,
        explanation: 'Bluff = représenter une main forte alors que tu en as une faible, pour faire abandonner l\'adversaire.'
      },
      {
        type: 'multiple',
        prompt: '"Avoir les nuts" signifie :',
        choices: [
          'Avoir perdu beaucoup',
          'Avoir la meilleure main possible',
          'Être en short-stack',
          'Avoir bluffé'
        ],
        answer: 1,
        explanation: 'Les "nuts" = la main maximale imbattable sur un tableau donné. Le rêve de tout joueur.'
      },
      {
        type: 'multiple',
        prompt: '"All-in" veut dire :',
        choices: [
          'Se coucher',
          'Miser la moitié du tapis',
          'Miser tous ses jetons',
          'Passer la parole'
        ],
        answer: 2,
        explanation: 'All-in = miser TOUS ses jetons. Tu ne peux plus rien miser de plus dans cette main.'
      },
      {
        type: 'multiple',
        prompt: 'Un "bad beat" c\'est :',
        choices: [
          'Une victoire facile',
          'Perdre une main qu\'on était quasi certain de gagner',
          'Un fold rapide',
          'Une mauvaise position'
        ],
        answer: 1,
        explanation: 'Bad beat = perdre statistiquement contre toute attente. Ex: AA contre 72 qui touche un brelan à la river.'
      },
      {
        type: 'multiple',
        prompt: '"Pot odds" signifie :',
        choices: [
          'La probabilité d\'être dealer',
          'Le rapport entre le coût d\'un call et la taille du pot',
          'Le nombre de joueurs',
          'La force de ta main'
        ],
        answer: 1,
        explanation: 'Pot odds = ce que tu dois payer / ce que tu peux gagner. Permet de comparer avec ta probabilité de gagner pour décider.'
      }
    ]
  },

  {
    id: 'u5-l2',
    unit: 5,
    title: 'Examen final',
    icon: '🏅',
    exercises: [
      {
        type: 'intro',
        title: 'Prêt(e) pour l\'examen ?',
        content: 'Cet examen mélange toutes les notions vues. Bonne chance !',
        bullets: [
          '5 questions sur tout ce que tu as appris',
          'Si tu réussis, tu deviens un vrai poker rookie 🎓',
          'En cas de doute, prends ton temps. Au poker, les bonnes décisions valent plus que la vitesse.'
        ]
      },
      {
        type: 'cardChoice',
        prompt: 'Quel main gagne sur le tableau Q♠ Q♥ 7♦ 7♣ K♠ ?',
        cards: [
          [c('A', '♠'), c('A', '♥')],
          [c('Q', '♦'), c('J', '♠')],
          [c('K', '♥'), c('K', '♦')],
          [c('7', '♥'), c('7', '♠')]
        ],
        labels: ['AA (deux paires A et Q)', 'Q-J (brelan Q + full Q par 7)', 'KK (full K par Q)', '77 (carré de 7)'],
        answer: 3,
        explanation: 'Avec 77 en main + 77 au board = carré de 7. Le carré bat tout sauf une quinte flush. KK fait full, AA fait juste deux paires.'
      },
      {
        type: 'multiple',
        prompt: 'Tu es au bouton avec 7♠2♣. Aucun joueur n\'a relancé. Que fais-tu ?',
        choices: [
          'All-in',
          'Raise pour bluffer',
          'Fold — c\'est la pire main',
          'Call et espérer toucher'
        ],
        answer: 2,
        explanation: '7-2 dépareillé = la pire main. Même en position, on la jette. Il ne faut pas s\'attacher à jouer toutes les mains.'
      },
      {
        type: 'order',
        prompt: 'Range : Couleur, Carré, Quinte, Paire (du PLUS FORT au plus faible)',
        items: ['Paire', 'Couleur', 'Quinte', 'Carré'],
        answer: ['Carré', 'Couleur', 'Quinte', 'Paire'],
        explanation: 'Rappel : Carré > Full > Couleur > Quinte > Brelan > Deux paires > Paire.'
      },
      {
        type: 'multiple',
        prompt: 'Tu as A♥K♥. Le flop est 2♥ 7♥ Q♠. Combien d\'outs as-tu pour une couleur ?',
        choices: ['7', '9', '11', '13'],
        answer: 1,
        explanation: 'Il reste 9 cœurs dans le jeu (13 cœurs - 4 visibles). 9 outs × 4 ≈ 36% de toucher la couleur d\'ici la river.'
      },
      {
        type: 'multiple',
        prompt: 'Quelle attitude est la PLUS importante pour progresser au poker ?',
        choices: [
          'Toujours bluffer',
          'Jouer le plus de mains possible',
          'La discipline et la gestion émotionnelle',
          'Mémoriser les statistiques'
        ],
        answer: 2,
        explanation: 'Discipline, patience et contrôle du tilt sont les qualités N°1. Sans elles, même les meilleurs perdent.'
      }
    ]
  }
];

const UNITS = [
  { id: 1, name: 'Les bases', desc: 'Découvre le poker', color: 'green' },
  { id: 2, name: 'Les mains', desc: 'Maîtrise les combinaisons', color: 'blue' },
  { id: 3, name: 'Le jeu', desc: 'Actions et positions', color: 'purple' },
  { id: 4, name: 'Stratégie', desc: 'Joue intelligemment', color: 'gold' },
  { id: 5, name: 'Expertise', desc: 'Vocabulaire et finale', color: 'green' }
];

const DAILY_TIPS = [
  'Au poker, la patience est ta meilleure arme.',
  'Une bonne décision peut perdre une main, mais reste rentable.',
  'La position est plus précieuse que les cartes.',
  'Sache te coucher : fold n\'est pas perdre, c\'est économiser.',
  'Le tilt te coûtera plus cher que tes adversaires.',
  'AA gagne 85% du temps... mais perd 15% du temps.',
  'Joue serré et agressif (TAG) pour débuter.',
  'Le poker est un marathon, pas un sprint.'
];
