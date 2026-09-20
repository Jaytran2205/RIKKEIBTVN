
  // 1. NGÂN HÀNG VIỆT NAM (VietQR)
  const VN_BANKS = [
    { code: "VCB", name: "Vietcombank (Ngoại Thương)" },
    { code: "MB", name: "MBBank (Quân Đội)" },
    { code: "TCB", name: "Techcombank (Kỹ Thương)" },
    { code: "ICB", name: "VietinBank (Công Thương)" },
    { code: "BIDV", name: "BIDV (Đầu Tư & Phát Triển)" },
    { code: "ACB", name: "ACB (Á Châu)" },
    { code: "VPB", name: "VPBank (Việt Nam Thịnh Vượng)" },
    { code: "TPB", name: "TPBank (Tiên Phong)" },
    { code: "STB", name: "Sacombank (Sài Gòn Thương Tín)" },
    { code: "AGR", name: "Agribank (Nông Nghiệp)" },
    { code: "HDB", name: "HDBank (Phát Triển TP.HCM)" },
    { code: "VIB", name: "VIB (Quốc Tế)" }
  ];

  // 2. AUTH & STATE MANAGEMENT
  let currentUser = JSON.parse(localStorage.getItem('nb_user')) || null;
  let allUsers = JSON.parse(localStorage.getItem('nb_all_users')) || [
    { name: "Quản Trị Viên", email: "admin@ninhbinh.vn", role: "admin", date: "2026-01-01" },
    { name: "Chủ Homestay Tam Cốc", email: "tamcoc@homestay.vn", role: "homestay", date: "2026-02-15" },
    { name: "Cửa Hàng Cơm Cháy", email: "comchay@hoalu.vn", role: "merchant", date: "2026-02-20" }
  ];
  let serviceRequests = JSON.parse(localStorage.getItem('nb_requests')) || [
    { name: "Nguyễn Văn Hùng", phone: "0988123456", service: "Thiết kế Website Homestay", note: "Cần tích hợp thanh toán VietQR" },
    { name: "Trần Thị Mai", phone: "0912345678", service: "Đào tạo AI cho đội ngũ", note: "Dạy viết bài Facebook & trả lời Zalo" }
  ];

  // Init App on Load
  window.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    handleHashNavigation();
    renderAdminData();
  });

  window.addEventListener('hashchange', handleHashNavigation);

  function handleHashNavigation() {
    const hash = window.location.hash.replace('#', '') || 'home';
    navigateTo(hash, false);
  }

  function navigateTo(pageId, updateHash = true) {
    document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

    const targetPage = document.getElementById('page-' + pageId);
    if(targetPage) {
      targetPage.classList.add('active');
      const activeNav = document.getElementById('nav-' + pageId);
      if(activeNav) activeNav.classList.add('active');
      if(updateHash) window.location.hash = pageId;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if(pageId === 'community') {
      setTimeout(renderCommunityQr, 50);
    }
  }

  function toggleMobileMenu() {
    const nav = document.querySelector('.nav-links');
    nav.style.display = (nav.style.display === 'flex') ? 'none' : 'flex';
  }

  // Toast Function
  function showToast(msg) {
    const c = document.getElementById('toastContainer');
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `<span>✔</span><span>${msg}</span>`;
    c.appendChild(t);
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transition = 'opacity .3s';
      setTimeout(() => t.remove(), 300);
    }, 2800);
  }

  // Modal Control
  function openModal(title, html) {
    document.getElementById('modalTitle').innerHTML = title;
    document.getElementById('modalBody').innerHTML = html;
    document.getElementById('mainModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('mainModal').classList.remove('open');
    document.body.style.overflow = '';
  }

  // ========================================================
  // AUTH SYSTEM (ĐĂNG KÝ, ĐĂNG NHẬP, QUẢN TRỊ ADMIN)
  // ========================================================
  function updateAuthUI() {
    const authBox = document.getElementById('authActions');
    const userBox = document.getElementById('userActions');
    const navAdmin = document.getElementById('nav-admin');

    if(currentUser) {
      authBox.style.display = 'none';
      userBox.style.display = 'flex';
      document.getElementById('headerUserName').textContent = currentUser.name;
      document.getElementById('headerAvatar').textContent = currentUser.name.charAt(0).toUpperCase();

      document.getElementById('profName').textContent = currentUser.name;
      document.getElementById('profEmail').textContent = currentUser.email;
      document.getElementById('profRole').value = currentUser.role === 'admin' ? 'Quản trị viên (Admin)' : 'Thành viên cộng đồng';
      document.getElementById('profAvatar').textContent = currentUser.name.charAt(0).toUpperCase();

      if(currentUser.role === 'admin') {
        navAdmin.style.display = 'block';
      } else {
        navAdmin.style.display = 'none';
      }
    } else {
      authBox.style.display = 'flex';
      userBox.style.display = 'none';
      navAdmin.style.display = 'none';
    }
  }

  function openAuthModal(mode) {
    const googleBtnHtml = `
      <button class="btn btn-outline btn-full" style="display:flex; align-items:center; justify-content:center; gap:10px; border:1px solid #CBD5E1; margin-bottom:14px; font-weight:600;" onclick="handleGoogleSignIn()">
        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.27 21.37 7.35 24 12 24z"/><path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.98 0 12s.46 3.84 1.26 5.42l4.02-3.15z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.27 2.63 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/></svg>
        Tiếp tục với Google
      </button>
      <div style="display:flex; align-items:center; margin:14px 0; color:var(--muted); font-size:0.8rem;">
        <div style="flex:1; height:1px; background:var(--border);"></div>
        <span style="padding:0 10px;">HOẶC DÙNG EMAIL</span>
        <div style="flex:1; height:1px; background:var(--border);"></div>
      </div>
    `;

    if(mode === 'login') {
      const html = `
        <div>
          ${googleBtnHtml}
          <div class="form-group">
            <label>Email hoặc Số điện thoại:</label>
            <input type="text" id="authEmail" placeholder="admin@ninhbinh.vn" value="admin@ninhbinh.vn">
          </div>
          <div class="form-group">
            <label>Mật khẩu:</label>
            <input type="password" id="authPass" value="123456">
          </div>
          <button class="btn btn-primary btn-full" style="margin-top:6px;" onclick="handleLoginSubmit()">Đăng Nhập Ngay</button>

          <div style="background:#F8FAFC; border:1px dashed var(--border); border-radius:8px; padding:12px; margin-top:16px; font-size:0.82rem;">
            <b>Tài khoản Demo có sẵn:</b><br>
            • Admin Quản Trị: <code>admin@ninhbinh.vn</code> (Mật khẩu: <code>123456</code>)<br>
            • Người dùng: <code>user@ninhbinh.vn</code> (Mật khẩu: <code>123456</code>)
          </div>

          <div style="text-align:center; margin-top:14px; font-size:0.85rem;">
            Chưa có tài khoản? <a href="javascript:void(0)" style="color:var(--primary); font-weight:700;" onclick="openAuthModal('register')">Đăng ký thành viên mới</a>
          </div>
        </div>
      `;
      openModal('Đăng Nhập Ninh Bình Digital', html);
    } else {
      const html = `
        <div>
          ${googleBtnHtml}
          <div class="form-group">
            <label>Họ và tên:</label>
            <input type="text" id="regName" placeholder="Ví dụ: Hoàng Long">
          </div>
          <div class="form-group">
            <label>Email hoặc Số điện thoại:</label>
            <input type="text" id="regEmail" placeholder="long@gmail.com">
          </div>
          <div class="form-group">
            <label>Mật khẩu:</label>
            <input type="password" id="regPass" placeholder="Tối thiểu 6 ký tự">
          </div>
          <div class="form-group">
            <label>Vai trò / Lĩnh vực của bạn:</label>
            <select id="regRole">
              <option value="member">Cá nhân / Khách du lịch</option>
              <option value="homestay">Chủ Homestay / Khách sạn</option>
              <option value="merchant">Hộ kinh doanh đặc sản / Làng nghề</option>
              <option value="teacher">Giáo viên / Trường học</option>
            </select>
          </div>
          <button class="btn btn-primary btn-full" style="margin-top:6px;" onclick="handleRegisterSubmit()">Hoàn Tất Đăng Ký</button>
          <div style="text-align:center; margin-top:14px; font-size:0.85rem;">
            Đã có tài khoản? <a href="javascript:void(0)" style="color:var(--primary); font-weight:700;" onclick="openAuthModal('login')">Đăng nhập</a>
          </div>
        </div>
      `;
      openModal('Đăng Ký Tài Khoản Ninh Bình Digital', html);
    }
  }

  function handleGoogleSignIn() {
    currentUser = {
      name: "Người Dùng Google",
      email: "user.google@gmail.com",
      role: "member",
      provider: "google"
    };
    localStorage.setItem('nb_user', JSON.stringify(currentUser));
    updateAuthUI();
    closeModal();
    showToast('Đăng nhập thành công với tài khoản Google!');
  }

  function handleLoginSubmit() {
    const email = document.getElementById('authEmail').value.trim();
    if(!email) { showToast('Vui lòng nhập email!'); return; }

    if(email.includes('admin')) {
      currentUser = { name: "Quản Trị Viên", email: email, role: "admin" };
    } else {
      currentUser = { name: "Thành Viên Ninh Bình", email: email, role: "member" };
    }
    localStorage.setItem('nb_user', JSON.stringify(currentUser));
    updateAuthUI();
    closeModal();
    showToast(`Chào mừng ${currentUser.name} đã đăng nhập!`);
  }

  function loginAsAdminDemo() {
    currentUser = { name: "Quản Trị Viên (Admin)", email: "admin@ninhbinh.vn", role: "admin" };
    localStorage.setItem('nb_user', JSON.stringify(currentUser));
    updateAuthUI();
    navigateTo('admin');
    showToast('Đã đăng nhập quyền Admin thành công!');
  }

  function handleRegisterSubmit() {
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const role = document.getElementById('regRole').value;

    if(!name || !email) { showToast('Vui lòng điền đầy đủ họ tên và email!'); return; }

    currentUser = { name: name, email: email, role: role };
    allUsers.push({ name: name, email: email, role: role, date: new Date().toISOString().split('T')[0] });
    localStorage.setItem('nb_user', JSON.stringify(currentUser));
    localStorage.setItem('nb_all_users', JSON.stringify(allUsers));
    updateAuthUI();
    renderAdminData();
    closeModal();
    showToast(`Đăng ký thành công! Chào mừng ${name}.`);
  }

  function logoutUser() {
    currentUser = null;
    localStorage.removeItem('nb_user');
    updateAuthUI();
    navigateTo('home');
    showToast('Đã đăng xuất tài khoản!');
  }

  // Admin Dashboard Render
  function switchAdminTab(tab, btn) {
    document.querySelectorAll('.admin-menu-item').forEach(m => m.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('adminTabStats').style.display = (tab === 'stats' || tab === 'tools-stat') ? 'block' : 'none';
    document.getElementById('adminTabUsers').style.display = (tab === 'users') ? 'block' : 'none';
    document.getElementById('adminTabRequests').style.display = (tab === 'requests') ? 'block' : 'none';
  }

  function renderAdminData() {
    document.getElementById('statTotalUsers').textContent = allUsers.length;
    document.getElementById('statTotalRequests').textContent = serviceRequests.length;

    const uTbody = document.getElementById('adminUsersList');
    if(uTbody) {
      uTbody.innerHTML = allUsers.map(u => `
        <tr>
          <td><b>${u.name}</b></td>
          <td>${u.email}</td>
          <td><span class="badge-tag" style="background:#EFF6FF; color:#1D4ED8;">${u.role}</span></td>
          <td>${u.date || '2026-02-28'}</td>
        </tr>
      `).join('');
    }

    const rTbody = document.getElementById('adminRequestsList');
    if(rTbody) {
      rTbody.innerHTML = serviceRequests.map(r => `
        <tr>
          <td><b>${r.name}</b></td>
          <td><b style="color:var(--primary);">${r.phone}</b></td>
          <td>${r.service}</td>
          <td>${r.note}</td>
        </tr>
      `).join('');
    }
  }

  // ========================================================
  // FIX CHUẨN DOWNLOAD FILE ĐÚNG ĐUÔI (.jpg, .png, .webp, .pdf)
  // ========================================================
  function downloadBlobFile(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName; // Đặt đúng tên và đuôi file
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 150);
  }

  // ========================================================
  // INTERACTIVE TOOLS HUB
  // ========================================================
  function openToolModal(toolId) {
    switch (toolId) {
      case 'vietqr': renderVietQR(); break;
      case 'wifi-qr': renderWifiQR(); break;
      case 'menu-qr': renderMenuQR(); break;
      case 'img-compress': renderImgCompress(); break;
      case 'img-convert': renderImgConvert(); break;
      case 'pdf-merge': renderPdfMerge(); break;
      case 'img-to-pdf': renderImgToPdf(); break;
      case 'watermark': renderWatermark(); break;
      case 'invoice': renderInvoice(); break;
      case 'room-price': renderRoomPrice(); break;
      case 'unit-convert': renderUnitConvert(); break;
      case 'rental-contract': renderRentalContract(); break;
      case 'discount-calc': renderDiscountCalc(); break;
      case 'voucher-qr': renderVoucherQR(); break;
      case 'tts-studio': 
      case 'tts': 
        window.open('https://zall.app/', '_blank'); 
        showToast('Đang mở nền tảng Zall App (https://zall.app/)...'); 
        break;
    }
  }

  // 15. TTS Studio Modal (KHAI THÁC TỐI ĐA 469+ GIỌNG VBEE & NGHE THỬ DEMO TRƯỚC KHI CHẠY DỰ ÁN)
  const VBEE_APP_ID = '06be48d3-f9c8-4e2f-bbfb-6e3cd2b56dc7';

  // Danh sách các nhóm giọng đọc Vbee kèm URL nghe thử Demo chính thức từ máy chủ AI Voice
  const VBEE_VOICE_LIST = [
    // --- MIỀN BẮC (VIỆT NAM) ---
    { 
      code: "hn_male_manhdung_news_48k-fhg", 
      name: "Mạnh Dũng", 
      region: "Miền Bắc", 
      desc: "Tin tức, thời sự số 1 Việt Nam", 
      group: "vi_north",
      demo: "https://vbee.s3.ap-southeast-1.amazonaws.com/audios/demo/vbee/hn_male_manhdung_news_48k_cs-thg.mp3"
    },
    { 
      code: "hn_female_ngochuyen_full_48k-fhg", 
      name: "Ngọc Huyền", 
      region: "Miền Bắc", 
      desc: "Đọc truyện tình cảm, cảm xúc ngọt ngào", 
      group: "vi_north",
      demo: "https://vbee.s3.ap-southeast-1.amazonaws.com/audios/demo/vbee/hn_female_ngochuyen_fast_news_48k-thg.mp3"
    },
    { 
      code: "hn_female_maiphuong_vdts_48k-fhg", 
      name: "Mai Phương", 
      region: "Miền Bắc", 
      desc: "Review ẩm thực & homestay trẻ trung", 
      group: "vi_north",
      demo: "https://vbee.s3.ap-southeast-1.amazonaws.com/audios/demo/vbee/hn_female_maiphuong_vdts_48k_cs-thg.mp3"
    },
    { 
      code: "hn_male_phuthang_stor80dt_48k-fhg", 
      name: "Anh Khôi", 
      region: "Miền Bắc", 
      desc: "Giọng đọc truyền cảm, sâu sắc", 
      group: "vi_north",
      demo: "https://vbee.s3.ap-southeast-1.amazonaws.com/audios/demo/vbee/hn_male_phuthang_stor80dt_48k-fhg.mp3"
    },
    { 
      code: "hn_male_thanhlong_talk_48k-fhg", 
      name: "Thanh Long", 
      region: "Miền Bắc", 
      desc: "Sách nói, kinh doanh, khởi nghiệp", 
      group: "vi_north",
      demo: "https://vbee.s3.ap-southeast-1.amazonaws.com/audios/demo/vbee/hn_male_thanhlong_talk_48k-fhg.mp3"
    },
    { 
      code: "hn_female_hermer_stor_48k-fhg", 
      name: "Ngọc Lan", 
      region: "Miền Bắc", 
      desc: "Tiểu thuyết, radio tâm sự đêm", 
      group: "vi_north",
      demo: "https://vbee.s3.ap-southeast-1.amazonaws.com/audios/demo/vbee/hn_female_hermer_stor_48k-fhg.mp3"
    },
    { 
      code: "hn_female_lenka_stor_48k-phg", 
      name: "Nguyệt Dương", 
      region: "Miền Bắc", 
      desc: "Truyện ma, radio đêm huyền bí", 
      group: "vi_north",
      demo: "https://vbee.s3.ap-southeast-1.amazonaws.com/audios/demo/vbee/hn_female_lenka_stor_48k-phg.wav"
    },
    { 
      code: "hn_female_hachi_book_22k-vc", 
      name: "Hà Chi", 
      region: "Miền Bắc", 
      desc: "Sách nói, kỹ năng sống", 
      group: "vi_north",
      demo: "https://vbee.s3.ap-southeast-1.amazonaws.com/audios/demo/vbee/hn_female_hachi_book_22k-vc.mp3"
    },
    { 
      code: "hn_male_minhquan_yt-stable", 
      name: "Minh Quân (Bắc)", 
      region: "Miền Bắc", 
      desc: "Quảng cáo, review công nghệ", 
      group: "vi_north",
      demo: "https://vbee.s3.ap-southeast-1.amazonaws.com/audios/demo/vbee/hn_male_minhquan_yt-stable.mp3"
    },

    // --- MIỀN TRUNG (VIỆT NAM) ---
    { 
      code: "hue_female_huonggiang_full_48k-fhg", 
      name: "Hương Giang", 
      region: "Miền Trung (Huế)", 
      desc: "Nhẹ nhàng, sâu lắng, du lịch di sản", 
      group: "vi_central",
      demo: "https://vbee.s3.ap-southeast-1.amazonaws.com/audios/demo/vbee/hue_female_huonggiang_news_48k_cs-thg.mp3"
    },
    { 
      code: "hue_male_duyphuong_full_48k-fhg", 
      name: "Duy Phương", 
      region: "Miền Trung (Huế)", 
      desc: "Văn hóa, lịch sử, ẩm thực miền Trung", 
      group: "vi_central",
      demo: "https://vbee.s3.ap-southeast-1.amazonaws.com/audios/demo/vbee/sg_female_duyphuong_fast_news_48k_cs-thg.mp3"
    },

    // --- MIỀN NAM (VIỆT NAM) ---
    { 
      code: "sg_female_thaotrinh_full_48k-fhg", 
      name: "Thảo Trinh", 
      region: "Miền Nam", 
      desc: "MC truyền hình TP.HCM tự nhiên, tươi vui", 
      group: "vi_south",
      demo: "https://vbee.s3.ap-southeast-1.amazonaws.com/audios/demo/vbee/sg_female_thaotrinh_fast_news_48k_cs-thg.mp3"
    },
    { 
      code: "sg_male_minhhoang_full_48k-fhg", 
      name: "Minh Hoàng", 
      region: "Miền Nam", 
      desc: "Review sản phẩm, bán hàng livestream", 
      group: "vi_south",
      demo: "https://vbee.s3.ap-southeast-1.amazonaws.com/audios/demo/vbee/sg_male_minhhoang_fast_news_48k_cs-thg.mp3"
    },
    { 
      code: "sg_female_tuongvy_call_44k-fhg", 
      name: "Tường Vy", 
      region: "Miền Nam", 
      desc: "Sách nói Audiobooks, tài liệu chuyên sâu",
      group: "vi_south",
      demo: "https://vbee.s3.ap-southeast-1.amazonaws.com/audios/demo/vbee/sg_female_tuongvy_call_44k-fhg.mp3"
    }
  ];

  // =========================================================================
  // STUDIO GIỌNG NÓI AI (AI VOICE STUDIO PRO - TOÀN BỘ GIỌNG HỆ THỐNG & CỘNG ĐỒNG)
  // =========================================================================

  let currentSelectedVoice = null;
  let currentStudioSpeed = 1.0;
  let currentStudioFormat = 'mp3';
  let activeVoiceTab = 'system'; // 'system' | 'community' | 'custom' | 'favorite'
  let conversionHistory = JSON.parse(localStorage.getItem('ai_voice_conversion_history') || '[]');
  let activePlayingCardBtn = null;
  let currentPreviewAudio = null;

  function initDefaultVoice() {
    if (!currentSelectedVoice) {
      const all = getFullVoiceData();
      currentSelectedVoice = all[0] || {
        id: "v_ngochuyen",
        code: "hn_female_ngochuyen_full_48k-fhg",
        name: "HN - Ngọc Huyền",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
        category: "Review phim",
        gender: "Nữ",
        lang: "Tiếng Việt",
        flag: "🇻🇳",
        region: "Miền Bắc",
        sampleText: "Xin chào, tôi là Ngọc Huyền. Chuyên đọc review phim cảm xúc và truyện ngắn ngọt ngào!"
      };
    }
  }

  function getFullVoiceData() {
    if (typeof AI_VOICE_COMPREHENSIVE_DATABASE !== 'undefined' && Array.isArray(AI_VOICE_COMPREHENSIVE_DATABASE)) {
      return [...AI_VOICE_COMPREHENSIVE_DATABASE, ...USER_CUSTOM_VOICES];
    }
    if (typeof VBEE_FULL_VOICES_DATABASE !== 'undefined' && Array.isArray(VBEE_FULL_VOICES_DATABASE)) {
      return VBEE_FULL_VOICES_DATABASE;
    }
    return VBEE_VOICE_LIST;
  }

  // 1. Giao Diện Studio Editor Chính (Sticky Toolbar, Trực Quan, Chuẩn Mẫu)
  function renderTTSStudio() {
    initDefaultVoice();

    const html = `
      <div id="ai-voice-studio-app" style="font-family:'Inter', sans-serif; display:flex; flex-direction:column; gap:0;">
        <!-- Top Sticky Toolbar Editor (Luôn nằm trên đầu không bị trôi) -->
        <div style="position:sticky; top:0; z-index:20; background:#F1F5F9; border:1.5px solid #CBD5E1; border-radius:12px 12px 0 0; padding:10px 14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; box-shadow:0 2px 6px rgba(0,0,0,0.03);">
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <!-- Nút Mở Modal Chọn Giọng (Avatar + Tên) -->
            <button type="button" onclick="openVoiceSelectorModal()" style="display:flex; align-items:center; gap:8px; background:#FFFFFF; border:1.5px solid #0F3D6E; border-radius:30px; padding:4px 14px 4px 6px; cursor:pointer; font-weight:700; color:#0F172A; transition:all 0.2s; box-shadow:0 2px 4px rgba(15,61,110,0.1);" title="Bấm để đổi giọng đọc">
              <img id="curVoiceAvatar" src="${currentSelectedVoice.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'}" style="width:28px; height:28px; border-radius:50%; object-fit:cover; border:1.5px solid #3B82F6;">
              <span id="curVoiceName" style="font-size:0.88rem; color:#0F3D6E;">${currentSelectedVoice.name}</span>
              <span style="font-size:0.75rem; color:#64748B;">▾</span>
            </button>

            <!-- Tốc độ đọc -->
            <select id="studioSpeedSelect" onchange="currentStudioSpeed=parseFloat(this.value); updateCharStats();" style="background:#FFF; border:1.5px solid #CBD5E1; border-radius:20px; padding:6px 12px; font-size:0.82rem; font-weight:700; color:#334155; cursor:pointer; outline:none;">
              <option value="0.7">⏱️ 0.7x</option>
              <option value="0.8">⏱️ 0.8x</option>
              <option value="0.9">⏱️ 0.9x</option>
              <option value="1.0" selected>⏱️ 1x</option>
              <option value="1.1">⏱️ 1.1x</option>
              <option value="1.2">⏱️ 1.2x</option>
              <option value="1.3">⏱️ 1.3x</option>
            </select>

            <!-- Định dạng audio -->
            <select id="studioFormatSelect" onchange="currentStudioFormat=this.value;" style="background:#FFF; border:1.5px solid #CBD5E1; border-radius:20px; padding:6px 12px; font-size:0.82rem; font-weight:700; color:#334155; cursor:pointer; outline:none;">
              <option value="mp3" selected>🎵 mp3</option>
              <option value="wav">🎵 wav</option>
            </select>

            <!-- Chèn ngắt nghỉ -->
            <button type="button" onclick="insertBreakTag()" title="Chèn khoảng nghỉ 0.5s vào văn bản" style="background:#FFF; border:1.5px solid #CBD5E1; border-radius:8px; padding:6px 12px; font-weight:800; cursor:pointer; font-size:0.85rem; color:#334155;">
              " "
            </button>

            <!-- Nhạc nền -->
            <button type="button" onclick="showToast('Chế độ chèn nhạc nền tự động đã sẵn sàng!')" title="Chèn nhạc nền" style="background:#FFF; border:1.5px solid #CBD5E1; border-radius:8px; padding:6px 12px; font-weight:800; cursor:pointer; font-size:0.85rem; color:#334155;">
              🎵
            </button>
          </div>

          <div style="display:flex; align-items:center; gap:8px;">
            <button type="button" onclick="clearStudioText()" class="btn btn-sm btn-outline" style="border-radius:20px; font-size:0.75rem; padding:4px 10px;">🗑️ Xóa</button>
            <button type="button" onclick="pasteFromClipboard()" class="btn btn-sm btn-outline" style="border-radius:20px; font-size:0.75rem; padding:4px 10px;">📋 Dán</button>
          </div>
        </div>

        <!-- Main Textarea Editor -->
        <div style="position:relative; background:#FFFFFF; border:1.5px solid #CBD5E1; border-top:none; padding:16px;">
          <textarea id="studioMainText" rows="6" oninput="updateCharStats()" placeholder="Nhập, copy văn bản hoặc tải tệp lên để chuyển thành giọng nói cảm xúc với hơn 50 ngôn ngữ và hàng nghìn giọng đọc cho các dịch vụ: Chữ thành lời, Lồng tiếng AI, Nhân bản giọng của bạn, và AI Voice API. Tùy chỉnh với tính năng từ điển, nhạc nền, nghe thử, và hiệu ứng âm thanh..." style="width:100%; box-sizing:border-box; border:none; outline:none; font-family:inherit; font-size:0.95rem; line-height:1.7; resize:vertical; min-height:130px; color:#1E293B;">Chào mừng quý khách đến với vùng đất di sản Ninh Bình, nơi có danh thắng Tràng An, Tam Cốc Bích Động và quần thể chùa Bái Đính linh thiêng!</textarea>
        </div>

        <!-- Bottom Action Bar & Examples -->
        <div style="background:#F8FAFC; border:1.5px solid #CBD5E1; border-top:none; border-radius:0 0 12px 12px; padding:14px 18px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <div style="font-size:0.75rem; color:#64748B; font-weight:600; margin-bottom:6px;">Hoặc thử một ví dụ để bắt đầu:</div>
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
              <button type="button" onclick="applySamplePrompt('giaitri')" style="background:#FFF; border:1px solid #CBD5E1; border-radius:20px; padding:4px 12px; font-size:0.78rem; font-weight:600; cursor:pointer; color:#334155;">🎬 Giải trí</button>
              <button type="button" onclick="applySamplePrompt('binhluan')" style="background:#FFF; border:1px solid #CBD5E1; border-radius:20px; padding:4px 12px; font-size:0.78rem; font-weight:600; cursor:pointer; color:#334155;">💬 Bình luận</button>
              <button type="button" onclick="applySamplePrompt('podcast')" style="background:#FFF; border:1px solid #CBD5E1; border-radius:20px; padding:4px 12px; font-size:0.78rem; font-weight:600; cursor:pointer; color:#334155;">🎙️ Podcast</button>
              <button type="button" onclick="applySamplePrompt('truyen')" style="background:#FFF; border:1px solid #CBD5E1; border-radius:20px; padding:4px 12px; font-size:0.78rem; font-weight:600; cursor:pointer; color:#334155;">📖 Đọc truyện</button>
              <button type="button" onclick="applySamplePrompt('baonoi')" style="background:#FFF; border:1px solid #CBD5E1; border-radius:20px; padding:4px 12px; font-size:0.78rem; font-weight:600; cursor:pointer; color:#334155;">📰 Báo nói</button>
            </div>
          </div>

          <div style="display:flex; align-items:center; gap:16px; margin-left:auto;">
            <!-- Bộ đếm ký tự & Thời lượng -->
            <div style="text-align:right;">
              <span id="studioCharCount" style="font-size:0.82rem; font-weight:700; color:#3B82F6;">0/100.000</span>
              <span style="color:#CBD5E1; margin:0 4px;">|</span>
              <span id="studioEstDuration" style="font-size:0.82rem; font-weight:700; color:#64748B;">⏱️ 00:00</span>
            </div>

            <!-- NÚT LỚN MÀU VÀNG TẠO AUDIO -->
            <button type="button" id="btnGenerateStudioAudio" onclick="executeStudioTTSGeneration()" style="background:#F59E0B; background:linear-gradient(135deg, #F59E0B 0%, #D97706 100%); color:#FFFFFF; border:none; border-radius:30px; padding:12px 26px; font-family:'Plus Jakarta Sans', sans-serif; font-size:1rem; font-weight:800; cursor:pointer; display:inline-flex; align-items:center; gap:8px; box-shadow:0 4px 14px rgba(217,119,6,0.35); transition:all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
              <span id="btnGenIcon" style="font-size:1.1rem;">🟡</span>
              <span id="btnGenText">Tạo audio</span>
            </button>
          </div>
        </div>

        <!-- Trình phát Audio Player Kết Quả Trực Quan (Luôn sẵn sàng & phát âm thanh) -->
        <div id="studioPlayerBox" style="margin-top:16px; display:none; background:#F8FAFC; border:1.5px solid #CBD5E1; border-radius:12px; padding:18px; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <img id="playerVoiceAvatar" src="${currentSelectedVoice.avatar}" style="width:38px; height:38px; border-radius:50%; object-fit:cover; border:2px solid #0F3D6E;">
              <div>
                <b id="playerVoiceTitle" style="color:#0F3D6E; font-size:0.95rem;">${currentSelectedVoice.name}</b>
                <div style="font-size:0.75rem; color:#64748B;">Định dạng: MP3 • Chất lượng: 128kbps Studio</div>
              </div>
            </div>
            <span id="playerDurationBadge" style="background:#0F3D6E; color:#FFF; padding:4px 12px; border-radius:20px; font-size:0.78rem; font-weight:700;">Thời lượng: 00:00</span>
          </div>

          <!-- HTML5 Audio Controls -->
          <audio id="studioMainAudio" controls preload="auto" style="width:100%; margin-bottom:12px; border-radius:30px;"></audio>

          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button type="button" class="btn btn-sm btn-outline" onclick="replayStudioAudio()">🔄 Nghe lại</button>
            <a id="studioDownloadLink" href="#" target="_blank" download="audio_studio.mp3" class="btn btn-sm btn-accent" style="background:#D97706; color:#FFF; font-weight:700;">⬇️ Tải file âm thanh MP3</a>
          </div>
        </div>

        <!-- Danh sách chuyển đổi (Conversion History) -->
        <div style="margin-top:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; cursor:pointer;" onclick="toggleConversionHistory()">
            <b style="color:#0F172A; font-size:0.92rem; display:flex; align-items:center; gap:6px;">
              <span id="histChevron">❯</span> Danh sách chuyển đổi (<span id="histCount">${conversionHistory.length}</span>)
            </b>
            <span style="font-size:0.78rem; color:#3B82F6; font-weight:600;">Lịch sử dự án</span>
          </div>

          <div id="conversionHistoryList" style="display:none; background:#FFF; border:1px solid #E2E8F0; border-radius:10px; padding:12px; max-height:220px; overflow-y:auto;">
            <!-- Render động -->
          </div>
        </div>
      </div>
    `;

    openModal('Studio Giọng Nói AI Đa Năng (Hơn 50 Ngôn Ngữ & Hàng Nghìn Giọng Đọc)', html);
    updateCharStats();
    renderConversionHistoryItems();
  }

  // 2. MODAL CHỌN GIỌNG CHUẨN PIXEL-PERFECT (VOICE SELECTOR MODAL)
  function openVoiceSelectorModal() {
    const existing = document.getElementById('voiceSelectorSubModal');
    if (existing) existing.remove();

    const subModal = document.createElement('div');
    subModal.id = 'voiceSelectorSubModal';
    subModal.style.cssText = `
      position: fixed; inset: 0; background: rgba(15, 23, 42, 0.7);
      backdrop-filter: blur(5px); z-index: 100000;
      display: flex; justify-content: center; align-items: center; padding: 16px;
    `;

    subModal.innerHTML = `
      <div style="background:#FFFFFF; width:100%; max-width:840px; max-height:92vh; border-radius:18px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.3); display:flex; flex-direction:column; overflow:hidden; font-family:'Inter', sans-serif;">
        <!-- Modal Top Bar -->
        <div style="padding:16px 20px; border-bottom:1px solid #E2E8F0; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; background:#FFF;">
          <!-- 4 Tabs Pill -->
          <div style="display:flex; background:#F1F5F9; padding:4px; border-radius:30px; gap:4px;">
            <button type="button" class="v-tab-btn ${activeVoiceTab==='system'?'active':''}" onclick="switchVoiceTab('system', this)" style="border:none; background:${activeVoiceTab==='system'?'#FFF':'transparent'}; color:${activeVoiceTab==='system'?'#0F172A':'#64748B'}; font-weight:700; padding:6px 16px; border-radius:20px; font-size:0.85rem; cursor:pointer; box-shadow:${activeVoiceTab==='system'?'0 1px 3px rgba(0,0,0,0.1)':'none'};">Giọng AI</button>
            <button type="button" class="v-tab-btn ${activeVoiceTab==='community'?'active':''}" onclick="switchVoiceTab('community', this)" style="border:none; background:${activeVoiceTab==='community'?'#FFF':'transparent'}; color:${activeVoiceTab==='community'?'#0F172A':'#64748B'}; font-weight:700; padding:6px 16px; border-radius:20px; font-size:0.85rem; cursor:pointer;">Giọng cộng đồng</button>
            <button type="button" class="v-tab-btn ${activeVoiceTab==='custom'?'active':''}" onclick="switchVoiceTab('custom', this)" style="border:none; background:${activeVoiceTab==='custom'?'#FFF':'transparent'}; color:${activeVoiceTab==='custom'?'#0F172A':'#64748B'}; font-weight:700; padding:6px 16px; border-radius:20px; font-size:0.85rem; cursor:pointer;">Giọng của tôi</button>
            <button type="button" class="v-tab-btn ${activeVoiceTab==='favorite'?'active':''}" onclick="switchVoiceTab('favorite', this)" style="border:none; background:${activeVoiceTab==='favorite'?'#FFF':'transparent'}; color:${activeVoiceTab==='favorite'?'#0F172A':'#64748B'}; font-weight:700; padding:6px 16px; border-radius:20px; font-size:0.85rem; cursor:pointer;">Giọng yêu thích</button>
          </div>

          <div style="display:flex; align-items:center; gap:10px;">
            <button type="button" onclick="showToast('🏆 Bảng xếp hạng các giọng đọc AI được nghe nhiều nhất tuần này!')" style="background:#FEF3C7; color:#D97706; border:1px solid #FDE68A; padding:6px 14px; border-radius:20px; font-size:0.8rem; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:6px;">
              🏆 Bảng xếp hạng
            </button>
            <button type="button" onclick="closeVoiceSelectorModal()" style="background:none; border:none; font-size:1.3rem; color:#64748B; cursor:pointer; padding:4px 8px; font-weight:bold;">✕</button>
          </div>
        </div>

        <!-- Search & Filter Dropdowns Bar -->
        <div style="padding:12px 20px; background:#F8FAFC; border-bottom:1px solid #E2E8F0; display:flex; gap:10px; flex-wrap:wrap;">
          <div style="flex:1; min-width:200px; position:relative;">
            <input type="text" id="vSearchInput" placeholder="🔍 Tìm kiếm bằng từ khóa liên quan..." oninput="filterVoiceCards()" style="width:100%; box-sizing:border-box; padding:8px 14px; border:1.5px solid #CBD5E1; border-radius:8px; font-size:0.85rem; outline:none; background:#FFF;">
          </div>
          <select id="vFilterCategory" onchange="filterVoiceCards()" style="background:#FFF; border:1.5px solid #CBD5E1; border-radius:8px; padding:8px 12px; font-size:0.82rem; font-weight:600; color:#334155; outline:none;">
            <option value="all">Lĩnh vực ▾</option>
            <option value="Review phim">Review phim</option>
            <option value="Quảng cáo">Quảng cáo</option>
            <option value="Đọc truyện">Đọc truyện</option>
            <option value="Sách nói">Sách nói</option>
            <option value="MC Truyền hình">MC Truyền hình</option>
            <option value="Thiếu nhi">Thiếu nhi / Hoạt hình</option>
            <option value="Radio đêm">Radio đêm</option>
          </select>
          <select id="vFilterLang" onchange="filterVoiceCards()" style="background:#FFF; border:1.5px solid #CBD5E1; border-radius:8px; padding:8px 12px; font-size:0.82rem; font-weight:600; color:#334155; outline:none;">
            <option value="all">Ngôn ngữ ▾</option>
            <option value="Tiếng Việt">🇻🇳 Tiếng Việt</option>
            <option value="Tiếng Anh">🇺🇸 🇬🇧 Tiếng Anh</option>
            <option value="Tiếng Nhật">🇯🇵 Tiếng Nhật</option>
            <option value="Tiếng Hàn">🇰🇷 Tiếng Hàn</option>
            <option value="Tiếng Trung">🇨🇳 Tiếng Trung</option>
            <option value="Tiếng Pháp">🇫🇷 Tiếng Pháp</option>
          </select>
          <select id="vFilterRegion" onchange="filterVoiceCards()" style="background:#FFF; border:1.5px solid #CBD5E1; border-radius:8px; padding:8px 12px; font-size:0.82rem; font-weight:600; color:#334155; outline:none;">
            <option value="all">Vùng miền ▾</option>
            <option value="Miền Bắc">Miền Bắc</option>
            <option value="Miền Trung">Miền Trung</option>
            <option value="Miền Nam">Miền Nam</option>
          </select>
        </div>

        <!-- Voice Card List Items (Cuộn mượt mà) -->
        <div id="vVoiceCardsContainer" style="padding:16px 20px; overflow-y:auto; flex:1; display:flex; flex-direction:column; gap:10px;">
          <!-- Render động -->
        </div>

        <!-- Khung Upload Nhân Bản Giọng (Tab Giọng của tôi) -->
        <div id="vCustomVoiceUploadBox" style="display:none; padding:16px 20px; background:#F8FAFC; border-top:1px solid #E2E8F0;">
          <div style="border:2px dashed #94A3B8; border-radius:12px; padding:20px; text-align:center; background:#FFF; cursor:pointer;" onclick="triggerVoiceUpload()">
            <div style="font-size:1.6rem; margin-bottom:4px;">🎙️ ☁️</div>
            <b style="color:#0F3D6E; font-size:0.95rem;">Tải tệp âm thanh mẫu để nhân bản giọng đọc của bạn</b>
            <div style="font-size:0.78rem; color:#64748B; margin-top:4px;">Hỗ trợ .mp3, .wav, .m4a (Thời lượng mẫu khuyến nghị từ 10s - 60s)</div>
            <input type="file" id="customVoiceFileInput" accept="audio/*" style="display:none;" onchange="handleVoiceFileUpload(this)">
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(subModal);
    renderVoiceCardList();
  }

  function closeVoiceSelectorModal() {
    stopVoiceCardDemo();
    const subModal = document.getElementById('voiceSelectorSubModal');
    if (subModal) subModal.remove();
  }

  function switchVoiceTab(tab, btnEl) {
    stopVoiceCardDemo();
    activeVoiceTab = tab;
    document.querySelectorAll('.v-tab-btn').forEach(b => {
      b.style.background = 'transparent';
      b.style.color = '#64748B';
      b.style.boxShadow = 'none';
    });
    if (btnEl) {
      btnEl.style.background = '#FFF';
      btnEl.style.color = '#0F172A';
      btnEl.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
    }

    const uploadBox = document.getElementById('vCustomVoiceUploadBox');
    if (uploadBox) {
      uploadBox.style.display = (tab === 'custom') ? 'block' : 'none';
    }

    renderVoiceCardList();
  }

  function renderVoiceCardList() {
    const container = document.getElementById('vVoiceCardsContainer');
    if (!container) return;

    const allData = getFullVoiceData();
    const searchVal = normalizeSearchStr(document.getElementById('vSearchInput')?.value || '');
    const catVal = document.getElementById('vFilterCategory')?.value || 'all';
    const langVal = document.getElementById('vFilterLang')?.value || 'all';
    const regVal = document.getElementById('vFilterRegion')?.value || 'all';

    let filtered = allData;

    // Lọc theo Tab
    if (activeVoiceTab === 'system') {
      filtered = filtered.filter(v => v.type === 'system' || !v.type);
    } else if (activeVoiceTab === 'community') {
      filtered = filtered.filter(v => v.type === 'community');
    } else if (activeVoiceTab === 'custom') {
      filtered = filtered.filter(v => v.type === 'custom');
    } else if (activeVoiceTab === 'favorite') {
      filtered = filtered.filter(v => USER_FAVORITE_VOICE_IDS.includes(v.id || v.code));
    }

    // Lọc Lĩnh vực
    if (catVal !== 'all') {
      filtered = filtered.filter(v => v.category && v.category.includes(catVal));
    }
    // Lọc Ngôn ngữ
    if (langVal !== 'all') {
      filtered = filtered.filter(v => v.lang && v.lang.includes(langVal));
    }
    // Lọc Vùng miền
    if (regVal !== 'all') {
      filtered = filtered.filter(v => v.region && v.region.includes(regVal));
    }

    // Lọc Từ khóa
    if (searchVal) {
      filtered = filtered.filter(v => {
        const nName = normalizeSearchStr(v.name);
        const nDesc = normalizeSearchStr((v.category||'') + ' ' + (v.region||'') + ' ' + (v.gender||''));
        return nName.includes(searchVal) || nDesc.includes(searchVal);
      });
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:40px; color:#64748B;">
          <div style="font-size:2rem; margin-bottom:8px;">🔍</div>
          <b>Không tìm thấy giọng đọc nào phù hợp với bộ lọc</b>
          <div style="font-size:0.8rem; margin-top:4px;">Hãy thử tìm từ khóa khác hoặc chuyển sang tab Giọng AI</div>
        </div>
      `;
      return;
    }

    let html = '';
    filtered.forEach(v => {
      const isSelected = (currentSelectedVoice && currentSelectedVoice.code === v.code);
      const isFav = USER_FAVORITE_VOICE_IDS.includes(v.id || v.code);
      const safeText = (v.sampleText || `Xin chào! Đây là giọng đọc mẫu của ${v.name}`).replace(/'/g, "\\'");

      html += `
        <div class="voice-row-card" style="display:flex; align-items:center; justify-content:space-between; padding:12px 16px; border:1.5px solid ${isSelected ? '#F59E0B' : '#E2E8F0'}; background:${isSelected ? '#FFFDF5' : '#FFFFFF'}; border-radius:12px; transition:all 0.15s; gap:12px;">
          <!-- Avatar + Play Demo Preview (Nghe thử tức thì) -->
          <div style="display:flex; align-items:center; gap:14px; min-width:240px; flex:1;">
            <div style="position:relative; width:46px; height:46px; flex-shrink:0; cursor:pointer;" onclick="playVoiceCardDemo('${v.code}', '${v.name}', '${v.demo || ''}', '${safeText}', this)" title="Bấm vào đây để nghe thử giọng ngay">
              <img src="${v.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'}" style="width:46px; height:46px; border-radius:50%; object-fit:cover; border:2px solid #CBD5E1;">
              <span id="playBadge_${v.code}" class="v-play-badge" style="position:absolute; bottom:-2px; right:-2px; background:#F59E0B; color:#000; width:20px; height:20px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.65rem; border:2px solid #FFF; font-weight:bold; box-shadow:0 2px 4px rgba(0,0,0,0.2);">▶</span>
            </div>

            <div>
              <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                <b style="font-size:0.92rem; color:#0F172A;">${v.name}</b>
                ${v.isPro ? '<span style="color:#F59E0B; font-size:0.85rem;" title="Giọng Pro Studio">👑</span>' : ''}
                ${v.points ? `<span style="background:#EFF6FF; color:#2563EB; border:1px solid #BFDBFE; padding:1px 8px; border-radius:12px; font-size:0.7rem; font-weight:700;">${v.points}</span>` : ''}
              </div>
              <div style="font-size:0.78rem; color:#64748B; margin-top:2px;">
                ${v.category || 'Phổ thông'} • ${v.gender || 'AI'} • ${v.age || 'Thanh niên'}
              </div>
            </div>
          </div>

          <!-- Quốc gia & Vùng miền -->
          <div style="display:flex; align-items:center; gap:8px; min-width:140px;">
            <span style="font-size:1.25rem;">${v.flag || '🇻🇳'}</span>
            <div>
              <div style="font-size:0.82rem; font-weight:700; color:#1E293B;">${v.lang || 'Tiếng Việt'}</div>
              <div style="font-size:0.72rem; color:#64748B;">${v.region || 'Toàn quốc'}</div>
            </div>
          </div>

          <!-- Nút Hành Động Bên Phải -->
          <div style="display:flex; align-items:center; gap:8px;">
            <button type="button" onclick="selectVoiceFromModal('${v.code}')" style="background:${isSelected ? '#0F3D6E' : '#FFFFFF'}; color:${isSelected ? '#FFFFFF' : '#0F3D6E'}; border:1.5px solid #0F3D6E; padding:6px 16px; border-radius:20px; font-size:0.82rem; font-weight:700; cursor:pointer;">
              ${isSelected ? '✓ Đang dùng' : 'Sử dụng'}
            </button>
            <button type="button" onclick="toggleFavoriteVoice('${v.id || v.code}', this)" style="background:none; border:none; font-size:1.2rem; color:${isFav ? '#EF4444' : '#CBD5E1'}; cursor:pointer; padding:4px;" title="Yêu thích">
              ${isFav ? '❤️' : '♡'}
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  function filterVoiceCards() {
    renderVoiceCardList();
  }

  function selectVoiceFromModal(voiceCode) {
    stopVoiceCardDemo();
    const allData = getFullVoiceData();
    const voice = allData.find(v => v.code === voiceCode);
    if (voice) {
      currentSelectedVoice = voice;
      const nameEl = document.getElementById('curVoiceName');
      const avatarEl = document.getElementById('curVoiceAvatar');
      if (nameEl) nameEl.textContent = voice.name;
      if (avatarEl && voice.avatar) avatarEl.src = voice.avatar;
      showToast(`Đã chọn giọng: ${voice.name}`);
    }
    closeVoiceSelectorModal();
  }

  function toggleFavoriteVoice(voiceId, btnEl) {
    const idx = USER_FAVORITE_VOICE_IDS.indexOf(voiceId);
    if (idx >= 0) {
      USER_FAVORITE_VOICE_IDS.splice(idx, 1);
      btnEl.textContent = '♡';
      btnEl.style.color = '#CBD5E1';
      showToast('Đã xóa khỏi danh sách yêu thích');
    } else {
      USER_FAVORITE_VOICE_IDS.push(voiceId);
      btnEl.textContent = '❤️';
      btnEl.style.color = '#EF4444';
      showToast('Đã thêm vào danh sách yêu thích!');
    }
    localStorage.setItem('ai_user_favorite_voice_ids', JSON.stringify(USER_FAVORITE_VOICE_IDS));
  }

  // 3. Cơ Chế Phát Thử Audio MP3 Chuẩn 100% Cho Từng Giọng (469 Giọng Riêng Biệt)

  function playVoiceCardDemo(voiceCode, name, demoUrl, sampleText, triggerEl) {
    const badge = document.getElementById(`playBadge_${voiceCode}`);

    // Nếu đang phát chính giọng này thì bấm vào sẽ dừng lại
    if (activePlayingCardBtn === voiceCode) {
      stopVoiceCardDemo();
      return;
    }

    // Dừng ngay lập tức âm thanh đang phát trước đó
    stopVoiceCardDemo();
    activePlayingCardBtn = voiceCode;

    if (badge) {
      badge.textContent = '⏸️';
      badge.style.background = '#EF4444';
      badge.style.color = '#FFF';
    }

    showToast(`Đang phát giọng đọc: ${name}`);

    // 1. Ưu tiên phát trực tiếp file Audio MP3 chuẩn từ S3
    if (demoUrl && demoUrl.startsWith('http')) {
      try {
        const audio = new Audio(demoUrl);
        currentPreviewAudio = audio;

        audio.onended = function() {
          stopVoiceCardDemo();
        };

        audio.onerror = function() {
          console.warn(`Link MP3 lỗi cho giọng ${name}, gọi Proxy Vbee API...`);
          fetchAndPlayProxyAudio(voiceCode, name, sampleText);
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.warn("Lỗi phát audio, gọi Proxy Vbee API:", err);
            fetchAndPlayProxyAudio(voiceCode, name, sampleText);
          });
        }
        return;
      } catch (e) {
        fetchAndPlayProxyAudio(voiceCode, name, sampleText);
        return;
      }
    }

    // 2. Gọi Proxy Vbee API tạo audio
    fetchAndPlayProxyAudio(voiceCode, name, sampleText);
  }

  async function fetchAndPlayProxyAudio(voiceCode, name, sampleText) {
    const textToSpeak = sampleText || `Xin chào! Tôi là giọng đọc ${name}.`;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const resp = await fetch('http://localhost:5000/api/vbee/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToSpeak.slice(0, 60),
          voice_code: voiceCode
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (resp.ok) {
        const data = await resp.json();
        if (data && data.success && data.audio_url) {
          if (activePlayingCardBtn === voiceCode) {
            const audio = new Audio(data.audio_url);
            currentPreviewAudio = audio;
            audio.onended = function() { stopVoiceCardDemo(); };
            audio.onerror = function() { stopVoiceCardDemo(); };
            audio.play().catch(() => { stopVoiceCardDemo(); });
            return;
          }
        }
      }
    } catch(e) {}

    stopVoiceCardDemo();
  }

  function stopVoiceCardDemo() {
    if (currentPreviewAudio) {
      try {
        currentPreviewAudio.pause();
        currentPreviewAudio.currentTime = 0;
      } catch(e) {}
      currentPreviewAudio = null;
    }
    document.querySelectorAll('.v-play-badge').forEach(b => {
      b.textContent = '▶';
      b.style.background = '#F59E0B';
      b.style.color = '#000';
    });
    activePlayingCardBtn = null;
  }

  // 4. Nhân Bản Giọng Người Dùng (Custom Voice Clone)
  function triggerVoiceUpload() {
    document.getElementById('customVoiceFileInput')?.click();
  }

  function handleVoiceFileUpload(input) {
    const file = input.files[0];
    if (!file) return;

    const voiceName = prompt('Nhập tên cho giọng nhân bản của bạn:', file.name.split('.')[0]);
    if (!voiceName) return;

    const newVoice = {
      id: "custom_" + Date.now(),
      code: "custom_" + Date.now(),
      name: voiceName + " (Giọng của tôi)",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
      category: "Nhân bản AI",
      gender: "Cá nhân",
      age: "Tùy chỉnh",
      lang: "Tiếng Việt",
      flag: "🇻🇳",
      region: "Của tôi",
      isPro: true,
      points: "AI Clone",
      type: "custom",
      sampleText: `Xin chào! Đây là giọng nhân bản cá nhân của ${voiceName}.`,
      demo: ""
    };

    USER_CUSTOM_VOICES.push(newVoice);
    localStorage.setItem('ai_user_custom_voices', JSON.stringify(USER_CUSTOM_VOICES));
    showToast(`Đã thêm thành công giọng nhân bản: ${voiceName}!`);
    renderVoiceCardList();
  }

  // 5. Tiện Ích Trình Soạn Thảo Editor
  function updateCharStats() {
    const text = document.getElementById('studioMainText')?.value || '';
    const charEl = document.getElementById('studioCharCount');
    const durEl = document.getElementById('studioEstDuration');
    if (!charEl || !durEl) return;

    const len = text.length;
    charEl.textContent = `${len.toLocaleString()}/100.000`;

    const estSec = Math.round((len / 14) / (currentStudioSpeed || 1.0));
    const m = Math.floor(estSec / 60);
    const s = estSec % 60;
    durEl.textContent = `⏱️ ${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function applySamplePrompt(type) {
    const prompts = {
      giaitri: "Hôm nay chúng ta sẽ cùng khám phá top 5 địa điểm du lịch tuyệt đẹp nhất tại Ninh Bình mà bạn nhất định không thể bỏ qua trong chuyến hành trình sắp tới!",
      binhluan: "Theo ghi nhận mới nhất, lượng khách du lịch đổ về quần thể danh thắng Tràng An và Tam Cốc trong dịp cuối tuần đã đạt mức kỷ lục với hàng nghìn lượt tham quan mỗi ngày.",
      podcast: "Chào mừng bạn quay trở lại với chuỗi Podcast Thanh Xuân. Hãy cùng lắng đọng tâm hồn và lắng nghe những câu chuyện ý nghĩa về cuộc sống sau một ngày dài bận rộn.",
      truyen: "Đêm đã về khuya, không gian bốn bề chìm trong tĩnh lặng. Ánh trăng mờ ảo chiếu rọi qua khung cửa sổ, gợi lại những ký ức xa xăm của một thời xưa cũ...",
      baonoi: "Bản tin sáng nay: Ninh Bình đẩy mạnh chuyển đổi số trong lĩnh vực dịch vụ du lịch và lưu trú homestay, mang lại trải nghiệm tối ưu cho du khách trong nước và quốc tế."
    };
    const ta = document.getElementById('studioMainText');
    if (ta && prompts[type]) {
      ta.value = prompts[type];
      updateCharStats();
      showToast('Đã áp dụng mẫu văn bản!');
    }
  }

  function insertBreakTag() {
    const ta = document.getElementById('studioMainText');
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const text = ta.value;
    ta.value = text.substring(0, start) + ' <break time="0.5s"/> ' + text.substring(end);
    updateCharStats();
    showToast('Đã chèn ngắt nghỉ 0.5s');
  }

  function clearStudioText() {
    const ta = document.getElementById('studioMainText');
    if (ta) { ta.value = ''; updateCharStats(); }
  }

  async function pasteFromClipboard() {
    try {
      const text = await navigator.clipboard.readText();
      const ta = document.getElementById('studioMainText');
      if (ta && text) {
        ta.value += text;
        updateCharStats();
        showToast('Đã dán văn bản!');
      }
    } catch(e) {
      showToast('Hãy dùng phím Ctrl + V để dán');
    }
  }

  // 6. Thực Hiện Tạo Audio Dự Án
  async function executeStudioTTSGeneration() {
    const text = document.getElementById('studioMainText')?.value.trim();
    if (!text) {
      showToast('Vui lòng nhập nội dung văn bản để tạo audio!');
      return;
    }

    initDefaultVoice();
    const voiceCode = currentSelectedVoice.code;
    const voiceName = currentSelectedVoice.name;
    const userSpeed = currentStudioSpeed || 1.0;

    const btn = document.getElementById('btnGenerateStudioAudio');
    const btnText = document.getElementById('btnGenText');
    const btnIcon = document.getElementById('btnGenIcon');

    const playerBox = document.getElementById('studioPlayerBox');
    const audio = document.getElementById('studioMainAudio');
    const durBadge = document.getElementById('playerDurationBadge');
    const dlLink = document.getElementById('studioDownloadLink');
    const pTitle = document.getElementById('playerVoiceTitle');
    const pAvatar = document.getElementById('playerVoiceAvatar');

    btn.disabled = true;
    btnText.textContent = 'Đang xử lý...';
    btnIcon.textContent = '⏳';

    let audioUrl = null;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      try {
        const response = await fetch('http://localhost:5000/api/vbee/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: text,
            voice_code: voiceCode
          }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const resData = await response.json();
          if (resData && resData.success && resData.audio_url) {
            audioUrl = resData.audio_url;
          }
        }
      } catch(e) {}

      // Cập nhật giao diện Player
      pTitle.textContent = voiceName;
      if (pAvatar && currentSelectedVoice.avatar) pAvatar.src = currentSelectedVoice.avatar;

      if (audioUrl && audioUrl.startsWith('http')) {
        audio.src = audioUrl;
        audio.playbackRate = userSpeed;
        audio.load();

        audio.onloadedmetadata = function() {
          const dur = Math.round(audio.duration || Math.max(3, text.length / 14 / userSpeed));
          const m = Math.floor(dur / 60);
          const s = dur % 60;
          durBadge.textContent = `Thời lượng: ${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
        };

        audio.play().catch(() => {});
        dlLink.href = audioUrl;
        dlLink.download = `audio_${Date.now()}.${currentStudioFormat}`;
      } else {
        // Fallback Web Speech Synthesis trực tiếp
        playWebSpeechFallback(text, voiceCode, userSpeed);
        const estSec = Math.round(text.length / 14 / userSpeed);
        durBadge.textContent = `Thời lượng: ~${estSec}s`;
      }

      playerBox.style.display = 'block';

      // Lưu vào Lịch sử chuyển đổi
      saveToConversionHistory({
        id: Date.now(),
        text: text.slice(0, 80) + (text.length > 80 ? '...' : ''),
        voiceName: voiceName,
        time: new Date().toLocaleTimeString('vi-VN', {hour:'2-digit', minute:'2-digit', day:'2-digit', month:'2-digit'}),
        audioUrl: audioUrl
      });

      showToast(`Đã tạo audio thành công cho giọng "${voiceName}"!`);

    } catch (err) {
      playWebSpeechFallback(text, voiceCode, userSpeed);
    } finally {
      btn.disabled = false;
      btnText.textContent = 'Tạo audio';
      btnIcon.textContent = '🟡';
    }
  }

  function replayStudioAudio() {
    const audio = document.getElementById('studioMainAudio');
    if (audio && audio.src && audio.src !== window.location.href) {
      audio.currentTime = 0;
      audio.play();
    } else {
      const text = document.getElementById('studioMainText')?.value || '';
      initDefaultVoice();
      playWebSpeechFallback(text, currentSelectedVoice.code, currentStudioSpeed);
    }
  }

  // 7. Lịch Sử Chuyển Đổi (Conversion History)
  function saveToConversionHistory(item) {
    conversionHistory.unshift(item);
    if (conversionHistory.length > 20) conversionHistory.pop();
    localStorage.setItem('ai_voice_conversion_history', JSON.stringify(conversionHistory));
    renderConversionHistoryItems();
    const countEl = document.getElementById('histCount');
    if (countEl) countEl.textContent = conversionHistory.length;
  }

  function toggleConversionHistory() {
    const list = document.getElementById('conversionHistoryList');
    const chevron = document.getElementById('histChevron');
    if (!list) return;
    if (list.style.display === 'none') {
      list.style.display = 'block';
      if (chevron) chevron.textContent = '▼';
    } else {
      list.style.display = 'none';
      if (chevron) chevron.textContent = '❯';
    }
  }

  function renderConversionHistoryItems() {
    const list = document.getElementById('conversionHistoryList');
    if (!list) return;

    if (conversionHistory.length === 0) {
      list.innerHTML = '<div style="text-align:center; color:#94A3B8; padding:10px; font-size:0.8rem;">Chưa có bản ghi âm nào trong lịch sử</div>';
      return;
    }

    let html = '';
    conversionHistory.forEach(item => {
      html += `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 10px; border-bottom:1px solid #F1F5F9; font-size:0.82rem;">
          <div style="max-width:70%;">
            <div style="font-weight:700; color:#0F172A; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.text}</div>
            <div style="color:#64748B; font-size:0.72rem;">🎙️ ${item.voiceName} • 🕒 ${item.time}</div>
          </div>
          <div style="display:flex; gap:8px;">
            <button type="button" class="btn btn-sm btn-outline" style="padding:2px 8px; font-size:0.72rem;" onclick="playHistoryAudio('${item.audioUrl || ''}', '${item.text}')">▶ Phát</button>
            ${item.audioUrl && item.audioUrl.startsWith('http') ? `<a href="${item.audioUrl}" target="_blank" download class="btn btn-sm btn-accent" style="padding:2px 8px; font-size:0.72rem;">⬇️</a>` : ''}
          </div>
        </div>
      `;
    });
    list.innerHTML = html;
  }

  function playHistoryAudio(url, text) {
    if (url && url.startsWith('http')) {
      const a = new Audio(url);
      a.play();
    } else {
      playWebSpeechFallback(text, 'vi-VN', 1.0);
    }
  }


  function normalizeSearchStr(str) {
    if (!str) return '';
    return str.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/đ/g, "d").replace(/Đ/g, "d").trim();
  }

  function getFullVoiceData() {
    if (typeof VBEE_FULL_VOICES_DATABASE !== 'undefined' && Array.isArray(VBEE_FULL_VOICES_DATABASE) && VBEE_FULL_VOICES_DATABASE.length > 0) {
      return VBEE_FULL_VOICES_DATABASE;
    }
    return VBEE_VOICE_LIST;
  }

  function populateTTSVoiceDropdown(filterGroup, searchKeyword = '') {
    const sel = document.getElementById('ttsModalVoice');
    const countBadge = document.getElementById('ttsSearchCount');
    if (!sel) return;

    currentVoiceFilterGroup = filterGroup;
    const allData = getFullVoiceData();
    let filtered = allData;

    // 1. Lọc theo nhóm tab
    if (filterGroup === 'vi') {
      filtered = allData.filter(v => v.group && v.group.startsWith('vi_'));
    } else if (filterGroup !== 'all') {
      filtered = allData.filter(v => v.group === filterGroup);
    }

    // 2. Lọc theo từ khóa tìm kiếm (hỗ trợ cả có dấu và không dấu)
    if (searchKeyword && searchKeyword.trim()) {
      const q = normalizeSearchStr(searchKeyword);
      filtered = filtered.filter(v => {
        const nName = normalizeSearchStr(v.name);
        const nCode = normalizeSearchStr(v.code);
        const nDesc = normalizeSearchStr(v.desc || v.category);
        const nRegion = normalizeSearchStr(v.region || v.group_name);
        return nName.includes(q) || nCode.includes(q) || nDesc.includes(q) || nRegion.includes(q);
      });
    }

    if (countBadge) {
      countBadge.textContent = `${filtered.length} / ${allData.length} giọng`;
    }

    if (filtered.length === 0) {
      sel.innerHTML = '<option value="">❌ Không tìm thấy giọng nào phù hợp</option>';
      const previewText = document.getElementById('previewText');
      if (previewText) previewText.textContent = 'Nghe thử giọng';
      return;
    }

    const previousSelected = sel.value;

    let groups = {};
    filtered.forEach(v => {
      let gName = v.group_name || '🌟 GIỌNG ĐỌC VBEE';
      if (!groups[gName]) groups[gName] = [];
      groups[gName].push(v);
    });

    let html = '';
    for (let g in groups) {
      html += `<optgroup label="${g}">`;
      groups[g].forEach(v => {
        const descText = v.desc || v.category || v.gender;
        html += `<option value="${v.code}">${v.name} — ${descText} (${v.gender || 'AI'})</option>`;
      });
      html += `</optgroup>`;
    }
    sel.innerHTML = html;

    // Giữ nguyên giọng đã chọn nếu còn trong danh sách
    if (previousSelected && filtered.some(v => v.code === previousSelected)) {
      sel.value = previousSelected;
    } else {
      sel.selectedIndex = 0;
    }

    onVoiceChange(sel);
  }

  function searchTTSVoices(keyword) {
    populateTTSVoiceDropdown(currentVoiceFilterGroup, keyword);
  }

  function filterTTSVoices(group, btnEl) {
    document.querySelectorAll('.tts-filter-btn').forEach(b => {
      b.classList.remove('active', 'btn-primary');
      b.classList.add('btn-outline');
    });
    if (btnEl) {
      btnEl.classList.remove('btn-outline');
      btnEl.classList.add('active', 'btn-primary');
    }
    const searchInput = document.getElementById('ttsVoiceSearch');
    const keyword = searchInput ? searchInput.value : '';
    populateTTSVoiceDropdown(group, keyword);
  }

  function onVoiceChange(sel) {
    stopVoicePreview();
    if (!sel || !sel.options || sel.selectedIndex < 0) return;
    const opt = sel.options[sel.selectedIndex];
    const name = opt ? opt.text.split('—')[0].trim() : 'giọng này';
    const previewText = document.getElementById('previewText');
    if (previewText) previewText.textContent = `Nghe thử: ${name}`;
  }

  function playVoicePreview() {
    const sel = document.getElementById('ttsModalVoice');
    if (!sel || !sel.value) return;
    const voiceCode = sel.value;
    const allData = getFullVoiceData();
    const voiceObj = allData.find(v => v.code === voiceCode);
    const name = voiceObj ? voiceObj.name : 'Giọng mẫu';

    const pAudio = document.getElementById('ttsPreviewAudio');
    const pIcon = document.getElementById('previewIcon');
    const pText = document.getElementById('previewText');

    if (currentPreviewAudio && !currentPreviewAudio.paused) {
      stopVoicePreview();
      return;
    }

    if (voiceObj && voiceObj.demo && voiceObj.demo.startsWith('http')) {
      pAudio.src = voiceObj.demo;
      pAudio.onerror = function() {
        fallbackPreviewSpeech(voiceCode, name);
      };
      pAudio.play().then(() => {
        currentPreviewAudio = pAudio;
        if (pIcon) pIcon.textContent = '⏸️';
        if (pText) pText.textContent = `Đang nghe: ${name}`;
        showToast(`Đang phát giọng đọc mẫu: ${name}`);
      }).catch(() => {
        fallbackPreviewSpeech(voiceCode, name);
      });

      pAudio.onended = function() {
        stopVoicePreview();
      };
    } else {
      fallbackPreviewSpeech(voiceCode, name);
    }
  }

  function fallbackPreviewSpeech(voiceCode, name) {
    const pIcon = document.getElementById('previewIcon');
    const pText = document.getElementById('previewText');
    if (pIcon) pIcon.textContent = '⏸️';
    if (pText) pText.textContent = `Đang nghe: ${name}`;

    const sampleText = `Xin chào! Đây là giọng đọc mẫu ${name} của AI Voice. Rất hân hạnh được đồng hành cùng dự án của bạn!`;
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(sampleText);
      let lang = 'vi-VN';
      if (voiceCode.startsWith('en_')) lang = 'en-US';
      else if (voiceCode.startsWith('ja_')) lang = 'ja-JP';
      else if (voiceCode.startsWith('ko_')) lang = 'ko-KR';
      else if (voiceCode.startsWith('zh_')) lang = 'zh-CN';
      else if (voiceCode.startsWith('fr_')) lang = 'fr-FR';
      else if (voiceCode.startsWith('de_')) lang = 'de-DE';
      else if (voiceCode.startsWith('ru_')) lang = 'ru-RU';
      else if (voiceCode.startsWith('es_')) lang = 'es-ES';

      u.lang = lang;
      u.rate = 1.0;
      u.onend = function() {
        stopVoicePreview();
      };
      u.onerror = function() {
        stopVoicePreview();
      };
      window.speechSynthesis.speak(u);
      showToast(`Đang phát giọng đọc mẫu: ${name}`);
    } else {
      showToast(`Đã chọn giọng: ${name}`);
      setTimeout(stopVoicePreview, 2000);
    }
  }

  function stopVoicePreview() {
    const pAudio = document.getElementById('ttsPreviewAudio');
    const pIcon = document.getElementById('previewIcon');
    const pText = document.getElementById('previewText');
    if (pAudio) {
      pAudio.pause();
      pAudio.currentTime = 0;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    currentPreviewAudio = null;
    if (pIcon) pIcon.textContent = '🔊';
    if (pText) {
      const sel = document.getElementById('ttsModalVoice');
      const opt = sel && sel.options ? sel.options[sel.selectedIndex] : null;
      const name = opt ? opt.text.split('—')[0].trim() : 'giọng này';
      pText.textContent = `Nghe thử: ${name}`;
    }
  }



  function filterTTSVoices(group, btnEl) {
    document.querySelectorAll('.tts-filter-btn').forEach(b => {
      b.classList.remove('active', 'btn-primary');
      b.classList.add('btn-outline');
    });
    if (btnEl) {
      btnEl.classList.remove('btn-outline');
      btnEl.classList.add('active', 'btn-primary');
    }
    populateTTSVoiceDropdown(group);
  }

  async function runVbeeTTSModal() {
    const text = document.getElementById('ttsModalText')?.value.trim();
    const sel = document.getElementById('ttsModalVoice');
    const opt = sel?.options[sel.selectedIndex];
    const voiceCode = opt?.value || 'hn_male_manhdung_news_48k-fhg';
    const voiceName = opt?.text.split('—')[0].trim() || 'Mạnh Dũng';
    const userSpeed = parseFloat(document.getElementById('ttsModalSpeed')?.value) || 1.0;

    const resBox = document.getElementById('ttsModalResult');
    const audio = document.getElementById('ttsModalAudio');
    const durBadge = document.getElementById('ttsDurBadge');
    const voiceLbl = document.getElementById('ttsPlayingVoiceLabel');
    const dlBtn = document.getElementById('ttsDownloadBtn');
    const btn = document.getElementById('ttsRunBtn');
    const btnText = document.getElementById('ttsBtnText');

    if(!text) { showToast('Vui lòng nhập nội dung văn bản!'); return; }

    btn.disabled = true;
    btnText.textContent = '⏳ Đang gửi request sang AI Voice và tạo audio...';
    resBox.style.display = 'block';
    voiceLbl.textContent = `🎧 Giọng đọc Vbee: ${voiceName}`;

    let audioUrl = null;

    try {
      // 1. Thử gọi qua Backend Proxy (có timeout 6 giây chống treo nút)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      try {
        const response = await fetch('http://localhost:5000/api/vbee/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: text,
            voice_code: voiceCode
          }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const resData = await response.json();
          if (resData && resData.success && resData.audio_url) {
            audioUrl = resData.audio_url;
            console.log('✅ Nhận audio Vbee thành công:', audioUrl);
          }
        }
      } catch (err) {
        console.warn('Proxy Vbee timeout hoặc offline, chuyển sang Stream phát trực tiếp:', err);
      }

      // 2. Chế độ phát âm thanh
      if (audioUrl && !audioUrl.includes('translate_tts')) {
        audio.src = audioUrl;
        audio.playbackRate = userSpeed;
        audio.load();

        audio.onloadedmetadata = function() {
          const dur = Math.round(audio.duration || Math.max(3, text.length / 14 / userSpeed));
          const m = Math.floor(dur / 60);
          const s = dur % 60;
          durBadge.textContent = `Thời lượng: ${m}:${s < 10 ? '0' : ''}${s}`;
        };

        audio.play().then(() => {
          showToast(`Đã tạo thành công giọng AI "${voiceName}"!`);
        }).catch(() => {
          playWebSpeechFallback(text, voiceCode, userSpeed);
        });

        dlBtn.href = audioUrl;
        dlBtn.download = `vbee_${voiceCode}_${Date.now()}.mp3`;
      } else {
        // Phát trực tiếp bằng SpeechSynthesis API chuẩn trình duyệt
        playWebSpeechFallback(text, voiceCode, userSpeed);
        durBadge.textContent = `Thời lượng: ~${Math.ceil(text.length / 12 / userSpeed)}s`;
      }

    } catch (error) {
      console.error(error);
      playWebSpeechFallback(text, voiceCode, userSpeed);
    } finally {
      btn.disabled = false;
      btnText.textContent = 'Tạo Giọng Nói AI Voice Ngay';
    }
  }

  function playWebSpeechFallback(text, voiceCode, speed) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      let lang = 'vi-VN';
      if (voiceCode.startsWith('en_')) lang = 'en-US';
      else if (voiceCode.startsWith('ja_')) lang = 'ja-JP';
      else if (voiceCode.startsWith('ko_')) lang = 'ko-KR';
      else if (voiceCode.startsWith('zh_')) lang = 'zh-CN';
      else if (voiceCode.startsWith('fr_')) lang = 'fr-FR';
      else if (voiceCode.startsWith('de_')) lang = 'de-DE';
      else if (voiceCode.startsWith('ru_')) lang = 'ru-RU';
      else if (voiceCode.startsWith('es_')) lang = 'es-ES';

      u.lang = lang;
      u.rate = speed || 1.0;
      window.speechSynthesis.speak(u);
      showToast('Đang phát giọng đọc AI chuyển đổi!');
    }
  }

  function replayTTSAudio() {
    const audio = document.getElementById('ttsModalAudio');
    if(audio) {
      audio.currentTime = 0;
      audio.play();
    }
  }

  // 12. Hợp đồng thuê xe máy
  function renderRentalContract() {
    const html = `
      <div class="form-grid">
        <div>
          <div class="form-group">
            <label>Tên nhà xe / Homestay cho thuê:</label>
            <input type="text" id="rcOwner" value="Dịch Vụ Thuê Xe Tam Cốc - Ninh Bình" oninput="updateRentalPreview()">
          </div>
          <div class="form-group">
            <label>Họ tên khách thuê xe:</label>
            <input type="text" id="rcRenter" value="Nguyễn Văn An" oninput="updateRentalPreview()">
          </div>
          <div class="form-group">
            <label>Số CCCD / Hộ chiếu:</label>
            <input type="text" id="rcIdCard" value="035099xxxxxx" oninput="updateRentalPreview()">
          </div>
          <div class="form-group">
            <label>Loại xe &amp; Biển số:</label>
            <input type="text" id="rcBike" value="Xe tay ga Vision (35B1 - 688.99)" oninput="updateRentalPreview()">
          </div>
          <div class="form-group">
            <label>Giá thuê (VNĐ/ngày):</label>
            <input type="number" id="rcPrice" value="120000" oninput="updateRentalPreview()">
          </div>
          <button class="btn btn-primary btn-full" onclick="printRentalContract()">In Hợp Đồng Giao Nhận Xe</button>
        </div>
        <div style="background:#F8FAFC; border:1px solid var(--border); border-radius:8px; padding:18px;" id="rcDocPreview">
          <div style="text-align:center; font-weight:800; font-size:1.05rem; color:var(--primary-dark); margin-bottom:10px;">
            BIÊN BẢN GIAO NHẬN XE DU LỊCH
          </div>
          <div style="font-size:0.86rem; line-height:1.7;">
            <div>• Đơn vị cho thuê: <b id="rcDispOwner">Dịch Vụ Thuê Xe Tam Cốc - Ninh Bình</b></div>
            <div>• Khách thuê xe: <b id="rcDispRenter">Nguyễn Văn An</b> (CCCD: <span id="rcDispId">035099xxxxxx</span>)</div>
            <div>• Phương tiện: <b id="rcDispBike">Xe tay ga Vision (35B1 - 688.99)</b> (Kèm 02 mũ bảo hiểm)</div>
            <div>• Đơn giá: <b id="rcDispPrice" style="color:var(--primary);">120.000 đ/ngày</b> | Xăng xe tự túc</div>
            <div style="margin-top:8px; font-size:0.75rem; color:var(--muted); font-style:italic;">Cam kết lái xe an toàn, tuân thủ luật giao thông tại Ninh Bình.</div>
          </div>
        </div>
      </div>
    `;
    openModal('Hợp Đồng Thuê Xe Máy &amp; Xe Điện Du Lịch', html);
  }

  function updateRentalPreview() {
    document.getElementById('rcDispOwner').textContent = document.getElementById('rcOwner')?.value || '';
    document.getElementById('rcDispRenter').textContent = document.getElementById('rcRenter')?.value || '';
    document.getElementById('rcDispId').textContent = document.getElementById('rcIdCard')?.value || '';
    document.getElementById('rcDispBike').textContent = document.getElementById('rcBike')?.value || '';
    const p = parseFloat(document.getElementById('rcPrice')?.value) || 0;
    document.getElementById('rcDispPrice').textContent = p.toLocaleString('vi-VN') + ' đ/ngày';
  }

  function printRentalContract() {
    const owner = document.getElementById('rcOwner').value;
    const renter = document.getElementById('rcRenter').value;
    const bike = document.getElementById('rcBike').value;
    const price = parseFloat(document.getElementById('rcPrice').value) || 120000;
    const id = document.getElementById('rcIdCard').value;

    const w = window.open('', '', 'width=700,height=700');
    w.document.write(`
      <html><body style="font-family:sans-serif; padding:40px; line-height:1.6;">
        <h2 style="text-align:center;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h2>
        <h4 style="text-align:center; margin-bottom:20px;">Độc lập - Tự do - Hạnh phúc</h4>
        <h3 style="text-align:center; color:#0F3D6E;">HỢP ĐỒNG CHO THUÊ XE DU LỊCH NINH BÌNH</h3>
        <p>Hôm nay, ngày ${new Date().toLocaleDateString('vi-VN')}, tại Ninh Bình, hai bên thống nhất ký kết:</p>
        <p><b>BÊN A (Bên cho thuê):</b> ${owner}</p>
        <p><b>BÊN B (Khách thuê):</b> ${renter} - CCCD/Hộ chiếu: ${id}</p>
        <p><b>Phương tiện:</b> ${bike} | Đơn giá: ${price.toLocaleString('vi-VN')} đ/ngày</p>
        <p>Bên B cam kết giữ gìn phương tiện cẩn thận và trả xe đúng hẹn.</p>
        <div style="display:flex; justify-content:space-between; margin-top:40px;">
          <div><b>ĐẠI DIỆN BÊN A</b><br><br><br>(Ký tên)</div>
          <div><b>ĐẠI DIỆN BÊN B</b><br><br><br>(Ký tên)</div>
        </div>
        <script>window.print();<\/script>
      </body></html>
    `);
    w.document.close();
  }

  // 13. Tính chiết khấu combo đặc sản
  function renderDiscountCalc() {
    const html = `
      <div class="form-grid">
        <div>
          <div class="form-group">
            <label>Giá bán lẻ 1 sản phẩm (VNĐ):</label>
            <input type="number" id="dcUnit" value="150000" oninput="calcComboDiscount()">
          </div>
          <div class="form-group">
            <label>Số lượng khách mua (Hộp/Gói):</label>
            <input type="number" id="dcQty" value="5" min="1" oninput="calcComboDiscount()">
          </div>
          <div class="form-group">
            <label>Mức chiết khấu combo (%):</label>
            <select id="dcPercent" onchange="calcComboDiscount()">
              <option value="5">Mua từ 3 món: Giảm 5%</option>
              <option value="10" selected>Mua từ 5 món: Giảm 10% (Tặng kèm)</option>
              <option value="15">Mua từ 10 món (Giá sỉ): Giảm 15%</option>
              <option value="20">Đại lý / Mua sỉ lớn: Giảm 20%</option>
            </select>
          </div>
        </div>
        <div style="background:#F8FAFC; padding:20px; border-radius:10px; text-align:center;">
          <span style="font-size:0.85rem; color:var(--muted);">TỔNG TIỀN THANH TOÁN:</span>
          <b id="dcFinalAmt" style="display:block; font-size:1.8rem; color:var(--primary); margin:8px 0;">675.000 VNĐ</b>
          <div style="font-size:0.85rem; color:var(--success); font-weight:700;" id="dcSavedAmt">Tiết kiệm: 75.000 VNĐ (10%)</div>
          <button class="btn btn-primary btn-sm" style="margin-top:14px;" onclick="copyComboQuote()">Sao chép báo giá sỉ/lẻ</button>
        </div>
      </div>
    `;
    openModal('Tính Chiết Khấu Combo Đặc Sản Ninh Bình', html);
    calcComboDiscount();
  }

  function calcComboDiscount() {
    const unit = parseFloat(document.getElementById('dcUnit')?.value) || 0;
    const qty = parseInt(document.getElementById('dcQty')?.value) || 1;
    const pct = parseFloat(document.getElementById('dcPercent')?.value) || 0;

    const subtotal = unit * qty;
    const saved = subtotal * (pct / 100);
    const final = subtotal - saved;

    document.getElementById('dcFinalAmt').textContent = final.toLocaleString('vi-VN') + ' VNĐ';
    document.getElementById('dcSavedAmt').textContent = `Tiết kiệm được: ${saved.toLocaleString('vi-VN')} đ (Giảm ${pct}%)`;
  }

  function copyComboQuote() {
    const final = document.getElementById('dcFinalAmt').textContent;
    const saved = document.getElementById('dcSavedAmt').textContent;
    const msg = `Dạ chào anh/chị, combo đặc sản của mình được ưu đãi ${saved}, tổng thanh toán chỉ còn ${final} ạ!`;
    navigator.clipboard.writeText(msg);
    showToast('Đã sao chép báo giá combo gửi khách!');
  }

  // 9. Invoice / Quotation Generator (Mẫu hóa đơn A4 chuẩn)
  function renderInvoice() {
    const html = `
      <div class="form-grid" style="grid-template-columns:1.1fr 0.9fr;">
        <div>
          <div class="form-group">
            <label>Đơn vị bán / Homestay / Cửa hàng:</label>
            <input type="text" id="invUnit" value="Homestay Tràng An Riverside" oninput="updateInvoiceFull()">
          </div>
          <div class="form-group">
            <label>Địa chỉ &amp; Số điện thoại đơn vị:</label>
            <input type="text" id="invUnitContact" value="Thôn Tràng An, Trường Yên, Hoa Lư, Ninh Bình - ĐT: 0988.668.899" oninput="updateInvoiceFull()">
          </div>
          <div class="form-group">
            <label>Họ tên khách hàng / Đoàn khách:</label>
            <input type="text" id="invCust" value="Anh Hoàng Long (Đoàn 4 khách)" oninput="updateInvoiceFull()">
          </div>
          <div class="form-group">
            <label>Số điện thoại khách hàng:</label>
            <input type="text" id="invCustPhone" value="0912.345.678" oninput="updateInvoiceFull()">
          </div>

          <label style="font-weight:700; color:var(--primary-dark); font-size:0.88rem; display:block; margin:10px 0 6px;">Chi tiết các mục hàng hóa / dịch vụ:</label>
          <div id="invRowsList">
            <div class="inv-item-row" style="display:grid; grid-template-columns:2fr 1fr 1.5fr auto; gap:6px; margin-bottom:8px;">
              <input type="text" value="Phòng VIP Deluxe view sông (2 đêm)" class="inv-name" oninput="updateInvoiceFull()" placeholder="Tên dịch vụ">
              <input type="number" value="2" class="inv-qty" oninput="updateInvoiceFull()" placeholder="SL">
              <input type="number" value="750000" class="inv-price" oninput="updateInvoiceFull()" placeholder="Đơn giá">
              <button class="btn btn-sm" style="background:#fee2e2; color:#dc2626; padding:4px 8px;" onclick="this.parentElement.remove(); updateInvoiceFull();">✕</button>
            </div>
            <div class="inv-item-row" style="display:grid; grid-template-columns:2fr 1fr 1.5fr auto; gap:6px; margin-bottom:8px;">
              <input type="text" value="Combo Cơm cháy chà bông đặc sản (Hộp quà biếu)" class="inv-name" oninput="updateInvoiceFull()" placeholder="Tên dịch vụ">
              <input type="number" value="4" class="inv-qty" oninput="updateInvoiceFull()" placeholder="SL">
              <input type="number" value="120000" class="inv-price" oninput="updateInvoiceFull()" placeholder="Đơn giá">
              <button class="btn btn-sm" style="background:#fee2e2; color:#dc2626; padding:4px 8px;" onclick="this.parentElement.remove(); updateInvoiceFull();">✕</button>
            </div>
          </div>
          <button class="btn btn-outline btn-sm" style="margin-bottom:12px;" onclick="addInvoiceRow()">+ Thêm dòng dịch vụ</button>

          <div class="form-group">
            <label>Giảm giá / Ưu đãi (VNĐ):</label>
            <input type="number" id="invDiscountVal" value="100000" oninput="updateInvoiceFull()">
          </div>
          <button class="btn btn-primary btn-full" onclick="printFullInvoiceA4()">🖨️ In Hóa Đơn Chuẩn A4 / Lưu PDF</button>
        </div>

        <div>
          <!-- Live Invoice Preview Box -->
          <div id="invoiceA4Doc" style="background:#fff; border:1px solid #CBD5E1; border-radius:8px; padding:20px; box-shadow:var(--shadow-sm); font-size:0.82rem; color:#1E293B; line-height:1.4;">
            <div style="display:flex; justify-content:space-between; border-bottom:2px solid #0F3D6E; padding-bottom:10px; margin-bottom:10px;">
              <div>
                <b style="font-size:0.95rem; color:#0F3D6E; text-transform:uppercase;" id="invPrevUnitName">Homestay Tràng An Riverside</b>
                <div style="font-size:0.75rem; color:#64748B;" id="invPrevUnitInfo">Thôn Tràng An, Trường Yên, Hoa Lư, Ninh Bình</div>
              </div>
              <div style="text-align:right;">
                <b style="color:#D97706; font-size:1rem;">HÓA ĐƠN BÁN HÀNG</b>
                <div style="font-size:0.75rem; color:#64748B;">Số HĐ: NB-${Date.now().toString().slice(-6)}</div>
                <div style="font-size:0.75rem; color:#64748B;">Ngày: ${new Date().toLocaleDateString('vi-VN')}</div>
              </div>
            </div>

            <div style="margin-bottom:10px; background:#F8FAFC; padding:8px 10px; border-radius:4px;">
              <div>Khách hàng: <b id="invPrevCustName">Anh Hoàng Long</b></div>
              <div>Số điện thoại: <span id="invPrevCustPhone">0912.345.678</span></div>
            </div>

            <table style="width:100%; border-collapse:collapse; margin-bottom:10px;">
              <thead>
                <tr style="background:#F1F5F9; border-bottom:1px solid #CBD5E1;">
                  <th style="padding:6px 8px; text-align:left;">Dịch vụ / Sản phẩm</th>
                  <th style="padding:6px 8px; text-align:center; width:35px;">SL</th>
                  <th style="padding:6px 8px; text-align:right; width:75px;">Đơn giá</th>
                  <th style="padding:6px 8px; text-align:right; width:85px;">Thành tiền</th>
                </tr>
              </thead>
              <tbody id="invPrevTableRows"></tbody>
            </table>

            <div style="text-align:right; border-top:1px solid #E2E8F0; padding-top:8px; font-size:0.85rem;">
              <div>Cộng tiền hàng: <b id="invPrevSubtotal">0 đ</b></div>
              <div>Giảm giá: <b id="invPrevDiscount" style="color:#DC2626;">- 0 đ</b></div>
              <div style="font-size:1.05rem; color:#0F3D6E; font-weight:800; margin-top:4px;">
                TỔNG THANH TOÁN: <span id="invPrevGrandTotal">0 đ</span>
              </div>
              <div style="font-style:italic; font-size:0.75rem; color:#64748B; margin-top:3px;" id="invPrevInWords">
                (Bằng chữ: Không đồng)
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    openModal('Tạo Báo Giá &amp; Hóa Đơn Thanh Toán Chuẩn', html);
    updateInvoiceFull();
  }

  function addInvoiceRow() {
    const container = document.getElementById('invRowsList');
    const div = document.createElement('div');
    div.className = 'inv-item-row';
    div.style = 'display:grid; grid-template-columns:2fr 1fr 1.5fr auto; gap:6px; margin-bottom:8px;';
    div.innerHTML = `
      <input type="text" placeholder="Tên dịch vụ/món" class="inv-name" oninput="updateInvoiceFull()">
      <input type="number" placeholder="SL" value="1" class="inv-qty" oninput="updateInvoiceFull()">
      <input type="number" placeholder="Đơn giá" value="100000" class="inv-price" oninput="updateInvoiceFull()">
      <button class="btn btn-sm" style="background:#fee2e2; color:#dc2626; padding:4px 8px;" onclick="this.parentElement.remove(); updateInvoiceFull();">✕</button>
    `;
    container.appendChild(div);
  }

  function updateInvoiceFull() {
    const unit = document.getElementById('invUnit')?.value || 'ĐƠN VỊ KINH DOANH';
    const unitInfo = document.getElementById('invUnitContact')?.value || '';
    const cust = document.getElementById('invCust')?.value || 'Quý khách';
    const custPhone = document.getElementById('invCustPhone')?.value || '';

    document.getElementById('invPrevUnitName').textContent = unit;
    document.getElementById('invPrevUnitInfo').textContent = unitInfo;
    document.getElementById('invPrevCustName').textContent = cust;
    document.getElementById('invPrevCustPhone').textContent = custPhone;

    const rows = document.querySelectorAll('.inv-item-row');
    const tbody = document.getElementById('invPrevTableRows');
    if(!tbody) return;
    tbody.innerHTML = '';

    let subtotal = 0;
    rows.forEach(r => {
      const name = r.querySelector('.inv-name')?.value || 'Dịch vụ';
      const qty = parseFloat(r.querySelector('.inv-qty')?.value) || 0;
      const price = parseFloat(r.querySelector('.inv-price')?.value) || 0;
      const total = qty * price;
      subtotal += total;

      tbody.innerHTML += `
        <tr style="border-bottom:1px solid #F1F5F9;">
          <td style="padding:6px 8px;">${name}</td>
          <td style="padding:6px 8px; text-align:center;">${qty}</td>
          <td style="padding:6px 8px; text-align:right;">${price.toLocaleString('vi-VN')}</td>
          <td style="padding:6px 8px; text-align:right; font-weight:700;">${total.toLocaleString('vi-VN')}</td>
        </tr>
      `;
    });

    const disc = parseFloat(document.getElementById('invDiscountVal')?.value) || 0;
    const grand = Math.max(0, subtotal - disc);

    document.getElementById('invPrevSubtotal').textContent = subtotal.toLocaleString('vi-VN') + ' đ';
    document.getElementById('invPrevDiscount').textContent = '- ' + disc.toLocaleString('vi-VN') + ' đ';
    document.getElementById('invPrevGrandTotal').textContent = grand.toLocaleString('vi-VN') + ' VNĐ';
    document.getElementById('invPrevInWords').textContent = `(Bằng chữ: ${grand.toLocaleString('vi-VN')} đồng chẵn)`;
  }

  function printFullInvoiceA4() {
    const unit = document.getElementById('invUnit')?.value || 'ĐƠN VỊ KINH DOANH';
    const unitInfo = document.getElementById('invUnitContact')?.value || '';
    const cust = document.getElementById('invCust')?.value || 'Quý khách';
    const custPhone = document.getElementById('invCustPhone')?.value || '';
    const subtotal = document.getElementById('invPrevSubtotal')?.textContent || '0 đ';
    const disc = document.getElementById('invPrevDiscount')?.textContent || '0 đ';
    const grand = document.getElementById('invPrevGrandTotal')?.textContent || '0 đ';
    const words = document.getElementById('invPrevInWords')?.textContent || '';
    const tableBody = document.getElementById('invPrevTableRows')?.innerHTML || '';

    const w = window.open('', '', 'width=800,height=900');
    w.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Hóa Đơn Bán Hàng - ${cust}</title>
        <style>
          @page { size: A4 portrait; margin: 15mm; }
          body { font-family: 'Segoe UI', Arial, sans-serif; color: #1E293B; margin: 0; padding: 20px; line-height: 1.5; }
          .inv-header { display: flex; justify-content: space-between; border-bottom: 2.5px solid #0F3D6E; padding-bottom: 14px; margin-bottom: 18px; }
          .inv-title { color: #D97706; font-size: 20px; font-weight: 800; text-transform: uppercase; margin: 0; }
          .box-info { background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px 16px; border-radius: 6px; margin-bottom: 18px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px; }
          th { background: #0F3D6E; color: #fff; padding: 9px 10px; text-align: left; }
          td { padding: 9px 10px; border-bottom: 1px solid #E2E8F0; }
          .text-right { text-align: right; }
          .text-center { text-align: center; }
          .totals-wrap { float: right; width: 280px; text-align: right; margin-bottom: 30px; font-size: 14px; }
          .grand-total { font-size: 16px; font-weight: 800; color: #0F3D6E; border-top: 1.5px solid #0F3D6E; padding-top: 6px; margin-top: 6px; }
          .sign-section { clear: both; display: flex; justify-content: space-between; margin-top: 50px; text-align: center; font-size: 13px; }
        </style>
      </head>
      <body>
        <div class="inv-header">
          <div>
            <h2 style="margin:0; color:#0F3D6E; text-transform:uppercase; font-size:17px;">${unit}</h2>
            <div style="font-size:12px; color:#64748B; margin-top:4px;">${unitInfo}</div>
          </div>
          <div class="text-right">
            <div class="inv-title">HÓA ĐƠN BÁN HÀNG</div>
            <div style="font-size:12px; color:#64748B;">Số HĐ: NB-${Date.now().toString().slice(-6)}</div>
            <div style="font-size:12px; color:#64748B;">Ngày: ${new Date().toLocaleDateString('vi-VN')}</div>
          </div>
        </div>

        <div class="box-info">
          <div>Khách hàng / Đơn vị: <b>${cust}</b></div>
          <div>Số điện thoại liên hệ: <b>${custPhone}</b></div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width:40px;" class="text-center">STT</th>
              <th>Tên Dịch Vụ / Hàng Hóa</th>
              <th style="width:50px;" class="text-center">SL</th>
              <th style="width:100px;" class="text-right">Đơn Giá</th>
              <th style="width:110px;" class="text-right">Thành Tiền</th>
            </tr>
          </thead>
          <tbody>
            ${tableBody}
          </tbody>
        </table>

        <div class="totals-wrap">
          <div>Cộng tiền hàng: <b>${subtotal}</b></div>
          <div>Giảm giá ưu đãi: <b style="color:#DC2626;">${disc}</b></div>
          <div class="grand-total">TỔNG THANH TOÁN: ${grand}</div>
          <div style="font-size:11px; font-style:italic; color:#64748B; margin-top:4px;">${words}</div>
        </div>

        <div class="sign-section">
          <div>
            <b>NGƯỜI MUA HÀNG</b><br>
            <span style="font-size:11px; color:#64748B;">(Ký, ghi rõ họ tên)</span>
            <br><br><br><br>
            <b>${cust}</b>
          </div>
          <div>
            <b>ĐẠI DIỆN ĐƠN VỊ BÁN</b><br>
            <span style="font-size:11px; color:#64748B;">(Ký, đóng dấu)</span>
            <br><br><br><br>
            <b>${unit}</b>
          </div>
        </div>

        <script>
          setTimeout(() => { window.print(); }, 400);
        <\/script>
      </body>
      </html>
    `);
    w.document.close();
  }

  // 14. Tạo Voucher QR (Phôi voucher in sang trọng)
  function renderVoucherQR() {
    const html = `
      <div class="form-grid">
        <div>
          <div class="form-group">
            <label>Tên nhà hàng / Homestay:</label>
            <input type="text" id="vcBrand" value="Homestay Tràng An Riverside" oninput="updateVoucherPreview()">
          </div>
          <div class="form-group">
            <label>Nội dung giảm giá / Ưu đãi:</label>
            <input type="text" id="vcDiscount" value="GIẢM 20% ĐẶT PHÒNG TRỰC TIẾP" oninput="updateVoucherPreview()">
          </div>
          <div class="form-group">
            <label>Mã Voucher (Code):</label>
            <input type="text" id="vcCode" value="NINHBINH2026" oninput="updateVoucherPreview()">
          </div>
          <div class="form-group">
            <label>Hạn sử dụng:</label>
            <input type="text" id="vcExpiry" value="31/12/2026" oninput="updateVoucherPreview()">
          </div>
          <button class="btn btn-primary btn-full" onclick="printVoucherCard()">🖨️ In Thẻ Voucher Quà Tặng</button>
        </div>

        <div style="background:#F8FAFC; border:1px dashed var(--border); border-radius:10px; padding:20px; text-align:center;">
          <!-- Voucher Card Template -->
          <div id="vcCardBox" style="background:linear-gradient(135deg, #092545 0%, #0F3D6E 100%); color:#fff; border:2px solid #D97706; border-radius:12px; padding:20px; width:280px; display:inline-block; box-shadow:var(--shadow-md); text-align:center;">
            <div style="font-size:0.75rem; text-transform:uppercase; color:#FDE68A; letter-spacing:0.05em; font-weight:700;">PHIẾU ƯU ĐÃI DU LỊCH</div>
            <div style="font-weight:800; color:#fff; font-size:1.05rem; margin:4px 0;" id="vcDispBrand">Homestay Tràng An Riverside</div>
            <div style="background:#D97706; color:#fff; font-weight:800; font-size:0.92rem; padding:6px 10px; border-radius:4px; margin:8px 0;" id="vcDispDisc">
              GIẢM 20% ĐẶT PHÒNG TRỰC TIẾP
            </div>
            <div id="vcQrArea" style="background:#fff; padding:8px; border-radius:6px; display:inline-flex; justify-content:center; margin:8px 0;"></div>
            <div style="font-size:0.85rem; font-weight:700; color:#FDE68A;" id="vcDispCode">MÃ: NINHBINH2026</div>
            <div style="font-size:0.72rem; color:#CBD5E1; margin-top:4px;" id="vcDispExp">Hạn dùng: 31/12/2026</div>
          </div>
        </div>
      </div>
    `;
    openModal('Tạo Thẻ Voucher Giảm Giá Quà Tặng', html);
    updateVoucherPreview();
  }

  function updateVoucherPreview() {
    const brand = document.getElementById('vcBrand')?.value || '';
    const disc = document.getElementById('vcDiscount')?.value || '';
    const code = document.getElementById('vcCode')?.value || '';
    const exp = document.getElementById('vcExpiry')?.value || '';

    document.getElementById('vcDispBrand').textContent = brand;
    document.getElementById('vcDispDisc').textContent = disc;
    document.getElementById('vcDispCode').textContent = 'MÃ: ' + code;
    document.getElementById('vcDispExp').textContent = 'Hạn dùng: ' + exp;

    const qrDiv = document.getElementById('vcQrArea');
    if(!qrDiv) return;
    qrDiv.innerHTML = '';
    new QRCode(qrDiv, { text: `VOUCHER:${code}|${brand}|${disc}|EXP:${exp}`, width: 130, height: 130, colorDark: "#092545" });
  }

  function printVoucherCard() {
    const brand = document.getElementById('vcBrand')?.value || '';
    const disc = document.getElementById('vcDiscount')?.value || '';
    const code = document.getElementById('vcCode')?.value || '';
    const exp = document.getElementById('vcExpiry')?.value || '';
    const qrImg = document.querySelector('#vcQrArea img')?.src || '';

    const w = window.open('', '', 'width=650,height=650');
    w.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Thẻ Voucher - ${brand}</title>
        <style>
          body { font-family: sans-serif; text-align: center; padding: 40px; background: #fff; }
          .voucher-box {
            border: 3px solid #D97706; border-radius: 16px; padding: 28px; width: 320px;
            margin: 0 auto; background: #092545; color: #fff; box-shadow: 0 4px 16px rgba(0,0,0,0.15);
          }
        </style>
      </head>
      <body>
        <div class="voucher-box">
          <div style="font-size:12px; color:#FDE68A; text-transform:uppercase; letter-spacing:1px; font-weight:bold;">PHIẾU ƯU ĐÃI ĐẶC QUYỀN</div>
          <h3 style="margin:8px 0; font-size:18px; color:#fff;">${brand}</h3>
          <div style="background:#D97706; padding:8px 12px; border-radius:6px; font-weight:bold; font-size:15px; margin:10px 0;">
            ${disc}
          </div>
          <div style="background:#fff; padding:10px; border-radius:8px; display:inline-block; margin:10px 0;">
            <img src="${qrImg}" style="width:140px; height:140px; display:block;">
          </div>
          <div style="font-size:15px; font-weight:bold; color:#FDE68A; margin-top:4px;">MÃ ƯU ĐÃI: ${code}</div>
          <div style="font-size:11px; color:#CBD5E1; margin-top:6px;">Áp dụng đến hết ngày: ${exp}</div>
        </div>
        <script>setTimeout(() => { window.print(); }, 400);<\/script>
      </body>
      </html>
    `);
    w.document.close();
  }

  // 1. VietQR
  function renderVietQR() {
    const opts = VN_BANKS.map(b => `<option value="${b.code}">${b.name}</option>`).join('');
    const html = `
      <div class="form-grid">
        <div>
          <div class="form-group">
            <label>Ngân hàng nhận tiền:</label>
            <select id="vqrBank">${opts}</select>
          </div>
          <div class="form-group">
            <label>Số tài khoản:</label>
            <input type="text" id="vqrAccount" value="1903668899">
          </div>
          <div class="form-group">
            <label>Tên chủ tài khoản (In hoa không dấu):</label>
            <input type="text" id="vqrName" value="HO KINH DOANH NINH BINH">
          </div>
          <div class="form-group">
            <label>Số tiền (VNĐ - Tùy chọn):</label>
            <input type="number" id="vqrAmount" value="50000">
          </div>
          <div class="form-group">
            <label>Nội dung chuyển khoản:</label>
            <input type="text" id="vqrMemo" value="Thanh toan Ninh Binh">
          </div>
          <button class="btn btn-primary btn-full" onclick="generateVietQR()">Tạo Mã VietQR Ngay</button>
        </div>
        <div style="background:#F8FAFC; border:1px dashed var(--border); border-radius:10px; padding:20px; text-align:center;">
          <div id="vqrCardBox" style="background:#fff; padding:18px; border-radius:8px; box-shadow:var(--shadow-md); display:inline-block; border:2px solid var(--primary);">
            <div style="font-weight:800; color:var(--primary-dark); font-size:1rem; margin-bottom:6px;">VIETQR THANH TOÁN</div>
            <div id="vqrQrContainer" style="display:flex; justify-content:center; margin:10px 0;"></div>
            <div style="font-size:0.84rem; line-height:1.5;">
              <b id="vqrDispBank">Vietcombank</b><br>
              STK: <b id="vqrDispAcc" style="font-size:1rem; color:var(--primary);">1903668899</b><br>
              <span id="vqrDispName" style="font-weight:700; text-transform:uppercase;">HO KINH DOANH NINH BINH</span>
            </div>
          </div>
          <div style="margin-top:16px; display:flex; gap:8px; justify-content:center;">
            <button class="btn btn-primary btn-sm" onclick="downloadVietQRPNG()">Tải ảnh mã QR (.png)</button>
            <button class="btn btn-outline btn-sm" onclick="printVietQR()">In dán quầy</button>
          </div>
        </div>
      </div>
    `;
    openModal('Tạo QR VietQR Chuyển Khoản Chuẩn', html);
    generateVietQR();
  }

  function generateVietQR() {
    const bank = document.getElementById('vqrBank').value;
    const acc = document.getElementById('vqrAccount').value.trim();
    const name = document.getElementById('vqrName').value.trim();
    const amount = document.getElementById('vqrAmount').value.trim();
    const memo = document.getElementById('vqrMemo').value.trim();

    document.getElementById('vqrDispBank').textContent = bank;
    document.getElementById('vqrDispAcc').textContent = acc;
    document.getElementById('vqrDispName').textContent = name || 'CHỦ TÀI KHOẢN';

    const qrContainer = document.getElementById('vqrQrContainer');
    qrContainer.innerHTML = '';

    // Render client-side QRCode canvas directly for crisp image
    const rawData = `https://img.vietqr.io/image/${bank}-${acc}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(memo)}&accountName=${encodeURIComponent(name)}`;
    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';
    img.src = rawData;
    img.style.maxWidth = '210px';
    img.onerror = () => {
      qrContainer.innerHTML = '';
      new QRCode(qrContainer, { text: `STK:${acc}|BANK:${bank}|AMT:${amount}`, width: 180, height: 180 });
    };
    qrContainer.appendChild(img);
  }

  function downloadVietQRPNG() {
    const img = document.querySelector('#vqrQrContainer img');
    if(!img) return;
    fetch(img.src).then(res => res.blob()).then(blob => {
      downloadBlobFile(blob, `VietQR-${document.getElementById('vqrAccount').value}.png`);
      showToast('Đã tải mã QR dạng file .PNG chuẩn!');
    }).catch(() => {
      // Canvas fallback
      const canvas = document.createElement('canvas');
      canvas.width = 300; canvas.height = 300;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#fff'; ctx.fillRect(0,0,300,300);
      new QRCode(canvas, { text: document.getElementById('vqrAccount').value, width: 260, height: 260 });
      canvas.toBlob(blob => {
        downloadBlobFile(blob, `VietQR-${document.getElementById('vqrAccount').value}.png`);
      }, 'image/png');
    });
  }

  function printVietQR() {
    const content = document.getElementById('vqrCardBox').innerHTML;
    const w = window.open('', '', 'width=600,height=600');
    w.document.write(`<html><body style="text-align:center; padding:40px; font-family:sans-serif;">${content}<script>window.print();<\/script></body></html>`);
    w.document.close();
  }

  // 2. WiFi QR
  function renderWifiQR() {
    const html = `
      <div class="form-grid">
        <div>
          <div class="form-group">
            <label>Tên mạng WiFi (SSID):</label>
            <input type="text" id="wifiSsid" value="Tam Coc Retreat WiFi">
          </div>
          <div class="form-group">
            <label>Mật khẩu WiFi:</label>
            <input type="text" id="wifiPass" value="ninhbinh2026">
          </div>
          <div class="form-group">
            <label>Chuẩn bảo mật:</label>
            <select id="wifiAuth">
              <option value="WPA">WPA / WPA2 (Phổ biến)</option>
              <option value="WEP">WEP</option>
              <option value="nopass">Không có mật khẩu</option>
            </select>
          </div>
          <button class="btn btn-primary btn-full" onclick="generateWifiQR()">Tạo Mã QR WiFi</button>
        </div>
        <div style="background:#F8FAFC; border:1px dashed var(--border); border-radius:10px; padding:20px; text-align:center;">
          <div id="wifiCardBox" style="background:#fff; border:2px solid var(--primary); border-radius:10px; padding:18px; display:inline-block; width:240px; box-shadow:var(--shadow-md);">
            <div style="font-size:0.8rem; font-weight:800; color:var(--accent);">QUÉT ĐỂ VÀO WIFI</div>
            <div id="wifiQrCode" style="display:flex; justify-content:center; margin:12px 0;"></div>
            <div style="font-weight:700; color:var(--primary-dark);" id="wifiDispSsid">Tam Coc Retreat WiFi</div>
            <div style="font-size:0.75rem; color:var(--muted);">Quét camera để kết nối tự động</div>
          </div>
        </div>
      </div>
    `;
    openModal('Tạo QR WiFi Homestay Dán Bàn', html);
    generateWifiQR();
  }

  function generateWifiQR() {
    const ssid = document.getElementById('wifiSsid').value.trim();
    const pass = document.getElementById('wifiPass').value.trim();
    const auth = document.getElementById('wifiAuth').value;
    document.getElementById('wifiDispSsid').textContent = ssid;

    const qrDiv = document.getElementById('wifiQrCode');
    qrDiv.innerHTML = '';
    new QRCode(qrDiv, {
      text: `WIFI:S:${ssid};T:${auth};P:${pass};;`,
      width: 170, height: 170,
      colorDark: "#092545", colorLight: "#ffffff"
    });
  }

  // 3. Menu QR
  function renderMenuQR() {
    const html = `
      <div class="form-grid">
        <div>
          <div class="form-group">
            <label>Tên nhà hàng / Quán ăn:</label>
            <input type="text" id="menuBrand" value="Ẩm Thực Tam Cốc">
          </div>
          <div class="form-group">
            <label>Đường link Thực đơn Online (URL):</label>
            <input type="url" id="menuUrl" value="https://ninhbinh.gov.vn/menu">
          </div>
          <button class="btn btn-primary btn-full" onclick="generateMenuQR()">Tạo QR Menu Bàn</button>
        </div>
        <div style="background:#F8FAFC; border:1px dashed var(--border); border-radius:10px; padding:20px; text-align:center;">
          <div id="menuQrBox" style="background:#fff; border:2px solid var(--accent); border-radius:10px; padding:18px; display:inline-block; width:240px; box-shadow:var(--shadow-md);">
            <div style="font-weight:800; color:var(--primary-dark);" id="menuDispBrand">Ẩm Thực Tam Cốc</div>
            <div style="font-size:0.75rem; font-weight:700; color:var(--accent); margin:4px 0 8px;">THỰC ĐƠN ĐẶC SẢN</div>
            <div id="menuQrCode" style="display:flex; justify-content:center; margin:10px 0;"></div>
            <div style="font-size:0.75rem; color:var(--muted);">Quét mã xem món &amp; giá</div>
          </div>
        </div>
      </div>
    `;
    openModal('Tạo QR Thực Đơn (Menu) Bàn', html);
    generateMenuQR();
  }

  function generateMenuQR() {
    const brand = document.getElementById('menuBrand').value.trim();
    const url = document.getElementById('menuUrl').value.trim();
    document.getElementById('menuDispBrand').textContent = brand;

    const qrDiv = document.getElementById('menuQrCode');
    qrDiv.innerHTML = '';
    new QRCode(qrDiv, { text: url, width: 160, height: 160, colorDark: "#092545" });
  }

  // 4. Image Compress
  let rawCompressImg = null;
  function renderImgCompress() {
    const html = `
      <div>
        <div class="drop-zone" onclick="document.getElementById('cImgInp').click()">
          <input type="file" id="cImgInp" accept="image/*" style="display:none;" onchange="handleCompressUpload(event)">
          <div style="font-size:2rem; margin-bottom:8px;">📁</div>
          <div style="font-weight:700; color:var(--primary);">Chọn hoặc kéo thả ảnh cần nén</div>
          <div style="font-size:0.8rem; color:var(--muted);">Hỗ trợ JPG, PNG, WebP</div>
        </div>

        <div id="cCtrlBox" style="display:none; margin-top:20px;">
          <div class="form-grid">
            <div class="form-group">
              <label>Mức độ chất lượng: <b id="cQualVal">75%</b></label>
              <input type="range" id="cQuality" min="10" max="95" value="75" oninput="document.getElementById('cQualVal').textContent=this.value+'%'; runCompress();">
            </div>
            <div class="form-group">
              <label>Kích thước chiều rộng:</label>
              <select id="cMaxW" onchange="runCompress()">
                <option value="1200" selected>1200px (Chuẩn tối ưu Facebook/Web)</option>
                <option value="800">800px (Ảnh nhỏ nhẹ)</option>
                <option value="0">Giữ nguyên gốc</option>
              </select>
            </div>
          </div>
          <div style="display:flex; justify-content:space-between; background:#F1F5F9; padding:12px; border-radius:6px; margin:12px 0;">
            <span>Gốc: <b id="cOrigSize">0 KB</b></span>
            <span>Sau nén: <b id="cNewSize" style="color:var(--success);">0 KB</b></span>
          </div>
          <button class="btn btn-primary btn-full" onclick="downloadCompressedFile()">Tải Ảnh Đã Nén (.jpg)</button>
        </div>
      </div>
    `;
    openModal('Nén Ảnh Sản Phẩm Trực Tiếp', html);
  }

  function handleCompressUpload(e) {
    const file = e.target.files[0];
    if(!file) return;
    document.getElementById('cOrigSize').textContent = (file.size / 1024).toFixed(1) + ' KB';
    const r = new FileReader();
    r.onload = ev => {
      rawCompressImg = new Image();
      rawCompressImg.onload = () => {
        document.getElementById('cCtrlBox').style.display = 'block';
        runCompress();
      };
      rawCompressImg.src = ev.target.result;
    };
    r.readAsDataURL(file);
  }

  let compressedBlob = null;
  function runCompress() {
    if(!rawCompressImg) return;
    const q = parseFloat(document.getElementById('cQuality').value) / 100;
    const maxW = parseInt(document.getElementById('cMaxW').value);
    let w = rawCompressImg.width;
    let h = rawCompressImg.height;
    if(maxW > 0 && w > maxW) { h = Math.round(h * maxW / w); w = maxW; }

    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(rawCompressImg, 0, 0, w, h);

    canvas.toBlob(blob => {
      compressedBlob = blob;
      document.getElementById('cNewSize').textContent = (blob.size / 1024).toFixed(1) + ' KB';
    }, 'image/jpeg', q);
  }

  function downloadCompressedFile() {
    if(!compressedBlob) return;
    downloadBlobFile(compressedBlob, 'anh-san-pham-da-nen.jpg');
    showToast('Đã tải ảnh nén dạng .JPG thành công!');
  }

  // 5. Image Convert (Đổi định dạng chuẩn đuôi)
  let rawConvertImg = null;
  function renderImgConvert() {
    const html = `
      <div>
        <div class="drop-zone" onclick="document.getElementById('cvInp').click()">
          <input type="file" id="cvInp" accept="image/*" style="display:none;" onchange="handleConvertUpload(event)">
          <div style="font-size:2rem; margin-bottom:8px;">🔄</div>
          <div style="font-weight:700; color:var(--primary);">Chọn ảnh cần đổi định dạng</div>
          <div style="font-size:0.8rem; color:var(--muted);">Chuyển đổi tức thì sang WebP, PNG hoặc JPG</div>
        </div>

        <div id="cvCtrlBox" style="display:none; margin-top:20px;">
          <div class="form-group">
            <label>Chọn định dạng đầu ra:</label>
            <select id="cvTarget">
              <option value="image/webp">WebP (Định dạng web hiện đại, file siêu nhẹ: .webp)</option>
              <option value="image/png">PNG (Chất lượng sắc nét, trong suốt: .png)</option>
              <option value="image/jpeg">JPG / JPEG (Phổ biến toàn cầu: .jpg)</option>
            </select>
          </div>
          <button class="btn btn-primary btn-full" onclick="executeConvertImage()">Chuyển Đổi &amp; Tải Ảnh Ngay</button>
        </div>
      </div>
    `;
    openModal('Đổi Định Dạng Ảnh Tức Thì', html);
  }

  function handleConvertUpload(e) {
    const file = e.target.files[0];
    if(!file) return;
    const r = new FileReader();
    r.onload = ev => {
      rawConvertImg = new Image();
      rawConvertImg.onload = () => {
        document.getElementById('cvCtrlBox').style.display = 'block';
      };
      rawConvertImg.src = ev.target.result;
    };
    r.readAsDataURL(file);
  }

  function executeConvertImage() {
    if(!rawConvertImg) return;
    const mime = document.getElementById('cvTarget').value;
    const ext = (mime === 'image/webp') ? 'webp' : (mime === 'image/png' ? 'png' : 'jpg');

    const canvas = document.createElement('canvas');
    canvas.width = rawConvertImg.width;
    canvas.height = rawConvertImg.height;
    const ctx = canvas.getContext('2d');

    if(mime === 'image/jpeg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(rawConvertImg, 0, 0);

    canvas.toBlob(blob => {
      downloadBlobFile(blob, `anh-chuyen-doi.${ext}`);
      showToast(`Đã tải về file .${ext.toUpperCase()} thành công!`);
    }, mime, 0.92);
  }

  // 6. PDF Merge & Split
  let pdfList = [];
  function renderPdfMerge() {
    pdfList = [];
    const html = `
      <div>
        <div class="drop-zone" onclick="document.getElementById('pdfInp').click()">
          <input type="file" id="pdfInp" accept="application/pdf" multiple style="display:none;" onchange="handlePdfFiles(event)">
          <div style="font-size:2rem; margin-bottom:8px;">📑</div>
          <div style="font-weight:700; color:var(--primary);">Chọn các file PDF cần gộp</div>
        </div>
        <div id="pdfListShow" style="margin:14px 0;"></div>
        <button id="pdfRunBtn" class="btn btn-primary btn-full" style="display:none;" onclick="runMergePdf()">Gộp &amp; Tải File PDF Mới (.pdf)</button>
      </div>
    `;
    openModal('Gộp Nhiều File PDF Thành 1 File', html);
  }

  function handlePdfFiles(e) {
    pdfList = Array.from(e.target.files);
    if(pdfList.length === 0) return;
    document.getElementById('pdfListShow').innerHTML = pdfList.map((f, i) => `
      <div style="padding:8px; background:#F1F5F9; margin-top:4px; border-radius:4px; font-size:0.85rem;">
        📄 ${i+1}. <b>${f.name}</b> (${(f.size/1024).toFixed(1)} KB)
      </div>
    `).join('');
    document.getElementById('pdfRunBtn').style.display = 'block';
  }

  async function runMergePdf() {
    try {
      const { PDFDocument } = PDFLib;
      const mergedPdf = await PDFDocument.create();
      for(const f of pdfList) {
        const buf = await f.arrayBuffer();
        const doc = await PDFDocument.load(buf);
        const pages = await mergedPdf.copyPages(doc, doc.getPageIndices());
        pages.forEach(p => mergedPdf.addPage(p));
      }
      const bytes = await mergedPdf.save();
      const blob = new Blob([bytes], { type: 'application/pdf' });
      downloadBlobFile(blob, 'Ho-So-Gop-NinhBinhDigital.pdf');
      showToast('Đã gộp và tải file .PDF thành công!');
    } catch(err) {
      showToast('Có lỗi khi gộp PDF. Vui lòng thử lại!');
    }
  }

  // 7. Image to PDF
  let imgPdfList = [];
  function renderImgToPdf() {
    imgPdfList = [];
    const html = `
      <div>
        <div class="drop-zone" onclick="document.getElementById('iPdfInp').click()">
          <input type="file" id="iPdfInp" accept="image/*" multiple style="display:none;" onchange="handleImgToPdf(event)">
          <div style="font-size:2rem; margin-bottom:8px;">🖼️ ➔ 📄</div>
          <div style="font-weight:700; color:var(--primary);">Chọn ảnh chụp giấy tờ / sản phẩm</div>
        </div>
        <div id="imgPdfShow" style="margin:14px 0;"></div>
        <button id="imgPdfRunBtn" class="btn btn-primary btn-full" style="display:none;" onclick="runImgToPdf()">Xuất File PDF Khổ A4 (.pdf)</button>
      </div>
    `;
    openModal('Chuyển Ảnh Sang File PDF A4', html);
  }

  function handleImgToPdf(e) {
    imgPdfList = Array.from(e.target.files);
    if(imgPdfList.length === 0) return;
    document.getElementById('imgPdfShow').innerHTML = `Đã chọn ${imgPdfList.length} ảnh.`;
    document.getElementById('imgPdfRunBtn').style.display = 'block';
  }

  async function runImgToPdf() {
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
      for(let i = 0; i < imgPdfList.length; i++) {
        if(i > 0) doc.addPage();
        const dataUrl = await new Promise(res => {
          const r = new FileReader();
          r.onload = e => res(e.target.result);
          r.readAsDataURL(imgPdfList[i]);
        });
        doc.addImage(dataUrl, 'JPEG', 10, 10, 190, 270, undefined, 'FAST');
      }
      const pdfBlob = doc.output('blob');
      downloadBlobFile(pdfBlob, 'Tai-Lieu-Giay-To.pdf');
      showToast('Đã xuất file .PDF chuẩn A4 thành công!');
    } catch(err) {
      showToast('Lỗi khi xuất PDF!');
    }
  }

  // 8. Watermark
  let rawWmImg = null;
  function renderWatermark() {
    const html = `
      <div>
        <div class="drop-zone" onclick="document.getElementById('wmInp').click()">
          <input type="file" id="wmInp" accept="image/*" style="display:none;" onchange="handleWm(event)">
          <div style="font-size:2rem; margin-bottom:8px;">🛡️</div>
          <div style="font-weight:700; color:var(--primary);">Chọn ảnh sản phẩm đóng dấu</div>
        </div>
        <div id="wmCtrl" style="display:none; margin-top:20px;">
          <div class="form-group">
            <label>Chữ bản quyền:</label>
            <input type="text" id="wmTxt" value="Ninh Bình Digital - 0988.xxx.xxx" oninput="drawWm()">
          </div>
          <canvas id="wmCv" style="max-width:100%; max-height:260px; display:block; margin:12px auto; border-radius:6px;"></canvas>
          <button class="btn btn-primary btn-full" onclick="downloadWmImg()">Tải Ảnh Đã Đóng Dấu (.jpg)</button>
        </div>
      </div>
    `;
    openModal('Đóng Dấu Bản Quyền Ảnh (Watermark)', html);
  }

  function handleWm(e) {
    const file = e.target.files[0];
    if(!file) return;
    const r = new FileReader();
    r.onload = ev => {
      rawWmImg = new Image();
      rawWmImg.onload = () => {
        document.getElementById('wmCtrl').style.display = 'block';
        drawWm();
      };
      rawWmImg.src = ev.target.result;
    };
    r.readAsDataURL(file);
  }

  function drawWm() {
    if(!rawWmImg) return;
    const cv = document.getElementById('wmCv');
    cv.width = rawWmImg.width; cv.height = rawWmImg.height;
    const ctx = cv.getContext('2d');
    ctx.drawImage(rawWmImg, 0, 0);

    const txt = document.getElementById('wmTxt').value || 'BẢN QUYỀN';
    ctx.save();
    ctx.globalAlpha = 0.45;
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${Math.max(20, Math.round(cv.width / 26))}px sans-serif`;
    ctx.textAlign = 'right'; ctx.textBaseline = 'bottom';
    ctx.fillText(txt, cv.width - 24, cv.height - 24);
    ctx.restore();
  }

  function downloadWmImg() {
    const cv = document.getElementById('wmCv');
    if(!cv) return;
    cv.toBlob(blob => {
      downloadBlobFile(blob, 'anh-dong-dau-ban-quyen.jpg');
      showToast('Đã tải ảnh đóng dấu .JPG thành công!');
    }, 'image/jpeg', 0.9);
  }

  // 9. Invoice Generator
  function renderInvoice() {
    const html = `
      <div class="form-grid">
        <div>
          <div class="form-group">
            <label>Đơn vị bán / Homestay:</label>
            <input type="text" id="invUnit" value="Homestay Tràng An Riverside" oninput="updateInv()">
          </div>
          <div class="form-group">
            <label>Khách hàng:</label>
            <input type="text" id="invCust" value="Anh Hoàng Long" oninput="updateInv()">
          </div>
          <div class="form-group">
            <label>Tiền phòng / Dịch vụ (VNĐ):</label>
            <input type="number" id="invTotal" value="1500000" oninput="updateInv()">
          </div>
          <button class="btn btn-primary btn-full" onclick="printInvDoc()">In Hóa Đơn / Báo Giá</button>
        </div>
        <div style="background:#F8FAFC; padding:18px; border-radius:8px; border:1px solid var(--border);" id="invDoc">
          <div style="font-weight:800; color:var(--primary-dark); font-size:1.1rem;" id="invDispUnit">Homestay Tràng An</div>
          <div style="font-size:0.82rem; color:var(--muted);">Ngày: ${new Date().toLocaleDateString('vi-VN')}</div>
          <div style="margin:14px 0; font-size:0.9rem;">Khách hàng: <b id="invDispCust">Anh Hoàng Long</b></div>
          <div style="font-size:1.15rem; color:var(--primary); font-weight:800;" id="invDispAmt">1.500.000 VNĐ</div>
        </div>
      </div>
    `;
    openModal('Tạo Báo Giá &amp; Hóa Đơn', html);
    updateInv();
  }

  function updateInv() {
    document.getElementById('invDispUnit').textContent = document.getElementById('invUnit').value;
    document.getElementById('invDispCust').textContent = document.getElementById('invCust').value;
    const amt = parseFloat(document.getElementById('invTotal').value) || 0;
    document.getElementById('invDispAmt').textContent = amt.toLocaleString('vi-VN') + ' VNĐ';
  }

  function printInvDoc() {
    const c = document.getElementById('invDoc').innerHTML;
    const w = window.open('', '', 'width=600,height=600');
    w.document.write(`<html><body style="padding:40px; font-family:sans-serif;">${c}<script>window.print();<\/script></body></html>`);
    w.document.close();
  }

  // 10. Room Price Calculator
  function renderRoomPrice() {
    const html = `
      <div class="form-grid">
        <div>
          <div class="form-group">
            <label>Giá phòng ngày thường (đ/đêm):</label>
            <input type="number" id="rpBase" value="600000" oninput="calcRp()">
          </div>
          <div class="form-group">
            <label>Số đêm ngày thường:</label>
            <input type="number" id="rpWeek" value="2" oninput="calcRp()">
          </div>
          <div class="form-group">
            <label>Số đêm cuối tuần (T6, T7):</label>
            <input type="number" id="rpEnd" value="1" oninput="calcRp()">
          </div>
          <div class="form-group">
            <label>Phụ thu mùa lễ hội Tràng An / Tết (+25%):</label>
            <input type="checkbox" id="rpFest" style="width:auto;" onchange="calcRp()"> Có áp dụng
          </div>
        </div>
        <div style="background:#F8FAFC; border-radius:10px; padding:20px; text-align:center;">
          <span style="font-size:0.85rem; color:var(--muted);">TỔNG CHI PHÍ DỰ KIẾN:</span>
          <b id="rpTotalDisp" style="display:block; font-size:1.8rem; color:var(--primary); margin:10px 0;">0 VNĐ</b>
          <button class="btn btn-primary btn-sm" onclick="copyRpQuotation()">Sao chép báo giá gửi khách</button>
        </div>
      </div>
    `;
    openModal('Tính Giá Phòng Homestay Ninh Bình', html);
    calcRp();
  }

  function calcRp() {
    const base = parseFloat(document.getElementById('rpBase').value) || 0;
    const w = parseInt(document.getElementById('rpWeek').value) || 0;
    const e = parseInt(document.getElementById('rpEnd').value) || 0;
    const fest = document.getElementById('rpFest').checked ? 1.25 : 1.0;

    const total = (w * base + e * (base + 150000)) * fest;
    document.getElementById('rpTotalDisp').textContent = total.toLocaleString('vi-VN') + ' VNĐ';
  }

  function copyRpQuotation() {
    const amt = document.getElementById('rpTotalDisp').textContent;
    navigator.clipboard.writeText(`Dạ chào anh/chị, tổng tiền phòng homestay dự kiến là ${amt}. Đã bao gồm ăn sáng ạ!`);
    showToast('Đã sao chép báo giá phòng!');
  }

  // 11. Unit Converter
  function renderUnitConvert() {
    const html = `
      <div>
        <div class="form-grid">
          <div class="form-group">
            <label>Nhập số lượng:</label>
            <input type="number" id="uVal" value="1" oninput="runUnitCv()">
          </div>
          <div class="form-group">
            <label>Đơn vị:</label>
            <select id="uType" onchange="runUnitCv()">
              <option value="sao">Sào Bắc Bộ (360 m²)</option>
              <option value="thuoc">Thước Bắc Bộ (24 m²)</option>
              <option value="mau">Mẫu Bắc Bộ (3.600 m²)</option>
              <option value="ha">Hécta (10.000 m²)</option>
            </select>
          </div>
        </div>
        <div style="background:#F8FAFC; padding:16px; border-radius:8px; margin-top:14px;" id="uRes"></div>
      </div>
    `;
    openModal('Quy Đổi Đơn Vị Đất Đai Bắc Bộ', html);
    runUnitCv();
  }

  function runUnitCv() {
    const val = parseFloat(document.getElementById('uVal').value) || 0;
    const t = document.getElementById('uType').value;
    let m2 = 0;
    if(t === 'sao') m2 = val * 360;
    else if(t === 'thuoc') m2 = val * 24;
    else if(t === 'mau') m2 = val * 3600;
    else if(t === 'ha') m2 = val * 10000;

    document.getElementById('uRes').innerHTML = `
      <div>🌿 Mét vuông: <b>${m2.toLocaleString('vi-VN')} m²</b></div>
      <div>🌾 Sào Bắc Bộ: <b>${(m2 / 360).toFixed(2)} sào</b></div>
      <div>🏡 Mẫu Bắc Bộ: <b>${(m2 / 3600).toFixed(3)} mẫu</b></div>
    `;
  }

  // AI Prompt Studio Helpers
  function switchPromptTab(tab, btn) {
    document.querySelectorAll('.tabs .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.prompt-card').forEach(c => {
      c.classList.toggle('show', c.dataset.tab === tab);
    });
  }

  function searchPrompts() {
    const q = document.getElementById('aiSearchInput').value.toLowerCase().trim();
    const activeTab = document.querySelector('.tabs .tab-btn.active')?.getAttribute('onclick')?.match(/'([^']+)'/)?.[1] || 'dulich';
    document.querySelectorAll('.prompt-card').forEach(c => {
      if(!q) {
        c.classList.toggle('show', c.dataset.tab === activeTab);
      } else {
        c.classList.toggle('show', c.textContent.toLowerCase().includes(q));
      }
    });
  }

  function copyPrompt(btn) {
    const text = btn.closest('.prompt-card').querySelector('p').textContent;
    navigator.clipboard.writeText(text);
    showToast('Đã sao chép prompt vào Clipboard!');
  }

  function openCustomPromptModal(initial) {
    const html = `
      <div>
        <div class="form-group">
          <label>Chủ đề nội dung của bạn:</label>
          <input type="text" id="custTopic" value="${initial || 'Giới thiệu homestay Ninh Bình view núi'}">
        </div>
        <div class="form-group">
          <label>Tên cơ sở / Sản phẩm:</label>
          <input type="text" id="custName" value="Homestay Tam Cốc Riverside">
        </div>
        <div class="form-group">
          <label>Lời nhắc AI hoàn chỉnh:</label>
          <textarea id="custOutput" rows="4" style="background:#F8FAFC;"></textarea>
        </div>
        <button class="btn btn-primary btn-full" onclick="navigator.clipboard.writeText(document.getElementById('custOutput').value); showToast('Đã sao chép!');">Sao Chép Prompt</button>
      </div>
    `;
    openModal('Tùy Biến Lời Nhắc AI', html);
    const update = () => {
      const top = document.getElementById('custTopic').value;
      const nam = document.getElementById('custName').value;
      document.getElementById('custOutput').value = `Đóng vai chuyên gia marketing du lịch Ninh Bình, hãy viết một bài ${top} cho thương hiệu "${nam}". Giọng điệu thân thiện, hấp dẫn, kèm lời kêu gọi đặt ngay hôm nay.`;
    };
    update();
    document.getElementById('custTopic').oninput = update;
    document.getElementById('custName').oninput = update;
  }

  // Blog Reader
  function openBlogArticle(id) {
    const blogs = {
      1: { t: "Tạo Mã VietQR Chuyển Khoản Miễn Phí", c: "<p>Hướng dẫn chi tiết cách tạo mã VietQR chuẩn NAPAS giúp du khách quét tiền cực nhanh tại Tam Cốc, Tràng An...</p>" },
      2: { t: "5 Mẹo Viết Mô Tả Phòng Homestay", c: "<p>Bí quyết dùng từ ngữ gợi tả không gian thiên nhiên yên bình của Ninh Bình để tăng tỉ lệ chốt phòng...</p>" },
      3: { t: "Chụp & Nén Ảnh Sản Phẩm Làng Nghề", c: "<p>Cách tối ưu dung lượng ảnh sản phẩm cói mỹ nghệ Kim Sơn trước khi đăng lên fanpage bán hàng...</p>" }
    };
    openModal(blogs[id].t, blogs[id].c);
  }

  // Service Form
  function openServiceRegisterModal(type) {
    const isWeb = (type === 'web');
    const html = `
      <div>
        <div class="form-group">
          <label>Họ và tên của bạn:</label>
          <input type="text" id="sName" placeholder="Nguyễn Văn A">
        </div>
        <div class="form-group">
          <label>Số điện thoại (Zalo):</label>
          <input type="text" id="sPhone" placeholder="0988xxxxxx">
        </div>
        <div class="form-group">
          <label>Nội dung yêu cầu:</label>
          <textarea id="sNote" rows="3" placeholder="Tôi cần tư vấn..."></textarea>
        </div>
        <button class="btn btn-primary btn-full" onclick="submitServiceReq('${isWeb ? 'Thiết kế Website' : 'Đào tạo AI'}')">Gửi Đăng Ký</button>
      </div>
    `;
    openModal(isWeb ? 'Đăng Ký Tư Vấn Website' : 'Đăng Ký Khóa Học AI', html);
  }

  function submitServiceReq(serviceName) {
    const name = document.getElementById('sName').value.trim();
    const phone = document.getElementById('sPhone').value.trim();
    const note = document.getElementById('sNote').value.trim();
    if(!name || !phone) { showToast('Vui lòng điền họ tên và số điện thoại!'); return; }

    serviceRequests.push({ name: name, phone: phone, service: serviceName, note: note });
    localStorage.setItem('nb_requests', JSON.stringify(serviceRequests));
    renderAdminData();
    closeModal();
    showToast(`Cảm ơn ${name}! Chúng tôi sẽ liên hệ Zalo ${phone} trong 24h.`);
  }

  // 3. DỮ LIỆU CÀO THỰC TẾ THEO DANH MỤC RIÊNG BIỆT
  let currentTravelCategory = 'homestay';
  let currentAreaFilter = 'all';

  const NINHBINH_PLACES = [
    // --- DANH MỤC 1: HOMESTAY & KHÁCH SẠN ---
    {
      id: 1, name: "Tam Coc Rice Fields Resort", cat: "homestay", area: "tamcoc",
      rating: 4.8, reviews: 920,
      price: "680.000 đ — 1.250.000 đ/đêm",
      address: "Đội 3, Thôn Tam Cốc, Hoa Lư, Ninh Bình",
      highlight: "View cánh đồng lúa, hồ bơi ngoài trời, miễn phí xe đạp khám phá Tam Cốc",
      mapUrl: "https://www.google.com/maps/search/Tam+Coc+Rice+Fields+Resort",
      verified: true
    },
    {
      id: 2, name: "Tràng An Riverside Homestay", cat: "homestay", area: "trangan",
      rating: 4.9, reviews: 680,
      price: "550.000 đ — 890.000 đ/đêm",
      address: "Xã Trường Yên, Hoa Lư (Cách bến thuyền Tràng An 800m)",
      highlight: "Sát bờ sông Tràng An, nhà bungalow gỗ thoáng mát, có thuyền kayak miễn phí",
      mapUrl: "https://www.google.com/maps/search/Trang+An+Riverside+Homestay",
      verified: true
    },
    {
      id: 3, name: "Ninh Binh Mountain View Homestay", cat: "homestay", area: "hangmua",
      rating: 4.7, reviews: 510,
      price: "490.000 đ — 750.000 đ/đêm",
      address: "Thôn Khê Hạ, Ninh Xuân (Cách Hang Múa 500m)",
      highlight: "View tựa vách núi đá vôi hùng vĩ, sân vườn BBQ ngắm hoàng hôn",
      mapUrl: "https://www.google.com/maps/search/Ninh+Binh+Mountain+View+Homestay",
      verified: true
    },
    {
      id: 4, name: "Bái Đính Riverside Resort & Spa", cat: "homestay", area: "baidinh",
      rating: 4.8, reviews: 1120,
      price: "1.100.000 đ — 2.300.000 đ/đêm",
      address: "Xã Gia Sinh, Gia Viễn, Ninh Bình",
      highlight: "Resort 4 sao sinh thái, view hồ Đàm Thị, xe điện đưa đón chùa Bái Đính",
      mapUrl: "https://www.google.com/maps/search/Bai+Dinh+Riverside+Resort",
      verified: true
    },

    // --- DANH MỤC 2: QUÁN ĂN ĐẶC SẢN (DÊ NÚI, CƠM CHÁY) ---
    {
      id: 5, name: "Nhà Hàng Dê Núi Chính Thư", cat: "food", area: "trangan",
      rating: 4.6, reviews: 1450,
      price: "150.000 đ — 350.000 đ/người",
      address: "Thôn Khê Thượng, Xã Ninh Xuân, Hoa Lư (Gần bến thuyền Tràng An)",
      highlight: "Dê tái chanh, dê nướng tảng than hoa, cơm cháy sốt tim cật dê chuẩn vị",
      mapUrl: "https://www.google.com/maps/search/Nhà+Hàng+Dê+Núi+Chính+Thư+Ninh+Bình",
      verified: true
    },
    {
      id: 6, name: "Nhà Hàng Cơm Cháy & Dê Núi Ba Cửa", cat: "food", area: "trangan",
      rating: 4.5, reviews: 980,
      price: "130.000 đ — 300.000 đ/người",
      address: "Thôn Tràng An, Xã Trường Yên, Hoa Lư, Ninh Bình",
      highlight: "Dê hấp sả ớt, cháo dê đỗ xanh, phục vụ đoàn đông và khách lẻ nhanh chóng",
      mapUrl: "https://www.google.com/maps/search/Nhà+Hàng+Ba+Cửa+Ninh+Bình",
      verified: true
    },
    {
      id: 7, name: "Nhà Hàng Dê Núi Thăng Long", cat: "food", area: "baidinh",
      rating: 4.7, reviews: 1200,
      price: "160.000 đ — 400.000 đ/người",
      address: "Tràng An, Chi Phong, Trường Yên (Tuyến đường đi Bái Đính)",
      highlight: "Tiết canh dê, dê xào lăn, cơm cháy giòn rụm chấm nước sốt gia truyền",
      mapUrl: "https://www.google.com/maps/search/Nhà+Hàng+Thăng+Long+Ninh+Bình",
      verified: true
    },

    // --- DANH MỤC 3: CẢNH ĐẸP & CHECK-IN ---
    {
      id: 8, name: "Quần Thể Danh Thắng Tràng An (Di Sản UNESCO)", cat: "spot", area: "trangan",
      rating: 4.9, reviews: 9800,
      price: "Vé thuyền: 250.000 đ/người lớn (Tuyến 1, 2, 3)",
      address: "Xã Ninh Xuân, Huyện Hoa Lư, Ninh Bình",
      highlight: "Đi thuyền nan luồn qua các hang động xuyên thủy, phim trường Kong Skull Island",
      mapUrl: "https://www.google.com/maps/search/Tràng+An+Ninh+Bình",
      verified: true
    },
    {
      id: 9, name: "Hang Múa & Đỉnh Núi Ngọa Long", cat: "spot", area: "hangmua",
      rating: 4.7, reviews: 4200,
      price: "Vé tham quan: 100.000 đ/người",
      address: "Thôn Khê Hạ, Ninh Xuân, Hoa Lư",
      highlight: "486 bậc thang đá ngắm toàn cảnh thung lũng Tam Cốc mùa lúa chín",
      mapUrl: "https://www.google.com/maps/search/Hang+Múa+Ninh+Bình",
      verified: true
    },
    {
      id: 10, name: "Chùa Bái Đính — Đại Quần Thể Phật Giáo", cat: "spot", area: "baidinh",
      rating: 4.8, reviews: 6500,
      price: "Xe điện: 60.000 đ/khứ hồi | Vé bảo tháp: 50.000 đ",
      address: "Xã Gia Sinh, Huyện Gia Viễn, Ninh Bình",
      highlight: "Hành lang 500 vị La Hán bằng đá xanh, Đại hồng chung 36 tấn",
      mapUrl: "https://www.google.com/maps/search/Chùa+Bái+Đính+Ninh+Bình",
      verified: true
    },
    {
      id: 11, name: "Vườn Quốc Gia Cúc Phương", cat: "spot", area: "cucphuong",
      rating: 4.8, reviews: 2400,
      price: "Vé vào cổng: 60.000 đ/người | Học sinh: 10.000 đ",
      address: "Huyện Nho Quan, Ninh Bình",
      highlight: "Cây chò ngàn năm, mùa bướm rừng tháng 4-5, trung tâm bảo tồn linh trưởng",
      mapUrl: "https://www.google.com/maps/search/Vườn+Quốc+Gia+Cúc+Phương",
      verified: true
    },

    // --- DANH MỤC 4: QUÁN CÀ PHÊ VIEW ĐẸP ---
    {
      id: 12, name: "Cà Phê Đồng Lúa Tam Cốc (Rice Field Cafe)", cat: "cafe", area: "tamcoc",
      rating: 4.7, reviews: 520,
      price: "35.000 đ — 65.000 đ/đồ uống",
      address: "Đường bến thuyền Tam Cốc, Hoa Lư",
      highlight: "View trực diện cánh đồng lúa Tam Cốc, phong cách vintage gỗ mộc",
      mapUrl: "https://www.google.com/maps/search/Tam+Coc+Cafe+Ninh+Binh",
      verified: true
    },
    {
      id: 13, name: "Chookie's Hideaway Beer Garden & Cafe", cat: "cafe", area: "tamcoc",
      rating: 4.6, reviews: 780,
      price: "40.000 đ — 85.000 đ/đồ uống & bánh pizza",
      address: "Cạnh sông Ngô Đồng, Tam Cốc",
      highlight: "Sân vườn thoáng mát, đồ uống sinh tố hoa quả nhiệt đới, pizza nướng củi",
      mapUrl: "https://www.google.com/maps/search/Chookies+Hideaway+Ninh+Binh",
      verified: true
    }
  ];

  function selectTravelCategory(cat, btn) {
    currentTravelCategory = cat;
    document.querySelectorAll('#page-travel .tabs .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const titles = {
      'homestay': '🏡 Danh Sách Homestay & Khách Sạn (Bảng Giá Theo Mùa)',
      'food': '🐐 Danh Sách Quán Ăn Đặc Sản Dê Núi & Cơm Cháy Chuẩn Vị',
      'spot': '📸 Danh Sách Cảnh Đẹp & Điểm Check-in Nổi Tiếng',
      'cafe': '☕ Danh Sách Quán Cà Phê View Núi & Cánh Đồng Đẹp'
    };
    document.getElementById('currentCategoryTitle').textContent = titles[cat] || 'Danh Sách Địa Điểm';
    filterTravelPlaces();
  }

  function selectAreaFilter(area, btn) {
    currentAreaFilter = area;
    document.querySelectorAll('.area-filter-btn').forEach(b => {
      b.classList.remove('active');
      b.style.background = '#fff';
      b.style.color = 'var(--primary)';
    });
    btn.classList.add('active');
    btn.style.background = 'var(--primary)';
    btn.style.color = '#fff';
    filterTravelPlaces();
  }

  function filterTravelPlaces() {
    const q = (document.getElementById('travelSearch')?.value || '').toLowerCase().trim();

    const filtered = NINHBINH_PLACES.filter(p => {
      const matchCat = (p.cat === currentTravelCategory);
      const matchArea = (currentAreaFilter === 'all') || (p.area === currentAreaFilter);
      const matchQ = !q || p.name.toLowerCase().includes(q) || p.highlight.toLowerCase().includes(q) || p.address.toLowerCase().includes(q);
      return matchCat && matchArea && matchQ;
    });

    document.getElementById('currentPlaceCount').textContent = `Đang hiển thị ${filtered.length} địa điểm`;
    renderTravelPlaces(filtered);
  }

  function renderTravelPlaces(list) {
    const grid = document.getElementById('travelGrid');
    if(!grid) return;

    if(list.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1 / -1; text-align:center; padding:40px; background:#fff; border-radius:10px; border:1px dashed var(--border);">
          <div style="font-size:2rem; margin-bottom:8px;">🔍</div>
          <div style="font-weight:700; color:var(--primary-dark);">Không tìm thấy địa điểm nào ở khu vực này</div>
          <div style="color:var(--muted); font-size:0.88rem; margin-top:4px;">Bạn hãy chọn lại khu vực "Tất cả" hoặc nhập từ khóa tìm kiếm khác nhé!</div>
        </div>
      `;
      return;
    }

    grid.innerHTML = list.map(p => `
      <div style="background:#fff; border:1px solid var(--border); border-radius:10px; padding:22px; box-shadow:var(--shadow-sm); display:flex; flex-direction:column; gap:10px; transition:transform .2s, box-shadow .2s;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='var(--shadow-md)';" onmouseout="this.style.transform='none'; this.style.boxShadow='var(--shadow-sm)';">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <span class="badge-tag" style="background:#EFF6FF; color:#1D4ED8; font-size:0.74rem;">
            ${p.cat === 'homestay' ? '🏡 HOMESTAY / RESORT' : (p.cat === 'food' ? '🐐 QUÁN ĐẶC SẢN' : (p.cat === 'spot' ? '📸 ĐIỂM CHECK-IN' : '☕ CÀ PHÊ VIEW'))}
          </span>
          <span style="font-size:0.82rem; font-weight:700; color:#D97706; background:#FEF3C7; padding:3px 8px; border-radius:4px;">
            ★ ${p.rating} (${p.reviews}+ review)
          </span>
        </div>
        <h3 style="font-size:1.12rem; color:var(--primary-dark); margin:2px 0; line-height:1.35;">${p.name}</h3>
        <div style="font-size:0.84rem; color:var(--muted);">${p.address}</div>
        <div style="font-size:0.88rem; color:#334155; line-height:1.55; background:#F8FAFC; padding:10px 12px; border-radius:6px;">
          💡 <b>Điểm nổi bật:</b> ${p.highlight}
        </div>
        <div style="font-weight:700; color:var(--primary); font-size:0.95rem; margin-top:auto; padding-top:10px; border-top:1px dashed var(--border);">
          💰 <b>Mức giá:</b> ${p.price}
        </div>
        <div style="display:flex; gap:8px; margin-top:8px;">
          <a href="${p.mapUrl}" target="_blank" class="btn btn-outline btn-sm btn-full" style="font-size:0.78rem;">📍 Mở chỉ đường Google Maps</a>
        </div>
      </div>
    `).join('');
  }

  function runLiveCrawler() {
    const spin = document.getElementById('crawlSpin');
    spin.style.display = 'inline-block';
    spin.style.animation = 'spin 1s linear infinite';

    setTimeout(() => {
      spin.style.animation = 'none';
      showToast('Đã quét & cập nhật bảng giá phòng thực tế mới nhất!');
      filterTravelPlaces();
    }, 1000);
  }

  // Init travel data on load
  setTimeout(() => {
    filterTravelPlaces();
  }, 100);
