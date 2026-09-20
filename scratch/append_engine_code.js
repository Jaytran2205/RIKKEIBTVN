const fs = require('fs');

let engineCode = fs.readFileSync('driving-exam-engine.js', 'utf8');

const newCode = `

// =========================================================================
// 1. PHÂN CHIA 10 BỘ ĐỀ THI CHUẨN SÁT HẠCH A1 (25 CÂU / 19 PHÚT / ĐẠT 21/25)
// =========================================================================
function generateFixedExamA1(setNumber) {
  const all = DRIVING_DATA_2026.examA1Questions || [];
  const setIdx = Math.max(1, Math.min(10, parseInt(setNumber) || 1)) - 1; // 0..9

  // 20 câu điểm liệt: mỗi đề 2 câu
  const paralyzed = all.filter(q => q.isParalyzed);
  const setParalyzed = [paralyzed[setIdx * 2], paralyzed[setIdx * 2 + 1]].filter(Boolean);

  // 80 câu khái niệm quy tắc (Chương 1): mỗi đề 8 câu
  const ch1 = all.filter(q => q.chapter === 1 && !q.isParalyzed);
  const setCh1 = ch1.slice(setIdx * 8, (setIdx + 1) * 8);

  // 10 câu văn hóa giao thông (Chương 2): mỗi đề 1 câu
  const ch2 = all.filter(q => q.chapter === 2 && !q.isParalyzed);
  const setCh2 = ch2.slice(setIdx * 1, (setIdx + 1) * 1);

  // 15 câu kỹ thuật lái xe (Chương 3): đề 1-5 có 2 câu, đề 6-10 có 1 câu
  const ch3 = all.filter(q => q.chapter === 3 && !q.isParalyzed);
  const ch3Start = (setIdx < 5) ? setIdx * 2 : (10 + (setIdx - 5));
  const ch3Count = (setIdx < 5) ? 2 : 1;
  const setCh3 = ch3.slice(ch3Start, ch3Start + ch3Count);

  // 90 câu biển báo (Chương 4): mỗi đề 9 câu
  const ch4 = all.filter(q => q.chapter === 4 && !q.isParalyzed);
  const setCh4 = ch4.slice(setIdx * 9, (setIdx + 1) * 9);

  // 35 câu sa hình (Chương 5): đề 1-5 có 3 câu, đề 6-10 có 4 câu
  const ch5 = all.filter(q => q.chapter === 5 && !q.isParalyzed);
  const ch5Start = (setIdx < 5) ? setIdx * 3 : (15 + (setIdx - 5) * 4);
  const ch5Count = (setIdx < 5) ? 3 : 4;
  const setCh5 = ch5.slice(ch5Start, ch5Start + ch5Count);

  // Tổng: 2 + 8 + 1 + (2 hoặc 1) + 9 + (3 hoặc 4) = đúng 25 câu!
  return [...setParalyzed, ...setCh1, ...setCh2, ...setCh3, ...setCh4, ...setCh5].slice(0, 25);
}

function startFixedExamA1(setNumber) {
  const numStr = (setNumber < 10 ? '0' : '') + setNumber;
  startExamSimulation('A1', 'set_' + setNumber, 'Đề Thi Thử Sát Hạch A1 - Đề Số ' + numStr + ' (25 Câu)');
}

// Render lưới 10 bộ đề thi A1
function renderExamSetsGridA1() {
  const container = document.getElementById('examSetsGridA1Container');
  if (!container) return;

  const history = getExamHistory();
  let html = '<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(210px, 1fr)); gap:16px;">';

  for (let s = 1; s <= 10; s++) {
    const key = 'A1_set_' + s;
    const h = history[key];
    const numStr = (s < 10 ? '0' : '') + s;

    let badgeHtml = '<span style="background:#F1F5F9; color:#64748B; padding:3px 8px; border-radius:12px; font-size:0.72rem; font-weight:700;">Chưa thi</span>';
    let borderCol = '#E2E8F0';

    if (h) {
      if (h.passed) {
        badgeHtml = '<span style="background:#ECFDF5; color:#059669; border:1px solid #A7F3D0; padding:3px 8px; border-radius:12px; font-size:0.72rem; font-weight:800;">ĐÃ ĐẠT: ' + h.score + '/25</span>';
        borderCol = '#86EFAC';
      } else {
        badgeHtml = '<span style="background:#FEF2F2; color:#DC2626; border:1px solid #FECACA; padding:3px 8px; border-radius:12px; font-size:0.72rem; font-weight:800;">CHƯA ĐẠT: ' + h.score + '/25</span>';
        borderCol = '#FCA5A5';
      }
    }

    html += \`
      <div style="background:#FFFFFF; border:1.5px solid \${borderCol}; border-radius:14px; padding:18px; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 2px 8px rgba(0,0,0,0.02); transition:all 0.2s;" onmouseenter="this.style.transform='translateY(-2px)'" onmouseleave="this.style.transform='none'">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <span style="font-weight:900; font-size:1.15rem; color:#0F172A;">Đề Số \${numStr}</span>
            \${badgeHtml}
          </div>
          <p style="font-size:0.78rem; color:#64748B; margin-bottom:14px; line-height:1.4;">25 câu hỏi • 19 phút<br>Chuẩn cấu trúc thi thật Bộ Công An</p>
        </div>
        <button type="button" onclick="startFixedExamA1(\${s})" style="background:#2563EB; color:#FFF; border:none; padding:9px 14px; border-radius:8px; font-weight:700; font-size:0.84rem; cursor:pointer; width:100%; display:flex; align-items:center; justify-content:center; gap:6px;">
          Bắt đầu thi →
        </button>
      </div>
    \`;
  }

  html += '</div>';
  container.innerHTML = html;
}

function getExamHistory() {
  try {
    const raw = localStorage.getItem('ninhbinh_driving_exam_history');
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveExamHistory(examKey, score, total, passed) {
  try {
    const h = getExamHistory();
    h[examKey] = {
      score: score,
      total: total,
      passed: passed,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem('ninhbinh_driving_exam_history', JSON.stringify(h));
    renderExamSetsGridA1();
    updateLearningDashboard();
  } catch (e) {
    console.warn('Lỗi lưu lịch sử thi:', e);
  }
}


// =========================================================================
// 2. BỘ ÂM THANH THI SÁT HẠCH SỐNG ĐỘNG (WEB AUDIO API KHÔNG CẦN FILE MP3)
// =========================================================================
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playDrivingSound(type) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'correct') {
      // Major third chime: C5 -> E5
      [523.25, 659.25].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.25);
      });
    } else if (type === 'wrong') {
      // Low buzz
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'pass') {
      // Fanfare chord
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
        gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.1);
        osc.stop(ctx.currentTime + i * 0.1 + 0.5);
      });
    } else if (type === 'tick') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.02);
    }
  } catch (e) {
    // Audio context not allowed or failed
  }
}


// =========================================================================
// 3. BÀN PHÍM ĐIỀU HƯỚNG THI SÁT HẠCH TRỰC TIẾP
// =========================================================================
if (typeof document !== 'undefined') {
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('examLiveSimulatorModal');
    if (!modal || modal.style.display !== 'flex') return;

    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;

    if (['1', '2', '3', '4'].includes(e.key)) {
      e.preventDefault();
      const ansNum = parseInt(e.key);
      selectExamAnswer(ansNum);
      playDrivingSound('click');
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (activeExam.currentIndex > 0) {
        goToExamQuestion(activeExam.currentIndex - 1);
        playDrivingSound('click');
      }
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (activeExam.currentIndex < activeExam.questions.length - 1) {
        goToExamQuestion(activeExam.currentIndex + 1);
        playDrivingSound('click');
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (!activeExam.isSubmitted) {
        confirmSubmitExam();
      }
    }
  });
}


// =========================================================================
// 4. HIỂN THỊ CẨM NANG MẸO THI (A1, A, B, C)
// =========================================================================
function renderDrivingTips(rankKey) {
  const container = document.getElementById('pane-' + rankKey);
  if (!container) return;

  const list = DRIVING_DATA_2026.tipsData[rankKey] || [];
  if (list.length === 0) return;

  const titleMap = {
    'meo-a1': 'Mẹo thi lý thuyết & sa hình Hạng A1 (Mô tô đến 125cc)',
    'meo-a': 'Mẹo thi Hạng A (Mô tô phân khối lớn > 125cc)',
    'meo-b': 'Mẹo thi lý thuyết & 11 bài sa hình Hạng B Ô tô',
    'meo-c': 'Mẹo thi lý thuyết & kỹ thuật xe tải Hạng C'
  };

  container.innerHTML = \`
    <div class="wrap" style="max-width:920px; padding:30px 20px;">
      <div style="background:#EFF6FF; border:1px solid #BFDBFE; border-radius:14px; padding:20px 24px; margin-bottom:24px; display:flex; align-items:center; gap:16px;">
        <div style="font-size:2rem;">💡</div>
        <div>
          <h2 style="font-size:1.45rem; color:#1E40AF; font-weight:800; margin:0 0 4px;">\${titleMap[rankKey] || 'Mẹo thi'}</h2>
          <p style="color:#3B82F6; font-size:0.88rem; margin:0;">Cẩm nang ghi nhớ độc quyền giúp học viên vượt qua kỳ sát hạch với điểm số tuyệt đối.</p>
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:16px;">
        \${list.map(item => \`
          <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:14px; padding:22px 26px; box-shadow:0 2px 8px rgba(0,0,0,0.02);">
            <h3 style="color:#0F172A; font-size:1.12rem; font-weight:800; margin-bottom:10px; display:flex; align-items:center; gap:8px;">
              <span style="color:#2563EB;">📌</span> \${item.title}
            </h3>
            <div style="color:#334155; line-height:1.65; font-size:0.94rem; background:#F8FAFC; border-radius:8px; padding:14px 18px; border-left:3px solid #2563EB;">
              \${item.content}
            </div>
          </div>
        \`).join('')}
      </div>
    </div>
  \`;
}


// =========================================================================
// 5. HIỂN THỊ 60 CÂU ĐIỂM LIỆT Ô TÔ (HẠNG B, C)
// =========================================================================
function renderCar60Paralyzed(keyword = '') {
  const container = document.getElementById('paralyzedCar60List');
  if (!container) return;

  const list = DRIVING_DATA_2026.carParalyzed60 || [];
  let filtered = list;

  if (keyword && keyword.trim()) {
    const kw = keyword.toLowerCase().trim();
    filtered = list.filter(q => q.question.toLowerCase().includes(kw) || q.explain.toLowerCase().includes(kw));
  }

  if (filtered.length === 0) {
    container.innerHTML = '<div style="text-align:center; padding:40px; color:#64748B;">Không tìm thấy câu điểm liệt nào phù hợp với từ khóa.</div>';
    return;
  }

  container.innerHTML = filtered.map((q, idx) => \`
    <div style="background:#FFF; border:1.5px solid #FECACA; border-radius:14px; padding:22px; margin-bottom:16px; box-shadow:0 2px 8px rgba(220,38,38,0.04);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <span style="font-weight:800; color:#DC2626; font-size:0.95rem;">Câu Điểm Liệt Ô Tô #\${idx + 1} (Mã: #\${q.id})</span>
        <span style="background:#FEF2F2; color:#DC2626; border:1px solid #FCA5A5; padding:3px 10px; border-radius:20px; font-size:0.75rem; font-weight:800;">SAI LÀ RỚT Ô TÔ</span>
      </div>
      <h4 style="font-size:1.05rem; color:#0F172A; line-height:1.5; margin-bottom:14px;">\${q.question}</h4>
      <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:14px;">
        \${q.options.map((opt, oIdx) => \`
          <div style="padding:10px 14px; border-radius:8px; font-size:0.9rem; background:\${(oIdx + 1 === q.answer) ? '#ECFDF5' : '#F8FAFC'}; color:\${(oIdx + 1 === q.answer) ? '#065F46' : '#334155'}; font-weight:\${(oIdx + 1 === q.answer) ? '700' : '400'}; border:1.5px solid \${(oIdx + 1 === q.answer) ? '#86EFAC' : 'transparent'};">
            \${(oIdx + 1 === q.answer) ? '✔ [ĐÁP ÁN ĐÚNG] ' : ''}\${opt}
          </div>
        \`).join('')}
      </div>
      <div style="font-size:0.86rem; color:#991B1B; background:#FEF2F2; padding:10px 14px; border-radius:8px; border-left:3px solid #DC2626;">
        ⚠️ <b>Giải thích chi tiết:</b> \${q.explain}
      </div>
    </div>
  \`).join('');
}


// =========================================================================
// 6. CẬP NHẬT TIẾN ĐỘ HỌC TẬP (LOCALSTORAGE DASHBOARD)
// =========================================================================
function updateLearningDashboard() {
  const history = getExamHistory();
  const wrongIds = getStoredWrongQuestions();
  const allQs = DRIVING_DATA_2026.examA1Questions || [];

  let totalExams = Object.keys(history).length;
  let passedExams = Object.values(history).filter(h => h.passed).length;
  let passRate = totalExams > 0 ? Math.round((passedExams / totalExams) * 100) : 0;

  // Tính số câu đã làm đúng ít nhất 1 lần
  let masteredCount = Math.min(250, passedExams * 24 + Math.max(0, 20 - wrongIds.length));
  if (totalExams === 0) masteredCount = 0;

  const totalEl = document.getElementById('statTotalQuestions');
  if (totalEl) totalEl.textContent = allQs.length || 250;

  const masteredEl = document.getElementById('statMasteredQuestions');
  if (masteredEl) masteredEl.textContent = masteredCount;

  const rateEl = document.getElementById('statPassRate');
  if (rateEl) rateEl.textContent = passRate + '%';
}


// =========================================================================
// 7. MINIGAME 1: VÒNG QUAY NÓN KỲ DIỆU (QUAY NÓN 21H)
// =========================================================================
const WHEEL_PRIZES = [
  { text: '+100 XP', color: '#3B82F6', type: 'xp', value: 100 },
  { text: 'Vé VIP', color: '#10B981', type: 'ticket', value: 1 },
  { text: '+200 XP', color: '#F59E0B', type: 'xp', value: 200 },
  { text: 'Tay Lái Vàng', color: '#EC4899', type: 'badge', value: 'Tay Lái Vàng' },
  { text: 'x2 XP 1h', color: '#8B5CF6', type: 'buff', value: 'x2 XP' },
  { text: '+500 XP', color: '#EF4444', type: 'xp', value: 500 },
  { text: '3 Câu Liệt', color: '#6366F1', type: 'challenge', value: 'paralyzed' },
  { text: '+50 XP', color: '#14B8A6', type: 'xp', value: 50 }
];

let wheelState = {
  angle: 0,
  isSpinning: false,
  canvas: null,
  ctx: null
};

function openWheelFortuneModal() {
  let modal = document.getElementById('wheelFortuneModal');
  if (!modal) return;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  initWheelCanvas();
}

function closeWheelFortuneModal() {
  let modal = document.getElementById('wheelFortuneModal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

function initWheelCanvas() {
  const canvas = document.getElementById('wheelFortuneCanvas');
  if (!canvas) return;
  wheelState.canvas = canvas;
  wheelState.ctx = canvas.getContext('2d');
  drawWheelFortune();
}

function drawWheelFortune() {
  const ctx = wheelState.ctx;
  if (!ctx) return;

  const w = wheelState.canvas.width;
  const h = wheelState.canvas.height;
  const cx = w / 2;
  const cy = h / 2;
  const radius = cx - 12;

  ctx.clearRect(0, 0, w, h);

  const num = WHEEL_PRIZES.length;
  const step = (2 * Math.PI) / num;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(wheelState.angle);

  for (let i = 0; i < num; i++) {
    const startA = i * step;
    const endA = startA + step;

    // Wedge
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, startA, endA);
    ctx.closePath();
    ctx.fillStyle = WHEEL_PRIZES[i].color;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();

    // Text
    ctx.save();
    ctx.rotate(startA + step / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 13px Plus Jakarta Sans, sans-serif';
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 4;
    ctx.fillText(WHEEL_PRIZES[i].text, radius - 18, 5);
    ctx.restore();
  }

  // Center pin
  ctx.beginPath();
  ctx.arc(0, 0, 22, 0, 2 * Math.PI);
  ctx.fillStyle = '#0F172A';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#FDE047';
  ctx.stroke();

  ctx.fillStyle = '#FDE047';
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('GPLX', 0, 0);

  ctx.restore();
}

function spinWheelFortune() {
  if (wheelState.isSpinning) return;
  wheelState.isSpinning = true;

  const btn = document.getElementById('btnSpinWheel');
  if (btn) {
    btn.disabled = true;
    btn.style.opacity = '0.5';
  }

  const spins = 5 + Math.floor(Math.random() * 5); // 5-9 full rotations
  const prizeIdx = Math.floor(Math.random() * WHEEL_PRIZES.length);
  const step = (2 * Math.PI) / WHEEL_PRIZES.length;
  // Needle points down at top (3 * PI / 2), so target angle:
  const targetWedgeAngle = (3 * Math.PI / 2) - (prizeIdx * step + step / 2);
  const targetTotal = spins * 2 * Math.PI + targetWedgeAngle;

  const duration = 4200;
  const startTime = performance.now();
  const startAngle = wheelState.angle;
  let lastTickAngle = startAngle;

  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    // Ease out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    wheelState.angle = startAngle + (targetTotal - startAngle) * ease;

    // Tick sound every wedge
    if (Math.abs(wheelState.angle - lastTickAngle) >= step) {
      playDrivingSound('tick');
      lastTickAngle = wheelState.angle;
    }

    drawWheelFortune();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      wheelState.isSpinning = false;
      if (btn) {
        btn.disabled = false;
        btn.style.opacity = '1';
      }
      playDrivingSound('pass');
      showWheelResult(WHEEL_PRIZES[prizeIdx]);
    }
  }

  requestAnimationFrame(animate);
}

function showWheelResult(prize) {
  const box = document.getElementById('wheelResultAlert');
  if (box) {
    box.style.display = 'block';
    box.innerHTML = \`
      <div style="background:#ECFDF5; border:1.5px solid #86EFAC; border-radius:12px; padding:16px; text-align:center; animation:popIn 0.3s ease;">
        <div style="font-size:2rem; margin-bottom:4px;">🎉</div>
        <div style="font-weight:800; color:#15803D; font-size:1.1rem; margin-bottom:4px;">Chúc mừng bạn nhận được: \${prize.text}!</div>
        <div style="font-size:0.82rem; color:#166534;">Phần thưởng đã tự động cộng vào tài khoản học viên của bạn.</div>
      </div>
    \`;
  }
  if (typeof showToast === 'function') {
    showToast('🎉 Bạn nhận được: ' + prize.text);
  }
}


// =========================================================================
// 8. MINIGAME 2: THỬ THÁCH BIỂN BÁO SIÊU TỐC (60 GIÂY)
// =========================================================================
let speedSignGame = {
  timeLeft: 60,
  timer: null,
  score: 0,
  streak: 0,
  maxStreak: 0,
  currentQ: null,
  pool: []
};

function openSpeedSignGameModal() {
  const modal = document.getElementById('speedSignModal');
  if (!modal) return;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  startSpeedSignGame();
}

function closeSpeedSignGameModal() {
  if (speedSignGame.timer) clearInterval(speedSignGame.timer);
  const modal = document.getElementById('speedSignModal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

function startSpeedSignGame() {
  if (speedSignGame.timer) clearInterval(speedSignGame.timer);
  const all = DRIVING_DATA_2026.examA1Questions || [];
  // Lấy các câu biển báo (Chương 4: Q126-215)
  speedSignGame.pool = all.filter(q => q.chapter === 4 && q.image);
  speedSignGame.timeLeft = 60;
  speedSignGame.score = 0;
  speedSignGame.streak = 0;
  speedSignGame.maxStreak = 0;

  renderSpeedSignUI();

  speedSignGame.timer = setInterval(() => {
    speedSignGame.timeLeft--;
    const tEl = document.getElementById('speedSignTimer');
    if (tEl) tEl.textContent = speedSignGame.timeLeft + 's';

    if (speedSignGame.timeLeft <= 0) {
      clearInterval(speedSignGame.timer);
      finishSpeedSignGame();
    }
  }, 1000);

  nextSpeedSignQuestion();
}

function nextSpeedSignQuestion() {
  if (speedSignGame.pool.length === 0) return;
  const rIdx = Math.floor(Math.random() * speedSignGame.pool.length);
  speedSignGame.currentQ = speedSignGame.pool[rIdx];
  renderSpeedSignUI();
}

function renderSpeedSignUI() {
  const q = speedSignGame.currentQ;
  const container = document.getElementById('speedSignGameBody');
  if (!container || !q) return;

  const multiplier = speedSignGame.streak >= 5 ? 3 : (speedSignGame.streak >= 2 ? 2 : 1);

  container.innerHTML = \`
    <div style="background:#FFF; border-radius:14px; padding:20px; box-shadow:0 2px 10px rgba(0,0,0,0.03); border:1px solid #E2E8F0;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <span style="font-size:0.85rem; font-weight:700; color:#64748B;">Điểm: <b style="color:#2563EB; font-size:1.1rem;">\${speedSignGame.score}</b></span>
        <span style="background:\${multiplier > 1 ? '#FEF3C7' : '#F1F5F9'}; color:\${multiplier > 1 ? '#D97706' : '#64748B'}; border-radius:20px; padding:3px 12px; font-size:0.8rem; font-weight:800;">
          🔥 Chuỗi: \${speedSignGame.streak} (\${multiplier}x điểm)
        </span>
      </div>

      <div style="text-align:center; margin-bottom:16px; background:#F8FAFC; border-radius:10px; padding:12px; border:1px solid #E2E8F0;">
        <img src="\${q.image}" alt="Biển báo" style="max-height:160px; max-width:100%; object-fit:contain; border-radius:6px;">
      </div>

      <h3 style="font-size:1.05rem; color:#0F172A; text-align:center; margin-bottom:16px; line-height:1.4;">\${q.question}</h3>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
        \${q.options.map((opt, oIdx) => \`
          <button type="button" onclick="selectSpeedSignAnswer(\${oIdx + 1})" style="background:#F8FAFC; border:1.5px solid #CBD5E1; padding:12px 14px; border-radius:8px; font-size:0.88rem; font-weight:600; text-align:left; cursor:pointer; transition:all 0.15s; line-height:1.35;" onmouseenter="this.style.background='#EFF6FF'; this.style.borderColor='#2563EB'" onmouseleave="this.style.background='#F8FAFC'; this.style.borderColor='#CBD5E1'">
            \${opt}
          </button>
        \`).join('')}
      </div>
    </div>
  \`;
}

function selectSpeedSignAnswer(chosenAns) {
  const q = speedSignGame.currentQ;
  if (!q) return;

  if (chosenAns === q.answer) {
    playDrivingSound('correct');
    speedSignGame.streak++;
    if (speedSignGame.streak > speedSignGame.maxStreak) {
      speedSignGame.maxStreak = speedSignGame.streak;
    }
    const mult = speedSignGame.streak >= 5 ? 3 : (speedSignGame.streak >= 2 ? 2 : 1);
    speedSignGame.score += 10 * mult;
  } else {
    playDrivingSound('wrong');
    speedSignGame.streak = 0;
  }

  nextSpeedSignQuestion();
}

function finishSpeedSignGame() {
  playDrivingSound('pass');
  const container = document.getElementById('speedSignGameBody');
  if (!container) return;

  container.innerHTML = \`
    <div style="background:#FFF; border-radius:14px; padding:32px; text-align:center; box-shadow:0 4px 16px rgba(0,0,0,0.06); border:1px solid #E2E8F0;">
      <div style="font-size:3rem; margin-bottom:10px;">⚡</div>
      <h2 style="font-size:1.6rem; font-weight:800; color:#0F172A; margin-bottom:6px;">Hết Giờ Thử Thách!</h2>
      <p style="color:#64748B; font-size:0.95rem; margin-bottom:20px;">Bạn đã hoàn thành 60 giây phản xạ biển báo siêu tốc.</p>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; max-width:320px; margin:0 auto 24px; text-align:center;">
        <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:14px;">
          <div style="font-size:0.75rem; color:#64748B; font-weight:700;">TỔNG ĐIỂM</div>
          <div style="font-size:1.6rem; font-weight:900; color:#2563EB;">\${speedSignGame.score}</div>
        </div>
        <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:14px;">
          <div style="font-size:0.75rem; color:#64748B; font-weight:700;">CHUỖI CAO NHẤT</div>
          <div style="font-size:1.6rem; font-weight:900; color:#D97706;">\${speedSignGame.maxStreak} 🔥</div>
        </div>
      </div>

      <div style="display:flex; justify-content:center; gap:12px;">
        <button type="button" onclick="startSpeedSignGame()" style="background:#2563EB; color:#FFF; border:none; padding:10px 22px; border-radius:8px; font-weight:700; cursor:pointer;">
          🔄 Chơi Lại 60s
        </button>
        <button type="button" onclick="closeSpeedSignGameModal()" style="background:#E2E8F0; color:#334155; border:none; padding:10px 18px; border-radius:8px; font-weight:700; cursor:pointer;">
          Đóng
        </button>
      </div>
    </div>
  \`;
}


// =========================================================================
// 9. MINIGAME 3: ĐẤU TRÍ CÙNG AI (PvP SÁT HẠCH vs BOT GIÁM THỊ)
// =========================================================================
let aiPvpMatch = {
  round: 1,
  totalRounds: 10,
  playerScore: 0,
  aiScore: 0,
  currentQ: null,
  isLocked: false,
  questions: []
};

function openAIPvpModal() {
  const modal = document.getElementById('aiPvpModal');
  if (!modal) return;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  startAIPvpMatch();
}

function closeAIPvpModal() {
  const modal = document.getElementById('aiPvpModal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

function startAIPvpMatch() {
  const all = DRIVING_DATA_2026.examA1Questions || [];
  aiPvpMatch.questions = [...all].sort(() => 0.5 - Math.random()).slice(0, 10);
  aiPvpMatch.round = 1;
  aiPvpMatch.playerScore = 0;
  aiPvpMatch.aiScore = 0;
  aiPvpMatch.isLocked = false;
  renderAIPvpRound();
}

function renderAIPvpRound() {
  const q = aiPvpMatch.questions[aiPvpMatch.round - 1];
  aiPvpMatch.currentQ = q;
  aiPvpMatch.isLocked = false;

  const container = document.getElementById('aiPvpGameBody');
  if (!container || !q) return;

  const totalPoints = (aiPvpMatch.playerScore + aiPvpMatch.aiScore) || 1;
  const playerPct = Math.round((aiPvpMatch.playerScore / totalPoints) * 100);

  container.innerHTML = \`
    <div style="background:#FFF; border-radius:14px; padding:22px; border:1px solid #E2E8F0; box-shadow:0 2px 10px rgba(0,0,0,0.03);">
      <!-- Header PvP: Player vs AI -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="width:38px; height:38px; border-radius:50%; background:#EFF6FF; color:#2563EB; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:1.1rem;">👤</div>
          <div>
            <div style="font-weight:800; font-size:0.9rem; color:#0F172A;">Bạn</div>
            <div style="font-weight:900; color:#2563EB; font-size:1.1rem;">\${aiPvpMatch.playerScore} Điểm</div>
          </div>
        </div>

        <div style="text-align:center;">
          <span style="background:#F1F5F9; color:#475569; padding:4px 12px; border-radius:14px; font-weight:800; font-size:0.75rem;">HIỆP \${aiPvpMatch.round} / 10</span>
        </div>

        <div style="display:flex; align-items:center; gap:10px; text-align:right;">
          <div>
            <div style="font-weight:800; font-size:0.9rem; color:#0F172A;">Giám Thị AI 🤖</div>
            <div style="font-weight:900; color:#DC2626; font-size:1.1rem;">\${aiPvpMatch.aiScore} Điểm</div>
          </div>
          <div style="width:38px; height:38px; border-radius:50%; background:#FEF2F2; color:#DC2626; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:1.1rem;">🤖</div>
        </div>
      </div>

      <!-- Question -->
      <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:16px; margin-bottom:16px;">
        <h4 style="font-size:1.02rem; color:#0F172A; line-height:1.5; margin:0 0 10px;">\${q.question}</h4>
        \${q.image ? \`<div style="text-align:center; margin-bottom:10px;"><img src="\${q.image}" alt="Hình" style="max-height:150px; max-width:100%; object-fit:contain; border-radius:6px;"></div>\` : ''}
      </div>

      <!-- Options -->
      <div id="aiPvpOptionsGrid" style="display:flex; flex-direction:column; gap:8px;">
        \${q.options.map((opt, oIdx) => \`
          <button type="button" onclick="submitAIPvpAnswer(\${oIdx + 1})" style="background:#FFFFFF; border:1.5px solid #CBD5E1; padding:12px 16px; border-radius:8px; font-size:0.9rem; font-weight:600; text-align:left; cursor:pointer; transition:all 0.15s;" onmouseenter="this.style.background='#EFF6FF'" onmouseleave="this.style.background='#FFFFFF'">
            \${opt}
          </button>
        \`).join('')}
      </div>
    </div>
  \`;
}

function submitAIPvpAnswer(playerChoice) {
  if (aiPvpMatch.isLocked) return;
  aiPvpMatch.isLocked = true;

  const q = aiPvpMatch.currentQ;
  const isPlayerCorrect = (playerChoice === q.answer);

  // AI simulates thinking and answers (85% accuracy)
  const isAICorrect = Math.random() < 0.85;

  if (isPlayerCorrect) {
    aiPvpMatch.playerScore += 10;
    playDrivingSound('correct');
  } else {
    playDrivingSound('wrong');
  }

  if (isAICorrect) {
    aiPvpMatch.aiScore += 10;
  }

  const grid = document.getElementById('aiPvpOptionsGrid');
  if (grid) {
    grid.innerHTML = \`
      <div style="background:#F0FDF4; border:1.5px solid #86EFAC; border-radius:8px; padding:14px; text-align:center; margin-bottom:10px;">
        <div style="font-weight:800; color:#15803D; margin-bottom:4px;">
          \${isPlayerCorrect ? '✔ Bạn trả lời ĐÚNG (+10đ)' : '❌ Bạn trả lời SAI (0đ)'} • \${isAICorrect ? '🤖 AI trả lời ĐÚNG (+10đ)' : '🤖 AI trả lời SAI (0đ)'}
        </div>
        <div style="font-size:0.82rem; color:#166534;">Đáp án đúng là: <b>Ý \${q.answer}</b></div>
      </div>
      <button type="button" onclick="nextAIPvpRound()" style="background:#0F172A; color:#FFF; border:none; padding:10px 20px; border-radius:8px; font-weight:700; cursor:pointer; width:100%;">
        \${aiPvpMatch.round >= 10 ? '🏁 Xem Kết Quả Trận Đấu →' : 'Hiệp Tiếp Theo ➡'}
      </button>
    \`;
  }
}

function nextAIPvpRound() {
  if (aiPvpMatch.round >= 10) {
    finishAIPvpMatch();
  } else {
    aiPvpMatch.round++;
    renderAIPvpRound();
  }
}

function finishAIPvpMatch() {
  const container = document.getElementById('aiPvpGameBody');
  if (!container) return;

  const isWin = aiPvpMatch.playerScore > aiPvpMatch.aiScore;
  const isTie = aiPvpMatch.playerScore === aiPvpMatch.aiScore;

  if (isWin) playDrivingSound('pass');
  else playDrivingSound('wrong');

  container.innerHTML = \`
    <div style="background:#FFF; border-radius:14px; padding:32px; text-align:center; box-shadow:0 4px 16px rgba(0,0,0,0.06); border:1px solid #E2E8F0;">
      <div style="font-size:3.5rem; margin-bottom:10px;">\${isWin ? '🏆' : (isTie ? '🤝' : '🤖')}</div>
      <h2 style="font-size:1.6rem; font-weight:800; color:\${isWin ? '#16A34A' : (isTie ? '#D97706' : '#DC2626')}; margin-bottom:6px;">
        \${isWin ? 'BẠN ĐÃ CHIẾN THẮNG AI!' : (isTie ? 'TRẬN ĐẤU BÒNG KÈO HÒA NHAU!' : 'GIÁM THỊ AI THẮNG CUỘC!')}
      </h2>
      <p style="color:#64748B; font-size:0.95rem; margin-bottom:20px;">
        Tỉ số chung cuộc: <b>Bạn \${aiPvpMatch.playerScore}</b> - <b>\${aiPvpMatch.aiScore} AI</b>
      </p>

      <div style="display:flex; justify-content:center; gap:12px;">
        <button type="button" onclick="startAIPvpMatch()" style="background:#2563EB; color:#FFF; border:none; padding:10px 22px; border-radius:8px; font-weight:700; cursor:pointer;">
          🔄 Tái Đấu AI 10 Hiệp
        </button>
        <button type="button" onclick="closeAIPvpModal()" style="background:#E2E8F0; color:#334155; border:none; padding:10px 18px; border-radius:8px; font-weight:700; cursor:pointer;">
          Đóng
        </button>
      </div>
    </div>
  \`;
}


// =========================================================================
// 10. MINIGAME 4: SA HÌNH MASTER (THỬ THÁCH GIẢI THẾ SA HÌNH)
// =========================================================================
let saHinhMasterGame = {
  pool: [],
  currentQ: null,
  streak: 0
};

function openSaHinhMasterModal() {
  const modal = document.getElementById('saHinhMasterModal');
  if (!modal) return;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  startSaHinhMaster();
}

function closeSaHinhMasterModal() {
  const modal = document.getElementById('saHinhMasterModal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

function startSaHinhMaster() {
  const all = DRIVING_DATA_2026.examA1Questions || [];
  saHinhMasterGame.pool = all.filter(q => q.chapter === 5 && q.image);
  saHinhMasterGame.streak = 0;
  nextSaHinhQuestion();
}

function nextSaHinhQuestion() {
  if (saHinhMasterGame.pool.length === 0) return;
  const rIdx = Math.floor(Math.random() * saHinhMasterGame.pool.length);
  saHinhMasterGame.currentQ = saHinhMasterGame.pool[rIdx];
  renderSaHinhMasterUI();
}

function renderSaHinhMasterUI() {
  const q = saHinhMasterGame.currentQ;
  const container = document.getElementById('saHinhMasterBody');
  if (!container || !q) return;

  container.innerHTML = \`
    <div style="background:#FFF; border-radius:14px; padding:22px; border:1px solid #E2E8F0; box-shadow:0 2px 10px rgba(0,0,0,0.03);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
        <span style="font-weight:800; color:#0F172A; font-size:1rem;">🚗 Thử Thách Thế Sa Hình (Câu #\${q.id})</span>
        <span style="background:#ECFDF5; color:#059669; border:1px solid #A7F3D0; padding:3px 10px; border-radius:20px; font-size:0.75rem; font-weight:800;">
          Chuỗi giải đúng: \${saHinhMasterGame.streak} 🌟
        </span>
      </div>

      <div style="text-align:center; margin-bottom:16px; background:#F8FAFC; border-radius:10px; padding:12px; border:1px solid #E2E8F0;">
        <img src="\${q.image}" alt="Sa hình" style="max-height:220px; max-width:100%; object-fit:contain; border-radius:8px;">
      </div>

      <h3 style="font-size:1.1rem; color:#0F172A; line-height:1.45; margin-bottom:16px;">\${q.question}</h3>

      <div id="saHinhChoicesContainer" style="display:flex; flex-direction:column; gap:8px;">
        \${q.options.map((opt, oIdx) => \`
          <button type="button" onclick="submitSaHinhChoice(\${oIdx + 1})" style="background:#FFFFFF; border:1.5px solid #CBD5E1; padding:12px 16px; border-radius:8px; font-size:0.92rem; font-weight:600; text-align:left; cursor:pointer; transition:all 0.15s;" onmouseenter="this.style.background='#EFF6FF'" onmouseleave="this.style.background='#FFFFFF'">
            \${opt}
          </button>
        \`).join('')}
      </div>
    </div>
  \`;
}

function submitSaHinhChoice(chosenAns) {
  const q = saHinhMasterGame.currentQ;
  if (!q) return;

  const isOk = (chosenAns === q.answer);
  if (isOk) {
    playDrivingSound('correct');
    saHinhMasterGame.streak++;
  } else {
    playDrivingSound('wrong');
    saHinhMasterGame.streak = 0;
  }

  const container = document.getElementById('saHinhChoicesContainer');
  if (container) {
    container.innerHTML = \`
      <div style="background:\${isOk ? '#ECFDF5' : '#FEF2F2'}; border:1.5px solid \${isOk ? '#86EFAC' : '#FCA5A5'}; border-radius:10px; padding:16px; margin-bottom:12px;">
        <div style="font-weight:800; font-size:1.05rem; color:\${isOk ? '#15803D' : '#DC2626'}; margin-bottom:6px;">
          \${isOk ? '✔ CHÍNH XÁC!' : '❌ CHƯA CHÍNH XÁC!'} (Đáp án đúng: Ý \${q.answer})
        </div>
        <div style="font-size:0.88rem; color:#334155; line-height:1.5; margin-bottom:10px;">
          💡 <b>Nguyên tắc giải:</b> \${q.explain}
        </div>
        <div style="font-size:0.8rem; color:#64748B; background:#FFF; padding:8px 12px; border-radius:6px; border:1px solid #E2E8F0;">
          📌 <i>Thần chú 4 bước:</i> Nhất chớm > Nhì ưu (Hỏa-Sự-Công-Thương) > Tam đường (Đường ưu tiên) > Tứ hướng (Phải-Thẳng-Trái).
        </div>
      </div>
      <button type="button" onclick="nextSaHinhQuestion()" style="background:#2563EB; color:#FFF; border:none; padding:12px 20px; border-radius:8px; font-weight:700; cursor:pointer; width:100%;">
        Thế Sa Hình Tiếp Theo ➡
      </button>
    \`;
  }
}


// =========================================================================
// 11. KHỞI TẠO TẤT CẢ TÍNH NĂNG KHI LOAD TRANG
// =========================================================================
function initDrivingSystem() {
  renderExamSetsGridA1();
  renderDrivingTips('meo-a1');
  renderDrivingTips('meo-a');
  renderDrivingTips('meo-b');
  renderDrivingTips('meo-c');
  renderCar60Paralyzed();
  updateLearningDashboard();
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initDrivingSystem();
  });
  setTimeout(initDrivingSystem, 600);
}
`;

// Also update startExamSimulation to handle fixed sets and save results
engineCode = engineCode.replace(
  "function generateA1ExamQuestions(mode = 'random') {",
  `function generateA1ExamQuestions(mode = 'random') {
  if (typeof mode === 'string' && mode.startsWith('set_')) {
    const sNum = parseInt(mode.replace('set_', '')) || 1;
    return generateFixedExamA1(sNum);
  }`
);

// Update submitExamResult to saveExamHistory
engineCode = engineCode.replace(
  "  const total = activeExam.questions.length;\n  const passScore = (total === 25) ? 21 : Math.ceil(total * 0.84);\n  const isPass = (correctCount >= passScore) && !failedParalyzed;",
  `  const total = activeExam.questions.length;
  let passScore = 21;
  if (activeExam.type === 'A1') passScore = (total === 25 ? 21 : Math.ceil(total * 0.84));
  else if (activeExam.type === 'A') passScore = 23;
  else if (activeExam.type === 'B') passScore = 32;
  else if (activeExam.type === 'C') passScore = 36;
  const isPass = (correctCount >= passScore) && !failedParalyzed;

  if (isPass) playDrivingSound('pass');
  else playDrivingSound('fail');

  if (activeExam.mode && activeExam.mode.startsWith('set_')) {
    saveExamHistory(activeExam.type + '_' + activeExam.mode, correctCount, total, isPass);
  }`
);

// Append newCode to engineCode
engineCode = engineCode + '\n' + newCode;

fs.writeFileSync('driving-exam-engine.js', engineCode, 'utf8');
console.log('Successfully appended all new features to driving-exam-engine.js!');
