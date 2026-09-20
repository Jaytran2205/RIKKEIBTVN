import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update CSS in index.html for nav-container, nav-links, and auth-actions
old_nav_css = """  .nav-container{
    display:flex; align-items:center; justify-content:space-between;
    padding:12px 24px; max-width:1280px; margin:0 auto; gap:16px;
  }
  .logo{
    display:flex; align-items:center; gap:12px; flex-shrink:0; cursor:pointer;
  }
  .logo-icon{
    width:40px; height:40px; background:linear-gradient(135deg, var(--primary), var(--teal));
    border-radius:8px; display:flex; align-items:center; justify-content:center;
    color:#fff; font-family:'Plus Jakarta Sans',sans-serif; font-weight:800; font-size:1.15rem;
    box-shadow:0 3px 8px rgba(15,61,110,0.25);
  }
  .logo-text{
    font-family:'Plus Jakarta Sans',sans-serif; font-weight:800; font-size:1.18rem;
    color:var(--primary-dark); line-height:1.15; white-space:nowrap;
  }
  .logo-text small{
    display:block; font-family:'Inter',sans-serif; font-weight:500; font-size:0.72rem;
    letter-spacing:0.04em; color:var(--muted); white-space:nowrap;
  }

  .nav-links{
    display:flex; align-items:center; gap:6px; flex-wrap:nowrap;
  }
  .nav-link{
    padding:8px 12px; border-radius:6px; font-weight:600; font-size:0.88rem;
    color:var(--ink); transition:all .2s ease; cursor:pointer;
    white-space:nowrap; flex-shrink:0; display:inline-flex; align-items:center;
  }
  .nav-link:hover{
    background:#F1F5F9; color:var(--primary);
  }
  .nav-link.active{
    background:var(--primary); color:#fff;
  }

  .auth-actions{
    display:flex; align-items:center; gap:8px; flex-shrink:0; white-space:nowrap;
  }"""

new_nav_css = """  .nav-container{
    display:flex; align-items:center; justify-content:space-between;
    padding:10px 24px; max-width:1440px; margin:0 auto; gap:10px; width:100%;
  }
  .logo{
    display:flex; align-items:center; gap:10px; flex-shrink:0; cursor:pointer;
  }
  .logo-icon{
    width:36px; height:36px; background:linear-gradient(135deg, var(--primary), var(--teal));
    border-radius:8px; display:flex; align-items:center; justify-content:center;
    color:#fff; font-family:'Plus Jakarta Sans',sans-serif; font-weight:800; font-size:1.05rem;
    box-shadow:0 3px 8px rgba(15,61,110,0.25);
  }
  .logo-text{
    font-family:'Plus Jakarta Sans',sans-serif; font-weight:800; font-size:1.12rem;
    color:var(--primary-dark); line-height:1.15; white-space:nowrap;
  }
  .logo-text small{
    display:block; font-family:'Inter',sans-serif; font-weight:500; font-size:0.7rem;
    letter-spacing:0.03em; color:var(--muted); white-space:nowrap;
  }

  .nav-links{
    display:flex; align-items:center; gap:3px; flex-wrap:nowrap;
    overflow-x:auto; scrollbar-width:none; -ms-overflow-style:none;
    max-width:calc(100% - 380px);
  }
  .nav-links::-webkit-scrollbar{display:none;}
  .nav-link{
    padding:6px 9px; border-radius:6px; font-weight:600; font-size:0.82rem;
    color:var(--ink); transition:all .2s ease; cursor:pointer;
    white-space:nowrap; flex-shrink:0; display:inline-flex; align-items:center;
  }
  .nav-link:hover{
    background:#F1F5F9; color:var(--primary);
  }
  .nav-link.active{
    background:var(--primary); color:#fff;
  }

  .auth-actions{
    display:flex; align-items:center; gap:8px; flex-shrink:0; white-space:nowrap;
    margin-left:auto; z-index:20; position:relative;
  }"""

if old_nav_css in html:
    html = html.replace(old_nav_css, new_nav_css)
    print("1. Updated nav CSS rules.")
else:
    print("WARNING: old_nav_css not found!")

# 2. Update media query for nav-toggle
old_media = """  @media(max-width:960px){
    .nav-links{display:none;}
    .nav-toggle{display:block;}
  }"""

new_media = """  @media(max-width:1180px){
    .nav-links{display:none;}
    .nav-toggle{display:block;}
  }"""

if old_media in html:
    html = html.replace(old_media, new_media)
    print("2. Updated media query to max-width:1180px.")
else:
    print("WARNING: old_media not found!")

# 3. Compact nav link labels in header HTML
old_nav_html = """    <nav class="nav-links">
      <div class="nav-link active" id="nav-home" onclick="navigateTo('home')">Trang chủ</div>
      <div class="nav-link" id="nav-tools" onclick="navigateTo('tools')">Công cụ</div>
      <div class="nav-link" id="nav-travel" onclick="navigateTo('travel')">🗺️ Bản đồ &amp; Giá phòng</div>
      <div class="nav-link" id="nav-ai" onclick="navigateTo('ai')">Thư viện AI</div>
      <div class="nav-link" id="nav-blog" onclick="navigateTo('blog')">Blog &amp; Hướng dẫn</div>
      <div class="nav-link" id="nav-driving" onclick="navigateTo('driving')">Bằng lái xe 2026</div>
      <div class="nav-link" id="nav-grading" onclick="navigateTo('grading')">📝 Chấm Điểm AI &amp; Nộp Bài</div>

      <div class="nav-link" id="nav-community" onclick="navigateTo('community')">Cộng đồng</div>
      <div class="nav-link" id="nav-admin" style="display:none;" onclick="navigateTo('admin')">⚙️ Quản trị Admin</div>
    </nav>"""

new_nav_html = """    <nav class="nav-links">
      <div class="nav-link active" id="nav-home" onclick="navigateTo('home')">Trang chủ</div>
      <div class="nav-link" id="nav-tools" onclick="navigateTo('tools')">Công cụ</div>
      <div class="nav-link" id="nav-travel" onclick="navigateTo('travel')">🗺️ Bản đồ</div>
      <div class="nav-link" id="nav-ai" onclick="navigateTo('ai')">Thư viện AI</div>
      <div class="nav-link" id="nav-blog" onclick="navigateTo('blog')">Blog</div>
      <div class="nav-link" id="nav-driving" onclick="navigateTo('driving')">Bằng lái xe</div>
      <div class="nav-link" id="nav-grading" onclick="navigateTo('grading')">📝 Chấm Điểm AI</div>
      <div class="nav-link" id="nav-community" onclick="navigateTo('community')">Cộng đồng</div>
      <div class="nav-link" id="nav-admin" style="display:none;" onclick="navigateTo('admin')">⚙️ Admin</div>
    </nav>"""

if old_nav_html in html:
    html = html.replace(old_nav_html, new_nav_html)
    print("3. Compacted nav-link labels.")
else:
    print("WARNING: old_nav_html not found!")

# 4. Center-align the Page-Grading Hero Header & Tabs
old_grading_header = """  <!-- Header Banner -->
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
  </div>"""

new_grading_header = """  <!-- Header Banner (Căn giữa trung tâm hoàn hảo) -->
  <div style="background:linear-gradient(135deg, #092545 0%, #0F3D6E 100%); color:#fff; padding:50px 0 40px; border-bottom:1px solid var(--border);">
    <div class="wrap" style="max-width:1100px; margin:0 auto; text-align:center;">
      <div style="display:inline-flex; align-items:center; gap:8px; background:rgba(217,119,6,0.25); color:#FDE68A; font-weight:700; font-size:0.78rem; padding:5px 14px; border-radius:20px; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:14px;">
        🤖 Trí Tuệ Nhân Tạo &amp; Khảo Thí Số • Free AI APIs 2026
      </div>
      <h1 style="color:#fff; font-size:clamp(1.9rem, 3.2vw, 2.5rem); margin-bottom:12px; font-weight:800;">
        Cổng Nộp Bài &amp; Hệ Thống Chấm Điểm Tự Động Cho Học Sinh
      </h1>
      <p style="color:#CBD5E1; font-size:1.05rem; max-width:82ch; line-height:1.65; margin:0 auto 28px auto;">
        Tạo đường link cá nhân hóa &amp; mã QR riêng cho từng học sinh. Học sinh mở link chụp ảnh bài làm gửi lên. Phần mềm tự động nhận diện đề bài, chấm tự động cả <b>Ngữ Văn</b>, <b>Tiếng Anh</b> và <b>Trắc nghiệm</b>. Ưu tiên dùng đáp án có sẵn; với đề mở, AI tự động phân tích đề để giải và đối chiếu kết quả.
      </p>

      <!-- Tab Navigation (Căn giữa trung tâm) -->
      <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
        <button id="gradingTabBtn_teacher" class="grading-tab-btn btn btn-primary" onclick="StudentGradingEngine.switchGradingTab('teacher')" style="border-radius:30px; padding:11px 22px; font-weight:700; box-shadow:0 4px 12px rgba(0,0,0,0.15);">
          👨‍🏫 Dành Cho Giáo Viên &amp; Quản Trị Đề
        </button>
        <button id="gradingTabBtn_student" class="grading-tab-btn btn" onclick="StudentGradingEngine.switchGradingTab('student')" style="background:#fff; color:var(--ink); border:1px solid var(--border); border-radius:30px; padding:11px 22px; font-weight:700;">
          🎓 Cổng Nộp Bài Cá Nhân Học Sinh
        </button>
        <button id="gradingTabBtn_aiconfig" class="grading-tab-btn btn" onclick="StudentGradingEngine.switchGradingTab('aiconfig')" style="background:#fff; color:var(--ink); border:1px solid var(--border); border-radius:30px; padding:11px 22px; font-weight:700;">
          ⚙️ Cài Đặt Free AI API (dereknguyen269)
        </button>
      </div>
    </div>
  </div>"""

if old_grading_header in html:
    html = html.replace(old_grading_header, new_grading_header)
    print("4. Centered grading header and tabs.")
else:
    print("WARNING: old_grading_header not found!")

# 5. Center and balance the Stat Cards and Exam Cards in index.html
old_stats_html = """      <!-- Stats Cards -->
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
      </div>"""

new_stats_html = """      <!-- Stats Cards (Căn giữa, cân đối trên mọi màn hình) -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:20px; margin-bottom:32px; width:100%;">
        <div style="background:#fff; border:1px solid var(--border); border-radius:12px; padding:22px; text-align:center; box-shadow:var(--shadow-sm); display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <span style="color:var(--muted); font-size:0.88rem; font-weight:600;">📑 Tổng Số Đề Thi</span>
          <div id="statTotalExams" style="font-size:2.2rem; font-weight:800; color:var(--primary); margin-top:4px; line-height:1.2;">5</div>
        </div>
        <div style="background:#fff; border:1px solid var(--border); border-radius:12px; padding:22px; text-align:center; box-shadow:var(--shadow-sm); display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <span style="color:var(--muted); font-size:0.88rem; font-weight:600;">👥 Học Sinh Lớp</span>
          <div id="statTotalStudents" style="font-size:2.2rem; font-weight:800; color:#0D9488; margin-top:4px; line-height:1.2;">5</div>
        </div>
        <div style="background:#fff; border:1px solid var(--border); border-radius:12px; padding:22px; text-align:center; box-shadow:var(--shadow-sm); display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <span style="color:var(--muted); font-size:0.88rem; font-weight:600;">📥 Bài Đã Chấm</span>
          <div id="statTotalSubs" style="font-size:2.2rem; font-weight:800; color:#D97706; margin-top:4px; line-height:1.2;">2</div>
        </div>
        <div style="background:#fff; border:1px solid var(--border); border-radius:12px; padding:22px; text-align:center; box-shadow:var(--shadow-sm); display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <span style="color:var(--muted); font-size:0.88rem; font-weight:600;">🏆 Điểm Trung Bình</span>
          <div id="statAvgScore" style="font-size:2.2rem; font-weight:800; color:#16A34A; margin-top:4px; line-height:1.2;">8.8/10</div>
        </div>
      </div>"""

if old_stats_html in html:
    html = html.replace(old_stats_html, new_stats_html)
    print("5. Centered stats cards.")
else:
    print("WARNING: old_stats_html not found!")

# 6. Update exams grid to auto-fit centered
old_exams_grid = '<div id="teacherExamsGrid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:18px;">'
new_exams_grid = '<div id="teacherExamsGrid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(330px, 1fr)); gap:22px; width:100%; justify-content:center;">'
if old_exams_grid in html:
    html = html.replace(old_exams_grid, new_exams_grid)
    print("6. Updated teacherExamsGrid to auto-fit centered.")
else:
    print("WARNING: old_exams_grid not found!")

# 7. Update wrap container in page-grading
old_wrap_grading = '<div class="wrap" style="padding:36px 24px;">'
new_wrap_grading = '<div class="wrap" style="max-width:1240px; margin:0 auto; padding:36px 20px; width:100%;">'
if old_wrap_grading in html:
    html = html.replace(old_wrap_grading, new_wrap_grading, 1)
    print("7. Updated wrap container max-width and centering.")
else:
    print("WARNING: old_wrap_grading not found!")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Saved index.html successfully!")
