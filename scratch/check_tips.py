import os, sys, json

sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/car_paralyzed_60.json', 'r', encoding='utf-8') as f:
    car_60 = json.load(f)

with open('driving-exam-engine.js', 'r', encoding='utf-8') as f:
    engine_code = f.read()

# Let's inspect where tipsData is:
# We will enhance tipsData to have full detailed tips for meo-a1, meo-a, meo-b, meo-c!
new_tips = {
    "meo-a1": [
        {"title": "1. Mẹo Các Từ Khóa 'Vàng' Chọn Ngay", "content": "• Gặp các cụm từ này trong câu đáp án là <b>CHỌN NGAY</b> (đúng 100%):<br>&nbsp;&nbsp;+ <i>'Bị nghiêm cấm'</i><br>&nbsp;&nbsp;+ <i>'Không được phép' / 'Không được mang vác'</i><br>&nbsp;&nbsp;+ <i>'Ủy ban nhân dân cấp tỉnh'</i><br>&nbsp;&nbsp;+ <i>'Cơ quan có thẩm quyền'</i><br>• Gặp chữ <i>'Tất cả các ý nêu trên'</i>: Đọc kỹ, nếu có câu liên quan đến cồn/ma túy hoặc tốc độ thì chỉ chọn 1 ý đúng."},
        {"title": "2. Mẹo Về Độ Tuổi & Niên Hạn", "content": "• <b>16 tuổi</b>: Xe dưới 50cm³.<br>• <b>18 tuổi</b>: Mô tô A1, A; Ô tô con B.<br>• <b>21 tuổi</b>: Ô tô tải C.<br>• <b>24 tuổi</b>: Xe chở khách D.<br>• <b>27 tuổi</b>: Xe chở khách E.<br>• Mỗi bậc giấy phép lái xe cách nhau đúng <b>3 tuổi</b>!"},
        {"title": "3. Mẹo 4 Bước Vàng Giải Mọi Thế Sa Hình", "content": "1. <b>Nhất chớm:</b> Xe nào đã tiến bánh trước vào ngã tư trước được quyền đi trước.<br>2. <b>Nhì ưu:</b> Thứ tự xe ưu tiên: <b>Hỏa - Sự - Công - Thương</b> (Cứu hỏa > Quân sự > Công an > Cứu thương).<br>3. <b>Tam đường:</b> Xe đang đi trên đường ưu tiên (gặp biển hình thoi vàng hoặc tam giác ngược) được đi trước.<br>4. <b>Tứ hướng:</b> Tại ngã tư cùng cấp: Xe bên phải không vướng đi trước > Rẽ phải > Đi thẳng > Rẽ trái."},
        {"title": "4. Mẹo Thi Thực Hành Vòng Số 8 Xe Máy (Đỗ 100%)", "content": "• Đi số <b>2 hoặc số 3</b> để xe đầm máy, không bị giật tay ga.<br>• Mắt luôn hướng về phía trước theo hướng cua, không nhìn bánh xe dưới đất.<br>• Giữ ga đều và hơi miết nhẹ phanh chân nếu cảm thấy xe lao nhanh ra mép vạch.<br>• Vào số 8 rẽ phải trước, hoàn thành 1 vòng rưỡi rồi tiến ra hình số 3."}
    ],
    "meo-a": [
        {"title": "1. Quy Chuẩn Bằng Hạng A (Luật Mới 2026)", "content": "• Hạng A dành cho xe mô tô hai bánh có dung tích xi-lanh <b>trên 125 cm³</b> (hoặc động cơ điện trên 11 kW).<br>• Người có bằng A được phép điều khiển toàn bộ các loại xe quy định cho bằng A1.<br>• Sát hạch: 25 câu hỏi trong 19 phút, yêu cầu đạt từ <b>23/25 câu</b> trở lên và <b>không được sai câu điểm liệt</b>."},
        {"title": "2. Kỹ Thuật Điều Khiển Xe Phân Khối Lớn", "content": "• Phanh an toàn: Kết hợp đồng thời cả phanh trước và phanh sau, bóp côn khi xe gần dừng hẳn để tránh chết máy.<br>• Ôm cua tốc độ cao: Dùng kỹ thuật Counter-Steering (đẩy nhẹ tay lái phía muốn cua), nghiêng người theo thân xe.<br>• Đi đường đèo dốc: Xuống dốc bằng số nào thì lên dốc bằng số đó, không rà phanh liên tục."}
    ],
    "meo-b": [
        {"title": "1. Mẹo Tốc Độ Ô Tô Con (Hạng B)", "content": "• <b>Trong khu vực đông dân cư:</b><br>&nbsp;&nbsp;+ Đường đôi có dải phân cách giữa: Tối đa <b>60 km/h</b>.<br>&nbsp;&nbsp;+ Đường hai chiều không có dải phân cách: Tối đa <b>50 km/h</b>.<br>• <b>Ngoài khu vực đông dân cư:</b><br>&nbsp;&nbsp;+ Đường đôi có dải phân cách giữa: Ô tô con tối đa <b>90 km/h</b>.<br>&nbsp;&nbsp;+ Đường hai chiều: Ô tô con tối đa <b>80 km/h</b>."},
        {"title": "2. Mẹo Khoảng Cách An Toàn Khi Chạy Xe", "content": "• Tốc độ 60 km/h: Giữ khoảng cách tối thiểu <b>35 mét</b>.<br>• Tốc độ 60 - 80 km/h: Giữ khoảng cách tối thiểu <b>55 mét</b>.<br>• Tốc độ 80 - 100 km/h: Giữ khoảng cách tối thiểu <b>70 mét</b>.<br>• Tốc độ 100 - 120 km/h: Giữ khoảng cách tối thiểu <b>100 mét</b>.<br>• Thời tiết mưa, sương mù, trơn trượt: Tăng gấp đôi khoảng cách an toàn."},
        {"title": "3. Mẹo 11 Bài Sa Hình Sát Hạch Lái Xe Ô Tô", "content": "• <b>Bài xuất phát:</b> Bật xi-nhan trái, nghe 'tính toong' tắt xi-nhan ngay.<br>• <b>Bài dừng xe nhường người đi bộ:</b> Căn cột Stop ngang vai hoặc cách vạch 20cm.<br>• <b>Bài dừng & khởi hành ngang dốc (Dốc Ba-đơ):</b> Kéo phanh tay, đạp đều ga đến 2000-2500 vòng/phút, nhả côn từ từ khi đầu xe rung rinh thì hạ phanh tay.<br>• <b>Ghép xe vào nơi đỗ (dọc & ngang):</b> Gương ngang góc chuồng đánh hết lái, thân xe tạo góc 45 độ với cửa chuồng rồi lùi thẳng."}
    ],
    "meo-c": [
        {"title": "1. Quy Chuẩn Kỹ Thuật Xe Tải Hạng C", "content": "• Hạng C điều khiển ô tô tải có trọng tải <b>trên 7.500 kg</b>, máy kéo kéo rơ moóc trên 3.500 kg và các loại xe hạng B, C1.<br>• Độ tuổi thi bằng C: Đủ <b>21 tuổi</b>.<br>• Niên hạn sử dụng ô tô tải: Tối đa <b>25 năm</b> tính từ năm sản xuất."},
        {"title": "2. Kỹ Thuật Lái Xe Tải Tải Trọng Lớn", "content": "• Điểm mù xe tải rất lớn: Tránh đi sát sườn bên phải và ngay sát đầu/đuôi xe tải.<br>• Vào cua xe tải: Mở rộng vòng cua trước khi ngoặt lái để đuôi xe không chém vạch.<br>• Xuống dốc dài chở nặng: Bắt buộc dùng số thấp và phanh khí xả (phanh cup-pô), tuyệt đối không để trôi tự do."}
    ]
}

print("Loaded tips data.")
