# Ninh Bình Eco Travel & Homestay Booking (React / Next.js 14)

Giao diện Web Booking Du Lịch cao cấp được xây dựng bằng **React / Next.js (App Router)**, **Tailwind CSS**, **Framer Motion** và **Swiper**.

---

## 🌟 Tính Năng & Kiến Trúc Nổi Bật

### 1. Bố Cục & Thị Giác (Visual & Layout)
- **Background Video toàn màn hình**: Tự động phát lặp lại nhẹ nhàng (`loop autoplay muted`), phủ lớp gradient sương mờ `rgba(11,29,22,0.4)` mang đậm nét di sản non nước Ninh Bình.
- **Chuẩn Glassmorphism Apple Level**:
  - `backdrop-filter: blur(16px);`
  - `background: rgba(255, 255, 255, 0.2);`
  - Viền mờ phản xạ ánh sáng: `border: 1px solid rgba(255, 255, 255, 0.3);`
  - Đổ bóng mềm: `box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.25);`
- **Bảng màu thiên nhiên**:
  - Gam màu chủ đạo: **Xanh rừng rậm / xanh rêu** (`#1B4D3E` / `forest-700`).
  - Màu nền chữ & phụ: **Trắng sữa** (`#F8F9FA` / `milk`).
  - Điểm nhấn huy hiệu: **Cam san hô** (`#FF6B4A` / `coral-500`).

### 2. Chuyển Động Chuẩn iOS 60fps (Framer Motion)
- **Timing Function (Easing)**: `cubic-bezier(0.16, 1, 0.3, 1)` chuyển động đàn hồi tự nhiên mượt mà như iOS/Apple.
- **Hero Search Bar**: Thiết kế dạng viên nang `rounded-full` ở trung tâm. Khi hover vào từng vùng (*Loại phòng*, *Địa điểm*, *Ngân sách*), có hiệu ứng active mềm mại và phóng to vi mô `scale: 1.012`.
- **Card Homestay**:
  - Bo góc `rounded-2xl` (16px).
  - Hover: nâng thẻ `y: -6px`, ảnh zoom `scale: 1.05`, nút trái tim có hiệu ứng đập `pulse animation`.
  - Click: Bung mở pop-up chi tiết (*DetailModal*) với bộ sưu tập 4 ảnh thu nhỏ có thể bấm xem ngay, tiện ích, chọn phòng và đặt phòng.
- **Carousel Slider (Swiper)**:
  - Trượt ngang mượt mà, cảm ứng vuốt tiện lợi trên mobile.
  - 2 nút điều hướng mũi tên tròn ở 2 bên nảy nhẹ (`spring bounce`) khi di chuột.

### 3. Chuyển Cảnh Liền Mạch (Seamless Transition)
- Chuyển mượt mà từ giao diện web sang chế độ toàn màn hình xem video phong cảnh homestay/núi non 4K khi bấm nút **"Xem Video 4K"** hoặc nút play nổi ở góc màn hình.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Thử

Di chuyển vào thư mục dự án và chạy:

```bash
cd travel-booking-next
npm install
npm run dev
```

Mở trình duyệt tại [http://localhost:3000](http://localhost:3000).

---

## 📁 Cấu Trúc Thư Mục

```
travel-booking-next/
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Layout gốc chuẩn SEO & Font
│   │   ├── page.tsx               # Trang chính tích hợp toàn bộ components
│   │   └── globals.css            # CSS variables, Glassmorphism & Swiper
│   ├── components/
│   │   ├── BackgroundVideo.tsx     # Video nền lặp lại & lớp overlay chuyển cảnh
│   │   ├── Navbar.tsx             # Thanh điều hướng kính mờ bo tròn
│   │   ├── HeroSearchBar.tsx      # Thanh tìm kiếm pill bo tròn với Framer Motion
│   │   ├── HomestayCard.tsx       # Thẻ homestay hiệu ứng hover & pulse tim
│   │   ├── HomestayCarousel.tsx   # Slider Swiper vuốt ngang với 2 nút mũi tên tròn
│   │   ├── DetailModal.tsx        # Pop-up mở rộng chi tiết với 4 ảnh thu nhỏ
│   │   └── FullScreenVideoModal.tsx # Trình xem video toàn cảnh 4K siêu mượt
│   ├── data/
│   │   └── homestays.ts           # Dữ liệu phòng mẫu thực tế tại Ninh Bình
│   └── types/
│       └── homestay.ts            # Khai báo TypeScript types
├── tailwind.config.ts             # Cấu hình màu #1B4D3E, #FF6B4A, easing Apple
├── tsconfig.json
└── package.json
```
