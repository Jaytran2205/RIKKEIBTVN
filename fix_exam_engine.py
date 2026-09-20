import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

with open('driving-exam-engine.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Improved renderExamUI
new_render_exam_ui = """function renderExamUI() {
  const q = activeExam.questions[activeExam.currentIndex];
  if (!q) return;

  const total = activeExam.questions.length;
  const titleEl = document.getElementById('modalExamTitle');
  if (titleEl) titleEl.textContent = activeExam.modeName;

  // Render question number palette on the left
  const numBox = document.getElementById('modalExamQuestionNumbers');
  if (numBox) {
    numBox.innerHTML = activeExam.questions.map((item, idx) => {
      const isAns = (activeExam.userAnswers[idx] !== undefined);
      const isCur = (idx === activeExam.currentIndex);
      let bg = '#FFFFFF';
      let color = '#334155';
      let border = '#CBD5E1';

      if (isAns) {
        bg = '#ECFDF5';
        color = '#059669';
        border = '#10B981';
      }
      if (isCur) {
        bg = isAns ? '#D1FAE5' : '#EFF6FF';
        color = '#2563EB';
        border = '#2563EB';
      }

      return `
        <button type="button" onclick="goToExamQuestion(${idx})" style="width:36px; height:36px; border-radius:8px; font-weight:700; font-size:0.85rem; cursor:pointer; border:1.5px solid ${border}; background:${bg}; color:${color}; ${isCur ? 'box-shadow:0 0 0 2px rgba(37,99,235,0.3);' : ''}">
          ${idx + 1}
        </button>
      `;
    }).join('');
  }

  // Render main question area
  const contentBox = document.getElementById('modalExamQuestionContent');
  if (contentBox) {
    const currentAnswer = activeExam.userAnswers[activeExam.currentIndex];

    contentBox.innerHTML = `
      <div style="background:#FFF; border:1px solid #E2E8F0; border-radius:14px; padding:24px; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <span style="font-weight:800; color:#2563EB; font-size:1rem;">Câu hỏi ${activeExam.currentIndex + 1} / ${total} (Mã câu: #${q.id})</span>
          ${q.isParalyzed ? '<span style="background:#FEF2F2; color:#DC2626; border:1px solid #FCA5A5; padding:3px 10px; border-radius:20px; font-size:0.75rem; font-weight:800;">⚠️ CÂU ĐIỂM LIỆT</span>' : ''}
        </div>
        <h3 style="font-size:1.15rem; color:#0F172A; line-height:1.5; margin-bottom:16px;">${q.question}</h3>
        
        ${q.image ? `<div style="text-align:center; margin-bottom:18px; background:#F8FAFC; padding:12px; border-radius:10px; border:1px solid #E2E8F0;"><img src="${q.image}" alt="Hình minh họa câu ${q.id}" style="max-width:100%; max-height:280px; object-fit:contain; border-radius:8px; box-shadow:0 1px 4px rgba(0,0,0,0.05);"></div>` : ''}

        <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:24px;">
          ${q.options.map((opt, oIdx) => {
            const ansNum = oIdx + 1;
            const isChecked = (currentAnswer === ansNum);
            return `
              <div onclick="selectExamAnswer(${ansNum})" style="display:flex; align-items:center; gap:14px; padding:14px 18px; border:2px solid ${isChecked ? '#2563EB' : '#E2E8F0'}; background:${isChecked ? '#EFF6FF' : '#FFFFFF'}; border-radius:10px; cursor:pointer; transition:all 0.15s; user-select:none;">
                <input type="radio" name="modalExamAns_${activeExam.currentIndex}" ${isChecked ? 'checked' : ''} style="width:20px; height:20px; cursor:pointer; accent-color:#2563EB;" onchange="selectExamAnswer(${ansNum})">
                <span style="font-size:0.98rem; color:${isChecked ? '#1E40AF' : '#1E293B'}; font-weight:${isChecked ? '700' : '500'}; line-height:1.45;">${opt}</span>
              </div>
            `;
          }).join('')}
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; padding-top:18px; border-top:1px solid #F1F5F9;">
          <button type="button" onclick="goToExamQuestion(${activeExam.currentIndex - 1})" ${activeExam.currentIndex === 0 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''} style="background:#F1F5F9; color:#334155; border:1px solid #CBD5E1; padding:10px 18px; border-radius:8px; font-weight:700; font-size:0.88rem; cursor:pointer;">
            ⬅ Câu trước
          </button>
          
          <button type="button" onclick="confirmSubmitExam()" style="background:#D97706; color:#FFF; border:none; padding:10px 22px; border-radius:8px; font-weight:800; font-size:0.9rem; cursor:pointer; display:flex; align-items:center; gap:6px;">
            🏁 Nộp bài sát hạch
          </button>
          
          <button type="button" onclick="goToExamQuestion(${activeExam.currentIndex + 1})" ${activeExam.currentIndex === total - 1 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''} style="background:#2563EB; color:#FFF; border:none; padding:10px 18px; border-radius:8px; font-weight:700; font-size:0.88rem; cursor:pointer;">
            Câu tiếp ➡
          </button>
        </div>
      </div>
    `;
  }
}

function selectExamAnswer(ansNumber) {
  if (activeExam.isSubmitted) return;
  activeExam.userAnswers[activeExam.currentIndex] = ansNumber;
  renderExamUI();
}

function goToExamQuestion(idx) {
  if (idx >= 0 && idx < activeExam.questions.length) {
    activeExam.currentIndex = idx;
    renderExamUI();
  }
}

function confirmSubmitExam() {
  const total = activeExam.questions.length;
  const answered = Object.keys(activeExam.userAnswers).length;
  if (answered < total) {
    const remain = total - answered;
    if (confirm(`Bạn còn ${remain} câu chưa trả lời. Bạn có chắc chắn muốn nộp bài sát hạch không?`)) {
      submitExamResult();
    }
  } else {
    submitExamResult();
  }
}"""

# 2. Improved submitExamResult with previewQuestionDetail
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
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h4 style="font-size:1rem; font-weight:800; color:#0F172A; margin:0;">Bảng chi tiết từng câu (Bấm vào câu để xem đáp án & giải thích):</h4>
            <span style="font-size:0.8rem; color:#64748B;">Màu xanh: Đúng • Màu đỏ: Sai</span>
          </div>
          
          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(70px, 1fr)); gap:8px; margin-bottom:14px;">
            ${activeExam.questions.map((q, idx) => {
              const u = activeExam.userAnswers[idx];
              const ok = (u === q.answer);
              return `
                <button type="button" onclick="previewQuestionDetail(${idx})" style="padding:8px 4px; text-align:center; border-radius:8px; font-weight:800; font-size:0.82rem; cursor:pointer; border:1.5px solid ${ok ? '#86EFAC' : '#FCA5A5'}; background:${ok ? '#DCFCE7' : '#FEE2E2'}; color:${ok ? '#15803D' : '#B91C1C'};">
                  #${idx + 1} ${ok ? '✓' : '✗'}
                </button>
              `;
            }).join('')}
          </div>

          <div id="examReviewDetailContainer" style="display:none; margin-top:16px; padding-top:16px; border-top:1px dashed #CBD5E1;"></div>
        </div>

        <div style="display:flex; justify-content:center; gap:12px; margin-top:24px;">
          <button type="button" onclick="startExamSimulation(activeExam.type, activeExam.mode, activeExam.modeName)" style="background:#2563EB; color:#FFF; border:none; padding:12px 28px; border-radius:8px; font-weight:700; cursor:pointer;">
            🔄 Thi Lại Đề Này
          </button>
          <button type="button" onclick="closeExamLiveModal()" style="background:#E2E8F0; color:#334155; border:none; padding:12px 24px; border-radius:8px; font-weight:700; cursor:pointer;">
            Đóng phòng thi
          </button>
        </div>
      </div>
    `;
  }
  
  updateWrongQuestionsBadge();
}

function previewQuestionDetail(idx) {
  const q = activeExam.questions[idx];
  if (!q) return;

  const userAns = activeExam.userAnswers[idx];
  const isOk = (userAns === q.answer);
  const container = document.getElementById('examReviewDetailContainer');
  if (!container) return;

  container.style.display = 'block';
  container.innerHTML = `
    <div style="background:#FFFFFF; border:1.5px solid ${isOk ? '#86EFAC' : '#FCA5A5'}; border-radius:10px; padding:18px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <span style="font-weight:800; color:#2563EB; font-size:0.95rem;">Chi tiết Câu #${idx + 1} (Mã câu: #${q.id})</span>
        <span style="font-weight:800; padding:3px 10px; border-radius:20px; font-size:0.75rem; background:${isOk ? '#DCFCE7' : '#FEE2E2'}; color:${isOk ? '#15803D' : '#DC2626'};">
          ${isOk ? '✓ Bạn làm ĐÚNG' : '✗ Bạn làm SAI'}
        </span>
      </div>

      <h4 style="font-size:1.02rem; color:#0F172A; line-height:1.5; margin-bottom:12px;">${q.question}</h4>

      ${q.image ? `<div style="text-align:center; margin-bottom:14px; background:#F8FAFC; padding:10px; border-radius:8px; border:1px solid #E2E8F0;"><img src="${q.image}" alt="Hình câu ${q.id}" style="max-width:100%; max-height:220px; object-fit:contain; border-radius:6px;"></div>` : ''}

      <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:12px;">
        ${q.options.map((opt, oIdx) => {
          const ansNum = oIdx + 1;
          const isCorrect = (ansNum === q.answer);
          const isUserChoice = (ansNum === userAns);
          let bg = '#F8FAFC';
          let border = '#E2E8F0';
          let color = '#334155';
          let badge = '';

          if (isCorrect) {
            bg = '#DCFCE7';
            border = '#86EFAC';
            color = '#15803D';
            badge = '<span style="font-weight:800; color:#15803D; margin-left:8px;">✔ [ĐÁP ÁN ĐÚNG]</span>';
          }
          if (isUserChoice && !isCorrect) {
            bg = '#FEE2E2';
            border = '#FCA5A5';
            color = '#DC2626';
            badge = '<span style="font-weight:800; color:#DC2626; margin-left:8px;">✖ [BẠN ĐÃ CHỌN Ý NÀY]</span>';
          } else if (isUserChoice && isCorrect) {
            badge = '<span style="font-weight:800; color:#15803D; margin-left:8px;">✔ [LỰA CHỌN CHÍNH XÁC CỦA BẠN]</span>';
          }

          return `
            <div style="padding:10px 14px; border-radius:8px; font-size:0.92rem; border:1.5px solid ${border}; background:${bg}; color:${color}; font-weight:${(isCorrect || isUserChoice) ? '700' : '400'};">
              ${opt} ${badge}
            </div>
          `;
        }).join('')}
      </div>

      ${q.explain ? `<div style="font-size:0.86rem; color:#1E40AF; background:#EFF6FF; padding:10px 14px; border-radius:8px; border-left:3px solid #2563EB;"><b>💡 Giải thích chi tiết:</b> ${q.explain}</div>` : ''}
    </div>
  `;
}"""

# Replace renderExamUI and submitExamResult
pattern_render = r'function renderExamUI\(\)[\s\S]*?(?=function submitExamResult)'
code = re.sub(pattern_render, new_render_exam_ui + '\n\n', code)

pattern_submit = r'function submitExamResult\(\)[\s\S]*?(?=function renderQuestionLookup)'
code = re.sub(pattern_submit, new_submit_func + '\n\n', code)

with open('driving-exam-engine.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated driving-exam-engine.js with selectExamAnswer and previewQuestionDetail!")
