# 📘 CẨM NANG HƯỚNG DẪN SỬ DỤNG PHÂN HỆ SOẠN THẢO VĂN BẢN HÀNH CHÍNH
### Nền tảng Công vụ số — Chuẩn thể thức Nghị định số 30/2020/NĐ-CP của Chính phủ

---

## MỤC LỤC
1. [Tổng quan giao diện](#1-tổng-quan-giao-diện)
2. [Cơ chế hoạt động của bộ AI sửa & soạn thảo văn bản](#2-cơ-chế-hoạt-động-của-bộ-ai-sửa--soạn-thảo-văn-bản)
3. [Hướng dẫn chi tiết từng tính năng](#3-hướng-dẫn-chi-tiết-từng-tính-năng)
   - [3.1. Cột trái: Tờ giấy A4 trực quan & Thao tác xuất bản](#31-cột-trái-tờ-giấy-a4-trực-quan--thao-tác-xuất-bản)
   - [3.2. Bước 1: Thiết lập thể thức & Thông tin ban hành](#32-bước-1-thiết-lập-thể-thức--thông-tin-ban-hành)
   - [3.3. Bước 2: Tạo nội dung & Ứng dụng AI](#33-bước-2-tạo-nội-dung--ứng-dụng-ai)
   - [3.4. Bước 3: Tinh chỉnh văn phong AI & Xuất bản](#34-bước-3-tinh-chỉnh-văn-phong-ai--xuất-bản)
4. [Bảng đối chiếu 9 thành phần thể thức theo Nghị định 30/2020/NĐ-CP](#4-bảng-đối-chiếu-9-thành-phần-thể-thức-theo-nghị-định-302020nđ-cp)
5. [Mẹo và phím tắt thao tác nhanh](#5-mẹo-và-phím-tắt-thao-tác-nhanh)

---

## 1. TỔNG QUAN GIAO DIỆN

Giao diện soạn thảo được thiết kế thông minh theo **bố cục 2 cột tách biệt (Split View)**:
- **Cột Trái (Live A4 Preview):** Mô phỏng tờ giấy trắng A4 thật với tỷ lệ kích thước chuẩn xác. Toàn bộ nội dung nhập từ bên phải được đồng bộ theo thời gian thực (Realtime WYSIWYG). Căn lề chuẩn đối xứng 20mm đều 4 phía, văn bản nằm chính giữa giấy A4.
- **Cột Phải (Control Wizard):** Quy trình làm việc 3 bước khoa học (Thiết lập thể thức $\rightarrow$ Nội dung & AI $\rightarrow$ Hoàn tất & Xuất bản). Hai cột cuộn độc lập giúp thanh công cụ không bị trôi khi soạn thảo văn bản dài.

---

## 2. CƠ CHẾ HOẠT ĐỘNG CỦA BỘ AI SỬA & SOẠN THẢO VĂN BẢN

Hệ thống AI trong phân hệ này được xây dựng trên **kiến trúc 3 tầng (3-Tier Engine)** độc quyền:

```
[ Ý tưởng / Bối cảnh thô ] 
           ↓
┌─────────────────────────────────────────────────────────────────┐
│ Tầng 1: Bộ chuẩn hóa thể thức (DocumentFormatter)               │
│ • Sửa lỗi dính dấu, khoảng trắng kép, chuẩn hóa ngày tháng       │
│ • Nhận diện từ khóa pháp lý (Điều, Căn cứ) để in đậm / in nghiêng │
└─────────────────────────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────────────────────────┐
│ Tầng 2: Thuật toán chuyển đổi ngôn ngữ công vụ (Rule-Engine)    │
│ • Thay thế đại từ khẩu ngữ thường ngày thành thuật ngữ hành chính│
│ • Loại bỏ từ ngữ sáo rỗng, khoa trương                           │
│ • Kiểm định tính toàn vẹn 9/9 tiêu chí thể thức NĐ 30/2020      │
└─────────────────────────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────────────────────────┐
│ Tầng 3: Trí tuệ nhân tạo tạo sinh Cloud LLMs (Tùy chọn)         │
│ • Kết nối Groq / OpenRouter / Google Gemini qua API Key        │
│ • Sinh lập luận pháp lý, mở rộng điều khoản chi tiết            │
└─────────────────────────────────────────────────────────────────┘
           ↓
[ Tờ giấy A4 chuẩn mực: Font Times New Roman 13pt, Lề 20mm, Căn đều ]
```

### Chi tiết cách AI xử lý từng thao tác:

1. **AI Tạo dự thảo tự động (`generateAiDraft`):**
   - **Đầu vào:** Đọc tự động `Loại văn bản` (Thông báo, Quyết định, Công văn...), `Cơ quan ban hành`, `Chức vụ người ký` và chuỗi văn bản người dùng nhập tại ô `Gợi ý thêm về nội dung`.
   - **Xử lý:** Áp dụng khung dàn ý chuẩn hóa của Chính phủ:
     - *Phần mở đầu:* Viện dẫn căn cứ pháp lý mặc định + bối cảnh thực tế.
     - *Phần nội dung:* Tự động phân tách thành các mục rõ ràng: Mục tiêu & nhiệm vụ chung $\rightarrow$ Biện pháp triển khai cụ thể $\rightarrow$ Tổ chức thực hiện.
     - *Phần kết thúc:* Hiệu lực thi hành và trách nhiệm của các cơ quan, đơn vị liên quan.
   - **Đầu ra:** Bản dự thảo hoàn chỉnh tức thì, được đồng bộ trực tiếp lên tờ giấy A4.

2. **Chuẩn hóa hành chính (`formalize`):**
   - Rà soát các đại từ nhân xưng tự do và biến đổi thành thuật ngữ hành chính chuẩn mực:
     - `chúng tôi` $\rightarrow$ Tên cơ quan ban hành (VD: *Sở Nội vụ* hoặc *Đơn vị*).
     - `các bạn` $\rightarrow$ `các đơn vị, tổ chức, cá nhân có liên quan`.
     - `mình` $\rightarrow$ `cơ quan`.
     - Loại bỏ triệt để các trợ từ suồng sã: `nhé`, `nhỉ`, `ạ`, `nha`...

3. **Rút gọn súc tích (`shorten`):**
   - Lọc bỏ các phó từ dài dòng, khoa trương không phù hợp với văn bản công vụ (như `một cách rất`, `vô cùng`, `hết sức`, `thực sự là`...).
   - Cô đọng từng đoạn văn, giữ lại các mệnh đề mệnh lệnh hành chính trọng tâm.

4. **Bổ sung căn cứ pháp lý (`addLegal`):**
   - Kiểm tra xem phần căn cứ đã có viện dẫn Nghị định số 30/2020/NĐ-CP chưa. Nếu thiếu, AI sẽ tự động bổ sung nguyên văn:
     `Căn cứ Nghị định số 30/2020/NĐ-CP ngày 05 tháng 3 năm 2020 của Chính phủ về công tác văn thư;`

5. **Kiểm tra thể thức NĐ 30 (`checkNd30`):**
   - Đóng vai trò là "Trợ lý kiểm duyệt thể thức", tự động quét kiểm tra xem văn bản có bị thiếu sót thông tin quan trọng nào không:
     - Thiếu Tên cơ quan ban hành?
     - Thiếu Số & Ký hiệu?
     - Thiếu Địa danh hoặc Ngày tháng?
     - Thiếu Chức vụ hoặc Họ tên người ký?
     - Thiếu Nơi nhận văn bản?
   - Cảnh báo trực quan giúp người soạn thảo bổ sung ngay trước khi phát hành.

---

## 3. HƯỚNG DẪN CHI TIẾT TỪNG TÍNH NĂNG

### 3.1. Cột trái: Tờ giấy A4 trực quan & Thao tác xuất bản

| Nút / Vị trí | Thao tác | Chức năng chi tiết |
| :--- | :--- | :--- |
| **Gõ trực tiếp trên giấy A4** | Nhấp chuột vào phần nội dung chữ trên giấy A4 | Cho phép gõ chữ, sửa từ trực tiếp như phần mềm Word (Two-way Data Binding). Dữ liệu tự đồng bộ sang ô soạn thảo bên phải. |
| **`🖨️ In / PDF`** | Nhấp chuột hoặc bấm `Ctrl + P` | Mở hộp thoại in của trình duyệt. Trang in đã được cấu hình lề chuẩn 20mm cân đối chính giữa, ẩn toàn bộ nút bấm thừa. Chọn *"Lưu dưới dạng PDF"* để xuất file chuẩn. |
| **`📥 Tải Word`** | Nhấp chuột | Xuất ra file `.doc` tương thích hoàn toàn với Microsoft Word. Bố cục bảng tiêu ngữ, lề trang, font chữ Times New Roman được giữ nguyên 100%. |
| **`📋 Sao chép`** | Nhấp chuột | Sao chép toàn văn nội dung vào Clipboard để dán nhanh vào Zalo, Email, Hệ thống Quản lý văn bản điều hành. |
| **`Đóng >` / `Mở xem trước >`** | Nhấp chuột | Ẩn/hiện cột giấy A4 để chuyển đổi linh hoạt giữa chế độ tập trung vào biểu mẫu và chế độ xem trước toàn diện. |

---

### 3.2. Bước 1: Thiết lập thể thức & Thông tin ban hành

#### Mục 1: Thể loại & Cơ quan ban hành
- **Hình thức văn bản:** Mặc định chọn *"Hành chính (NĐ 30/2020/NĐ-CP)"*.
- **Loại văn bản:** Danh mục 16 loại văn bản phổ biến nhất (Thông báo, Quyết định, Công văn, Tờ trình, Báo cáo, Kế hoạch, Biên bản, Giấy mời...). Khi chọn, mã văn bản (TB, QĐ, CV...) tự động cập nhật.
- **Cơ quan chủ quản (nếu có):** Nhập tên cơ quan cấp trên trực tiếp (ví dụ: *UBND TỈNH NINH BÌNH*). Nếu đơn vị độc lập, hãy để trống.
- **Cơ quan ban hành:** Tên cơ quan ban hành văn bản (ví dụ: *SỞ NỘI VỤ*).
- **Mã đơn vị:** Viết tắt tên đơn vị (ví dụ: *SNV*).
- **Văn bản liên tịch:** 
  - Tích chọn khi văn bản do nhiều cơ quan cùng phối hợp ban hành.
  - Nhấn nút **`+ Thêm đơn vị`** để thêm đơn vị 2, đơn vị 3...
  - Nhấn nút **`✕` đỏ** trên góc thẻ đơn vị để xóa bớt.
  - Hệ thống tự động ghép số liên tịch (ví dụ: `01-TBLT/SNV-STC`) và chia đôi chữ ký các bên ở cuối trang.

#### Mục 2: Thời gian và địa điểm
- **Địa danh ban hành:** Gõ tên địa phương (ví dụ: *Ninh Bình*, *Hà Nội*).
- **Ngày tháng ban hành:** Chọn ngày trên lịch. Hệ thống tự động định dạng chuẩn công vụ: *"Ninh Bình, ngày ... tháng ... năm ..."*.
- **Số văn bản:** Số thứ tự của văn bản (ví dụ: *01*, *25*).
- **Số & Ký hiệu hoàn chỉnh:** Tự động tính toán theo công thức chuẩn: `[Số]/[MãLoại]-[MãĐơnVị]`.
- **Thanh trượt Tỷ lệ cột Header:** Điều chỉnh độ rộng giữa Cột Cơ quan (bên trái) và Cột Quốc hiệu (bên phải). Mặc định tối ưu là **35% / 65%**, đảm bảo Quốc hiệu không bị rớt dòng.

#### Mục 3: Nơi nhận & Ký tên
- **Nơi nhận (Tags chip):** 
  - Bấm vào các gợi ý nhanh (*Ban Giám đốc*, *Các phòng ban chức năng*, *Lưu: VT*...) để chèn ngay.
  - Hoặc gõ vào ô nhập rồi ấn **`Enter`** (hoặc dấu phẩy) để thêm nơi nhận tùy chỉnh.
  - Bấm dấu **`✕`** cạnh tên từng nơi nhận để xóa.
- **Chức vụ người ký:** Viết hoa toàn bộ (ví dụ: *GIÁM ĐỐC*, *CHỦ TỊCH*).
- **Họ và tên người ký:** Viết in hoa đứng hoặc chữ hoa chữ thường (ví dụ: *Nguyễn Văn A*).

---

### 3.3. Bước 2: Tạo nội dung & Ứng dụng AI

- **Kho mẫu văn bản sẵn có:** Chọn các kịch bản mẫu thông dụng (Thông báo phân công nhiệm vụ, Giấy mời họp chuyển đổi số, Quyết định ban hành quy chế...). Bấm **`Nạp mẫu đầy đủ`** để điền mẫu ngay lập tức.
- **Trích yếu nội dung:** Nhập câu tóm tắt nội dung chính (ví dụ: *Về việc triển khai kế hoạch chuyển đổi số quý IV năm 2026*). Dòng này tự động in đậm, in nghiêng và gạch chân dưới tiêu đề.
- **Gợi ý thêm về nội dung cần có:** Nhập ghi chú, gạch đầu dòng các ý chính bạn muốn truyền tải.
- **Nút `✨ AI Tạo dự thảo tự động`:** Bấm nút này để AI xây dựng toàn bộ bài viết hoàn chỉnh chuẩn thể thức hành chính chỉ sau 0.5 giây.
- **Khung soạn thảo văn bản:** Ô soạn thảo văn bản lớn có bộ đếm từ và ký tự theo thời gian thực. Hỗ trợ định dạng căn lề thụt đầu dòng 1cm chuẩn NĐ 30.

---

### 3.4. Bước 3: Tinh chỉnh văn phong AI & Xuất bản

- **Bộ 4 công cụ AI:**
  - `✨ Chuẩn hóa hành chính`: Chuyển đổi toàn bộ từ ngữ xưng hô đời thường sang từ ngữ công vụ.
  - `✂️ Rút gọn súc tích`: Lọc bỏ từ thừa, súc tích hóa văn bản.
  - `➕ Thêm căn cứ NĐ 30`: Chèn viện dẫn Nghị định 30/2020/NĐ-CP vào mở đầu.
  - `📋 Kiểm tra thể thức NĐ 30`: Quét soát lỗi thiếu sót thông tin theo quy chuẩn văn thư.
- **`💾 Lưu bản nháp vào trình duyệt`:** Lưu dữ liệu văn bản vào bộ nhớ trình duyệt (Local Storage), giúp bạn yên tâm không bị mất bài khi đóng máy hoặc tải lại trang.

---

## 4. BẢNG ĐỐI CHIẾU 9 THÀNH PHẦN THỂ THỨC THEO NGHỊ ĐỊNH 30/2020/NĐ-CP

| STT | Thành phần thể thức | Vị trí trên trang | Quy chuẩn kỹ thuật trong hệ thống |
| :---: | :--- | :--- | :--- |
| **1** | Quốc hiệu & Tiêu ngữ | Phía trên bên phải | Quốc hiệu cỡ 12pt in hoa đứng đậm (1 dòng). Tiêu ngữ cỡ 13pt chữ thường in đậm, có đường kẻ ngang bên dưới bằng độ dài dòng chữ. |
| **2** | Tên cơ quan ban hành | Phía trên bên trái | Cỡ 12-13pt in hoa đứng đậm. Bên dưới có đường kẻ ngang bằng 1/3 đến 1/2 độ dài dòng chữ. |
| **3** | Số, ký hiệu văn bản | Dưới tên cơ quan | Cỡ 12-13pt chữ thường đứng. Định dạng `Số/Loại-ĐơnVị`. |
| **4** | Địa danh & Ngày tháng | Dưới tiêu ngữ | Cỡ 13-14pt chữ in nghiêng: *"Ninh Bình, ngày ... tháng ... năm ..."*. |
| **5** | Tên loại & Trích yếu | Chính giữa trang | Tên loại cỡ 14pt in hoa đứng đậm. Trích yếu cỡ 13pt in nghiêng đậm có gạch chân. |
| **6** | Nội dung văn bản | Toàn bộ thân trang | Font Times New Roman 13pt, giãn dòng 1.45 - 1.5, căn đều 2 bên (Justify), thụt đầu dòng 1.0cm. |
| **7** | Chức vụ & Họ tên người ký | Phía dưới bên phải | Chức vụ cỡ 13-14pt in hoa đứng đậm; khoảng trống ký tên 65pt; Họ tên cỡ 13-14pt in hoa đứng đậm. |
| **8** | Nơi nhận | Phía dưới bên trái | Tiêu đề "Nơi nhận:" cỡ 11.5pt in nghiêng đậm; danh sách cỡ 11pt, mỗi dòng có dấu gạch ngang đầu dòng. |
| **9** | Căn lề khổ giấy A4 | Toàn trang in | Lề trên: 20mm, Lề dưới: 20mm, Lề trái: 20mm, Lề phải: 20mm (Cân đối tâm trang 105mm chuẩn xác). |

---

## 5. MẸO VÀ PHÍM TẮT THAO TÁC NHANH

- **Phím tắt In / Xuất PDF:** Bấm tổ hợp phím **`Ctrl + P`** bất kỳ lúc nào để mở hộp thoại in chuẩn thể thức.
- **Thêm nhanh nơi nhận:** Nhập tên nơi nhận vào ô rồi bấm phím **`Enter`** hoặc dấu **`,`** (phẩy).
- **Soạn thảo nhanh trên giấy:** Bạn không cần phải kéo tìm ô nhập nội dung, chỉ cần click chuột trực tiếp vào dòng chữ trên tờ giấy A4 bên trái là có thể gõ và chỉnh sửa ngay lập tức.
- **Bảo mật dữ liệu:** Toàn bộ quá trình soạn thảo, lưu nháp đều được xử lý trực tiếp trên trình duyệt của bạn (Client-Side), không gửi dữ liệu nhạy cảm ra ngoài máy chủ khi không có sự cho phép của bạn.

---
*Tài liệu được biên soạn và cập nhật tự động — Phân hệ Soạn Thảo Văn Bản Hành Chính (Ninh Bình Digital).*
