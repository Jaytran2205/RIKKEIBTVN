# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Người học bằng lái xe máy (A1, A):** Độ tuổi từ 18+, cần ôn tập nhanh, nắm chắc 20 câu điểm liệt, học mẹo nhớ biển báo và thứ tự sa hình để vượt qua kỳ sát hạch lý thuyết (đạt 21/25 câu, không sai câu liệt).
- **Người học bằng lái ô tô (B, C1, C):** Ôn tập 600 câu hỏi luật đường bộ 2026, các tình huống giao thông nguy hiểm và 60 câu điểm liệt.
- **Cán bộ, giảng viên, nhân viên hành chính:** Sử dụng công cụ soạn thảo văn bản theo Nghị định 30/2020/NĐ-CP và hệ thống chấm thi trắc nghiệm học viên bằng nhận diện AI/OCR.

## Product Purpose

Cung cấp hệ thống học và thi sát hạch lý thuyết lái xe trực tuyến chuẩn cấu trúc Cục Đường Bộ Việt Nam (Luật Trật tự An toàn Giao thông Đường bộ mới 2026). Giúp học viên nắm vững kiến thức, hiểu bản chất luật giao thông thay vì chỉ học vẹt, đồng thời cung cấp các tiện ích hành chính công số hóa cho địa phương.

## Positioning

Hệ thống tích hợp "2 trong 1" giữa cổng thi sát hạch thực tế (đủ 2 chế độ Học có mẹo giải & Thi bấm giờ sát thực tế) với bộ công cụ số địa phương (hành chính công, chấm bài AI, cẩm nang giao thông).

## Operating Context

- Trình duyệt web trên Desktop và Mobile.
- Học viên thường ôn luyện vào buổi tối hoặc tranh thủ thời gian rảnh; giao diện cần dịu mắt, độ tương phản rõ ràng, nút bấm to bản dễ thao tác cả trên điện thoại.

## Capabilities and Constraints

- **Ngân hàng câu hỏi:** 250 câu hỏi A1 (kèm 20 câu điểm liệt), 600 câu hỏi ô tô (kèm 60 câu điểm liệt).
- **Chế độ làm bài:**
  - Chế độ Học: Xem đáp án đúng ngay sau khi chọn, hiển thị giải thích chi tiết, mẹo ghi nhớ và phát âm câu hỏi qua giọng đọc AI (TTS).
  - Chế độ Thi: Giới hạn 19 phút, chấm điểm đỗ/trượt theo barem chuẩn (đúng 21/25 và không sai câu liệt).
- **Lưu trữ dữ liệu:** Lưu lịch sử thi, số câu làm sai vào LocalStorage trên trình duyệt mà không cần đăng nhập bắt buộc.
- **Ràng buộc:** Giữ nguyên toàn bộ logic JavaScript, dữ liệu câu hỏi và tính năng hiện có.

## Product Principles

1. **Chính xác pháp lý & bản chất:** Mẹo thi và đáp án luôn bám sát văn bản pháp quy của Cục Đường Bộ và Bộ Giao thông Vận tải.
2. **Tránh sai câu liệt bằng mọi giá:** 20 câu điểm liệt luôn được phân biệt trực quan bằng màu cảnh báo ưu tiên cao nhất.
3. **Trải nghiệm tập trung (Operate Mode):** Không rườm rà hiệu ứng thừa, ưu tiên tốc độ đọc câu hỏi, thao tác chọn đáp án và xem kết quả nhanh chóng.
