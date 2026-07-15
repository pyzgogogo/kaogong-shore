/* ============================================================
   上岸 · kaogong-shore
   为美丽的张晓彤而建
   ============================================================ */

// ── Configuration (易修改区) ──────────────────────────────────
const CONFIG = {
  name: '美丽的张晓彤',
  examDate: '2026-12-20T08:30:00',  // 省考笔试日期，可修改

  // 每日一句 · 浪潮
  quotes: [
    '每一个优秀的人，都有一段沉默的时光。那段时光是付出了很多努力，却得不到结果的日子，我们把它叫做扎根。',
    '所谓的幸运，不过是努力埋下的伏笔。你刷的每一道题，熬的每一个夜，都不会被辜负。',
    '不要羡慕岸上的人，他们也曾和你一样在海里拼命游。不同的是，他们没有放弃。',
    '你背不下来的书，总有人能背下来；你做不对的题，总有人能做对。那个人为什么不能是你？',
    '累了就停下来歇一歇，但请不要回头。岸就在前面，再游一下就到了。',
    '考公的路上没有白走的路，每一次跌倒都是在为上岸积攒浮力。',
    '你已经比昨天更接近目标了。哪怕只是多背了一个知识点，多刷了一套行测。',
    '申论写不出来的时候，想一想你为什么出发。那个答案，就是最好的论证。',
    '焦虑是因为你在乎，紧张是因为你认真。能感到压力的人，才有机会做得更好。',
    '你不是一个人在漂，所有爱你的人都是海面上的星光，看着你，盼你靠岸。',
    '图推一时卡住不代表什么，就像人生偶尔迷路，总能找到出口。',
    '资料分析算得头晕的时候，抬头看看窗外——世界很大，你只是在一个小门槛前。',
    '成功上岸不是终点，而是你应得的开始。那个位置，就是留给像你这样拼过的人。',
    '怕什么真理无穷，进一寸有一寸的欢喜。行测也是如此。',
    '你已经很棒了——走到今天这一步，本身就已经赢过了很多人。',
  ],

  // 悄悄话信箱
  messages: [
    '今天也是努力的一天，不论结果如何，你认真的样子就已经很美了。',
    '晓彤，我知道你有时候会很累很焦虑，但请相信你自己的节奏。走得慢没关系，只要在走。',
    '你比自己想象中强大得多。想想以前觉得过不去的坎，现在不都过来了吗？',
    '这条路上有人觉得苦于是回头了，而你没有。这本身就说明了你和别人的不一样。',
    '不要和别人比进度，每个人都有自己的时区。你的花期，就在不远处。',
    '如果实在看不进书，就合上它，出门走一走，听两首歌。明天又是新的一天。',
    '你是我认识的最努力的人之一。努力的人，运气通常不会太差。',
    '不管这次能不能上岸，你已经变成了一个更好的自己。当然，我更相信你能。',
    '记住你为什么要出发。那个理由足够好的话，就足以支撑你走完剩下的路。',
    '偷偷告诉你一个秘密：岸上的生活很精彩，我们已经帮你占好位置了。',
  ],

  // 考公关键节点（名字 + 距考试天数偏移）
  milestones: [
    { label: '报名', icon: '📝', offsetDays: -90 },
    { label: '笔试', icon: '✍️', offsetDays: 0 },
    { label: '面试', icon: '💬', offsetDays: 45 },
    { label: '体检', icon: '🏥', offsetDays: 75 },
    { label: '政审', icon: '📋', offsetDays: 90 },
    { label: '公示', icon: '📢', offsetDays: 110 },
    { label: '上岸', icon: '🌅', offsetDays: 130 },
  ],

  // 能量瓶全部集齐后的隐藏消息
  allStarsMessage: '晓彤你看，连星星都在帮你——你离上岸，又近了一大步。✨',

  // 到达岸边的考试后鼓励
  afterExamMessage: '笔试已经结束了！你已经做到了你能做的一切。接下来，好好休息，静候佳音。🌊',
};

// ── DOM 引用 ──────────────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ── Particle/Starfield Canvas ──────────────────────────────────
(function initStarfield() {
  const canvas = $('#stars-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let w, h;
  const stars = [];
  const STAR_COUNT = 80;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.3 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
      alpha: 0,
    });
  }

  function draw(timestamp) {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      s.alpha = 0.35 + 0.35 * Math.sin(timestamp * s.twinkleSpeed + s.twinkleOffset);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240,192,96,${s.alpha.toFixed(2)})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();

// ── Countdown ──────────────────────────────────────────────────
(function initCountdown() {
  const exam = new Date(CONFIG.examDate).getTime();

  function update() {
    const now = Date.now();
    const diff = exam - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    const dayEl = $('#cd-days');
    const hrEl = $('#cd-hours');
    const minEl = $('#cd-mins');
    const secEl = $('#cd-secs');
    const msgEl = $('#countdown-msg');
    const section = $('#countdown');

    if (diff <= 0) {
      // 已过笔试日
      if (dayEl) dayEl.textContent = '00';
      if (hrEl) hrEl.textContent = '00';
      if (minEl) minEl.textContent = '00';
      if (secEl) secEl.textContent = '00';
      if (msgEl) msgEl.textContent = CONFIG.afterExamMessage;
      section.classList.remove('urgent');
      return;
    }

    if (dayEl) dayEl.textContent = String(Math.max(0, days)).padStart(2, '0');
    if (hrEl) hrEl.textContent = String(hours).padStart(2, '0');
    if (minEl) minEl.textContent = String(mins).padStart(2, '0');
    if (secEl) secEl.textContent = String(secs).padStart(2, '0');

    // Urgency state
    if (days <= 30 && days > 7) {
      if (msgEl) msgEl.textContent = '最后冲刺阶段，稳住节奏，你可以的。';
      section.classList.add('urgent');
    } else if (days <= 7 && days > 0) {
      if (msgEl) msgEl.textContent = '倒计时最后一周！调整心态，准备上岸。';
      section.classList.add('urgent');
    } else if (days <= 0) {
      if (msgEl) msgEl.textContent = '今天就是笔试！放平心态，你已经准备好了。';
      section.classList.add('urgent');
    } else if (days <= 90) {
      if (msgEl) msgEl.textContent = '你正在航行中，不要左顾右盼，盯住彼岸。';
      section.classList.remove('urgent');
    } else {
      if (msgEl) msgEl.textContent = '航程刚刚开始，每一步都算数。';
      section.classList.remove('urgent');
    }
  }

  update();
  setInterval(update, 1000);
})();

// ── Daily Quote ────────────────────────────────────────────────
(function initQuote() {
  // 基于日期 seed，保证同一天显示同一句话
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const idx = seed % CONFIG.quotes.length;

  const quoteEl = $('#daily-quote');
  const attrEl = $('#quote-attribution');
  if (quoteEl) quoteEl.textContent = CONFIG.quotes[idx];
  if (attrEl) attrEl.textContent = '—— 来自一个一直在为你加油的人';
})();

// ── Journey / Sailing Timeline ─────────────────────────────────
(function initJourney() {
  const exam = new Date(CONFIG.examDate);
  const now = Date.now();

  // Determine which milestone we're at
  const today = new Date();
  let currentIdx = 0;
  for (let i = CONFIG.milestones.length - 1; i >= 0; i--) {
    const msDate = new Date(exam.getTime() + CONFIG.milestones[i].offsetDays * 24 * 60 * 60 * 1000);
    if (today >= msDate) {
      currentIdx = i;
      break;
    }
  }

  // Build nodes
  const nodesEl = $('#timeline-nodes');
  if (!nodesEl) return;

  CONFIG.milestones.forEach((ms, i) => {
    const div = document.createElement('div');
    div.className = 'timeline-node';
    if (i < currentIdx) div.classList.add('passed');
    if (i === currentIdx) div.classList.add('current');
    div.innerHTML = `<span class="node-icon">${ms.icon}</span><span class="node-label">${ms.label}</span>`;
    nodesEl.appendChild(div);
  });

  // Progress bar width & boat position
  const progressEl = $('#timeline-progress');
  const boatEl = $('#timeline-boat');
  if (!progressEl || !boatEl) return;

  const totalNodes = CONFIG.milestones.length - 1; // last is 上岸
  const progressPct = Math.min(100, Math.max(0, (currentIdx / totalNodes) * 100));
  setTimeout(() => {
    progressEl.style.width = `${progressPct}%`;
    boatEl.style.left = `${progressPct}%`;
  }, 300);
})();

// ── Energy Stars ───────────────────────────────────────────────
(function initStars() {
  const starField = $('#star-field');
  if (!starField) return;

  const TOTAL = 8;
  let collected = 0;
  $('#star-total').textContent = TOTAL;

  // Delay star creation until layout is complete
  function buildStars() {
    const fw = starField.offsetWidth;
    const fh = starField.offsetHeight;
    if (fw === 0 || fh === 0) {
      // Layout not ready yet — retry
      requestAnimationFrame(buildStars);
      return;
    }

    const padding = 10;
    const usedPositions = [];

    function getRandomPos() {
      for (let attempt = 0; attempt < 50; attempt++) {
        const x = padding + Math.random() * (fw - 2 * padding);
        const y = padding + Math.random() * (fh - 2 * padding);
        const tooClose = usedPositions.some(p =>
          Math.hypot(p.x - x, p.y - y) < 50
        );
        if (!tooClose) {
          usedPositions.push({ x, y });
          return { x, y };
        }
      }
      return { x: padding + Math.random() * (fw - 2 * padding), y: padding + Math.random() * (fh - 2 * padding) };
    }

    for (let i = 0; i < TOTAL; i++) {
      const { x, y } = getRandomPos();
      const star = document.createElement('span');
      star.className = 'star';
      star.textContent = '⭐';
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      star.style.animationDelay = `${Math.random() * 2}s`;
      star.dataset.index = i;

      star.addEventListener('click', (e) => {
        if (star.classList.contains('collected')) return;
        star.classList.add('collected');
        collected++;
        $('#star-count').textContent = collected;
        spawnParticle(e);

        const fillPct = collected / TOTAL;
        const maxFillH = 40;
        const fillH = fillPct * maxFillH;
        const fillY = 60 + (maxFillH - fillH);
        const fillRect = $('#bottle-fill');
        if (fillRect) {
          fillRect.setAttribute('y', String(fillY));
          fillRect.setAttribute('height', String(fillH));
        }

        if (collected >= TOTAL) {
          setTimeout(() => {
            const hiddenMsg = $('#hidden-message');
            const hiddenText = $('#hidden-text');
            if (hiddenMsg && hiddenText) {
              hiddenText.textContent = CONFIG.allStarsMessage;
              hiddenMsg.classList.add('revealed');
            }
          }, 400);
        }
      });

      // Touch support
      star.addEventListener('touchend', (e) => {
        e.preventDefault();
        star.dispatchEvent(new Event('click'));
      });

      starField.appendChild(star);
    }
  }

  requestAnimationFrame(buildStars);

  function spawnParticle(e) {
    const particle = document.createElement('span');
    particle.className = 'star-particle';
    particle.textContent = '✨';
    particle.style.left = `${e.clientX}px`;
    particle.style.top = `${e.clientY}px`;

    const bottle = $('#bottle');
    if (bottle) {
      const bRect = bottle.getBoundingClientRect();
      const dx = bRect.left + bRect.width / 2 - e.clientX;
      const dy = bRect.top + bRect.height / 2 - e.clientY;
      particle.style.setProperty('--dx', `${dx}px`);
      particle.style.setProperty('--dy', `${dy}px`);
    } else {
      particle.style.setProperty('--dx', '0px');
      particle.style.setProperty('--dy', '-60px');
    }

    document.body.appendChild(particle);
    particle.addEventListener('animationend', () => particle.remove());
  }
})();

// ── Mailbox ────────────────────────────────────────────────────
(function initMailbox() {
  const envelope = $('#envelope');
  const letterCard = $('#letter-card');
  const letterText = $('#letter-text');
  const letterClose = $('#letter-close');

  if (!envelope || !letterCard || !letterText) return;

  envelope.addEventListener('click', () => {
    if (letterCard.classList.contains('open')) return;
    const idx = Math.floor(Math.random() * CONFIG.messages.length);
    letterText.textContent = CONFIG.messages[idx];
    letterCard.classList.add('open');
  });

  if (letterClose) {
    letterClose.addEventListener('click', () => {
      letterCard.classList.remove('open');
    });
  }

  // Also allow keyboard activation
  envelope.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      envelope.click();
    }
  });
})();

// ── Breathing Exercise ─────────────────────────────────────────
(function initBreathing() {
  const btn = $('#breath-btn');
  const circle = $('#breath-circle');
  const text = $('#breath-text');
  if (!btn || !circle || !text) return;

  let running = false;
  let timer = null;

  const phases = [
    { label: '吸气…', duration: 4000, cls: 'breathing-in' },
    { label: '屏住', duration: 4000, cls: 'breathing-hold' },
    { label: '慢慢呼出…', duration: 6000, cls: 'breathing-out' },
  ];

  function runCycle(phaseIdx) {
    if (!running) return;
    if (phaseIdx >= phases.length) {
      // One cycle complete
      text.textContent = '再来一次';
      circle.className = 'breath-circle';
      timer = setTimeout(() => runCycle(0), 1200);
      return;
    }
    const phase = phases[phaseIdx];
    text.textContent = phase.label;
    circle.className = `breath-circle ${phase.cls}`;
    timer = setTimeout(() => runCycle(phaseIdx + 1), phase.duration);
  }

  btn.addEventListener('click', () => {
    if (running) {
      // Stop
      running = false;
      clearTimeout(timer);
      btn.textContent = '开始呼吸';
      btn.classList.remove('running');
      text.textContent = '准备好了吗';
      circle.className = 'breath-circle';
      return;
    }
    // Start
    running = true;
    btn.textContent = '停止';
    btn.classList.add('running');
    runCycle(0);
  });
})();

// ── Scroll-triggered animations ─────────────────────────────────
(function initScrollReveal() {
  const sections = document.querySelectorAll('section');
  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        // Re-trigger child animations inside visible sections
        entry.target.querySelectorAll('.section-title, .section-label').forEach((el) => {
          el.classList.add('animate-in');
        });
      }
    }
  }, { threshold: 0.15 });

  sections.forEach((s) => observer.observe(s));
})();

// ── Performance: debounced resize handler ───────────────────────
{
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Recalculate star positions would be here if needed
    }, 200);
  });
}

console.log('🌊 上岸 — 为美丽的张晓彤而建');
console.log('灯塔已经亮起，岸就在前方。');
