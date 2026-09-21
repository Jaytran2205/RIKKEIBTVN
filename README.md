# 🌟 NINH BÌNH DIGITAL & ALL-IN-ONE PLATFORM
### Cổng Thông Tin Du Lịch Số, Đặc Sản OCOP Cố Đô & Nền Tảng Tiện Ích Đa Năng

<p align="center">
  <img src="https://img.shields.io/badge/Platform-Web%20Desktop%20%26%20Mobile-0B5C57?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Platform" />
  <img src="https://img.shields.io/badge/Deploy-Cloudflare%20Pages%20Ready-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare Pages Ready" />
  <img src="https://img.shields.io/badge/Maps-Leaflet%20%26%20Google%20Maps-2563EB?style=for-the-badge&logo=leaflet&logoColor=white" alt="Maps" />
  <img src="https://img.shields.io/badge/Code-HTML5%20%7C%20CSS3%20%7C%20ES6+-E34F26?style=for-the-badge&logo=javascript&logoColor=white" alt="Tech" />
  <img src="https://img.shields.io/badge/License-MIT-success?style=for-the-badge" alt="License" />
</p>

---

## 📌 Giới Thiệu Dự Án

**Ninh Bình Digital & All-in-One Platform** là nền tảng web tích hợp hiện đại, kết hợp giải pháp chuyển đổi số du lịch vùng Cố đô Hoa Lư với hệ sinh thái thương mại điện tử đặc sản OCOP và các bộ công cụ tiện ích số thiết yếu.

Được xây dựng với kiến trúc **Ultra-Fast Vanilla Frontend (Không phụ thuộc Framework cồng kềnh)**, hệ thống đảm bảo thời gian tải trang dưới 0.8s, giao diện chuẩn UI/UX phong cách Á Đông đương đại, hỗ trợ tương thích hoàn hảo trên mọi thiết bị di động và máy tính.

---

## 🚀 Các Tính Năng Nổi Bật

### 1. 🗺️ Cẩm Nang Du Lịch & Bản Đồ Số Tương Tác (Ninh Bình Travel Hub)
- **Hơn 60+ cơ sở uy tín được tuyển chọn khắt khe**: Khách sạn 4-5 sao, Homestay view núi, quán dê núi truyền thống, cà phê ngắm đầm sen Tam Cốc, dịch vụ thuê xe máy ga/số chất lượng cao, điểm check-in Tràng An, Hang Múa, Bái Đính, Phố Cổ Hoa Lư.
- **Bản đồ số Leaflet OSM tương tác thời gian thực**:
  - Ghim tự động tọa độ các cơ sở theo 8 khu vực trọng điểm (*Tam Cốc, Tràng An, Hang Múa, Bái Đính, TP. Ninh Bình, Cố Đô Hoa Lư, Kim Sơn, Cúc Phương*).
  - Pop-up thông minh hiển thị ảnh, đánh giá sao, địa chỉ, khoảng giá và nút gọi hotline.
- **Chỉ đường Google Maps chuẩn xác 100%**: Tích hợp thuật toán tự động chuẩn hóa liên kết Universal Google Maps (`https://www.google.com/maps/search/?api=1&query=...`), tương thích mượt mà trên cả Google Maps App (Android, iOS) và Web browser, loại bỏ hoàn toàn lỗi *Dynamic Link Not Found*.
- **Tính năng So sánh giá đa điểm (Smart Comparison)**: Cho phép du khách chọn so sánh từ 2 đến 4 cơ sở cùng lúc theo bảng đối soát trực quan về mức giá, vị trí, ưu điểm và đánh giá review.

### 2. 🌾 Gian Hàng Đặc Sản OCOP Cố Đô (E-Commerce Mini)
- Giới thiệu và phân phối các sản phẩm nông sản, làng nghề đạt chứng nhận OCOP 3–5 sao:
  - Cơm cháy đáy nồi nếp hương & chà bông cao cấp Hoa Lư.
  - Thịt dê núi tươi sạch đóng gói hút chân không.
  - Rượu nếp Kim Sơn hạ thổ chum sành men lá.
  - Mắm tép Gia Viễn tiến vua, Chiếu cói thêu tay Kim Sơn, Trà hoa vàng Cúc Phương...
- Giỏ hàng trực tuyến linh hoạt, tính tổng tiền tự động, hỗ trợ đặt mua nhanh và kết nối trực tiếp Hotline/Zalo của nhà cung cấp.

### 3. ⚙️ Hệ Thống Quản Trị Nội Dung Toàn Diện (Admin CMS — `admin.html`)
- **Dashboard quản trị**: Thống kê số lượng cơ sở, sản phẩm OCOP, tình trạng hiển thị theo thời gian thực.
- **Quản lý linh hoạt**:
  - Thêm mới, chỉnh sửa thông tin, bảng giá, số điện thoại, mô tả nổi bật.
  - Đánh dấu **⭐ Đề Xuất (Featured)** để đưa cơ sở ưu tiên lên vị trí đầu trang.
  - Tính năng Ẩn/Hiện hoặc Xóa cơ sở khi hết phòng/ngừng kinh doanh.
- **Đồng bộ dữ liệu hai chiều**: Dữ liệu lưu trữ thông minh qua `localStorage` và tệp cấu hình trung tâm `ninhbinh_data.js`, đảm bảo dữ liệu luôn nhất quán giữa Web chính và trang Admin.

### 4. 🏍️ Hệ Thống Ôn Thi Sát Hạch GPLX Mô Tô Hạng A1 (250 Câu Hỏi)
- Bộ đề thi chuẩn 250 câu hỏi lý thuyết mới nhất của Tổng cục Đường bộ Việt Nam.
- Chế độ ôn tập chuyên sâu **20 câu hỏi điểm liệt** (sai 1 câu là trượt).
- Tổng hợp bảng **Mẹo thi lý thuyết** ghi nhớ cấp tốc.
- Chế độ thi thử ngẫu nhiên có đếm ngược thời gian, tự động chấm điểm và giải thích đáp án chi tiết.

### 5. 📄 Bộ Công Cụ Tiện Ích Văn Bản Hành Chính
- Hỗ trợ rà soát, căn chỉnh định dạng thể thức văn bản hành chính theo tiêu chuẩn **Nghị định 30/2020/NĐ-CP**.
- Trình biên tập bảng biểu, công cụ làm sạch dữ liệu văn bản nhanh chóng.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

| Thành phần | Công nghệ | Mô tả |
| :--- | :--- | :--- |
| **Giao diện (Frontend)** | HTML5, CSS3 (Modern Vanilla), ES6+ JavaScript | Không dùng framework nặng; tối ưu dung lượng và tốc độ tải trang |
| **Bản đồ số** | [Leaflet.js](https://leafletjs.com/) & OpenStreetMap Tiles | Bản đồ mã nguồn mở mượt mà, không tốn phí API bản đồ đắt đỏ |
| **Định vị & Dẫn đường** | Google Maps Search & Directions API | Chuẩn hóa liên kết chỉ đường trên thiết bị di động và máy bàn |
| **Lưu trữ & Trạng thái** | `localStorage` + `ninhbinh_data.js` | Đồng bộ dữ liệu quản trị tức thì không cần cấu hình database phức tạp |
| **Bộ thu thập dữ liệu** | Python 3 (`crawler_ninhbinh_daily.py`) | Script đồng bộ giá cả và đánh giá địa điểm tự động |
| **Hạ tầng khuyến nghị** | **Cloudflare Pages** / GitHub Pages / Vercel | Hỗ trợ Edge CDN toàn cầu, SSL miễn phí, chống DDoS mạnh mẽ |

---

## ☁️ Hướng Dẫn Triển Khai Lên Cloudflare Pages

Dự án này là **Static Web Application (HTML/CSS/JS thuần)**, hoàn toàn tương thích và **được tối ưu hoàn hảo nhất khi chạy trên Cloudflare Pages**!

### Vì sao nên dùng Cloudflare Pages cho dự án này?
1. **Hoàn toàn Miễn phí (Hạn mức cực lớn)**: Băng thông không giới hạn, không lo vượt quota.
2. **Tốc độ siêu nhanh**: Hệ sinh thái mạng lưới máy chủ Edge CDN toàn cầu của Cloudflare (có datacenter tại Hà Nội và TP.HCM) giúp web mở gần như tức thì.
3. **Bảo mật hàng đầu**: Tự động cấp chứng chỉ bảo mật SSL (HTTPS), chống tấn công DDoS tự động.
4. **Tên miền tùy chỉnh**: Dễ dàng trỏ tên miền riêng (ví dụ: `dulichninhbinh.vn`) chỉ với 1 cú click.

### Các bước Deploy lên Cloudflare Pages trong 2 phút:

#### Cách 1: Kết nối trực tiếp qua GitHub Repo (Khuyên dùng)
1. Đăng nhập vào [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Chọn menu **Workers & Pages** > Bấm nút **Create application** > Chọn tab **Pages**.
3. Chọn **Connect to Git** > Chọn Repository GitHub của bạn (`Allinone` hoặc `RIKKEIBTVN`).
4. Tại mục **Build settings**:
   - **Framework preset**: Chọn `None` (hoặc để trống).
   - **Build command**: *Để trống* (vì là web tĩnh).
   - **Build output directory**: Để trống hoặc điền `/`.
5. Bấm **Save and Deploy**. Cloudflare sẽ build xong trong vòng 10 giây và cung cấp một đường dẫn `https://ten-du-an.pages.dev` hoạt động 24/7!

#### Cách 2: Upload trực tiếp (Direct Upload - Không cần Git)
1. Trong Cloudflare Dashboard > **Workers & Pages** > **Create application** > **Pages** > Chọn **Upload assets**.
2. Đặt tên dự án (ví dụ: `ninhbinh-travel`).
3. Kéo thả toàn bộ thư mục dự án (chứa `index.html`, `admin.html`, `ninhbinh_data.js`, thư mục `images/`...) lên giao diện web.
4. Bấm **Deploy site** là trang web sẽ online ngay lập tức!

---

## 💻 Cài Đặt & Chạy Cục Bộ (Local Development)

Không cần cài đặt môi trường phức tạp! Bạn chỉ cần một trình duyệt web:

1. **Clone mã nguồn về máy**:
   ```bash
   git clone https://github.com/Jaytran2205/RIKKEIBTVN.git
   cd RIKKEIBTVN
   ```

2. **Chạy trang web**:
   - Mở trực tiếp tệp `index.html` trên trình duyệt (Chrome, Edge, Firefox, Safari).
   - Hoặc khởi tạo máy chủ cục bộ bằng extension **Live Server** trên VS Code / Antigravity IDE.
   - Hoặc dùng Python:
     ```bash
     # Với Python 3
     python -m http.server 8080
     ```
     Sau đó truy cập: `http://localhost:8080` trên trình duyệt.

3. **Truy cập trang Quản Trị**:
   - Mở tệp `admin.html` hoặc truy cập `http://localhost:8080/admin.html`.

---

## 📁 Cấu Trúc Thư Mục Dự Án

```plaintext
Allinone/
├── index.html                 # Giao diện chính (Cẩm nang du lịch, bản đồ số, OCOP, GPLX A1)
├── admin.html                 # Bảng điều khiển CMS quản trị cơ sở, sản phẩm và dịch vụ
├── ninhbinh_data.js           # Cơ sở dữ liệu trung tâm & hàm chuẩn hóa Google Maps, cache
├── ninhbinh_database.json     # Tệp dữ liệu nguồn định dạng JSON chuẩn
├── crawler_ninhbinh_daily.py  # Script crawler Python cập nhật dữ liệu tự động
├── styles.css                 # Hệ thống style giao diện chính
├── color-variables.css        # Bảng mã màu thương hiệu Á Đông hiện đại
├── travel-redesign.css        # CSS tùy chỉnh chuyên sâu cho phân hệ Du lịch
├── interface-overhaul.css     # CSS hoàn thiện giao diện responsive
├── images/                    # Thư mục hình ảnh cơ sở, banner, đặc sản OCOP thực tế
│   ├── aravinda_resort.jpg    # Hình ảnh thực tế của Aravinda Resort Ninh Bình
│   └── ...
└── README.md                  # Tài liệu giới thiệu và hướng dẫn dự án
```

---

## 🤝 Tác Giả & Bản Quyền

- **Nhà phát triển**: [Jay Trần (Jaytran2205)](https://github.com/Jaytran2205)
- **Hỗ trợ & Liên hệ**:
  - Hotline: `0866.520.567`
  - Zalo: [0866520567](https://zalo.me/0866520567)
  - Facebook: [Jay Trần](https://web.facebook.com/jaytran0522)
- **Giấy phép (License)**: Dự án được phát hành theo giấy phép mã nguồn mở **MIT License**.
