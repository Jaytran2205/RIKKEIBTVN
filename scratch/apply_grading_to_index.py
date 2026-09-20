import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Thêm script tag vào head
script_tag = '<script src="student-grading-engine.js"></script>\n'
if 'student-grading-engine.js' not in content:
    content = content.replace('<script src="driving-exam-engine.js?v=2026_full250"></script>',
                              '<script src="driving-exam-engine.js?v=2026_full250"></script>\n' + script_tag)
    print("1. Added script tag to head.")

# 2. Thêm nav-link vào header
nav_grading_html = '      <div class="nav-link" id="nav-grading" onclick="navigateTo(\'grading\')">📝 Chấm Điểm AI &amp; Nộp Bài</div>\n'
if 'id="nav-grading"' not in content:
    target_nav = '<div class="nav-link" id="nav-driving" onclick="navigateTo(\'driving\')">Bằng lái xe 2026</div>'
    content = content.replace(target_nav, target_nav + '\n' + nav_grading_html)
    print("2. Added nav-grading link to header.")

# 3. Cập nhật handleHashNavigation & navigateTo
old_hash_func = """  function handleHashNavigation() {
    const hash = window.location.hash.replace('#', '') || 'home';
    navigateTo(hash, false);
  }"""

new_hash_func = """  function handleHashNavigation() {
    const raw = window.location.hash.replace('#', '') || 'home';
    const [pagePart, queryPart] = raw.split('?');
    const params = new URLSearchParams(queryPart || '');

    // Hỗ trợ alias #cham-bai và #grading
    const pageId = (pagePart === 'cham-bai' || pagePart === 'chamdiem') ? 'grading' : pagePart;
    navigateTo(pageId, false);

    if (pageId === 'grading' && typeof StudentGradingEngine !== 'undefined' && StudentGradingEngine.initGradingPage) {
      setTimeout(() => StudentGradingEngine.initGradingPage(params), 50);
    }
  }"""

if old_hash_func in content:
    content = content.replace(old_hash_func, new_hash_func)
    print("3. Updated handleHashNavigation.")
else:
    print("WARNING: old_hash_func not found!")

# Cập nhật navigateTo để gọi initGradingPage nếu chuyển vào grading
old_nav_page = """    if(pageId === 'community') {
      setTimeout(renderCommunityQr, 50);
    }"""

new_nav_page = """    if(pageId === 'community') {
      setTimeout(renderCommunityQr, 50);
    }
    if(pageId === 'grading' && typeof StudentGradingEngine !== 'undefined' && StudentGradingEngine.initGradingPage) {
      setTimeout(() => StudentGradingEngine.initGradingPage(), 50);
    }"""

if old_nav_page in content:
    content = content.replace(old_nav_page, new_nav_page)
    print("4. Updated navigateTo.")
else:
    print("WARNING: old_nav_page not found!")

# 4. Thêm nút nhanh vào Hero Home
old_hero_quick = """            <button class="btn btn-outline btn-full" style="justify-content:space-between;" onclick="openToolModal('vietqr')">"""
new_hero_quick = """            <button class="btn btn-primary btn-full" style="justify-content:space-between; background:linear-gradient(135deg, #0F3D6E, #0D9488); color:#fff; font-weight:800; margin-bottom:4px;" onclick="navigateTo('grading')">
              <span>📝 Cổng Chấm Bài AI &amp; Nộp Bài HS</span> <span>→</span>
            </button>
            <button class="btn btn-outline btn-full" style="justify-content:space-between;" onclick="openToolModal('vietqr')">"""

if old_hero_quick in content and 'Cổng Chấm Bài AI' not in content:
    content = content.replace(old_hero_quick, new_hero_quick, 1)
    print("5. Added quick grading button in home hero.")

# 5. Thêm Tool Card vào Nhóm công cụ trên page-tools
old_group_end = """      <div class="tool-card" onclick="openToolModal('voucher-qr')">
        <div class="tool-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M13 12h3M8 12h2"/></svg></div>
        <h3>Tạo Voucher &amp; Thẻ Giảm Giá QR</h3>
        <p>Tạo phiếu quà tặng, giảm giá 10% - 30% cho khách quay lại homestay/nhà hàng.</p>
        <span class="go-badge">Mở công cụ →</span>
      </div>
    </div>"""

new_group_end = """      <div class="tool-card" onclick="openToolModal('voucher-qr')">
        <div class="tool-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M13 12h3M8 12h2"/></svg></div>
        <h3>Tạo Voucher &amp; Thẻ Giảm Giá QR</h3>
        <p>Tạo phiếu quà tặng, giảm giá 10% - 30% cho khách quay lại homestay/nhà hàng.</p>
        <span class="go-badge">Mở công cụ →</span>
      </div>
    </div>

    <!-- Group 5 -->
    <div class="group-title"><span class="dot" style="background:#16A34A;"></span> Nhóm 5: Giáo Dục Số &amp; Chấm Bài Thi Tự Động AI</div>
    <div class="tool-grid">
      <div class="tool-card" onclick="navigateTo('grading')" style="border:1.5px solid #0F3D6E; background:linear-gradient(180deg, #FFFFFF 0%, #F0FDF4 100%);">
        <div class="tool-ic" style="background:#EFF6FF; color:#0F3D6E;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></div>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h3 style="color:#0F3D6E;">Chấm Điểm Tự Động &amp; Cổng Nộp Bài Học Sinh</h3>
          <span class="badge-tag" style="background:#DCFCE7; color:#15803d; margin:0; font-size:0.7rem;">Mới 2026</span>
        </div>
        <p>Tạo link cá nhân &amp; mã QR riêng cho từng em. Học sinh chụp ảnh nộp bài, AI tự động chấm Ngữ Văn, Tiếng Anh &amp; Trắc nghiệm. Cóp điểm ra Zalo/Excel 1-click.</p>
        <span class="go-badge" style="color:#0F3D6E; font-weight:800;">Mở Cổng Chấm Bài →</span>
      </div>
    </div>"""

if old_group_end in content and 'Nhóm 5: Giáo Dục Số' not in content:
    content = content.replace(old_group_end, new_group_end)
    print("6. Added Group 5 tool card to page-tools.")

# 6. Thêm Trang Đầy Đủ: <div id="page-grading" class="page-view">
grading_page_html = """
<!-- ========================================================
     PAGE: CỔNG CHẤM ĐIỂM AI & NỘP BÀI HỌC SINH (#grading / #cham-bai)
     ======================================================== -->
<div id="page-grading" class="page-view">
  <!-- Header Banner -->
  <div style="background:linear-gradient(135deg, #092545 0%, #0F3D6E 100%); color:#fff; padding:45px 0 35px; border-bottom:1px solid var(--border);">
    <div class="wrap">
      <div style="display:inline-flex; align-items:center; gap:8px; background:rgba(217,119,6,0.25); color:#FDE68A; font-weight:700; font-size:0.78rem; padding:4px 12px; border-radius:4px; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:12px;">
        🤖 Trí Tuệ Nhân Tạo &amp; Khảo Thí Số • Free AI APIs 2026
      </div>
      <h1 style="color:#fff; font-size:clamp(1.8rem, 3.2vw, 2.4rem); margin-bottom:10px;">Cổng Nộp Bài &amp; Hệ Thống Chấm Điểm Tự Động Cho Học Sinh</h1>
      <p style="color:#CBD5E1; font-size:1.02rem; max-width:72ch; line-height:1.6;">
        Tạo đường link cá nhân hóa &amp; mã QR cho từng học sinh. Học sinh mở link chụp ảnh bài làm gửi lên. Phần mềm chấm tự động cả <b>Ngữ Văn</b>, <b>Tiếng Anh</b> và <b>Trắc nghiệm</b>. Ưu tiên dùng đáp án có sẵn của đề; nếu đề mở, AI sẽ tự động phân tích đề để giải và chỉ ra đáp án chuẩn.
      </p>

      <!-- Tab Navigation -->
      <div style="display:flex; gap:10px; margin-top:28px; flex-wrap:wrap;">
        <button id="gradingTabBtn_teacher" class="grading-tab-btn btn btn-primary" onclick="StudentGradingEngine.switchGradingTab('teacher')" style="border-radius:8px; padding:10px 20px; font-weight:700;">
          👨‍🏫 Dành Cho Giáo Viên &amp; Quản Trị Đề
        </button>
        <button id="gradingTabBtn_student" class="grading-tab-btn btn" onclick="StudentGradingEngine.switchGradingTab('student')" style="background:#fff; color:var(--ink); border:1px solid var(--border); border-radius:8px; padding:10px 20px; font-weight:700;">
          🎓 Cổng Nộp Bài Cá Nhân Học Sinh
        </button>
        <button id="gradingTabBtn_aiconfig" class="grading-tab-btn btn" onclick="StudentGradingEngine.switchGradingTab('aiconfig')" style="background:#fff; color:var(--ink); border:1px solid var(--border); border-radius:8px; padding:10px 20px; font-weight:700;">
          ⚙️ Cài Đặt Free AI API (dereknguyen269)
        </button>
      </div>
    </div>
  </div>

  <div class="wrap" style="padding:36px 24px;">

    <!-- ==============================================
         TAB 1: CỔNG GIÁO VIÊN & QUẢN TRỊ ĐỀ
         ============================================== -->
    <div id="gradingTab_teacher" class="grading-tab-content">
      
      <!-- Stats Cards -->
      <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:16px; margin-bottom:32px;">
        <div style="background:#fff; border:1px solid var(--border); border-radius:10px; padding:18px; box-shadow:var(--shadow-sm);">
          <span style="color:var(--muted); font-size:0.85rem; font-weight:600;">📑 Tổng Số Đề Thi</span>
          <div id="statTotalExams" style="font-size:1.8rem; font-weight:800; color:var(--primary); margin-top:4px;">5</div>
        </div>
        <div style="background:#fff; border:1px solid var(--border); border-radius:10px; padding:18px; box-shadow:var(--shadow-sm);">
          <span style="color:var(--muted); font-size:0.85rem; font-weight:600;">👥 Học Sinh Lớp</span>
          <div id="statTotalStudents" style="font-size:1.8rem; font-weight:800; color:#0D9488; margin-top:4px;">5</div>
        </div>
        <div style="background:#fff; border:1px solid var(--border); border-radius:10px; padding:18px; box-shadow:var(--shadow-sm);">
          <span style="color:var(--muted); font-size:0.85rem; font-weight:600;">📥 Bài Đã Chấm</span>
          <div id="statTotalSubs" style="font-size:1.8rem; font-weight:800; color:#D97706; margin-top:4px;">2</div>
        </div>
        <div style="background:#fff; border:1px solid var(--border); border-radius:10px; padding:18px; box-shadow:var(--shadow-sm);">
          <span style="color:var(--muted); font-size:0.85rem; font-weight:600;">🏆 Điểm Trung Bình</span>
          <div id="statAvgScore" style="font-size:1.8rem; font-weight:800; color:#16A34A; margin-top:4px;">8.8/10</div>
        </div>
      </div>

      <!-- Section: Danh Sách Đề Thi -->
      <div style="background:#fff; border:1px solid var(--border); border-radius:12px; padding:24px; margin-bottom:32px; box-shadow:var(--shadow-sm);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:20px;">
          <div>
            <h2 style="font-size:1.3rem; color:var(--primary-dark);">Danh Sách Đề Kiểm Tra &amp; Barem Đáp Án</h2>
            <p style="color:var(--muted); font-size:0.88rem;">Hệ thống hỗ trợ cả đề có đáp án sẵn và đề mở để AI tự động giải &amp; tạo barem.</p>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="btn btn-outline btn-sm" onclick="alert('Tính năng nâng cao: Bạn có thể thêm đề trực tiếp bằng nút thêm đề hoặc sửa trong file student-grading-engine.js.')">+ Tạo Đề Mới</button>
            <button class="btn btn-primary btn-sm" onclick="StudentGradingEngine.switchGradingTab('student')">🚀 Vào Cổng Nộp Thử</button>
          </div>
        </div>
        <div id="teacherExamsGrid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:18px;">
          <!-- Rendered via JS -->
        </div>
      </div>

      <!-- Section: Danh Sách Học Sinh & Sinh Link Cá Nhân -->
      <div style="background:#fff; border:1px solid var(--border); border-radius:12px; padding:24px; margin-bottom:32px; box-shadow:var(--shadow-sm);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:20px;">
          <div>
            <h2 style="font-size:1.3rem; color:var(--primary-dark);">Danh Sách Học Sinh &amp; Sinh Đường Link Cá Nhân</h2>
            <p style="color:var(--muted); font-size:0.88rem;">Tạo riêng đường link và mã QR nộp bài cho từng học sinh. Bấm "Copy Link Zalo" để gửi tin nhắn cho các em.</p>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="btn btn-primary btn-sm" onclick="StudentGradingEngine.openImportStudentsModal()">📥 Nạp Danh Sách Học Sinh (CSV / Text)</button>
          </div>
        </div>

        <div style="overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.92rem;">
            <thead>
              <tr style="background:#F8FAFC; border-bottom:2px solid var(--border); color:var(--muted); font-size:0.82rem; text-transform:uppercase;">
                <th style="padding:12px;">Mã HS</th>
                <th style="padding:12px;">Họ và Tên</th>
                <th style="padding:12px;">Lớp</th>
                <th style="padding:12px;">Điện Thoại / Phụ Huynh</th>
                <th style="padding:12px;">Thao Tác Sinh Link Cá Nhân</th>
              </tr>
            </thead>
            <tbody id="teacherStudentsTableBody">
              <!-- Rendered via JS -->
            </tbody>
          </table>
        </div>
      </div>

      <!-- Section: Sổ Điểm Lớp Học & "Cóp Ra" -->
      <div style="background:#fff; border:1px solid var(--border); border-radius:12px; padding:24px; box-shadow:var(--shadow-sm);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:20px;">
          <div>
            <h2 style="font-size:1.3rem; color:var(--primary-dark);">Sổ Điểm Điện Tử &amp; Lịch Sử Chấm Bài Tự Động</h2>
            <p style="color:var(--muted); font-size:0.88rem;">Toàn bộ bài nộp của học sinh được tự động tổng hợp tại đây. Dễ dàng cóp ra Zalo hoặc xuất file Excel.</p>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="btn btn-outline btn-sm" onclick="StudentGradingEngine.exportScorebookToCsv('all')">📊 Xuất File Excel (.CSV)</button>
            <button class="btn btn-outline btn-sm" onclick="StudentGradingEngine.renderTeacherDashboard()">🔄 Làm Mới</button>
          </div>
        </div>

        <div style="overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.92rem;">
            <thead>
              <tr style="background:#F8FAFC; border-bottom:2px solid var(--border); color:var(--muted); font-size:0.82rem; text-transform:uppercase;">
                <th style="padding:12px;">Mã Bài</th>
                <th style="padding:12px;">Học Sinh</th>
                <th style="padding:12px;">Lớp</th>
                <th style="padding:12px;">Bài Thi</th>
                <th style="padding:12px;">Điểm</th>
                <th style="padding:12px;">Xếp Loại</th>
                <th style="padding:12px;">Ngày Nộp</th>
                <th style="padding:12px;">Thao Tác</th>
              </tr>
            </thead>
            <tbody id="teacherScorebookTableBody">
              <!-- Rendered via JS -->
            </tbody>
          </table>
        </div>
      </div>

    </div>

    <!-- ==============================================
         TAB 2: CỔNG NỘP BÀI CÁ NHÂN CHO HỌC SINH
         ============================================== -->
    <div id="gradingTab_student" class="grading-tab-content" style="display:none; max-width:900px; margin:0 auto;">
      
      <!-- Personal greeting banner if opened via link -->
      <div id="studentPersonalBanner" style="display:none; background:linear-gradient(135deg, #EFF6FF, #E0F2FE); border:1.5px solid #BFDBFE; border-radius:12px; padding:18px 24px; margin-bottom:24px;"></div>

      <div style="background:#fff; border:1px solid var(--border); border-radius:16px; padding:32px; box-shadow:var(--shadow-md);">
        
        <!-- Header thông tin bài làm -->
        <div style="border-bottom:1px solid var(--border); padding-bottom:20px; margin-bottom:24px;">
          <h2 style="font-size:1.4rem; color:var(--primary-dark); margin-bottom:6px;">Nộp Bài Thi &amp; Chấm Điểm Tức Thì</h2>
          <p style="color:var(--muted); font-size:0.92rem;">Chụp ảnh bài làm hoặc tải ảnh bài thi lên, hệ thống sẽ tự động quét và chấm điểm chuẩn xác trong 2 giây.</p>
        </div>

        <!-- Form định danh học sinh & đề thi -->
        <div style="display:grid; grid-template-columns:1.5fr 1fr 1fr; gap:16px; margin-bottom:20px;">
          <div>
            <label style="display:block; font-weight:700; font-size:0.86rem; margin-bottom:6px; color:var(--ink);">Chọn Đề Kiểm Tra:</label>
            <select id="studentExamSelect" onchange="StudentGradingEngine.onStudentExamChange()" style="width:100%; font-size:0.9rem; padding:10px;"></select>
          </div>
          <div>
            <label style="display:block; font-weight:700; font-size:0.86rem; margin-bottom:6px; color:var(--ink);">Họ và Tên Học Sinh:</label>
            <input type="text" id="studentNameInput" placeholder="Ví dụ: Nguyễn Văn An" value="Nguyễn Văn An">
          </div>
          <div>
            <label style="display:block; font-weight:700; font-size:0.86rem; margin-bottom:6px; color:var(--ink);">Mã Học Sinh:</label>
            <input type="text" id="studentCodeInput" placeholder="Ví dụ: HS01" value="HS01">
          </div>
        </div>

        <!-- Info Card về đề thi đã chọn -->
        <div id="studentExamInfoBox" style="background:#F8FAFC; border:1px solid var(--border); border-radius:10px; padding:16px; margin-bottom:24px;"></div>

        <!-- Khu vực Chụp / Tải ảnh bài thi -->
        <div style="border:2px dashed #CBD5E1; border-radius:12px; padding:24px; text-align:center; background:#FAFAFA; margin-bottom:24px; position:relative;">
          
          <!-- Camera Action Buttons -->
          <div style="display:flex; justify-content:center; gap:10px; flex-wrap:wrap; margin-bottom:18px;">
            <button id="btnStartCamera" class="btn btn-primary" onclick="StudentGradingEngine.startStudentCamera()">
              📸 Mở Camera Chụp Trực Tiếp
            </button>
            <button id="btnCaptureCamera" class="btn" style="display:none; background:#16A34A; color:#fff;" onclick="StudentGradingEngine.captureStudentCamera()">
              ⚡ Chụp Ảnh Này
            </button>
            <button id="btnSwitchCamera" class="btn btn-outline" style="display:none;" onclick="StudentGradingEngine.switchStudentCamera()">
              🔄 Đổi Camera
            </button>
            <button id="btnStopCamera" class="btn btn-outline" style="display:none;" onclick="StudentGradingEngine.stopStudentCamera()">
              ⏹ Đóng Camera
            </button>
            <label class="btn btn-outline" style="cursor:pointer; display:inline-flex; align-items:center;">
              📁 Tải Ảnh Từ Máy
              <input type="file" accept="image/*" style="display:none;" onchange="if(this.files[0]) StudentGradingEngine.handleStudentFileUpload(this.files[0])">
            </label>
          </div>

          <!-- Video live stream -->
          <div id="cameraStreamContainer" style="display:none; max-width:540px; margin:0 auto 18px; border-radius:10px; overflow:hidden; border:2px solid var(--primary); position:relative; background:#000;">
            <video id="gradingCameraVideo" playsinline autoplay muted style="width:100%; display:block;"></video>
            <div style="position:absolute; inset:20px; border:2px dashed rgba(255,255,255,0.7); pointer-events:none; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#fff; font-size:0.85rem; font-weight:700; text-shadow:0 1px 3px rgba(0,0,0,0.8);">
              Căn chỉnh giấy thi vào trong khung
            </div>
          </div>

          <!-- Canvas Preview -->
          <div style="max-width:540px; margin:0 auto;">
            <canvas id="gradingImageCanvas" style="display:none; width:100%; border-radius:10px; border:1px solid var(--border); box-shadow:var(--shadow-sm);"></canvas>
            
            <!-- Empty Placeholder -->
            <div id="imageEmptyPlaceholder">
              <div style="font-size:3rem; margin-bottom:8px;">📄</div>
              <div style="font-weight:700; color:var(--primary-dark); font-size:1.05rem;">Chưa có ảnh bài làm nào</div>
              <div style="color:var(--muted); font-size:0.86rem; margin-top:4px;">Hãy bấm nút "Mở Camera" hoặc "Tải Ảnh Từ Máy" để đưa bài thi vào chấm điểm</div>
            </div>

            <!-- Image controls when loaded -->
            <div id="imagePreviewControls" style="display:none; justify-content:center; gap:10px; margin-top:14px; flex-wrap:wrap;">
              <button class="btn btn-outline btn-sm" onclick="StudentGradingEngine.rotateStudentImage()">🔄 Xoay 90°</button>
              <button class="btn btn-outline btn-sm" onclick="StudentGradingEngine.toggleStudentContrast()">🎛 Tăng Tương Phản (B&amp;W)</button>
              <button class="btn btn-outline btn-sm" style="color:#DC2626; border-color:#FECACA;" onclick="StudentGradingEngine.clearStudentImage()">❌ Xóa &amp; Chụp Lại</button>
            </div>
          </div>

        </div>

        <!-- Big Action Submit Button -->
        <button id="btnSubmitGrading" class="btn btn-primary btn-full" style="font-size:1.15rem; padding:16px; border-radius:10px; box-shadow:var(--shadow-md); letter-spacing:0.02em;" onclick="StudentGradingEngine.submitStudentGrading()">
          🚀 GỬI BÀI &amp; CHẤM ĐIỂM TỰ ĐỘNG NGAY
        </button>

        <!-- Loading animation box -->
        <div id="gradingProcessingBox" style="display:none; text-align:center; padding:30px; margin-top:20px; background:#F0FDF4; border:1.5px solid #86EFAC; border-radius:12px;">
          <div style="font-size:2.2rem; animation:spin 1.5s linear infinite; display:inline-block; margin-bottom:10px;">⚡</div>
          <div id="gradingStatusText" style="font-weight:700; color:#15803d; font-size:1.05rem;">Đang quét ảnh &amp; phân tích đáp án...</div>
          <div style="color:#166534; font-size:0.85rem; margin-top:4px;">Hệ thống đang đối chiếu dữ liệu hoặc gọi Free AI API để phân tích đề và tự sinh đáp án.</div>
        </div>

        <!-- ==============================================
             KẾT QUẢ CHẤM ĐIỂM (SCORE SHEET)
             ============================================== -->
        <div id="gradingResultCard" style="display:none; margin-top:32px; border:2px solid #16A34A; border-radius:14px; padding:28px; background:#fff; box-shadow:0 10px 30px rgba(22,163,74,0.12);">
          
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px; border-bottom:1px solid var(--border); padding-bottom:20px; margin-bottom:20px;">
            <div>
              <span class="badge-tag" style="background:#DCFCE7; color:#15803d; font-size:0.75rem;">✔ ĐÃ HOÀN THÀNH CHẤM BÀI</span>
              <h3 style="font-size:1.5rem; color:var(--primary-dark); margin:4px 0;">Kết Quả Bài Kiểm Tra Của Em</h3>
              <div id="resSourceTag" style="font-size:0.82rem; color:var(--muted); font-weight:600;"></div>
            </div>

            <div style="text-align:center; background:#F0FDF4; border:2px solid #16A34A; border-radius:12px; padding:12px 24px;">
              <div id="resScoreBadge" style="font-size:2.8rem; font-weight:900; color:#16A34A; line-height:1;">8.5 / 10</div>
              <div id="resGradeLevel" style="font-weight:800; color:#15803d; margin-top:6px; font-size:0.95rem;">Xếp loại: Giỏi</div>
            </div>
          </div>

          <!-- Lời nhận xét -->
          <div style="background:#F8FAFC; border-left:4px solid #0F3D6E; padding:16px; border-radius:4px; margin-bottom:20px;">
            <b style="color:var(--primary); font-size:0.95rem;">💡 Lời Nhận Xét Của Giám Khảo / AI:</b>
            <p id="resFeedback" style="font-size:0.92rem; color:#334155; margin-top:6px; line-height:1.6;"></p>
          </div>

          <!-- Chi tiết Trắc nghiệm (nếu có) -->
          <div id="resMcqDetailsBox" style="display:none; margin-bottom:20px;"></div>

          <!-- Chi tiết Barem tự luận (nếu có) -->
          <div id="resRubricDetailsBox" style="display:none; margin-bottom:20px;"></div>

          <!-- Lỗi ngữ pháp tiếng Anh (nếu có) -->
          <div id="resGrammarBox" style="display:none; margin-bottom:20px;"></div>

          <!-- Actions Cóp ra / In -->
          <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:24px; padding-top:20px; border-top:1px solid var(--border);">
            <button class="btn btn-primary" onclick="StudentGradingEngine.copyCurrentResultZalo()" style="flex:1;">
              📋 Sao Chép Kết Quả (Gửi Zalo Phụ Huynh / Thầy Cô)
            </button>
            <button class="btn btn-outline" onclick="StudentGradingEngine.printCurrentResult()">
              📄 In / Tải Phiếu Điểm PDF
            </button>
            <button class="btn btn-outline" onclick="StudentGradingEngine.clearStudentImage(); document.getElementById('gradingResultCard').style.display='none';">
              🔄 Nộp Bài Khác
            </button>
          </div>

        </div>

      </div>

    </div>

    <!-- ==============================================
         TAB 3: CÀI ĐẶT FREE AI API (dereknguyen269)
         ============================================== -->
    <div id="gradingTab_aiconfig" class="grading-tab-content" style="display:none; max-width:800px; margin:0 auto;">
      
      <div style="background:#fff; border:1px solid var(--border); border-radius:14px; padding:30px; box-shadow:var(--shadow-sm);">
        <h2 style="font-size:1.35rem; color:var(--primary-dark); margin-bottom:8px;">Cài Đặt Free AI APIs Cho Chấm Bài Thông Minh</h2>
        <p style="color:var(--muted); font-size:0.9rem; line-height:1.5; margin-bottom:20px;">
          Theo hướng dẫn từ kho tài nguyên <code>github.com/dereknguyen269/free-services</code>, bạn có thể sử dụng các dịch vụ AI miễn phí để chấm bài tự luận Ngữ Văn, Tiếng Anh và tự giải đề mở.
        </p>

        <div style="background:#F0FDF4; border:1px solid #BBF7D0; border-radius:8px; padding:14px; font-size:0.86rem; color:#166534; margin-bottom:20px;">
          💡 <b>Mặc định hệ thống đã có sẵn Smart Built-in AI Evaluator:</b> Hoạt động 100% trên trình duyệt ngay cả khi bạn không nhập bất kỳ API key nào! Nếu bạn có key cá nhân từ Google hoặc OpenRouter, hãy điền bên dưới để sử dụng mô hình cao cấp nhất.
        </div>

        <div class="form-group" style="margin-bottom:18px;">
          <label style="font-weight:700; font-size:0.88rem; display:block; margin-bottom:6px;">Chọn Nhà Cung Cấp AI Mặc Định:</label>
          <select id="aiProviderSelect" style="width:100%; padding:10px;">
            <option value="gemini">Google Gemini Free API (Đề xuất: Vision đọc ảnh tốt nhất)</option>
            <option value="openrouter">OpenRouter Free Tier (200+ free models)</option>
            <option value="groq">Groq Free Cloud (Llama 3.3 70B siêu tốc)</option>
            <option value="builtin">Built-in Offline Smart Evaluator (Không cần Key)</option>
          </select>
        </div>

        <div class="form-group" style="margin-bottom:18px;">
          <label style="font-weight:700; font-size:0.88rem; display:block; margin-bottom:6px;">Google Gemini API Key (Miễn phí tại <code>aistudio.google.com</code>):</label>
          <input type="password" id="aiGeminiKeyInput" placeholder="Dán Gemini API Key của bạn (AIzaSy...)">
        </div>

        <div class="form-group" style="margin-bottom:18px;">
          <label style="font-weight:700; font-size:0.88rem; display:block; margin-bottom:6px;">OpenRouter API Key (Miễn phí tại <code>openrouter.ai/keys</code>):</label>
          <input type="password" id="aiOpenRouterKeyInput" placeholder="Dán OpenRouter Key (sk-or-v1-...)">
        </div>

        <div class="form-group" style="margin-bottom:24px;">
          <label style="font-weight:700; font-size:0.88rem; display:block; margin-bottom:6px;">Groq Cloud API Key (Miễn phí tại <code>console.groq.com</code>):</label>
          <input type="password" id="aiGroqKeyInput" placeholder="Dán Groq API Key (gsk_...)">
        </div>

        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="StudentGradingEngine.saveAiConfigFromForm()">
            💾 Lưu Cài Đặt AI
          </button>
          <button id="btnTestAiApi" class="btn btn-outline" onclick="StudentGradingEngine.testAiApiConnection()">
            ⚡ Kiểm Tra Kết Nối AI Ngay
          </button>
        </div>

      </div>

    </div>

  </div>
</div>

<!-- ==============================================
     MODAL POPUP: XEM MÃ QR NỘP BÀI HỌC SINH
     ============================================== -->
<div id="gradingQrModal" style="display:none; position:fixed; inset:0; z-index:99999; background:rgba(15,23,42,0.75); backdrop-filter:blur(5px); align-items:center; justify-content:center; padding:16px;">
  <div style="background:#fff; border-radius:14px; max-width:440px; width:100%; padding:28px; text-align:center; box-shadow:var(--shadow-lg);">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      <h3 id="gradingQrTitle" style="font-size:1.15rem; color:var(--primary-dark); margin:0;">Mã QR Nộp Bài</h3>
      <button onclick="StudentGradingEngine.closeStudentQrModal()" style="background:none; border:none; font-size:1.6rem; cursor:pointer; color:var(--muted); line-height:1;">&times;</button>
    </div>
    <div id="gradingQrContainer" style="display:flex; justify-content:center; margin:16px 0;"></div>
    <p style="font-size:0.84rem; color:var(--muted); margin-bottom:14px;">Học sinh mở ứng dụng Camera hoặc Zalo trên điện thoại quét mã này để nộp bài ngay.</p>
    <div class="form-group" style="margin-bottom:16px;">
      <input type="text" id="gradingQrLinkText" readonly style="background:#F1F5F9; font-size:0.8rem; text-align:center;">
    </div>
    <div style="display:flex; gap:8px;">
      <button class="btn btn-primary btn-full" onclick="navigator.clipboard.writeText(document.getElementById('gradingQrLinkText').value); StudentGradingEngine.closeStudentQrModal(); if(typeof showToast==='function') showToast('Đã sao chép link nộp bài!');">📋 Sao Chép Link</button>
      <button class="btn btn-outline" onclick="StudentGradingEngine.closeStudentQrModal()">Đóng</button>
    </div>
  </div>
</div>

<!-- ==============================================
     MODAL POPUP: NẠP DANH SÁCH HỌC SINH
     ============================================== -->
<div id="gradingImportModal" style="display:none; position:fixed; inset:0; z-index:99999; background:rgba(15,23,42,0.75); backdrop-filter:blur(5px); align-items:center; justify-content:center; padding:16px;">
  <div style="background:#fff; border-radius:14px; max-width:540px; width:100%; padding:28px; box-shadow:var(--shadow-lg);">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
      <h3 style="font-size:1.2rem; color:var(--primary-dark); margin:0;">Nạp Danh Sách Học Sinh (Import CSV/Text)</h3>
      <button onclick="StudentGradingEngine.closeImportStudentsModal()" style="background:none; border:none; font-size:1.6rem; cursor:pointer; color:var(--muted); line-height:1;">&times;</button>
    </div>
    <p style="font-size:0.86rem; color:var(--muted); margin-bottom:14px;">
      Dán danh sách học sinh vào ô bên dưới (mỗi học sinh 1 dòng).<br>
      Định dạng: <code>Mã HS, Họ và Tên, Lớp, Số điện thoại</code>
    </p>
    <div class="form-group" style="margin-bottom:16px;">
      <textarea id="importStudentsTextarea" rows="8" placeholder="HS06, Đặng Tuấn Kiệt, 12A1, 0987654321&#10;HS07, Bùi Thu Trang, 12A1, 0912345678&#10;HS08, Hoàng Bảo Nam, 12A2, 0933445566"></textarea>
    </div>
    <div style="display:flex; gap:10px; justify-content:flex-end;">
      <button class="btn btn-outline" onclick="StudentGradingEngine.closeImportStudentsModal()">Hủy Bỏ</button>
      <button class="btn btn-primary" onclick="StudentGradingEngine.submitImportStudents()">📥 Nạp Vào Hệ Thống</button>
    </div>
  </div>
</div>
"""

# Chèn trang page-grading trước modal thi sát hạch (khoảng dòng 1800)
marker_modal = '<!-- ========================================================\n     MODAL THI SÁT HẠCH TRỰC TUYẾN LIVE EXAM SIMULATOR'
if marker_modal in content and 'id="page-grading"' not in content:
    content = content.replace(marker_modal, grading_page_html + '\n' + marker_modal)
    print("7. Inserted page-grading and modals before examLiveSimulatorModal.")
else:
    print("WARNING: marker_modal not found or page-grading already present!")

# Lưu file index.html
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Finished applying all grading features to index.html! New length:", len(content))
