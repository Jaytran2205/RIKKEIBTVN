import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

with open('driving-exam-engine.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update generateA1ExamQuestions
new_generate_func = """function generateA1ExamQuestions(mode = 'random') {
  const all = DRIVING_DATA_2026.examA1Questions || [];
  
  if (mode === 'paralyzed') {
    // Thẻ 1: 20 Câu Điểm Liệt
    return all.filter(q => q.isParalyzed);
  }
  if (mode === 'chapter1') {
    // Thẻ 4: Thi Khái Niệm & Quy Tắc (100 câu)
    return all.filter(q => q.chapter === 1);
  }
  if (mode === 'chapter2') {
    // Thẻ 5: Thi Văn Hoá Giao Thông (10 câu)
    return all.filter(q => q.chapter === 2);
  }
  if (mode === 'chapter3') {
    // Thẻ 6: Thi Kỹ Thuật Lái Xe (15 câu)
    return all.filter(q => q.chapter === 3);
  }
  if (mode === 'chapter4') {
    // Thẻ 7: Thi Biển Báo (90 câu)
    return all.filter(q => q.chapter === 4);
  }
  if (mode === 'chapter5') {
    // Thẻ 8: Thi Sa Hình (35 câu)
    return all.filter(q => q.chapter === 5);
  }
  if (mode === 'full') {
    // Thẻ 10: Thi Toàn Bộ 250 Câu
    return [...all];
  }
  if (mode === 'wrong') {
    // Thẻ 3: Thi Các Câu Sai trong lịch sử
    const wrongIds = getStoredWrongQuestions();
    if (wrongIds.length === 0) return [];
    return all.filter(q => wrongIds.includes(q.id));
  }

  // Thẻ 2 (Bộ Đề Ngẫu Nhiên 25 câu) & Thẻ 9 (Thi Tốc Độ 25 câu):
  // CẤU TRÚC ĐỀ SÁT HẠCH A1 CHUẨN BỘ CÔNG AN (ĐÚNG 25 CÂU)
  // - 01 câu điểm liệt
  // - 08 câu khái niệm & quy tắc (Chương 1)
  // - 01 câu văn hóa giao thông (Chương 2)
  // - 01 câu kỹ thuật lái xe (Chương 3)
  // - 08 câu hệ thống biển báo (Chương 4)
  // - 06 câu giải thế sa hình (Chương 5)
  // Tổng cộng: 1 + 8 + 1 + 1 + 8 + 6 = 25 câu
  const paralyzedList = all.filter(q => q.isParalyzed);
  const chapter1List = all.filter(q => q.chapter === 1 && !q.isParalyzed);
  const chapter2List = all.filter(q => q.chapter === 2 && !q.isParalyzed);
  const chapter3List = all.filter(q => q.chapter === 3 && !q.isParalyzed);
  const chapter4List = all.filter(q => q.chapter === 4 && !q.isParalyzed);
  const chapter5List = all.filter(q => q.chapter === 5 && !q.isParalyzed);

  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

  const selected = [
    ...shuffle(paralyzedList).slice(0, 1),
    ...shuffle(chapter1List).slice(0, 8),
    ...shuffle(chapter2List).slice(0, 1),
    ...shuffle(chapter3List).slice(0, 1),
    ...shuffle(chapter4List).slice(0, 8),
    ...shuffle(chapter5List).slice(0, 6)
  ];

  if (selected.length < 25) {
    const remaining = all.filter(q => !selected.some(s => s.id === q.id));
    selected.push(...shuffle(remaining).slice(0, 25 - selected.length));
  }

  return selected.slice(0, 25);
}"""

# Replace generateA1ExamQuestions
code = re.sub(r'function generateA1ExamQuestions[\s\S]*?\n\}\n', new_generate_func + '\n\n', code)

# 2. Update startExamSimulation to handle time limits properly
new_start_func = """function startExamSimulation(rank = 'A1', mode = 'random', title = 'Đề Thi Thử Sát Hạch A1 (25 Câu)') {
  activeExam.type = rank;
  activeExam.modeName = title;
  
  if (rank === 'A1') {
    if (mode === 'wrong') {
      const wrongList = generateA1ExamQuestions('wrong');
      if (wrongList.length === 0) {
        showToast('Bạn chưa có câu nào làm sai trong lịch sử làm bài! Hãy bắt đầu thi một đề ngẫu nhiên trước.');
        return;
      }
      activeExam.questions = wrongList;
      activeExam.timeLeft = Math.max(5, Math.ceil(wrongList.length * 0.8)) * 60;
    } else if (mode === 'full') {
      activeExam.questions = generateA1ExamQuestions('full');
      activeExam.timeLeft = 70 * 60; // 70 phút cho 250 câu
    } else if (mode === 'speed') {
      activeExam.questions = generateA1ExamQuestions('speed');
      activeExam.timeLeft = 5 * 60; // 5 phút thi tốc độ
    } else if (mode === 'paralyzed') {
      activeExam.questions = generateA1ExamQuestions('paralyzed');
      activeExam.timeLeft = 15 * 60; // 15 phút cho 20 câu liệt
    } else if (mode === 'chapter1') {
      activeExam.questions = generateA1ExamQuestions('chapter1');
      activeExam.timeLeft = 35 * 60; // 35 phút cho 100 câu
    } else if (mode === 'chapter4') {
      activeExam.questions = generateA1ExamQuestions('chapter4');
      activeExam.timeLeft = 30 * 60; // 30 phút cho 90 câu biển báo
    } else if (mode === 'chapter5') {
      activeExam.questions = generateA1ExamQuestions('chapter5');
      activeExam.timeLeft = 15 * 60; // 15 phút cho 35 câu sa hình
    } else if (mode === 'chapter2' || mode === 'chapter3') {
      activeExam.questions = generateA1ExamQuestions(mode);
      activeExam.timeLeft = 10 * 60;
    } else {
      activeExam.questions = generateA1ExamQuestions('random');
      activeExam.timeLeft = 19 * 60; // 19 phút chuẩn Bộ Công An
    }
  } else {
    activeExam.questions = generateA1ExamQuestions(mode);
    activeExam.timeLeft = 19 * 60;
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

  openExamLiveModal();
}"""

code = re.sub(r'function startExamSimulation[\s\S]*?\n\}\n\nfunction openExamLiveModal', new_start_func + '\n\nfunction openExamLiveModal', code)

# 3. Update renderExamUI to display images
new_render_exam_ui = """function renderExamUI() {
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
          <span style="font-weight:800; color:#2563EB; font-size:1rem;">Câu hỏi ${activeExam.currentIndex + 1} / ${total} (Mã câu: #${q.id})</span>
          ${q.isParalyzed ? '<span style="background:#FEF2F2; color:#DC2626; border:1px solid #FCA5A5; padding:3px 10px; border-radius:20px; font-size:0.75rem; font-weight:800;">⚠️ CÂU ĐIỂM LIỆT</span>' : ''}
        </div>
        <h3 style="font-size:1.15rem; color:#0F172A; line-height:1.5; margin-bottom:16px;">${q.question}</h3>
        
        ${q.image ? `<div style="text-align:center; margin-bottom:18px; background:#F8FAFC; padding:12px; border-radius:10px; border:1px solid #E2E8F0;"><img src="${q.image}" alt="Hình minh họa câu ${q.id}" style="max-width:100%; max-height:280px; object-fit:contain; border-radius:8px; box-shadow:0 1px 4px rgba(0,0,0,0.05);"></div>` : ''}

        <div style="display:flex; flex-direction:column; gap:10px;">
          ${q.options.map((opt, oIdx) => {
            const isChecked = activeExam.userAnswers[activeExam.currentIndex] === (oIdx + 1);
            return `
              <div onclick="selectExamAnswer(${oIdx + 1})" style="display:flex; align-items:center; gap:12px; padding:14px 16px; border:1.5px solid ${isChecked ? '#2563EB' : '#E2E8F0'}; background:${isChecked ? '#EFF6FF' : '#FFFFFF'}; border-radius:10px; cursor:pointer; transition:all 0.15s;">
                <input type="radio" name="modalExamAns" ${isChecked ? 'checked' : ''} style="width:18px; height:18px; cursor:pointer; accent-color:#2563EB;">
                <span style="font-size:0.96rem; color:${isChecked ? '#1E40AF' : '#1E293B'}; font-weight:${isChecked ? '600' : '400'}; line-height:1.4;">${opt}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }
}"""

code = re.sub(r'function renderExamUI\(\)[\s\S]*?\n\}\n\nfunction goToExamQuestion', new_render_exam_ui + '\n\nfunction goToExamQuestion', code)

# 4. Update submitExamResult to store wrong questions
new_submit_func = """function submitExamResult() {
  if (activeExam.timerInterval) clearInterval(activeExam.timerInterval);
  activeExam.isSubmitted = true;

  let correctCount = 0;
  let failedParalyzed = false;
  const currentWrongIds = [];

  activeExam.questions.forEach((q, idx) => {
    const userAns = activeExam.userAnswers[idx];
    if (userAns === q.answer) {
      correctCount++;
    } else {
      currentWrongIds.push(q.id);
      if (q.isParalyzed) {
        failedParalyzed = true;
      }
    }
  });

  // Lưu câu sai vào localStorage
  if (currentWrongIds.length > 0) {
    saveWrongQuestions(currentWrongIds);
  }

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
        ${failedParalyzed ? '<div style="background:#FEF2F2; color:#DC2626; border:1px solid #FCA5A5; padding:10px 16px; border-radius:8px; display:inline-block; font-weight:700; margin-bottom:16px;">⚠️ Bạn đã làm sai câu điểm liệt nên bài thi không đạt.</div>' : ''}

        <div style="margin:20px 0; text-align:left; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:16px;">
          <h4 style="font-size:1rem; font-weight:800; margin-bottom:10px; color:#0F172A;">Chi tiết kết quả từng câu:</h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(65px, 1fr)); gap:8px;">
            ${activeExam.questions.map((q, idx) => {
              const u = activeExam.userAnswers[idx];
              const ok = (u === q.answer);
              return `
                <div onclick="previewQuestionDetail(${idx})" style="padding:6px; text-align:center; border-radius:6px; font-weight:700; font-size:0.8rem; cursor:pointer; background:${ok ? '#DCFCE7' : '#FEE2E2'}; color:${ok ? '#15803D' : '#B91C1C'};">
                  #${idx + 1} ${ok ? '✓' : '✗'}
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div style="display:flex; justify-content:center; gap:12px; margin-top:24px;">
          <button type="button" onclick="startExamSimulation(activeExam.type, activeExam.mode, activeExam.modeName)" style="background:#2563EB; color:#FFF; border:none; padding:10px 24px; border-radius:8px; font-weight:700; cursor:pointer;">
            🔄 Thi Lại Đề Này
          </button>
          <button type="button" onclick="closeExamLiveModal()" style="background:#E2E8F0; color:#334155; border:none; padding:10px 24px; border-radius:8px; font-weight:700; cursor:pointer;">
            Đóng
          </button>
        </div>
      </div>
    `;
  }
  
  // Cập nhật lại huy hiệu Card 3
  updateWrongQuestionsBadge();
}"""

code = re.sub(r'function submitExamResult\(\)[\s\S]*?\n\}\n\nfunction selectExamAnswer', new_submit_func + '\n\nfunction selectExamAnswer', code)

# 5. Update renderQuestionLookup to render image as well
new_lookup_func = """function renderQuestionLookup(filterChapter = 0, keyword = '', onlyWrong = false) {
  const container = document.getElementById('drivingQuestionListContainer');
  if (!container) return;

  let list = DRIVING_DATA_2026.examA1Questions || [];

  if (onlyWrong) {
    const wrongIds = getStoredWrongQuestions();
    list = list.filter(q => wrongIds.includes(q.id));
    if (list.length === 0) {
      container.innerHTML = '<div style="text-align:center; padding:40px; color:#64748B; font-size:1rem;">🎉 Tuyệt vời! Bạn chưa có câu nào làm sai trong danh sách ôn tập.</div>';
      return;
    }
  } else if (filterChapter > 0) {
    list = list.filter(q => q.chapter === filterChapter);
  }

  if (keyword && keyword.trim() !== '') {
    const kw = keyword.toLowerCase().trim();
    list = list.filter(q => q.question.toLowerCase().includes(kw) || (q.explain && q.explain.toLowerCase().includes(kw)));
  }

  if (list.length === 0) {
    container.innerHTML = '<div style="text-align:center; padding:30px; color:#64748B;">Không tìm thấy câu hỏi nào phù hợp.</div>';
    return;
  }

  container.innerHTML = list.map((q, idx) => `
    <div style="background:#FFF; border:1px solid #E2E8F0; border-radius:12px; padding:20px; margin-bottom:14px; box-shadow:0 1px 4px rgba(0,0,0,0.02);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-weight:800; color:#2563EB; font-size:0.92rem;">Câu ${q.id} (Chương ${q.chapter || 1})</span>
        ${q.isParalyzed ? '<span style="background:#FEF2F2; color:#DC2626; border:1px solid #FCA5A5; padding:2px 8px; border-radius:14px; font-size:0.72rem; font-weight:800;">⚠️ CÂU ĐIỂM LIỆT</span>' : ''}
      </div>
      <h4 style="font-size:1.02rem; color:#0F172A; line-height:1.5; margin-bottom:12px;">${q.question}</h4>
      
      ${q.image ? `<div style="margin-bottom:14px; background:#F8FAFC; padding:10px; border-radius:8px; text-align:center; border:1px solid #E2E8F0;"><img src="${q.image}" alt="Hình câu ${q.id}" style="max-width:100%; max-height:240px; object-fit:contain; border-radius:6px;"></div>` : ''}

      <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:12px;">
        ${q.options.map((opt, oIdx) => {
          const isCorrect = (oIdx + 1) === q.answer;
          return `
            <div style="padding:8px 12px; border-radius:6px; font-size:0.9rem; background:${isCorrect ? '#DCFCE7' : '#F8FAFC'}; color:${isCorrect ? '#15803D' : '#334155'}; font-weight:${isCorrect ? '700' : '400'}; border:1px solid ${isCorrect ? '#86EFAC' : '#E2E8F0'};">
              ${isCorrect ? '✓ ' : ''}${opt}
            </div>
          `;
        }).join('')}
      </div>
      ${q.explain ? `<div style="font-size:0.85rem; color:#475569; background:#EFF6FF; padding:8px 12px; border-radius:6px; border-left:3px solid #2563EB;"><b>💡 Giải thích:</b> ${q.explain}</div>` : ''}
    </div>
  `).join('');
}"""

code = re.sub(r'function renderQuestionLookup\(filterChapter = 0, keyword = \'\'\)[\s\S]*?\n\}\n\nfunction setupQuestionLookupSearch', new_lookup_func + '\n\nfunction setupQuestionLookupSearch', code)

# 6. Add Helper functions for Wrong Questions (localStorage)
wrong_helpers = """
// =========================================================================
// QUẢN LÝ CÂU SAI (LOCALSTORAGE) & HUY HIỆU THẺ 3
// =========================================================================
function getStoredWrongQuestions() {
  try {
    const raw = localStorage.getItem('ninhbinh_driving_wrong_questions');
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function saveWrongQuestions(newWrongIds) {
  try {
    const existing = new Set(getStoredWrongQuestions());
    newWrongIds.forEach(id => existing.add(id));
    localStorage.setItem('ninhbinh_driving_wrong_questions', JSON.stringify([...existing]));
  } catch (e) {
    console.warn('Lỗi lưu câu sai:', e);
  }
}

function clearWrongQuestions() {
  localStorage.removeItem('ninhbinh_driving_wrong_questions');
  updateWrongQuestionsBadge();
  showToast('Đã xóa toàn bộ lịch sử câu sai!');
}

function updateWrongQuestionsBadge() {
  const wrongIds = getStoredWrongQuestions();
  const count = wrongIds.length;
  
  // Cập nhật tất cả badge số lượng câu sai trên trang
  document.querySelectorAll('.wrong-questions-count-badge').forEach(el => {
    el.textContent = `(${count} câu)`;
  });
  
  const elById = document.getElementById('cardWrongQuestionsCount');
  if (elById) {
    elById.textContent = `(${count} câu)`;
  }
}

function studyWrongQuestions() {
  const wrongIds = getStoredWrongQuestions();
  if (wrongIds.length === 0) {
    showToast('Bạn chưa có câu nào làm sai trong lịch sử làm bài! Hãy làm bài thi trước.');
    return;
  }
  switchDrivingTab('tracuu600', document.querySelector('[data-tab=tracuu600]'));
  renderQuestionLookup(0, '', true);
}

// Tự động khởi chạy cập nhật badge khi DOM sẵn sàng
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    updateWrongQuestionsBadge();
  });
  setTimeout(updateWrongQuestionsBadge, 500);
}
"""

if 'getStoredWrongQuestions' not in code:
    code += '\n' + wrong_helpers

with open('driving-exam-engine.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("driving-exam-engine.js logic successfully updated!")
