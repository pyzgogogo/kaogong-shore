/* ============================================================
   上岸 · kaogong-shore
   为美丽的张晓彤而建
   ============================================================ */

// ── Configuration (易修改区) ──────────────────────────────────
var CONFIG = {
  name: '美丽的张晓彤',
  examDate: '2026-12-20T08:30:00',

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

  milestones: [
    { label: '报名', icon: '📝', offsetDays: -90 },
    { label: '笔试', icon: '✍️', offsetDays: 0 },
    { label: '面试', icon: '💬', offsetDays: 45 },
    { label: '体检', icon: '🏥', offsetDays: 75 },
    { label: '政审', icon: '📋', offsetDays: 90 },
    { label: '公示', icon: '📢', offsetDays: 110 },
    { label: '上岸', icon: '🌅', offsetDays: 130 },
  ],

  allStarsMessage: '晓彤你看，连星星都在帮你——你离上岸，又近了一大步。✨',
  afterExamMessage: '笔试已经结束了！你已经做到了你能做的一切。接下来，好好休息，静候佳音。🌊',
};

function $(sel) { return document.querySelector(sel); }

// ═══════════════════════════════════════════════════════════════
//  Starfield Canvas
// ═══════════════════════════════════════════════════════════════
(function() {
  var canvas = $('#stars-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var w, h;
  var stars = [];
  var STAR_COUNT = 80;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (var i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * (w || 375),
      y: Math.random() * (h || 812),
      r: Math.random() * 1.3 + 0.3,
      speed: Math.random() * 0.02 + 0.005,
      offset: Math.random() * Math.PI * 2,
    });
  }

  function draw(ts) {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      var alpha = 0.35 + 0.35 * Math.sin(ts * s.speed + s.offset);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(240,192,96,' + alpha.toFixed(2) + ')';
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();

// ═══════════════════════════════════════════════════════════════
//  Countdown
// ═══════════════════════════════════════════════════════════════
(function() {
  var exam = new Date(CONFIG.examDate).getTime();

  function update() {
    var diff = exam - Date.now();
    var days = Math.floor(diff / 86400000);
    var hrs = Math.floor((diff / 3600000) % 24);
    var mins = Math.floor((diff / 60000) % 60);
    var secs = Math.floor((diff / 1000) % 60);

    var dayEl = $('#cd-days'), hrEl = $('#cd-hours');
    var minEl = $('#cd-mins'), secEl = $('#cd-secs');
    var msgEl = $('#countdown-msg'), section = $('#countdown');

    if (diff <= 0) {
      if (dayEl) dayEl.textContent = '00';
      if (hrEl) hrEl.textContent = '00';
      if (minEl) minEl.textContent = '00';
      if (secEl) secEl.textContent = '00';
      if (msgEl) msgEl.textContent = CONFIG.afterExamMessage;
      if (section) section.classList.remove('urgent');
      return;
    }

    if (dayEl) dayEl.textContent = String(Math.max(0, days)).padStart(2, '0');
    if (hrEl) hrEl.textContent = String(hrs).padStart(2, '0');
    if (minEl) minEl.textContent = String(mins).padStart(2, '0');
    if (secEl) secEl.textContent = String(secs).padStart(2, '0');

    if (!section || !msgEl) return;

    if (days <= 7 && days > 0) {
      msgEl.textContent = '倒计时最后一周！调整心态，准备上岸。';
      section.classList.add('urgent');
    } else if (days <= 30 && days > 7) {
      msgEl.textContent = '最后冲刺阶段，稳住节奏，你可以的。';
      section.classList.add('urgent');
    } else if (days <= 90) {
      msgEl.textContent = '你正在航行中，不要左顾右盼，盯住彼岸。';
      section.classList.remove('urgent');
    } else {
      msgEl.textContent = '航程刚刚开始，每一步都算数。';
      section.classList.remove('urgent');
    }
  }

  update();
  setInterval(update, 1000);
})();

// ═══════════════════════════════════════════════════════════════
//  Daily Quote
// ═══════════════════════════════════════════════════════════════
(function() {
  var today = new Date();
  var seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  var idx = seed % CONFIG.quotes.length;
  var el = $('#daily-quote');
  var attr = $('#quote-attribution');
  if (el) el.textContent = CONFIG.quotes[idx];
  if (attr) attr.textContent = '—— 来自一个一直在为你加油的人';
})();

// ═══════════════════════════════════════════════════════════════
//  Journey / Sailing Timeline
// ═══════════════════════════════════════════════════════════════
(function() {
  var exam = new Date(CONFIG.examDate);
  var today = new Date();
  var currentIdx = 0;
  for (var i = CONFIG.milestones.length - 1; i >= 0; i--) {
    var msDate = new Date(exam.getTime() + CONFIG.milestones[i].offsetDays * 86400000);
    if (today >= msDate) { currentIdx = i; break; }
  }

  var nodesEl = $('#timeline-nodes');
  if (!nodesEl) return;

  for (var i = 0; i < CONFIG.milestones.length; i++) {
    var ms = CONFIG.milestones[i];
    var div = document.createElement('div');
    div.className = 'timeline-node';
    if (i < currentIdx) div.classList.add('passed');
    if (i === currentIdx) div.classList.add('current');
    div.innerHTML = '<span class="node-icon">' + ms.icon + '</span><span class="node-label">' + ms.label + '</span>';
    nodesEl.appendChild(div);
  }

  var progressEl = $('#timeline-progress');
  var boatEl = $('#timeline-boat');
  if (!progressEl || !boatEl) return;

  var total = CONFIG.milestones.length - 1;
  var pct = Math.min(100, Math.max(0, (currentIdx / total) * 100));
  setTimeout(function() {
    progressEl.style.width = pct + '%';
    boatEl.style.left = pct + '%';
  }, 300);
})();

// ═══════════════════════════════════════════════════════════════
//  Daily Check-In  (localStorage)
// ═══════════════════════════════════════════════════════════════
(function() {
  var STORAGE_KEY = 'shore-checkin';
  var PRAISES = [
    '又坚持了一天！🌊',
    '今天的努力，会在岸上开花。✨',
    '行测和申论都在为你让路！',
    '你比昨天更接近目标了。',
    '上岸的又一块垫脚石，踩稳了。',
    '每一天的坚持，都在改写结局。',
    '很棒！我们又多了一分胜算。',
    '就是这样的节奏，保持住！',
  ];

  function dateStr(daysAgo) {
    var d = new Date();
    d.setHours(0, 0, 0, 0);
    var offset = daysAgo || 0;
    d.setDate(d.getDate() - offset);
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }

  function loadData() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { dates: [] };
      var parsed = JSON.parse(raw);
      return parsed && Array.isArray(parsed.dates) ? parsed : { dates: [] };
    } catch (e) { return { dates: [] }; }
  }

  function saveData(data) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
  }

  var btn = document.getElementById('checkin-btn');
  var ripple = document.getElementById('checkin-ripple');
  var feedbackEl = document.getElementById('checkin-feedback');
  var streakEl = document.getElementById('checkin-streak');
  var heatmap = document.getElementById('heatmap');

  if (!btn || !heatmap) {
    console.log('Check-in elements not found: btn=' + !!btn + ' heatmap=' + !!heatmap);
    return;
  }

  function refreshUI() {
    var data = loadData();
    var dates = Array.isArray(data.dates) ? data.dates : [];
    var set = {};
    for (var i = 0; i < dates.length; i++) { set[dates[i]] = true; }
    var today = dateStr(0);
    var already = !!set[today];

    // streak
    var streak = 0;
    for (var d = 0; d < 366; d++) {
      if (set[dateStr(d)]) streak++;
      else break;
    }

    // button state
    var icon = btn.querySelector('.checkin-icon');
    var label = btn.querySelector('.checkin-label');
    if (already) {
      btn.classList.add('checked');
      if (icon) icon.textContent = '✅';
      if (label) label.textContent = '已打卡';
    } else {
      btn.classList.remove('checked');
      if (icon) icon.textContent = '📝';
      if (label) label.textContent = '点我打卡';
    }

    if (streakEl) streakEl.innerHTML = '已连续学习 <strong>' + streak + '</strong> 天';

    // long-streak motivational message
    var msgEl = document.getElementById('checkin-streak-msg');
    if (msgEl) {
      if (streak >= 100) msgEl.textContent = '🔥 百天坚持，你已经是岸上的人了！';
      else if (streak >= 50) msgEl.textContent = '💪 五十天了，你比想象中更强大！';
      else if (streak >= 30) msgEl.textContent = '⭐ 整整一个月！这种毅力，上岸是必然的。';
      else if (streak >= 21) msgEl.textContent = '🌱 21天养成一个好习惯，你已经做到了！';
      else if (streak >= 14) msgEl.textContent = '🌊 两周了！每天都在离岸边更近一步。';
      else if (streak >= 7) msgEl.textContent = '✨ 坚持一周了，很棒！继续保持这个节奏。';
      else msgEl.textContent = '';
    }

    // heatmap
    heatmap.innerHTML = '';
    for (var i = 20; i >= 0; i--) {
      var ds = dateStr(i);
      var cell = document.createElement('span');
      cell.className = 'heatmap-cell';
      if (set[ds]) {
        cell.classList.add('level-3');
      } else if (ds === today && !already) {
        cell.classList.add('today-empty');
      }
      cell.title = ds;
      heatmap.appendChild(cell);
    }
  }

  function doCheckIn() {
    var data = loadData();
    var dates = Array.isArray(data.dates) ? data.dates : [];
    var today = dateStr(0);

    // Already checked in?
    for (var i = 0; i < dates.length; i++) {
      if (dates[i] === today) return;
    }

    dates.unshift(today);
    if (dates.length > 366) dates.pop();
    data.dates = dates;
    saveData(data);

    if (ripple) {
      ripple.classList.remove('active');
      void ripple.offsetWidth;
      ripple.classList.add('active');
    }

    var praise = PRAISES[Math.floor(Math.random() * PRAISES.length)];
    if (feedbackEl) feedbackEl.textContent = praise;

    refreshUI();
  }

  btn.addEventListener('click', doCheckIn);

  // Also handle touchend for mobile
  btn.addEventListener('touchend', function(e) {
    e.preventDefault();
    doCheckIn();
  });

  refreshUI();
  console.log('Check-in module initialized');
})();

// ═══════════════════════════════════════════════════════════════
//  Energy Stars
// ═══════════════════════════════════════════════════════════════
(function() {
  var starField = $('#star-field');
  if (!starField) return;

  var TOTAL = 8;
  var collected = 0;
  var stEl = $('#star-total');
  if (stEl) stEl.textContent = String(TOTAL);

  function spawnParticle(e) {
    var p = document.createElement('span');
    p.className = 'star-particle';
    p.textContent = '✨';
    p.style.left = e.clientX + 'px';
    p.style.top = e.clientY + 'px';
    var bottle = $('#bottle');
    if (bottle) {
      var br = bottle.getBoundingClientRect();
      p.style.setProperty('--dx', (br.left + br.width / 2 - e.clientX) + 'px');
      p.style.setProperty('--dy', (br.top + br.height / 2 - e.clientY) + 'px');
    } else {
      p.style.setProperty('--dx', '0px');
      p.style.setProperty('--dy', '-60px');
    }
    document.body.appendChild(p);
    p.addEventListener('animationend', function() { p.remove(); });
  }

  function buildStars() {
    var fw = starField.offsetWidth;
    var fh = starField.offsetHeight;
    if (fw === 0 || fh === 0) { requestAnimationFrame(buildStars); return; }

    var used = [];
    var pad = 10;

    function randPos() {
      for (var a = 0; a < 50; a++) {
        var x = pad + Math.random() * (fw - 2 * pad);
        var y = pad + Math.random() * (fh - 2 * pad);
        var tooClose = false;
        for (var j = 0; j < used.length; j++) {
          if (Math.hypot(used[j].x - x, used[j].y - y) < 50) { tooClose = true; break; }
        }
        if (!tooClose) { used.push({ x: x, y: y }); return { x: x, y: y }; }
      }
      var rx = pad + Math.random() * (fw - 2 * pad);
      var ry = pad + Math.random() * (fh - 2 * pad);
      used.push({ x: rx, y: ry });
      return { x: rx, y: ry };
    }

    for (var i = 0; i < TOTAL; i++) {
      var pos = randPos();
      var s = document.createElement('span');
      s.className = 'star';
      s.textContent = '⭐';
      s.style.left = pos.x + 'px';
      s.style.top = pos.y + 'px';
      s.style.animationDelay = (Math.random() * 2).toFixed(3) + 's';

      (function(starEl) {
        starEl.addEventListener('click', function(e) {
          if (starEl.classList.contains('collected')) return;
          starEl.classList.add('collected');
          collected++;
          var scEl = $('#star-count');
          if (scEl) scEl.textContent = String(collected);
          spawnParticle(e);

          var pct = collected / TOTAL;
          var maxH = 40;
          var fillH = pct * maxH;
          var fillY = 60 + (maxH - fillH);
          var fr = $('#bottle-fill');
          if (fr) { fr.setAttribute('y', String(fillY)); fr.setAttribute('height', String(fillH)); }

          if (collected >= TOTAL) {
            setTimeout(function() {
              var hm = $('#hidden-message');
              var ht = $('#hidden-text');
              if (hm && ht) { ht.textContent = CONFIG.allStarsMessage; hm.classList.add('revealed'); }
            }, 400);
          }
        });
      })(s);

      starField.appendChild(s);
    }
  }

  requestAnimationFrame(buildStars);
})();

// ═══════════════════════════════════════════════════════════════
//  Photo Corner
// ═══════════════════════════════════════════════════════════════
(function() {
  var PHOTO_COUNT = 7;
  var scrollEl = document.getElementById('photo-scroll');
  if (!scrollEl) return;

  for (var i = 1; i <= PHOTO_COUNT; i++) {
    var card = document.createElement('div');
    card.className = 'photo-card';
    var num = String(i).padStart(2, '0');
    var img = document.createElement('img');
    img.src = 'photos/' + num + '.jpg';
    img.alt = '回忆 ' + i;
    img.loading = 'lazy';
    card.appendChild(img);

    // Click to open lightbox
    (function(src) {
      card.addEventListener('click', function() {
        var lb = document.getElementById('lightbox');
        var lbImg = document.getElementById('lightbox-img');
        if (lb && lbImg) {
          lbImg.src = src;
          lb.classList.add('open');
        }
      });
    })(img.src);

    scrollEl.appendChild(card);
  }

  // Close lightbox
  var lb = document.getElementById('lightbox');
  var lbClose = document.getElementById('lightbox-close');
  var lbBg = lb ? lb.querySelector('.lightbox-bg') : null;

  if (lbClose) {
    lbClose.addEventListener('click', function() { lb.classList.remove('open'); });
  }
  if (lbBg) {
    lbBg.addEventListener('click', function() { lb.classList.remove('open'); });
  }
  if (lb) {
    lb.addEventListener('click', function(e) {
      if (e.target === lb) lb.classList.remove('open');
    });
  }
})();

// ═══════════════════════════════════════════════════════════════
//  Mailbox
// ═══════════════════════════════════════════════════════════════
(function() {
  var envelope = $('#envelope');
  var letterCard = $('#letter-card');
  var letterText = $('#letter-text');
  var letterClose = $('#letter-close');
  if (!envelope || !letterCard || !letterText) return;

  envelope.addEventListener('click', function() {
    if (letterCard.classList.contains('open')) return;
    letterText.textContent = CONFIG.messages[Math.floor(Math.random() * CONFIG.messages.length)];
    letterCard.classList.add('open');
  });

  if (letterClose) {
    letterClose.addEventListener('click', function() { letterCard.classList.remove('open'); });
  }

  envelope.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); envelope.click(); }
  });
})();

// ═══════════════════════════════════════════════════════════════
//  Breathing Exercise
// ═══════════════════════════════════════════════════════════════
(function() {
  var btn = $('#breath-btn');
  var circle = $('#breath-circle');
  var text = $('#breath-text');
  if (!btn || !circle || !text) return;

  var running = false;
  var timer = null;
  var phases = [
    { label: '吸气…', dur: 4000, cls: 'breathing-in' },
    { label: '屏住', dur: 4000, cls: 'breathing-hold' },
    { label: '慢慢呼出…', dur: 6000, cls: 'breathing-out' },
  ];

  function runCycle(idx) {
    if (!running) return;
    if (idx >= phases.length) {
      text.textContent = '再来一次';
      circle.className = 'breath-circle';
      timer = setTimeout(function() { runCycle(0); }, 1200);
      return;
    }
    var p = phases[idx];
    text.textContent = p.label;
    circle.className = 'breath-circle ' + p.cls;
    timer = setTimeout(function() { runCycle(idx + 1); }, p.dur);
  }

  btn.addEventListener('click', function() {
    if (running) {
      running = false;
      clearTimeout(timer);
      btn.textContent = '开始呼吸';
      btn.classList.remove('running');
      text.textContent = '准备好了吗';
      circle.className = 'breath-circle';
      return;
    }
    running = true;
    btn.textContent = '停止';
    btn.classList.add('running');
    runCycle(0);
  });
})();

// ═══════════════════════════════════════════════════════════════
//  Scroll Reveal
// ═══════════════════════════════════════════════════════════════
(function() {
  var sections = document.querySelectorAll('section');
  if (!sections.length) return;
  var observer = new IntersectionObserver(function(entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.querySelectorAll('.section-title, .section-label').forEach(function(el) {
          el.classList.add('animate-in');
        });
      }
    }
  }, { threshold: 0.15 });
  for (var i = 0; i < sections.length; i++) { observer.observe(sections[i]); }
})();

// Debounced resize
(function() {
  var t;
  window.addEventListener('resize', function() { clearTimeout(t); t = setTimeout(function() {}, 200); });
})();

// ═══════════════════════════════════════════════════════════════
//  Theme auto-switch based on local time
// ═══════════════════════════════════════════════════════════════
(function() {
  function applyTheme() {
    var hour = new Date().getHours();
    var cls = document.documentElement.classList;
    cls.remove('theme-dawn', 'theme-noon');
    if (hour >= 6 && hour < 12) cls.add('theme-dawn');
    else if (hour >= 12 && hour < 18) cls.add('theme-noon');
    // else: default deep-night theme (no class needed)
  }
  applyTheme();
  // Re-check every 30 minutes
  setInterval(applyTheme, 1800000);
})();

// ═══════════════════════════════════════════════════════════════
//  Parallax stars on scroll
// ═══════════════════════════════════════════════════════════════
(function() {
  var canvas = $('#stars-canvas');
  if (!canvas) return;
  var ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        var y = window.pageYOffset;
        canvas.style.transform = 'translateY(' + (y * 0.06) + 'px)';
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// ═══════════════════════════════════════════════════════════════
//  Countdown digit bounce on change
// ═══════════════════════════════════════════════════════════════
(function() {
  var lastSecs = '';
  setInterval(function() {
    var el = $('#cd-secs');
    if (!el) return;
    var cur = el.textContent;
    if (cur !== lastSecs && lastSecs !== '') {
      el.style.transform = 'scale(1.15)';
      setTimeout(function() { el.style.transform = 'scale(1)'; }, 150);
    }
    lastSecs = cur;
  }, 1000);
})();

// ═══════════════════════════════════════════════════════════════
//  Enhanced scrollbar (webkit)
// ═══════════════════════════════════════════════════════════════
(function() {
  var style = document.createElement('style');
  style.textContent =
    '::-webkit-scrollbar { width: 4px; }' +
    '::-webkit-scrollbar-track { background: transparent; }' +
    '::-webkit-scrollbar-thumb { background: rgba(142,172,205,0.25); border-radius: 2px; }' +
    '::-webkit-scrollbar-thumb:hover { background: rgba(240,192,96,0.4); }';
  document.head.appendChild(style);
})();

console.log('🌊 上岸 — 为美丽的张晓彤而建');
console.log('灯塔已经亮起，岸就在前方。');
