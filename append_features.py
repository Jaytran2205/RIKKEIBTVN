with open('driving-exam-engine.js', 'r', encoding='utf-8') as f:
    content = f.read()

extra_funcs = """

// 5. Tính Năng Tra Cứu Câu Hỏi A1 Trực Tuyến
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

// 6. Tính Năng Xem 20 Câu Điểm Liệt A1
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
"""

with open('driving-exam-engine.js', 'a', encoding='utf-8') as f:
    f.write(extra_funcs)

print('Appended functions successfully!')
