# Workspace Guidelines & Instructions

## 1. Nguyên Tắc Tự Động Áp Dụng (Auto-Apply & Auto-Sync)
- **Tự động cập nhật không cần hỏi lại**: Sau khi phân tích hoặc nhận yêu cầu sửa đổi, trợ lý AI phải trực tiếp chỉnh sửa, áp dụng mã nguồn, kiểm tra cú pháp và tự động đồng bộ hóa. Tuyệt đối không dừng lại để hỏi xác nhận hay xin phê duyệt từng bước nhỏ trừ khi người dùng chủ động yêu cầu thảo luận thiết kế.
- **Đồng bộ hóa 2 chiều thư mục con `Allinone/`**: Bất kỳ file nào được chỉnh sửa ở thư mục gốc (`index.html`, `styles.css`, `admin.html`, `administrative-doc-engine.js`, `supabase_client.js`, v.v.) PHẢI được tự động đồng bộ sang thư mục con `Allinone/` tương ứng để tránh lệch code khi deploy hoặc test.

## 2. Bảo Mật & Thông Tin Quản Trị
- Tuyệt đối không hardcode, gợi ý hoặc để lộ tên tài khoản đăng nhập quản trị (username/password) trên giao diện web (placeholder, hint box, thông báo lỗi validation hay console alert).
- Mọi thông báo lỗi đăng nhập phải dùng thông điệp bảo mật chung: `"Sai tài khoản hoặc mật khẩu quản trị! Vui lòng kiểm tra lại."`.

## 3. Quy Chuẩn In Ấn Chuẩn Thể Thức (@media print)
- Mọi thành phần giao diện động hoặc nổi (`#compareFloatingBar`, `#floatingContactWidget`, `.floating-contact-btn`, `#floatHotlineBtn`, `#floatZaloBtn`, `#floatMessengerBtn`, `.feedback-fab`, modal overlays, header/footer của web) phải luôn được ẩn triệt để trong `@media print` bằng `display: none !important; visibility: hidden !important; opacity: 0 !important;`.
- Trước khi gọi hộp thoại in `window.print()`, hệ thống phải luôn đặt `scrollTop = 0` trên tất cả các khung chứa và cuộn trang lên đỉnh để tránh trình duyệt cắt xén phần đầu tài liệu.

## 4. Phạm Vi & Ranh Giới Dự Án
- Tuân thủ nghiêm ngặt các ngoại lệ người dùng đã chỉ định (ví dụ: lỗi bản đồ Leaflet thiếu tile map ở trang `#travel` không được can thiệp trừ khi người dùng yêu cầu sửa đổi cụ thể).
