// PokerLingo - Application logic

const STORAGE_KEY = 'pokerlingo_state_v1';
const MAX_HEARTS = 5;

const defaultState = {
  xp: 0,
  hearts: MAX_HEARTS,
  streak: 0,
  lastPlayed: null,
  completed: {}, // { lessonId: { stars: 1-3, completedAt: ts } }
  heartsTimestamp: Date.now()
};

let state = loadState();
let currentLesson = null;
let currentExerciseIdx = 0;
let currentSelection = null;
let currentOrder = null;
let lessonCorrect = 0;
let lessonTotal = 0;
let exerciseAnswered = false;

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultState };
    const parsed = JSON.parse(raw);
    return { ...defaultState, ...parsed };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function refillHeartsIfNeeded() {
  // Regen 1 heart per 30 min
  if (state.hearts >= MAX_HEARTS) {
    state.heartsTimestamp = Date.now();
    return;
  }
  const elapsed = Date.now() - state.heartsTimestamp;
  const gained = Math.floor(elapsed / (30 * 60 * 1000));
  if (gained > 0) {
    state.hearts = Math.min(MAX_HEARTS, state.hearts + gained);
    state.heartsTimestamp = Date.now();
    saveState();
  }
}

function updateStreak() {
  const today = new Date().toDateString();
  const last = state.lastPlayed ? new Date(state.lastPlayed).toDateString() : null;
  if (last === today) return;
  if (last) {
    const diff = (new Date(today) - new Date(last)) / (1000 * 60 * 60 * 24);
    if (diff === 1) state.streak += 1;
    else if (diff > 1) state.streak = 1;
  } else {
    state.streak = 1;
  }
  state.lastPlayed = Date.now();
  saveState();
}

function renderStats() {
  document.getElementById('xpValue').textContent = state.xp;
  document.getElementById('heartsValue').textContent = state.hearts;
  document.getElementById('streakValue').textContent = state.streak;
}

function showView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

function renderHome() {
  const path = document.getElementById('lessonPath');
  path.innerHTML = '';

  const lessonsByUnit = {};
  LESSONS.forEach(l => {
    if (!lessonsByUnit[l.unit]) lessonsByUnit[l.unit] = [];
    lessonsByUnit[l.unit].push(l);
  });

  // Determine current lesson (first non-completed)
  let foundCurrent = false;

  UNITS.forEach(unit => {
    const unitLessons = lessonsByUnit[unit.id] || [];
    if (unitLessons.length === 0) return;

    const unitWrap = document.createElement('div');
    unitWrap.className = 'path-unit';

    const banner = document.createElement('div');
    banner.className = `unit-banner ${unit.color}`;
    banner.innerHTML = `
      <div>
        <h3>Unité ${unit.id} — ${unit.name}</h3>
        <p>${unit.desc}</p>
      </div>
      <div style="font-size:28px;">${unit.id === 5 ? '🏆' : '📘'}</div>
    `;
    unitWrap.appendChild(banner);

    const lessonsWrap = document.createElement('div');
    lessonsWrap.className = 'unit-lessons';

    unitLessons.forEach((lesson, idx) => {
      const lessonWrap = document.createElement('div');
      lessonWrap.className = 'lesson-wrap';

      const node = document.createElement('button');
      node.className = 'lesson-node';

      const isCompleted = !!state.completed[lesson.id];
      const isUnlocked = isLessonUnlocked(lesson.id);

      if (isCompleted) {
        node.classList.add('completed');
        node.innerHTML = '✓';
      } else if (!isUnlocked) {
        node.classList.add('locked');
        node.innerHTML = '🔒';
      } else {
        if (!foundCurrent) {
          node.classList.add('current');
          foundCurrent = true;
        }
        node.innerHTML = lesson.icon;
      }

      node.addEventListener('click', () => {
        if (!isUnlocked) return;
        if (state.hearts <= 0) {
          showView('gameOverView');
          return;
        }
        startLesson(lesson.id);
      });

      const label = document.createElement('div');
      label.className = 'lesson-label';
      label.textContent = lesson.title;

      lessonWrap.appendChild(node);
      lessonWrap.appendChild(label);
      lessonsWrap.appendChild(lessonWrap);
    });

    unitWrap.appendChild(lessonsWrap);
    path.appendChild(unitWrap);
  });

  // Global progress
  const totalLessons = LESSONS.length;
  const doneLessons = Object.keys(state.completed).length;
  const pct = Math.round((doneLessons / totalLessons) * 100);
  document.getElementById('globalProgress').style.width = pct + '%';
  document.getElementById('progressText').textContent = `${pct}% complété`;

  // Daily tip
  const tipIdx = new Date().getDate() % DAILY_TIPS.length;
  document.getElementById('dailyTip').textContent = DAILY_TIPS[tipIdx];
}

function isLessonUnlocked(lessonId) {
  const idx = LESSONS.findIndex(l => l.id === lessonId);
  if (idx === 0) return true;
  const prev = LESSONS[idx - 1];
  return !!state.completed[prev.id];
}

function startLesson(lessonId) {
  currentLesson = LESSONS.find(l => l.id === lessonId);
  currentExerciseIdx = 0;
  lessonCorrect = 0;
  lessonTotal = currentLesson.exercises.filter(e => e.type !== 'intro').length;
  showView('lessonView');
  document.getElementById('lessonHearts').textContent = state.hearts;
  renderCurrentExercise();
}

function renderCurrentExercise() {
  exerciseAnswered = false;
  currentSelection = null;
  currentOrder = null;

  const ex = currentLesson.exercises[currentExerciseIdx];
  const content = document.getElementById('lessonContent');
  content.innerHTML = '';

  const pct = (currentExerciseIdx / currentLesson.exercises.length) * 100;
  document.getElementById('lessonProgressFill').style.width = pct + '%';

  const feedback = document.getElementById('feedback');
  feedback.textContent = '';
  feedback.className = 'feedback';

  const checkBtn = document.getElementById('checkBtn');
  checkBtn.textContent = ex.type === 'intro' ? 'Continuer' : 'Vérifier';
  checkBtn.className = 'primary-btn';
  checkBtn.disabled = ex.type === 'intro' ? false : true;

  if (ex.type === 'intro') {
    renderIntro(ex, content);
  } else if (ex.type === 'multiple') {
    renderMultiple(ex, content);
  } else if (ex.type === 'cardChoice') {
    renderCardChoice(ex, content);
  } else if (ex.type === 'order') {
    renderOrder(ex, content);
  }
}

function renderIntro(ex, container) {
  const card = document.createElement('div');
  card.className = 'intro-card';
  card.innerHTML = `
    <h3>${ex.title}</h3>
    <p>${ex.content}</p>
    ${ex.bullets ? `<ul>${ex.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
  `;
  container.appendChild(card);
}

function renderMultiple(ex, container) {
  const prompt = document.createElement('div');
  prompt.className = 'question-prompt';
  prompt.textContent = ex.prompt;
  container.appendChild(prompt);

  const sub = document.createElement('div');
  sub.className = 'question-sub';
  sub.textContent = 'Choisis la bonne réponse';
  container.appendChild(sub);

  const choices = document.createElement('div');
  choices.className = 'choices';
  ex.choices.forEach((c, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice';
    btn.innerHTML = `<span class="badge">${i + 1}</span><span>${c}</span>`;
    btn.addEventListener('click', () => {
      if (exerciseAnswered) return;
      document.querySelectorAll('.choice').forEach(c => c.classList.remove('selected'));
      btn.classList.add('selected');
      currentSelection = i;
      document.getElementById('checkBtn').disabled = false;
    });
    choices.appendChild(btn);
  });
  container.appendChild(choices);
}

function renderCardChoice(ex, container) {
  const prompt = document.createElement('div');
  prompt.className = 'question-prompt';
  prompt.textContent = ex.prompt;
  container.appendChild(prompt);

  const sub = document.createElement('div');
  sub.className = 'question-sub';
  sub.textContent = 'Sélectionne la bonne option';
  container.appendChild(sub);

  const choices = document.createElement('div');
  choices.className = 'choices';

  ex.cards.forEach((handCards, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice';
    btn.style.flexDirection = 'column';
    btn.style.alignItems = 'stretch';

    const cardsRow = document.createElement('div');
    cardsRow.className = 'card-display';
    cardsRow.style.margin = '0 0 10px';
    handCards.forEach(card => {
      cardsRow.appendChild(renderCard(card));
    });
    btn.appendChild(cardsRow);

    const label = document.createElement('div');
    label.style.fontSize = '14px';
    label.style.color = 'var(--text-soft)';
    label.style.textAlign = 'center';
    label.textContent = ex.labels[i];
    btn.appendChild(label);

    btn.addEventListener('click', () => {
      if (exerciseAnswered) return;
      document.querySelectorAll('.choice').forEach(c => c.classList.remove('selected'));
      btn.classList.add('selected');
      currentSelection = i;
      document.getElementById('checkBtn').disabled = false;
    });
    choices.appendChild(btn);
  });

  container.appendChild(choices);
}

function renderCard(card) {
  const isRed = card.suit === '♥' || card.suit === '♦';
  const el = document.createElement('div');
  el.className = `playing-card ${isRed ? 'red' : 'black'}`;
  el.innerHTML = `
    <div style="display:flex; flex-direction:column; align-items:flex-start; line-height:1;">
      <div class="rank">${card.rank}</div>
      <div style="font-size:14px;">${card.suit}</div>
    </div>
    <div class="suit">${card.suit}</div>
    <div class="corner">
      <div style="display:flex; flex-direction:column; align-items:center; line-height:1;">
        <div style="font-size:14px;">${card.rank}</div>
        <div style="font-size:12px;">${card.suit}</div>
      </div>
    </div>
  `;
  return el;
}

function renderOrder(ex, container) {
  const prompt = document.createElement('div');
  prompt.className = 'question-prompt';
  prompt.textContent = ex.prompt;
  container.appendChild(prompt);

  const sub = document.createElement('div');
  sub.className = 'question-sub';
  sub.textContent = 'Clique sur les flèches ↑↓ pour réordonner';
  container.appendChild(sub);

  const list = document.createElement('div');
  list.className = 'order-list';

  // Shuffle items
  currentOrder = [...ex.items];

  function renderList() {
    list.innerHTML = '';
    currentOrder.forEach((item, idx) => {
      const it = document.createElement('div');
      it.className = 'order-item';
      it.innerHTML = `
        <span class="pos">${idx + 1}</span>
        <span style="flex:1;">${item}</span>
        <button class="icon-btn" data-action="up" data-idx="${idx}" ${idx === 0 ? 'disabled style="opacity:0.3;cursor:not-allowed;"' : ''}>↑</button>
        <button class="icon-btn" data-action="down" data-idx="${idx}" ${idx === currentOrder.length - 1 ? 'disabled style="opacity:0.3;cursor:not-allowed;"' : ''}>↓</button>
      `;
      list.appendChild(it);
    });
    list.querySelectorAll('button[data-action]').forEach(btn => {
      btn.addEventListener('click', e => {
        if (exerciseAnswered) return;
        const idx = parseInt(btn.dataset.idx);
        const action = btn.dataset.action;
        if (action === 'up' && idx > 0) {
          [currentOrder[idx - 1], currentOrder[idx]] = [currentOrder[idx], currentOrder[idx - 1]];
        } else if (action === 'down' && idx < currentOrder.length - 1) {
          [currentOrder[idx], currentOrder[idx + 1]] = [currentOrder[idx + 1], currentOrder[idx]];
        }
        renderList();
      });
    });
  }

  renderList();
  container.appendChild(list);
  document.getElementById('checkBtn').disabled = false;
}

function checkAnswer() {
  const ex = currentLesson.exercises[currentExerciseIdx];

  if (ex.type === 'intro') {
    nextExercise();
    return;
  }

  if (exerciseAnswered) {
    nextExercise();
    return;
  }

  let isCorrect = false;

  if (ex.type === 'multiple' || ex.type === 'cardChoice') {
    isCorrect = currentSelection === ex.answer;
    const choices = document.querySelectorAll('.choice');
    choices.forEach((c, i) => {
      c.style.pointerEvents = 'none';
      if (i === ex.answer) c.classList.add('correct');
      else if (i === currentSelection && !isCorrect) c.classList.add('wrong');
      c.classList.remove('selected');
    });
  } else if (ex.type === 'order') {
    isCorrect = JSON.stringify(currentOrder) === JSON.stringify(ex.answer);
    document.querySelectorAll('.order-item').forEach(el => {
      el.style.pointerEvents = 'none';
    });
  }

  exerciseAnswered = true;
  lessonTotal; // not needed but kept

  const feedback = document.getElementById('feedback');
  const checkBtn = document.getElementById('checkBtn');

  if (isCorrect) {
    lessonCorrect += 1;
    feedback.className = 'feedback correct';
    feedback.innerHTML = `✅ Excellent ! <span class="explanation">${ex.explanation || ''}</span>`;
    checkBtn.classList.remove('wrong-btn');
  } else {
    feedback.className = 'feedback wrong';
    feedback.innerHTML = `❌ Pas tout à fait... <span class="explanation">${ex.explanation || ''}</span>`;
    checkBtn.classList.add('wrong-btn');
    state.hearts = Math.max(0, state.hearts - 1);
    state.heartsTimestamp = Date.now();
    document.getElementById('lessonHearts').textContent = state.hearts;
    saveState();
    renderStats();
    document.querySelector('.lesson-content').classList.add('shake');
    setTimeout(() => document.querySelector('.lesson-content')?.classList.remove('shake'), 350);
  }

  checkBtn.textContent = 'Continuer';
  checkBtn.disabled = false;
}

function nextExercise() {
  if (state.hearts <= 0) {
    showView('gameOverView');
    return;
  }
  currentExerciseIdx++;
  if (currentExerciseIdx >= currentLesson.exercises.length) {
    finishLesson();
    return;
  }
  renderCurrentExercise();
}

function finishLesson() {
  document.getElementById('lessonProgressFill').style.width = '100%';

  const accuracy = lessonTotal > 0 ? Math.round((lessonCorrect / lessonTotal) * 100) : 100;
  let xpGained = 10 + lessonCorrect * 5;
  if (accuracy === 100) xpGained += 10; // perfect bonus

  state.xp += xpGained;
  state.completed[currentLesson.id] = {
    stars: accuracy === 100 ? 3 : accuracy >= 75 ? 2 : 1,
    completedAt: Date.now()
  };
  updateStreak();
  saveState();
  renderStats();

  document.getElementById('xpGained').textContent = `+${xpGained}`;
  document.getElementById('accuracyValue').textContent = `${accuracy}%`;
  document.getElementById('correctValue').textContent = `${lessonCorrect}/${lessonTotal}`;
  showView('completeView');
}

function resetProgress() {
  if (!confirm('Réinitialiser toute ta progression ? Cette action est irréversible.')) return;
  state = { ...defaultState, heartsTimestamp: Date.now() };
  saveState();
  renderStats();
  renderHome();
  showView('homeView');
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  refillHeartsIfNeeded();
  renderStats();
  renderHome();

  document.getElementById('checkBtn').addEventListener('click', checkAnswer);
  document.getElementById('closeLesson').addEventListener('click', () => {
    if (confirm('Quitter la leçon ? Ta progression sera perdue.')) {
      showView('homeView');
      renderHome();
    }
  });
  document.getElementById('continueBtn').addEventListener('click', () => {
    showView('homeView');
    renderHome();
  });
  document.getElementById('retryBtn').addEventListener('click', () => {
    state.hearts = MAX_HEARTS;
    state.heartsTimestamp = Date.now();
    saveState();
    renderStats();
    if (currentLesson) startLesson(currentLesson.id);
  });
  document.getElementById('backHomeBtn').addEventListener('click', () => {
    state.hearts = MAX_HEARTS;
    state.heartsTimestamp = Date.now();
    saveState();
    renderStats();
    showView('homeView');
    renderHome();
  });
  document.getElementById('resetBtn').addEventListener('click', resetProgress);

  // Keyboard shortcut: Enter to validate
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const btn = document.getElementById('checkBtn');
      const lessonView = document.getElementById('lessonView');
      if (lessonView.classList.contains('active') && !btn.disabled) {
        btn.click();
      }
    }
  });
});
