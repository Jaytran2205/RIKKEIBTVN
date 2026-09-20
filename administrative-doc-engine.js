/**
 * ADMINISTRATIVE DOCUMENT DRAFTING ENGINE (NĐ 30/2020/NĐ-CP)
 * Công cụ soạn thảo văn bản hành chính chuẩn Nghị định 30/2020/NĐ-CP
 * Nền tảng All in One — Hệ thống hành chính công vụ số
 */

const AdministrativeDocEngine = (function() {
  'use strict';

  // 1. DANH MỤC THỂ LOẠI VĂN BẢN THEO NGHỊ ĐỊNH 30/2020/NĐ-CP
  const DOC_TYPES = [
    { name: "THÔNG BÁO", code: "TB", title: "THÔNG BÁO", defaultSubject: "Về việc thông báo lịch công tác và phân công nhiệm vụ" },
    { name: "CÔNG VĂN", code: "CV", title: "CÔNG VĂN", defaultSubject: "V/v phối hợp triển khai công tác chuyển đổi số và ứng dụng công nghệ" },
    { name: "QUYẾT ĐỊNH", code: "QĐ", title: "QUYẾT ĐỊNH", defaultSubject: "Về việc ban hành Quy chế làm việc và tiếp nhận xử lý thủ tục hành chính" },
    { name: "TỜ TRÌNH", code: "TTr", title: "TỜ TRÌNH", defaultSubject: "Về việc xin phê duyệt chủ trương và dự toán kinh phí triển khai dự án" },
    { name: "BÁO CÁO", code: "BC", title: "BÁO CÁO", defaultSubject: "Kết quả thực hiện nhiệm vụ công tác và chuyển đổi số quý III năm 2026" },
    { name: "BIÊN BẢN", code: "BB", title: "BIÊN BẢN", defaultSubject: "Hội nghị đánh giá tiến độ thực hiện nhiệm vụ và phương hướng triển khai" },
    { name: "KẾ HOẠCH", code: "KH", title: "KẾ HOẠCH", defaultSubject: "Tổ chức Hội nghị tập huấn kỹ năng số và an toàn thông tin năm 2026" },
    { name: "CHỈ THỊ", code: "CT", title: "CHỈ THỊ", defaultSubject: "Về việc tăng cường kỷ luật, kỷ cương hành chính và văn hóa công vụ" },
    { name: "GIẤY MỜI", code: "GM", title: "GIẤY MỜI", defaultSubject: "Tham dự Hội nghị sơ kết công tác ứng dụng chuyển đổi số năm 2026" },
    { name: "GIẤY GIỚI THIỆU", code: "GGT", title: "GIẤY GIỚI THIỆU", defaultSubject: "Về việc liên hệ công tác và phối hợp xác minh thông tin" },
    { name: "CÔNG ĐIỆN", code: "CĐ", title: "CÔNG ĐIỆN", defaultSubject: "Về việc chủ động phòng chống thiên tai và ứng phó sự cố khẩn cấp" },
    { name: "CHƯƠNG TRÌNH", code: "CTr", title: "CHƯƠNG TRÌNH", defaultSubject: "Công tác trọng tâm quý IV năm 2026 của cơ quan" },
    { name: "PHƯƠNG ÁN", code: "PA", title: "PHƯƠNG ÁN", defaultSubject: "Đảm bảo an toàn thông tin và vận hành hệ thống dữ liệu số" },
    { name: "QUY ĐỊNH", code: "QĐ", title: "QUY ĐỊNH", defaultSubject: "Về quản lý, sử dụng chữ ký số và văn bản điện tử trong cơ quan" },
    { name: "HỢP ĐỒNG", code: "HĐ", title: "HỢP ĐỒNG KINH TẾ", defaultSubject: "Về việc cung cấp dịch vụ công nghệ số và phần mềm quản trị" },
    { name: "BẢN CAM KẾT", code: "CK", title: "BẢN CAM KẾT", defaultSubject: "Thực hiện đúng quy định về bảo mật dữ liệu và chuẩn mực công vụ" }
  ];

  // 2. KHO MẪU VĂN BẢN ĐẦY ĐỦ (AI SAMPLES)
  const PRESET_TEMPLATES = {
    default: {
      name: "Mẫu mặc định: Văn bản hành chính",
      type: "THÔNG BÁO",
      coQuanChuQuan: "",
      coQuanBanHanh: "SỞ NỘI VỤ",
      maDonVi: "SNV",
      diaDanh: "Ninh Bình",
      so: "01",
      chucVu: "GIÁM ĐỐC",
      hoTen: "Nguyễn Văn A",
      recipients: ["Ban Giám đốc;", "Các phòng ban chức năng;", "Lưu: VT."],
      subject: "Về việc triển khai kế hoạch công tác và nâng cao hiệu quả hoạt động",
      body: `Căn cứ Nghị định số 30/2020/NĐ-CP ngày 05 tháng 3 năm 2020 của Chính phủ về công tác văn thư;
Căn cứ Quy chế làm việc và kế hoạch hoạt động năm 2026 của cơ quan;

Nhằm chủ động thực hiện tốt nhiệm vụ chuyên môn và nâng cao chất lượng công việc;

Đơn vị thông báo đến toàn thể các bộ phận, phòng ban chức năng nội dung như sau:

1. Về mục tiêu và nhiệm vụ chung:
Khẩn trương rà soát các nhiệm vụ được giao, đề cao trách nhiệm trong từng khâu thực hiện công việc.

2. Về các biện pháp triển khai cụ thể:
- Đẩy mạnh việc ứng dụng công nghệ số, quản lý hồ sơ và xử lý công việc trên môi trường điện tử;
- Kiểm tra nghiêm ngặt chất lượng và tiến độ công việc trước khi hoàn thành và bàn giao.

3. Tổ chức thực hiện:
Giao các phòng ban liên quan chủ động phối hợp thực hiện nghiêm túc; báo cáo tiến độ định kỳ về Ban Giám đốc trước ngày 25 hàng tháng.

Thông báo này có hiệu lực kể từ ngày ký. Yêu cầu các bộ phận và cá nhân nghiêm túc thực hiện./.`
    },
    gm_hop: {
      name: "Giấy mời tham dự hội nghị / hội thảo",
      type: "GIẤY MỜI",
      coQuanChuQuan: "UBND TỈNH THANH HÓA",
      coQuanBanHanh: "VĂN PHÒNG UBND TỈNH",
      maDonVi: "VPUBND",
      diaDanh: "Thanh Hóa",
      so: "79",
      chucVu: "CHÁNH VĂN PHÒNG",
      hoTen: "Lê Văn C",
      recipients: ["Như thành phần mời;", "Chủ tịch, các PCT UBND tỉnh;", "Lưu: VT, TH."],
      subject: "Dự Hội nghị thúc đẩy chuyển đổi số và cải cách thủ tục hành chính năm 2026",
      body: `ỦY BAN NHÂN DÂN TỈNH trân trọng kính mời:

- Đại diện Lãnh đạo các Sở, ban, ngành, đoàn thể;
- Đại diện Thường trực UBND các huyện, thị xã, thành phố;
- Đại diện các doanh nghiệp và đơn vị cung cấp giải pháp số tiêu biểu.

Đến tham dự Hội nghị: "Đẩy mạnh chuyển đổi số và nâng cao chỉ số cải cách hành chính năm 2026".

1. Thời gian: 08 giờ 00 phút, ngày 25 tháng 9 năm 2026 (Thứ Sáu).
2. Địa điểm: Hội trường số 1, Trung tâm Hội nghị tỉnh.
3. Chủ trì Hội nghị: Đồng chí Chủ tịch Ủy ban nhân dân tỉnh.

Đề nghị các đại biểu sắp xếp thời gian tham dự đúng thành phần và gửi danh sách đại biểu về Văn phòng UBND tỉnh trước 16h00 ngày 23/9/2026 để phục vụ công tác chuẩn bị./.`
    },
    tb_hop: {
      name: "Thông báo phân công nhiệm vụ / lịch công tác",
      type: "THÔNG BÁO",
      coQuanChuQuan: "UBND TỈNH NINH BÌNH",
      coQuanBanHanh: "SỞ THÔNG TIN VÀ TRUYỀN THÔNG",
      maDonVi: "STTTT",
      diaDanh: "Ninh Bình",
      so: "128",
      chucVu: "GIÁM ĐỐC",
      hoTen: "Trần Văn Nam",
      recipients: ["Như trên;", "Ban Giám đốc;", "Các phòng, đơn vị thuộc Sở;", "Lưu: VT, CNTT."],
      subject: "Về việc phân công nhiệm vụ triển khai kế hoạch chuyển đổi số quý IV/2026",
      body: `Căn cứ Nghị định số 30/2020/NĐ-CP ngày 05 tháng 3 năm 2020 của Chính phủ về công tác văn thư;
Căn cứ chức năng, nhiệm vụ và quyền hạn của Sở Thông tin và Truyền thông;

Nhằm đẩy nhanh tiến độ triển khai các chỉ tiêu phát triển Chính quyền số trong quý IV năm 2026;

Sở Thông tin và Truyền thông thông báo phân công nhiệm vụ cụ thể như sau:

1. Phòng Công nghệ thông tin: Chủ trì, phối hợp với các cơ quan chuyên môn theo dõi, đánh giá chỉ số Chuyển đổi số (DTI); hoàn thành báo cáo tổng hợp trước ngày 20 hàng tháng.

2. Trung tâm Công nghệ thông tin và Truyền thông: Đảm bảo hạ tầng máy chủ, hệ thống mạng diện rộng (WAN) vận hành an toàn, thông suốt 24/7.

3. Văn phòng Sở: Theo dõi, đôn đốc tiến độ thực hiện nhiệm vụ của các phòng, đơn vị; định kỳ báo cáo Ban Giám đốc Sở tại các cuộc họp giao ban đầu tuần.

Yêu cầu Trưởng các phòng, đơn vị trực thuộc căn cứ nội dung thông báo nghiêm túc triển khai thực hiện./.`
    },
    qd_banhanh: {
      name: "Quyết định ban hành Quy chế làm việc",
      type: "QUYẾT ĐỊNH",
      coQuanChuQuan: "UBND TỈNH NINH BÌNH",
      coQuanBanHanh: "SỞ NỘI VỤ",
      maDonVi: "SNV",
      diaDanh: "Ninh Bình",
      so: "86",
      chucVu: "GIÁM ĐỐC",
      hoTen: "Nguyễn Hoàng Minh",
      recipients: ["UBND tỉnh (để b/c);", "Ban Giám đốc Sở;", "Các phòng chuyên môn;", "Lưu: VT, TCCB."],
      subject: "Về việc ban hành Quy chế tiếp nhận, xử lý và phát hành văn bản điện tử",
      body: `Căn cứ Luật Tổ chức chính quyền địa phương ngày 19 tháng 6 năm 2015;
Căn cứ Nghị định số 30/2020/NĐ-CP ngày 05 tháng 3 năm 2020 của Chính phủ về công tác văn thư;
Theo đề nghị của Chánh Văn phòng Sở Nội vụ.

QUYẾT ĐỊNH:

Điều 1. Ban hành kèm theo Quyết định này "Quy chế tiếp nhận, xử lý, ký số và phát hành văn bản điện tử trên Hệ thống quản lý văn bản và điều hành công việc của Sở Nội vụ".

Điều 2. Quyết định này có hiệu lực thi hành kể từ ngày ký. Các văn bản, quy định trước đây của Sở trái với Quyết định này đều bãi bỏ.

Điều 3. Chánh Văn phòng Sở, Trưởng các phòng chuyên môn và toàn thể cán bộ, công chức thuộc Sở chịu trách nhiệm thi hành Quyết định này./.`
    },
    cv_phoihop: {
      name: "Công văn phối hợp công tác",
      type: "CÔNG VĂN",
      coQuanChuQuan: "UBND HUYỆN HOA LƯ",
      coQuanBanHanh: "PHÒNG VĂN HÓA VÀ THÔNG TIN",
      maDonVi: "VHTT",
      diaDanh: "Hoa Lư",
      so: "45",
      chucVu: "TRƯỞNG PHÒNG",
      hoTen: "Lê Đức Thắng",
      recipients: ["UBND các xã, thị trấn;", "Công an huyện Hoa Lư;", "Lưu: VT, NV."],
      subject: "V/v tăng cường công tác quản lý dịch vụ văn hóa và du lịch dịp lễ hội",
      body: `Kính gửi: Ủy ban nhân dân các xã, thị trấn trên địa bàn huyện Hoa Lư.

Thực hiện chỉ đạo của Ủy ban nhân dân huyện Hoa Lư về việc tăng cường quản lý môi trường văn hóa du lịch, đảm bảo an ninh trật tự trong mùa lễ hội;

Phòng Văn hóa và Thông tin huyện đề nghị UBND các xã, thị trấn phối hợp thực hiện một số nội dung sau:

1. Tăng cường công tác tuyên truyền, hướng dẫn các cơ sở kinh doanh dịch vụ ăn uống, lưu trú thực hiện niêm yết giá công khai và bán đúng giá niêm yết.

2. Thành lập tổ liên ngành thường xuyên kiểm tra đột xuất các điểm tham quan, khu vực tập trung đông du khách; xử lý nghiêm các trường hợp vi phạm.

3. Thiết lập và công khai đường dây nóng hỗ trợ du khách tại các điểm du lịch trọng điểm trên địa bàn.

Đề nghị UBND các xã, thị trấn quan tâm chỉ đạo triển khai thực hiện và gửi báo cáo kết quả về Phòng Văn hóa và Thông tin trước ngày 25 hàng tháng./.`
    },
    ttr_kinhphi: {
      name: "Tờ trình xin phê duyệt kế hoạch & kinh phí",
      type: "TỜ TRÌNH",
      coQuanChuQuan: "UBND TỈNH NINH BÌNH",
      coQuanBanHanh: "SỞ GIÁO DỤC VÀ ĐÀO TẠO",
      maDonVi: "GDĐT",
      diaDanh: "Ninh Bình",
      so: "58",
      chucVu: "GIÁM ĐỐC",
      hoTen: "Vũ Thị Bích Ngọc",
      recipients: ["Như trên;", "Sở Tài chính (để p/h);", "Sở Kế hoạch và Đầu tư;", "Lưu: VT, KHTC."],
      subject: "Về việc xin phê duyệt Kế hoạch và dự toán kinh phí triển khai Nền tảng số trong các trường THPT",
      body: `Kính gửi: Ủy ban nhân dân tỉnh.

Căn cứ Nghị quyết về xây dựng chính quyền điện tử, chuyển đổi số giai đoạn 2021 - 2025, định hướng đến năm 2030;
Căn cứ Kế hoạch phát triển giáo dục và đào tạo của tỉnh năm học 2026 - 2027;

Sở Giáo dục và Đào tạo kính trình Ủy ban nhân dân tỉnh xem xét, phê duyệt Kế hoạch và dự toán kinh phí triển khai thí điểm "Nền tảng số và nộp bài thi trực tuyến cho học sinh" với các nội dung chủ yếu sau:

1. Mục tiêu: Thí điểm tại các trường THPT trên địa bàn tỉnh trong học kỳ I năm học 2026 - 2027.
2. Nội dung thực hiện: Trang bị phần mềm chấm thi qua camera máy quét; tổ chức tập huấn cho giáo viên.
3. Dự toán kinh phí: Dự kiến từ nguồn vốn ngân sách sự nghiệp giáo dục năm 2026.

Sở Giáo dục và Đào tạo kính trình Ủy ban nhân dân tỉnh xem xét, quyết định./.`
    }
  };

  // 3. INTERNAL STATE
  let state = {
    hinhThuc: "Hành chính (NĐ 30/2020/NĐ-CP)",
    loaiVanBan: "THÔNG BÁO",
    loaiCode: "TB",
    coQuanChuQuan: "",
    coQuanBanHanh: "SỞ NỘI VỤ",
    maDonVi: "SNV",
    isLienTich: false,
    secondaryUnits: [
      {
        coQuanChuQuan: "",
        maDonVi: "",
        coQuanBanHanh: "",
        chucVu: "",
        hoTen: ""
      }
    ],
    diaDanh: "Ninh Bình",
    ngayBanHanh: new Date().toISOString().split('T')[0],
    soVanBan: "01",
    soKyHieu: "01/TB-SNV",
    headerRatio: 35,
    recipients: ["Ban Giám đốc;", "Các phòng ban chức năng;", "Lưu: VT."],
    chucVu: "GIÁM ĐỐC",
    hoTen: "Nguyễn Văn A",
    trichYeu: "Về việc tổ chức hội nghị tổng kết công tác năm 2026",
    noiDung: PRESET_TEMPLATES.default.body,
    currentStep: 1,
    accordionStates: {
      acc1: true,
      acc2: false,
      acc3: false
    },
    isPreviewClosed: false
  };

  let isInitialized = false;

  // 4. INITIALIZATION
  function init() {
    loadDraft();
    renderFormControls();
    if (!isInitialized) {
      bindEvents();
      isInitialized = true;
    }
    renderSecondaryUnits();
    updateLivePreview();
  }

  // 5. RENDER FORM CONTROLS
  function renderFormControls() {
    const loaiSelect = document.getElementById('vbLoaiVanBan');
    if (loaiSelect && loaiSelect.options.length <= 1) {
      loaiSelect.innerHTML = DOC_TYPES.map(t => 
        `<option value="${t.name}" data-code="${t.code}" ${t.name === state.loaiVanBan ? 'selected' : ''}>${t.name}</option>`
      ).join('');
    }

    const presetSelect = document.getElementById('vbAiTemplateSelect');
    if (presetSelect && presetSelect.options.length <= 1) {
      presetSelect.innerHTML = Object.keys(PRESET_TEMPLATES).map(k =>
        `<option value="${k}">${PRESET_TEMPLATES[k].name}</option>`
      ).join('');
    }

    setInputValue('vbHinhThuc', state.hinhThuc);
    setInputValue('vbLoaiVanBan', state.loaiVanBan);
    setInputValue('vbCoQuanChuQuan', state.coQuanChuQuan);
    setInputValue('vbCoQuanBanHanh', state.coQuanBanHanh);
    setInputValue('vbMaDonVi', state.maDonVi);
    
    const cbLienTich = document.getElementById('vbLienTich');
    if (cbLienTich) cbLienTich.checked = state.isLienTich;

    setInputValue('vbDiaDanh', state.diaDanh);
    setInputValue('vbNgayBanHanh', state.ngayBanHanh);
    setInputValue('vbSoVanBan', state.soVanBan);
    setInputValue('vbSoKyHieu', state.soKyHieu);
    setInputValue('vbHeaderSlider', state.headerRatio);
    setInputValue('vbChucVu', state.chucVu);
    setInputValue('vbHoTen', state.hoTen);
    setInputValue('vbTrichYeuInput', state.trichYeu);
    setInputValue('vbBodyEditor', state.noiDung);

    updateTypeBadge();
    updateSliderBadge();
    renderTags();
    updateAccordionUI();
    updateStepUI();
  }

  function setInputValue(id, val) {
    const el = document.getElementById(id);
    if (el && val !== undefined) el.value = val;
  }

  // 6. EVENT BINDINGS
  function bindEvents() {
    const listen = (id, event, handler) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener(event, handler);
    };

    listen('vbAiTemplateSelect', 'change', (e) => {
      applyPresetTemplate(e.target.value);
    });

    listen('vbHinhThuc', 'change', (e) => {
      state.hinhThuc = e.target.value;
      updateLivePreview();
    });

    listen('vbLoaiVanBan', 'change', (e) => {
      const opt = e.target.selectedOptions[0];
      state.loaiVanBan = e.target.value;
      state.loaiCode = opt ? opt.getAttribute('data-code') || 'TB' : 'TB';
      updateTypeBadge();
      recalcSoKyHieu();
      updateLivePreview();
    });

    listen('vbCoQuanChuQuan', 'input', (e) => {
      state.coQuanChuQuan = e.target.value;
      updateLivePreview();
    });

    listen('vbCoQuanBanHanh', 'input', (e) => {
      state.coQuanBanHanh = e.target.value;
      updateLivePreview();
    });

    listen('vbMaDonVi', 'input', (e) => {
      state.maDonVi = e.target.value.trim().toUpperCase() || 'XXX';
      recalcSoKyHieu();
      updateLivePreview();
    });

    listen('vbLienTich', 'change', (e) => {
      state.isLienTich = e.target.checked;
      const wrap = document.getElementById('vbLienTichSection');
      if (wrap) wrap.style.display = state.isLienTich ? 'block' : 'none';
      if (state.isLienTich && (!state.secondaryUnits || state.secondaryUnits.length === 0)) {
        state.secondaryUnits = [{
          coQuanChuQuan: "",
          maDonVi: "",
          coQuanBanHanh: "",
          chucVu: "",
          hoTen: ""
        }];
      }
      renderSecondaryUnits();
      recalcSoKyHieu();
      updateLivePreview();
    });

    listen('vbDiaDanh', 'input', (e) => {
      state.diaDanh = e.target.value;
      updateLivePreview();
    });

    listen('vbNgayBanHanh', 'change', (e) => {
      state.ngayBanHanh = e.target.value;
      updateLivePreview();
    });

    listen('vbSoVanBan', 'input', (e) => {
      state.soVanBan = e.target.value.trim() || '01';
      recalcSoKyHieu();
      updateLivePreview();
    });

    listen('vbSoKyHieu', 'input', (e) => {
      state.soKyHieu = e.target.value;
      updateLivePreview();
    });

    listen('vbHeaderSlider', 'input', (e) => {
      state.headerRatio = parseInt(e.target.value, 10) || 40;
      updateSliderBadge();
      updateHeaderLayout();
    });

    listen('vbChucVu', 'input', (e) => {
      state.chucVu = e.target.value;
      updateLivePreview();
    });

    listen('vbHoTen', 'input', (e) => {
      state.hoTen = e.target.value;
      updateLivePreview();
    });

    listen('vbTrichYeuInput', 'input', (e) => {
      state.trichYeu = e.target.value;
      updateLivePreview();
    });

    listen('vbBodyEditor', 'input', (e) => {
      state.noiDung = e.target.value;
      updateLivePreview();
    });

    listen('vbTagInput', 'keydown', (e) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const text = e.target.value.trim().replace(/[,;]+$/, '');
        if (text) {
          addRecipientTag(text);
          e.target.value = '';
        }
      }
    });

    // ContentEditable on Paper A4 (Two-way sync)
    const paperBody = document.getElementById('docPrevNoiDung');
    if (paperBody) {
      paperBody.addEventListener('input', () => {
        state.noiDung = paperBody.innerText;
        const editor = document.getElementById('vbBodyEditor');
        if (editor) editor.value = state.noiDung;
      });
    }
  }

  // 7. SECONDARY UNITS MANAGEMENT (VĂN BẢN LIÊN TỊCH)
  function addSecondaryUnit() {
    if (!state.secondaryUnits) state.secondaryUnits = [];
    const count = state.secondaryUnits.length + 2;
    state.secondaryUnits.push({
      coQuanChuQuan: "",
      maDonVi: `ĐV${count}`,
      coQuanBanHanh: `ĐƠN VỊ LIÊN TỊCH ${count}`,
      chucVu: "THỦ TRƯỞNG",
      hoTen: ""
    });
    renderSecondaryUnits();
    recalcSoKyHieu();
    updateLivePreview();
  }

  function removeSecondaryUnit(idx) {
    if (state.secondaryUnits && idx >= 0 && idx < state.secondaryUnits.length) {
      state.secondaryUnits.splice(idx, 1);
      renderSecondaryUnits();
      recalcSoKyHieu();
      updateLivePreview();
    }
  }

  function updateSecondaryUnitField(idx, field, val) {
    if (state.secondaryUnits && state.secondaryUnits[idx]) {
      state.secondaryUnits[idx][field] = val;
      if (field === 'maDonVi') recalcSoKyHieu();
      updateLivePreview();
    }
  }

  function renderSecondaryUnits() {
    const container = document.getElementById('vbSecondaryUnitsContainer');
    const wrap = document.getElementById('vbLienTichSection');
    if (wrap) wrap.style.display = state.isLienTich ? 'block' : 'none';
    if (!container) return;

    if (!state.isLienTich || !state.secondaryUnits || state.secondaryUnits.length === 0) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = state.secondaryUnits.map((u, idx) => `
      <div class="vb-agency-unit-box">
        <div class="vb-agency-unit-header">
          <span style="font-weight:700; color:#0F172A; font-size:0.95rem;">Đơn vị ${idx + 2}</span>
          <button type="button" class="vb-btn-remove-unit" onclick="AdministrativeDocEngine.removeSecondaryUnit(${idx})" title="Xóa đơn vị này">&times;</button>
        </div>
        <div style="display:grid; grid-template-columns: 1.2fr 1fr; gap:10px; margin-bottom:10px;">
          <div class="form-group" style="margin-bottom:0;">
            <label style="font-size:0.75rem; font-weight:700; color:#475569; text-transform:uppercase; margin-bottom:4px; display:block;">CƠ QUAN CHỦ QUẢN</label>
            <input type="text" class="form-input" placeholder="VD: Bộ Tài Chính" value="${escapeHtml(u.coQuanChuQuan || '')}" oninput="AdministrativeDocEngine.updateSecondaryUnitField(${idx}, 'coQuanChuQuan', this.value)">
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label style="font-size:0.75rem; font-weight:700; color:#475569; text-transform:uppercase; margin-bottom:4px; display:block;">MÃ ĐƠN VỊ</label>
            <input type="text" class="form-input" placeholder="VD: STC" value="${escapeHtml(u.maDonVi || '')}" oninput="AdministrativeDocEngine.updateSecondaryUnitField(${idx}, 'maDonVi', this.value)">
          </div>
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label style="font-size:0.75rem; font-weight:700; color:#475569; text-transform:uppercase; margin-bottom:4px; display:block;">CƠ QUAN BAN HÀNH <span style="color:#C22026;">*</span></label>
          <input type="text" class="form-input" placeholder="VD: Sở Tài Chính" value="${escapeHtml(u.coQuanBanHanh || '')}" oninput="AdministrativeDocEngine.updateSecondaryUnitField(${idx}, 'coQuanBanHanh', this.value)">
        </div>
      </div>
    `).join('');
  }

  // 8. RECALC SO KY HIEU THEO NĐ 30/2020
  function recalcSoKyHieu() {
    const so = state.soVanBan || '01';
    let code = state.loaiCode || 'TB';
    if (state.isLienTich && !code.endsWith('LT')) {
      code = code + 'LT';
    }
    let ma = state.maDonVi ? state.maDonVi.toUpperCase() : 'XXX';

    if (state.isLienTich && state.secondaryUnits && state.secondaryUnits.length > 0) {
      const secMas = state.secondaryUnits.map(u => (u.maDonVi || 'XXX').toUpperCase()).join('-');
      ma = `${ma}-${secMas}`;
      state.soKyHieu = `${so}-${code}/${ma}`;
    } else {
      state.soKyHieu = `${so}/${code}-${ma}`;
    }
    setInputValue('vbSoKyHieu', state.soKyHieu);
  }

  // 9. UPDATE BADGES & ACCORDIONS
  function updateTypeBadge() {
    const badge = document.getElementById('vbLoaiBadge');
    if (badge) {
      badge.textContent = state.loaiCode || 'TB';
    }
  }

  function updateSliderBadge() {
    const ratio = state.headerRatio || 35;
    const badge = document.getElementById('vbSliderBadge');
    if (badge) {
      badge.textContent = `${ratio}% / ${100 - ratio}%`;
    }
  }

  function updateHeaderLayout() {
    const leftCol = document.getElementById('docHeaderLeft');
    const rightCol = document.getElementById('docHeaderRight');
    if (leftCol && rightCol) {
      const ratio = state.headerRatio || 35;
      leftCol.style.width = `${ratio}%`;
      rightCol.style.width = `${100 - ratio}%`;
    }
  }

  function toggleAccordion(accKey) {
    state.accordionStates[accKey] = !state.accordionStates[accKey];
    updateAccordionUI();
  }

  function updateAccordionUI() {
    ['acc1', 'acc2', 'acc3'].forEach(k => {
      const el = document.getElementById(`vbAccordion_${k}`);
      if (el) {
        if (state.accordionStates[k]) {
          el.classList.add('open');
        } else {
          el.classList.remove('open');
        }
      }
    });
  }

  // 10. TAGS MANAGEMENT (NƠI NHẬN)
  function renderTags() {
    const container = document.getElementById('vbTagChipsContainer');
    if (!container) return;

    container.innerHTML = state.recipients.map((tag, idx) => `
      <span class="vb-tag-chip">
        <span>${escapeHtml(tag)}</span>
        <span class="vb-tag-chip-remove" onclick="AdministrativeDocEngine.removeRecipientTag(${idx})" title="Xóa">&times;</span>
      </span>
    `).join('');
  }

  function addRecipientTag(text) {
    const clean = text.trim();
    if (!clean) return;
    if (!state.recipients.includes(clean)) {
      state.recipients.push(clean);
      renderTags();
      updateLivePreview();
    }
  }

  function removeRecipientTag(idx) {
    if (idx >= 0 && idx < state.recipients.length) {
      state.recipients.splice(idx, 1);
      renderTags();
      updateLivePreview();
    }
  }

  function quickAddSuggestion(text) {
    addRecipientTag(text);
    if (typeof showToast === 'function') {
      showToast(`Đã thêm nơi nhận: "${text}"`);
    }
  }

  // 11. STEP NAVIGATION WIZARD
  function goToStep(step) {
    state.currentStep = step;
    updateStepUI();
    const ctrlPane = document.getElementById('vbControlPane');
    if (ctrlPane) {
      ctrlPane.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function updateStepUI() {
    [1, 2, 3].forEach(s => {
      const tab = document.getElementById(`vbTabStep_${s}`);
      const content = document.getElementById(`vbStepContent_${s}`);
      if (tab) {
        if (s === state.currentStep) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      }
      if (content) {
        content.style.display = (s === state.currentStep) ? 'block' : 'none';
      }
    });
  }

  // 12. LIVE PREVIEW RENDER (A4 PAPER REALTIME SYNC)
  function updateLivePreview() {
    updateHeaderLayout();

    // 1. Header Left (Cơ quan ban hành)
    const prevChuQuan = document.getElementById('docPrevCoQuanChuQuan');
    const prevBanHanh = document.getElementById('docPrevCoQuanBanHanh');
    const prevSoKyHieu = document.getElementById('docPrevSoKyHieu');

    if (prevChuQuan) {
      if (state.coQuanChuQuan) {
        prevChuQuan.textContent = state.coQuanChuQuan.toUpperCase();
        prevChuQuan.style.display = 'block';
      } else {
        prevChuQuan.textContent = '[CƠ QUAN CHỦ QUẢN]';
        prevChuQuan.style.display = 'none';
      }
    }

    if (prevBanHanh) {
      if (state.isLienTich && state.secondaryUnits && state.secondaryUnits.length > 0) {
        const list = [state.coQuanBanHanh || '[CƠ QUAN BAN HÀNH]'];
        state.secondaryUnits.forEach(u => {
          if (u.coQuanBanHanh) list.push(u.coQuanBanHanh);
        });
        prevBanHanh.innerHTML = list.map(name => `<div style="font-size:12pt; font-weight:bold; text-transform:uppercase;">${escapeHtml(name)}</div>`).join('');
      } else {
        prevBanHanh.textContent = state.coQuanBanHanh ? state.coQuanBanHanh.toUpperCase() : '[CƠ QUAN BAN HÀNH]';
      }
    }

    if (prevSoKyHieu) {
      prevSoKyHieu.textContent = `Số: ${state.soKyHieu || '01/TB-SNV'}`;
    }

    // 2. Header Right (Địa danh, ngày tháng)
    const prevDiaDanhNgay = document.getElementById('docPrevDiaDanhNgay');
    if (prevDiaDanhNgay) {
      const dd = state.diaDanh ? state.diaDanh : '[Địa danh]';
      const dObj = state.ngayBanHanh ? new Date(state.ngayBanHanh) : new Date();
      const day = String(dObj.getDate()).padStart(2, '0');
      const month = String(dObj.getMonth() + 1).padStart(2, '0');
      const year = dObj.getFullYear();
      prevDiaDanhNgay.textContent = `${dd}, ngày ${day} tháng ${month} năm ${year}`;
    }

    // 3. Tiêu đề loại & Trích yếu
    const prevTieuDe = document.getElementById('docPrevTieuDeLoai');
    const prevTrichYeu = document.getElementById('docPrevTrichYeu');

    if (prevTieuDe) {
      const matched = DOC_TYPES.find(t => t.name === state.loaiVanBan);
      prevTieuDe.textContent = matched ? matched.title : (state.loaiVanBan || 'THÔNG BÁO');
    }

    if (prevTrichYeu) {
      let subj = state.trichYeu || 'Về việc ...';
      if (!subj.toLowerCase().startsWith('về việc') && !subj.toLowerCase().startsWith('v/v') && state.loaiVanBan !== 'QUYẾT ĐỊNH') {
        subj = `Về việc ${subj}`;
      }
      prevTrichYeu.textContent = subj;
    }

    // 4. Nội dung văn bản
    const prevNoiDung = document.getElementById('docPrevNoiDung');
    if (prevNoiDung && prevNoiDung !== document.activeElement) {
      if (typeof DocumentFormatter !== 'undefined') {
        prevNoiDung.innerHTML = DocumentFormatter.formatParagraphsHtml(state.noiDung);
      } else {
        const paras = (state.noiDung || '').split('\n').filter(p => p.trim().length > 0);
        if (paras.length > 0) {
          prevNoiDung.innerHTML = paras.map(p => `<p style="font-family:'Times New Roman', Times, serif; font-size:13pt; text-indent:1cm; margin:0 0 6pt 0; text-align:justify; line-height:1.5;">${escapeHtml(p)}</p>`).join('');
        } else {
          prevNoiDung.innerHTML = `<p style="font-family:'Times New Roman', Times, serif; font-size:13pt; text-indent:1cm; margin:0 0 6pt 0; text-align:justify; line-height:1.5; color:#94a3b8;">[Chưa có nội dung văn bản. Nhập nội dung ở bước 2 hoặc dùng AI để tạo dự thảo tự động]</p>`;
        }
      }
    }

    // 5. Nơi nhận (Footer Left)
    const prevNoiNhan = document.getElementById('docPrevNoiNhanList');
    if (prevNoiNhan) {
      if (state.recipients && state.recipients.length > 0) {
        prevNoiNhan.innerHTML = state.recipients.map(r => {
          let text = r.trim();
          if (!text.startsWith('-')) text = '- ' + text;
          return `<div style="line-height: 1.35; margin-bottom: 2px;">${escapeHtml(text)}</div>`;
        }).join('');
      } else {
        prevNoiNhan.innerHTML = `<div>- Lưu: VT.</div>`;
      }
    }

    // 6. Chữ ký & Họ tên (Footer Right — hỗ trợ văn bản liên tịch như Ảnh 1)
    const sigContainer = document.getElementById('docSignatureContainer');
    if (sigContainer) {
      if (state.isLienTich && state.secondaryUnits && state.secondaryUnits.length > 0) {
        // Nhiều đơn vị ký liên tịch (2 cột chữ ký song song)
        sigContainer.innerHTML = `
          <div style="display:flex; justify-content:space-around; gap:16px;">
            <div style="text-align:center; flex:1;">
              <div class="footer-sign-role" style="font-size:13pt; font-weight:bold; text-transform:uppercase; color:#000; line-height:1.25;">
                ${escapeHtml(state.chucVu ? state.chucVu.toUpperCase() : '[CHỨC VỤ]')}
              </div>
              <div style="height:55px;"></div>
              <div class="footer-sign-name" style="font-size:13pt; font-weight:bold; color:#000; line-height:1.25;">
                ${escapeHtml(state.hoTen ? state.hoTen : '[Họ và tên]')}
              </div>
            </div>
            ${state.secondaryUnits.map(u => `
              <div style="text-align:center; flex:1;">
                <div class="footer-sign-role" style="font-size:13pt; font-weight:bold; text-transform:uppercase; color:#000; line-height:1.25;">
                  ${escapeHtml(u.chucVu ? u.chucVu.toUpperCase() : '[CHỨC VỤ]')}
                </div>
                <div style="height:55px;"></div>
                <div class="footer-sign-name" style="font-size:13pt; font-weight:bold; color:#000; line-height:1.25;">
                  ${escapeHtml(u.hoTen ? u.hoTen : '[Họ và tên]')}
                </div>
              </div>
            `).join('')}
          </div>
        `;
      } else {
        // Đơn vị duy nhất
        sigContainer.innerHTML = `
          <div style="text-align:center;">
            <div id="docPrevChucVu" class="footer-sign-role" style="font-size:13pt; font-weight:bold; text-transform:uppercase; color:#000; line-height:1.25;">
              ${escapeHtml(state.chucVu ? state.chucVu.toUpperCase() : '[CHỨC VỤ]')}
            </div>
            <div style="height:60px;"></div>
            <div id="docPrevHoTen" class="footer-sign-name" style="font-size:13pt; font-weight:bold; color:#000; line-height:1.25;">
              ${escapeHtml(state.hoTen ? state.hoTen : '[Họ và tên]')}
            </div>
          </div>
        `;
      }
    }
  }

  // 13. TEMPLATE APPLIER
  function applyPresetTemplate(key) {
    const tpl = PRESET_TEMPLATES[key] || PRESET_TEMPLATES.default;
    state.loaiVanBan = tpl.type;
    const matched = DOC_TYPES.find(t => t.name === tpl.type);
    state.loaiCode = matched ? matched.code : 'TB';
    
    state.coQuanChuQuan = tpl.coQuanChuQuan;
    state.coQuanBanHanh = tpl.coQuanBanHanh;
    state.maDonVi = tpl.maDonVi;
    state.diaDanh = tpl.diaDanh || 'Ninh Bình';
    state.soVanBan = tpl.so;
    state.chucVu = tpl.chucVu;
    state.hoTen = tpl.hoTen;
    state.recipients = [...tpl.recipients];
    state.trichYeu = tpl.subject;
    state.noiDung = tpl.body;

    recalcSoKyHieu();
    renderFormControls();
    updateLivePreview();

    if (typeof showToast === 'function') {
      showToast(`Đã nạp mẫu: "${tpl.name}"!`);
    }
  }

  function applyPresetFullContent() {
    const key = document.getElementById('vbAiTemplateSelect')?.value || 'default';
    applyPresetTemplate(key);
  }

  // 14. SMART AI DRAFT GENERATOR (VĂN PHONG CÔNG VỤ CHUẨN MỰC)
  function generateAiDraft() {
    const subject = document.getElementById('vbTrichYeuInput')?.value.trim() || state.trichYeu || 'Về việc triển khai nhiệm vụ và công tác chuyên môn';
    const context = document.getElementById('vbContextInput')?.value.trim() || '';
    const loai = state.loaiVanBan || 'THÔNG BÁO';
    const agency = state.coQuanBanHanh || 'Đơn vị';
    const leader = state.chucVu || 'Giám đốc';

    let generated = "";

    if (loai === 'THÔNG BÁO') {
      generated = `Căn cứ Nghị định số 30/2020/NĐ-CP ngày 05 tháng 3 năm 2020 của Chính phủ về công tác văn thư;
Căn cứ Quy chế làm việc và chương trình công tác năm 2026 của ${agency};
${context ? `Xuất phát từ yêu cầu thực tiễn: ${context};` : 'Nhằm chủ động thực hiện tốt nhiệm vụ chuyên môn và nâng cao hiệu lực, hiệu quả quản lý, điều hành;'}

${agency} thông báo đến toàn thể các phòng, ban, đơn vị chức năng và cán bộ, công chức, viên chức nội dung như sau:

1. Về mục tiêu và nhiệm vụ chung:
Khẩn trương rà soát các đầu việc, chương trình công tác được giao; đề cao trách nhiệm người đứng đầu trong việc điều hành, giải quyết hồ sơ công việc đúng thời hạn quy định.

2. Về các biện pháp triển khai cụ thể:
- Đẩy mạnh việc xử lý văn bản, hồ sơ trên môi trường số; thực hiện nghiêm quy trình quản lý văn bản theo quy định.
- Tăng cường kỷ luật, kỷ cương hành chính; chủ động phối hợp giữa các bộ phận chuyên môn để giải quyết dứt điểm các vướng mắc phát sinh.
- Thực hiện nghiêm chế độ thông tin, báo cáo định kỳ trước 16h30 thứ Sáu hàng tuần.

3. Tổ chức thực hiện:
Giao Văn phòng cơ quan theo dõi, đôn đốc tiến độ thực hiện; kịp thời tổng hợp khó khăn, vướng mắc báo cáo ${leader} xem xét, chỉ đạo.

Thông báo này có hiệu lực kể từ ngày ký. Yêu cầu các đơn vị, cá nhân có liên quan nghiêm túc triển khai thực hiện./.`;
    } else if (loai === 'QUYẾT ĐỊNH') {
      generated = `Căn cứ Luật Tổ chức chính quyền địa phương ngày 19 tháng 6 năm 2015;
Căn cứ Nghị định số 30/2020/NĐ-CP ngày 05 tháng 3 năm 2020 của Chính phủ về công tác văn thư;
${context ? `Căn cứ yêu cầu thực tiễn: ${context};` : 'Căn cứ chức năng, nhiệm vụ và điều lệ hoạt động của cơ quan, đơn vị;'}
Theo đề nghị của Trưởng bộ phận chuyên môn.

QUYẾT ĐỊNH:

Điều 1. Phê duyệt và ban hành kèm theo Quyết định này kế hoạch thực hiện đối với nội dung: "${subject}".

Điều 2. Giao các phòng, ban, đơn vị trực thuộc căn cứ chức năng, nhiệm vụ chủ động triển khai thực hiện bảo đảm chất lượng, hiệu quả và tiến độ đề ra.

Điều 3. Quyết định này có hiệu lực thi hành kể từ ngày ký.
Chánh Văn phòng, Trưởng các đơn vị có liên quan và các cá nhân có tên tại Điều 1 chịu trách nhiệm thi hành Quyết định này./.`;
    } else if (loai === 'CÔNG VĂN') {
      generated = `Kính gửi: Các cơ quan, đơn vị, đối tác có liên quan.

Thực hiện kế hoạch công tác về việc ${subject.toLowerCase()};
${context ? `Để giải quyết nội dung: ${context};` : 'Nhằm tăng cường công tác phối hợp và bảo đảm hiệu quả thực hiện nhiệm vụ được giao;'}

${agency} trân trọng đề nghị Quý cơ quan, đơn vị phối hợp triển khai các nội dung trọng tâm sau:

1. Tiếp tục phối hợp chặt chẽ, trao đổi thông tin thường xuyên qua hệ thống văn bản điện tử để rút ngắn thời gian xử lý công việc.
2. Phân công cán bộ đầu mối phụ trách theo dõi, tổng hợp và cung cấp số liệu, hồ sơ liên quan trước ngày 25 hàng tháng.
3. Trong quá trình thực hiện, nếu có khó khăn, vướng mắc, đề nghị kịp thời trao đổi với Văn phòng ${agency} để cùng thống nhất phương án xử lý.

Rất mong nhận được sự phối hợp chặt chẽ của Quý cơ quan, đơn vị./.`;
    } else {
      generated = `Căn cứ Nghị định số 30/2020/NĐ-CP ngày 05 tháng 3 năm 2020 của Chính phủ về công tác văn thư;
Căn cứ chức năng, nhiệm vụ và quy chế hoạt động của ${agency};
${context ? `Căn cứ nội dung: ${context};` : 'Thực hiện chương trình công tác trọng tâm năm 2026;'}

I. MỤC ĐÍCH, YÊU CẦU
1. Mục đích: Đảm bảo thực hiện thống nhất, kịp thời và hiệu quả nội dung ${subject}.
2. Yêu cầu: Tất cả các bộ phận, cá nhân nêu cao tinh thần trách nhiệm, chấp hành nghiêm quy định pháp luật và quy chế nội bộ.

II. NỘI DUNG THỰC HIỆN
1. Rà soát, xây dựng kế hoạch chi tiết cho từng giai đoạn, phân công rõ người, rõ việc, rõ tiến độ và rõ trách nhiệm.
2. Ứng dụng công nghệ thông tin và quy trình số hóa để tối ưu hóa hiệu suất làm việc.

III. TỔ CHỨC THỰC HIỆN
Giao các đơn vị chức năng chịu trách nhiệm triển khai và báo cáo kết quả thực hiện theo định kỳ./.`;
    }

    if (typeof DocumentFormatter !== 'undefined') {
      generated = DocumentFormatter.normalizePunctuation(generated);
    }

    state.noiDung = generated;
    setInputValue('vbBodyEditor', generated);
    updateLivePreview();

    if (typeof showToast === 'function') {
      showToast('AI đã tạo xong dự thảo văn bản chuẩn Nghị định 30!');
    }
  }

  // 15. AI REFINEMENT ACTIONS (Bước 3)
  function refineAi(action) {
    let current = state.noiDung || '';
    if (!current) {
      if (typeof showToast === 'function') showToast('Văn bản chưa có nội dung để tinh chỉnh!');
      return;
    }

    if (action === 'formalize') {
      current = current
        .replace(/chúng tôi/gi, `${state.coQuanBanHanh || 'Đơn vị'}`)
        .replace(/các bạn/gi, 'các đơn vị, cá nhân')
        .replace(/mình/gi, 'cơ quan')
        .replace(/\bnhé\b|\bnhỉ\b|\bạ\b/gi, '');
      if (typeof DocumentFormatter !== 'undefined') {
        current = DocumentFormatter.normalizePunctuation(current);
      }
      if (typeof showToast === 'function') showToast('Đã chuẩn hóa văn phong và dấu câu công vụ chuẩn mực!');
    } else if (action === 'shorten') {
      const lines = current.split('\n').filter(l => l.trim().length > 0);
      current = lines.map(l => l.replace(/một cách rất/gi, '').replace(/vô cùng/gi, '').trim()).join('\n\n');
      if (typeof DocumentFormatter !== 'undefined') {
        current = DocumentFormatter.normalizePunctuation(current);
      }
      if (typeof showToast === 'function') showToast('Đã cô đọng nội dung súc tích hơn!');
    } else if (action === 'addLegal') {
      if (!current.includes('30/2020/NĐ-CP')) {
        current = `Căn cứ Nghị định số 30/2020/NĐ-CP ngày 05 tháng 3 năm 2020 của Chính phủ về công tác văn thư;\n` + current;
      }
      if (typeof DocumentFormatter !== 'undefined') {
        current = DocumentFormatter.normalizePunctuation(current);
      }
      if (typeof showToast === 'function') showToast('Đã bổ sung căn cứ pháp lý quy chuẩn!');
    } else if (action === 'checkNd30') {
      let errors = [];
      if (!state.coQuanBanHanh) errors.push('Thiếu Tên cơ quan ban hành');
      if (!state.diaDanh) errors.push('Thiếu Địa danh ban hành văn bản');
      if (!state.chucVu) errors.push('Thiếu Chức vụ người ký');
      if (!state.hoTen) errors.push('Thiếu Họ và tên người ký');
      if (!state.recipients || state.recipients.length === 0) errors.push('Thiếu Nơi nhận văn bản');

      if (errors.length === 0) {
        if (typeof showToast === 'function') showToast('Tuyệt vời! Văn bản đáp ứng đầy đủ 9/9 thành phần thể thức NĐ 30/2020/NĐ-CP.');
      } else {
        alert(`Kiểm tra thể thức phát hiện các điểm cần lưu ý:\n- ` + errors.join('\n- '));
      }
      return;
    }

    state.noiDung = current;
    setInputValue('vbBodyEditor', current);
    updateLivePreview();
  }

  // 16. PRINT A4 (CHUẨN LỀ NĐ 30/2020: TRÊN 20, DƯỚI 20, TRÁI 30, PHẢI 15 MM)
  function printA4() {
    updateLivePreview();
    
    // Tạm thời đổi title thành trích yếu để khi Save as PDF, tên file gợi ý sạch đẹp
    const oldTitle = document.title;
    const cleanSubject = (state.trichYeu || 'Van_ban_hanh_chinh_ND30').trim().replace(/[^a-zA-Z0-9\u00C0-\u024F\u1EA0-\u1EF9]/g, '_').substring(0, 50);
    document.title = cleanSubject;

    // Đảm bảo cập nhật tỷ lệ cột 35% / 65% trước khi in
    const leftCol = document.getElementById('docHeaderLeft');
    const rightCol = document.getElementById('docHeaderRight');
    if (leftCol && rightCol) {
      leftCol.style.width = '35%';
      rightCol.style.width = '65%';
    }

    // Kích hoạt hộp thoại in hệ thống
    window.print();

    // Khôi phục lại title gốc
    setTimeout(() => {
      document.title = oldTitle;
      updateHeaderLayout();
    }, 1000);
  }

  // 17. EXPORT MICROSOFT WORD (.DOC)
  function exportDocx() {
    const docHtml = generateWordCompatibleHtml();
    const blob = new Blob(['\ufeff', docHtml], {
      type: 'application/msword;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safeName = (state.trichYeu || 'Van-ban-hanh-chinh').replace(/[^a-zA-Z0-9\u00C0-\u024F\u1EA0-\u1EF9]/g, '_').substring(0, 40);
    a.download = `${safeName}_ND30.doc`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 200);

    if (typeof showToast === 'function') {
      showToast('Đã tải file Word (.doc) chuẩn thể thức Nghị định 30!');
    }
  }

  function generateWordCompatibleHtml() {
    const chuQuan = state.coQuanChuQuan ? state.coQuanChuQuan.toUpperCase() : '';
    const banHanh = state.coQuanBanHanh ? state.coQuanBanHanh.toUpperCase() : 'SỞ NỘI VỤ';
    const so = `Số: ${state.soKyHieu || '01/TB-SNV'}`;
    const diaDanh = state.diaDanh || 'Ninh Bình';
    const dObj = state.ngayBanHanh ? new Date(state.ngayBanHanh) : new Date();
    const day = String(dObj.getDate()).padStart(2, '0');
    const month = String(dObj.getMonth() + 1).padStart(2, '0');
    const year = dObj.getFullYear();
    const dateStr = `${diaDanh}, ngày ${day} tháng ${month} năm ${year}`;

    const loai = state.loaiVanBan || 'THÔNG BÁO';
    const trichYeu = state.trichYeu || 'Về việc tổ chức hội nghị tổng kết công tác năm 2026';

    let normalizedText = state.noiDung || '';
    if (typeof DocumentFormatter !== 'undefined') {
      normalizedText = DocumentFormatter.normalizePunctuation(normalizedText);
    }
    const paras = normalizedText.split('\n').filter(p => p.trim().length > 0);
    const bodyHtml = paras.map(p => {
      let line = p.trim();
      let isBold = /^(\d+\.|\bĐiều\s+\d+\.|\bChương\s+[IVXLCDM]+\.)/i.test(line);
      return `<p style="margin:0 0 6pt 0; text-indent:1.0cm; text-align:justify; font-family:'Times New Roman', serif; font-size:13pt; line-height:1.5;">${isBold ? '<b>' + escapeHtml(line) + '</b>' : escapeHtml(line)}</p>`;
    }).join('');

    const recipientsHtml = (state.recipients || ['- Thủ trưởng đơn vị;', '- Các phòng ban chức năng;', '- Lưu: VT.']).map(r => {
      let t = r.trim();
      if (!t.startsWith('-')) t = '- ' + t;
      return `<div style="font-size:11pt; line-height:1.3; font-family:'Times New Roman', serif;">${escapeHtml(t)}</div>`;
    }).join('');

    const chucVu = state.chucVu ? state.chucVu.toUpperCase() : 'GIÁM ĐỐC';
    const hoTen = state.hoTen ? state.hoTen : 'Nguyễn Văn A';

    return `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${escapeHtml(trichYeu)}</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page {
            size: 21.0cm 29.7cm; /* A4 */
            margin: 2.0cm 2.0cm 2.0cm 2.0cm; /* Căn lề chính giữa giấy A4 tuyệt đối cân xứng */
            mso-page-orientation: portrait;
          }
          body {
            font-family: 'Times New Roman', Times, serif;
            font-size: 13pt;
            color: #000;
            line-height: 1.5;
          }
          table { width: 100%; border-collapse: collapse; border: none; }
          td { border: none; padding: 0; vertical-align: top; }
        </style>
      </head>
      <body>
        <!-- Header Table -->
        <table style="margin-bottom: 18pt;">
          <tr>
            <td style="width: 35%; text-align: center;">
              ${chuQuan ? `<div style="font-size: 12pt; text-transform: uppercase;">${escapeHtml(chuQuan)}</div>` : ''}
              <div style="font-size: 13pt; font-weight: bold; text-transform: uppercase;">${escapeHtml(banHanh)}</div>
              <div style="width: 40%; border-bottom: 1pt solid #000; margin: 3pt auto;"></div>
              <div style="font-size: 12pt; margin-top: 4pt;">${escapeHtml(so)}</div>
            </td>
            <td style="width: 65%; text-align: center;">
              <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase; white-space: nowrap;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
              <div style="font-size: 13pt; font-weight: bold; white-space: nowrap;">Độc lập - Tự do - Hạnh phúc</div>
              <div style="width: 55%; border-bottom: 1pt solid #000; margin: 3pt auto;"></div>
              <div style="font-size: 13pt; font-style: italic; margin-top: 4pt;">${escapeHtml(dateStr)}</div>
            </td>
          </tr>
        </table>

        <!-- Title / Trích yếu -->
        <div style="text-align: center; margin: 24pt 0 16pt 0;">
          <div style="font-size: 14pt; font-weight: bold; text-transform: uppercase;">${escapeHtml(loai)}</div>
          <div style="font-size: 13pt; font-style: italic; font-weight: bold; margin-top: 4pt; text-decoration: underline;">${escapeHtml(trichYeu)}</div>
        </div>

        <!-- Body Content -->
        <div style="margin-bottom: 24pt;">
          ${bodyHtml}
        </div>

        <!-- Footer Signatures -->
        <table>
          <tr>
            <td style="width: 50%; vertical-align: top; padding-top: 6pt;">
              <div style="font-size: 11.5pt; font-weight: bold; font-style: italic;">Nơi nhận:</div>
              ${recipientsHtml}
            </td>
            <td style="width: 50%; text-align: center; vertical-align: top;">
              <div style="font-size: 13pt; font-weight: bold; text-transform: uppercase;">${escapeHtml(chucVu)}</div>
              <div style="height: 65pt;">&nbsp;</div>
              <div style="font-size: 13pt; font-weight: bold;">${escapeHtml(hoTen)}</div>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  }

  // 18. COPY TEXT & SAVE DRAFT
  function copyDocText() {
    const prev = document.getElementById('a4PaperDoc');
    if (!prev) return;
    const text = prev.innerText;
    navigator.clipboard.writeText(text).then(() => {
      if (typeof showToast === 'function') {
        showToast('Đã sao chép toàn bộ nội dung văn bản!');
      }
    }).catch(() => {
      alert('Đã chọn văn bản, hãy nhấn Ctrl+C để sao chép!');
    });
  }

  function saveDraft() {
    localStorage.setItem('nb_administrative_doc_draft', JSON.stringify(state));
    if (typeof showToast === 'function') {
      showToast('Đã lưu bản nháp văn bản vào trình duyệt!');
    }
  }

  function loadDraft() {
    try {
      const saved = localStorage.getItem('nb_administrative_doc_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Tự động dọn dẹp nếu bản lưu cũ còn dính Lộc Nam / đồ đồng
        if (parsed.coQuanBanHanh && (parsed.coQuanBanHanh.includes('LỘC NAM') || parsed.coQuanBanHanh.includes('ĐỒ ĐỒNG'))) {
          delete parsed.coQuanBanHanh;
          delete parsed.maDonVi;
          delete parsed.soKyHieu;
        }
        if (parsed.maDonVi === 'LN') {
          parsed.maDonVi = 'SNV';
        }
        if (!parsed.headerRatio || parsed.headerRatio > 38) {
          parsed.headerRatio = 35;
        }
        state = Object.assign({}, state, parsed);
      }
    } catch(e) {
      console.warn('Cannot parse draft', e);
    }
  }

  function togglePreviewPane() {
    const pane = document.getElementById('vbPreviewPane');
    const btn = document.getElementById('btnTogglePreviewPane');
    if (!pane) return;
    state.isPreviewClosed = !state.isPreviewClosed;
    if (state.isPreviewClosed) {
      pane.style.display = 'none';
      if (btn) btn.innerHTML = 'Mở xem trước &gt;';
    } else {
      pane.style.display = 'flex';
      if (btn) btn.innerHTML = 'Đóng &gt;';
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;');
  }

  // EXPOSE PUBLIC API
  return {
    init: init,
    goToStep: goToStep,
    toggleAccordion: toggleAccordion,
    removeRecipientTag: removeRecipientTag,
    quickAddSuggestion: quickAddSuggestion,
    applyPresetTemplate: applyPresetTemplate,
    applyPresetFullContent: applyPresetFullContent,
    generateAiDraft: generateAiDraft,
    refineAi: refineAi,
    printA4: printA4,
    exportDocx: exportDocx,
    copyDocText: copyDocText,
    saveDraft: saveDraft,
    togglePreviewPane: togglePreviewPane,
    updateLivePreview: updateLivePreview,
    addSecondaryUnit: addSecondaryUnit,
    removeSecondaryUnit: removeSecondaryUnit,
    updateSecondaryUnitField: updateSecondaryUnitField
  };
})();
