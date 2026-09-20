import sys, os, json, re

sys.stdout.reconfigure(encoding='utf-8')

with open('driving-exam-engine.js', 'r', encoding='utf-8') as f:
    engine_text = f.read()

with open('scratch/car_paralyzed_60.json', 'r', encoding='utf-8') as f:
    car_60_data = json.load(f)

print("Original engine text length:", len(engine_text))

tips_pos = engine_text.find('tipsData:')
if tips_pos != -1:
    if 'carParalyzed60:' not in engine_text:
        car_60_json_str = json.dumps(car_60_data, ensure_ascii=False, indent=2)
        insertion = f"  carParalyzed60: {car_60_json_str},\n\n  "
        engine_text = engine_text[:tips_pos] + insertion + engine_text[tips_pos:]
        print("Injected carParalyzed60 into DRIVING_DATA_2026")
    else:
        print("carParalyzed60 already present")
else:
    print("Warning: tipsData: not found")

new_tips_obj = {
    "meo-a1": [
        {"title": "1. Mẹo Các Từ Khóa 'Vàng' Chọn Ngay (Đúng 100%)", "content": "• Gặp các cụm từ này trong câu đáp án là <b>CHỌN NGAY</b>:<br>&nbsp;&nbsp;+ <i>'Bị nghiêm cấm'</i><br>&nbsp;&nbsp;+ <i>'Không được phép' / 'Không được mang vác'</i><br>&nbsp;&nbsp;+ <i>'Ủy ban nhân dân cấp tỉnh'</i><br>&nbsp;&nbsp;+ <i>'Cơ quan có thẩm quyền'</i><br>• Gặp đáp án có chữ <i>'Tất cả các ý nêu trên'</i>: Đọc kỹ, nếu câu hỏi liên quan nồng độ cồn, ma túy, tốc độ hoặc vượt xe thì chọn đúng 1 ý cụ thể."},
        {"title": "2. Mẹo Về Độ Tuổi & Niên Hạn Đơn Giản Dễ Nhớ", "content": "• <b>16 tuổi</b>: Xe gắn máy dung tích xi-lanh dưới 50cm³.<br>• <b>18 tuổi</b>: Mô tô hai bánh A1, A; Ô tô con B.<br>• <b>21 tuổi</b>: Ô tô tải C.<br>• <b>24 tuổi</b>: Ô tô chở khách D.<br>• <b>27 tuổi</b>: Ô tô chở khách E.<br>• <i>Quy luật vàng:</i> Mỗi bậc hạng giấy phép lái xe ô tô cách nhau đúng <b>3 tuổi</b>!"},
        {"title": "3. Mẹo 4 Bước Vàng Giải Mọi Thế Sa Hình", "content": "1. <b>Nhất chớm:</b> Xe nào đã tiến bánh trước vượt qua vạch người đi bộ vào ngã tư trước được quyền đi trước.<br>2. <b>Nhì ưu:</b> Thứ tự xe ưu tiên: <b>Hỏa - Sự - Công - Thương</b> (Cứu hỏa > Quân sự > Công an > Cứu thương).<br>3. <b>Tam đường:</b> Xe nằm trên đường ưu tiên (gặp biển hình thoi viền vàng hoặc biển tam giác xuôi) được đi trước.<br>4. <b>Tứ hướng:</b> Tại ngã tư cùng cấp: Xe bên phải không vướng đi trước > Rẽ phải > Đi thẳng > Rẽ trái."},
        {"title": "4. Mẹo Thi Thực Hành Chạy Vòng Số 8 (Đỗ 100%)", "content": "• Cài số <b>2 hoặc số 3</b> trước khi xuất phát để xe đầm máy, tay ga không bị giật.<br>• Mắt luôn hướng về phía trước theo hướng cua, tuyệt đối không nhìn xuống bánh trước.<br>• Giữ đều tay ga, hơi rà nhẹ phanh chân (phanh sau) để kiểm soát tốc độ khi vào khúc cua hẹp.<br>• Vào vòng số 8 rẽ phải trước, chạy hết 1 vòng rưỡi rồi tiến ra hình số 3."}
    ],
    "meo-a": [
        {"title": "1. Quy Chuẩn Giấy Phép Lái Xe Hạng A (Luật Mới 2026)", "content": "• Hạng A dành cho xe mô tô hai bánh có dung tích xi-lanh <b>trên 125 cm³</b> (hoặc động cơ điện trên 11 kW).<br>• Người có GPLX hạng A được phép điều khiển toàn bộ các loại xe quy định cho bằng A1.<br>• Sát hạch lý thuyết: Gồm 25 câu hỏi trong 19 phút, yêu cầu đạt từ <b>23/25 câu</b> trở lên và <b>không được sai câu điểm liệt</b>."},
        {"title": "2. Kỹ Thuật Điều Khiển Xe Phân Khối Lớn An Toàn", "content": "• Phanh an toàn: Kết hợp đồng thời cả phanh trước và phanh sau, bóp côn khi xe gần dừng hẳn để tránh chết máy.<br>• Ôm cua tốc độ cao: Dùng kỹ thuật Counter-Steering (đẩy nhẹ tay lái phía muốn cua), nghiêng người theo thân xe.<br>• Đi đường đèo dốc: Xuống dốc bằng số nào thì lên dốc bằng số đó, không rà phanh liên tục gây sôi dầu phanh."}
    ],
    "meo-b": [
        {"title": "1. Mẹo Tốc Độ Ô Tô Con (Hạng B)", "content": "• <b>Trong khu vực đông dân cư:</b><br>&nbsp;&nbsp;+ Đường đôi có dải phân cách giữa: Tối đa <b>60 km/h</b>.<br>&nbsp;&nbsp;+ Đường hai chiều không có dải phân cách: Tối đa <b>50 km/h</b>.<br>• <b>Ngoài khu vực đông dân cư:</b><br>&nbsp;&nbsp;+ Đường đôi có dải phân cách giữa: Ô tô con tối đa <b>90 km/h</b>.<br>&nbsp;&nbsp;+ Đường hai chiều: Ô tô con tối đa <b>80 km/h</b>."},
        {"title": "2. Mẹo Khoảng Cách An Toàn Trên Đường Cao Tốc", "content": "• Tốc độ 60 km/h: Giữ khoảng cách tối thiểu <b>35 mét</b>.<br>• Tốc độ 60 - 80 km/h: Giữ khoảng cách tối thiểu <b>55 mét</b>.<br>• Tốc độ 80 - 100 km/h: Giữ khoảng cách tối thiểu <b>70 mét</b>.<br>• Tốc độ 100 - 120 km/h: Giữ khoảng cách tối thiểu <b>100 mét</b>.<br>• Thời tiết mưa, sương mù, trơn trượt: Giảm tốc và tăng gấp đôi khoảng cách an toàn."},
        {"title": "3. Mẹo 11 Bài Sa Hình Sát Hạch Lái Xe Ô Tô Hạng B", "content": "• <b>Bài xuất phát:</b> Bật xi-nhan trái, nghe 'tính toong' tắt xi-nhan ngay.<br>• <b>Bài dừng xe nhường người đi bộ:</b> Căn cột Stop ngang vai hoặc cách vạch 20cm.<br>• <b>Bài dừng & khởi hành ngang dốc (Dốc Ba-đơ):</b> Kéo phanh tay, đạp đều ga đến 2000-2500 vòng/phút, nhả côn từ từ khi đầu xe rung rung thì hạ phanh tay.<br>• <b>Ghép xe vào nơi đỗ (dọc & ngang):</b> Gương ngang góc chuồng đánh hết lái, thân xe tạo góc 45 độ với cửa chuồng rồi lùi thẳng."}
    ],
    "meo-c": [
        {"title": "1. Quy Chuẩn Kỹ Thuật Xe Tải Hạng C", "content": "• Hạng C điều khiển ô tô tải có trọng tải <b>trên 7.500 kg</b>, máy kéo kéo rơ moóc trên 3.500 kg và các loại xe hạng B, C1.<br>• Độ tuổi thi bằng C: Đủ <b>21 tuổi</b>.<br>• Niên hạn sử dụng ô tô tải: Tối đa <b>25 năm</b> tính từ năm sản xuất.<br>• Sát hạch lý thuyết: 40 câu hỏi trong 24 phút, yêu cầu đạt từ <b>36/40 câu</b> trở lên và <b>không sai câu điểm liệt</b>."},
        {"title": "2. Kỹ Thuật Lái Xe Tải Trọng Tải Lớn", "content": "• Điểm mù xe tải rất lớn: Tránh đi sát sườn bên phải và ngay sát đầu/đuôi xe tải.<br>• Vào cua xe tải: Mở rộng vòng cua trước khi ngoặt lái để đuôi xe không chém vạch.<br>• Xuống dốc dài chở nặng: Bắt buộc dùng số thấp và phanh khí xả (phanh cup-pô), tuyệt đối không để trôi tự do."}
    ]
}

new_tips_json = json.dumps(new_tips_obj, ensure_ascii=False, indent=4)
engine_text = re.sub(r'tipsData:\s*\{[\s\S]*?\n\s*\}\s*\n\};', f'tipsData: {new_tips_json}\n}};', engine_text)
print("Updated tipsData in engine")

with open('driving-exam-engine.js', 'w', encoding='utf-8') as f:
    f.write(engine_text)

print("Saved updated driving-exam-engine.js")
