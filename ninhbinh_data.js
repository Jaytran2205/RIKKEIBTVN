/**
 * NINH BÌNH DIGITAL — DỮ LIỆU ĐẶC SẢN, QUÁN ĂN, CHỖ NGHỈ & HỆ THỐNG QUẢN LÝ TRẠNG THÁI
 * Đồng bộ xuyên suốt giữa index.html và admin.html
 */

var NINHBINH_DEFAULT_PLACES = [
  {
    "id": 101,
    "name": "Cơm Cháy Chà Bông Ninh Bình Cao Cấp",
    "cat": "shop",
    "shopType": "comchay",
    "area": "tpnb",
    "rating": 4.9,
    "reviews": 1420,
    "price": "85.000 đ",
    "priceNum": 85000,
    "unit": "Hộp 500g (2 bánh ép chân không)",
    "badge": "OCOP 4 SAO",
    "ocop": 4,
    "address": "Xưởng sản xuất Cơm cháy Hoa Lư, TP. Ninh Bình",
    "highlight": "Gạo nếp hương giòn rụm vàng ruộm, ruốc thịt heo đậm đà không ngấy, món quà biếu cố đô nổi tiếng nhất",
    "image": "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=600&auto=format&fit=crop&q=80",
    "icon": "🌾",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=C%C6%A1m%20Ch%C3%A1y%20Ch%C3%A0%20B%C3%B4ng%20Ninh%20B%C3%ACnh%20Cao%20C%E1%BA%A5p%2C%20X%C6%B0%E1%BB%9Fng%20s%E1%BA%A3n%20xu%E1%BA%A5t%20C%C6%A1m%20ch%C3%A1y%20Hoa%20L%C6%B0%2C%20TP.%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=C%C6%A1m%20Ch%C3%A1y%20Ch%C3%A0%20B%C3%B4ng%20Ninh%20B%C3%ACnh%20Cao%20C%E1%BA%A5p%2C%20X%C6%B0%E1%BB%9Fng%20s%E1%BA%A3n%20xu%E1%BA%A5t%20C%C6%A1m%20ch%C3%A1y%20Hoa%20L%C6%B0%2C%20TP.%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 102,
    "name": "Cơm Cháy Đáy Nồi Nếp Hương Cổ Truyền",
    "cat": "shop",
    "shopType": "comchay",
    "area": "tamcoc",
    "rating": 4.8,
    "reviews": 680,
    "price": "65.000 đ",
    "priceNum": 65000,
    "unit": "Túi zip 300g tiện lợi",
    "badge": "BÁN CHẠY",
    "ocop": 3,
    "address": "Cửa hàng Đặc sản Tam Cốc, Hoa Lư, Ninh Bình",
    "highlight": "Cơm cháy đáy nồi chuẩn vị xưa, giòn tan kèm gói nước sốt tim cật dê gia truyền sóng sánh",
    "image": "https://images.unsplash.com/photo-1505253758473-96b3015f27eb?w=600&auto=format&fit=crop&q=80",
    "icon": "🍘",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=C%C6%A1m%20Ch%C3%A1y%20%C4%90%C3%A1y%20N%E1%BB%93i%20N%E1%BA%BFp%20H%C6%B0%C6%A1ng%20C%E1%BB%95%20Truy%E1%BB%81n%2C%20C%E1%BB%ADa%20h%C3%A0ng%20%C4%90%E1%BA%B7c%20s%E1%BA%A3n%20Tam%20C%E1%BB%91c%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=C%C6%A1m%20Ch%C3%A1y%20%C4%90%C3%A1y%20N%E1%BB%93i%20N%E1%BA%BFp%20H%C6%B0%C6%A1ng%20C%E1%BB%95%20Truy%E1%BB%81n%2C%20C%E1%BB%ADa%20h%C3%A0ng%20%C4%90%E1%BA%B7c%20s%E1%BA%A3n%20Tam%20C%E1%BB%91c%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 103,
    "name": "Thịt Dê Núi Ninh Bình Tươi Sạch (Hút Chân Không)",
    "cat": "shop",
    "shopType": "comchay",
    "area": "trangan",
    "rating": 5.0,
    "reviews": 950,
    "price": "390.000 đ",
    "priceNum": 390000,
    "unit": "Khay 1kg thịt đùi tươi ướp lạnh",
    "badge": "OCOP 5 SAO",
    "ocop": 5,
    "address": "Trang trại dê núi Hoa Lư, Xã Ninh Hòa, Hoa Lư",
    "highlight": "100% thịt dê núi đá ăn lá thuốc tự nhiên, thớ thịt săn chắc ngọt đậm, tặng kèm gói gia vị tái chanh và tương bần",
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
    "icon": "🐐",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Th%E1%BB%8Bt%20D%C3%AA%20N%C3%BAi%20Ninh%20B%C3%ACnh%20T%C6%B0%C6%A1i%20S%E1%BA%A1ch%2C%20Trang%20tr%E1%BA%A1i%20d%C3%AA%20n%C3%BAi%20Hoa%20L%C6%B0%2C%20X%C3%A3%20Ninh%20H%C3%B2a%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Th%E1%BB%8Bt%20D%C3%AA%20N%C3%BAi%20Ninh%20B%C3%ACnh%20T%C6%B0%C6%A1i%20S%E1%BA%A1ch%2C%20Trang%20tr%E1%BA%A1i%20d%C3%AA%20n%C3%BAi%20Hoa%20L%C6%B0%2C%20X%C3%A3%20Ninh%20H%C3%B2a%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 104,
    "name": "Rượu Nếp Kim Sơn Hạ Thổ Men Lá (Bình Gốm)",
    "cat": "shop",
    "shopType": "ruou",
    "area": "kimson",
    "rating": 4.9,
    "reviews": 830,
    "price": "135.000 đ",
    "priceNum": 135000,
    "unit": "Bình gốm Bát Tràng 500ml",
    "badge": "OCOP 4 SAO",
    "ocop": 4,
    "address": "Làng nghề nấu rượu truyền thống Phát Diệm, Kim Sơn",
    "highlight": "Chưng cất từ nếp cái hoa vàng và 36 vị men thuốc bắc cổ truyền, hạ thổ trên 12 tháng êm say không đau đầu",
    "image": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&auto=format&fit=crop&q=80",
    "icon": "🍶",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=R%C6%B0%E1%BB%A3u%20N%E1%BA%BFp%20Kim%20S%C6%A1n%20H%E1%BA%A1%20Th%E1%BB%95%20Men%20L%C3%A1%2C%20L%C3%A0ng%20ngh%E1%BB%81%20n%E1%BA%A5u%20r%C6%B0%E1%BB%A3u%20truy%E1%BB%81n%20th%E1%BB%91ng%20Ph%C3%A1t%20Di%E1%BB%87m%2C%20Kim%20S%C6%A1n%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=R%C6%B0%E1%BB%A3u%20N%E1%BA%BFp%20Kim%20S%C6%A1n%20H%E1%BA%A1%20Th%E1%BB%95%20Men%20L%C3%A1%2C%20L%C3%A0ng%20ngh%E1%BB%81%20n%E1%BA%A5u%20r%C6%B0%E1%BB%A3u%20truy%E1%BB%81n%20th%E1%BB%91ng%20Ph%C3%A1t%20Di%E1%BB%87m%2C%20Kim%20S%C6%A1n%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 105,
    "name": "Rượu Nếp Đòng Đòng Kim Sơn Hảo Hạng",
    "cat": "shop",
    "shopType": "ruou",
    "area": "kimson",
    "rating": 4.8,
    "reviews": 520,
    "price": "210.000 đ",
    "priceNum": 210000,
    "unit": "Chai thủy tinh 1.000ml",
    "badge": "OCOP 4 SAO",
    "ocop": 4,
    "address": "HTX Nông Nghiệp Hữu Cơ Kim Sơn, Ninh Bình",
    "highlight": "Ngâm ủ bông lúa nếp non ngậm sữa sữa non tự nhiên, nước rượu màu xanh ngọc bích thơm mát ngào ngạt",
    "image": "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=600&auto=format&fit=crop&q=80",
    "icon": "🌾",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=R%C6%B0%E1%BB%A3u%20N%E1%BA%BFp%20%C4%90%C3%B2ng%20%C4%90%C3%B2ng%20Kim%20S%C6%A1n%20H%E1%BA%A3o%20H%E1%BA%A1ng%2C%20HTX%20N%C3%B4ng%20Nghi%E1%BB%87p%20H%E1%BB%AFu%20C%C6%A1%20Kim%20S%C6%A1n%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=R%C6%B0%E1%BB%A3u%20N%E1%BA%BFp%20%C4%90%C3%B2ng%20%C4%90%C3%B2ng%20Kim%20S%C6%A1n%20H%E1%BA%A3o%20H%E1%BA%A1ng%2C%20HTX%20N%C3%B4ng%20Nghi%E1%BB%87p%20H%E1%BB%AFu%20C%C6%A1%20Kim%20S%C6%A1n%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 106,
    "name": "Mắm Tép Gia Viễn Tiến Vua Chính Hiệu",
    "cat": "shop",
    "shopType": "mamtep",
    "area": "tpnb",
    "rating": 4.9,
    "reviews": 760,
    "price": "95.000 đ",
    "priceNum": 95000,
    "unit": "Hũ thủy tinh 500g",
    "badge": "OCOP 4 SAO",
    "ocop": 4,
    "address": "Làng mắm tép truyền thống Me, Thị trấn Me, Gia Viễn",
    "highlight": "Tép riu sông Hoàng Long ủ thính gạo rang thơm lừng, chưng thịt ba chỉ béo ngậy ăn cùng cơm nóng hao cơm",
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
    "icon": "🦐",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=M%E1%BA%AFm%20T%C3%A9p%20Gia%20Vi%E1%BB%85n%20Ti%E1%BA%BFn%20Vua%20Ch%C3%ADnh%20Hi%E1%BB%87u%2C%20L%C3%A0ng%20m%E1%BA%AFm%20t%C3%A9p%20truy%E1%BB%81n%20th%E1%BB%91ng%20Me%2C%20Th%E1%BB%8B%20tr%E1%BA%A5n%20Me%2C%20Gia%20Vi%E1%BB%85n%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=M%E1%BA%AFm%20T%C3%A9p%20Gia%20Vi%E1%BB%85n%20Ti%E1%BA%BFn%20Vua%20Ch%C3%ADnh%20Hi%E1%BB%87u%2C%20L%C3%A0ng%20m%E1%BA%AFm%20t%C3%A9p%20truy%E1%BB%81n%20th%E1%BB%91ng%20Me%2C%20Th%E1%BB%8B%20tr%E1%BA%A5n%20Me%2C%20Gia%20Vi%E1%BB%85n%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 107,
    "name": "Chiếu Cói Mỹ Nghệ Kim Sơn Thêu Tay Hoa Sen",
    "cat": "shop",
    "shopType": "coi",
    "area": "kimson",
    "rating": 4.9,
    "reviews": 340,
    "price": "320.000 đ",
    "priceNum": 320000,
    "unit": "Đôi chiếu 1.6m x 2.0m dệt tay",
    "badge": "LÀNG NGHỀ CỔ",
    "ocop": 4,
    "address": "Làng nghề chiếu cói Đồng Hướng, Huyện Kim Sơn, Ninh Bình",
    "highlight": "Sợi cói tự nhiên chọn lọc bền đẹp, nằm mùa hè mát rượi, mùa đông ấm áp thơm mùi đồng quê đồng bãi ven biển",
    "image": "https://images.unsplash.com/photo-1606744824163-985d376605aa?w=600&auto=format&fit=crop&q=80",
    "icon": "🧶",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Chi%E1%BA%BFu%20C%C3%B3i%20M%E1%BB%B9%20Ngh%E1%BB%87%20Kim%20S%C6%A1n%20Th%C3%AAu%20Tay%20Hoa%20Sen%2C%20L%C3%A0ng%20ngh%E1%BB%81%20chi%E1%BA%BFu%20c%C3%B3i%20%C4%90%E1%BB%93ng%20H%C6%B0%E1%BB%9Bng%2C%20Huy%E1%BB%87n%20Kim%20S%C6%A1n%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Chi%E1%BA%BFu%20C%C3%B3i%20M%E1%BB%B9%20Ngh%E1%BB%87%20Kim%20S%C6%A1n%20Th%C3%AAu%20Tay%20Hoa%20Sen%2C%20L%C3%A0ng%20ngh%E1%BB%81%20chi%E1%BA%BFu%20c%C3%B3i%20%C4%90%E1%BB%93ng%20H%C6%B0%E1%BB%9Bng%2C%20Huy%E1%BB%87n%20Kim%20S%C6%A1n%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 108,
    "name": "Túi Xách & Hộp Đựng Cói Tự Nhiên Xuất Khẩu",
    "cat": "shop",
    "shopType": "coi",
    "area": "kimson",
    "rating": 4.8,
    "reviews": 410,
    "price": "180.000 đ",
    "priceNum": 180000,
    "unit": "Chiếc (Kèm lót vải linen)",
    "badge": "ECO LIFESTYLE",
    "ocop": 3,
    "address": "HTX Thủ Công Mỹ Nghệ Xuất Khẩu Kim Sơn",
    "highlight": "Túi cói đan tay tỉ mỉ phong cách vintage chụp ảnh sống ảo check-in du lịch cực xinh, thân thiện môi trường",
    "image": "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop&q=80",
    "icon": "👜",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=T%C3%BAi%20X%C3%A1ch%20%26%20H%E1%BB%99p%20%C4%90%E1%BB%B1ng%20C%C3%B3i%20T%E1%BB%B1%20Nhi%C3%AAn%20Xu%E1%BA%A5t%20Kh%E1%BA%A9u%2C%20HTX%20Th%E1%BB%A7%20C%C3%B4ng%20M%E1%BB%B9%20Ngh%E1%BB%87%20Xu%E1%BA%A5t%20Kh%E1%BA%A9u%20Kim%20S%C6%A1n%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=T%C3%BAi%20X%C3%A1ch%20%26%20H%E1%BB%99p%20%C4%90%E1%BB%B1ng%20C%C3%B3i%20T%E1%BB%B1%20Nhi%C3%AAn%20Xu%E1%BA%A5t%20Kh%E1%BA%A9u%2C%20HTX%20Th%E1%BB%A7%20C%C3%B4ng%20M%E1%BB%B9%20Ngh%E1%BB%87%20Xu%E1%BA%A5t%20Kh%E1%BA%A9u%20Kim%20S%C6%A1n%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 109,
    "name": "Trà Hoa Vàng Cúc Phương Thượng Hạng",
    "cat": "shop",
    "shopType": "tra",
    "area": "cucphuong",
    "rating": 5.0,
    "reviews": 610,
    "price": "450.000 đ",
    "priceNum": 450000,
    "unit": "Hộp thiếc 50g sấy thăng hoa",
    "badge": "OCOP 5 SAO",
    "ocop": 5,
    "address": "Vùng đệm Vườn Quốc Gia Cúc Phương, Nho Quan",
    "highlight": "Nữ hoàng các loại trà dược liệu quý hiếm, giúp thanh nhiệt giải độc, ổn định huyết áp và chống lão hóa",
    "image": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80",
    "icon": "🍵",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Tr%C3%A0%20Hoa%20V%C3%A0ng%20C%C3%BAc%20Ph%C6%B0%C6%A1ng%20Th%C6%B0%E1%BB%A3ng%20H%E1%BA%A1ng%2C%20V%C3%B9ng%20%C4%91%E1%BB%87m%20V%C6%B0%E1%BB%9Dn%20Qu%E1%BB%91c%20Gia%20C%C3%BAc%20Ph%C6%B0%C6%A1ng%2C%20Nho%20Quan%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Tr%C3%A0%20Hoa%20V%C3%A0ng%20C%C3%BAc%20Ph%C6%B0%C6%A1ng%20Th%C6%B0%E1%BB%A3ng%20H%E1%BA%A1ng%2C%20V%C3%B9ng%20%C4%91%E1%BB%87m%20V%C6%B0%E1%BB%9Dn%20Qu%E1%BB%91c%20Gia%20C%C3%BAc%20Ph%C6%B0%C6%A1ng%2C%20Nho%20Quan%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 110,
    "name": "Tinh Bột Nghệ Vàng Tam Điệp Nguyên Chất",
    "cat": "shop",
    "shopType": "tra",
    "area": "tpnb",
    "rating": 4.8,
    "reviews": 430,
    "price": "190.000 đ",
    "priceNum": 190000,
    "unit": "Hũ thủy tinh 500g",
    "badge": "OCOP 4 SAO",
    "ocop": 4,
    "address": "Vùng chuyên canh đồi đất đỏ Tam Điệp, Ninh Bình",
    "highlight": "Chiết xuất từ củ nghệ nếp đồi đỏ giàu hàm lượng curcumin, tinh lọc không gắt, hỗ trợ dạ dày và làm đẹp da",
    "image": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80",
    "icon": "🏺",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Tinh%20B%E1%BB%99t%20Ngh%E1%BB%87%20V%C3%A0ng%20Tam%20%C4%90i%E1%BB%87p%20Nguy%C3%AAn%20Ch%E1%BA%A5t%2C%20V%C3%B9ng%20chuy%C3%AAn%20canh%20%C4%91%E1%BB%93i%20%C4%91%E1%BA%A5t%20%C4%91%E1%BB%8F%20Tam%20%C4%90i%E1%BB%87p%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Tinh%20B%E1%BB%99t%20Ngh%E1%BB%87%20V%C3%A0ng%20Tam%20%C4%90i%E1%BB%87p%20Nguy%C3%AAn%20Ch%E1%BA%A5t%2C%20V%C3%B9ng%20chuy%C3%AAn%20canh%20%C4%91%E1%BB%93i%20%C4%91%E1%BA%A5t%20%C4%91%E1%BB%8F%20Tam%20%C4%90i%E1%BB%87p%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 111,
    "name": "Nem Chua Yên Mạc Đặc Sản Cung Đình",
    "cat": "shop",
    "shopType": "comchay",
    "area": "tpnb",
    "rating": 4.9,
    "reviews": 580,
    "price": "75.000 đ",
    "priceNum": 75000,
    "unit": "Gói 10 quả nem lá ổi bọc chuối",
    "badge": "ĐẶC SẢN TIẾN VUA",
    "ocop": 4,
    "address": "Làng nem Mai Sơn, Xã Yên Mạc, Huyện Yên Mô, Ninh Bình",
    "highlight": "Nem thịt mông dê trộn thính gạo rang bọc lá ổi thơm bùi cay the, chấm tương bần hoặc nước mắm ớt tỏi chuẩn vị xưa",
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80",
    "icon": "🥓",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Nem%20Chua%20Y%C3%AAn%20M%E1%BA%A1c%20%C4%90%E1%BA%B7c%20S%E1%BA%A3n%20Cung%20%C4%90%C3%ACnh%2C%20L%C3%A0ng%20nem%20Mai%20S%C6%A1n%2C%20X%C3%A3%20Y%C3%AAn%20M%E1%BA%A1c%2C%20Huy%E1%BB%87n%20Y%C3%AAn%20M%C3%B4%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Nem%20Chua%20Y%C3%AAn%20M%E1%BA%A1c%20%C4%90%E1%BA%B7c%20S%E1%BA%A3n%20Cung%20%C4%90%C3%ACnh%2C%20L%C3%A0ng%20nem%20Mai%20S%C6%A1n%2C%20X%C3%A3%20Y%C3%AAn%20M%E1%BA%A1c%2C%20Huy%E1%BB%87n%20Y%C3%AAn%20M%C3%B4%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 201,
    "name": "Nhà Hàng Thăng Long — Đệ Nhất Dê Núi Tràng An",
    "cat": "food",
    "area": "trangan",
    "rating": 4.9,
    "reviews": 2180,
    "price": "150.000 đ – 350.000 đ/người",
    "priceNum": 220000,
    "phone": "0975.155.455",
    "address": "Thôn Chi Phong, Xã Trường Yên, Huyện Hoa Lư (Cách đền Vua Đinh 1km)",
    "highlight": "Dê núi chạy bộ đá vôi tươi sống mổ trong ngày, nổi tiếng nhất với món dê tái chanh cuốn bánh tráng & dê nướng tảng than hoa",
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
    "icon": "🐐",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Nh%C3%A0%20H%C3%A0ng%20Th%C4%83ng%20Long%2C%20Th%C3%B4n%20Chi%20Phong%2C%20X%C3%A3%20Tr%C6%B0%E1%BB%9Dng%20Y%C3%AAn%2C%20Huy%E1%BB%87n%20Hoa%20L%C6%B0%20%28C%C3%A1ch%20%C4%91%E1%BB%81n%20Vua%20%C4%90inh%201km%29%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Nh%C3%A0%20H%C3%A0ng%20Th%C4%83ng%20Long%2C%20Th%C3%B4n%20Chi%20Phong%2C%20X%C3%A3%20Tr%C6%B0%E1%BB%9Dng%20Y%C3%AAn%2C%20Huy%E1%BB%87n%20Hoa%20L%C6%B0%20%28C%C3%A1ch%20%C4%91%E1%BB%81n%20Vua%20%C4%90inh%201km%29%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 202,
    "name": "Nhà Hàng Dũng Phố Núi Ninh Bình",
    "cat": "food",
    "area": "trangan",
    "rating": 4.8,
    "reviews": 1450,
    "price": "140.000 đ – 300.000 đ/người",
    "priceNum": 180000,
    "phone": "0912.838.838",
    "address": "Đội 8, Thôn Chi Phong, Xã Trường Yên, Hoa Lư",
    "highlight": "Khuôn viên nhà sàn thoáng mát tựa vách núi, phục vụ dê 7 món, cơm cháy sốt tim cật dê gia truyền sóng sánh",
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80",
    "icon": "🍲",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Nh%C3%A0%20H%C3%A0ng%20D%C5%A9ng%20Ph%E1%BB%91%20N%C3%BAi%20Ninh%20B%C3%ACnh%2C%20%C4%90%E1%BB%99i%208%2C%20Th%C3%B4n%20Chi%20Phong%2C%20X%C3%A3%20Tr%C6%B0%E1%BB%9Dng%20Y%C3%AAn%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Nh%C3%A0%20H%C3%A0ng%20D%C5%A9ng%20Ph%E1%BB%91%20N%C3%BAi%20Ninh%20B%C3%ACnh%2C%20%C4%90%E1%BB%99i%208%2C%20Th%C3%B4n%20Chi%20Phong%2C%20X%C3%A3%20Tr%C6%B0%E1%BB%9Dng%20Y%C3%AAn%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 203,
    "name": "Đức Dê Ninh Bình — Quán Gốc Cổ Truyền",
    "cat": "food",
    "area": "tpnb",
    "rating": 4.9,
    "reviews": 1890,
    "price": "160.000 đ – 380.000 đ/người",
    "priceNum": 240000,
    "phone": "0229.3874.858",
    "address": "Số 448 Đường Nguyễn Huệ, Phường Nam Bình, TP. Ninh Bình",
    "highlight": "Thương hiệu lâu đời hơn 30 năm quen thuộc của người bản địa Cố Đô, dê hấp lá tía tô thơm ngát, tiết canh dê mát lành",
    "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80",
    "icon": "🥩",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=%C4%90%E1%BB%A9c%20D%C3%AA%20Ninh%20B%C3%ACnh%2C%20S%E1%BB%91%20448%20%C4%90%C6%B0%E1%BB%9Dng%20Nguy%E1%BB%85n%20Hu%E1%BB%87%2C%20Ph%C6%B0%E1%BB%9Dng%20Nam%20B%C3%ACnh%2C%20TP.%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=%C4%90%E1%BB%A9c%20D%C3%AA%20Ninh%20B%C3%ACnh%2C%20S%E1%BB%91%20448%20%C4%90%C6%B0%E1%BB%9Dng%20Nguy%E1%BB%85n%20Hu%E1%BB%87%2C%20Ph%C6%B0%E1%BB%9Dng%20Nam%20B%C3%ACnh%2C%20TP.%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 204,
    "name": "Nhà Hàng Hoàng Giang — Hang Cá Tràng An",
    "cat": "food",
    "area": "trangan",
    "rating": 4.8,
    "reviews": 1120,
    "price": "180.000 đ – 400.000 đ/người",
    "priceNum": 250000,
    "phone": "0988.921.234",
    "address": "Núi Hang Cá, Xã Trường Yên, Huyện Hoa Lư, Ninh Bình",
    "highlight": "Không gian sinh thái ven sông Đáy hữu tình, thịt dê nướng ngũ vị, lẩu sườn dê thuốc bắc thơm bổ dưỡng",
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80",
    "icon": "🏞️",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Nh%C3%A0%20H%C3%A0ng%20Ho%C3%A0ng%20Giang%2C%20N%C3%BAi%20Hang%20C%C3%A1%2C%20X%C3%A3%20Tr%C6%B0%E1%BB%9Dng%20Y%C3%AAn%2C%20Huy%E1%BB%87n%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Nh%C3%A0%20H%C3%A0ng%20Ho%C3%A0ng%20Giang%2C%20N%C3%BAi%20Hang%20C%C3%A1%2C%20X%C3%A3%20Tr%C6%B0%E1%BB%9Dng%20Y%C3%AAn%2C%20Huy%E1%BB%87n%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 205,
    "name": "Dê Núi Chính Thư Hoa Lư",
    "cat": "food",
    "area": "trangan",
    "rating": 4.8,
    "reviews": 980,
    "price": "150.000 đ – 320.000 đ/người",
    "priceNum": 200000,
    "phone": "0948.420.252",
    "address": "Thôn Khê Thượng, Xã Ninh Xuân, Hoa Lư, Ninh Bình",
    "highlight": "Chuyên các món dê núi xào xả ớt giòn sần sật, dê nướng riềng mẻ thơm nức mũi, giá cả niêm yết minh bạch",
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
    "icon": "🐐",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=D%C3%AA%20N%C3%BAi%20Ch%C3%ADnh%20Th%C6%B0%20Hoa%20L%C6%B0%2C%20Th%C3%B4n%20Kh%C3%AA%20Th%C6%B0%E1%BB%A3ng%2C%20X%C3%A3%20Ninh%20Xu%C3%A2n%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=D%C3%AA%20N%C3%BAi%20Ch%C3%ADnh%20Th%C6%B0%20Hoa%20L%C6%B0%2C%20Th%C3%B4n%20Kh%C3%AA%20Th%C6%B0%E1%BB%A3ng%2C%20X%C3%A3%20Ninh%20Xu%C3%A2n%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 206,
    "name": "Nhà Hàng Ba Cửa — Dưới Chân Núi Tràng An",
    "cat": "food",
    "area": "trangan",
    "rating": 4.7,
    "reviews": 840,
    "price": "130.000 đ – 280.000 đ/người",
    "priceNum": 170000,
    "phone": "0913.567.890",
    "address": "Thôn Tràng An, Xã Trường Yên, Hoa Lư, Ninh Bình",
    "highlight": "Món lẩu dê khô đặc sắc, thịt dê xào lăn mềm ngọt ăn kèm bánh đa vừng giòn tan",
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80",
    "icon": "🍲",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Nh%C3%A0%20H%C3%A0ng%20Ba%20C%E1%BB%ADa%2C%20Th%C3%B4n%20Tr%C3%A0ng%20An%2C%20X%C3%A3%20Tr%C6%B0%E1%BB%9Dng%20Y%C3%AAn%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Nh%C3%A0%20H%C3%A0ng%20Ba%20C%E1%BB%ADa%2C%20Th%C3%B4n%20Tr%C3%A0ng%20An%2C%20X%C3%A3%20Tr%C6%B0%E1%BB%9Dng%20Y%C3%AAn%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 207,
    "name": "Cơm Niêu Việt Xưa — Phố Cổ Hoa Lư",
    "cat": "food",
    "area": "phoco",
    "rating": 4.8,
    "reviews": 920,
    "price": "90.000 đ – 220.000 đ/người",
    "priceNum": 140000,
    "phone": "0983.123.456",
    "address": "Số 18 Đường Tràng An 2, Phường Tân Thành, TP. Ninh Bình",
    "highlight": "Cơm niêu đập cháy hai mặt vàng ươm, cá bống kho tộ nước mía, canh cua mồng tơi cà pháo chuẩn cơm mẹ nấu",
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
    "icon": "🍚",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=C%C6%A1m%20Ni%C3%AAu%20Vi%E1%BB%87t%20X%C6%B0a%2C%20S%E1%BB%91%2018%20%C4%90%C6%B0%E1%BB%9Dng%20Tr%C3%A0ng%20An%202%2C%20Ph%C6%B0%E1%BB%9Dng%20T%C3%A2n%20Th%C3%A0nh%2C%20TP.%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=C%C6%A1m%20Ni%C3%AAu%20Vi%E1%BB%87t%20X%C6%B0a%2C%20S%E1%BB%91%2018%20%C4%90%C6%B0%E1%BB%9Dng%20Tr%C3%A0ng%20An%202%2C%20Ph%C6%B0%E1%BB%9Dng%20T%C3%A2n%20Th%C3%A0nh%2C%20TP.%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 208,
    "name": "Cơm Cháy & Dê Núi Tam Cốc Brother",
    "cat": "food",
    "area": "tamcoc",
    "rating": 4.7,
    "reviews": 750,
    "price": "120.000 đ – 260.000 đ/người",
    "priceNum": 160000,
    "phone": "0977.890.123",
    "address": "Bến thuyền Tam Cốc, Thôn Đam Khê Trong, Ninh Hải, Hoa Lư",
    "highlight": "Điểm dừng chân lý tưởng sau tour chèo đò Tam Cốc, mâm cơm cháy giòn rụm chấm nước sốt đậm đà vị ngọt béo",
    "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80",
    "icon": "🌾",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=C%C6%A1m%20Ch%C3%A1y%20%26%20D%C3%AA%20N%C3%BAi%20Tam%20C%E1%BB%91c%20Brother%2C%20B%E1%BA%BFn%20thuy%E1%BB%81n%20Tam%20C%E1%BB%91c%2C%20Th%C3%B4n%20%C4%90am%20Kh%C3%AA%20Trong%2C%20Ninh%20H%E1%BA%A3i%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=C%C6%A1m%20Ch%C3%A1y%20%26%20D%C3%AA%20N%C3%BAi%20Tam%20C%E1%BB%91c%20Brother%2C%20B%E1%BA%BFn%20thuy%E1%BB%81n%20Tam%20C%E1%BB%91c%2C%20Th%C3%B4n%20%C4%90am%20Kh%C3%AA%20Trong%2C%20Ninh%20H%E1%BA%A3i%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 209,
    "name": "Miến Lươn Bà Phấn — Gia Truyền 3 Đời",
    "cat": "food",
    "area": "tpnb",
    "rating": 4.9,
    "reviews": 1150,
    "price": "45.000 đ – 70.000 đ/bát",
    "priceNum": 55000,
    "phone": "0229.3872.115",
    "address": "Số 999 Đường Trần Hưng Đạo, Phường Vân Giang, TP. Ninh Bình",
    "highlight": "Món ăn sáng trứ danh xứ Cố Đô, lươn đồng xào săn giòn thơm, nước dùng ninh từ xương lươn ngọt thanh ăn kèm hoa chuối thái mỏng",
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80",
    "icon": "🍜",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Mi%E1%BA%BFn%20L%C6%B0%C6%A1n%20B%C3%A0%20Ph%E1%BA%A5n%2C%20S%E1%BB%91%20999%20%C4%90%C6%B0%E1%BB%9Dng%20Tr%E1%BA%A7n%20H%C6%B0ng%20%C4%90%E1%BA%A1o%2C%20Ph%C6%B0%E1%BB%9Dng%20V%C3%A2n%20Giang%2C%20TP.%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Mi%E1%BA%BFn%20L%C6%B0%C6%A1n%20B%C3%A0%20Ph%E1%BA%A5n%2C%20S%E1%BB%91%20999%20%C4%90%C6%B0%E1%BB%9Dng%20Tr%E1%BA%A7n%20H%C6%B0ng%20%C4%90%E1%BA%A1o%2C%20Ph%C6%B0%E1%BB%9Dng%20V%C3%A2n%20Giang%2C%20TP.%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 210,
    "name": "Bún Chả Quạt Tố Như — Kim Sơn Cố Đô",
    "cat": "food",
    "area": "kimson",
    "rating": 4.9,
    "reviews": 820,
    "price": "35.000 đ – 55.000 đ/suất",
    "priceNum": 45000,
    "phone": "0982.555.789",
    "address": "Thị trấn Phát Diệm, Huyện Kim Sơn, Ninh Bình",
    "highlight": "Chả thịt băm nướng kẹp que tre tươi thơm lừng than hoa, bún con cọng nhỏ chấm nước mắm chua ngọt ấm nóng",
    "image": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&auto=format&fit=crop&q=80",
    "icon": "🍲",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=B%C3%BAn%20Ch%E1%BA%A3%20Qu%E1%BA%A1t%20T%E1%BB%91%20Nh%C6%B0%2C%20Th%E1%BB%8B%20tr%E1%BA%A5n%20Ph%C3%A1t%20Di%E1%BB%87m%2C%20Huy%E1%BB%87n%20Kim%20S%C6%A1n%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=B%C3%BAn%20Ch%E1%BA%A3%20Qu%E1%BA%A1t%20T%E1%BB%91%20Nh%C6%B0%2C%20Th%E1%BB%8B%20tr%E1%BA%A5n%20Ph%C3%A1t%20Di%E1%BB%87m%2C%20Huy%E1%BB%87n%20Kim%20S%C6%A1n%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 211,
    "name": "Nhà Hàng Cơm Cổ Hoa Lư — Phong Vị Hoàng Cung",
    "cat": "food",
    "area": "trangan",
    "rating": 4.8,
    "reviews": 680,
    "price": "110.000 đ – 250.000 đ/người",
    "priceNum": 150000,
    "phone": "0946.333.666",
    "address": "Khu di tích lịch sử Cố Đô Hoa Lư, Xã Trường Yên, Hoa Lư",
    "highlight": "Tái hiện mâm cơm tiến vua truyền thống: cá chuối nướng trui, thịt rang cháy cạnh, canh cua đồng rau tập tàng",
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80",
    "icon": "🍚",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Nh%C3%A0%20H%C3%A0ng%20C%C6%A1m%20C%E1%BB%95%20Hoa%20L%C6%B0%2C%20Khu%20di%20t%C3%ADch%20l%E1%BB%8Bch%20s%E1%BB%AD%20C%E1%BB%91%20%C4%90%C3%B4%20Hoa%20L%C6%B0%2C%20X%C3%A3%20Tr%C6%B0%E1%BB%9Dng%20Y%C3%AAn%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Nh%C3%A0%20H%C3%A0ng%20C%C6%A1m%20C%E1%BB%95%20Hoa%20L%C6%B0%2C%20Khu%20di%20t%C3%ADch%20l%E1%BB%8Bch%20s%E1%BB%AD%20C%E1%BB%91%20%C4%90%C3%B4%20Hoa%20L%C6%B0%2C%20X%C3%A3%20Tr%C6%B0%E1%BB%9Dng%20Y%C3%AAn%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 212,
    "name": "Gà Đồi Đất Sét Cúc Phương Quán",
    "cat": "food",
    "area": "cucphuong",
    "rating": 4.8,
    "reviews": 610,
    "price": "180.000 đ – 350.000 đ",
    "priceNum": 260000,
    "phone": "0987.654.321",
    "address": "Cổng Vườn Quốc Gia Cúc Phương, Nho Quan, Ninh Bình",
    "highlight": "Gà chạy đồi thịt thơm chắc bọc lá sen đắp đất sét nướng than hồng, giữ trọn độ ngọt béo thơm lừng",
    "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80",
    "icon": "🍗",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=G%C3%A0%20%C4%90%E1%BB%93i%20%C4%90%E1%BA%A5t%20S%C3%A9t%20C%C3%BAc%20Ph%C6%B0%C6%A1ng%20Qu%C3%A1n%2C%20C%E1%BB%95ng%20V%C6%B0%E1%BB%9Dn%20Qu%E1%BB%91c%20Gia%20C%C3%BAc%20Ph%C6%B0%C6%A1ng%2C%20Nho%20Quan%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=G%C3%A0%20%C4%90%E1%BB%93i%20%C4%90%E1%BA%A5t%20S%C3%A9t%20C%C3%BAc%20Ph%C6%B0%C6%A1ng%20Qu%C3%A1n%2C%20C%E1%BB%95ng%20V%C6%B0%E1%BB%9Dn%20Qu%E1%BB%91c%20Gia%20C%C3%BAc%20Ph%C6%B0%C6%A1ng%2C%20Nho%20Quan%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 301,
    "name": "Tam Coc Rice Fields Resort",
    "cat": "homestay",
    "area": "tamcoc",
    "rating": 4.8,
    "reviews": 920,
    "price": "720.000 đ – 1.350.000 đ/đêm",
    "priceNum": 720000,
    "phone": "0964.789.123",
    "address": "Đội 3, Thôn Hải Nham, Xã Ninh Hải, Hoa Lư, Ninh Bình",
    "highlight": "Bungalow view biển lúa Tam Cốc thơ mộng, hồ bơi vô cực ngoài trời ngắm vách núi đá, miễn phí xe đạp",
    "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop&q=80",
    "icon": "🏡",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Tam%20Coc%20Rice%20Fields%20Resort%2C%20%C4%90%E1%BB%99i%203%2C%20Th%C3%B4n%20H%E1%BA%A3i%20Nham%2C%20X%C3%A3%20Ninh%20H%E1%BA%A3i%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Tam%20Coc%20Rice%20Fields%20Resort%2C%20%C4%90%E1%BB%99i%203%2C%20Th%C3%B4n%20H%E1%BA%A3i%20Nham%2C%20X%C3%A3%20Ninh%20H%E1%BA%A3i%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 302,
    "name": "Tràng An Lamia Bungalow",
    "cat": "homestay",
    "area": "trangan",
    "rating": 4.9,
    "reviews": 780,
    "price": "650.000 đ – 1.150.000 đ/đêm",
    "priceNum": 650000,
    "phone": "0978.234.567",
    "address": "Thôn Đại Bái, Xã Ninh Hòa, Hoa Lư, Ninh Bình",
    "highlight": "Kiến trúc tre gỗ mộc mạc nép mình trong thung lũng Tràng An, không gian yên bình tĩnh lặng, bữa sáng miễn phí",
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80",
    "icon": "🏡",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Tr%C3%A0ng%20An%20Lamia%20Bungalow%2C%20Th%C3%B4n%20%C4%90%E1%BA%A1i%20B%C3%A1i%2C%20X%C3%A3%20Ninh%20H%C3%B2a%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Tr%C3%A0ng%20An%20Lamia%20Bungalow%2C%20Th%C3%B4n%20%C4%90%E1%BA%A1i%20B%C3%A1i%2C%20X%C3%A3%20Ninh%20H%C3%B2a%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 303,
    "name": "Ninh Binh Hidden Charm Hotel & Resort (4 Sao)",
    "cat": "homestay",
    "area": "tamcoc",
    "rating": 4.9,
    "reviews": 1350,
    "price": "1.350.000 đ – 2.800.000 đ/đêm",
    "priceNum": 1350000,
    "phone": "0229.3888.555",
    "address": "Số 9 Trung tâm du lịch Tam Cốc - Bích Động, Ninh Thắng, Hoa Lư",
    "highlight": "Khách sạn nghỉ dưỡng 4 sao sang trọng, buffet sáng đa dạng, hồ bơi rộng, dịch vụ spa chuyên nghiệp",
    "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop&q=80",
    "icon": "🏨",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Ninh%20Binh%20Hidden%20Charm%20Hotel%20%26%20Resort%2C%20S%E1%BB%91%209%20Trung%20t%C3%A2m%20du%20l%E1%BB%8Bch%20Tam%20C%E1%BB%91c%20-%20B%C3%ADch%20%C4%90%E1%BB%99ng%2C%20Ninh%20Th%E1%BA%AFng%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Ninh%20Binh%20Hidden%20Charm%20Hotel%20%26%20Resort%2C%20S%E1%BB%91%209%20Trung%20t%C3%A2m%20du%20l%E1%BB%8Bch%20Tam%20C%E1%BB%91c%20-%20B%C3%ADch%20%C4%90%E1%BB%99ng%2C%20Ninh%20Th%E1%BA%AFng%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 304,
    "name": "Hang Mua Ecolodge",
    "cat": "homestay",
    "area": "hangmua",
    "rating": 4.8,
    "reviews": 960,
    "price": "890.000 đ – 1.650.000 đ/đêm",
    "priceNum": 890000,
    "phone": "0982.345.678",
    "address": "Thôn Khê Hạ, Xã Ninh Xuân, Hoa Lư (Dưới chân núi Múa)",
    "highlight": "Nằm ngay trong khuôn viên Hang Múa, miễn phí vé leo đỉnh Ngọa Long ngắm toàn cảnh thung lũng Tam Cốc",
    "image": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&auto=format&fit=crop&q=80",
    "icon": "🏡",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Hang%20Mua%20Ecolodge%2C%20Th%C3%B4n%20Kh%C3%AA%20H%E1%BA%A1%2C%20X%C3%A3%20Ninh%20Xu%C3%A2n%2C%20Hoa%20L%C6%B0%20%28D%C6%B0%E1%BB%9Bi%20ch%C3%A2n%20n%C3%BAi%20M%C3%BAa%29%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Hang%20Mua%20Ecolodge%2C%20Th%C3%B4n%20Kh%C3%AA%20H%E1%BA%A1%2C%20X%C3%A3%20Ninh%20Xu%C3%A2n%2C%20Hoa%20L%C6%B0%20%28D%C6%B0%E1%BB%9Bi%20ch%C3%A2n%20n%C3%BAi%20M%C3%BAa%29%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 305,
    "name": "Emeralda Resort Ninh Binh (5 Sao)",
    "cat": "homestay",
    "area": "cucphuong",
    "rating": 4.9,
    "reviews": 1650,
    "price": "2.100.000 đ – 4.500.000 đ/đêm",
    "priceNum": 2100000,
    "phone": "0229.3658.333",
    "address": "Khu bảo tồn đất ngập nước Vân Long, Xã Gia Vân, Huyện Gia Viễn",
    "highlight": "Khu nghỉ dưỡng sinh thái 5 sao đẳng cấp tái hiện làng quê Bắc Bộ xưa, hồ bơi nước ấm bốn mùa, sân golf mini",
    "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop&q=80",
    "icon": "🏰",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Emeralda%20Resort%20Ninh%20Binh%2C%20Khu%20b%E1%BA%A3o%20t%E1%BB%93n%20%C4%91%E1%BA%A5t%20ng%E1%BA%ADp%20n%C6%B0%E1%BB%9Bc%20V%C3%A2n%20Long%2C%20X%C3%A3%20Gia%20V%C3%A2n%2C%20Huy%E1%BB%87n%20Gia%20Vi%E1%BB%85n%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Emeralda%20Resort%20Ninh%20Binh%2C%20Khu%20b%E1%BA%A3o%20t%E1%BB%93n%20%C4%91%E1%BA%A5t%20ng%E1%BA%ADp%20n%C6%B0%E1%BB%9Bc%20V%C3%A2n%20Long%2C%20X%C3%A3%20Gia%20V%C3%A2n%2C%20Huy%E1%BB%87n%20Gia%20Vi%E1%BB%85n%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 306,
    "name": "Chez Beo Homestay — Làng Đầm Sen",
    "cat": "homestay",
    "area": "tamcoc",
    "rating": 4.7,
    "reviews": 580,
    "price": "480.000 đ – 790.000 đ/đêm",
    "priceNum": 480000,
    "phone": "0943.567.890",
    "address": "Làng Khả Lương, Xã Ninh Thắng, Hoa Lư, Ninh Bình",
    "highlight": "Bungalow mái lá nép mình bên đầm sen ngát hương, cầu gỗ thơ mộng, tiếng ếch kêu rả rích đêm trăng bình yên",
    "image": "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&auto=format&fit=crop&q=80",
    "icon": "🏡",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Chez%20Beo%20Homestay%2C%20L%C3%A0ng%20Kh%E1%BA%A3%20L%C6%B0%C6%A1ng%2C%20X%C3%A3%20Ninh%20Th%E1%BA%AFng%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Chez%20Beo%20Homestay%2C%20L%C3%A0ng%20Kh%E1%BA%A3%20L%C6%B0%C6%A1ng%2C%20X%C3%A3%20Ninh%20Th%E1%BA%AFng%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 307,
    "name": "Aravinda Resort Ninh Binh (Resort Hoa Sen)",
    "cat": "homestay",
    "area": "tamcoc",
    "rating": 4.9,
    "reviews": 870,
    "price": "1.850.000 đ – 3.200.000 đ/đêm",
    "priceNum": 1850000,
    "phone": "0868.888.369",
    "address": "Thôn Hải Nham, Xã Ninh Hải, Hoa Lư, Ninh Bình",
    "highlight": "Kiến trúc thuần Việt tinh tế giữa cánh đồng lúa và đầm sen, trải nghiệm yoga đón bình minh và hồ bơi view núi đá",
    "image": "images/aravinda_resort.jpg",
    "icon": "🪷",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Aravinda%20Resort%20Ninh%20Binh%2C%20Th%C3%B4n%20H%E1%BA%A3i%20Nham%2C%20X%C3%A3%20Ninh%20H%E1%BA%A3i%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Aravinda%20Resort%20Ninh%20Binh%2C%20Th%C3%B4n%20H%E1%BA%A3i%20Nham%2C%20X%C3%A3%20Ninh%20H%E1%BA%A3i%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 308,
    "name": "Tràng An Valley Bungalow",
    "cat": "homestay",
    "area": "trangan",
    "rating": 4.8,
    "reviews": 740,
    "price": "550.000 đ – 950.000 đ/đêm",
    "priceNum": 550000,
    "phone": "0967.123.789",
    "address": "Thôn Trường An, Xã Trường Yên, Hoa Lư, Ninh Bình",
    "highlight": "Nằm gọn trong thung lũng đá vôi, có bể bơi ngoài trời nhìn vách núi sừng sững, tiệc nướng BBQ sân vườn ban đêm",
    "image": "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&auto=format&fit=crop&q=80",
    "icon": "🏡",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Tr%C3%A0ng%20An%20Valley%20Bungalow%2C%20Th%C3%B4n%20Tr%C6%B0%E1%BB%9Dng%20An%2C%20X%C3%A3%20Tr%C6%B0%E1%BB%9Dng%20Y%C3%AAn%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Tr%C3%A0ng%20An%20Valley%20Bungalow%2C%20Th%C3%B4n%20Tr%C6%B0%E1%BB%9Dng%20An%2C%20X%C3%A3%20Tr%C6%B0%E1%BB%9Dng%20Y%C3%AAn%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 309,
    "name": "Tam Cốc Garden Resort — Ốc Đảo Xanh",
    "cat": "homestay",
    "area": "tamcoc",
    "rating": 5.0,
    "reviews": 1100,
    "price": "2.500.000 đ – 4.800.000 đ/đêm",
    "priceNum": 2500000,
    "phone": "0378.253.555",
    "address": "Thôn Hải Nham, Xã Ninh Hải, Huyện Hoa Lư, Ninh Bình",
    "highlight": "Resort sinh thái cao cấp phong cách làng quê Bắc Bộ, dịch vụ 5 sao chuẩn quốc tế, nhà hàng hữu cơ từ vườn rau sạch",
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80",
    "icon": "🏰",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Tam%20C%E1%BB%91c%20Garden%20Resort%2C%20Th%C3%B4n%20H%E1%BA%A3i%20Nham%2C%20X%C3%A3%20Ninh%20H%E1%BA%A3i%2C%20Huy%E1%BB%87n%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Tam%20C%E1%BB%91c%20Garden%20Resort%2C%20Th%C3%B4n%20H%E1%BA%A3i%20Nham%2C%20X%C3%A3%20Ninh%20H%E1%BA%A3i%2C%20Huy%E1%BB%87n%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 310,
    "name": "Ninh Binh Legend Hotel (5 Sao Quốc Tế)",
    "cat": "homestay",
    "area": "tpnb",
    "rating": 4.9,
    "reviews": 1560,
    "price": "1.250.000 đ – 2.600.000 đ/đêm",
    "priceNum": 1250000,
    "phone": "0229.3899.880",
    "address": "Khu đô thị Xuân Thành, Phường Ninh Khánh, TP. Ninh Bình",
    "highlight": "Khách sạn 5 sao sang trọng bậc nhất trung tâm thành phố, bể bơi vô cực trên cao, sky bar ngắm toàn cảnh cố đô về đêm",
    "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop&q=80",
    "icon": "🏨",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Ninh%20Binh%20Legend%20Hotel%2C%20Khu%20%C4%91%C3%B4%20th%E1%BB%8B%20Xu%C3%A2n%20Th%C3%A0nh%2C%20Ph%C6%B0%E1%BB%9Dng%20Ninh%20Kh%C3%A1nh%2C%20TP.%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Ninh%20Binh%20Legend%20Hotel%2C%20Khu%20%C4%91%C3%B4%20th%E1%BB%8B%20Xu%C3%A2n%20Th%C3%A0nh%2C%20Ph%C6%B0%E1%BB%9Dng%20Ninh%20Kh%C3%A1nh%2C%20TP.%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 311,
    "name": "For You Homestay Tam Cốc",
    "cat": "homestay",
    "area": "tamcoc",
    "rating": 4.8,
    "reviews": 460,
    "price": "450.000 đ – 750.000 đ/đêm",
    "priceNum": 450000,
    "phone": "0981.456.789",
    "address": "Thôn Đam Khê Ngoài, Xã Ninh Hải, Hoa Lư",
    "highlight": "Homestay gia đình ấm áp, chủ nhà nhiệt tình chỉ dẫn tour khám phá kín, có hồ bơi nhỏ xinh và bữa sáng tự làm ngon miệng",
    "image": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&auto=format&fit=crop&q=80",
    "icon": "🏡",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=For%20You%20Homestay%20Tam%20C%E1%BB%91c%2C%20Th%C3%B4n%20%C4%90am%20Kh%C3%AA%20Ngo%C3%A0i%2C%20X%C3%A3%20Ninh%20H%E1%BA%A3i%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=For%20You%20Homestay%20Tam%20C%E1%BB%91c%2C%20Th%C3%B4n%20%C4%90am%20Kh%C3%AA%20Ngo%C3%A0i%2C%20X%C3%A3%20Ninh%20H%E1%BA%A3i%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 312,
    "name": "Tràng An Retreat Bungalow",
    "cat": "homestay",
    "area": "trangan",
    "rating": 4.8,
    "reviews": 620,
    "price": "600.000 đ – 1.100.000 đ/đêm",
    "priceNum": 600000,
    "phone": "0944.778.899",
    "address": "Làng Tràng An, Xã Trường Yên, Hoa Lư, Ninh Bình",
    "highlight": "Không gian xanh mát ven suối trong lành, chèo thuyền kayak miễn phí, phòng ngủ ngắm view núi đá vôi ngút ngàn",
    "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop&q=80",
    "icon": "🏡",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Tr%C3%A0ng%20An%20Retreat%20Bungalow%2C%20L%C3%A0ng%20Tr%C3%A0ng%20An%2C%20X%C3%A3%20Tr%C6%B0%E1%BB%9Dng%20Y%C3%AAn%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Tr%C3%A0ng%20An%20Retreat%20Bungalow%2C%20L%C3%A0ng%20Tr%C3%A0ng%20An%2C%20X%C3%A3%20Tr%C6%B0%E1%BB%9Dng%20Y%C3%AAn%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 313,
    "name": "Cúc Phương Resort & Spa Khoáng Nóng",
    "cat": "homestay",
    "area": "cucphuong",
    "rating": 4.7,
    "reviews": 890,
    "price": "950.000 đ – 2.200.000 đ/đêm",
    "priceNum": 950000,
    "phone": "0229.3845.888",
    "address": "Thôn Đồng Phú, Xã Kỳ Phú, Huyện Nho Quan, Ninh Bình",
    "highlight": "Nguồn suối nước khoáng nóng tự nhiên khoan sâu từ lòng đất Cúc Phương, tắm onsen thư giãn giữa đại ngàn",
    "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop&q=80",
    "icon": "♨️",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=C%C3%BAc%20Ph%C6%B0%C6%A1ng%20Resort%20%26%20Spa%20Kho%C3%A1ng%20N%C3%B3ng%2C%20Th%C3%B4n%20%C4%90%E1%BB%93ng%20Ph%C3%BA%2C%20X%C3%A3%20K%E1%BB%B3%20Ph%C3%BA%2C%20Huy%E1%BB%87n%20Nho%20Quan%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=C%C3%BAc%20Ph%C6%B0%C6%A1ng%20Resort%20%26%20Spa%20Kho%C3%A1ng%20N%C3%B3ng%2C%20Th%C3%B4n%20%C4%90%E1%BB%93ng%20Ph%C3%BA%2C%20X%C3%A3%20K%E1%BB%B3%20Ph%C3%BA%2C%20Huy%E1%BB%87n%20Nho%20Quan%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 314,
    "name": "Mua Caves Ecolodge Bungalow Hồ Sen",
    "cat": "homestay",
    "area": "hangmua",
    "rating": 4.8,
    "reviews": 730,
    "price": "820.000 đ – 1.400.000 đ/đêm",
    "priceNum": 820000,
    "phone": "0915.223.344",
    "address": "Khu du lịch Hang Múa, Thôn Khê Hạ, Ninh Xuân, Hoa Lư",
    "highlight": "Cây cầu gỗ hình trái tim giữa đầm sen nở rộ ngay trước cửa phòng, ngắm đỉnh Tháp Ngọa Long sừng sững lúc hoàng hôn",
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80",
    "icon": "🏡",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Mua%20Caves%20Ecolodge%20Bungalow%20H%E1%BB%93%20Sen%2C%20Khu%20du%20l%E1%BB%8Bch%20Hang%20M%C3%BAa%2C%20Th%C3%B4n%20Kh%C3%AA%20H%E1%BA%A1%2C%20Ninh%20Xu%C3%A2n%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Mua%20Caves%20Ecolodge%20Bungalow%20H%E1%BB%93%20Sen%2C%20Khu%20du%20l%E1%BB%8Bch%20Hang%20M%C3%BAa%2C%20Th%C3%B4n%20Kh%C3%AA%20H%E1%BA%A1%2C%20Ninh%20Xu%C3%A2n%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 315,
    "name": "The Vancouver Hotel Ninh Binh",
    "cat": "homestay",
    "area": "tpnb",
    "rating": 4.9,
    "reviews": 980,
    "price": "500.000 đ – 900.000 đ/đêm",
    "priceNum": 500000,
    "phone": "0229.3893.270",
    "address": "Số 01 Ngõ 75 Đường Lương Văn Tụy, TP. Ninh Bình",
    "highlight": "Khách sạn đạt điểm đánh giá số 1 TripAdvisor Ninh Bình nhiều năm liền bởi sự chu đáo, sạch sẽ và mến khách",
    "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop&q=80",
    "icon": "🏨",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=The%20Vancouver%20Hotel%20Ninh%20Binh%2C%20S%E1%BB%91%2001%20Ng%C3%B5%2075%20%C4%90%C6%B0%E1%BB%9Dng%20L%C6%B0%C6%A1ng%20V%C4%83n%20T%E1%BB%A5y%2C%20TP.%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=The%20Vancouver%20Hotel%20Ninh%20Binh%2C%20S%E1%BB%91%2001%20Ng%C3%B5%2075%20%C4%90%C6%B0%E1%BB%9Dng%20L%C6%B0%C6%A1ng%20V%C4%83n%20T%E1%BB%A5y%2C%20TP.%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 401,
    "name": "Cà Phê Đồng Cừu Tràng An",
    "cat": "cafe",
    "area": "trangan",
    "rating": 4.8,
    "reviews": 720,
    "price": "35.000 đ – 65.000 đ",
    "priceNum": 45000,
    "phone": "0916.234.789",
    "address": "Thôn Khê Thượng, Ninh Xuân, Hoa Lư (Gần bến thuyền Tràng An)",
    "highlight": "Khuôn viên bãi cỏ xanh ngát, check-in cùng đàn cừu trắng thân thiện, view trọn dãy núi đá vôi hùng vĩ",
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80",
    "icon": "☕",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=C%C3%A0%20Ph%C3%AA%20%C4%90%E1%BB%93ng%20C%E1%BB%ABu%20Tr%C3%A0ng%20An%2C%20Th%C3%B4n%20Kh%C3%AA%20Th%C6%B0%E1%BB%A3ng%2C%20Ninh%20Xu%C3%A2n%2C%20Hoa%20L%C6%B0%20%28G%E1%BA%A7n%20b%E1%BA%BFn%20thuy%E1%BB%81n%20Tr%C3%A0ng%20An%29%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=C%C3%A0%20Ph%C3%AA%20%C4%90%E1%BB%93ng%20C%E1%BB%ABu%20Tr%C3%A0ng%20An%2C%20Th%C3%B4n%20Kh%C3%AA%20Th%C6%B0%E1%BB%A3ng%2C%20Ninh%20Xu%C3%A2n%2C%20Hoa%20L%C6%B0%20%28G%E1%BA%A7n%20b%E1%BA%BFn%20thuy%E1%BB%81n%20Tr%C3%A0ng%20An%29%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 402,
    "name": "Tu Tu Coffee — Góc Ga Cổ Ninh Bình",
    "cat": "cafe",
    "area": "tpnb",
    "rating": 4.9,
    "reviews": 630,
    "price": "28.000 đ – 55.000 đ",
    "priceNum": 35000,
    "phone": "0989.345.671",
    "address": "Số 14 Ngõ 248 Đường Ngô Gia Tự, Phường Nam Bình, TP. Ninh Bình",
    "highlight": "Không gian cổ điển phong cách Indochine nhìn thẳng đường ray xe lửa ga Ninh Bình, cà phê trứng béo ngậy",
    "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=80",
    "icon": "☕",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Tu%20Tu%20Coffee%2C%20S%E1%BB%91%2014%20Ng%C3%B5%20248%20%C4%90%C6%B0%E1%BB%9Dng%20Ng%C3%B4%20Gia%20T%E1%BB%B1%2C%20Ph%C6%B0%E1%BB%9Dng%20Nam%20B%C3%ACnh%2C%20TP.%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Tu%20Tu%20Coffee%2C%20S%E1%BB%91%2014%20Ng%C3%B5%20248%20%C4%90%C6%B0%E1%BB%9Dng%20Ng%C3%B4%20Gia%20T%E1%BB%B1%2C%20Ph%C6%B0%E1%BB%9Dng%20Nam%20B%C3%ACnh%2C%20TP.%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 403,
    "name": "Chookie's Beer Garden & Cafe",
    "cat": "cafe",
    "area": "tpnb",
    "rating": 4.8,
    "reviews": 580,
    "price": "40.000 đ – 95.000 đ",
    "priceNum": 60000,
    "phone": "0949.123.888",
    "address": "Số 565 Đường Lương Văn Thắng, Phường Đông Thành, TP. Ninh Bình",
    "highlight": "Sân vườn thoáng mát phong cách Âu - Á, sinh tố hoa quả nhiệt đới, pizza thủ công và bia tươi mát lạnh",
    "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&auto=format&fit=crop&q=80",
    "icon": "☕",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Chookie%27s%20Beer%20Garden%20%26%20Cafe%2C%20S%E1%BB%91%20565%20%C4%90%C6%B0%E1%BB%9Dng%20L%C6%B0%C6%A1ng%20V%C4%83n%20Th%E1%BA%AFng%2C%20Ph%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4ng%20Th%C3%A0nh%2C%20TP.%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Chookie%27s%20Beer%20Garden%20%26%20Cafe%2C%20S%E1%BB%91%20565%20%C4%90%C6%B0%E1%BB%9Dng%20L%C6%B0%C6%A1ng%20V%C4%83n%20Th%E1%BA%AFng%2C%20Ph%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4ng%20Th%C3%A0nh%2C%20TP.%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 404,
    "name": "Gió Đồng Cafe Tam Cốc — View Biển Lúa",
    "cat": "cafe",
    "area": "tamcoc",
    "rating": 4.9,
    "reviews": 690,
    "price": "35.000 đ – 60.000 đ",
    "priceNum": 40000,
    "phone": "0971.888.999",
    "address": "Bến đò Tam Cốc, Thôn Đam Khê, Xã Ninh Hải, Hoa Lư",
    "highlight": "Quán lợp mái rạ mộc mạc nhìn trọn cánh đồng lúa chín vàng mùa gặt, trà đào cam sả và nước ép dừa tươi ngọt lịm",
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80",
    "icon": "🌾",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Gi%C3%B3%20%C4%90%E1%BB%93ng%20Cafe%20Tam%20C%E1%BB%91c%2C%20B%E1%BA%BFn%20%C4%91%C3%B2%20Tam%20C%E1%BB%91c%2C%20Th%C3%B4n%20%C4%90am%20Kh%C3%AA%2C%20X%C3%A3%20Ninh%20H%E1%BA%A3i%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Gi%C3%B3%20%C4%90%E1%BB%93ng%20Cafe%20Tam%20C%E1%BB%91c%2C%20B%E1%BA%BFn%20%C4%91%C3%B2%20Tam%20C%E1%BB%91c%2C%20Th%C3%B4n%20%C4%90am%20Kh%C3%AA%2C%20X%C3%A3%20Ninh%20H%E1%BA%A3i%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 405,
    "name": "The Vissai Sky Lounge Cafe (Tầng 18)",
    "cat": "cafe",
    "area": "tpnb",
    "rating": 4.8,
    "reviews": 480,
    "price": "50.000 đ – 120.000 đ",
    "priceNum": 75000,
    "phone": "0229.3891.245",
    "address": "Tầng 18 Khách sạn The Vissai, Số 848 Trần Hưng Đạo, TP. Ninh Bình",
    "highlight": "Tọa độ ngắm hoàng hôn và thành phố Ninh Bình lung linh lên đèn từ trên cao lộng gió, cocktail và cà phê pha máy cao cấp",
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80",
    "icon": "🍸",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=The%20Vissai%20Sky%20Lounge%20Cafe%2C%20T%E1%BA%A7ng%2018%20Kh%C3%A1ch%20s%E1%BA%A1n%20The%20Vissai%2C%20S%E1%BB%91%20848%20Tr%E1%BA%A7n%20H%C6%B0ng%20%C4%90%E1%BA%A1o%2C%20TP.%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=The%20Vissai%20Sky%20Lounge%20Cafe%2C%20T%E1%BA%A7ng%2018%20Kh%C3%A1ch%20s%E1%BA%A1n%20The%20Vissai%2C%20S%E1%BB%91%20848%20Tr%E1%BA%A7n%20H%C6%B0ng%20%C4%90%E1%BA%A1o%2C%20TP.%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 406,
    "name": "Tiệm Cà Phê Cổ Tràng An",
    "cat": "cafe",
    "area": "trangan",
    "rating": 4.7,
    "reviews": 360,
    "price": "30.000 đ – 55.000 đ",
    "priceNum": 38000,
    "phone": "0984.321.654",
    "address": "Thôn Chi Phong, Xã Trường Yên, Hoa Lư, Ninh Bình",
    "highlight": "Sân gạch đỏ, cây bàng cổ thụ và bàn gỗ cũ hoài niệm, trà sen ướp lạnh và cà phê phin đậm chất xứ Bắc",
    "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=80",
    "icon": "☕",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Ti%E1%BB%87m%20C%C3%A0%20Ph%C3%AA%20C%E1%BB%95%20Tr%C3%A0ng%20An%2C%20Th%C3%B4n%20Chi%20Phong%2C%20X%C3%A3%20Tr%C6%B0%E1%BB%9Dng%20Y%C3%AAn%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Ti%E1%BB%87m%20C%C3%A0%20Ph%C3%AA%20C%E1%BB%95%20Tr%C3%A0ng%20An%2C%20Th%C3%B4n%20Chi%20Phong%2C%20X%C3%A3%20Tr%C6%B0%E1%BB%9Dng%20Y%C3%AAn%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 408,
    "name": "Tiệm Trà & Cà Phê Cổ Hoa Lư — View Tháp Bạc",
    "cat": "cafe",
    "area": "phoco",
    "rating": 4.9,
    "reviews": 580,
    "price": "35.000 đ – 65.000 đ",
    "priceNum": 45000,
    "phone": "0987.112.233",
    "address": "Nhà rường số 06, Phố Cổ Hoa Lư, TP. Ninh Bình",
    "highlight": "Không gian gỗ cổ kính bên bờ hồ Kỳ Lân, ngắm trọn Tháp Bạc rực sáng lung linh về đêm, trà cung đình và cà phê thơm",
    "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80",
    "icon": "☕",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Ti%E1%BB%87m%20Tr%C3%A0%20%26%20C%C3%A0%20Ph%C3%AA%20C%E1%BB%95%20Hoa%20L%C6%B0%2C%20Nh%C3%A0%20r%C6%B0%E1%BB%9Dng%20s%E1%BB%91%2006%2C%20Ph%E1%BB%91%20C%E1%BB%95%20Hoa%20L%C6%B0%2C%20TP.%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Ti%E1%BB%87m%20Tr%C3%A0%20%26%20C%C3%A0%20Ph%C3%AA%20C%E1%BB%95%20Hoa%20L%C6%B0%2C%20Nh%C3%A0%20r%C6%B0%E1%BB%9Dng%20s%E1%BB%91%2006%2C%20Ph%E1%BB%91%20C%E1%BB%95%20Hoa%20L%C6%B0%2C%20TP.%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 407,
    "name": "Thung Nham Bird Park Coffee",
    "cat": "cafe",
    "area": "tamcoc",
    "rating": 4.8,
    "reviews": 520,
    "price": "40.000 đ – 70.000 đ",
    "priceNum": 50000,
    "phone": "0229.3624.456",
    "address": "Vườn chim Thung Nham, Xã Ninh Hải, Hoa Lư, Ninh Bình",
    "highlight": "View hướng ra hồ nước ngắm hàng ngàn cánh chim bay về tổ rợp bóng trời chiều, không gian thiên nhiên thanh bình",
    "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&auto=format&fit=crop&q=80",
    "icon": "🦩",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Thung%20Nham%20Bird%20Park%20Coffee%2C%20V%C6%B0%E1%BB%9Dn%20chim%20Thung%20Nham%2C%20X%C3%A3%20Ninh%20H%E1%BA%A3i%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Thung%20Nham%20Bird%20Park%20Coffee%2C%20V%C6%B0%E1%BB%9Dn%20chim%20Thung%20Nham%2C%20X%C3%A3%20Ninh%20H%E1%BA%A3i%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 501,
    "name": "Thuê Xe Máy Khánh Chi Ga Ninh Bình",
    "cat": "xemay",
    "area": "tpnb",
    "rating": 4.9,
    "reviews": 890,
    "price": "100.000 đ – 150.000 đ/ngày",
    "priceNum": 120000,
    "phone": "0942.862.099",
    "address": "Số 80 Đường Lê Hồng Phong, Phường Đông Thành, TP. Ninh Bình",
    "highlight": "Giao nhận xe miễn phí tận ga xe lửa Ninh Bình & khách sạn, xe đời mới Vision, AirBlade, Wave bảo dưỡng định kỳ, kèm 2 mũ BH",
    "image": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80",
    "icon": "🛵",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Thu%C3%AA%20Xe%20M%C3%A1y%20Kh%C3%A1nh%20Chi%20Ga%20Ninh%20B%C3%ACnh%2C%20S%E1%BB%91%2080%20%C4%90%C6%B0%E1%BB%9Dng%20L%C3%AA%20H%E1%BB%93ng%20Phong%2C%20Ph%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4ng%20Th%C3%A0nh%2C%20TP.%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Thu%C3%AA%20Xe%20M%C3%A1y%20Kh%C3%A1nh%20Chi%20Ga%20Ninh%20B%C3%ACnh%2C%20S%E1%BB%91%2080%20%C4%90%C6%B0%E1%BB%9Dng%20L%C3%AA%20H%E1%BB%93ng%20Phong%2C%20Ph%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4ng%20Th%C3%A0nh%2C%20TP.%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 502,
    "name": "Thuê Xe Máy Tam Cốc Dung Motorbike",
    "cat": "xemay",
    "area": "tamcoc",
    "rating": 4.9,
    "reviews": 640,
    "price": "110.000 đ – 160.000 đ/ngày",
    "priceNum": 130000,
    "phone": "0976.432.109",
    "address": "Ngay ngã ba bến thuyền Tam Cốc, Hoa Lư, Ninh Bình",
    "highlight": "Thủ tục nhanh gọn chỉ cần CCCD hoặc hộ chiếu, xe khỏe leo dốc Hang Múa & Bái Đính êm ru, tặng bản đồ du lịch",
    "image": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80",
    "icon": "🛵",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Thu%C3%AA%20Xe%20M%C3%A1y%20Tam%20C%E1%BB%91c%20Dung%20Motorbike%2C%20Ngay%20ng%C3%A3%20ba%20b%E1%BA%BFn%20thuy%E1%BB%81n%20Tam%20C%E1%BB%91c%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Thu%C3%AA%20Xe%20M%C3%A1y%20Tam%20C%E1%BB%91c%20Dung%20Motorbike%2C%20Ngay%20ng%C3%A3%20ba%20b%E1%BA%BFn%20thuy%E1%BB%81n%20Tam%20C%E1%BB%91c%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 503,
    "name": "Tràng An Eco Bike — Cho Thuê Xe Ga & Xe Côn",
    "cat": "xemay",
    "area": "trangan",
    "rating": 4.8,
    "reviews": 410,
    "price": "120.000 đ – 180.000 đ/ngày",
    "priceNum": 140000,
    "phone": "0981.654.987",
    "address": "Cổng khu du lịch sinh thái Tràng An, Ninh Xuân, Hoa Lư",
    "highlight": "Có đủ xe cào cào XR150, Winner, Lead, Vision cho các phượt thủ muốn khám phá xuyên rừng Cúc Phương",
    "image": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80",
    "icon": "🏍️",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Tr%C3%A0ng%20An%20Eco%20Bike%2C%20C%E1%BB%95ng%20khu%20du%20l%E1%BB%8Bch%20sinh%20th%C3%A1i%20Tr%C3%A0ng%20An%2C%20Ninh%20Xu%C3%A2n%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Tr%C3%A0ng%20An%20Eco%20Bike%2C%20C%E1%BB%95ng%20khu%20du%20l%E1%BB%8Bch%20sinh%20th%C3%A1i%20Tr%C3%A0ng%20An%2C%20Ninh%20Xu%C3%A2n%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 504,
    "name": "Spa Thảo Dược Cố Đô Tràng An (Lá Dao Đỏ)",
    "cat": "spa",
    "area": "trangan",
    "rating": 4.8,
    "reviews": 470,
    "price": "150.000 đ – 350.000 đ/liệu trình",
    "priceNum": 200000,
    "phone": "0988.765.432",
    "address": "Thôn Tràng An, Xã Trường Yên, Hoa Lư, Ninh Bình",
    "highlight": "Ngâm chân lá thuốc Dao Đỏ thảo mộc Cúc Phương, xoa bóp bấm huyệt đá nóng giảm mệt mỏi tức thì sau ngày dài leo núi",
    "image": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80",
    "icon": "💆‍♀️",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Spa%20Th%E1%BA%A3o%20D%C6%B0%E1%BB%A3c%20C%E1%BB%91%20%C4%90%C3%B4%20Tr%C3%A0ng%20An%2C%20Th%C3%B4n%20Tr%C3%A0ng%20An%2C%20X%C3%A3%20Tr%C6%B0%E1%BB%9Dng%20Y%C3%AAn%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Spa%20Th%E1%BA%A3o%20D%C6%B0%E1%BB%A3c%20C%E1%BB%91%20%C4%90%C3%B4%20Tr%C3%A0ng%20An%2C%20Th%C3%B4n%20Tr%C3%A0ng%20An%2C%20X%C3%A3%20Tr%C6%B0%E1%BB%9Dng%20Y%C3%AAn%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 505,
    "name": "Tam Cốc Lotus Spa & Massage Body Đá Nóng",
    "cat": "spa",
    "area": "tamcoc",
    "rating": 4.9,
    "reviews": 560,
    "price": "200.000 đ – 450.000 đ/liệu trình",
    "priceNum": 250000,
    "phone": "0963.222.111",
    "address": "Đường vào Bích Động, Thôn Đam Khê, Ninh Hải, Hoa Lư",
    "highlight": "Massage tinh dầu sen thư giãn cơ bắp, xông hơi thảo dược hoàng cung, không gian tĩnh lặng tiếng suối róc rách",
    "image": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80",
    "icon": "💆‍♀️",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Tam%20C%E1%BB%91c%20Lotus%20Spa%20%26%20Massage%20Body%20%C4%90%C3%A1%20N%C3%B3ng%2C%20%C4%90%C6%B0%E1%BB%9Dng%20v%C3%A0o%20B%C3%ADch%20%C4%90%E1%BB%99ng%2C%20Th%C3%B4n%20%C4%90am%20Kh%C3%AA%2C%20Ninh%20H%E1%BA%A3i%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Tam%20C%E1%BB%91c%20Lotus%20Spa%20%26%20Massage%20Body%20%C4%90%C3%A1%20N%C3%B3ng%2C%20%C4%90%C6%B0%E1%BB%9Dng%20v%C3%A0o%20B%C3%ADch%20%C4%90%E1%BB%99ng%2C%20Th%C3%B4n%20%C4%90am%20Kh%C3%AA%2C%20Ninh%20H%E1%BA%A3i%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 506,
    "name": "Himalaya Salt Spa & Foot Massage TP. Ninh Bình",
    "cat": "spa",
    "area": "tpnb",
    "rating": 4.8,
    "reviews": 380,
    "price": "180.000 đ – 400.000 đ/liệu trình",
    "priceNum": 220000,
    "phone": "0229.3882.668",
    "address": "Số 26 Đường Đinh Tất Miễn, Phường Đông Thành, TP. Ninh Bình",
    "highlight": "Phòng xông đá muối Himalaya trị liệu thải độc, ngâm chân muối khoáng và bấm huyệt cổ vai gáy chuyên sâu",
    "image": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80",
    "icon": "💆‍♀️",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Himalaya%20Salt%20Spa%20%26%20Foot%20Massage%20TP.%20Ninh%20B%C3%ACnh%2C%20S%E1%BB%91%2026%20%C4%90%C6%B0%E1%BB%9Dng%20%C4%90inh%20T%E1%BA%A5t%20Mi%E1%BB%85n%2C%20Ph%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4ng%20Th%C3%A0nh%2C%20TP.%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Himalaya%20Salt%20Spa%20%26%20Foot%20Massage%20TP.%20Ninh%20B%C3%ACnh%2C%20S%E1%BB%91%2026%20%C4%90%C6%B0%E1%BB%9Dng%20%C4%90inh%20T%E1%BA%A5t%20Mi%E1%BB%85n%2C%20Ph%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4ng%20Th%C3%A0nh%2C%20TP.%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 701,
    "name": "Quần Thể Danh Thắng Tràng An (Di Sản Thế Giới UNESCO)",
    "cat": "spot",
    "area": "trangan",
    "rating": 5.0,
    "reviews": 4850,
    "price": "250.000 đ/vé thuyền (Tour 1, 2, 3)",
    "priceNum": 250000,
    "address": "Xã Ninh Xuân, Huyện Hoa Lư, Ninh Bình",
    "highlight": "Kỳ quan thiên nhiên & văn hóa thế giới UNESCO, trải nghiệm ngồi thuyền nan lướt qua các hang động kỳ bí và phim trường Kong",
    "image": "https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=80",
    "icon": "🛶",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Qu%E1%BA%A7n%20Th%E1%BB%83%20Danh%20Th%E1%BA%AFng%20Tr%C3%A0ng%20An%2C%20X%C3%A3%20Ninh%20Xu%C3%A2n%2C%20Huy%E1%BB%87n%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Qu%E1%BA%A7n%20Th%E1%BB%83%20Danh%20Th%E1%BA%AFng%20Tr%C3%A0ng%20An%2C%20X%C3%A3%20Ninh%20Xu%C3%A2n%2C%20Huy%E1%BB%87n%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 702,
    "name": "Tam Cốc — Bích Động (Nam Thiên Đệ Nhị Động)",
    "cat": "spot",
    "area": "tamcoc",
    "rating": 4.9,
    "reviews": 3620,
    "price": "120.000 đ vé thắng cảnh + 150.000 đ đò",
    "priceNum": 270000,
    "address": "Thôn Đam Khê, Xã Ninh Hải, Huyện Hoa Lư, Ninh Bình",
    "highlight": "Chèo đò trên dòng sông Ngô Đồng ngắm lúa chín vàng rực rỡ dưới chân núi đá vôi, vãng cảnh chùa cổ Bích Động thâm nghiêm",
    "image": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&auto=format&fit=crop&q=80",
    "icon": "🌾",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Tam%20C%E1%BB%91c%2C%20Th%C3%B4n%20%C4%90am%20Kh%C3%AA%2C%20X%C3%A3%20Ninh%20H%E1%BA%A3i%2C%20Huy%E1%BB%87n%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Tam%20C%E1%BB%91c%2C%20Th%C3%B4n%20%C4%90am%20Kh%C3%AA%2C%20X%C3%A3%20Ninh%20H%E1%BA%A3i%2C%20Huy%E1%BB%87n%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 703,
    "name": "Hang Múa & Đỉnh Núi Ngọa Long",
    "cat": "spot",
    "area": "hangmua",
    "rating": 4.9,
    "reviews": 4120,
    "price": "100.000 đ/vé vào cổng",
    "priceNum": 100000,
    "address": "Thôn Khê Hạ, Xã Ninh Xuân, Hoa Lư, Ninh Bình",
    "highlight": "Chinh phục 486 bậc đá lên tượng Rồng Ngọa Long, ôm trọn toàn cảnh sông Ngô Đồng và các dãy núi đá trùng điệp",
    "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80",
    "icon": "🐉",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Hang%20M%C3%BAa%20%26%20%C4%90%E1%BB%89nh%20N%C3%BAi%20Ng%E1%BB%8Da%20Long%2C%20Th%C3%B4n%20Kh%C3%AA%20H%E1%BA%A1%2C%20X%C3%A3%20Ninh%20Xu%C3%A2n%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Hang%20M%C3%BAa%20%26%20%C4%90%E1%BB%89nh%20N%C3%BAi%20Ng%E1%BB%8Da%20Long%2C%20Th%C3%B4n%20Kh%C3%AA%20H%E1%BA%A1%2C%20X%C3%A3%20Ninh%20Xu%C3%A2n%2C%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 704,
    "name": "Chùa Bái Đính — Đại Bảo Tháp Nguy Nga",
    "cat": "spot",
    "area": "baidinh",
    "rating": 4.9,
    "reviews": 3950,
    "price": "Miễn phí (Xe điện 60.000 đ/lượt, Bảo tháp 50.000 đ)",
    "priceNum": 60000,
    "address": "Xã Gia Sinh, Huyện Gia Viễn, Ninh Bình",
    "highlight": "Quần thể chùa lớn nhất Đông Nam Á với nhiều kỷ lục châu Á: tượng Phật bằng đồng lớn nhất, hành lang 500 vị La Hán đá xanh",
    "image": "https://images.unsplash.com/photo-1548625361-195feee10fce?w=600&auto=format&fit=crop&q=80",
    "icon": "⛩️",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Ch%C3%B9a%20B%C3%A1i%20%C4%90%C3%ADnh%2C%20X%C3%A3%20Gia%20Sinh%2C%20Huy%E1%BB%87n%20Gia%20Vi%E1%BB%85n%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Ch%C3%B9a%20B%C3%A1i%20%C4%90%C3%ADnh%2C%20X%C3%A3%20Gia%20Sinh%2C%20Huy%E1%BB%87n%20Gia%20Vi%E1%BB%85n%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 705,
    "name": "Cố Đô Hoa Lư — Đền Vua Đinh & Vua Lê",
    "cat": "spot",
    "area": "trangan",
    "rating": 4.8,
    "reviews": 1850,
    "price": "20.000 đ/vé người lớn",
    "priceNum": 20000,
    "address": "Xã Trường Yên, Huyện Hoa Lư, Ninh Bình",
    "highlight": "Kinh đô đầu tiên của nhà nước phong kiến tập quyền Việt Nam thế kỷ thứ X, chiêm bái sập đá rồng và bia đá cổ ngàn năm",
    "image": "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=600&auto=format&fit=crop&q=80",
    "icon": "🏛️",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=C%E1%BB%91%20%C4%90%C3%B4%20Hoa%20L%C6%B0%2C%20X%C3%A3%20Tr%C6%B0%E1%BB%9Dng%20Y%C3%AAn%2C%20Huy%E1%BB%87n%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=C%E1%BB%91%20%C4%90%C3%B4%20Hoa%20L%C6%B0%2C%20X%C3%A3%20Tr%C6%B0%E1%BB%9Dng%20Y%C3%AAn%2C%20Huy%E1%BB%87n%20Hoa%20L%C6%B0%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 706,
    "name": "Khu Bảo Tồn Đất Ngập Nước Vân Long",
    "cat": "spot",
    "area": "cucphuong",
    "rating": 4.8,
    "reviews": 1290,
    "price": "100.000 đ/vé thuyền",
    "priceNum": 100000,
    "address": "Xã Gia Vân, Huyện Gia Viễn, Ninh Bình",
    "highlight": "Vịnh không sóng hữu tình, ngắm loài Voọc mông trắng quý hiếm ghi vào sách đỏ thế giới chuyền cành trên vách đá",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    "icon": "🐒",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Khu%20B%E1%BA%A3o%20T%E1%BB%93n%20%C4%90%E1%BA%A5t%20Ng%E1%BA%ADp%20N%C6%B0%E1%BB%9Bc%20V%C3%A2n%20Long%2C%20X%C3%A3%20Gia%20V%C3%A2n%2C%20Huy%E1%BB%87n%20Gia%20Vi%E1%BB%85n%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Khu%20B%E1%BA%A3o%20T%E1%BB%93n%20%C4%90%E1%BA%A5t%20Ng%E1%BA%ADp%20N%C6%B0%E1%BB%9Bc%20V%C3%A2n%20Long%2C%20X%C3%A3%20Gia%20V%C3%A2n%2C%20Huy%E1%BB%87n%20Gia%20Vi%E1%BB%85n%2C%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 707,
    "name": "Phố Cổ Hoa Lư — Hồ Kỳ Lân Về Đêm",
    "cat": "spot",
    "area": "phoco",
    "rating": 4.9,
    "reviews": 2340,
    "price": "Miễn phí vé cổng (Thuyền hoa đăng 100k)",
    "priceNum": 0,
    "address": "Khuôn viên Núi Kỳ Lân, Phường Tân Thành, TP. Ninh Bình",
    "highlight": "Thắp sáng hàng ngàn chiếc đèn lồng lung linh rực rỡ, check-in Tháp Bạc soi bóng mặt hồ Kỳ Lân và ẩm thực đêm phố cổ",
    "image": "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&auto=format&fit=crop&q=80",
    "icon": "🏮",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Ph%E1%BB%91%20C%E1%BB%95%20Hoa%20L%C6%B0%2C%20Khu%C3%B4n%20vi%C3%AAn%20N%C3%BAi%20K%E1%BB%B3%20L%C3%A2n%2C%20Ph%C6%B0%E1%BB%9Dng%20T%C3%A2n%20Th%C3%A0nh%2C%20TP.%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Ph%E1%BB%91%20C%E1%BB%95%20Hoa%20L%C6%B0%2C%20Khu%C3%B4n%20vi%C3%AAn%20N%C3%BAi%20K%E1%BB%B3%20L%C3%A2n%2C%20Ph%C6%B0%E1%BB%9Dng%20T%C3%A2n%20Th%C3%A0nh%2C%20TP.%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 709,
    "name": "Tháp Bạc Kỳ Lân & Bến Thuyền Hoa Đăng Phố Cổ",
    "cat": "spot",
    "area": "phoco",
    "rating": 4.9,
    "reviews": 1450,
    "price": "100.000 đ/vé thuyền du ngoạn",
    "priceNum": 100000,
    "address": "Giữa lòng Hồ Kỳ Lân, Phường Tân Thành, TP. Ninh Bình",
    "highlight": "Bến thuyền du ngoạn ngắm cảnh hồ, thả đèn hoa đăng cầu bình an và chụp ảnh lung linh huyền ảo dưới chân Tháp Bạc",
    "image": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80",
    "icon": "🪔",
    "isFeatured": true,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=Th%C3%A1p%20B%E1%BA%A1c%20K%E1%BB%B3%20L%C3%A2n%20%26%20B%E1%BA%BFn%20Thuy%E1%BB%81n%20Hoa%20%C4%90%C4%83ng%20Ph%E1%BB%91%20C%E1%BB%95%2C%20Gi%E1%BB%AFa%20l%C3%B2ng%20H%E1%BB%93%20K%E1%BB%B3%20L%C3%A2n%2C%20Ph%C6%B0%E1%BB%9Dng%20T%C3%A2n%20Th%C3%A0nh%2C%20TP.%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=Th%C3%A1p%20B%E1%BA%A1c%20K%E1%BB%B3%20L%C3%A2n%20%26%20B%E1%BA%BFn%20Thuy%E1%BB%81n%20Hoa%20%C4%90%C4%83ng%20Ph%E1%BB%91%20C%E1%BB%95%2C%20Gi%E1%BB%AFa%20l%C3%B2ng%20H%E1%BB%93%20K%E1%BB%B3%20L%C3%A2n%2C%20Ph%C6%B0%E1%BB%9Dng%20T%C3%A2n%20Th%C3%A0nh%2C%20TP.%20Ninh%20B%C3%ACnh"
  },
  {
    "id": 708,
    "name": "Vườn Quốc Gia Cúc Phương — Rừng Nguyên Sinh",
    "cat": "spot",
    "area": "cucphuong",
    "rating": 4.9,
    "reviews": 2430,
    "price": "60.000 đ/vé người lớn",
    "priceNum": 60000,
    "address": "Huyện Nho Quan, Ninh Bình",
    "highlight": "Rừng mưa nhiệt đới nguyên sinh cổ thụ ngàn năm chò chỉ, mùa bươm bướm trắng bay rợp trời và không khí trong lành",
    "image": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=80",
    "icon": "🌲",
    "isFeatured": false,
    "mapShareLink": "https://www.google.com/maps/search/?api=1&query=V%C6%B0%E1%BB%9Dn%20Qu%E1%BB%91c%20Gia%20C%C3%BAc%20Ph%C6%B0%C6%A1ng%2C%20Huy%E1%BB%87n%20Nho%20Quan%2C%20Ninh%20B%C3%ACnh",
    "mapUrl": "https://www.google.com/maps/search/?api=1&query=V%C6%B0%E1%BB%9Dn%20Qu%E1%BB%91c%20Gia%20C%C3%BAc%20Ph%C6%B0%C6%A1ng%2C%20Huy%E1%BB%87n%20Nho%20Quan%2C%20Ninh%20B%C3%ACnh"
  }
];

/**
 * Chuẩn hóa và tạo Link Google Maps chính xác 100%
 * Tự động lọc bỏ các shortlink ảo lỗi Dynamic Link Not Found
 */
function getValidGoogleMapUrl(place, isDirection) {
  if (!place) return 'https://www.google.com/maps';
  
  const link = (place.mapShareLink || place.mapUrl || '').trim();
  
  // Kiểm tra xem link có phải là link ngắn giả mạo (maps.app.goo.gl/<tên_viết_tắt>) không
  // Link rút gọn thật của Google Maps luôn có chuỗi hash ngẫu nhiên (ví dụ https://maps.app.goo.gl/abc123xyz...)
  const isFakeShortLink = Boolean(link && link.includes('maps.app.goo.gl/') && (
    !/\d/.test(link.split('maps.app.goo.gl/')[1] || '') ||
    ['EmeraldaResortNB', 'HoaLuNinhBinh', 'TamCocNinhBinh', 'DeNuiHoaLu', 'RuouKimSon', 'NinhBinh', 'PhoCoHoaLu', 'CoDoHoaLu', 'DamVanLong', 'ChuaBaiDinhNB'].some(k => link.includes(k))
  ));

  // Nếu là link thật hợp lệ (không phải link giả)
  if (link && !isFakeShortLink && (link.startsWith('http://') || link.startsWith('https://'))) {
    return link;
  }

  // Tự động tạo link Google Maps Search / Directions chính xác theo tên và địa chỉ
  const cleanName = (place.name || '').replace(/\s*\([^)]*\)/g, '').replace(/\s*—.*$/, '').trim();
  const addr = (place.address || 'Ninh Bình').trim();
  let q = cleanName;
  if (!addr.toLowerCase().includes('ninh bình') && !addr.toLowerCase().includes('ninh binh')) {
    q += ', ' + addr + ', Ninh Bình';
  } else {
    q += ', ' + addr;
  }

  if (isDirection) {
    return 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(q);
  }
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
}

// Dọn dẹp cache localStorage cũ nếu còn sót link maps.app.goo.gl ảo
(function cleanupOldFakeMapLinks() {
  try {
    if (typeof localStorage === 'undefined') return;
    const rawStatus = localStorage.getItem('nb_places_status');
    if (rawStatus && rawStatus.includes('maps.app.goo.gl')) {
      const statuses = JSON.parse(rawStatus);
      let changed = false;
      Object.keys(statuses).forEach(k => {
        if (statuses[k].mapShareLink && statuses[k].mapShareLink.includes('maps.app.goo.gl')) {
          delete statuses[k].mapShareLink;
          delete statuses[k].mapUrl;
          changed = true;
        }
        if (statuses[k].image && statuses[k].image.includes('photo-1540541338287-41700207dee6')) {
          delete statuses[k].image;
          changed = true;
        }
      });
      if (changed) {
        localStorage.setItem('nb_places_status', JSON.stringify(statuses));
      }
    }
    const rawCustom = localStorage.getItem('nb_custom_places');
    if (rawCustom && rawCustom.includes('maps.app.goo.gl')) {
      const custom = JSON.parse(rawCustom);
      let changed = false;
      custom.forEach(p => {
        if (p.mapShareLink && p.mapShareLink.includes('maps.app.goo.gl')) {
          p.mapShareLink = getValidGoogleMapUrl(p);
          p.mapUrl = p.mapShareLink;
          changed = true;
        }
      });
      if (changed) {
        localStorage.setItem('nb_custom_places', JSON.stringify(custom));
      }
    }
  } catch(e) {}
})();

/**
 * CẤU HÌNH THÔNG TIN LIÊN HỆ & DỰ ÁN (SITE CONFIG)
 */
function getSiteConfig() {
  const defaultConfig = {
    hotline: "0866520567",
    hotlineDisplay: "0866.520.567",
    zaloLink: "https://zalo.me/0866520567",
    zaloGroup: "https://zalo.me/g/owbmlx898",
    facebookGroup: "https://web.facebook.com/groups/1418694386800078",
    facebookLink: "https://web.facebook.com/jaytran0522",
    projects: [
      { name: "quatanglocnam.com", desc: "Tổng thầu Thiết kế - Đúc - Thi công mỹ nghệ & quà tặng cao cấp", url: "https://quatanglocnam.com", image: "images/preview_quatanglocnam.png" },
      { name: "xteco.com.vn", desc: "Tổng thầu Thiết kế và Thi công trọn gói biệt thự, nhà phố, lâu đài cao cấp", url: "https://xteco.com.vn", image: "images/preview_xteco.png" }
    ]
  };
  try {
    const saved = localStorage.getItem('nb_site_config');
    if (saved) return { ...defaultConfig, ...JSON.parse(saved) };
  } catch(e) {}
  return defaultConfig;
}

function saveSiteConfig(cfg) {
  try {
    localStorage.setItem('nb_site_config', JSON.stringify(cfg));
  } catch(e) {}
}

/**
 * HỆ THỐNG QUẢN LÝ TRẠNG THÁI (Active, Featured, Deleted, Custom Edits)
 * Lưu vào localStorage: 'nb_places_status'
 */
function getStoredPlaceStatuses() {
  try {
    return JSON.parse(localStorage.getItem('nb_places_status') || '{}');
  } catch(e) {
    return {};
  }
}

function updateStoredPlaceStatus(id, updates) {
  const statuses = getStoredPlaceStatuses();
  statuses[id] = { ...(statuses[id] || {}), ...updates };
  try {
    localStorage.setItem('nb_places_status', JSON.stringify(statuses));
  } catch(e) {}
  return statuses[id];
}

/**
 * Lấy toàn bộ danh sách hợp nhất (Default + Custom từ Admin)
 * có kèm trạng thái: isDeleted, isHidden, isFeatured và dữ liệu đã chỉnh sửa
 */
function getCombinedPlacesList() {
  const statuses = getStoredPlaceStatuses();
  let customPlaces = [];
  try {
    customPlaces = JSON.parse(localStorage.getItem('nb_custom_places') || '[]');
  } catch(e) {
    customPlaces = [];
  }

  // Gộp danh sách
  const all = [...customPlaces, ...NINHBINH_DEFAULT_PLACES];

  const mapById = new Map();
  all.forEach(item => {
    if (!mapById.has(item.id)) {
      const st = statuses[item.id] || {};
      const validMapLink = getValidGoogleMapUrl({
        name: st.name || item.name,
        address: st.address || item.address,
        mapShareLink: st.mapShareLink || item.mapShareLink,
        mapUrl: st.mapUrl || item.mapUrl
      });
      mapById.set(item.id, {
        ...item,
        // Hỗ trợ ghi đè khi admin chỉnh sửa
        name: st.name || item.name,
        price: st.price || item.price,
        priceNum: st.priceNum || item.priceNum,
        image: st.image || item.image,
        mapShareLink: validMapLink,
        mapUrl: validMapLink,
        unit: st.unit || item.unit,
        address: st.address || item.address,
        highlight: st.highlight || item.highlight,
        isDeleted: Boolean(st.isDeleted),
        isHidden: Boolean(st.isHidden),
        isFeatured: st.isFeatured !== undefined ? Boolean(st.isFeatured) : Boolean(item.isFeatured)
      });
    }
  });

  return Array.from(mapById.values());
}

/**
 * Lấy danh sách đang HOẠT ĐỘNG trên Web chính
 * (loại bỏ isDeleted và isHidden)
 */
function getActiveWebPlaces() {
  return getCombinedPlacesList()
    .filter(p => !p.isDeleted && !p.isHidden)
    .sort((a, b) => {
      // Ưu tiên các mục được Admin ĐỀ XUẤT lên trên đầu
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
}

// Attach globally
if (typeof window !== 'undefined') {
  window.NINHBINH_DEFAULT_PLACES = NINHBINH_DEFAULT_PLACES;
  window.getValidGoogleMapUrl = getValidGoogleMapUrl;
  window.getSiteConfig = getSiteConfig;
  window.saveSiteConfig = saveSiteConfig;
  window.getStoredPlaceStatuses = getStoredPlaceStatuses;
  window.updateStoredPlaceStatus = updateStoredPlaceStatus;
  window.getCombinedPlacesList = getCombinedPlacesList;
  window.getActiveWebPlaces = getActiveWebPlaces;
}
if (typeof globalThis !== 'undefined') {
  globalThis.NINHBINH_DEFAULT_PLACES = NINHBINH_DEFAULT_PLACES;
  globalThis.getValidGoogleMapUrl = getValidGoogleMapUrl;
  globalThis.getSiteConfig = getSiteConfig;
  globalThis.saveSiteConfig = saveSiteConfig;
  globalThis.getStoredPlaceStatuses = getStoredPlaceStatuses;
  globalThis.updateStoredPlaceStatus = updateStoredPlaceStatus;
  globalThis.getCombinedPlacesList = getCombinedPlacesList;
  globalThis.getActiveWebPlaces = getActiveWebPlaces;
}

// Tự động dọn sạch dữ liệu mock doanh thu & khách hàng cũ trong localStorage của trình duyệt
(function purgeLegacyMockData() {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    const RESET_KEY = 'nb_reset_revenue_customers_v1';
    if (localStorage.getItem(RESET_KEY) !== 'true') {
      localStorage.removeItem('nb_all_users');
      localStorage.removeItem('nb_requests');
      localStorage.removeItem('nb_service_leads');
      localStorage.removeItem('nb_specialty_orders');
      localStorage.removeItem('nb_cashbook_data');
      localStorage.setItem('nb_all_users', JSON.stringify([]));
      localStorage.setItem('nb_requests', JSON.stringify([]));
      localStorage.setItem('nb_service_leads', JSON.stringify([]));
      localStorage.setItem('nb_specialty_orders', JSON.stringify([]));
      localStorage.setItem('nb_cashbook_data', JSON.stringify([]));
      localStorage.setItem(RESET_KEY, 'true');
    }
  } catch (e) {
    // ignore
  }
})();
