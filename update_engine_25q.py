# Script nâng cấp driving-exam-engine.js để tạo đề thi chuẩn 25 câu A1
import json

with open('scratch/questions_a1.json', 'r', encoding='utf-8') as f:
    questions_a1 = json.load(f)

print(f"Loaded {len(questions_a1)} questions.")

new_exam_engine_code = '''
// =========================================================================
// BỘ ĐỀ THI & DỮ LIỆU ÔN THI BẰNG LÁI XE 2026 (LUẬT MỚI & 600 CÂU HỎI GPLX)
// =========================================================================

const DRIVING_DATA_2026 = {
  // 1. Dữ liệu tra cứu loại xe -> hạng bằng
  vehicleTypes: {
    "moto_125": {
      name: "Xe máy đến 125cc",
      badge: "PHỔ BIẾN NHẤT",
      recommend: "Nên học bằng A1",
      desc: "Theo Luật Trật tự ATGT đường bộ mới 2026: Xe mô tô hai bánh có dung tích xi-lanh đến 125 cm³ hoặc xe mô tô điện có công suất động cơ điện đến 11 kW thuộc phân hạng A1.",
      route: "thi-a1",
      routeName: "Lộ trình A1 →"
    },
    "moto_above125": {
      name: "Xe máy trên 125cc",
      badge: "PHÂN KHỐI LỚN",
      recommend: "Nên học bằng A",
      desc: "Xe mô tô hai bánh có dung tích xi-lanh trên 125 cm³ hoặc động cơ điện trên 11 kW (và được lái toàn bộ các loại xe quy định cho bằng A1) thuộc phân hạng A.",
      route: "thi-a",
      routeName: "Lộ trình A →"
    },
    "car_small": {
      name: "Ô tô con, tải nhỏ",
      badge: "Ô TÔ CÁ NHÂN",
      recommend: "Nên học bằng B",
      desc: "Ô tô chở người đến 8 chỗ (không kể chỗ của người lái xe); ô tô tải và ô tô chuyên dùng có khối lượng toàn bộ theo thiết kế đến 3.500 kg.",
      route: "thi-b",
      routeName: "Lộ trình B →"
    },
    "truck_mid": {
      name: "Xe tải 3,5 - 7,5 tấn",
      badge: "XE TẢI VỪA",
      recommend: "Nên học bằng C1",
      desc: "Ô tô tải và ô tô chuyên dùng có khối lượng toàn bộ theo thiết kế trên 3.500 kg đến 7.500 kg (bao gồm cả các loại xe quy định cho giấy phép lái xe hạng B).",
      route: "thi-b",
      routeName: "Lộ trình C1 →"
    },
    "truck_heavy": {
      name: "Xe tải trên 7,5 tấn",
      badge: "XE TẢI NẶNG",
      recommend: "Nên học bằng C",
      desc: "Ô tô tải và ô tô chuyên dùng có khối lượng toàn bộ theo thiết kế trên 7.500 kg; các loại ô tô tải kéo rơ moóc đến 750 kg và xe hạng B, C1.",
      route: "thi-c",
      routeName: "Lộ trình C →"
    }
  },

  // 2. Dữ liệu độ tuổi học hạng bằng
  ageRules: {
    "under_18": {
      title: "Dưới 18 tuổi",
      badge: "CHƯA ĐỦ TUỔI GPLX",
      recommend: "Chỉ được lái xe dưới 50cc",
      desc: "Người đủ 16 tuổi trở lên được lái xe gắn máy có dung tích xi-lanh dưới 50 cm³ hoặc xe máy điện dưới 4 kW (không cần bằng lái). Chưa đủ tuổi thi bằng A1, A, B, C.",
      actionText: "Xem quy định xe 50cc →"
    },
    "from_18": {
      title: "Từ 18 tuổi",
      badge: "GỢI Ý PHỔ BIẾN",
      recommend: "Có thể học A1, A, B, C1",
      desc: "Đây là độ tuổi bắt đầu nhu cầu thi bằng lái xe máy và ô tô cá nhân nhiều nhất. Nếu đi xe máy phổ thông, bạn hãy bắt đầu ngay bằng hạng A1 hoặc ô tô hạng B.",
      actionText: "Bắt đầu lộ trình →"
    },
    "from_21": {
      title: "Từ 21 tuổi",
      badge: "ĐỦ ĐIỀU KIỆN MỌI HẠNG XE TẢI",
      recommend: "Có thể học A1, A, B, C1, C, FB...",
      desc: "Người đủ 21 tuổi trở lên đủ điều kiện dự thi bằng lái xe tải hạng C, kéo rơ moóc và nâng hạng bằng lái xe chuyên nghiệp.",
      actionText: "Lộ trình học hạng C →"
    }
  },

  // 3. Bảng các hạng bằng lái xe 2026
  licenseTable: [
    { rank: "A1", canDrive: "Xe mô tô hai bánh đến 125 cm³ hoặc xe điện đến 11 kW", age: "Từ 18 tuổi", expiry: "Không thời hạn", target: "thi-a1" },
    { rank: "A", canDrive: "Xe mô tô hai bánh trên 125 cm³ hoặc trên 11 kW, gồm cả nhóm A1", age: "Từ 18 tuổi", expiry: "Không thời hạn", target: "thi-a" },
    { rank: "B", canDrive: "Ô tô con đến 8 chỗ và xe tải/chuyên dùng đến 3.500 kg", age: "Từ 18 tuổi", expiry: "10 năm", target: "thi-b" },
    { rank: "C1", canDrive: "Xe tải/chuyên dùng trên 3.500 kg đến 7.500 kg", age: "Từ 18 tuổi", expiry: "10 năm", target: "thi-b" },
    { rank: "C", canDrive: "Xe tải/chuyên dùng trên 7.500 kg và các xe thuộc nhóm B, C1", age: "Từ 21 tuổi", expiry: "5 năm", target: "thi-c" }
  ],

  // 4. Ngân hàng câu hỏi A1 (250 câu chuẩn Bộ Công An)
  examA1Questions: ''' + json.dumps(questions_a1, ensure_ascii=False, indent=2) + ''',

  // 5. Mẹo thi sát hạch lý thuyết siêu tốc
  tipsData: {
    "meo-a1": [
      { title: "1. Mẹo Các Câu Khái Niệm", content: "• Chọn đáp án có chữ 'Bị nghiêm cấm', 'Không được phép', 'Tuyệt đối không'.<br>• Dải phân cách gồm: Cố định và Di động.<br>• Đường ưu tiên: Được các phương tiện khác nhường đường." },
      { title: "2. Mẹo Độ Tuổi Thi Bằng", content: "• Đủ 16 tuổi: Xe dưới 50cc.<br>• Đủ 18 tuổi: Hạng A1, A, B.<br>• Đủ 21 tuổi: Hạng C.<br>• Đủ 24 tuổi: Hạng D.<br>• Đủ 27 tuổi: Hạng E." },
      { title: "3. Mẹo Quy Tắc Nhường Đường Sa Hình", content: "1. <b>Nhất chớm</b>: Xe nào đã vào giao lộ trước được đi trước.<br>2. <b>Nhì ưu</b>: Hỏa - Sự - Công - Thương (Cứu hỏa > Quân sự > Công an > Cứu thương).<br>3. <b>Tam đường</b>: Xe trên đường ưu tiên được đi trước.<br>4. <b>Tứ hướng</b>: Rẽ phải > Đi thẳng > Rẽ trái." }
    ],
    "meo-b": [
      { title: "1. Mẹo Tốc Độ & Khoảng Cách Ô Tô", content: "• Trong khu dân cư: Có dải phân cách 60km/h; Không dải phân cách 50km/h.<br>• Ngoài khu dân cư: Xe con 90km/h (có dải phân cách), 80km/h (không dải phân cách)." },
      { title: "2. Mẹo Biển Báo Cấm Cần Nhớ", content: "• Cấm nhỏ thì cấm lớn: Cấm ô tô con -> Cấm xe tải -> Cấm xe khách.<br>• Cấm lớn không cấm nhỏ: Cấm xe tải -> Không cấm ô tô con.<br>• Cấm rẽ trái -> Cấm quay đầu (theo quy chuẩn mới)." }
    ]
  }
};

// Trạng thái thi thử hiện tại
let activeExam = {
  type: 'A1',
  modeName: 'Đề Thi Thử Ngẫu Nhiên A1 (25 Câu)',
  questions: [],
  currentIndex: 0,
  userAnswers: {},
  timerInterval: null,
  timeLeft: 19 * 60, // 19 phút
  isSubmitted: false
};

// 1. Chuyển đổi tab trong trang Driving
function switchDrivingTab(tabId, btnEl) {
  document.querySelectorAll('.driving-subnav-btn').forEach(b => {
    b.classList.remove('active');
    b.style.background = 'transparent';
    b.style.color = '#334155';
    b.style.fontWeight = '600';
  });

  if (btnEl) {
    btnEl.classList.add('active');
    btnEl.style.background = '#2563EB';
    btnEl.style.color = '#FFF';
    btnEl.style.fontWeight = '700';
  }

  // Ẩn tất cả section
  document.querySelectorAll('.driving-tab-pane').forEach(p => p.style.display = 'none');

  const targetPane = document.getElementById('pane-' + tabId);
  if (targetPane) {
    targetPane.style.display = 'block';
  }

  if (tabId === 'tracuu600') {
    renderQuestionLookup(0, '');
  } else if (tabId === 'cau-liet-20') {
    renderParalyzedQuestions();
  }
}

// 2. Tương tác Chọn xe cần bằng gì
function selectVehicleType(typeKey, btnEl) {
  document.querySelectorAll('.veh-btn').forEach(b => {
    b.style.background = '#FFFFFF';
    b.style.color = '#0F172A';
    b.style.borderColor = '#E2E8F0';
  });

  if (btnEl) {
    btnEl.style.background = '#0F172A';
    btnEl.style.color = '#FFFFFF';
    btnEl.style.borderColor = '#0F172A';
  }

  const v = DRIVING_DATA_2026.vehicleTypes[typeKey];
  if (!v) return;

  const box = document.getElementById('vehicleResultBox');
  if (box) {
    box.innerHTML = `
      <div style="background:#F0FDF4; border:1.5px solid #86EFAC; border-radius:14px; padding:24px; height:100%; display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span style="color:#16A34A; font-weight:800; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em;">${v.badge}</span>
            <span style="color:#16A34A; font-size:1.2rem;">✔</span>
          </div>
          <h3 style="font-size:1.35rem; color:#0F172A; font-weight:800; margin-bottom:10px;">${v.recommend}</h3>
          <p style="color:#334155; font-size:0.92rem; line-height:1.6;">${v.desc}</p>
        </div>
        <div style="margin-top:20px;">
          <button type="button" onclick="switchDrivingTab('${v.route}', document.querySelector('[data-tab=${v.route}]'))" style="background:#0F172A; color:#FFF; padding:10px 22px; border-radius:8px; font-weight:700; font-size:0.88rem; cursor:pointer; display:inline-flex; align-items:center; gap:6px;">
            ${v.routeName}
          </button>
        </div>
      </div>
    `;
  }
}

// 3. Tương tác Chọn tuổi học hạng nào
function selectAgeOption(ageKey, btnEl) {
  document.querySelectorAll('.age-btn').forEach(b => {
    b.style.background = '#FFFFFF';
    b.style.color = '#0F172A';
    b.style.borderColor = '#E2E8F0';
  });

  if (btnEl) {
    btnEl.style.background = '#0F172A';
    btnEl.style.color = '#FFFFFF';
    btnEl.style.borderColor = '#0F172A';
  }

  const a = DRIVING_DATA_2026.ageRules[ageKey];
  if (!a) return;

  const box = document.getElementById('ageResultBox');
  if (box) {
    box.innerHTML = `
      <div style="background:#F0FDF4; border:1.5px solid #86EFAC; border-radius:14px; padding:24px; height:100%; display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div style="color:#16A34A; font-weight:800; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:8px;">${a.badge}</div>
          <h3 style="font-size:1.3rem; color:#0F172A; font-weight:800; margin-bottom:10px;">${a.recommend}</h3>
          <p style="color:#334155; font-size:0.92rem; line-height:1.6;">${a.desc}</p>
        </div>
        <div style="margin-top:20px;">
          <button type="button" onclick="switchDrivingTab('lotrinh', document.querySelector('[data-tab=lotrinh]'))" style="background:#059669; color:#FFF; padding:10px 22px; border-radius:8px; font-weight:700; font-size:0.88rem; cursor:pointer;">
            ${a.actionText}
          </button>
        </div>
      </div>
    `;
  }
}

// 4. Sinh bộ câu hỏi theo chuẩn cấu trúc thi thật (25 câu A1)
function generateA1ExamQuestions(mode = 'random') {
  const all = DRIVING_DATA_2026.examA1Questions;
  
  if (mode === 'paralyzed') {
    return all.filter(q => q.isParalyzed);
  }
  if (mode === 'chapter1') {
    return all.filter(q => q.chapter === 1);
  }
  if (mode === 'chapter2') {
    return all.filter(q => q.chapter === 2);
  }
  if (mode === 'chapter3') {
    return all.filter(q => q.chapter === 3);
  }
  if (mode === 'chapter4') {
    return all.filter(q => q.chapter === 4);
  }
  if (mode === 'chapter5') {
    return all.filter(q => q.chapter === 5);
  }
  if (mode === 'full') {
    return [...all];
  }

  // ĐỀ THI CHUẨN SÁT HẠCH A1: ĐÚNG 25 CÂU
  const paralyzedList = all.filter(q => q.isParalyzed);
  const chapter1List = all.filter(q => q.chapter === 1 && !q.isParalyzed);
  const chapter2List = all.filter(q => q.chapter === 2 && !q.isParalyzed);
  const chapter3List = all.filter(q => q.chapter === 3 && !q.isParalyzed);
  const chapter4List = all.filter(q => q.chapter === 4 && !q.isParalyzed);
  const chapter5List = all.filter(q => q.chapter === 5 && !q.isParalyzed);

  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

  const selected = [
    ...shuffle(paralyzedList).slice(0, 1),   // 1 câu điểm liệt
    ...shuffle(chapter1List).slice(0, 12),   // 12 câu quy tắc
    ...shuffle(chapter4List).slice(0, 5),    // 5 câu biển báo
    ...shuffle(chapter5List).slice(0, 5),    // 5 câu sa hình
    ...shuffle(chapter2List).slice(0, 1),    // 1 câu văn hóa
    ...shuffle(chapter3List).slice(0, 1)     // 1 câu kỹ thuật
  ];

  // Nếu tổng chưa đủ 25 câu do ngân hàng câu hỏi, bù thêm từ danh sách còn lại
  if (selected.length < 25) {
    const remaining = all.filter(q => !selected.some(s => s.id === q.id));
    selected.push(...shuffle(remaining).slice(0, 25 - selected.length));
  }

  return selected.slice(0, 25);
}

// 5. Trình Thi Thử Sát Hạch Trực Tuyến Live Simulator
function startExamSimulation(rank = 'A1', mode = 'random', title = 'Đề Thi Thử Sát Hạch A1 (25 Câu)') {
  activeExam.type = rank;
  activeExam.modeName = title;
  
  if (rank === 'A1') {
    activeExam.questions = generateA1ExamQuestions(mode);
    activeExam.timeLeft = (mode === 'speed') ? 5 * 60 : 19 * 60;
  } else if (rank === 'A') {
    activeExam.questions = generateA1ExamQuestions(mode);
    activeExam.timeLeft = 19 * 60;
  } else if (rank === 'B') {
    activeExam.questions = generateA1ExamQuestions(mode).slice(0, 35);
    activeExam.timeLeft = 22 * 60;
  } else if (rank === 'C') {
    activeExam.questions = generateA1ExamQuestions(mode).slice(0, 40);
    activeExam.timeLeft = 24 * 60;
  }

  activeExam.currentIndex = 0;
  activeExam.userAnswers = {};
  activeExam.isSubmitted = false;

  if (activeExam.timerInterval) clearInterval(activeExam.timerInterval);

  activeExam.timerInterval = setInterval(() => {
    if (activeExam.timeLeft > 0) {
      activeExam.timeLeft--;
      renderExamTimer();
    } else {
      clearInterval(activeExam.timerInterval);
      submitExamResult();
    }
  }, 1000);

  // Mở modal làm bài thi trực tuyến toàn màn hình / popup chuyên nghiệp
  openExamLiveModal();
}

function openExamLiveModal() {
  const modal = document.getElementById('examLiveSimulatorModal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    renderExamUI();
  }
}

function closeExamLiveModal() {
  if (activeExam.timerInterval) clearInterval(activeExam.timerInterval);
  const modal = document.getElementById('examLiveSimulatorModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

function renderExamTimer() {
  const m = Math.floor(activeExam.timeLeft / 60);
  const s = activeExam.timeLeft % 60;
  const el = document.getElementById('modalExamCountdownBadge');
  if (el) el.textContent = `⏱️ ${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

function renderExamUI() {
  const q = activeExam.questions[activeExam.currentIndex];
  if (!q) return;

  const total = activeExam.questions.length;
  const titleEl = document.getElementById('modalExamTitle');
  if (titleEl) titleEl.textContent = activeExam.modeName;

  const numBox = document.getElementById('modalExamQuestionNumbers');
  if (numBox) {
    numBox.innerHTML = activeExam.questions.map((item, idx) => {
      const isAns = activeExam.userAnswers[idx] !== undefined;
      const isCur = idx === activeExam.currentIndex;
      return `
        <button type="button" onclick="goToExamQuestion(${idx})" style="width:36px; height:36px; border-radius:8px; font-weight:700; font-size:0.85rem; cursor:pointer; border:1.5px solid ${isCur ? '#2563EB' : (isAns ? '#10B981' : '#CBD5E1')}; background:${isCur ? '#EFF6FF' : (isAns ? '#ECFDF5' : '#FFFFFF')}; color:${isCur ? '#2563EB' : (isAns ? '#059669' : '#334155')};">
          ${idx + 1}
        </button>
      `;
    }).join('');
  }

  const contentBox = document.getElementById('modalExamQuestionContent');
  if (contentBox) {
    contentBox.innerHTML = `
      <div style="background:#FFF; border:1px solid #E2E8F0; border-radius:14px; padding:24px; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <span style="font-weight:800; color:#2563EB; font-size:1rem;">Câu hỏi ${activeExam.currentIndex + 1} / ${total}</span>
          ${q.isParalyzed ? '<span style="background:#FEF2F2; color:#DC2626; border:1px solid #FCA5A5; padding:3px 10px; border-radius:20px; font-size:0.75rem; font-weight:800;">⚠️ CÂU ĐIỂM LIỆT</span>' : ''}
        </div>
        <h3 style="font-size:1.15rem; color:#0F172A; line-height:1.5; margin-bottom:20px;">${q.question}</h3>
        
        <div style="display:flex; flex-direction:column; gap:10px;">
          ${q.options.map((opt, oIdx) => {
            const isChecked = activeExam.userAnswers[activeExam.currentIndex] === (oIdx + 1);
            return `
              <div onclick="selectExamAnswer(${oIdx + 1})" style="display:flex; align-items:center; gap:12px; padding:14px 16px; border:1.5px solid ${isChecked ? '#2563EB' : '#E2E8F0'}; background:${isChecked ? '#EFF6FF' : '#FFFFFF'}; border-radius:10px; cursor:pointer; transition:all 0.15s;">
                <input type="radio" name="modalExamAns" ${isChecked ? 'checked' : ''} style="width:18px; height:18px; cursor:pointer; accent-color:#2563EB;">
                <span style="font-size:0.95rem; color:#1E293B; font-weight:${isChecked ? '700' : '500'};">${opt}</span>
              </div>
            `;
          }).join('')}
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:24px; padding-top:16px; border-top:1px solid #F1F5F9;">
          <button type="button" onclick="goToExamQuestion(${activeExam.currentIndex - 1})" ${activeExam.currentIndex === 0 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''} class="btn btn-outline btn-sm">⬅ Câu trước</button>
          <button type="button" onclick="submitExamResult()" class="btn btn-accent btn-sm" style="background:#D97706; color:#FFF; font-weight:700;">🏁 Nộp bài sát hạch</button>
          <button type="button" onclick="goToExamQuestion(${activeExam.currentIndex + 1})" ${activeExam.currentIndex === total - 1 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''} class="btn btn-primary btn-sm">Câu tiếp ➡</button>
        </div>
      </div>
    `;
  }
}

function selectExamAnswer(ansNumber) {
  activeExam.userAnswers[activeExam.currentIndex] = ansNumber;
  renderExamUI();
}

function goToExamQuestion(idx) {
  if (idx >= 0 && idx < activeExam.questions.length) {
    activeExam.currentIndex = idx;
    renderExamUI();
  }
}

function submitExamResult() {
  if (activeExam.timerInterval) clearInterval(activeExam.timerInterval);
  activeExam.isSubmitted = true;

  let correctCount = 0;
  let failedParalyzed = false;

  activeExam.questions.forEach((q, idx) => {
    const userAns = activeExam.userAnswers[idx];
    if (userAns === q.answer) {
      correctCount++;
    } else if (q.isParalyzed) {
      failedParalyzed = true;
    }
  });

  const total = activeExam.questions.length;
  const passScore = (total === 25) ? 21 : Math.ceil(total * 0.84);
  const isPass = (correctCount >= passScore) && !failedParalyzed;

  const contentBox = document.getElementById('modalExamQuestionContent');
  if (contentBox) {
    contentBox.innerHTML = `
      <div style="background:#FFF; border:1px solid #E2E8F0; border-radius:14px; padding:32px; text-align:center; box-shadow:0 4px 16px rgba(0,0,0,0.06);">
        <div style="font-size:3.5rem; margin-bottom:12px;">${isPass ? '🎉' : '❌'}</div>
        <h2 style="font-size:1.8rem; font-weight:800; color:${isPass ? '#16A34A' : '#DC2626'}; margin-bottom:8px;">
          ${isPass ? 'CHÚC MỪNG BẠN ĐÃ ĐẠT!' : 'RẤT TIẾC, BẠN CHƯA ĐẠT!'}
        </h2>
        <p style="font-size:1.05rem; color:#475569; margin-bottom:16px;">
          Kết quả: <b>${correctCount} / ${total}</b> câu đúng (Yêu cầu đạt: ≥ ${passScore}/${total})
        </p>
        ${failedParalyzed ? '<div style="background:#FEF2F2; color:#DC2626; border:1px solid #FCA5A5; padding:10px 16px; border-radius:8px; display:inline-block; font-weight:700; margin-bottom:20px;">⚠️ Bạn đã trả lời sai câu điểm liệt nên bị trượt bài thi.</div>' : ''}
        
        <div style="display:flex; justify-content:center; gap:12px; margin-top:20px;">
          <button type="button" onclick="startExamSimulation('${activeExam.type}', 'random', '${activeExam.modeName}')" class="btn btn-primary" style="padding:10px 24px;">🔄 Thi đề ngẫu nhiên mới (25 câu)</button>
          <button type="button" onclick="closeExamLiveModal()" class="btn btn-outline" style="padding:10px 24px;">Đóng cửa sổ thi</button>
        </div>
      </div>
    `;
  }
}

// 6. Tính Năng Tra Cứu Câu Hỏi A1 Trực Tuyến
function renderQuestionLookup(filterChapter = 0, keyword = '') {
  const container = document.getElementById('drivingQuestionListContainer');
  if (!container) return;

  let list = DRIVING_DATA_2026.examA1Questions;
  if (filterChapter > 0) {
    list = list.filter(q => q.chapter === filterChapter);
  }
  if (keyword && keyword.trim() !== '') {
    const kw = keyword.toLowerCase().trim();
    list = list.filter(q => q.question.toLowerCase().includes(kw) || q.explain.toLowerCase().includes(kw));
  }

  if (list.length === 0) {
    container.innerHTML = '<div style="text-align:center; padding:30px; color:#64748B;">Không tìm thấy câu hỏi nào phù hợp với từ khóa.</div>';
    return;
  }

  container.innerHTML = list.map((q, idx) => `
    <div style="background:#FFF; border:1px solid #E2E8F0; border-radius:12px; padding:20px; margin-bottom:14px; box-shadow:0 1px 4px rgba(0,0,0,0.02);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-weight:800; color:#2563EB; font-size:0.92rem;">Câu ${q.id} (Chương ${q.chapter || 1})</span>
        ${q.isParalyzed ? '<span style="background:#FEF2F2; color:#DC2626; border:1px solid #FCA5A5; padding:2px 8px; border-radius:14px; font-size:0.72rem; font-weight:800;">⚠️ CÂU ĐIỂM LIỆT</span>' : ''}
      </div>
      <h4 style="font-size:1.02rem; color:#0F172A; line-height:1.5; margin-bottom:12px;">${q.question}</h4>
      <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:12px;">
        ${q.options.map((opt, oIdx) => `
          <div style="padding:8px 12px; border-radius:6px; font-size:0.88rem; background:${(oIdx + 1 === q.answer) ? '#ECFDF5' : '#F8FAFC'}; color:${(oIdx + 1 === q.answer) ? '#065F46' : '#334155'}; font-weight:${(oIdx + 1 === q.answer) ? '700' : '400'}; border:1px solid ${(oIdx + 1 === q.answer) ? '#A7F3D0' : 'transparent'};">
            ${(oIdx + 1 === q.answer) ? '✔ ' : ''}${opt}
          </div>
        `).join('')}
      </div>
      <div style="font-size:0.82rem; color:#475569; background:#F1F5F9; padding:8px 12px; border-radius:6px;">
        💡 <b>Giải thích:</b> ${q.explain}
      </div>
    </div>
  `).join('');
}

// 7. Tính Năng Xem 20 Câu Điểm Liệt A1
function renderParalyzedQuestions() {
  const container = document.getElementById('paralyzedQuestionsList');
  if (!container) return;

  const list = DRIVING_DATA_2026.examA1Questions.filter(q => q.isParalyzed);
  container.innerHTML = list.map((q, idx) => `
    <div style="background:#FFF; border:1.5px solid #FECACA; border-radius:12px; padding:20px; margin-bottom:14px; box-shadow:0 2px 6px rgba(220,38,38,0.04);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-weight:800; color:#DC2626; font-size:0.92rem;">Câu Điểm Liệt #${idx + 1} (Câu ${q.id})</span>
        <span style="background:#FEF2F2; color:#DC2626; padding:2px 8px; border-radius:14px; font-size:0.72rem; font-weight:800;">SAI LÀ RỚT</span>
      </div>
      <h4 style="font-size:1.02rem; color:#0F172A; line-height:1.5; margin-bottom:12px;">${q.question}</h4>
      <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:12px;">
        ${q.options.map((opt, oIdx) => `
          <div style="padding:8px 12px; border-radius:6px; font-size:0.88rem; background:${(oIdx + 1 === q.answer) ? '#ECFDF5' : '#F8FAFC'}; color:${(oIdx + 1 === q.answer) ? '#065F46' : '#334155'}; font-weight:${(oIdx + 1 === q.answer) ? '700' : '400'}; border:1px solid ${(oIdx + 1 === q.answer) ? '#A7F3D0' : 'transparent'};">
            ${(oIdx + 1 === q.answer) ? '✔ ' : ''}${opt}
          </div>
        `).join('')}
      </div>
      <div style="font-size:0.82rem; color:#991B1B; background:#FEF2F2; padding:8px 12px; border-radius:6px;">
        ⚠️ <b>Lưu ý quan trọng:</b> ${q.explain}
      </div>
    </div>
  `).join('');
}
'''

with open('driving-exam-engine.js', 'w', encoding='utf-8') as f:
    f.write(new_exam_engine_code)

print('Overwritten driving-exam-engine.js with full 25-question random exam generator!')
