import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('student-grading-engine.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Add analyzeImageIsExamPaper function right before preprocessImage
validator_code = '''
  // ========================================================
  // BỘ PHÂN TÍCH & XÁC THỰC ẢNH BÀI LÀM (CHỐNG UP ẢNH BỪA)
  // ========================================================

  /**
   * Phân tích canvas xem có phải là trang giấy thi / phiếu làm bài hay không.
   * Chặn tuyệt đối ảnh phong cảnh, người, ngoại cảnh, đồ vật ngẫu nhiên.
   */
  function analyzeImageIsExamPaper(canvas) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    if (!w || !h) return { isValid: false, reason: 'Ảnh không hợp lệ hoặc kích thước trống.' };

    // Lấy mẫu điểm ảnh (tối đa 10,000 điểm ảnh phân bố đều trên canvas)
    const stepX = Math.max(1, Math.floor(w / 100));
    const stepY = Math.max(1, Math.floor(h / 100));
    const imgData = ctx.getImageData(0, 0, w, h);
    const d = imgData.data;

    let totalSampled = 0;
    let paperLikePixels = 0;       // Nền giấy trắng/kem/sáng, ít bão hòa màu
    let highSaturationPixels = 0;   // Màu sắc rực rỡ (cây cối, bầu trời, quần áo, người, xe cộ)
    let totalSaturation = 0;
    let inkLikePixels = 0;         // Nét chữ, mực bút bi, chì, chữ in

    for (let y = 0; y < h; y += stepY) {
      for (let x = 0; x < w; x += stepX) {
        const idx = (y * w + x) * 4;
        const r = d[idx];
        const g = d[idx + 1];
        const b = d[idx + 2];

        totalSampled++;

        // Tính Luminance & Saturation theo HSL
        const max = Math.max(r, g, b) / 255.0;
        const min = Math.min(r, g, b) / 255.0;
        const l = (max + min) / 2.0;
        let s = 0.0;
        if (max !== min) {
          s = l > 0.5 ? (max - min) / (2.0 - max - min) : (max - min) / (max + min);
        }
        totalSaturation += s;

        // Điểm ảnh có màu sắc rực rỡ (quần áo đỏ, cây xanh, tượng đồng, nền trời...)
        if (s > 0.32 && l > 0.15 && l < 0.88) {
          highSaturationPixels++;
        }

        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        // Điểm ảnh nền giấy: Độ sáng cao (>135) và độ bão hòa màu thấp (<0.25)
        if (gray > 135 && s < 0.25) {
          paperLikePixels++;
        } else if (gray < 85) {
          // Nét mực bút bi, bút chì hoặc chữ in
          inkLikePixels++;
        }
      }
    }

    const avgSat = totalSaturation / totalSampled;
    const paperRatio = paperLikePixels / totalSampled;
    const highSatRatio = highSaturationPixels / totalSampled;
    const inkRatio = inkLikePixels / totalSampled;

    console.log(`[Image Validator] Sampled: ${totalSampled}, PaperRatio: ${(paperRatio*100).toFixed(1)}%, HighSat: ${(highSatRatio*100).toFixed(1)}%, AvgSat: ${(avgSat*100).toFixed(1)}%, InkRatio: ${(inkRatio*100).toFixed(1)}%`);

    // Tiêu chuẩn giấy thi chuẩn:
    // 1. Nếu có quá nhiều màu sắc phong cảnh/quần áo/ngoại cảnh (highSatRatio > 18% hoặc avgSat > 25%)
    if (highSatRatio > 0.18 || avgSat > 0.25) {
      return {
        isValid: false,
        reason: `Ảnh chứa nhiều màu sắc thực cảnh/phong cảnh (Độ bão hòa màu ${(avgSat*100).toFixed(0)}%, tỷ lệ màu rực ${(highSatRatio*100).toFixed(0)}%), không phải trang giấy thi hay phiếu làm bài!`
      };
    }

    // 2. Nếu tỷ lệ nền giấy quá thấp (< 32%) -> ảnh quá tối, cảnh sinh hoạt hoặc đồ vật
    if (paperRatio < 0.32) {
      return {
        isValid: false,
        reason: `Không phát hiện nền giấy thi/vở viết (Tỷ lệ mặt giấy chỉ đạt ${(paperRatio*100).toFixed(0)}%). Vui lòng chụp rõ mặt phẳng trang giấy bài làm!`
      };
    }

    // 3. Nếu là giấy trắng trơn hoàn toàn không có chữ hay vết mực (< 0.3%)
    if (inkRatio < 0.003) {
      return {
        isValid: false,
        reason: `Trang giấy hoàn toàn trắng trơn, không phát hiện vết mực viết tay hoặc ô tô trắc nghiệm!`
      };
    }

    return { isValid: true, paperRatio, avgSat, inkRatio };
  }
'''

marker_preprocess = '  function preprocessImage(canvas, options = {}) {'
if marker_preprocess in text and 'function analyzeImageIsExamPaper' not in text:
    text = text.replace(marker_preprocess, validator_code + '\n' + marker_preprocess)
    print("1. Added analyzeImageIsExamPaper before preprocessImage.")
else:
    print("WARNING: marker_preprocess not found or already added.")

# 2. Update gradeStudentSubmission signature and add validation check
old_grade_func = "async function gradeStudentSubmission(exam, student, imageBase64, customNotes = '') {"
new_grade_func = """async function gradeStudentSubmission(exam, student, imageBase64, customNotes = '', canvas = null) {
    const result = {
      id: 'SUB-' + Date.now().toString().slice(-6),
      examId: exam.id,
      examTitle: exam.title,
      studentCode: student.code || 'HS-VANG',
      studentName: student.name || 'Học sinh',
      studentClass: student.class || 'Lớp 12',
      subject: exam.subject || 'khac',
      submittedAt: new Date().toLocaleString('vi-VN'),
      photoUrl: imageBase64,
      usedPredefinedKey: false,
      score: 0,
      maxScore: exam.totalPoints || 10,
      percentage: 0,
      passed: false,
      gradeLevel: 'Đang chấm',
      feedback: '',
      inferredKey: '',
      details: [],
      rubricScores: [],
      grammarCorrections: [],
      isInvalidPhoto: false,
      rejectionReason: ''
    };

    // KIỂM TRA TÍNH HỢP LỆ CỦA ẢNH BÀI LÀM (CHỐNG UP ẢNH BỪA)
    if (canvas) {
      const validation = analyzeImageIsExamPaper(canvas);
      if (!validation.isValid) {
        result.score = 0;
        result.maxScore = exam.totalPoints || 10;
        result.percentage = 0;
        result.passed = false;
        result.gradeLevel = 'Không Hợp Lệ (0 Điểm)';
        result.isInvalidPhoto = true;
        result.rejectionReason = validation.reason;
        result.feedback = `❌ TỪ CHỐI CHẤM ĐIỂM (0 ĐIỂM) — ẢNH KHÔNG PHẢI BÀI THI:\\n• ${validation.reason}\\n\\n👉 Yêu cầu: Hệ thống chỉ chấm điểm khi bạn chụp trang giấy thi, vở viết tay hoặc phiếu trả lời trắc nghiệm. Vui lòng căn chỉnh lại Camera hoặc chọn ảnh chụp rõ nét bài làm của mình rồi gửi lại nhé!`;
        saveSubmission(result);
        return result;
      }
    }"""

if old_grade_func in text:
    text = text.replace(old_grade_func, new_grade_func)
    print("2. Updated gradeStudentSubmission with image validation check.")
else:
    print("WARNING: old_grade_func not found!")

# 3. Update submitStudentGrading to pass canvas
old_submit_call = "const subResult = await gradeStudentSubmission(exam, student, b64);"
new_submit_call = "const subResult = await gradeStudentSubmission(exam, student, b64, '', canvas);"
if old_submit_call in text:
    text = text.replace(old_submit_call, new_submit_call)
    print("3. Updated submitStudentGrading call to pass canvas.")
else:
    print("WARNING: old_submit_call not found!")

# 4. Update onStudentExamChange to display FULL EXAM PAPER
old_exam_change = """  function onStudentExamChange() {
    const select = document.getElementById('studentExamSelect');
    if (!select) return;
    const examId = select.value;
    const exams = getExams();
    const exam = exams.find(e => e.id === examId);
    const infoBox = document.getElementById('studentExamInfoBox');
    if (infoBox && exam) {
      infoBox.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px;">
          <div>
            <span class="badge-tag" style="background:#EFF6FF; color:#1D4ED8; font-size:0.75rem; margin-bottom:4px;">
              ${exam.subjectName} • ${exam.grade} • Thang điểm ${exam.totalPoints}
            </span>
            <div style="font-weight:700; font-size:1.05rem; color:var(--primary-dark);">${exam.title}</div>
            <div style="font-size:0.86rem; color:var(--muted); margin-top:4px;">${exam.description}</div>
          </div>
          <span style="font-size:0.8rem; font-weight:700; padding:4px 10px; border-radius:20px; background:${exam.hasPredefinedKey ? '#DCFCE7; color:#15803d;' : '#FEF3C7; color:#B45309;'}">
            ${exam.hasPredefinedKey ? '✔ Đã có đáp án chuẩn' : '🤖 Đề mở (Free AI tự giải & tạo barem)'}
          </span>
        </div>
      `;
    }
  }"""

new_exam_change = """  function onStudentExamChange() {
    const select = document.getElementById('studentExamSelect');
    if (!select) return;
    const examId = select.value;
    const exams = getExams();
    const exam = exams.find(e => e.id === examId);
    const infoBox = document.getElementById('studentExamInfoBox');
    if (infoBox && exam) {
      infoBox.innerHTML = `
        <!-- Card Đề Bài Thi Chính Thức -->
        <div style="background:#FFFFFF; border:2px solid #0F3D6E; border-radius:14px; padding:26px; box-shadow:0 6px 20px rgba(15,61,110,0.09); margin-bottom:10px;">
          
          <!-- Header Đề Thi -->
          <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:2px solid #0F3D6E; padding-bottom:16px; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
            <div>
              <div style="font-weight:800; color:#0F3D6E; font-size:0.82rem; text-transform:uppercase; letter-spacing:0.05em; display:flex; align-items:center; gap:6px;">
                <span>🏛️</span> SỞ GD&ĐT NINH BÌNH — HỆ THỐNG KHẢO THÍ SỐ 2026
              </div>
              <h3 style="font-size:1.4rem; color:#0F172A; margin:6px 0 4px; font-family:'Plus Jakarta Sans', sans-serif;">
                📖 ${exam.title}
              </h3>
              <div style="display:flex; gap:12px; flex-wrap:wrap; font-size:0.86rem; color:#475569; margin-top:4px;">
                <span>Môn: <b style="color:#0F3D6E;">${exam.subjectName}</b></span>
                <span>• Khối: <b>${exam.grade}</b></span>
                <span>• Thời gian: <b style="color:#D97706;">${exam.duration || '45 phút'}</b></span>
                <span>• Thang điểm: <b>${exam.totalPoints}</b></span>
              </div>
            </div>

            <div style="display:flex; gap:8px; align-items:center;">
              <span style="font-size:0.8rem; font-weight:700; padding:5px 12px; border-radius:20px; background:${exam.hasPredefinedKey ? '#DCFCE7; color:#15803d; border:1px solid #BBF7D0;' : '#FEF3C7; color:#B45309; border:1px solid #FDE68A;'}">
                ${exam.hasPredefinedKey ? '✔ Đã có đáp án & barem chuẩn' : '🤖 Đề mở (Free AI tự giải & tạo barem)'}
              </span>
              <button class="btn btn-outline btn-sm" onclick="StudentGradingEngine.copyExamPaperText('${exam.id}')" title="Sao chép đề thi">📋 Sao Chép Đề</button>
              <button class="btn btn-outline btn-sm" onclick="StudentGradingEngine.printExamPaper('${exam.id}')" title="In đề thi">🖨️ In Đề</button>
            </div>
          </div>

          <!-- Nội Dung Chi Tiết Đề Bài -->
          <div class="exam-paper-full-content" style="font-size:0.95rem; line-height:1.75; color:#1E293B;">
            ${exam.fullContentHtml || `<p>${exam.description}</p>`}
          </div>

          <!-- Hướng dẫn nộp bài -->
          <div style="background:#FEF3C7; border-left:4px solid #D97706; border-radius:0 8px 8px 0; padding:12px 18px; margin-top:24px; font-size:0.88rem; color:#92400E; display:flex; align-items:center; gap:12px;">
            <div style="font-size:1.6rem; flex-shrink:0;">✍️</div>
            <div>
              <b>Hướng dẫn học sinh làm bài:</b> Em hãy đọc kỹ đề thi ở trên, làm bài tự luận hoặc phiếu trả lời trắc nghiệm ra <b>giấy thi / vở</b>. Sau khi làm xong, hãy dùng <b>Camera bên dưới chụp ảnh bài làm</b> hoặc tải ảnh bài thi lên để hệ thống chấm điểm tự động.
            </div>
          </div>

        </div>
      `;
    }
  }"""

if old_exam_change in text:
    text = text.replace(old_exam_change, new_exam_change)
    print("4. Updated onStudentExamChange with full exam paper rendering.")
else:
    print("WARNING: old_exam_change not found!")

# 5. Update renderGradingResult to handle invalid photo rejection
old_render_res = """  function renderGradingResult(sub) {
    const resBox = document.getElementById('gradingResultCard');
    if (!resBox) return;
    resBox.style.display = 'block';

    document.getElementById('resScoreBadge').textContent = sub.score + ' / ' + sub.maxScore;
    document.getElementById('resGradeLevel').textContent = 'Xếp loại: ' + sub.gradeLevel;
    document.getElementById('resFeedback').textContent = sub.feedback;
    document.getElementById('resSourceTag').textContent = sub.usedPredefinedKey ? '✔ Chấm theo Đáp án chuẩn có sẵn' : '🤖 Free AI tự động giải & tạo barem';"""

new_render_res = """  function renderGradingResult(sub) {
    const resBox = document.getElementById('gradingResultCard');
    if (!resBox) return;
    resBox.style.display = 'block';

    const scoreBadge = document.getElementById('resScoreBadge');
    const gradeLevel = document.getElementById('resGradeLevel');
    const feedback = document.getElementById('resFeedback');
    const sourceTag = document.getElementById('resSourceTag');

    // NẾU ẢNH BỊ TỪ CHỐI (ẢNH PHONG CẢNH, NGƯỜI, KHÔNG PHẢI BÀI THI)
    if (sub.isInvalidPhoto) {
      resBox.style.borderColor = '#DC2626';
      resBox.style.background = '#FEF2F2';
      scoreBadge.style.color = '#DC2626';
      scoreBadge.textContent = '0 / ' + sub.maxScore;
      gradeLevel.style.color = '#B91C1C';
      gradeLevel.textContent = '❌ KHÔNG HỢP LỆ (0 ĐIỂM)';
      sourceTag.innerHTML = '<span style="color:#DC2626; font-weight:800;">❌ TỪ CHỐI CHẤM: PHÁT HIỆN ẢNH KHÔNG PHẢI BÀI THI</span>';
      feedback.innerHTML = `
        <div style="color:#991B1B; line-height:1.65; font-size:0.95rem;">
          <b style="font-size:1.05rem;">🚫 Hệ thống từ chối chấm điểm:</b><br>
          ${sub.feedback.replace(/\\n/g, '<br>')}
        </div>
      `;
      // Ẩn các bảng chi tiết vì ảnh không phải bài thi
      const mcqBox = document.getElementById('resMcqDetailsBox');
      const rubricBox = document.getElementById('resRubricDetailsBox');
      const grammarBox = document.getElementById('resGrammarBox');
      if (mcqBox) mcqBox.style.display = 'none';
      if (rubricBox) rubricBox.style.display = 'none';
      if (grammarBox) grammarBox.style.display = 'none';
      resBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return;
    }

    // NẾU ẢNH BÀI THI HỢP LỆ
    resBox.style.borderColor = '#16A34A';
    resBox.style.background = '#fff';
    scoreBadge.style.color = '#16A34A';
    scoreBadge.textContent = sub.score + ' / ' + sub.maxScore;
    gradeLevel.style.color = '#15803d';
    gradeLevel.textContent = 'Xếp loại: ' + sub.gradeLevel;
    feedback.textContent = sub.feedback;
    sourceTag.textContent = sub.usedPredefinedKey ? '✔ Chấm theo Đáp án chuẩn có sẵn' : '🤖 Free AI tự động giải & tạo barem';"""

if old_render_res in text:
    text = text.replace(old_render_res, new_render_res)
    print("5. Updated renderGradingResult with rejection UI handling.")
else:
    print("WARNING: old_render_res not found!")

# 6. Add copyExamPaperText and printExamPaper functions
new_exam_paper_helpers = '''
  function copyExamPaperText(examId) {
    const exams = getExams();
    const exam = exams.find(e => e.id === examId);
    if (!exam) return;
    const div = document.createElement('div');
    div.innerHTML = exam.fullContentHtml || exam.description;
    const plainText = `📖 ĐỀ THI: ${exam.title}\\nMôn: ${exam.subjectName} • Khối: ${exam.grade} • Thời gian: ${exam.duration}\\n\\n` + div.innerText;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(plainText).then(() => {
        if (typeof showToast === 'function') showToast('Đã sao chép toàn bộ nội dung đề thi vào bộ nhớ tạm!');
      });
    }
  }

  function printExamPaper(examId) {
    const exams = getExams();
    const exam = exams.find(e => e.id === examId);
    if (!exam) return;
    const w = window.open('', '_blank', 'width=800,height=900');
    if (!w) return;
    w.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Đề Thi: ${exam.title}</title>
        <style>
          body { font-family: 'Times New Roman', serif; padding: 40px; color: #000; line-height: 1.6; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 25px; }
          .title { text-align: center; margin: 20px 0; font-size: 20px; font-weight: bold; text-transform: uppercase; }
          .content { font-size: 15px; }
          @media print { .no-print { display: none; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div><b>SỞ GIÁO DỤC VÀ ĐÀO TẠO NINH BÌNH</b><br>HỆ THỐNG KHẢO THÍ SỐ 2026</div>
          <div style="text-align:right;"><b>ĐỀ KIỂM TRA CHÍNH THỨC</b><br>Thời gian làm bài: ${exam.duration || '45 phút'}</div>
        </div>
        <div class="title">${exam.title}</div>
        <div class="content">${exam.fullContentHtml || exam.description}</div>
        <div style="text-align:center; margin-top:40px;" class="no-print">
          <button onclick="window.print()" style="padding:10px 24px; font-size:16px; font-weight:bold; cursor:pointer;">🖨️ Bấm Để In Đề Thi</button>
        </div>
      </body>
      </html>
    `);
    w.document.close();
  }
'''

marker_export = '  global.StudentGradingEngine = {'
if marker_export in text and 'function copyExamPaperText' not in text:
    text = text.replace(marker_export, new_exam_paper_helpers + '\n' + marker_export)
    print("6. Added copyExamPaperText & printExamPaper helpers.")

# Add to exports
if 'copyExamPaperText,' not in text:
    text = text.replace('closeImportStudentsModal,', 'closeImportStudentsModal,\n    copyExamPaperText,\n    printExamPaper,')
    print("7. Added new helpers to StudentGradingEngine export.")

with open('student-grading-engine.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Saved student-grading-engine.js successfully! Total length:", len(text))
