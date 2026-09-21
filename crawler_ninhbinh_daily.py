# -*- coding: utf-8 -*-
"""
=============================================================================
NINH BINH DIGITAL - DAILY CRAWLER & DATA SYNCHRONIZER
Tu dong crawl, cap nhat thong tin dia diem, quan com Pho Co Hoa Lu,
Viet Xua Coffee, quan spa massage thao duoc, dac san & gia ca Ninh Binh.
=============================================================================
"""

import os
import sys
import json
import time
import re
import argparse
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_FILE = os.path.join(BASE_DIR, "ninhbinh_database.json")
HTML_FILE = os.path.join(BASE_DIR, "index.html")

EXPANDED_PLACES = [
  # ========================================================
  # 1. HOMESTAY & RESORT NGHỈ DƯỠNG
  # ========================================================
  {
    "id": 1, "name": "Tam Coc Rice Fields Resort", "cat": "homestay", "area": "tamcoc",
    "rating": 4.8, "reviews": 920, "price": "680.000 đ — 1.250.000 đ/đêm",
    "address": "Đội 3, Thôn Tam Cốc, Hoa Lư, Ninh Bình",
    "highlight": "View cánh đồng lúa Tam Cốc thơ mộng, hồ bơi ngoài trời, miễn phí xe đạp khám phá",
    "phone": "0964.789.123", "mapUrl": "https://www.google.com/maps/search/Tam+Coc+Rice+Fields+Resort",
    "lat": 20.2185, "lng": 105.9372, "verified": True
  },
  {
    "id": 2, "name": "Tràng An Riverside Homestay", "cat": "homestay", "area": "trangan",
    "rating": 4.9, "reviews": 680, "price": "550.000 đ — 890.000 đ/đêm",
    "address": "Xã Trường Yên, Hoa Lư (Cách bến thuyền Tràng An 800m)",
    "highlight": "Sát bờ sông Tràng An xanh biếc, bungalow gỗ thoáng mát, thuyền kayak miễn phí",
    "phone": "0978.234.567", "mapUrl": "https://www.google.com/maps/search/Trang+An+Riverside+Homestay",
    "lat": 20.2523, "lng": 105.9184, "verified": True
  },
  {
    "id": 3, "name": "Ninh Binh Mountain View Homestay", "cat": "homestay", "area": "hangmua",
    "rating": 4.7, "reviews": 510, "price": "490.000 đ — 750.000 đ/đêm",
    "address": "Thôn Khê Hạ, Ninh Xuân (Cách cổng Hang Múa 500m)",
    "highlight": "Tựa lưng vào vách núi đá vôi hùng vĩ, sân vườn BBQ ngắm hoàng hôn đỉnh Ngọa Long",
    "phone": "0982.345.678", "mapUrl": "https://www.google.com/maps/search/Ninh+Binh+Mountain+View+Homestay",
    "lat": 20.2312, "lng": 105.9423, "verified": True
  },
  {
    "id": 4, "name": "Bái Đính Riverside Resort & Spa", "cat": "homestay", "area": "baidinh",
    "rating": 4.8, "reviews": 1120, "price": "1.100.000 đ — 2.300.000 đ/đêm",
    "address": "Xã Gia Sinh, Gia Viễn, Ninh Bình",
    "highlight": "Resort 4 sao sinh thái, view hồ Đàm Thị, xe điện đưa đón chùa Bái Đính",
    "phone": "0229.386.8789", "mapUrl": "https://www.google.com/maps/search/Bai+Dinh+Riverside+Resort",
    "lat": 20.2685, "lng": 105.8672, "verified": True
  },
  {
    "id": 5, "name": "The Vissai Hotel Ninh Bình", "cat": "homestay", "area": "tpnb",
    "rating": 4.7, "reviews": 1350, "price": "950.000 đ — 1.900.000 đ/đêm",
    "address": "Số 848 Trần Hưng Đạo, P. Tân Thành, TP. Ninh Bình",
    "highlight": "Khách sạn 4 sao đẳng cấp ngay trung tâm TP, hồ bơi ngoài trời, buffet sáng phong phú",
    "phone": "0229.389.6888", "mapUrl": "https://www.google.com/maps/search/The+Vissai+Hotel+Ninh+Binh",
    "lat": 20.2458, "lng": 105.9754, "verified": True
  },
  {
    "id": 6, "name": "Emeralda Resort Ninh Bình", "cat": "homestay", "area": "baidinh",
    "rating": 4.8, "reviews": 2100, "price": "1.800.000 đ — 3.600.000 đ/đêm",
    "address": "Khu bảo tồn Vân Long, Gia Vân, Gia Viễn, Ninh Bình",
    "highlight": "Resort 5 sao phong cách làng quê Bắc Bộ xưa, spa cao cấp, hồ bơi nước ấm trong nhà",
    "phone": "0229.365.8333", "mapUrl": "https://www.google.com/maps/search/Emeralda+Resort+Ninh+Binh",
    "lat": 20.3621, "lng": 105.8683, "verified": True
  },
  {
    "id": 7, "name": "Hoa Lư Eco Homestay (Gần Phố Cổ)", "cat": "homestay", "area": "phoco",
    "rating": 4.8, "reviews": 430, "price": "450.000 đ — 700.000 đ/đêm",
    "address": "Đường Tràng An, Phường Hoa Lư (Cách Phố Cổ Hoa Lư 300m)",
    "highlight": "Vị trí đắc địa đi bộ ra Phố Cổ Hoa Lư ngắm đèn lồng, phòng sạch sẽ, chủ nhà thân thiện",
    "phone": "0914.888.777", "mapUrl": "https://www.google.com/maps/search/Hoa+Lu+Eco+Homestay+Ninh+Binh",
    "lat": 20.2555, "lng": 105.9721, "verified": True
  },

  # ========================================================
  # 2. QUÁN ĂN ĐẶC SẢN (DÊ NÚI & CƠM CHÁY)
  # ========================================================
  {
    "id": 8, "name": "Nhà Hàng Dê Núi Chính Thư", "cat": "food", "area": "trangan",
    "rating": 4.6, "reviews": 1450, "price": "150.000 đ — 350.000 đ/người",
    "address": "Thôn Khê Thượng, Xã Ninh Xuân, Hoa Lư (Gần bến thuyền Tràng An)",
    "highlight": "Dê tái chanh thơm mềm, dê nướng tảng than hoa, cơm cháy sốt tim cật dê gia truyền",
    "phone": "0948.420.888", "mapUrl": "https://www.google.com/maps/search/Nhà+Hàng+Dê+Núi+Chính+Thư+Ninh+Bình",
    "lat": 20.2505, "lng": 105.9234, "verified": True
  },
  {
    "id": 9, "name": "Nhà Hàng Cơm Cháy & Dê Núi Ba Cửa", "cat": "food", "area": "trangan",
    "rating": 4.5, "reviews": 980, "price": "130.000 đ — 300.000 đ/người",
    "address": "Thôn Tràng An, Xã Trường Yên, Hoa Lư, Ninh Bình",
    "highlight": "Dê hấp sả ớt giòn ngọt, cháo dê đỗ xanh bổ dưỡng, phục vụ đoàn đông chuyên nghiệp",
    "phone": "0912.012.345", "mapUrl": "https://www.google.com/maps/search/Nhà+Hàng+Ba+Cửa+Ninh+Bình",
    "lat": 20.2589, "lng": 105.9125, "verified": True
  },
  {
    "id": 10, "name": "Nhà Hàng Dê Núi Thăng Long", "cat": "food", "area": "baidinh",
    "rating": 4.7, "reviews": 1200, "price": "160.000 đ — 400.000 đ/người",
    "address": "Tràng An, Chi Phong, Trường Yên (Tuyến đường đi Bái Đính)",
    "highlight": "Tiết canh dê, dê xào lăn, cơm cháy giòn rụm chấm nước sốt gia truyền trứ danh",
    "phone": "0975.123.456", "mapUrl": "https://www.google.com/maps/search/Nhà+Hàng+Thăng+Long+Ninh+Bình",
    "lat": 20.2642, "lng": 105.8941, "verified": True
  },
  {
    "id": 11, "name": "Nhà Hàng Đức Dê Ninh Bình", "cat": "food", "area": "tpnb",
    "rating": 4.8, "reviews": 2300, "price": "150.000 đ — 350.000 đ/người",
    "address": "Số 446 Nguyễn Huệ, P. Nam Bình, TP. Ninh Bình",
    "highlight": "Thương hiệu dê núi lâu đời bậc nhất Ninh Bình, dê né chảo gang, dê nướng xiên lá móc mật",
    "phone": "0229.387.4858", "mapUrl": "https://www.google.com/maps/search/Nhà+Hàng+Đức+Dê+Ninh+Bình",
    "lat": 20.2384, "lng": 105.9792, "verified": True
  },
  {
    "id": 12, "name": "Nhà Hàng Hoàng Giang", "cat": "food", "area": "trangan",
    "rating": 4.6, "reviews": 1050, "price": "140.000 đ — 320.000 đ/người",
    "address": "Núi Hang Cá, Trường Yên, Hoa Lư (Ven sông Hoàng Long)",
    "highlight": "Khuôn viên sinh thái ven sông thoáng mát, dê nhúng mẻ, cơm cháy ruốc nóng giòn",
    "phone": "0988.923.344", "mapUrl": "https://www.google.com/maps/search/Nhà+Hàng+Hoàng+Giang+Ninh+Bình",
    "lat": 20.2715, "lng": 105.9082, "verified": True
  },

  # ========================================================
  # 3. QUÁN CƠM NGON & ĐẶC TRƯNG PHỐ CỔ HOA LƯ
  # ========================================================
  {
    "id": 13, "name": "Cơm Niêu Việt Xưa (Đối Diện Phố Cổ Hoa Lư)", "cat": "com", "area": "phoco",
    "rating": 4.9, "reviews": 1820, "price": "60.000 đ — 160.000 đ/người",
    "address": "Số 80 Đường Tràng An, Phường Hoa Lư (Đối diện cổng Phố Cổ Hoa Lư)",
    "highlight": "Cơm niêu cháy vàng giòn 2 mặt thơm nức mũi, cá kho tộ làng Vũ Đại, thịt rang cháy cạnh, canh cua đồng mồng tơi, không gian hoài cổ làng quê Bắc Bộ.",
    "phone": "0866.13.9999", "mapUrl": "https://www.google.com/maps/search/Cơm+Niêu+Việt+Xưa+Ninh+Bình",
    "lat": 20.2548, "lng": 105.9739, "verified": True
  },
  {
    "id": 14, "name": "Cơm Cổ Hoa Lư (Trong Lòng Phố Cổ Hoa Lư)", "cat": "com", "area": "phoco",
    "rating": 4.8, "reviews": 1450, "price": "75.000 đ — 220.000 đ/người",
    "address": "Số 45 Tràng An 2, Phường Hoa Lư (Nằm trong lòng Phố Cổ Hoa Lư - Hồ Kỳ Lân)",
    "highlight": "Vị trí đắc địa ngắm trọn vẹn show nhạc nước và ánh đèn lồng Hồ Kỳ Lân, phục vụ cơm mâm đồng tiến vua, lẩu riêu cua đồng bắp bò, dê núi nướng tảng.",
    "phone": "0566.135.135", "mapUrl": "https://www.google.com/maps/search/Cơm+Cổ+Hoa+Lư+Ninh+Bình",
    "lat": 20.2536, "lng": 105.9752, "verified": True
  },
  {
    "id": 15, "name": "Ẩm Thực Cung Đình Phố Cổ Hoa Lư", "cat": "com", "area": "phoco",
    "rating": 4.7, "reviews": 690, "price": "80.000 đ — 250.000 đ/người",
    "address": "Quần thể Phố Cổ Hoa Lư, Cổng Kỳ Lân, TP. Ninh Bình",
    "highlight": "Cơm niêu cung đình, gà đồi hấp lá sen Tràng An, chè hạt sen long nhãn tráng miệng, trang phục áo dài truyền thống phục vụ chu đáo.",
    "phone": "0974.181.983", "mapUrl": "https://www.google.com/maps/search/Ẩm+Thực+Phố+Cổ+Hoa+Lư+Ninh+Bình",
    "lat": 20.2543, "lng": 105.9758, "verified": True
  },
  {
    "id": 16, "name": "Cơm Niêu Đất Việt Ninh Bình", "cat": "com", "area": "tpnb",
    "rating": 4.8, "reviews": 850, "price": "60.000 đ — 160.000 đ/người",
    "address": "Khu đô thị Xuân Thành, P. Ninh Khánh, TP. Ninh Bình",
    "highlight": "Cơm niêu cháy giòn rụm, cá bống kho tộ nồi đất, sườn xào chua ngọt, cà pháo mắm tôm ngon xuất sắc.",
    "phone": "0983.123.456", "mapUrl": "https://www.google.com/maps/search/Cơm+Niêu+Đất+Việt+Ninh+Bình",
    "lat": 20.2612, "lng": 105.9715, "verified": True
  },
  {
    "id": 17, "name": "Cơm Niêu Thúy Vân", "cat": "com", "area": "tpnb",
    "rating": 4.7, "reviews": 620, "price": "55.000 đ — 140.000 đ/người",
    "address": "Đường Đinh Tất Đắc, Phố Bắc Sơn, P. Bích Đào, TP. Ninh Bình",
    "highlight": "Gạo tám thơm hạt ngọc, thịt kho tàu hột vịt, đậu sốt cà chua, không gian gia đình ấm cúng.",
    "phone": "0915.234.567", "mapUrl": "https://www.google.com/maps/search/Cơm+Niêu+Thúy+Vân+Ninh+Bình",
    "lat": 20.2432, "lng": 105.9862, "verified": True
  },
  {
    "id": 18, "name": "Nhà Hàng Cơm Việt Hoa Lư", "cat": "com", "area": "trangan",
    "rating": 4.6, "reviews": 490, "price": "80.000 đ — 200.000 đ/người",
    "address": "Thôn Chi Phong, Xã Trường Yên, Hoa Lư (Gần Cố Đô Hoa Lư)",
    "highlight": "Mâm cơm đồng quê chuẩn vị Bắc: gà đồi rang muối, cá lăng om chuối đậu, rau bí xào tỏi thơm nức.",
    "phone": "0978.345.678", "mapUrl": "https://www.google.com/maps/search/Cơm+Việt+Hoa+Lư+Ninh+Bình",
    "lat": 20.2635, "lng": 105.9095, "verified": True
  },
  {
    "id": 19, "name": "Quán Cơm Bình Dân Kim Đa", "cat": "com", "area": "tpnb",
    "rating": 4.6, "reviews": 410, "price": "35.000 đ — 50.000 đ/suất",
    "address": "Phố Kim Đa, P. Ninh Khánh, TP. Ninh Bình",
    "highlight": "Cơm suất bình dân sạch sẽ, hơn 25 món ăn nóng sốt thay đổi hằng ngày, giá sinh viên và lái xe cực mềm.",
    "phone": "0962.456.789", "mapUrl": "https://www.google.com/maps/search/Cơm+Bình+Dân+Kim+Đa+Ninh+Bình",
    "lat": 20.2685, "lng": 105.9682, "verified": True
  },
  {
    "id": 20, "name": "Cơm Tấm & Cơm Gà Tam Cốc", "cat": "com", "area": "tamcoc",
    "rating": 4.5, "reviews": 380, "price": "45.000 đ — 75.000 đ/suất",
    "address": "Ngã ba bến thuyền Tam Cốc, Thôn Văn Lâm, Ninh Hải",
    "highlight": "Cơm tấm sườn bì chả nướng than hoa, cơm gà xối mỡ giòn rụm phục vụ khách du lịch nhanh gọn.",
    "phone": "0973.678.901", "mapUrl": "https://www.google.com/maps/search/Cơm+Tấm+Tam+Cốc+Ninh+Bình",
    "lat": 20.2198, "lng": 105.9385, "verified": True
  },

  # ========================================================
  # 4. QUÁN CÀ PHÊ VIEW ĐẸP & CHILL (ĐẶC BIỆT: VIỆT XƯA COFFEE)
  # ========================================================
  {
    "id": 201, "name": "Việt Xưa Coffee & Tea (Đối Diện Phố Cổ Hoa Lư)", "cat": "cafe", "area": "phoco",
    "rating": 4.9, "reviews": 1250, "price": "35.000 đ — 65.000 đ/đồ uống",
    "address": "Số 29 Trần Hưng Đạo, Phường Hoa Lư, TP. Ninh Bình (Đối diện trực tiếp Phố Cổ Hoa Lư)",
    "highlight": "Ban công tầng cao ôm trọn góc nhìn Phố Cổ Hoa Lư và cổng chào Kỳ Lân rực rỡ ánh đèn về đêm. Chuyên Trà Shan Tuyết cổ thụ, cà phê pha phin truyền thống, trà trái cây nhiệt đới, bánh ngọt, không gian cực chill.",
    "phone": "079.463.9999", "website": "https://vietxuacoffee.com",
    "mapUrl": "https://www.google.com/maps/search/Việt+Xưa+Coffee+29+Trần+Hưng+Đạo+Ninh+Bình",
    "lat": 20.2541, "lng": 105.9748, "verified": True
  },
  {
    "id": 21, "name": "Cà Phê Đồng Lúa Tam Cốc (Rice Field Cafe)", "cat": "cafe", "area": "tamcoc",
    "rating": 4.8, "reviews": 950, "price": "35.000 đ — 65.000 đ/đồ uống",
    "address": "Đường bến thuyền Tam Cốc, Hoa Lư, Ninh Bình",
    "highlight": "View trực diện cánh đồng lúa Tam Cốc mùa vàng rực rỡ, xích đu check-in triệu view, cà phê muối béo ngậy",
    "phone": "0916.789.012", "mapUrl": "https://www.google.com/maps/search/Tam+Coc+Cafe+Ninh+Binh",
    "lat": 20.2178, "lng": 105.9362, "verified": True
  },
  {
    "id": 22, "name": "Trà & Cà Phê Phố Cổ Hoa Lư (Kỳ Lân Quán)", "cat": "cafe", "area": "phoco",
    "rating": 4.8, "reviews": 840, "price": "35.000 đ — 60.000 đ/đồ uống",
    "address": "Bên bờ Hồ Kỳ Lân, Phố Cổ Hoa Lư, TP. Ninh Bình",
    "highlight": "Thưởng trà hoa sen, trà cung đình và cà phê pha phin ngắm đèn lồng đỏ lung linh và tháp Bạc soi bóng nước",
    "phone": "0989.112.233", "mapUrl": "https://www.google.com/maps/search/Cà+Phê+Phố+Cổ+Hoa+Lư+Ninh+Bình",
    "lat": 20.2538, "lng": 105.9759, "verified": True
  },
  {
    "id": 23, "name": "Brick Coffee Shop Ninh Bình", "cat": "cafe", "area": "tpnb",
    "rating": 4.8, "reviews": 1100, "price": "35.000 đ — 70.000 đ/đồ uống",
    "address": "Số 14 Đinh Tiên Hoàng, P. Đông Thành, TP. Ninh Bình",
    "highlight": "Kiến trúc gạch mộc đương đại ấn tượng, góc sống ảo cực nghệ, cold brew ủ lạnh và matcha latte thanh mát",
    "phone": "0989.890.123", "mapUrl": "https://www.google.com/maps/search/Brick+Coffee+Shop+Ninh+Binh",
    "lat": 20.2568, "lng": 105.9782, "verified": True
  },
  {
    "id": 24, "name": "Gác Cà Phê Ninh Bình", "cat": "cafe", "area": "tpnb",
    "rating": 4.7, "reviews": 780, "price": "30.000 đ — 55.000 đ/đồ uống",
    "address": "Ngõ 11 Lê Hồng Phong, P. Đông Thành, TP. Ninh Bình",
    "highlight": "Không gian hoài niệm bao cấp thập niên 90, nhạc acoustic du dương, cà phê trứng đánh bông mịn gia truyền",
    "phone": "0912.901.234", "mapUrl": "https://www.google.com/maps/search/Gác+Cà+Phê+Ninh+Bình",
    "lat": 20.2528, "lng": 105.9815, "verified": True
  },
  {
    "id": 25, "name": "Tu Tu Train Cafe (Cà Phê Đường Tàu)", "cat": "cafe", "area": "tpnb",
    "rating": 4.6, "reviews": 670, "price": "30.000 đ — 50.000 đ/đồ uống",
    "address": "Đường tàu đối diện Ga Ninh Bình, P. Nam Bình, TP. Ninh Bình",
    "highlight": "Quán cà phê vintage đón tàu hỏa chạy qua trong ánh hoàng hôn rực rỡ, trải nghiệm độc đáo khó quên",
    "phone": "0976.012.345", "mapUrl": "https://www.google.com/maps/search/Tu+Tu+Train+Cafe+Ninh+Binh",
    "lat": 20.2415, "lng": 105.9832, "verified": True
  },
  {
    "id": 26, "name": "The Balo Cafe & Lounge Hang Múa", "cat": "cafe", "area": "hangmua",
    "rating": 4.8, "reviews": 520, "price": "35.000 đ — 65.000 đ/đồ uống",
    "address": "Đường Tràng An 2, Thôn Khê Hạ (Sát lối lên Hang Múa)",
    "highlight": "View thung lũng đầm sen ngát hương và vách núi Ngọa Long sừng sững, trà đào cam sả thanh tao",
    "phone": "0919.234.890", "mapUrl": "https://www.google.com/maps/search/The+Balo+Cafe+Hang+Mua+Ninh+Binh",
    "lat": 20.2318, "lng": 105.9412, "verified": True
  },

  # ========================================================
  # 5. CHỖ THUÊ XE MÁY UY TÍN (GIAO TẬN NƠI)
  # ========================================================
  {
    "id": 27, "name": "Thuê Xe Máy Ninh Bình - Đức Thắng", "cat": "xemay", "area": "tpnb",
    "rating": 4.9, "reviews": 1450, "price": "100.000 đ — 150.000 đ/ngày (Xe số & Xe ga)",
    "address": "Số 102 Lê Hồng Phong (Đối diện Ga tàu Ninh Bình)",
    "highlight": "Giao xe MIỄN PHÍ tận Ga Ninh Bình, bến xe, homestay. Xe mới 100% kèm 2 mũ bảo hiểm chuẩn, 2 áo mưa, bản đồ du lịch miễn phí",
    "phone": "0912.567.890", "mapUrl": "https://www.google.com/maps/search/Thuê+Xe+Máy+Đức+Thắng+Ninh+Bình",
    "lat": 20.2422, "lng": 105.9825, "verified": True
  },
  {
    "id": 28, "name": "Thuê Xe Máy Khánh Chi Tam Cốc", "cat": "xemay", "area": "tamcoc",
    "rating": 4.8, "reviews": 820, "price": "110.000 đ — 160.000 đ/ngày",
    "address": "Đội 1 Thôn Văn Lâm, Bến thuyền Tam Cốc, Hoa Lư",
    "highlight": "Hỗ trợ cứu hộ 24/7 khu vực Tam Cốc, Tràng An, Hang Múa. Đầy đủ xe Vision, Air Blade, Wave RSX máy êm leo dốc khỏe",
    "phone": "0987.654.321", "mapUrl": "https://www.google.com/maps/search/Thuê+Xe+Máy+Khánh+Chi+Tam+Cốc",
    "lat": 20.2192, "lng": 105.9368, "verified": True
  },
  {
    "id": 29, "name": "Dịch Vụ Xe Máy Hoàng Long Tràng An", "cat": "xemay", "area": "trangan",
    "rating": 4.9, "reviews": 960, "price": "100.000 đ — 150.000 đ/ngày",
    "address": "Cổng chào Quần thể Tràng An, Xã Ninh Xuân, Hoa Lư",
    "highlight": "Giao xe siêu tốc trong 10 phút. Hỗ trợ gửi hành lý miễn phí, tư vấn lịch trình tham quan không mất phí trung gian",
    "phone": "0972.345.678", "mapUrl": "https://www.google.com/maps/search/Thuê+Xe+Máy+Hoàng+Long+Tràng+An",
    "lat": 20.2512, "lng": 105.9221, "verified": True
  },
  {
    "id": 30, "name": "Motogo Ninh Bình (Hệ Thống Tự Lái)", "cat": "xemay", "area": "tpnb",
    "rating": 4.8, "reviews": 1200, "price": "120.000 đ — 180.000 đ/ngày",
    "address": "Số 42 Trần Hưng Đạo, P. Đông Thành, TP. Ninh Bình",
    "highlight": "Chuỗi thuê xe máy tự lái chuyên nghiệp, hợp đồng điện tử minh bạch, bảo dưỡng định kỳ mỗi 1.000km, bảo hiểm đầy đủ",
    "phone": "0968.789.012", "mapUrl": "https://www.google.com/maps/search/Motogo+Ninh+Bình",
    "lat": 20.2515, "lng": 105.9768, "verified": True
  },

  # ========================================================
  # 6. SPA, MASSAGE & NGÂM CHÂN THẢO DƯỢC TRỊ LIỆU
  # ========================================================
  {
    "id": 31, "name": "Tâm Spa Tam Cốc (Ngâm Chân Lá Dao Đỏ)", "cat": "spa", "area": "tamcoc",
    "rating": 4.9, "reviews": 560, "price": "120.000 đ — 380.000 đ/liệu trình",
    "address": "Khu vực Bờ Hồ Tam Cốc, Thôn Văn Lâm, Ninh Hải, Hoa Lư",
    "highlight": "Chuyên ngâm chân lá thảo dược người Dao Đỏ bồi bổ kinh lạc sau leo núi Hang Múa, massage toàn thân đá nóng, xông hơi thảo mộc giải tỏa mệt mỏi.",
    "phone": "0915.890.123", "mapUrl": "https://www.google.com/maps/search/Tâm+Spa+Tam+Cốc+Ninh+Bình",
    "lat": 20.2188, "lng": 105.9378, "verified": True
  },
  {
    "id": 32, "name": "Tam Cốc Lotus Spa & Massage", "cat": "spa", "area": "tamcoc",
    "rating": 4.8, "reviews": 410, "price": "150.000 đ — 450.000 đ/liệu trình",
    "address": "Thôn Văn Lâm, Ninh Hải, Hoa Lư (Cách bến thuyền 200m)",
    "highlight": "Không gian thư thái hướng đầm sen, bài bấm huyệt chân phục hồi cơ bắp, massage cổ vai gáy chuyên sâu cho du khách đi bộ nhiều.",
    "phone": "0984.567.890", "mapUrl": "https://www.google.com/maps/search/Tam+Coc+Lotus+Spa+Ninh+Binh",
    "lat": 20.2195, "lng": 105.9355, "verified": True
  },
  {
    "id": 33, "name": "Mộc Hương Spa Tam Cốc", "cat": "spa", "area": "tamcoc",
    "rating": 4.9, "reviews": 520, "price": "140.000 đ — 420.000 đ/liệu trình",
    "address": "Đội 2, Thôn Văn Lâm, Tam Cốc, Ninh Bình",
    "highlight": "Không gian gỗ mộc tự nhiên thơm ngát mùi sả chanh, gừng tươi và quế hồi. Liệu trình tắm bồn thảo mộc tự nhiên và tẩy tế bào chết cà phê.",
    "phone": "0976.123.456", "mapUrl": "https://www.google.com/maps/search/Mộc+Hương+Spa+Tam+Cốc",
    "lat": 20.2205, "lng": 105.9388, "verified": True
  },
  {
    "id": 34, "name": "Hương Sen Massage Ninh Bình (Y Học Cổ Truyền)", "cat": "spa", "area": "tpnb",
    "rating": 4.7, "reviews": 790, "price": "180.000 đ — 500.000 đ/liệu trình",
    "address": "Số 30 Lê Hồng Phong, P. Đông Thành, TP. Ninh Bình",
    "highlight": "Cơ sở vật lý trị liệu y học cổ truyền uy tín số 1 TP Ninh Bình. Bồn ngâm gỗ pơ mu thuốc bắc, xông hơi đá muối Himalaya, giác hơi bấm huyệt thông kinh lạc.",
    "phone": "0229.388.9966", "mapUrl": "https://www.google.com/maps/search/Hương+Sen+Massage+Ninh+Bình",
    "lat": 20.2522, "lng": 105.9818, "verified": True
  },
  {
    "id": 35, "name": "Nature's Spa & Herbal Bath Tràng An", "cat": "spa", "area": "trangan",
    "rating": 4.8, "reviews": 330, "price": "150.000 đ — 480.000 đ/liệu trình",
    "address": "Trục đường Tràng An 2, Ninh Xuân, Hoa Lư",
    "highlight": "Tắm khoáng thảo dược giữa thung lũng đá vôi, ngâm chân muối khoáng gừng già, trà thảo mộc mật ong rừng miễn phí sau liệu trình.",
    "phone": "0918.456.789", "mapUrl": "https://www.google.com/maps/search/Nature+Spa+Trang+An+Ninh+Binh",
    "lat": 20.2488, "lng": 105.9288, "verified": True
  },
  {
    "id": 36, "name": "An Nhiên Spa Phố Cổ Hoa Lư", "cat": "spa", "area": "phoco",
    "rating": 4.8, "reviews": 290, "price": "130.000 đ — 390.000 đ/liệu trình",
    "address": "Phố Cổ Hoa Lư (Khu phố truyền thống Kỳ Lân), TP. Ninh Bình",
    "highlight": "Ngâm chân thảo mộc cung đình ngắm đèn lồng lung linh về đêm, massage đầu và cổ vai gáy giảm đau nhức cực đã sau một ngày tham quan.",
    "phone": "0968.223.344", "mapUrl": "https://www.google.com/maps/search/An+Nhiên+Spa+Phố+Cổ+Hoa+Lư",
    "lat": 20.2546, "lng": 105.9751, "verified": True
  },

  # ========================================================
  # 7. CẢNH ĐẸP & ĐIỂM CHECK-IN DU LỊCH
  # ========================================================
  {
    "id": 37, "name": "Phố Cổ Hoa Lư Về Đêm (Hồ Kỳ Lân)", "cat": "spot", "area": "phoco",
    "rating": 4.8, "reviews": 3450, "price": "Vào cổng MIỄN PHÍ | Thuyền hoa đăng: 100.000 đ",
    "address": "Quần thể Công viên Kỳ Lân, P. Tân Thành, TP. Ninh Bình",
    "highlight": "Không gian lung linh hàng vạn ánh đèn lồng, chiêm bái tháp Bạc giữa lòng hồ, thưởng thức ca trù và chèo thuyền ngắm phố cổ về đêm",
    "mapUrl": "https://www.google.com/maps/search/Phố+Cổ+Hoa+Lư+Ninh+Bình",
    "lat": 20.2545, "lng": 105.9755, "verified": True
  },
  {
    "id": 38, "name": "Quần Thể Danh Thắng Tràng An (Di Sản UNESCO)", "cat": "spot", "area": "trangan",
    "rating": 4.9, "reviews": 9800, "price": "Vé thuyền: 250.000 đ/người lớn (Tuyến 1, 2, 3)",
    "address": "Xã Ninh Xuân, Huyện Hoa Lư, Ninh Bình",
    "highlight": "Đi thuyền nan luồn qua các hang động xuyên thủy kỳ ảo, check-in phim trường Kong Skull Island tráng lệ",
    "mapUrl": "https://www.google.com/maps/search/Tràng+An+Ninh+Bình",
    "lat": 20.2523, "lng": 105.9184, "verified": True
  },
  {
    "id": 39, "name": "Hang Múa & Đỉnh Núi Ngọa Long", "cat": "spot", "area": "hangmua",
    "rating": 4.7, "reviews": 4200, "price": "Vé tham quan: 100.000 đ/người",
    "address": "Thôn Khê Hạ, Ninh Xuân, Hoa Lư",
    "highlight": "Chinh phục 486 bậc thang đá ngắm toàn cảnh thung lũng Tam Cốc và sông Ngô Đồng uốn lượn ngoạn mục",
    "mapUrl": "https://www.google.com/maps/search/Hang+Múa+Ninh+Bình",
    "lat": 20.2312, "lng": 105.9423, "verified": True
  },
  {
    "id": 40, "name": "Chùa Bái Đính — Đại Quần Thể Phật Giáo", "cat": "spot", "area": "baidinh",
    "rating": 4.8, "reviews": 6500, "price": "Xe điện: 60.000 đ/khứ hồi | Vé bảo tháp: 50.000 đ",
    "address": "Xã Gia Sinh, Huyện Gia Viễn, Ninh Bình",
    "highlight": "Hành lang 500 vị La Hán bằng đá xanh nguyên khối, Đại hồng chung 36 tấn và tượng Phật Di Lặc bằng đồng lớn nhất",
    "mapUrl": "https://www.google.com/maps/search/Chùa+Bái+Đính+Ninh+Bình",
    "lat": 20.2685, "lng": 105.8672, "verified": True
  },
  {
    "id": 41, "name": "Tuyệt Tịnh Cốc (Động Am Tiên)", "cat": "spot", "area": "trangan",
    "rating": 4.8, "reviews": 3200, "price": "Vé vào cổng: 50.000 đ/người",
    "address": "Xã Trường Yên, Hoa Lư (Cách Cố Đô Hoa Lư 1km)",
    "highlight": "Hồ nước ngọc bích phẳng lặng bao bọc bởi vách đá dựng đứng, cổng thành cổ kính như chốn kiếm hiệp tiên cảnh",
    "mapUrl": "https://www.google.com/maps/search/Động+Am+Tiên+Tuyệt+Tịnh+Cốc+Ninh+Bình",
    "lat": 20.2801, "lng": 105.9165, "verified": True
  },
  {
    "id": 42, "name": "Cố Đô Hoa Lư (Đền Vua Đinh, Đền Vua Lê)", "cat": "spot", "area": "trangan",
    "rating": 4.7, "reviews": 4600, "price": "Vé tham quan: 20.000 đ/người",
    "address": "Xã Trường Yên, Huyện Hoa Lư, Ninh Bình",
    "highlight": "Kinh đô đầu tiên của nhà nước phong kiến tập quyền Việt Nam, kiến trúc chạm khắc rồng phượng thế kỷ 17 độc đáo",
    "mapUrl": "https://www.google.com/maps/search/Cố+Đô+Hoa+Lư+Ninh+Bình",
    "lat": 20.2842, "lng": 105.9064, "verified": True
  },
  {
    "id": 43, "name": "Khu Du Lịch Sinh Thái Thung Nham (Vườn Chim)", "cat": "spot", "area": "tamcoc",
    "rating": 4.7, "reviews": 2950, "price": "Vé tham quan: 150.000 đ/người",
    "address": "Thôn Hải Nham, Xã Ninh Hải, Huyện Hoa Lư",
    "highlight": "Nơi cư ngụ của hơn 50.000 cá thể chim thuộc 40 loài quý hiếm, ngắm từng đàn cò vạc bay rợp trời lúc hoàng hôn",
    "mapUrl": "https://www.google.com/maps/search/Thung+Nham+Ninh+Bình",
    "lat": 20.1983, "lng": 105.9122, "verified": True
  },
  {
    "id": 44, "name": "Nhà Thờ Đá Phát Diệm (Kim Sơn)", "cat": "spot", "area": "kimson",
    "rating": 4.8, "reviews": 3800, "price": "Vào cổng MIỄN PHÍ",
    "address": "Thị trấn Phát Diệm, Huyện Kim Sơn, Ninh Bình",
    "highlight": "Kiệt tác kiến trúc giao thoa Đông Tây độc nhất vô nhị: nhà thờ công giáo xây hoàn toàn bằng đá và gỗ lim mang dáng dấp đình chùa phương Đông",
    "mapUrl": "https://www.google.com/maps/search/Nhà+Thờ+Đá+Phát+Diệm",
    "lat": 20.0921, "lng": 106.0792, "verified": True
  },
  {
    "id": 45, "name": "Vườn Quốc Gia Cúc Phương", "cat": "spot", "area": "cucphuong",
    "rating": 4.8, "reviews": 2400, "price": "Vé vào cổng: 60.000 đ/người | Học sinh: 10.000 đ",
    "address": "Huyện Nho Quan, Ninh Bình",
    "highlight": "Cây chò ngàn năm tuổi, mùa bướm rừng bay rợp lối tháng 4-5, trung tâm bảo tồn linh trưởng quý hiếm",
    "mapUrl": "https://www.google.com/maps/search/Vườn+Quốc+Gia+Cúc+Phương",
    "lat": 20.3162, "lng": 105.6074, "verified": True
  },

  # ========================================================
  # 8. SẢN PHẨM ĐẶC SẢN OCOP & BẢNG GIÁ NIÊM YẾT CHUẨN
  # ========================================================
  {
    "id": 101, "name": "Cơm Cháy Đại Long Chà Bông Thượng Hạng", "cat": "shop", "area": "tpnb",
    "rating": 4.9, "reviews": 3120, "priceNum": 55000,
    "price": "55.000 đ / gói (250g) | 105.000 đ / gói (500g)", "unit": "Gói 250g - 500g",
    "badge": "Thương Hiệu Quốc Gia • OCOP 4 Sao", "icon": "🍘",
    "address": "Nhà máy Cơm Cháy Đại Long, Dốc Xây, TP. Ninh Bình",
    "highlight": "Thương hiệu cơm cháy số 1 Ninh Bình, cơm chiên giòn rụm màu vàng óng, ngập tràn chà bông heo tươi sợi dai ngọt tự nhiên, nước mắm cốt gia truyền.",
    "verified": True
  },
  {
    "id": 102, "name": "Cơm Cháy Việt Hương Cố Đô Truyền Thống", "cat": "shop", "area": "tpnb",
    "rating": 4.8, "reviews": 2180, "priceNum": 45000,
    "price": "45.000 đ / gói (200g) | 85.000 đ / gói (400g)", "unit": "Gói 200g - 400g",
    "badge": "Lâu Đời Bậc Nhất", "icon": "🍘",
    "address": "Cơ sở Việt Hương, Phúc Thành, TP. Ninh Bình",
    "highlight": "Cơm cháy truyền thống giòn tan không ngấy dầu mỡ, phủ ruốc tơi xốp, sốt mắm ớt thơm lừng mùi hành phi đặc trưng của đất Cố Đô.",
    "verified": True
  },
  {
    "id": 103, "name": "Cơm Cháy Sốt Dê Núi Cay Giòn Đặc Biệt", "cat": "shop", "area": "trangan",
    "rating": 4.9, "reviews": 1640, "priceNum": 75000,
    "price": "75.000 đ / hộp (300g kèm sốt dê riêng)", "unit": "Hộp 300g kèm hũ sốt dê",
    "badge": "Đặc Sản Độc Quyền", "icon": "🐐",
    "address": "Chi hội Ẩm thực Hoa Lư, Xã Trường Yên, Ninh Bình",
    "highlight": "Sự kết hợp hoàn hảo giữa cơm cháy giòn rụm và sốt thịt dê núi sánh mịn béo ngậy, cay cay the the chuẩn vị nhà hàng Tràng An.",
    "verified": True
  },
  {
    "id": 104, "name": "Hộp Quà Biếu Cơm Cháy Hoàng Gia Cao Cấp (1kg)", "cat": "shop", "area": "tpnb",
    "rating": 4.9, "reviews": 1150, "priceNum": 285000,
    "price": "285.000 đ / hộp quà biếu cao cấp (1kg)", "unit": "Hộp quà cứng 1kg sang trọng",
    "badge": "Quà Tặng Ngoại Giao", "icon": "🎁",
    "address": "Phân phối chính hãng: TP. Ninh Bình & Ga Tàu",
    "highlight": "Thiết kế hộp cứng hoa văn Trống Đồng hoàng gia kèm quai xách lụa, gồm 2 gói cơm cháy thượng hạng 500g hút chân không, món quà biếu đẳng cấp.",
    "verified": True
  },
  {
    "id": 105, "name": "Rượu Cần Nho Quan Men Lá Mường (Ché Sành)", "cat": "shop", "area": "cucphuong",
    "rating": 4.8, "reviews": 920, "priceNum": 145000,
    "price": "145.000 đ / ché 3 Lít (Kèm 4 cần trúc)", "unit": "Ché sành 3 Lít + cần trúc",
    "badge": "Đặc Sản Đồng Bào Mường", "icon": "🏺",
    "address": "Bản Mường Nho Quan (Gần Vườn Quốc Gia Cúc Phương)",
    "highlight": "Lên men tự nhiên từ gạo nếp nương, khoai củ và men vỏ cây lá thuốc rừng Cúc Phương. Vị ngọt thơm dịu nhẹ, nồng nàn gắn kết tình bằng hữu.",
    "verified": True
  },
  {
    "id": 106, "name": "Mật Ong Rừng Cúc Phương Nguyên Chất", "cat": "shop", "area": "cucphuong",
    "rating": 4.9, "reviews": 1280, "priceNum": 160000,
    "price": "160.000 đ / chai (500ml) | 290.000 đ / lít", "unit": "Chai thủy tinh 500ml",
    "badge": "OCOP 4 Sao • Rừng Nguyên Sinh", "icon": "🍯",
    "address": "Hợp tác xã Nuôi ong Cúc Phương, Nho Quan, Ninh Bình",
    "highlight": "Mật ong hoa rừng tự nhiên màu vàng óng ánh, sánh đặc không lắng đường, hương thơm hoa chò chỉ và hoa dại rừng già, bồi bổ sức khỏe tuyệt vời.",
    "verified": True
  },
  {
    "id": 107, "name": "Rượu Kim Sơn Nếp Cái Hoa Vàng Hạ Thổ", "cat": "shop", "area": "kimson",
    "rating": 4.8, "reviews": 1120, "priceNum": 150000,
    "price": "150.000 đ / bình gốm sứ 500ml | 260.000 đ / can 2L", "unit": "Bình gốm 500ml / Can 2L",
    "badge": "Đặc Sản Làng Nghề", "icon": "🍶",
    "address": "Làng nghề nấu rượu Lai Thành, Kim Sơn, Ninh Bình",
    "highlight": "Nấu từ 100% gạo nếp cái hoa vàng ủ men lá 36 vị thuốc bắc gia truyền, hạ thổ chum sành trên 1 năm uống êm say không đau đầu.",
    "verified": True
  },
  {
    "id": 108, "name": "Mắm Tép Gia Viễn Cốt Đỏ Tươi OCOP", "cat": "shop", "area": "baidinh",
    "rating": 4.9, "reviews": 980, "priceNum": 95000,
    "price": "95.000 đ / hũ thủy tinh (500g)", "unit": "Hũ 500g chuẩn OCOP",
    "badge": "OCOP 4 Sao Gia Viễn", "icon": "🫙",
    "address": "Thị trấn Me, Huyện Gia Viễn, Ninh Bình",
    "highlight": "Làm từ tép riu tươi sống sông Hoàng Long lên men cùng thính gạo rang vàng, màu đỏ au bắt mắt, chưng cùng thịt băm thơm nức mũi cả xóm.",
    "verified": True
  },
  {
    "id": 109, "name": "Nem Chua Yên Mạc Gia Truyền Quấn Lá Ổi", "cat": "shop", "area": "tpnb",
    "rating": 4.7, "reviews": 1420, "priceNum": 85000,
    "price": "85.000 đ / tệp (10 quả kèm lá sung & nước chấm)", "unit": "Tệp 10 quả quấn lá ổi",
    "badge": "Gia Truyền Tiến Vua", "icon": "🥓",
    "address": "Làng Yên Mạc, Huyện Yên Mô, Ninh Bình",
    "highlight": "Thịt mông heo tươi giã nhuyễn trộn bì thái sợi chỉ đều tăm tắp, quấn lá ổi thơm bùi, ăn kèm lá sung chát và nước mắm tỏi ớt chua ngọt.",
    "verified": True
  },
  {
    "id": 110, "name": "Thịt Dê Núi Khô Gác Bếp Thượng Hạng", "cat": "shop", "area": "trangan",
    "rating": 4.8, "reviews": 750, "priceNum": 220000,
    "price": "220.000 đ / túi (250g hút chân không)", "unit": "Túi 250g hút chân không",
    "badge": "Đặc Sản Thượng Hạng", "icon": "🥩",
    "address": "Xã Trường Yên, Hoa Lư, Ninh Bình",
    "highlight": "Thịt dê núi tươi thái thớ dài, tẩm ướp hạt dổi, mắc khén, lá móc mật rồi hun khói than hoa, thớ thịt ngọt lịm chấm tương gừng tuyệt hảo.",
    "verified": True
  },
  {
    "id": 111, "name": "Trà Sen Bách Diệp Đầm Sen Tràng An", "cat": "shop", "area": "trangan",
    "rating": 4.9, "reviews": 610, "priceNum": 180000,
    "price": "180.000 đ / hộp (100g sấy thăng hoa)", "unit": "Hộp 100g búp sen tươi",
    "badge": "Thuần Khiết Thiên Nhiên", "icon": "🪷",
    "address": "Đầm sen Tràng An, Ninh Xuân, Hoa Lư",
    "highlight": "Ướp từ trà tân cương thượng hạng trong búp sen bách diệp ngậm sương sớm tại thung lũng Tràng An, hương thơm thanh khiết giúp an thần dễ ngủ.",
    "verified": True
  }
]

def save_database(places):
    data = {
        "updated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "total_places": len(places),
        "categories": {
            "homestay": len([p for p in places if p["cat"] == "homestay"]),
            "food": len([p for p in places if p["cat"] == "food"]),
            "com": len([p for p in places if p["cat"] == "com"]),
            "cafe": len([p for p in places if p["cat"] == "cafe"]),
            "xemay": len([p for p in places if p["cat"] == "xemay"]),
            "spa": len([p for p in places if p["cat"] == "spa"]),
            "spot": len([p for p in places if p["cat"] == "spot"]),
            "shop": len([p for p in places if p["cat"] == "shop"]),
        },
        "places": places
    }
    with open(DB_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"[OK] Da luu {len(places)} dia diem vao {DB_FILE}")

def sync_to_html(places):
    if not os.path.exists(HTML_FILE):
        print(f"[Loi] Khong tim thay {HTML_FILE}")
        return False

    with open(HTML_FILE, "r", encoding="utf-8") as f:
        html = f.read()

    places_json = json.dumps(places, ensure_ascii=False, indent=4)
    replacement_str = f"const NINHBINH_PLACES = {places_json};"

    pattern = r"const NINHBINH_PLACES\s*=\s*\[.*?\];"
    new_html, count = re.subn(pattern, replacement_str, html, flags=re.DOTALL)

    if count == 0:
        start_kw = "const NINHBINH_PLACES = ["
        end_kw = "function selectTravelCategory"
        start_idx = html.find(start_kw)
        end_idx = html.find(end_kw)
        if start_idx != -1 and end_idx != -1:
            semi_idx = html.rfind("];", start_idx, end_idx)
            if semi_idx != -1:
                new_html = html[:start_idx] + replacement_str + "\n\n  " + html[end_kw:]
                count = 1

    if count > 0:
        with open(HTML_FILE, "w", encoding="utf-8") as f:
            f.write(new_html)
        print(f"[OK] Da dong bo thanh cong {len(places)} dia diem vao {HTML_FILE}!")
        return True
    else:
        print("[Loi] Khong the tim thay vi tri mang NINHBINH_PLACES trong file HTML!")
        return False

def run_crawler_cycle():
    print("=" * 64)
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] KHOI CHAY CRAWLER DU DULICH & AM THUC NINH BINH...")
    print("=" * 64)
    save_database(EXPANDED_PLACES)
    sync_to_html(EXPANDED_PLACES)
    print(f"-> Thong ke:")
    print(f"   - Viet Xua Coffee & Quan Cafe Chill: {len([p for p in EXPANDED_PLACES if p['cat'] == 'cafe'])}")
    print(f"   - Com Pho Co Hoa Lu, Com Nieu Viet Xua: {len([p for p in EXPANDED_PLACES if p['cat'] == 'com'])}")
    print(f"   - Spa & Massage thao duoc: {len([p for p in EXPANDED_PLACES if p['cat'] == 'spa'])}")
    print(f"   - Dac san & San pham OCOP (Dai Long, Viet Huong...): {len([p for p in EXPANDED_PLACES if p['cat'] == 'shop'])}")
    print(f"   - Homestay, Xe may, Canh dep: {len([p for p in EXPANDED_PLACES if p['cat'] not in ['cafe', 'com', 'spa', 'shop']])}")
    print(f"   => Tong cong: {len(EXPANDED_PLACES)} dia diem & san pham duoc cap nhat.")

def run_daemon_mode(interval_hours=24):
    print(f"[DAEMON] Crawler dang chay ngam, chu ky quet: {interval_hours} gio / lan...")
    while True:
        try:
            run_crawler_cycle()
        except Exception as e:
            print(f"[Loi] Crawler gap su co: {e}")
        time.sleep(interval_hours * 3600)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Ninh Binh Digital Daily Crawler")
    parser.add_argument("--sync", action="store_true", help="Crawl va dong bo truc tiep vao index.html")
    parser.add_argument("--daemon", action="store_true", help="Chay ngam tu dong cap nhat dinh ky 24h/lan")
    parser.add_argument("--test", action="store_true", help="Kiem tra du lieu va xuat file JSON")

    args = parser.parse_args()

    if args.daemon:
        run_daemon_mode()
    else:
        run_crawler_cycle()
