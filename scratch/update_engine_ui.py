import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('student-grading-engine.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Check where the end of the file is
marker = '  // ========================================================\n  // 10. EXPORT TO GLOBAL SCOPE\n  // ========================================================'
if marker not in code:
    print('Marker not found!')
    sys.exit(1)

ui_controller_code = '''
  // ========================================================
  // 10. UI CONTROLLER & DOM BINDINGS
  // ========================================================

  let currentCameraStream = null;
  let currentFacingMode = 'environment';
  let isContrastEnabled = false;
  let hasImageLoaded = false;
  let currentActiveSubmission = null;

  /**
   * Khởi tạo Trang Chấm Điểm
   */
  function initGradingPage(params = null) {
    if (!params) {
      const raw = window.location.hash.replace('#', '');
      const [_, query] = raw.split('?');
      params = new URLSearchParams(query || '');
    }

    const examId = params.get('exam');
    const studentCode = params.get('student');
    const studentName = params.get('name');
    const tabParam = params.get('tab');

    // Cập nhật danh sách đề thi vào select
    populateExamSelects();

    // Nếu mở qua đường link cá nhân có thông tin học sinh -> Ưu tiên chuyển sang Cổng Học Sinh
    if (examId || studentCode || tabParam === 'student') {
      switchGradingTab('student');
      if (examId) {
        const examSelect = document.getElementById('studentExamSelect');
        if (examSelect) examSelect.value = examId;
        onStudentExamChange();
      }
      if (studentCode || studentName) {
        const nameInput = document.getElementById('studentNameInput');
        const codeInput = document.getElementById('studentCodeInput');
        if (nameInput && studentName) nameInput.value = decodeURIComponent(studentName);
        if (codeInput && studentCode) codeInput.value = decodeURIComponent(studentCode);
        
        // Hiển thị banner chào học sinh cá nhân hóa
        const banner = document.getElementById('studentPersonalBanner');
        if (banner) {
          banner.style.display = 'block';
          banner.innerHTML = `
            <div style="display:flex; align-items:center; gap:12px;">
              <div style="font-size:1.8rem;">👋</div>
              <div>
                <div style="font-weight:800; color:var(--primary); font-size:1.05rem;">Chào em: ${decodeURIComponent(studentName || studentCode)}</div>
                <div style="font-size:0.84rem; color:var(--muted);">Đường link nộp bài cá nhân đã được kích hoạt. Hãy chụp hoặc tải ảnh bài làm để bắt đầu chấm điểm.</div>
              </div>
            </div>
          `;
        }
      }
    } else {
      switchGradingTab('teacher');
    }

    // Render dữ liệu giáo viên
    renderTeacherDashboard();
    loadAiConfigForm();
  }

  function switchGradingTab(tab) {
    document.querySelectorAll('.grading-tab-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.grading-tab-btn').forEach(btn => {
      btn.classList.remove('active');
      btn.style.background = '#fff';
      btn.style.color = 'var(--ink)';
      btn.style.borderColor = 'var(--border)';
    });

    const targetTab = document.getElementById('gradingTab_' + tab);
    const targetBtn = document.getElementById('gradingTabBtn_' + tab);
    if (targetTab) targetTab.style.display = 'block';
    if (targetBtn) {
      targetBtn.classList.add('active');
      targetBtn.style.background = 'var(--primary)';
      targetBtn.style.color = '#fff';
      targetBtn.style.borderColor = 'var(--primary)';
    }

    if (tab === 'teacher') {
      renderTeacherDashboard();
    }
  }

  function populateExamSelects() {
    const exams = getExams();
    const select = document.getElementById('studentExamSelect');
    if (select) {
      select.innerHTML = exams.map(e => `
        <option value="${e.id}">${e.title} (${e.subjectName} - ${e.hasPredefinedKey ? 'Có đáp án sẵn' : 'AI tự sinh đáp án'})</option>
      `).join('');
      onStudentExamChange();
    }
  }

  function onStudentExamChange() {
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
  }

  /**
   * Render dữ liệu cho Dashboard Giáo Viên
   */
  function renderTeacherDashboard() {
    const exams = getExams();
    const students = getStudents();
    const subs = getSubmissions();

    // 1. Cập nhật Stats
    const elExams = document.getElementById('statTotalExams');
    const elStudents = document.getElementById('statTotalStudents');
    const elSubs = document.getElementById('statTotalSubs');
    const elAvg = document.getElementById('statAvgScore');

    if (elExams) elExams.textContent = exams.length;
    if (elStudents) elStudents.textContent = students.length;
    if (elSubs) elSubs.textContent = subs.length;
    if (elAvg) {
      if (subs.length === 0) {
        elAvg.textContent = '0.0';
      } else {
        const sum = subs.reduce((acc, s) => acc + (parseFloat(s.score) || 0), 0);
        elAvg.textContent = (sum / subs.length).toFixed(1) + '/10';
      }
    }

    // 2. Render Grid Đề Thi
    const examsGrid = document.getElementById('teacherExamsGrid');
    if (examsGrid) {
      examsGrid.innerHTML = exams.map(e => `
        <div style="background:#fff; border:1px solid var(--border); border-radius:10px; padding:18px; display:flex; flex-direction:column; gap:10px; box-shadow:var(--shadow-sm);">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="badge-tag" style="background:#EFF6FF; color:#1D4ED8; font-size:0.72rem; margin:0;">${e.subjectName}</span>
            <span style="font-size:0.75rem; font-weight:700; padding:2px 8px; border-radius:12px; background:${e.hasPredefinedKey ? '#DCFCE7; color:#15803d;' : '#FEF3C7; color:#B45309;'}">
              ${e.hasPredefinedKey ? 'Có đáp án sẵn' : 'AI tự sinh đáp án'}
            </span>
          </div>
          <div style="font-weight:700; font-size:1rem; color:var(--primary-dark); line-height:1.35;">${e.title}</div>
          <div style="font-size:0.84rem; color:var(--muted); line-height:1.45; flex:1;">${e.description}</div>
          <div style="display:flex; gap:6px; margin-top:8px;">
            <button class="btn btn-outline btn-sm" style="flex:1; font-size:0.78rem;" onclick="StudentGradingEngine.copyGeneralExamLink('${e.id}')">📋 Copy Link Nộp</button>
            <button class="btn btn-primary btn-sm" style="font-size:0.78rem;" onclick="StudentGradingEngine.openExamStudentLink('${e.id}')">🚀 Nộp Thử</button>
          </div>
        </div>
      `).join('');
    }

    // 3. Render Danh Sách Học Sinh & Sinh Link Cá Nhân
    const studentsTable = document.getElementById('teacherStudentsTableBody');
    if (studentsTable) {
      const selectedExam = exams[0] ? exams[0].id : 'EXAM-VAN-01';
      studentsTable.innerHTML = students.map((s, idx) => {
        const pLink = generateStudentLink(selectedExam, s.code, s.name);
        return `
          <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:12px; font-weight:700; color:var(--primary);">${s.code}</td>
            <td style="padding:12px; font-weight:600;">${s.name}</td>
            <td style="padding:12px;"><span style="background:#F1F5F9; padding:3px 8px; border-radius:4px; font-size:0.82rem;">${s.class}</span></td>
            <td style="padding:12px; font-size:0.82rem; color:var(--muted);">${s.phone || 'Chưa cập nhật'}</td>
            <td style="padding:12px;">
              <div style="display:flex; gap:6px; flex-wrap:wrap;">
                <button class="btn btn-outline btn-sm" style="padding:4px 10px; font-size:0.78rem;" onclick="StudentGradingEngine.copyStudentPersonalLink('${selectedExam}', '${s.code}', '${encodeURIComponent(s.name)}')">📋 Copy Link Zalo</button>
                <button class="btn btn-outline btn-sm" style="padding:4px 10px; font-size:0.78rem;" onclick="StudentGradingEngine.openStudentQrModal('${pLink}', '${s.name} (${s.code})')">📱 Xem QR</button>
                <button class="btn btn-primary btn-sm" style="padding:4px 10px; font-size:0.78rem;" onclick="window.location.hash = 'cham-bai?exam=${selectedExam}&student=${s.code}&name=${encodeURIComponent(s.name)}'">🚀 Vào Nộp</button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }

    // 4. Render Sổ Điểm Lớp Học
    const subsTable = document.getElementById('teacherScorebookTableBody');
    if (subsTable) {
      if (subs.length === 0) {
        subsTable.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:30px; color:var(--muted);">Chưa có bài nộp nào. Học sinh gửi bài qua link sẽ xuất hiện ngay tại đây!</td></tr>`;
      } else {
        subsTable.innerHTML = subs.map(s => `
          <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:12px; font-weight:600; color:var(--muted); font-size:0.82rem;">${s.id}</td>
            <td style="padding:12px; font-weight:700;">${s.studentName} <span style="font-weight:400; font-size:0.82rem; color:var(--muted);">(${s.studentCode})</span></td>
            <td style="padding:12px;"><span style="background:#F1F5F9; padding:2px 8px; border-radius:4px; font-size:0.82rem;">${s.studentClass}</span></td>
            <td style="padding:12px; font-size:0.88rem; max-width:220px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${s.examTitle}</td>
            <td style="padding:12px; font-weight:800; font-size:1.1rem; color:${s.score >= 8 ? '#15803d' : (s.score >= 5 ? '#0F3D6E' : '#dc2626')};">
              ${s.score} <span style="font-size:0.8rem; font-weight:400; color:var(--muted);">/${s.maxScore}</span>
            </td>
            <td style="padding:12px;">
              <span style="font-size:0.78rem; font-weight:700; padding:3px 8px; border-radius:12px; background:${s.score >= 8 ? '#DCFCE7; color:#15803d;' : (s.score >= 5 ? '#EFF6FF; color:#1D4ED8;' : '#FEE2E2; color:#b91c1c;')}">
                ${s.gradeLevel}
              </span>
            </td>
            <td style="padding:12px; font-size:0.78rem; color:var(--muted);">${s.submittedAt}</td>
            <td style="padding:12px;">
              <div style="display:flex; gap:6px;">
                <button class="btn btn-outline btn-sm" style="padding:4px 8px; font-size:0.76rem;" onclick='StudentGradingEngine.copySubmissionToClipboard(${JSON.stringify(s).replace(/'/g, "&#39;")})' title="Sao chép kết quả gửi Zalo">📋 Copy</button>
                <button class="btn btn-outline btn-sm" style="padding:4px 8px; font-size:0.76rem;" onclick='StudentGradingEngine.printScoreSheet(${JSON.stringify(s).replace(/'/g, "&#39;")})' title="In phiếu báo điểm">📄 In</button>
              </div>
            </td>
          </tr>
        `).join('');
      }
    }
  }

  // ========================================================
  // 11. XỬ LÝ CAMERA & TẢI ẢNH CHO HỌC SINH
  // ========================================================

  async function startStudentCamera() {
    const video = document.getElementById('gradingCameraVideo');
    const container = document.getElementById('cameraStreamContainer');
    if (!video || !container) return;

    try {
      if (currentCameraStream) {
        currentCameraStream.getTracks().forEach(t => t.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: currentFacingMode },
        audio: false
      });

      currentCameraStream = stream;
      video.srcObject = stream;
      video.play();
      container.style.display = 'block';
      document.getElementById('btnStartCamera').style.display = 'none';
      document.getElementById('btnStopCamera').style.display = 'inline-flex';
      document.getElementById('btnCaptureCamera').style.display = 'inline-flex';
      document.getElementById('btnSwitchCamera').style.display = 'inline-flex';
      if (typeof showToast === 'function') showToast('Đã mở Camera! Căn chỉnh bài làm vào khung để chụp.');
    } catch (err) {
      console.error('Camera error:', err);
      alert('Không thể mở Camera. Vui lòng cho phép quyền truy cập Camera trong trình duyệt hoặc sử dụng nút "Tải ảnh từ máy" bên dưới.');
    }
  }

  function stopStudentCamera() {
    if (currentCameraStream) {
      currentCameraStream.getTracks().forEach(t => t.stop());
      currentCameraStream = null;
    }
    const container = document.getElementById('cameraStreamContainer');
    if (container) container.style.display = 'none';
    const btnStart = document.getElementById('btnStartCamera');
    const btnStop = document.getElementById('btnStopCamera');
    const btnCap = document.getElementById('btnCaptureCamera');
    const btnSwitch = document.getElementById('btnSwitchCamera');
    if (btnStart) btnStart.style.display = 'inline-flex';
    if (btnStop) btnStop.style.display = 'none';
    if (btnCap) btnCap.style.display = 'none';
    if (btnSwitch) btnSwitch.style.display = 'none';
  }

  function switchStudentCamera() {
    currentFacingMode = (currentFacingMode === 'environment') ? 'user' : 'environment';
    startStudentCamera();
  }

  function captureStudentCamera() {
    const video = document.getElementById('gradingCameraVideo');
    const canvas = document.getElementById('gradingImageCanvas');
    if (!video || !canvas) return;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    hasImageLoaded = true;
    showImagePreviewControls();
    stopStudentCamera();
    if (typeof showToast === 'function') showToast('Đã chụp ảnh bài làm! Bạn có thể xoay hoặc tăng tương phản trước khi nộp.');
  }

  function handleStudentFileUpload(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.getElementById('gradingImageCanvas');
        if (!canvas) return;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        hasImageLoaded = true;
        showImagePreviewControls();
        if (typeof showToast === 'function') showToast('Đã tải ảnh bài thi lên canvas thành công!');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function showImagePreviewControls() {
    const box = document.getElementById('imagePreviewControls');
    if (box) box.style.display = 'flex';
    const canvas = document.getElementById('gradingImageCanvas');
    if (canvas) canvas.style.display = 'block';
    const placeholder = document.getElementById('imageEmptyPlaceholder');
    if (placeholder) placeholder.style.display = 'none';
  }

  function rotateStudentImage() {
    const canvas = document.getElementById('gradingImageCanvas');
    if (!canvas || !hasImageLoaded) return;
    rotateCanvas(canvas, 90);
    if (typeof showToast === 'function') showToast('Đã xoay ảnh 90°');
  }

  function toggleStudentContrast() {
    const canvas = document.getElementById('gradingImageCanvas');
    if (!canvas || !hasImageLoaded) return;
    isContrastEnabled = !isContrastEnabled;
    preprocessImage(canvas, { highContrast: isContrastEnabled });
    if (typeof showToast === 'function') {
      showToast(isContrastEnabled ? 'Đã bật bộ lọc tương phản đen trắng' : 'Đã tắt bộ lọc');
    }
  }

  function clearStudentImage() {
    const canvas = document.getElementById('gradingImageCanvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.display = 'none';
    }
    hasImageLoaded = false;
    const box = document.getElementById('imagePreviewControls');
    if (box) box.style.display = 'none';
    const placeholder = document.getElementById('imageEmptyPlaceholder');
    if (placeholder) placeholder.style.display = 'block';
  }

  // ========================================================
  // 12. HÀNH ĐỘNG GỬI BÀI & CHẤM ĐIỂM TỰ ĐỘNG
  // ========================================================

  async function submitStudentGrading() {
    const canvas = document.getElementById('gradingImageCanvas');
    if (!hasImageLoaded || !canvas) {
      alert('Vui lòng chụp ảnh bài làm bằng Camera hoặc tải ảnh bài thi lên trước khi bấm gửi bài!');
      return;
    }

    const examSelect = document.getElementById('studentExamSelect');
    const nameInput = document.getElementById('studentNameInput');
    const codeInput = document.getElementById('studentCodeInput');

    const examId = examSelect ? examSelect.value : 'EXAM-VAN-01';
    const studentName = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : 'Học sinh';
    const studentCode = (codeInput && codeInput.value.trim()) ? codeInput.value.trim() : 'HS-' + Math.floor(100 + Math.random() * 900);

    const exams = getExams();
    const exam = exams.find(e => e.id === examId) || exams[0];

    // Bật hiệu ứng loading chấm điểm
    const progressBox = document.getElementById('gradingProcessingBox');
    const submitBtn = document.getElementById('btnSubmitGrading');
    if (progressBox) progressBox.style.display = 'block';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '⏳ Đang quét &amp; chấm bài tự động...';
    }

    // Cập nhật trạng thái tiến trình
    const statusText = document.getElementById('gradingStatusText');
    if (statusText) statusText.textContent = 'Bước 1/3: Đang quét hình ảnh & nhận diện nội dung...';

    await new Promise(r => setTimeout(r, 600));
    if (statusText) {
      statusText.textContent = exam.hasPredefinedKey
        ? 'Bước 2/3: Đang đối chiếu với Đáp án chuẩn & Barem có sẵn...'
        : 'Bước 2/3: Đề mở — Đang gọi Free AI API để phân tích đề và tự sinh đáp án chuẩn...';
    }

    await new Promise(r => setTimeout(r, 800));
    if (statusText) statusText.textContent = 'Bước 3/3: Đang tổng hợp điểm số & tạo nhận xét sư phạm...';

    try {
      const b64 = canvas.toDataURL('image/jpeg', 0.85);
      const student = { code: studentCode, name: studentName, class: '12A1' };
      
      const subResult = await gradeStudentSubmission(exam, student, b64);
      currentActiveSubmission = subResult;

      // Ẩn loading
      if (progressBox) progressBox.style.display = 'none';
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '🚀 GỬI BÀI &amp; CHẤM ĐIỂM TỰ ĐỘNG NGAY';
      }

      // Hiển thị kết quả
      renderGradingResult(subResult);
      if (typeof showToast === 'function') showToast('Chấm bài hoàn tất! Đã có kết quả ngay bên dưới.');
    } catch (err) {
      console.error('Grading error:', err);
      if (progressBox) progressBox.style.display = 'none';
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '🚀 GỬI BÀI &amp; CHẤM ĐIỂM TỰ ĐỘNG NGAY';
      }
      alert('Đã có lỗi trong quá trình chấm bài: ' + err.message);
    }
  }

  /**
   * Render khung kết quả chấm bài
   */
  function renderGradingResult(sub) {
    const resBox = document.getElementById('gradingResultCard');
    if (!resBox) return;
    resBox.style.display = 'block';

    document.getElementById('resScoreBadge').textContent = sub.score + ' / ' + sub.maxScore;
    document.getElementById('resGradeLevel').textContent = 'Xếp loại: ' + sub.gradeLevel;
    document.getElementById('resFeedback').textContent = sub.feedback;
    document.getElementById('resSourceTag').textContent = sub.usedPredefinedKey ? '✔ Chấm theo Đáp án chuẩn có sẵn' : '🤖 Free AI tự động giải & tạo barem';

    // Bảng chi tiết trắc nghiệm (nếu có)
    const mcqBox = document.getElementById('resMcqDetailsBox');
    if (mcqBox) {
      if (sub.details && sub.details.length > 0) {
        mcqBox.style.display = 'block';
        mcqBox.innerHTML = `
          <div style="font-weight:700; margin-bottom:10px; color:var(--primary-dark);">Chi tiết từng câu trắc nghiệm:</div>
          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); gap:8px;">
            ${sub.details.map(d => `
              <div style="background:${d.isRight ? '#F0FDF4; border:1px solid #BBF7D0;' : '#FEF2F2; border:1px solid #FECACA;'} padding:8px 12px; border-radius:6px; font-size:0.84rem;">
                <b>Câu ${d.q}:</b> Bạn chọn <b style="color:${d.isRight ? '#16A34A' : '#DC2626'}">${d.student}</b> • Đáp án: <b>${d.correct}</b> ${d.isRight ? '✅' : '❌'}
              </div>
            `).join('')}
          </div>
        `;
      } else {
        mcqBox.style.display = 'none';
      }
    }

    // Bảng tiêu chí tự luận (nếu có)
    const rubricBox = document.getElementById('resRubricDetailsBox');
    if (rubricBox) {
      if (sub.rubricScores && sub.rubricScores.length > 0) {
        rubricBox.style.display = 'block';
        rubricBox.innerHTML = `
          <div style="font-weight:700; margin-bottom:10px; color:var(--primary-dark);">Đánh giá theo Barem Tiêu Chí:</div>
          <div style="display:flex; flex-direction:column; gap:8px;">
            ${sub.rubricScores.map(r => `
              <div style="background:#F8FAFC; border:1px solid var(--border); border-radius:6px; padding:10px 14px; display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <div style="font-weight:600; font-size:0.9rem;">${r.criterion}</div>
                  <div style="font-size:0.82rem; color:var(--muted);">${r.comment || 'Đạt yêu cầu.'}</div>
                </div>
                <div style="font-weight:800; color:var(--primary); font-size:1.05rem; white-space:nowrap; margin-left:12px;">
                  ${r.score} / ${r.max} đ
                </div>
              </div>
            `).join('')}
          </div>
        `;
      } else {
        rubricBox.style.display = 'none';
      }
    }

    // Bảng sửa lỗi ngữ pháp Tiếng Anh (nếu có)
    const grammarBox = document.getElementById('resGrammarBox');
    if (grammarBox) {
      if (sub.grammarCorrections && sub.grammarCorrections.length > 0) {
        grammarBox.style.display = 'block';
        grammarBox.innerHTML = `
          <div style="font-weight:700; margin-bottom:10px; color:#B45309;">Lỗi ngữ pháp cần sửa (AI Detection):</div>
          ${sub.grammarCorrections.map(g => `
            <div style="background:#FFFBEB; border:1px solid #FDE68A; border-radius:6px; padding:8px 12px; margin-bottom:6px; font-size:0.85rem;">
              <span style="color:#DC2626; text-decoration:line-through;">${g.original}</span> ➔ <b style="color:#16A34A;">${g.corrected}</b>
              <div style="font-size:0.78rem; color:#64748B; margin-top:2px;">💡 ${g.note}</div>
            </div>
          `).join('')}
        `;
      } else {
        grammarBox.style.display = 'none';
      }
    }

    // Cuộn mượt xuống phần kết quả
    resBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ========================================================
  // 13. CÁC HÀM TIỆN ÍCH CHO NÚT BẤM (COPY, MODAL, EXPORT)
  // ========================================================

  function copyCurrentResultZalo() {
    if (currentActiveSubmission) {
      copySubmissionToClipboard(currentActiveSubmission);
    } else {
      alert('Chưa có kết quả bài nộp!');
    }
  }

  function printCurrentResult() {
    if (currentActiveSubmission) {
      printScoreSheet(currentActiveSubmission);
    } else {
      alert('Chưa có kết quả bài nộp!');
    }
  }

  function copyGeneralExamLink(examId) {
    const origin = window.location.origin + window.location.pathname;
    const link = `${origin}#cham-bai?exam=${examId}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link).then(() => {
        if (typeof showToast === 'function') showToast('Đã sao chép link nộp bài chung của đề thi!');
      });
    }
  }

  function openExamStudentLink(examId) {
    window.location.hash = `cham-bai?exam=${examId}`;
  }

  function copyStudentPersonalLink(examId, studentCode, studentName) {
    const link = generateStudentLink(examId, studentCode, decodeURIComponent(studentName));
    const msg = `Xin chào ${decodeURIComponent(studentName)}, đây là đường link nộp bài cá nhân của em: ${link}\nHãy bấm vào link, chụp ảnh bài làm và gửi để hệ thống chấm điểm tự động nhé!`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(msg).then(() => {
        if (typeof showToast === 'function') showToast(`Đã sao chép tin nhắn Zalo kèm link cho ${decodeURIComponent(studentName)}!`);
      });
    }
  }

  function openStudentQrModal(link, title) {
    const modal = document.getElementById('gradingQrModal');
    if (!modal) return;
    document.getElementById('gradingQrTitle').textContent = 'Mã QR Nộp Bài: ' + title;
    document.getElementById('gradingQrLinkText').value = link;
    renderQrCode('gradingQrContainer', link, 180);
    modal.style.display = 'flex';
  }

  function closeStudentQrModal() {
    const modal = document.getElementById('gradingQrModal');
    if (modal) modal.style.display = 'none';
  }

  // ========================================================
  // 14. MODAL NẠP DANH SÁCH HỌC SINH & NẠP ĐÁP ÁN
  // ========================================================

  function openImportStudentsModal() {
    const modal = document.getElementById('gradingImportModal');
    if (modal) modal.style.display = 'flex';
  }

  function closeImportStudentsModal() {
    const modal = document.getElementById('gradingImportModal');
    if (modal) modal.style.display = 'none';
  }

  function submitImportStudents() {
    const ta = document.getElementById('importStudentsTextarea');
    if (!ta || !ta.value.trim()) {
      alert('Vui lòng dán danh sách học sinh vào ô!');
      return;
    }
    const res = importStudentsFromText(ta.value);
    closeImportStudentsModal();
    renderTeacherDashboard();
    if (typeof showToast === 'function') {
      showToast(`Đã nạp thành công ${res.count} học sinh! Tổng số: ${res.total} em.`);
    }
  }

  // ========================================================
  // 15. QUẢN LÝ CẤU HÌNH FREE AI FORM
  // ========================================================

  function loadAiConfigForm() {
    const cfg = getAiConfig();
    const provSelect = document.getElementById('aiProviderSelect');
    const geminiInput = document.getElementById('aiGeminiKeyInput');
    const openrouterInput = document.getElementById('aiOpenRouterKeyInput');
    const groqInput = document.getElementById('aiGroqKeyInput');

    if (provSelect) provSelect.value = cfg.provider;
    if (geminiInput) geminiInput.value = cfg.geminiKey || '';
    if (openrouterInput) openrouterInput.value = cfg.openrouterKey || '';
    if (groqInput) groqInput.value = cfg.groqKey || '';
  }

  function saveAiConfigFromForm() {
    const provSelect = document.getElementById('aiProviderSelect');
    const geminiInput = document.getElementById('aiGeminiKeyInput');
    const openrouterInput = document.getElementById('aiOpenRouterKeyInput');
    const groqInput = document.getElementById('aiGroqKeyInput');

    const cfg = {
      provider: provSelect ? provSelect.value : 'gemini',
      geminiKey: geminiInput ? geminiInput.value.trim() : '',
      openrouterKey: openrouterInput ? openrouterInput.value.trim() : '',
      groqKey: groqInput ? groqInput.value.trim() : '',
      useProxyFallback: true
    };

    saveAiConfig(cfg);
    if (typeof showToast === 'function') showToast('Đã lưu cài đặt Free AI API thành công!');
  }

  async function testAiApiConnection() {
    const btn = document.getElementById('btnTestAiApi');
    if (btn) btn.innerHTML = '⏳ Đang kiểm tra kết nối...';
    
    try {
      const res = await callFreeAiApi('Xin chào, hãy trả lời ngắn gọn 1 câu chào học sinh Ninh Bình!');
      alert(`Kết nối AI thành công!\\n\\nNhà cung cấp: ${res.provider}\\nPhản hồi: "${res.text.slice(0, 150)}..."`);
    } catch (e) {
      alert('Không thể kết nối API AI: ' + e.message);
    } finally {
      if (btn) btn.innerHTML = '⚡ Kiểm tra kết nối AI ngay';
    }
  }

'''

parts = code.split(marker)
new_code = parts[0] + ui_controller_code + '\n' + marker + '\n' + '''
  global.StudentGradingEngine = {
    getExams,
    saveExams,
    getStudents,
    saveStudents,
    getSubmissions,
    saveSubmission,
    getAiConfig,
    saveAiConfig,
    callFreeAiApi,
    preprocessImage,
    rotateCanvas,
    scanMultipleChoiceAnswers,
    gradeStudentSubmission,
    generateStudentLink,
    renderQrCode,
    copySubmissionToClipboard,
    exportScorebookToCsv,
    printScoreSheet,
    importStudentsFromText,
    parseAnswerKeyString,
    // UI controller methods
    initGradingPage,
    switchGradingTab,
    populateExamSelects,
    onStudentExamChange,
    renderTeacherDashboard,
    startStudentCamera,
    stopStudentCamera,
    switchStudentCamera,
    captureStudentCamera,
    handleStudentFileUpload,
    rotateStudentImage,
    toggleStudentContrast,
    clearStudentImage,
    submitStudentGrading,
    copyCurrentResultZalo,
    printCurrentResult,
    copyGeneralExamLink,
    openExamStudentLink,
    copyStudentPersonalLink,
    openStudentQrModal,
    closeStudentQrModal,
    openImportStudentsModal,
    closeImportStudentsModal,
    submitImportStudents,
    loadAiConfigForm,
    saveAiConfigFromForm,
    testAiApiConnection
  };

  // Expose convenient global aliases
  global.initGradingPage = initGradingPage;
  global.switchGradingTab = switchGradingTab;

})(typeof window !== 'undefined' ? window : this);
'''

with open('student-grading-engine.js', 'w', encoding='utf-8') as f:
    f.write(new_code)

print('Updated student-grading-engine.js successfully! Length:', len(new_code))
