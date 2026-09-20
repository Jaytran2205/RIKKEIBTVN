
function handleDrivingImageError(imgEl, qId) {
  if (!imgEl.dataset.retryCount) {
    imgEl.dataset.retryCount = '1';
    setTimeout(() => {
      imgEl.src = './images/driving/cau_' + qId + '.png?v=' + Date.now();
    }, 400);
  } else if (imgEl.dataset.retryCount === '1') {
    imgEl.dataset.retryCount = '2';
    setTimeout(() => {
      imgEl.src = '../images/driving/cau_' + qId + '.png?v=' + Date.now();
    }, 400);
  }
}


// =========================================================================
// BỘ ĐỀ THI & DỮ LIỆU ÔN THI BẰNG LÁI XE 2026 (LUẬT MỚI & 600 CÂU HỎI GPLX)
// =========================================================================

const DRIVING_DATA_2026 = {
  // 1. Dữ liệu tra cứu loại xe -> hạng bằng
  vehicleTypes: {
    "moto_125": {
      name: "Xe máy đến 125cc",
      badge: "PHỔ BIẾN NHẤT",
      recommend: "Nên học bằng A1",
      desc: "Theo Luật Trật tự ATGT đường bộ mới 2026: Xe mô tô hai bánh có dung tích xi-lanh đến 125 cm³ hoặc xe mô tô điện có công suất động cơ điện đến 11 kW thuộc phân hạng A1.",
      route: "thi-a1",
      routeName: "Lộ trình A1 →"
    },
    "moto_above125": {
      name: "Xe máy trên 125cc",
      badge: "PHÂN KHỐI LỚN",
      recommend: "Nên học bằng A",
      desc: "Xe mô tô hai bánh có dung tích xi-lanh trên 125 cm³ hoặc động cơ điện trên 11 kW (và được lái toàn bộ các loại xe quy định cho bằng A1) thuộc phân hạng A.",
      route: "thi-a",
      routeName: "Lộ trình A →"
    },
    "car_small": {
      name: "Ô tô con, tải nhỏ",
      badge: "Ô TÔ CÁ NHÂN",
      recommend: "Nên học bằng B",
      desc: "Ô tô chở người đến 8 chỗ (không kể chỗ của người lái xe); ô tô tải và ô tô chuyên dùng có khối lượng toàn bộ theo thiết kế đến 3.500 kg.",
      route: "thi-b",
      routeName: "Lộ trình B →"
    },
    "truck_mid": {
      name: "Xe tải 3,5 - 7,5 tấn",
      badge: "XE TẢI VỪA",
      recommend: "Nên học bằng C1",
      desc: "Ô tô tải và ô tô chuyên dùng có khối lượng toàn bộ theo thiết kế trên 3.500 kg đến 7.500 kg (bao gồm cả các loại xe quy định cho giấy phép lái xe hạng B).",
      route: "thi-b",
      routeName: "Lộ trình C1 →"
    },
    "truck_heavy": {
      name: "Xe tải trên 7,5 tấn",
      badge: "XE TẢI NẶNG",
      recommend: "Nên học bằng C",
      desc: "Ô tô tải và ô tô chuyên dùng có khối lượng toàn bộ theo thiết kế trên 7.500 kg; các loại ô tô tải kéo rơ moóc đến 750 kg và xe hạng B, C1.",
      route: "thi-c",
      routeName: "Lộ trình C →"
    }
  },

  // 2. Dữ liệu độ tuổi học hạng bằng
  ageRules: {
    "under_18": {
      title: "Dưới 18 tuổi",
      badge: "CHƯA ĐỦ TUỔI GPLX",
      recommend: "Chỉ được lái xe dưới 50cc",
      desc: "Người đủ 16 tuổi trở lên được lái xe gắn máy có dung tích xi-lanh dưới 50 cm³ hoặc xe máy điện dưới 4 kW (không cần bằng lái). Chưa đủ tuổi thi bằng A1, A, B, C.",
      actionText: "Xem quy định xe 50cc →"
    },
    "from_18": {
      title: "Từ 18 tuổi",
      badge: "GỢI Ý PHỔ BIẾN",
      recommend: "Có thể học A1, A, B, C1",
      desc: "Đây là độ tuổi bắt đầu nhu cầu thi bằng lái xe máy và ô tô cá nhân nhiều nhất. Nếu đi xe máy phổ thông, bạn hãy bắt đầu ngay bằng hạng A1 hoặc ô tô hạng B.",
      actionText: "Bắt đầu lộ trình →"
    },
    "from_21": {
      title: "Từ 21 tuổi",
      badge: "ĐỦ ĐIỀU KIỆN MỌI HẠNG XE TẢI",
      recommend: "Có thể học A1, A, B, C1, C, FB...",
      desc: "Người đủ 21 tuổi trở lên đủ điều kiện dự thi bằng lái xe tải hạng C, kéo rơ moóc và nâng hạng bằng lái xe chuyên nghiệp.",
      actionText: "Lộ trình học hạng C →"
    }
  },

  // 3. Bảng các hạng bằng lái xe 2026
  licenseTable: [
    { rank: "A1", canDrive: "Xe mô tô hai bánh đến 125 cm³ hoặc xe điện đến 11 kW", age: "Từ 18 tuổi", expiry: "Không thời hạn", target: "thi-a1" },
    { rank: "A", canDrive: "Xe mô tô hai bánh trên 125 cm³ hoặc trên 11 kW, gồm cả nhóm A1", age: "Từ 18 tuổi", expiry: "Không thời hạn", target: "thi-a" },
    { rank: "B", canDrive: "Ô tô con đến 8 chỗ và xe tải/chuyên dùng đến 3.500 kg", age: "Từ 18 tuổi", expiry: "10 năm", target: "thi-b" },
    { rank: "C1", canDrive: "Xe tải/chuyên dùng trên 3.500 kg đến 7.500 kg", age: "Từ 18 tuổi", expiry: "10 năm", target: "thi-b" },
    { rank: "C", canDrive: "Xe tải/chuyên dùng trên 7.500 kg và các xe thuộc nhóm B, C1", age: "Từ 21 tuổi", expiry: "5 năm", target: "thi-c" }
  ],

  // 4. Ngân hàng câu hỏi A1 (250 câu chuẩn Bộ Công An)
  examA1Questions: [
  {
    "id": 1,
    "chapter": 1,
    "question": "Phần của đường bộ được sử dụng cho phương tiện giao thông đường bộ đi lại là gì?",
    "options": [
      "1. Phần mặt đường và lề đường.",
      "2. Phần đường xe chạy.",
      "3. Phần đường xe cơ giới."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 2,
    "chapter": 1,
    "question": "Làn đường là gì?",
    "options": [
      "1. Là một phần của phần đường xe chạy được chia theo chiều dọc của đường, sử dụng cho xe chạy.",
      "2. Là một phần của phần đường xe chạy được chia theo chiều dọc của đường, có đủ chiều rộng cho xe chạy an toàn.",
      "3. Là đường cho xe ô tô chạy, dừng, đỗ an toàn."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 3,
    "chapter": 1,
    "question": "Khổ giới hạn của đường bộ được hiểu như thế nào là đúng?",
    "options": [
      "1. Khổ giới hạn của đường bộ là khoảng trống có kích thước giới hạn về chiều rộng, chiều cao của đường bộ để các xe, bao gồm cả hàng hoá xếp trên xe đi qua được an toàn và được xác định theo quy chuẩn, tiêu chuẩn kỹ thuật của đường bộ.",
      "2. Là khoảng trống có kích thước giới hạn về chiều rộng của đường, cầu, bến phà, hầm trên đường bộ để các xe kể cả hàng hóa xếp trên xe đi qua được an toàn.",
      "3. Là khoảng trống có kích thước giới hạn về chiều cao của cầu, bến phà, hầm trên đường bộ để các xe đi qua được an toàn."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 4,
    "chapter": 1,
    "question": "Dải phân cách được lắp đặt để làm gì?",
    "options": [
      "1. Để phân chia các làn đường dành cho xe cơ giới và xe thô sơ trên đường cao tốc.",
      "2. Để phân chia phần đường xe chạy thành hai chiều riêng biệt hoặc để phân chia phần đường dành cho xe cơ giới và xe thô sơ hoặc của nhiều loại xe khác nhau trên cùng một chiều đường.",
      "3. Để phân tách phần đường xe chạy và hành lang an toàn giao thông."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 5,
    "chapter": 1,
    "question": "Vạch kẻ đường là gì?",
    "options": [
      "1. Là báo hiệu đường bộ để hỗ trợ cảnh báo nguy hiểm cho người tham gia giao thông đường bộ.",
      "2. Là vạch chỉ sự phân chia làn đường, vị trí hoặc hướng đi, vị trí dừng lại.",
      "3. Là báo hiệu cho người tham gia giao thông đường bộ về các thông tin của đường bộ.",
      "4. Cả ba ý trên."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 6,
    "chapter": 1,
    "question": "Người điều khiển phương tiện tham gia giao thông đường bộ được hiểu như thế nào là đúng?",
    "options": [
      "1. Là người điều khiển xe cơ giới, người điều khiển xe thô sơ, người điều khiển xe máy chuyên dùng.",
      "2. Là người được giao nhiệm vụ hướng dẫn giao thông trên đường bộ.",
      "3. Cả hai ý trên."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 7,
    "chapter": 1,
    "question": "Người lái xe được hiểu như thế nào là đúng?",
    "options": [
      "1. Là người điều khiển xe cơ giới.",
      "2. Là người điều khiển xe thô sơ.",
      "3. Là người điều khiển xe máy chuyên dùng."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 8,
    "chapter": 1,
    "question": "Trong nhóm các phương tiện giao thông đường bộ dưới đây, nhóm phương tiện nào là xe cơ giới?",
    "options": [
      "1. Xe ô tô; máy kéo; xe mô tô hai bánh; xe mô tô ba bánh; xe gắn máy; xe cơ giới dùng cho người khuyết tật và xe máy chuyên dùng; xe đạp, xe đạp máy, xe đạp điện.",
      "2. Xe ô tô; rơ moóc được kéo bởi xe ô tô; sơ mi rơ moóc được kéo bởi ô tô đầu kéo; xe chở người bốn bánh có gắn động cơ; xe chở hàng bốn bánh có gắn động cơ; xe mô tô, xe gắn máy và các loại xe tương tự."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 9,
    "chapter": 1,
    "question": "Trong nhóm các phương tiện giao thông đường bộ dưới đây, nhóm phương tiện nào là xe thô sơ?",
    "options": [
      "1. Xe đạp, xe đạp máy, xe đạp điện; xe xích lô; xe lăn dùng cho người khuyết tật; xe vật nuôi kéo và các loại xe tương tự.",
      "2. Xe đạp (kể cả xe đạp máy, xe đạp điện), xe gắn máy, xe cơ giới dùng cho người khuyết tật và xe máy chuyên dùng.",
      "3. Xe ô tô, máy kéo, rơ moóc hoặc sơ mi rơ moóc được kéo bởi xe ô tô, máy kéo."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 10,
    "chapter": 1,
    "question": "Phương tiện giao thông đường bộ gồm những loại nào?",
    "options": [
      "1. Phương tiện giao thông cơ giới đường bộ.",
      "2. Phương tiện giao thông thô sơ đường bộ, xe máy chuyên dùng và các loại xe tương tự.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 11,
    "chapter": 1,
    "question": "Người tham gia giao thông đường bộ gồm những đối tượng nào?",
    "options": [
      "1. Người điều khiển, người được chở trên phương tiện tham gia giao thông đường bộ.",
      "2. Người điều khiển, dẫn dắt vật nuôi trên đường bộ; người đi bộ trên đường bộ.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 12,
    "chapter": 1,
    "question": "Người điều khiển phương tiện tham gia giao thông đường bộ gồm những đối tượng nào dưới đây?",
    "options": [
      "1. Người điều khiển xe cơ giới, người điều khiển xe thô sơ.",
      "2. Người điều khiển xe máy chuyên dùng.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 13,
    "chapter": 1,
    "question": "Người điều khiển giao thông đường bộ được hiểu như thế nào là đúng?",
    "options": [
      "1. Là người điều khiển phương tiện tham gia giao thông đường bộ.",
      "2. Là Cảnh sát giao thông và người được giao nhiệm vụ hướng dẫn giao thông trên đường bộ.",
      "3. Là người tham gia giao thông đường bộ."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 14,
    "chapter": 1,
    "question": "Hành vi nào dưới đây bị nghiêm cấm?",
    "options": [
      "1. Sử dụng xe đạp đi trên các tuyến quốc lộ.",
      "2. Rải vật sắc nhọn, đổ chất gây trơn trượt trên đường bộ.",
      "3. Cả hai ý trên."
    ],
    "answer": 2,
    "isParalyzed": true,
    "explain": "CÂU ĐIỂM LIỆT: Hành vi bị nghiêm cấm theo Luật Trật tự ATGT đường bộ. Thí sinh tuyệt đối không được làm sai câu này!",
    "image": null
  },
  {
    "id": 15,
    "chapter": 1,
    "question": "Hành vi đưa xe cơ giới, xe máy chuyên dùng tham gia giao thông đường bộ nào dưới đây bị cấm?",
    "options": [
      "1. Không có chứng nhận kiểm định an toàn kỹ thuật và bảo vệ môi trường.",
      "2. Hết niên hạn sử dụng.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": true,
    "explain": "CÂU ĐIỂM LIỆT: Hành vi bị nghiêm cấm theo Luật Trật tự ATGT đường bộ. Thí sinh tuyệt đối không được làm sai câu này!",
    "image": null
  },
  {
    "id": 16,
    "chapter": 1,
    "question": "Tổ chức đua xe được phép thực hiện khi nào?",
    "options": [
      "1. Trên đường phố không có người qua lại.",
      "2. Được người dân ủng hộ.",
      "3. Được cơ quan có thẩm quyền cấp phép."
    ],
    "answer": 3,
    "isParalyzed": true,
    "explain": "CÂU ĐIỂM LIỆT: Hành vi bị nghiêm cấm theo Luật Trật tự ATGT đường bộ. Thí sinh tuyệt đối không được làm sai câu này!",
    "image": null
  },
  {
    "id": 17,
    "chapter": 1,
    "question": "Hành vi đua xe trái phép bị xử lý như thế nào?",
    "options": [
      "1. Chỉ bị nhắc nhở.",
      "2. Tùy theo mức độ của hành vi vi phạm có thể bị xử lý hành chính hoặc xử lý hình sự."
    ],
    "answer": 2,
    "isParalyzed": true,
    "explain": "CÂU ĐIỂM LIỆT: Hành vi bị nghiêm cấm theo Luật Trật tự ATGT đường bộ. Thí sinh tuyệt đối không được làm sai câu này!",
    "image": null
  },
  {
    "id": 18,
    "chapter": 1,
    "question": "Người điều khiển phương tiện tham gia giao thông đường bộ mà trong máu hoặc hơi thở có nồng độ cồn có bị nghiêm cấm không?",
    "options": [
      "1. Bị nghiêm cấm.",
      "2. Không bị nghiêm cấm.",
      "3. Không bị nghiêm cấm, nếu nồng độ cồn trong máu ở mức nhẹ, có thể điều khiển phương tiện tham gia giao thông."
    ],
    "answer": 1,
    "isParalyzed": true,
    "explain": "CÂU ĐIỂM LIỆT: Hành vi bị nghiêm cấm theo Luật Trật tự ATGT đường bộ. Thí sinh tuyệt đối không được làm sai câu này!",
    "image": null
  },
  {
    "id": 19,
    "chapter": 1,
    "question": "Theo Luật Phòng chống tác hại của rượu, bia, đối tượng nào dưới đây bị cấm sử dụng rượu, bia khi tham gia giao thông?",
    "options": [
      "1. Người điều khiển xe ô tô, xe mô tô, xe đạp, xe gắn máy.",
      "2. Người được chở trên xe cơ giới.",
      "3. Cả hai ý trên."
    ],
    "answer": 1,
    "isParalyzed": true,
    "explain": "CÂU ĐIỂM LIỆT: Hành vi bị nghiêm cấm theo Luật Trật tự ATGT đường bộ. Thí sinh tuyệt đối không được làm sai câu này!",
    "image": null
  },
  {
    "id": 20,
    "chapter": 1,
    "question": "Hành vi giao xe ô tô, mô tô cho người nào sau đây tham gia giao thông đường bộ bị nghiêm cấm?",
    "options": [
      "1. Người chưa đủ tuổi theo quy định.",
      "2. Người không có giấy phép lái xe.",
      "3. Người có giấy phép lái xe nhưng đã bị trừ hết 12 điểm.",
      "4. Cả ba ý trên."
    ],
    "answer": 4,
    "isParalyzed": true,
    "explain": "CÂU ĐIỂM LIỆT: Hành vi bị nghiêm cấm theo Luật Trật tự ATGT đường bộ. Thí sinh tuyệt đối không được làm sai câu này!",
    "image": null
  },
  {
    "id": 21,
    "chapter": 1,
    "question": "Hành vi nào sau đây bị nghiêm cấm?",
    "options": [
      "1. Điều khiển xe cơ giới lạng lách, đánh võng, rú ga liên tục khi tham gia giao thông trên đường.",
      "2. Xúc phạm, đe dọa, cản trở, chống đối hoặc không chấp hành hiệu lệnh, hướng dẫn, yêu cầu kiểm tra, kiểm soát của người thi hành công vụ về bảo đảm trật tự, an toàn giao thông đường bộ.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": true,
    "explain": "CÂU ĐIỂM LIỆT: Hành vi bị nghiêm cấm theo Luật Trật tự ATGT đường bộ. Thí sinh tuyệt đối không được làm sai câu này!",
    "image": null
  },
  {
    "id": 22,
    "chapter": 1,
    "question": "Các hành vi nào sau đây bị cấm đối với phương tiện tham gia giao thông đường bộ?",
    "options": [
      "1. Cải tạo xe ô tô loại khác thành xe ô tô chở người phục vụ mục đích quốc phòng, an ninh.",
      "2. Cải tạo trái phép; cố ý can thiệp làm sai lệch chỉ số trên đồng hồ báo quãng đường đã chạy của xe ô tô; cắt, hàn, tẩy xóa, đục sửa, đóng lại trái phép số khung, số động cơ của xe cơ giới, xe máy chuyên dùng."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 23,
    "chapter": 1,
    "question": "Hành vi nào sau đây bị cấm?",
    "options": [
      "1. Lắp đặt, sử dụng thiết bị âm thanh, ánh sáng trên xe cơ giới, xe máy chuyên dùng gây mất trật tự, an toàn giao thông đường bộ.",
      "2. Cản trở người, phương tiện tham gia giao thông trên đường bộ; ném gạch, đất, đá, cát hoặc vật thể khác vào người, phương tiện đang tham gia giao thông trên đường bộ.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": true,
    "explain": "CÂU ĐIỂM LIỆT: Hành vi bị nghiêm cấm theo Luật Trật tự ATGT đường bộ. Thí sinh tuyệt đối không được làm sai câu này!",
    "image": null
  },
  {
    "id": 24,
    "chapter": 1,
    "question": "Việc sản xuất, sử dụng, mua, bán trái phép biển số xe có bị nghiêm cấm hay không?",
    "options": [
      "1. Không bị nghiêm cấm.",
      "2. Bị nghiêm cấm.",
      "3. Bị nghiêm cấm tuỳ trường hợp."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 25,
    "chapter": 1,
    "question": "Khi điều khiển phương tiện tham gia giao thông, những hành vi nào dưới đây bị nghiêm cấm?",
    "options": [
      "1. Thay đổi tốc độ của xe nhiều lần.",
      "2. Điều khiển phương tiện sau 23 giờ trong ngày.",
      "3. Lạng lách, đánh võng, rú ga liên tục."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 26,
    "chapter": 1,
    "question": "Có bao nhiêu nhóm biển báo hiệu đường bộ?",
    "options": [
      "1. Ba nhóm: Biển báo cấm, biển báo nguy hiểm và biển hiệu lệnh.",
      "2. Bốn nhóm: Biển báo cấm, biển báo nguy hiểm, biển hiệu lệnh và biển phụ.",
      "3. Năm nhóm: Biển báo cấm, biển báo nguy hiểm, biển hiệu lệnh, biển chỉ dẫn, biển phụ."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 27,
    "chapter": 1,
    "question": "Tại nơi có vạch kẻ đường hoặc tại nơi mà người đi bộ, xe lăn của người khuyết tật đang qua đường, người điều khiển phương tiện tham gia giao thông phải thực hiện như thế nào?",
    "options": [
      "1. Giảm tốc độ và nhường đường cho người đi bộ, xe lăn của người khuyết tật qua đường đảm bảo an toàn.",
      "2. Quan sát, giảm tốc độ hoặc dừng lại để bảo đảm an toàn cho người đi bộ, xe lăn của người khuyết tật qua đường.",
      "3. Quan sát, tăng tốc độ và điều khiển phương tiện nhanh chóng đi qua."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 28,
    "chapter": 1,
    "question": "Người điều khiển xe mô tô phải phải quan sát, giảm tốc độ hoặc dừng lại để bảo đảm an toàn trong các trường hợp nào dưới đây?",
    "options": [
      "1. Đường hẹp, đường vòng, đường quanh co, đường đèo, dốc.",
      "2. Nơi cầu, cống hẹp, đập tràn, đường ngầm, hầm chui, hầm đường bộ.",
      "3. Trời mưa, gió, sương, khói, bụi, mặt đường trơn trượt, lầy lội, có nhiều đất đá, vật liệu rơi vãi ảnh hưởng đến an toàn giao thông đường bộ.",
      "4. Cả ba ý trên."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 4. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 29,
    "chapter": 1,
    "question": "Khi gặp hiệu lệnh điều khiển của Cảnh sát giao thông như hình dưới đây thì người tham gia giao thông đường bộ phải đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Người tham gia giao thông đường bộ ở các hướng phải dừng lại.",
      "2. Người tham gia giao thông đường bộ ở các hướng được đi theo chiều gậy chỉ của Cảnh sát giao thông.",
      "3. Người tham gia giao thông đường bộ ở phía trước và phía sau người điều khiển được đi tất cả các hướng; người tham gia giao thông đường bộ ở phía bên phải và phía bên trái người điều khiển phải dừng lại.",
      "4. Người tham gia giao thông đường bộ ở phía trước và phía sau người điều khiển phải dừng lại; người tham gia giao thông đường bộ ở phía bên phải và phía bên trái người điều khiển được đi tất cả các hướng."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 4. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": "images/driving/cau_29.png"
  },
  {
    "id": 30,
    "chapter": 1,
    "question": "Khi gặp hiệu lệnh điều khiển của Cảnh sát giao thông như hình dưới đây thì người tham gia giao thông đường bộ phải đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Người tham gia giao thông đường bộ ở phía sau Cảnh sát giao thông được đi, các hướng khác phải dừng lại.",
      "2. Người tham gia giao thông đường bộ được rẽ phải theo chiều mũi tên màu xanh ở bục Cảnh sát giao thông.",
      "3. Người tham gia giao thông đường bộ ở tất cả các hướng phải dừng lại, trừ các xe đã ở trong khu vực giao nhau.",
      "4. Người tham gia giao thông đường bộ ở phía trước Cảnh sát giao thông phải dừng lại, các hướng khác được đi."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": "images/driving/cau_30.png"
  },
  {
    "id": 31,
    "chapter": 1,
    "question": "Khi hiệu lệnh của người điều khiển giao thông trái với tín hiệu đèn giao thông hoặc biển báo hiệu đường bộ thì người tham gia giao thông đường bộ phải chấp hành báo hiệu đường bộ nào dưới đây?",
    "options": [
      "1. Theo hiệu lệnh của người điều khiển giao thông.",
      "2. Theo tín hiệu đèn giao thông.",
      "3. Theo biển báo hiệu đường bộ."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 32,
    "chapter": 1,
    "question": "Khi ở một vị trí vừa có biển báo hiệu đặt cố định vừa có biển báo hiệu tạm thời mà hai biển có ý nghĩa khác nhau, người tham gia giao thông đường bộ phải chấp hành hiệu lệnh của biển báo hiệu nào?",
    "options": [
      "1. Biển báo hiệu đặt cố định.",
      "2. Biển báo hiệu tạm thời.",
      "3. Theo quyết định của người tham gia giao thông nhưng phải bảo đảm an toàn."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 33,
    "chapter": 1,
    "question": "Tại nơi đường giao nhau, khi đèn điều khiển giao thông có tín hiệu màu vàng, người điều khiển phương tiện tham gia giao thông phải chấp hành như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Dừng lại trước vạch dừng; trường hợp đang đi trên vạch dừng hoặc đã đi qua vạch dừng mà tín hiệu đèn màu vàng thì được đi tiếp; trường hợp tín hiệu đèn màu vàng nhấp nháy, người điều khiển phương tiện tham gia giao thông đường bộ được đi nhưng phải quan sát, giảm tốc độ hoặc dừng lại nhường đường cho người đi bộ, xe lăn của người khuyết tật qua đường hoặc các phương tiện khác.",
      "2. Tăng tốc độ nhanh chóng vượt qua nút giao.",
      "3. Quan sát, giảm tốc độ, từ từ vượt qua nút giao."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 34,
    "chapter": 1,
    "question": "Người lái xe trên đường cần chấp hành quy định về tốc độ tối đa như thế nào?",
    "options": [
      "1. Chỉ lớn hơn tốc độ tối đa cho phép khi đường vắng.",
      "2. Chỉ lớn hơn tốc độ tối đa cho phép khi vào ban đêm.",
      "3. Không vượt quá tốc độ tối đa cho phép."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 35,
    "chapter": 1,
    "question": "Phương tiện tham gia giao thông đường bộ di chuyển với tốc độ thấp hơn phải đi như thế nào?",
    "options": [
      "1. Đi về bên trái theo chiều đi của mình.",
      "2. Đi về bên phải theo chiều đi của mình.",
      "3. Đi ở bất cứ bên nào nhưng phải bấm đèn cảnh báo nguy hiểm để báo hiệu cho các phương tiện khác."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 36,
    "chapter": 1,
    "question": "Trên một chiều đường có vạch kẻ phân làn đường, người lái xe cơ giới, xe máy chuyên dùng phải điều khiển xe đi trên làn đường nào?",
    "options": [
      "1. Đi trên làn đường bên phải trong cùng.",
      "2. Đi trên làn đường bên trái.",
      "3. Đi ở bất cứ làn nào nhưng phải bảo đảm tốc độ cho phép."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 37,
    "chapter": 1,
    "question": "Người lái xe phải giảm tốc độ, có tín hiệu rẽ phải và đi sát về bên phải của phần đường xe chạy trong các trường hợp nào dưới đây?",
    "options": [
      "1. Khi xe chạy phía trước có tín hiệu vượt xe khác.",
      "2. Khi phía trước có xe chạy ngược chiều.",
      "3. Khi xe sau xin vượt nếu đủ điều kiện an toàn.",
      "4. Khi xe sau có tín hiệu vượt bên phải."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 38,
    "chapter": 1,
    "question": "Vượt xe là gì?",
    "options": [
      "1. Là tình huống giao thông trên đường mà mỗi chiều đường xe chạy chỉ có một làn đường dành cho xe cơ giới, xe đi phía sau di chuyển sang bên trái để di chuyển lên trước xe phía trước.",
      "2. Là tình huống giao thông trên đường có từ hai làn đường dành cho xe cơ giới cùng chiều trở lên được phân biệt bằng vạch kẻ đường, xe đi phía sau di chuyển lên trước xe phía trước theo quy tắc sử dụng làn đường."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 39,
    "chapter": 1,
    "question": "Người lái xe được phép vượt xe trên cầu hẹp có một làn đường, đường cong có tầm nhìn bị hạn chế hay không?",
    "options": [
      "1. Được phép vượt khi đường vắng.",
      "2. Không được phép vượt.",
      "3. Được phép vượt khi có việc gấp."
    ],
    "answer": 2,
    "isParalyzed": true,
    "explain": "CÂU ĐIỂM LIỆT: Hành vi bị nghiêm cấm theo Luật Trật tự ATGT đường bộ. Thí sinh tuyệt đối không được làm sai câu này!",
    "image": null
  },
  {
    "id": 40,
    "chapter": 1,
    "question": "Muốn vượt xe phía trước, người lái xe mô tô phải có tín hiệu như thế nào dưới đây để bảo đảm an toàn?",
    "options": [
      "1. Bấm còi liên tục để xe phía trước biết xe mình xin vượt.",
      "2. Rú ga liên tục để xe phía trước biết xe mình xin vượt.",
      "3. Báo hiệu nhấp nháy bằng đèn chiếu sáng phía trước hoặc còi."
    ],
    "answer": 3,
    "isParalyzed": true,
    "explain": "CÂU ĐIỂM LIỆT: Hành vi bị nghiêm cấm theo Luật Trật tự ATGT đường bộ. Thí sinh tuyệt đối không được làm sai câu này!",
    "image": null
  },
  {
    "id": 41,
    "chapter": 1,
    "question": "Khi lái xe trong khu đông dân cư, khu vực cơ sở khám bệnh, chữa bệnh trừ các khu vực có biển cấm sử dụng còi, người lái xe được sử dụng còi trong thời gian nào?",
    "options": [
      "1. Từ 22 giờ ngày hôm trước đến 05 giờ ngày hôm sau.",
      "2. Từ 05 giờ đến 22 giờ.",
      "3. Từ 23 giờ ngày hôm trước đến 05 giờ sáng hôm sau."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 42,
    "chapter": 1,
    "question": "Người lái xe sử dụng đèn như thế nào khi đi trên các đoạn đường qua khu đông dân cư có hệ thống chiếu sáng đang hoạt động?",
    "options": [
      "1. Chỉ bật đèn chiếu xa (đèn pha).",
      "2. Bật đèn chiếu xa (đèn pha) khi đường vắng, bật đèn chiếu gần (đèn cốt) khi có xe đi ngược chiều.",
      "3. Chỉ bật đèn chiếu gần (đèn cốt)."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 43,
    "chapter": 1,
    "question": "Khi điều khiển phương tiện tham gia giao thông, hành vi nào sau đây bị cấm?",
    "options": [
      "1. Dùng tay cầm và sử dụng điện thoại hoặc thiết bị điện tử khác.",
      "2. Chỉ được chở người trên thùng xe ô tô chở hàng trong trường hợp chở người đi làm nhiệm vụ cứu nạn, cứu hộ, phòng, chống thiên tai, dịch bệnh hoặc thực hiện nhiệm vụ khẩn cấp."
    ],
    "answer": 1,
    "isParalyzed": true,
    "explain": "CÂU ĐIỂM LIỆT: Hành vi bị nghiêm cấm theo Luật Trật tự ATGT đường bộ. Thí sinh tuyệt đối không được làm sai câu này!",
    "image": null
  },
  {
    "id": 44,
    "chapter": 1,
    "question": "Người lái xe không được vượt xe khác khi gặp trường hợp nào dưới đây?",
    "options": [
      "1. Trên cầu hẹp có một làn đường; nơi đường giao nhau, đường bộ giao nhau cùng mức với đường sắt; khi gặp xe ưu tiên.",
      "2. Trên cầu có từ 02 làn xe trở lên.",
      "3. Trên đường có 02 làn đường được phân chia làn bằng vạch kẻ nét đứt."
    ],
    "answer": 1,
    "isParalyzed": true,
    "explain": "CÂU ĐIỂM LIỆT: Hành vi bị nghiêm cấm theo Luật Trật tự ATGT đường bộ. Thí sinh tuyệt đối không được làm sai câu này!",
    "image": null
  },
  {
    "id": 45,
    "chapter": 1,
    "question": "Nơi nào cấm quay đầu xe?",
    "options": [
      "1. Ở phần đường dành cho người đi bộ qua đường, trên cầu, đầu cầu, gầm cầu vượt, ngầm.",
      "2. Tại nơi đường bộ giao nhau cùng mức với đường sắt, đường hẹp, đường dốc, đoạn đường cong tầm nhìn bị che khuất, trên đường cao tốc, trong hầm đường bộ, trên đường một chiều.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 46,
    "chapter": 1,
    "question": "Trước khi cho xe chuyển hướng, người lái xe phải làm gì để bảo đảm an toàn giao thông?",
    "options": [
      "1. Phải quan sát, bảo đảm khoảng cách an toàn với xe phía sau.",
      "2. Giảm tốc độ và có tín hiệu báo hướng rẽ.",
      "3. Chuyển dần sang làn gần nhất với hướng rẽ. Khi bảo đảm an toàn, không gây trở ngại cho người và phương tiện khác mới được chuyển hướng.",
      "4. Cả ba ý trên."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 4. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 47,
    "chapter": 1,
    "question": "Khi chuyển làn đường, người lái xe phải bật đèn tín hiệu báo rẽ như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Khi bắt đầu chuyển làn đường.",
      "2. Trước khi thay đổi làn đường.",
      "3. Sau khi thay đổi làn đường."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 48,
    "chapter": 1,
    "question": "Người điều khiển phương tiện tham gia giao thông không được dừng xe, đỗ xe ở những vị trí nào sau đây?",
    "options": [
      "1. Trên miệng cống thoát nước, miệng hầm của đường điện thoại, điện cao thế, chỗ dành riêng cho xe chữa cháy lấy nước.",
      "2. Trong phạm vi an toàn của đường sắt.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 49,
    "chapter": 1,
    "question": "Người điều khiển xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy có được phép sử dụng xe để kéo hoặc đẩy các phương tiện khác khi tham gia giao thông không?",
    "options": [
      "1. Được phép.",
      "2. Nếu phương tiện được kéo, đẩy có khối lượng nhỏ hơn phương tiện của mình.",
      "3. Tùy trường hợp.",
      "4. Không được phép."
    ],
    "answer": 4,
    "isParalyzed": true,
    "explain": "CÂU ĐIỂM LIỆT: Hành vi bị nghiêm cấm theo Luật Trật tự ATGT đường bộ. Thí sinh tuyệt đối không được làm sai câu này!",
    "image": null
  },
  {
    "id": 50,
    "chapter": 1,
    "question": "Khi điều khiển xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy,những hành vi nào sau đây không được phép? CÂU LIỆT",
    "options": [
      "1. Buông cả hai tay; đứng, nằm trên xe điều khiển xe; sử dụng chân chống hoặc vật khác quệt xuống đường khi xe đang chạy.",
      "2. Chở tối đa hai người phía sau khi chở người bệnh đi cấp cứu, áp giải người có hành vi vi phạm pháp luật, trẻ em dưới 12 tuổi và người già yếu hoặc người khuyết tật."
    ],
    "answer": 1,
    "isParalyzed": true,
    "explain": "CÂU ĐIỂM LIỆT: Hành vi bị nghiêm cấm theo Luật Trật tự ATGT đường bộ. Thí sinh tuyệt đối không được làm sai câu này!",
    "image": null
  },
  {
    "id": 51,
    "chapter": 1,
    "question": "Khi điều khiển xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy, những hành vi nào sau đây không được phép?",
    "options": [
      "1. Buông cả hai tay; sử dụng xe để kéo, đẩy xe khác, vật khác; sử dụng chân chống hoặc vật khác quệt xuống đường khi xe đang chạy.",
      "2. Sử dụng xe để chở người hoặc hàng hóa; để chân chạm xuống đất khi khởi hành.",
      "3. Đội mũ bảo hiểm; chạy xe đúng tốc độ quy định và chấp hành đúng quy tắc giao thông đường bộ.",
      "4. Chở người ngồi sau dưới 16 tuổi."
    ],
    "answer": 1,
    "isParalyzed": true,
    "explain": "CÂU ĐIỂM LIỆT: Hành vi bị nghiêm cấm theo Luật Trật tự ATGT đường bộ. Thí sinh tuyệt đối không được làm sai câu này!",
    "image": null
  },
  {
    "id": 52,
    "chapter": 1,
    "question": "Người được chở trên xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy khi tham gia giao thông đường bộ không được thực hiện hành vi nào sau đây?",
    "options": [
      "1. Mang, vác vật cồng kềnh.",
      "2. Bám, kéo hoặc đẩy các phương tiện khác.",
      "3. Dùng tay cầm điện thoại hoặc các thiết bị điện tử khác.",
      "4. Ý 1 và ý 2."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 4. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 53,
    "chapter": 1,
    "question": "Người được chở trên xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy khi tham gia giao thông đường bộ có được bám, kéo hoặc đẩy các phương tiện khác không?",
    "options": [
      "1. Được phép.",
      "2. Được bám trong trường hợp phương tiện của mình bị hỏng.",
      "3. Được kéo, đẩy trong trường hợp phương tiện khác bị hỏng.",
      "4. Không được phép."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 4. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 54,
    "chapter": 1,
    "question": "Người lái xe, người được chở trên xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy phải thực hiện quy định nào dưới đây?",
    "options": [
      "1. Đội mũ bảo hiểm theo đúng quy chuẩn kỹ thuật quốc gia và cài quai đúng quy cách.",
      "2. Người lái xe phải đội mũ bảo hiểm, người được chở trên xe không nhất thiết phải đội mũ bảo hiểm.",
      "3. Phải đội mũ bảo hiểm nhưng không nhất thiết phải cài quai."
    ],
    "answer": 1,
    "isParalyzed": true,
    "explain": "CÂU ĐIỂM LIỆT: Hành vi bị nghiêm cấm theo Luật Trật tự ATGT đường bộ. Thí sinh tuyệt đối không được làm sai câu này!",
    "image": null
  },
  {
    "id": 55,
    "chapter": 1,
    "question": "Người lái xe mô tô hai bánh, xe gắn máy được phép chở tối đa hai người trong những trường hợp nào?",
    "options": [
      "1. Chở người bệnh đi cấp cứu; áp giải người có hành vi vi phạm pháp luật; trẻ em dưới 12 tuổi; người già yếu hoặc người khuyết tật.",
      "2. Người đã uống rượu, bia; người trong cơ thể có chất ma tuý.",
      "3. Cả hai ý trên."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 56,
    "chapter": 1,
    "question": "Người lái xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy không được thực hiện các hành vi nào dưới đây?",
    "options": [
      "1. Đi xe dàn hàng ngang; buông cả hai tay.",
      "2. Sử dụng xe để kéo, đẩy xe khác, vật khác, dẫn dắt vật nuôi, mang, vác và chở vật cồng kềnh; chở người đứng trên xe, giá đèo hàng hoặc ngồi trên tay lái; xếp hàng hóa trên xe quá giới hạn quy định.",
      "3. Ngồi về một bên điều khiển xe; đứng, nằm trên xe điều khiển xe; thay người lái xe khi xe đang chạy; quay người về phía sau để điều khiển xe hoặc bịt mắt điều khiển xe; sử dụng chân chống hoặc vật khác quệt xuống đường khi xe đang chạy.",
      "4. Cả ba ý trên."
    ],
    "answer": 4,
    "isParalyzed": true,
    "explain": "CÂU ĐIỂM LIỆT: Hành vi bị nghiêm cấm theo Luật Trật tự ATGT đường bộ. Thí sinh tuyệt đối không được làm sai câu này!",
    "image": null
  },
  {
    "id": 57,
    "chapter": 1,
    "question": "Người lái xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy không được thực hiện các hành vi nào sau đây?",
    "options": [
      "1. Đi xe dàn hàng ngang; đi xe vào phần đường dành cho người đi bộ và phương tiện khác.",
      "2. Sử dụng ô, thiết bị âm thanh, trừ thiết bị trợ thính.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": true,
    "explain": "CÂU ĐIỂM LIỆT: Hành vi bị nghiêm cấm theo Luật Trật tự ATGT đường bộ. Thí sinh tuyệt đối không được làm sai câu này!",
    "image": null
  },
  {
    "id": 58,
    "chapter": 1,
    "question": "Người lái xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy không được thực hiện hành vi nào sau đây?",
    "options": [
      "1. Đi trên phần đường, làn đường quy định, chấp hành hiệu lệnh của người điều khiển giao thông, đèn tín hiệu giao thông.",
      "2. Đi xe dàn hàng ngang, đi xe vào phần đường dành cho người đi bộ.",
      "3. Cả hai ý trên."
    ],
    "answer": 2,
    "isParalyzed": true,
    "explain": "CÂU ĐIỂM LIỆT: Hành vi bị nghiêm cấm theo Luật Trật tự ATGT đường bộ. Thí sinh tuyệt đối không được làm sai câu này!",
    "image": null
  },
  {
    "id": 59,
    "chapter": 1,
    "question": "Người được chở trên xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy khi tham gia giao thông đường bộ có được sử dụng ô khi trời mưa hay không?",
    "options": [
      "1. Được sử dụng.",
      "2. Chỉ người ngồi sau được sử dụng.",
      "3. Không được sử dụng.",
      "4. Được sử dụng nếu không có áo mưa."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 60,
    "chapter": 1,
    "question": "Người được chở trên xe mô tô có được kéo theo người đang điều khiển xe đạp hay không?",
    "options": [
      "1. Chỉ được phép nếu cả hai đội mũ bảo hiểm.",
      "2. Không được phép.",
      "3. Chỉ được thực hiện trên đường vắng."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 61,
    "chapter": 1,
    "question": "Trường hợp người được chở trên xe mô tô, xe gắn máy, các loại xe tương tự xe mô tô và các loại xe tương tự xe gắn máy không đội \"mũ bảo hiểm cho người đi mô tô, xe máy\" hoặc không cài quai đúng quy cách (trừ trường hợp chở người bệnh đi cấp cứu, trẻ em dưới 06 tuổi, áp giải người có hành vi vi phạm pháp luật) thì việc xử phạt vi phạm hành chính được quy định như thế nào?",
    "options": [
      "1. Không bị xử phạt chỉ bị nhắc nhở.",
      "2. Người được chở không bị xử phạt, chỉ xử phạt người điều khiển xe mô tô, xe gắn máy.",
      "3. Người được chở bị xử phạt, không xử phạt người điều khiển xe mô tô, xe gắn máy.",
      "4. Xử phạt cả người điều khiển và người được chở trên xe mô tô, xe gắn máy."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 4. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 62,
    "chapter": 1,
    "question": "Trong các trường hợp dưới đây, để bảo đảm an toàn khi tham gia giao thông, người lái xe mô tô cần thực hiện như thế nào?",
    "options": [
      "1. Phải đội mũ bảo hiểm theo đúng quy chuẩn kỹ thuật quốc gia và cài quai đúng quy cách, không sử dụng ô, điện thoại di động, thiết bị âm thanh (trừ thiết bị trợ thính).",
      "2. Phải đội mũ bảo hiểm khi trời mưa gió hoặc trời quá nắng; có thể sử dụng ô, điện thoại di động, thiết bị âm thanh nhưng phải bảo đảm an toàn.",
      "3. Phải đội mũ bảo hiểm khi cảm thấy mất an toàn giao thông hoặc khi chuẩn bị di chuyển quãng đường xa."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 63,
    "chapter": 1,
    "question": "Thứ tự xuống phà như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Xe thô sơ, người đi bộ xuống trước, xe cơ giới, xe máy chuyên dùng xuống sau.",
      "2. Xe cơ giới, xe máy chuyên dùng xuống trước, xe thô sơ, người đi bộ xuống sau.",
      "3. Xe cơ giới, xe thô sơ xuống trước, xe máy chuyên dùng, người đi bộ xuống sau."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 64,
    "chapter": 1,
    "question": "Khi lái xe trong đô thị và khu đông dân cư trong thời gian từ 22 giờ ngày hôm trước đến 05 giờ ngày hôm sau, nếu cần vượt một xe khác, người lái xe phải báo hiệu như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Chỉ được báo hiệu bằng còi.",
      "2. Phải báo hiệu bằng cả còi và đèn.",
      "3. Chỉ được báo hiệu bằng đèn."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 65,
    "chapter": 1,
    "question": "Khi điều khiển xe chạy trên đường, biết có xe sau xin vượt, nếu đủ điều kiện an toàn người điều khiển phương tiện phải làm gì?",
    "options": [
      "1. Tăng tốc độ và ra hiệu cho xe sau vượt, không được gây trở ngại cho xe xin vượt.",
      "2. Giảm tốc độ, có tín hiệu rẽ phải để báo hiệu cho người điều khiển phương tiện tham gia giao thông đường bộ phía sau biết được vượt và đi sát về bên phải của phần đường xe chạy cho đến khi xe sau đã vượt qua, không được cản trở đối với xe xin vượt.",
      "3. Cho xe đi sát về bên trái của phần đường xe chạy và ra hiệu cho xe sau vượt, không được gây trở ngại cho xe xin vượt."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 66,
    "chapter": 1,
    "question": "Trên đường không phân chia thành hai chiều xe chạy riêng biệt, người điều khiển phương tiện tham gia giao thông đường bộ phải tránh xe đi ngược chiều như thế nào để bảo đảm an toàn?",
    "options": [
      "1. Giảm tốc độ và cho xe đi về bên phải theo chiều xe chạy của mình.",
      "2. Một trong hai xe phải dừng lại cho xe kia đi qua mới được đi.",
      "3. Tăng tốc độ, cho xe đi về bên phải theo chiều xe chạy của mình để nhanh chóng vượt qua."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 67,
    "chapter": 1,
    "question": "Khi tránh xe đi ngược chiều, các xe phải nhường đường như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Nơi đường hẹp chỉ đủ cho một xe chạy và có chỗ tránh xe thì xe nào ở gần chỗ tránh hơn phải vào vị trí tránh, nhường đường cho xe đi ngược chiều.",
      "2. Xe xuống dốc phải nhường đường cho xe lên dốc.",
      "3. Xe có chướng ngại vật phía trước phải nhường đường cho xe không có chướng ngại vật phía trước.",
      "4. Cả ba ý trên."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 4. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 68,
    "chapter": 1,
    "question": "Người lái xe phải làm gì để bảo đảm an toàn khi lái xe trên đường cong có tầm nhìn bị hạn chế?",
    "options": [
      "1. Quan sát, giảm tốc độ hoặc dừng lại để bảo đảm an toàn.",
      "2. Đi sang làn đường của xe ngược chiều để mở rộng tầm nhìn và vượt xe khác.",
      "3. Cho xe đi sát bên phải làn đường, bật tín hiệu báo hiệu để vượt bên phải xe khác."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 69,
    "chapter": 1,
    "question": "Tại nơi đường giao nhau, người lái xe đang đi trên đường không ưu tiên, đường nhánh phải nhường đường như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Nhường đường cho xe đi ở bên phải mình tới.",
      "2. Nhường đường cho xe đi ở bên trái mình tới.",
      "3. Nhường đường cho xe đi trên đường ưu tiên hoặc đường chính từ bất kỳ hướng nào tới."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 70,
    "chapter": 1,
    "question": "Tại nơi đường giao nhau có báo hiệu đi theo vòng xuyến, người lái xe phải nhường đường như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Nhường đường cho xe đi đến từ bên phải.",
      "2. Nhường đường cho xe đi đến từ bên trái.",
      "3. Không phải nhường đường."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 71,
    "chapter": 1,
    "question": "Tại nơi đường giao nhau không có báo hiệu đi theo vòng xuyến, người điều khiển phương tiện phải nhường đường như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Phải nhường đường cho xe đi đến từ bên phải.",
      "2. Xe báo hiệu xin đường trước, xe đó được đi trước.",
      "3. Phải nhường đường cho xe đi đến từ bên trái."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 72,
    "chapter": 1,
    "question": "Người lái xe phải nhanh chóng giảm tốc độ, đi sát lề đường bên phải hoặc dừng lại để nhường đường cho các loại xe nào dưới đây?",
    "options": [
      "1. Xe chữa cháy của Cảnh sát phòng cháy, chữa cháy và cứu nạn, cứu hộ và xe chữa cháy của các lực lượng khác; xe của lực lượng quân sự, công an và kiểm sát; đoàn xe có xe Cảnh sát giao thông dẫn đường; xe cứu thương; xe hộ đê không có tín hiệu ưu tiên theo quy định.",
      "2. Xe ưu tiên gồm xe chữa cháy của Cảnh sát phòng cháy, chữa cháy và cứu nạn, cứu hộ và xe chữa cháy của các lực lượng khác được huy động đi làm nhiệm vụ chữa cháy; xe của lực lượng quân sự, công an và kiểm sát đi làm nhiệm vụ khẩn cấp; đoàn xe có xe Cảnh sát giao thông dẫn đường; xe cứu thương đi làm nhiệm vụ cấp cứu; xe hộ đê đi làm nhiệm vụ; xe đi làm nhiệm vụ cứu nạn, cứu hộ, khắc phục sự cố thiên tai, dịch bệnh hoặc xe đi làm nhiệm vụ trong tình trạng khẩn cấp theo quy định của pháp luật; đoàn xe tang.",
      "3. Xe ô tô, xe máy, đoàn xe đang diễu hành có tổ chức có báo tín hiệu xin vượt bằng còi và đèn."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 73,
    "chapter": 1,
    "question": "Khi có tín hiệu của xe ưu tiên, người và phương tiện tham gia giao thông đường bộ phải tuân thủ quy định nào dưới đây?",
    "options": [
      "1. Giảm tốc độ, đi sát lề đường bên phải hoặc dừng lại để nhường đường.",
      "2. Tăng tốc độ và đi sát lề đường bên phải để nhường đường.",
      "3. Giảm tốc độ, đi sát lề đường bên trái để nhường đường."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 74,
    "chapter": 1,
    "question": "Khi đang lái xe, phía trước có một xe Cảnh sát giao thông khôngphát tín hiệu ưu tiên, người lái xe có được phép vượt hay không?",
    "options": [
      "1. Không được vượt.",
      "2. Được phép vượt ở phần đường dành cho người đi bộ qua đường.",
      "3. Được vượt khi bảo đảm an toàn."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 75,
    "chapter": 1,
    "question": "Khi đang lái xe, phía trước có một xe cứu thương đang phát tín hiệu ưu tiên, người lái xe có được phép vượt hay không?",
    "options": [
      "1. Không được vượt.",
      "2. Được vượt khi đang đi trên cầu.",
      "3. Được phép vượt khi đi qua nơi giao nhau có ít phương tiện cùng tham gia giao thông.",
      "4. Được vượt khi bảo đảm an toàn."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 76,
    "chapter": 1,
    "question": "Khi tới đường ngang không có người gác, chắn đường bộ, chuông, đèn tín hiệu, người tham gia giao thông đường bộ phải làm gì để bảo đảm an toàn?",
    "options": [
      "1. Dừng lại về bên phải đường của mình, trước vạch dừng xe và quan sát hai phía, khi không có phương tiện giao thông đường sắt tới mới được đi qua.",
      "2. Quan sát hai phía, khi không có phương tiện giao thông đường sắt tới thì nhanh chóng đi qua.",
      "3. Dừng lại khoảng cách tối thiểu 3 mét tính từ ray đường sắt gần nhất, khi không có phương tiện giao thông đường sắt tới thì nhanh chóng đi qua."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 77,
    "chapter": 1,
    "question": "Tại đường ngang, cầu chung đường sắt, khi có hiệu lệnh của nhân viên gác chắn, đèn đỏ sáng nhấp nháy, chuông kêu, chắn đường bộ đang dịch chuyển hoặc đã đóng, người tham gia giao thông đường bộ phải làm gì để bảo đảm an toàn?",
    "options": [
      "1. Dừng lại về bên trái đường của mình, trước vạch dừng xe.",
      "2. Dừng lại giữa đường của mình, trước vạch dừng xe.",
      "3. Dừng lại về bên phải đường của mình, trước vạch dừng xe."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 78,
    "chapter": 1,
    "question": "Người tham gia giao thông đường bộ phải dừng lại về bên phải đường của mình trước vạch dừng xe tại đường ngang, cầu chung đường sắt khi có báo hiệu nào dưới đây?",
    "options": [
      "1. Hiệu lệnh của nhân viên gác chắn.",
      "2. Đèn đỏ sáng nhấp nháy, chuông kêu.",
      "3. Chắn đường bộ đang dịch chuyển hoặc đã đóng.",
      "4. Cả ba ý trên."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 4. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 79,
    "chapter": 1,
    "question": "Người điều khiển phương tiện tham gia giao thông trong hầm đường bộ ngoài việc phải tuân thủ các quy tắc giao thông còn phải thực hiện những quy định nào dưới đây?",
    "options": [
      "1. Xe cơ giới, xe máy chuyên dùng phải bật đèn chiếu gần; xe thô sơ phải bật đèn hoặc có vật phát sáng báo hiệu; không dừng xe, đỗ xe trong hầm đường bộ; trường hợp gặp sự cố kỹ thuật hoặc bất khả kháng khác buộc phải dừng xe, đỗ xe, người lái xe, người điều khiển xe máy chuyên dùng phải đưa xe vào vị trí dừng xe, đỗ xe khẩn cấp, nếu không di chuyển được, phải có báo hiệu bằng đèn khẩn cấp và đặt biển hoặc đèn cảnh báo về phía sau xe khoảng cách bảo đảm an toàn.",
      "2. Xe cơ giới, xe máy chuyên dùng phải bật đèn chiếu xa; được dừng xe, đỗ xe khi cần thiết.",
      "3. Phải cho xe chạy trên một làn đường và chỉ chuyển làn ở nơi được phép; được quay đầu xe, lùi xe khi cần thiết."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 80,
    "chapter": 1,
    "question": "Người điều khiển phương tiện tham gia giao thông đường bộ phải quan sát, giảm tốc độ hoặc dừng lại để bảo đảm an toàn trong các trường hợp nào dưới đây?",
    "options": [
      "1. Có báo hiệu cảnh báo nguy hiểm hoặc có chướng ngại vật trên đường; chuyển hướng xe chạy hoặc tầm nhìn bị hạn chế.",
      "2. Nơi cầu, cống hẹp, đập tràn, đường ngầm, hầm chui, hầm đường bộ; có vật nuôi đi trên đường hoặc chăn thả ở ven đường.",
      "3. Điểm dừng xe, đỗ xe trên đường bộ có khách đang lên, xuống xe.",
      "4. Cả ba ý trên."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 4. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 81,
    "chapter": 1,
    "question": "Người lái xe được phép vượt xe khác về bên phải trong trường hợp nào dưới đây?",
    "options": [
      "1. Xe phía trước có tín hiệu rẽ trái hoặc đang rẽ trái hoặc khi xe chuyên dùng đang làm việc trên đường mà không thể vượt bên trái.",
      "2. Xe phía trước đang đi sát lề đường bên trái.",
      "3. Cả hai ý trên."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 82,
    "chapter": 1,
    "question": "Khi có xe xin vượt, người lái xe mô tô xử lý như thế nào nếu đủ điều kiện an toàn cho xe phía sau vượt?",
    "options": [
      "1. Giảm tốc độ, có tín hiệu rẽ phải để báo hiệu cho người điều khiển phương tiện tham gia giao thông đường bộ phía sau biết được vượt và đi sát về bên phải của phần đường xe chạy cho đến khi xe sau đã vượt qua, không được cản trở đối với xe xin vượt.",
      "2. Lái xe vào lề đường bên trái và giảm tốc độ để xe phía sau vượt qua, không được gây trở ngại đối với xe xin vượt.",
      "3. Tăng tốc độ, đi sát về bên phải của phần đường xe chạy cho đến khi xe sau đã vượt qua."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 83,
    "chapter": 1,
    "question": "Những trường hợp nào dưới đây không được đi trên đường cao tốc, trừ người, phương tiện giao thông đường bộ và thiết bị phục vụ việc quản lý, bảo trì đường cao tốc?",
    "options": [
      "1. Xe máy chuyên dùng có tốc độ thiết kế nhỏ hơn tốc độ tối thiểu quy định đối với đường cao tốc, xe chở người bốn bánh có gắn động cơ, xe chở hàng bốn bánh có gắn động cơ, xe mô tô, xe gắn máy, các loại xe tương tự xe mô tô, xe gắn máy, xe thô sơ, người đi bộ.",
      "2. Xe máy chuyên dùng có tốc độ thiết kế lớn hơn tốc độ tối thiểu quy định đối với đường cao tốc.",
      "3. Xe ô tô và xe máy chuyên dùng có tốc độ thiết kế lớn hơn 80 km/h."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 84,
    "chapter": 1,
    "question": "Theo quy định về độ tuổi, người đủ bao nhiêu tuổi trở lên thì được cấp giấy phép lái xe mô tô hai bánh có dung tích xi lanh đến 125 cm3 và xe ô tô chở người đến 8 chỗ (không kể chỗ của người lái xe); xe ô tô tải và ô tô chuyên dùng có khối lượng toàn bộ theo thiết kế đến 3.500 kg?",
    "options": [
      "1. 16 tuổi.",
      "2. 17 tuổi",
      "3. 18 tuổi."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 85,
    "chapter": 1,
    "question": "Người đủ 16 tuổi đến dưới 18 tuổi chỉ được điều khiển các loại xe nào dưới đây?",
    "options": [
      "1. Xe mô tô hai bánh có dung tích xi-lanh đến 125 cm3.",
      "2. Xe gắn máy.",
      "3. Xe ô tô chở người đến 08 chỗ (không kể chỗ của người lái xe); xe ô tô tải và ô tô chuyên dùng có khối lượng toàn bộ theo thiết kế đến",
      "3. 500 kg; các loại xe ô tô quy định cho giấy phép lái xe hạng B kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg.",
      "4. Cả ba ý trên."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 86,
    "chapter": 1,
    "question": "Người có Giấy phép lái xe mô tô hạng A1 không được phép điều khiển loại xe nào dưới đây?",
    "options": [
      "1. Xe mô tô hai bánh có dung tích xi-lanh 125 cm3 hoặc có công suất động cơ điện đến 11 kW.",
      "2. Xe mô tô ba bánh.",
      "3. Cả hai ý trên."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 87,
    "chapter": 1,
    "question": "Người có Giấy phép lái xe mô tô hạng A1 được cấp sau ngày 01/01/2025 được phép điều khiển loại xe nào dưới đây?",
    "options": [
      "1. Xe mô tô hai bánh có dung tích xi-lanh đến 125 cm3 hoặc có công suất động cơ điện đến 11 kW.",
      "2. Xe mô tô ba bánh.",
      "3. Cả hai ý trên."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 88,
    "chapter": 1,
    "question": "Người có Giấy phép lái xe mô tô hạng A được phép điều khiển loại xe nào dưới đây?",
    "options": [
      "1. Xe mô tô hai bánh có dung tích xi-lanh đến 125 cm3 hoặc có công suất động cơ điện đến 11 kW.",
      "2. Xe mô tô hai bánh có dung tích xi-lanh trên 125 cm3 hoặc có công suất động cơ điện trên 11 kW.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 89,
    "chapter": 1,
    "question": "Người lái xe khi tham gia giao thông đường bộ phải đảm bảo các điều kiện nào dưới đây?",
    "options": [
      "1. Phải đủ tuổi, sức khỏe theo quy định của pháp luật; có giấy phép lái xe đang còn điểm, còn hiệu lực phù hợp với loại xe đang điều khiển do cơ quan có thẩm quyền cấp (trừ người lái xe gắn máy).",
      "2. Phải là người đứng tên trong đăng ký xe.",
      "3. Cả hai ý trên."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 90,
    "chapter": 1,
    "question": "Khi tham gia giao thông đường bộ, người lái xe phải mang theo các giấy tờ gì?",
    "options": [
      "1. Chứng nhận đăng ký xe hoặc bản sao Chứng nhận đăng ký xe có chứng thực kèm bản gốc giấy tờ xác nhận của tổ chức tín dụng, chi nhánh ngân hàng nước ngoài còn hiệu lực trong trường hợp xe đang được thế chấp tại tổ chức tín dụng, chi nhánh ngân hàng nước ngoài.",
      "2. Giấy phép lái xe phù hợp với loại xe đang điều khiển; chứng nhận kiểm định an toàn kỹ thuật và bảo vệ môi trường đối với xe cơ giới theo quy định của pháp luật; chứng nhận bảo hiểm bắt buộc trách nhiệm dân sự của chủ xe cơ giới.",
      "3. Trường hợp các giấy tờ nêu trên đã được tích hợp vào tài khoản định danh điện tử thì việc xuất trình, kiểm tra có thể thực hiện thông qua tài khoản định danh điện tử.",
      "4. Cả ba ý trên."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 4. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 91,
    "chapter": 1,
    "question": "Người có giấy phép lái xe chưa bị trừ hết 12 điểm, được phục hồi điểm giấy phép lái xe trong trường hợp nào sau đây?",
    "options": [
      "1. Không được phục hồi.",
      "2. Được phục hồi đủ 12 điểm, nếu không bị trừ điểm trong thời hạn 12 tháng từ ngày bị trừ điểm gần nhất."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 92,
    "chapter": 1,
    "question": "Người có giấy phép lái xe đã bị trừ hết điểm phải làm gì để phục hồi điểm giấy phép lái xe?",
    "options": [
      "1. Không vi phạm pháp luật trật tự, an toàn giao thông đường bộ trong thời gian 12 tháng kể từ ngày bị trừ hết điểm.",
      "2. Sau thời hạn ít nhất là 06 tháng kể từ ngày bị trừ hết điểm, người có phép lái xe được tham gia kiểm tra nội dung kiến thức pháp luật về trật tự, an toàn giao thông đường bộ theo quy định, có kết quả đạt yêu cầu thì được phục hồi đủ 12 điểm.",
      "3. Cả hai ý trên."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 93,
    "chapter": 1,
    "question": "Trách nhiệm của tổ chức, cá nhân đứng tên trong giấy chứng nhận đăng ký xe khi chưa thực hiện thu hồi chứng nhận đăng ký xe, biển số xe được quy định như thế nào?",
    "options": [
      "1. Tiếp tục chịu trách nhiệm của chủ xe.",
      "2. Không chịu trách nhiệm sau khi đã chuyển nhượng, trao đổi, tặng, cho."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 94,
    "chapter": 1,
    "question": "Trên đường bộ, trong khu vực đông dân cư, đường đôi hoặc đường một chiều có từ hai làn xe cơ giới trở lên, xe mô tô hai bánh, ô tô chở người đến 28 chỗ không kể chỗ của người lái xe tham gia giao thông với tốc độ khai thác tối đa cho phép là bao nhiêu?",
    "options": [
      "1. 60 km/h.",
      "2. 50 km/h.",
      "3. 40 km/h."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 95,
    "chapter": 1,
    "question": "Trên đường bộ (trừ đường cao tốc) trong khu vực đông dân cư, đường hai chiều hoặc đường một chiều có một làn xe cơ giới, xe mô tô hai bánh, ô tô chở người đến 28 chỗ không kể chỗ của người lái xe tham gia giao thông với tốc độ khai thác tối đa cho phép là bao nhiêu?",
    "options": [
      "1. 60 km/h.",
      "2. 50 km/h.",
      "3. 40 km/h."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 96,
    "chapter": 1,
    "question": "Trên đường bộ ngoài khu vực đông dân cư, đường đôi hoặc đường một chiều có từ hai làn xe cơ giới trở lên (trừ đường cao tốc) loại xe nào dưới đây được tham gia giao thông với tốc độ khai thác tối đa cho phép là 70 km/h?",
    "options": [
      "1. Xe ô tô chở người đến 28 chỗ không kể chỗ của người lái xe (trừ xe buýt); ô tô tải có trọng tải không lớn hơn 3,5 tấn.",
      "2. Xe ô tô chở người trên 28 chỗ không kể chỗ người lái xe (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc).",
      "3. Xe buýt; ô tô đầu kéo kéo sơ mi rơ moóc (trừ ô tô đầu kéo kéo sơ mi rơ moóc xi téc); xe mô tô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông lưu động).",
      "4. Ô tô kéo rơ moóc; ô tô kéo xe khác; ô tô trộn vữa, ô tô trộn bê tông lưu động, ô tô xi téc, ô tô đầu kéo kéo sơ mi rơ moóc xi téc, ô tô kéo theo rơ moóc xi téc."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 97,
    "chapter": 1,
    "question": "Trên đường bộ ngoài khu vực đông dân cư, đường hai chiều hoặc đường một chiều có một làn xe cơ giới (trừ đường cao tốc), loại xe nào dưới đây được tham gia giao thông với tốc độ khai thác tối đa cho phép là 60 km/h?",
    "options": [
      "1. Xe ô tô chở người đến 28 chỗ không kể chỗ của người lái xe (trừ xe buýt); ô tô tải có trọng tải không lớn hơn 3,5 tấn.",
      "2. Xe ô tô chở người trên 28 chỗ không kể chỗ người lái xe (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc).",
      "3. Xe buýt; ô tô đầu kéo kéo sơ mi rơ moóc (trừ ô tô đầu kéo kéo sơ mi rơ moóc xi téc); xe mô tô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông lưu động).",
      "4. Ô tô kéo rơ moóc; ô tô kéo xe khác; ô tô trộn vữa, ô tô trộn bê tông lưu động, ô tô xi téc, ô tô đầu kéo kéo sơ mi rơ moóc xi téc, ô tô kéo theo rơ moóc xi téc."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 98,
    "chapter": 1,
    "question": "Người lái xe phải giảm tốc độ thấp hơn tốc độ tối đa cho phép đến mức cần thiết, chú ý quan sát và chuẩn bị sẵn sàng những tình huống có thể xảy ra để phòng ngừa tai nạn trong các trường hợp nào dưới đây?",
    "options": [
      "1. Gặp biển báo nguy hiểm và cảnh báo trên đường.",
      "2. Gặp biển chỉ dẫn trên đường.",
      "3. Gặp biển báo hết mọi lệnh cấm.",
      "4. Gặp biển báo hết hạn chế tốc độ tối đa cho phép."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 99,
    "chapter": 1,
    "question": "Khi gặp xe buýt đang dừng đón, trả khách, người điều khiển xe mô tô phải xử lý như thế nào dưới đây?",
    "options": [
      "1. Tăng tốc độ để nhanh chóng vượt qua xe buýt.",
      "2. Quan sát, giảm tốc độ đi qua xe buýt hoặc dừng lại để bảo đảm an toàn."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 100,
    "chapter": 1,
    "question": "Việc sử dụng xe mô tô, xe gắn máy, xe thô sơ để vận chuyển hành khách, hàng hóa phải thực hiện các quy định nào dưới đây để đảm bảo an toàn giao thông?",
    "options": [
      "1. Kiểm tra điều kiện bảo đảm an toàn của xe trước khi tham gia giao thông đường bộ; mang đủ giấy tờ theo quy định của pháp luật.",
      "2. Kiểm tra việc sắp xếp hàng hóa bảo đảm an toàn; không chở quá số người, chở hành lý, hàng hoá vượt quá khối lượng cho phép hoặc vượt quá khổ giới hạn của xe.",
      "3. Cả hai ý trên. CHƯƠNG II. VĂN HÓA GIAO THÔNG, ĐẠO ĐỨC NGƯỜI LÁI XE, KỸ NĂNG PHÒNG CHÁY, CHỮA CHÁY VÀ CỨU HỘ, CỨU NẠN"
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 1: Khái niệm và quy tắc giao thông đường bộ.",
    "image": null
  },
  {
    "id": 101,
    "chapter": 2,
    "question": "Những hành vi nào sau đây thể hiện là người có văn hóa giao thông?",
    "options": [
      "1. Luôn tuân thủ pháp luật về trật tự, an toàn giao thông đường bộ, nhường nhịn và giúp đỡ người khác.",
      "2. Đi nhanh, vượt đèn đỏ nếu không có lực lượng Công an.",
      "3. Bấm còi và nháy đèn liên tục để cảnh báo xe khác.",
      "4. Tránh nhường đường để đi nhanh hơn."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 2: Văn hóa giao thông và đạo đức người lái xe.",
    "image": null
  },
  {
    "id": 102,
    "chapter": 2,
    "question": "Khái niệm về văn hóa giao thông được hiểu như thế nào là đúng?",
    "options": [
      "1. Là sự hiểu biết và chấp hành nghiêm chỉnh pháp luật về giao thông, là ý thức trách nhiệm với cộng đồng khi tham gia giao thông.",
      "2. Là sự tôn trọng, nhường nhịn, giúp đỡ và ứng xử có văn hóa giữa những người tham gia giao thông với nhau.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 2: Văn hóa giao thông và đạo đức người lái xe.",
    "image": null
  },
  {
    "id": 103,
    "chapter": 2,
    "question": "Người lái xe không điều khiển xe đi đúng làn đường quy định, phóng nhanh, vượt ẩu, vượt đèn đỏ, đi vào đường cấm được coi là hành vi nào trong các hành vi dưới đây?",
    "options": [
      "1. Là thiếu văn hóa giao thông, vi phạm pháp luật về trật tự, an toàn giao thông đường bộ.",
      "2. Là thiếu văn hóa giao thông."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 2: Văn hóa giao thông và đạo đức người lái xe.",
    "image": null
  },
  {
    "id": 104,
    "chapter": 2,
    "question": "Người lái xe có văn hóa giao thông khi tham gia giao thông đường bộ phải đáp ứng các điều kiện nào dưới đây?",
    "options": [
      "1. Hiểu biết và chấp hành nghiêm chỉnh pháp luật về giao thông đường bộ; có ý thức trách nhiệm với cộng đồng khi tham gia giao thông; tôn trọng, nhường nhịn, giúp đỡ và ứng xử có văn hóa với những người cùng tham gia giao thông.",
      "2. Điều khiển xe vượt quá tốc độ, đi không đúng làn đường."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 2: Văn hóa giao thông và đạo đức người lái xe.",
    "image": null
  },
  {
    "id": 105,
    "chapter": 2,
    "question": "Người lái xe mô tô có văn hóa giao thông khi tham gia giao thông phải tuân thủ những quy định nào dưới đây?",
    "options": [
      "1. Điều khiển xe đi bên phải theo chiều đi của mình; đi đúng phần đường, làn đường quy định; đội mũ bảo hiểm đúng quy chuẩn kỹ thuật quốc gia, cài quai đúng quy cách.",
      "2. Điều khiển xe đi trên phần đường, làn đường có ít phương tiện tham gia giao thông.",
      "3. Điều khiển xe và đội mũ bảo hiểm ở nơi có biển báo bắt buộc đội mũ bảo hiểm."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 2: Văn hóa giao thông và đạo đức người lái xe.",
    "image": null
  },
  {
    "id": 106,
    "chapter": 2,
    "question": "Trong các hành vi dưới đây, người lái xe có văn hóa giao thông phải ứng xử như thế nào?",
    "options": [
      "1. Điều khiển xe đi bên phải theo chiều đi của mình; đi đúng phần đường, làn đường quy định; dừng, đỗ xe đúng nơi quy định; đã uống rượu, bia thì không lái xe.",
      "2. Điều khiển xe đi trên phần đường, làn đường có ít phương tiện giao thông; dừng xe, đỗ xe ở nơi thuận tiện hoặc theo yêu cầu của hành khách, của người thân.",
      "3. Dừng và đỗ xe ở nơi thuận tiện cho việc chuyên chở hành khách và giao nhận hàng hóa; sử dụng ít rượu, bia thì có thể lái xe."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 2: Văn hóa giao thông và đạo đức người lái xe.",
    "image": null
  },
  {
    "id": 107,
    "chapter": 2,
    "question": "Khi tham gia giao thông việc sử dụng còi xe nên dùng như thế nào để thể hiện là người có văn hóa giao thông?",
    "options": [
      "1. Chỉ bấm còi khi thật sự cần thiết, không bấm còi liên tục hoặc kéo dài, sử dụng còi với mức âm lượng theo quy định.",
      "2. Bấm còi liên tục để các xe khác nhường đường.",
      "3. Bấm còi to khi đi qua khu vực đông dân cư.",
      "4. Không cần dùng còi, tránh gây tiếng ồn là văn minh."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 2: Văn hóa giao thông và đạo đức người lái xe.",
    "image": null
  },
  {
    "id": 108,
    "chapter": 2,
    "question": "Người điều khiển phương tiện tham giao thông đường bộ gây ra tai nạn giao thông đường bộ, người liên quan đến vụ tai nạn giao thông đường bộ có trách nhiệm gì dưới đây?",
    "options": [
      "1. Dừng ngay phương tiện, cảnh báo nguy hiểm, giữ nguyên hiện trường, trợ giúp người bị nạn và báo tin cho cơ quan Công an, cơ sở khám bệnh, chữa bệnh.",
      "2. Ở lại hiện trường vụ tai nạn giao thông đường bộ cho đến khi người của cơ quan Công an đến, trừ trường hợp phải đi cấp cứu, đưa người bị nạn đi cấp cứu hoặc xét thấy bị đe dọa đến tính mạng, sức khỏe nhưng phải đến trình báo ngay cơ quan Công an, Ủy ban nhân dân nơi gần nhất.",
      "3. Cung cấp thông tin xác định danh tính về bản thân, người liên quan đến vụ tai nạn giao thông đường bộ và thông tin liên quan của vụ tai nạn giao thông đường bộ cho cơ quan có thẩm quyền.",
      "4. Cả ba ý trên."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 4. Căn cứ theo chương 2: Văn hóa giao thông và đạo đức người lái xe.",
    "image": null
  },
  {
    "id": 109,
    "chapter": 2,
    "question": "Người có mặt tại nơi xảy ra vụ tai giao thông đường bộ có trách nhiệm gì dưới đây?",
    "options": [
      "1. Giúp đỡ, cứu chữa kịp thời người bị nạn; báo tin ngay cho cơ quan Công an, cơ sở khám bệnh, chữa bệnh hoặc Ủy ban nhân dân nơi gần nhất; tham gia bảo vệ hiện trường; tham gia bảo vệ tài sản của người bị nạn; cung cấp thông tin liên quan về vụ tai nạn theo yêu cầu của cơ quan có thẩm quyền.",
      "2. Chụp lại hình ảnh vụ tai nạn (nếu có thiết bị ghi hình) và nhanh chóng rời khỏi hiện trường vụ tai nạn."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 2: Văn hóa giao thông và đạo đức người lái xe.",
    "image": null
  },
  {
    "id": 110,
    "chapter": 2,
    "question": "Trong đoạn đường hai chiều tại khu đông dân cư đang ùn tắc, người điều khiển xe mô tô có văn hóa giao thông sẽ lựa chọn cách xử lý tình huống nào dưới đây?",
    "options": [
      "1. Cho xe lấn sang làn ngược chiều để nhanh chóng thoát khỏi nơi ùn tắc.",
      "2. Điều khiển xe trên vỉa hè để nhanh chóng thoát khỏi nơi ùn tắc.",
      "3. Kiên nhẫn tuân thủ hướng dẫn của người điều khiển giao thông hoặc tín hiệu đèn giao thông, di chuyển trên đúng phần đường bên phải theo chiều đi, nhường đường cho các phương tiện đi ngược chiều. CHƯƠNG III. KỸ THUẬT LÁI XE"
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 2: Văn hóa giao thông và đạo đức người lái xe.",
    "image": null
  },
  {
    "id": 111,
    "chapter": 3,
    "question": "Khi điều khiển xe mô tô tay ga xuống đường dốc dài, độ dốc cao, người lái xe cần thực hiện các thao tác nào dưới đây để bảo đảm an toàn?",
    "options": [
      "1. Giữ tay ga ở mức độ phù hợp, sử dụng phanh trước và phanh sau để giảm tốc độ.",
      "2. Nhả hết tay ga, tắt động cơ, sử dụng phanh trước và phanh sau để giảm tốc độ.",
      "3. Sử dụng phanh trước để giảm tốc độ kết hợp với tắt chìa khóa điện của xe."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 3: Kỹ thuật lái xe mô tô.",
    "image": null
  },
  {
    "id": 112,
    "chapter": 3,
    "question": "Khi điều khiển xe trên đường vòng người lái xe cần phải làm gì để bảo đảm an toàn?",
    "options": [
      "1. Quan sát cẩn thận các chướng ngại vật và báo hiệu bằng coi, đèn; giảm tốc độ tới mức cần thiết, về số thấp và thực hiện quay vòng với tốc độ phù hợp với bán kính cong của đường vòng.",
      "2. Quan sát cẩn thận các chướng ngại vật và báo hiệu bằng còi, đèn; tăng tốc để nhanh chóng qua đường vòng và giảm tốc độ sau khi qua đường vòng."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 3: Kỹ thuật lái xe mô tô.",
    "image": null
  },
  {
    "id": 113,
    "chapter": 3,
    "question": "Khi điều khiển xe qua đường sắt, người lái xe cần phải thực hiện các thao tác nào dưới đây để bảo đảm an toàn?",
    "options": [
      "1. Khi có chuông báo hoặc thanh chắn đã hạ xuống, người lái xe phải dừng xe tạm thời đúng khoảng cách an toàn, kéo phanh tay nếu đường dốc hoặc phải chờ lâu.",
      "2. Khi không có chuông báo hoặc thanh chắn không hạ xuống, người lái xe cần phải quan sát nếu thấy đủ điều kiện an toàn thì về số thấp, tăng ga nhẹ và không thay đổi số trong quá trình vượt qua đường sắt để tránh động cơ chết máy cho xe cho vượt qua.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 3: Kỹ thuật lái xe mô tô.",
    "image": null
  },
  {
    "id": 114,
    "chapter": 3,
    "question": "Trong các loại nhiên liệu dưới đây, loại nhiên liệu nào giảm thiểu ô nhiễm môi trường?",
    "options": [
      "1. Xăng và dầu diesel.",
      "2. Xăng sinh học và khí sinh học.",
      "3. Ý 1 và ý 2."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 3: Kỹ thuật lái xe mô tô.",
    "image": null
  },
  {
    "id": 115,
    "chapter": 3,
    "question": "Các biện pháp tiết kiệm nhiên liệu khi chạy xe?",
    "options": [
      "1. Bảo dưỡng xe theo định kỳ và có kế hoạch lộ trình trước khi xe chạy.",
      "2. Kiểm tra áp suất lốp theo quy định và chạy xe với tốc độ phù hợp với tình trạng mặt đường và mật độ giao thông trên đường.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 3: Kỹ thuật lái xe mô tô.",
    "image": null
  },
  {
    "id": 116,
    "chapter": 3,
    "question": "Khi tầm nhìn bị hạn chế bởi sương mù hoặc mưa to, người lái xe phải thực hiện các thao tác nào để bảo đảm an toàn?",
    "options": [
      "1. Tăng tốc độ, chạy gần xe trước, nhìn đèn hậu để định hướng.",
      "2. Giảm tốc độ, chạy cách xa xe trước với khoảng cách an toàn, bật đèn sương mù và đèn chiếu gần.",
      "3. Tăng tốc độ, bật đèn pha vượt qua xe chạy trước."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 3: Kỹ thuật lái xe mô tô.",
    "image": null
  },
  {
    "id": 117,
    "chapter": 3,
    "question": "Khi đèn pha của xe đi ngược chiều gây chói mắt, làm giảm khả năng quan sát trên đường, người lái xe xử lý như thế nào dưới đây để bảo đảm an toàn?",
    "options": [
      "1. Giảm tốc độ, giữ vững tay lái, nhìn chếch sang lề đường bên phải.",
      "2. Bật đèn pha chiếu xa và giữ nguyên tốc độ.",
      "3. Tăng tốc độ, bật đèn pha đối diện xe phía trước."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 3: Kỹ thuật lái xe mô tô.",
    "image": null
  },
  {
    "id": 118,
    "chapter": 3,
    "question": "Để đạt được hiệu quả phanh cao nhất, người lái xe mô tô phải sử dụng các kỹ năng như thế nào dưới đây?",
    "options": [
      "1. Sử dụng phanh trước.",
      "2. Sử dụng phanh sau.",
      "3. Giảm hết ga, sử dụng đồng thời cả phanh sau và phanh trước."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 3: Kỹ thuật lái xe mô tô.",
    "image": null
  },
  {
    "id": 119,
    "chapter": 3,
    "question": "Khi đang lái xe mô tô hoặc ô tô, nếu có nhu cầu sử dụng điện thoại để nhắn tin hoặc gọi điện, người lái xe phải thực hiện như thế nào trong các tình huống nêu dưới đây?",
    "options": [
      "1. Giảm tốc độ để bảo đảm an toàn với xe phía trước và sử dụng điện thoại để liên lạc.",
      "2. Giảm tốc độ để dừng xe ở nơi cho phép sau đó sử dụng điện thoại để liên lạc.",
      "3. Tăng tốc độ để cách xa xe phía sau và sử dụng điện thoại để liên lạc."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 3: Kỹ thuật lái xe mô tô.",
    "image": null
  },
  {
    "id": 120,
    "chapter": 3,
    "question": "Những thói quen nào dưới đây khi điều khiển xe mô tô tay ga tham gia giao thông dễ gây tai nạn nguy hiểm?",
    "options": [
      "1. Sử dụng còi.",
      "2. Phanh đồng thời cả phanh trước và phanh sau.",
      "3. Chỉ sử dụng phanh trước."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 3: Kỹ thuật lái xe mô tô.",
    "image": null
  },
  {
    "id": 121,
    "chapter": 3,
    "question": "Khi điều khiển xe mô tô quay đầu, người lái xe cần thực hiện như thế nào để bảo đảm an toàn?",
    "options": [
      "1. Bật tín hiệu báo rẽ trước khi quay đầu, từ từ giảm tốc độ đến mức có thể dừng lại.",
      "2. Chỉ quay đầu xe tại những nơi được phép quay đầu.",
      "3. Quan sát an toàn các phương tiện tới từ phía trước, phía sau, hai bên đồng thời nhường đường cho xe từ bên phải và phía trước đi tới.",
      "4. Cả ba ý trên."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 4. Căn cứ theo chương 3: Kỹ thuật lái xe mô tô.",
    "image": null
  },
  {
    "id": 122,
    "chapter": 3,
    "question": "Tay ga trên xe mô tô hai bánh có tác dụng gì dưới đây?",
    "options": [
      "1. Để điều khiển xe chạy về phía trước.",
      "2. Để điều tiết công suất động cơ qua đó điều khiển tốc độ của xe.",
      "3. Để điều khiển xe chạy lùi.",
      "4. Ý 1 và ý 2."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 4. Căn cứ theo chương 3: Kỹ thuật lái xe mô tô.",
    "image": null
  },
  {
    "id": 123,
    "chapter": 3,
    "question": "Gương chiếu hậu của xe mô tô hai bánh có tác dụng gì dưới đây?",
    "options": [
      "1. Để quan sát an toàn phía bên trái khi chuẩn bị rẽ trái.",
      "2. Để quan sát an toàn phía bên phải khi chuẩn bị rẽ phải.",
      "3. Để quan sát an toàn phía sau của bên trái và bên phải trước khi chuyển hướng.",
      "4. Để quan sát an toàn phía trước cả bên trái và bên phải trước khi chuyển hướng."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 3: Kỹ thuật lái xe mô tô.",
    "image": null
  },
  {
    "id": 124,
    "chapter": 3,
    "question": "Để bảo đảm an toàn khi tham gia giao thông, người lái xe mô tô hai bánh cần điều khiển tay ga như thế nào?",
    "options": [
      "1. Tăng ga thật mạnh, giảm ga từ từ.",
      "2. Tăng ga thật mạnh, giảm ga thật nhanh.",
      "3. Tăng ga từ từ, giảm ga thật nhanh.",
      "4. Tăng ga từ từ, giảm ga từ từ."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 3: Kỹ thuật lái xe mô tô.",
    "image": null
  },
  {
    "id": 125,
    "chapter": 3,
    "question": "Để tránh đổ, ngã khi điều khiển xe mô tô hai bánh ở nơi đường xấu, nhỏ và hẹp, người lái xe cần xử lý như thế nào?",
    "options": [
      "1. Đi ở tốc độ thấp, quan sát liên tục khoảng cách từ 05 m đến 10 m phía trước để điều chỉnh sớm hướng di chuyển.",
      "2. Trong quá trình di chuyển không nên dùng phanh trước tránh làm khóa bánh dẫn hướng.",
      "3. Không được lắc người sang trái hoặc phải nhiều, trọng tâm cơ thể cần trùng với trọng tâm của xe.",
      "4. Cả ba ý trên."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 4. Căn cứ theo chương 3: Kỹ thuật lái xe mô tô.",
    "image": null
  },
  {
    "id": 126,
    "chapter": 4,
    "question": "Biển nào cấm máy kéo?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2 và biển 3.",
      "3. Biển 1 và biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_126.png"
  },
  {
    "id": 127,
    "chapter": 4,
    "question": "Biển nào báo hiệu cấm xe mô tô ba bánh chở hàng đi qua?",
    "options": [
      "1. Biển 1 và biển 2.",
      "2. Biển 1 và biển 3.",
      "3. Biển 2 và biển 3."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_127.png"
  },
  {
    "id": 128,
    "chapter": 4,
    "question": "Biển nào dưới đây xe gắn máy được phép đi vào?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Cả hai biển."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_128.png"
  },
  {
    "id": 129,
    "chapter": 4,
    "question": "Biển nào báo hiệu cấm xe mô tô đi vào?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_129.png"
  },
  {
    "id": 130,
    "chapter": 4,
    "question": "Khi gặp biển nào thì xe mô tô hai bánh được đi vào?",
    "options": [
      "1. Không biển nào.",
      "2. Biển 1 và biển 2.",
      "3. Biển 2 và biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_130.png"
  },
  {
    "id": 131,
    "chapter": 4,
    "question": "Biển nào cấm quay đầu xe?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Không biển nào.",
      "4. Cả hai biển."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_131.png"
  },
  {
    "id": 132,
    "chapter": 4,
    "question": "Biển nào cấm xe rẽ trái?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Cả hai biển."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_132.png"
  },
  {
    "id": 133,
    "chapter": 4,
    "question": "Khi gặp biển nào xe được rẽ trái?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Không biển nào."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_133.png"
  },
  {
    "id": 134,
    "chapter": 4,
    "question": "Biển nào cấm các phương tiện rẽ phải?",
    "options": [
      "1. Biển 1 và biển 2.",
      "2. Biển 1 và biển 3.",
      "3. Biển 2 và biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_134.png"
  },
  {
    "id": 135,
    "chapter": 4,
    "question": "Biển nào cấm các phương tiện rẽ trái?",
    "options": [
      "1. Biển 1 và biển 2.",
      "2. Biển 1 và biển 3.",
      "3. Biển 2 và biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_135.png"
  },
  {
    "id": 136,
    "chapter": 4,
    "question": "Biển nào xe được phép rẽ trái?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Không biển nào."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_136.png"
  },
  {
    "id": 137,
    "chapter": 4,
    "question": "Biển nào xe quay đầu không bị cấm?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Cả hai biển."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_137.png"
  },
  {
    "id": 138,
    "chapter": 4,
    "question": "Biển nào xe được phép quay đầu nhưng không được rẽ trái?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Cả hai biển."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_138.png"
  },
  {
    "id": 139,
    "chapter": 4,
    "question": "Biển nào là biển \"Cấm đi ngược chiều\"?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Cả ba biển."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_139.png"
  },
  {
    "id": 140,
    "chapter": 4,
    "question": "Biển nào dưới đây các phương tiện không được phép đi vào?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 1 và biển 2."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_140.png"
  },
  {
    "id": 141,
    "chapter": 4,
    "question": "Khi gặp biển nào xe ưu tiên theo luật định vẫn phải dừng lại?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Cả ba biển."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_141.png"
  },
  {
    "id": 142,
    "chapter": 4,
    "question": "Biển nào cấm tất cả các loại xe cơ giới và thô sơ đi lại trên đường, trừ xe ưu tiên theo luật định (nếu đường vẫn cho xe chạy được)?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Cả hai biển."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_142.png"
  },
  {
    "id": 143,
    "chapter": 4,
    "question": "Biển báo này có ý nghĩa như thế nào?",
    "options": [
      "1. Tốc độ tối đa cho phép về ban đêm cho các phương tiện là 70 km/h.",
      "2. Tốc độ tối thiểu cho phép về ban đêm cho các phương tiện là 70 km/h."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_143.png"
  },
  {
    "id": 144,
    "chapter": 4,
    "question": "Biển này có hiệu lực đối với xe mô tô hai bánh, ba bánh chở hàng không?",
    "options": [
      "1. Có.",
      "2. Không."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_144.png"
  },
  {
    "id": 145,
    "chapter": 4,
    "question": "Biển này có ý nghĩa như thế nào?",
    "options": [
      "1. Cấm xe cơ giới (trừ xe ưu tiên theo luật định) đi thẳng.",
      "2. Cấm các loại xe cơ giới và xe mô tô (trừ xe ưu tiên theo luật định) đi về bên trái và bên phải.",
      "3. Hướng trái và phải không cấm xe cơ giới."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_145.png"
  },
  {
    "id": 146,
    "chapter": 4,
    "question": "Biển phụ đặt dưới biển cấm bóp còi có ý nghĩa như thế nào?",
    "options": [
      "1. Báo khoảng cách đến nơi cấm bóp còi.",
      "2. Chiều dài đoạn đường cấm bóp còi từ nơi đặt biển.",
      "3. Báo cấm dùng còi có độ vang xa 500m."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_146.png"
  },
  {
    "id": 147,
    "chapter": 4,
    "question": "Chiều dài đoạn đường 500 m từ nơi đặt biển này, người lái xe có được phép bấm còi không?",
    "options": [
      "1. Được phép.",
      "2. Không được phép."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_147.png"
  },
  {
    "id": 148,
    "chapter": 4,
    "question": "Biển nào xe mô tô hai bánh được đi vào?",
    "options": [
      "1. Biển 1 và biển 2.",
      "2. Biển 1 và biển 3.",
      "3. Biển 2 và biển 3."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_148.png"
  },
  {
    "id": 149,
    "chapter": 4,
    "question": "Biển nào xe mô tô hai bánh không được đi vào?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_149.png"
  },
  {
    "id": 150,
    "chapter": 4,
    "question": "Ba biển này có hiệu lực như thế nào?",
    "options": [
      "1. Cấm các loại xe ở biển phụ đi vào.",
      "2. Cấm các loại xe cơ giới đi vào trừ loại xe ở biển phụ."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_150.png"
  },
  {
    "id": 151,
    "chapter": 4,
    "question": "Biển này có ý nghĩa như thế nào?",
    "options": [
      "1. Cấm dừng xe về hướng bên trái.",
      "2. Cấm dừng và đỗ xe theo hướng bên phải.",
      "3. Được phép đỗ xe và dừng xe theo hướng bên phải."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_151.png"
  },
  {
    "id": 152,
    "chapter": 4,
    "question": "Biển nào là biển \"Tốc độ tối đa cho phép về ban đêm\"?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Cả hai biển."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_152.png"
  },
  {
    "id": 153,
    "chapter": 4,
    "question": "Biển nào báo hiệu hạn chế tốc độ của phương tiện không vượt quá trị số ghi trên biển?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_153.png"
  },
  {
    "id": 154,
    "chapter": 4,
    "question": "Số 50 ghi trên biển báo dưới đây có ý nghĩa như thế nào?",
    "options": [
      "1. Tốc độ tối đa các xe cơ giới được phép chạy.",
      "2. Tốc độ tối thiểu các xe cơ giới được phép chạy."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_154.png"
  },
  {
    "id": 155,
    "chapter": 4,
    "question": "Biển báo dưới đây có ý nghĩa như thế nào?",
    "options": [
      "1. Báo hiệu tốc độ tối đa cho phép các xe cơ giới chạy.",
      "2. Báo hiệu tốc độ tối thiểu cho phép các xe cơ giới chạy."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_155.png"
  },
  {
    "id": 156,
    "chapter": 4,
    "question": "Gặp biển nào người lái xe phải nhường đường cho người đi bộ?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_156.png"
  },
  {
    "id": 157,
    "chapter": 4,
    "question": "Biển nào chỉ đường dành cho người đi bộ, các loại xe không được đi vào khi gặp biển này?",
    "options": [
      "1. Biển 1.",
      "2. Biển 1 và biển 3.",
      "3. Biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_157.png"
  },
  {
    "id": 158,
    "chapter": 4,
    "question": "Biển nào báo hiệu \"Đường dành cho xe thô sơ\"?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_158.png"
  },
  {
    "id": 159,
    "chapter": 4,
    "question": "Biển nào báo hiệu sắp đến chỗ giao nhau nguy hiểm?",
    "options": [
      "1. Biển 1.",
      "2. Biển 1 và biển 2.",
      "3. Biển 2 và biển 3.",
      "4. Cả ba biển"
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 4. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_159.png"
  },
  {
    "id": 160,
    "chapter": 4,
    "question": "Biển nào báo hiệu \"Giao nhau với đường sắt có rào chắn\"?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2 và biển 3.",
      "3. Biển 3."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_160.png"
  },
  {
    "id": 161,
    "chapter": 4,
    "question": "Biển nào báo hiệu \"Giao nhau có tín hiệu đèn\"?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_161.png"
  },
  {
    "id": 162,
    "chapter": 4,
    "question": "Biển nào báo hiệu nguy hiểm giao nhau với đường sắt?",
    "options": [
      "1. Biển 1 và biển 2.",
      "2. Biển 1 và biển 3.",
      "3. Biển 2 và biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_162.png"
  },
  {
    "id": 163,
    "chapter": 4,
    "question": "Biển nào báo hiệu đường bộ giao nhau với đường sắt không có rào chắn?",
    "options": [
      "1. Biển 1 và biển 2.",
      "2. Biển 1 và biển 3.",
      "3. Biển 2 và biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_163.png"
  },
  {
    "id": 164,
    "chapter": 4,
    "question": "Biển nào báo hiệu sắp đến chỗ giao nhau giữa đường bộ và đường sắt?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3.",
      "4. Biển 1 và biển 3."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_164.png"
  },
  {
    "id": 165,
    "chapter": 4,
    "question": "Biển nào báo hiệu \"Cửa chui\"?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_165.png"
  },
  {
    "id": 166,
    "chapter": 4,
    "question": "Hai biển này có ý nghĩa như thế nào?",
    "options": [
      "1. Để chỉ nơi đường sắt giao vuông góc với đường bộ không có rào chắn.",
      "2. Để báo trước sắp đến vị trí giao cắt đường bộ với đường sắt cùng mức, không vuông góc và không có người gác, không có rào chắn.",
      "3. Nơi đường sắt giao nhau với đường bộ."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_166.png"
  },
  {
    "id": 167,
    "chapter": 4,
    "question": "Biển nào báo hiệu \"Hết đoạn đường ưu tiên\"?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_167.png"
  },
  {
    "id": 168,
    "chapter": 4,
    "question": "Biển nào báo hiệu, chỉ dẫn xe đi trên đường này được quyền ưu tiên qua nơi giao nhau?",
    "options": [
      "1. Biển 1 và biển 2.",
      "2. Biển 1 và biển 3.",
      "3. Biển 2 và biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_168.png"
  },
  {
    "id": 169,
    "chapter": 4,
    "question": "Biển nào báo hiệu \"Giao nhau với đường không ưu tiên\"?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3.",
      "4. Biển 2 và biển 3."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_169.png"
  },
  {
    "id": 170,
    "chapter": 4,
    "question": "Biển nào báo hiệu \"Giao nhau với đường ưu tiên\"?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_170.png"
  },
  {
    "id": 171,
    "chapter": 4,
    "question": "Biển nào báo hiệu \"Đường giao nhau\" của các tuyến đường cùng cấp?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_171.png"
  },
  {
    "id": 172,
    "chapter": 4,
    "question": "Biển nào báo hiệu \"Đường hai chiều\"?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_172.png"
  },
  {
    "id": 173,
    "chapter": 4,
    "question": "Biển nào báo hiệu phải giảm tốc độ, nhường đường cho xe cơ giới đi ngược chiều qua đường hẹp?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3"
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_173.png"
  },
  {
    "id": 174,
    "chapter": 4,
    "question": "Biển nào chỉ dẫn \"Được ưu tiên qua đường hẹp\"?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3.",
      "4. Biển 2 và biển 3."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_174.png"
  },
  {
    "id": 175,
    "chapter": 4,
    "question": "Biển nào báo hiệu \"Đường đôi\"?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_175.png"
  },
  {
    "id": 176,
    "chapter": 4,
    "question": "Biển nào báo hiệu \"Kết thúc đường đôi\"?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_176.png"
  },
  {
    "id": 177,
    "chapter": 4,
    "question": "Biển nào báo hiệu \"Giao nhau với đường hai chiều\"?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_177.png"
  },
  {
    "id": 178,
    "chapter": 4,
    "question": "Biển nào báo hiệu \"Giao nhau với đường hai chiều\"?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_178.png"
  },
  {
    "id": 179,
    "chapter": 4,
    "question": "Biển nào báo hiệu \"Chú ý chướng ngại vật\"?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2 và biển 3.",
      "3. Cả ba biển."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_179.png"
  },
  {
    "id": 180,
    "chapter": 4,
    "question": "Biển nào báo hiệu \"Đường hầm\"?",
    "options": [
      "1. Cả ba biển.",
      "2. Biển 2.",
      "3. Biển 2 và biển 3."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_180.png"
  },
  {
    "id": 181,
    "chapter": 4,
    "question": "Biển nào dưới đây là biển \"Cầu hẹp\"?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_181.png"
  },
  {
    "id": 182,
    "chapter": 4,
    "question": "Gặp biển nào người tham gia giao thông phải đi chậm và thận trọng đề phòng khả năng xuất hiện và di chuyển bất ngờ của trẻ em trên mặt đường?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_182.png"
  },
  {
    "id": 183,
    "chapter": 4,
    "question": "Biển nào chỉ dẫn nơi bắt đầu đoạn đường dành cho người đi bộ?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_183.png"
  },
  {
    "id": 184,
    "chapter": 4,
    "question": "Biển nào dưới đây báo hiệu gần đến đoạn đường thường có trẻ em đi ngang qua?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_184.png"
  },
  {
    "id": 185,
    "chapter": 4,
    "question": "Biển nào sau đây là biển \"Dốc xuống nguy hiểm\"?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_185.png"
  },
  {
    "id": 186,
    "chapter": 4,
    "question": "Biển báo này có ý nghĩa như thế nào?",
    "options": [
      "1. Báo hiệu đường có ổ gà, lồi lõm.",
      "2. Báo hiệu đường có gồ giảm tốc phía trước."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_186.png"
  },
  {
    "id": 187,
    "chapter": 4,
    "question": "Các biển báo này có ý nghĩa như thế nào?",
    "options": [
      "1. Để báo trước gần tới đoạn đường có hiện tượng đất đá từ trên ta luy dương sụt lở bất ngờ gây nguy hiểm cho xe cộ và người đi đường.",
      "2. Để báo trước nơi có kết cấu mặt đường rời rạc, khi phương tiện đi qua, làm cho các viên đá, sỏi văng lên gây nguy hiểm và mất an toàn cho người và phương tiện tham gia giao thông.",
      "3. Để cảnh báo những đoạn nền đường yếu, đoạn đường đang theo dõi lún mà việc vận hành xe ở tốc độ cao có thể gây nguy hiểm."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_187.png"
  },
  {
    "id": 188,
    "chapter": 4,
    "question": "Biển nào báo hiệu các phương tiện phải tuân thủ tốc độ tối đa cho phép trên từng làn đường?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Cả hai biển."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_188.png"
  },
  {
    "id": 189,
    "chapter": 4,
    "question": "Khi gặp biển nào thì các phương tiện không được đi vào, trừ xe ô tô và xe mô tô?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_189.png"
  },
  {
    "id": 190,
    "chapter": 4,
    "question": "Biển này có ý nghĩa như thế nào?",
    "options": [
      "1. Chỉ hướng đi phải theo.",
      "2. Biển báo hiệu cho người lái xe biết số lượng làn đường trên mặt đường và hướng đi trên mỗi làn đường phải theo.",
      "3. Chỉ hướng đường phải theo."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_190.png"
  },
  {
    "id": 191,
    "chapter": 4,
    "question": "Biển nào (đặt trước ngã ba, ngã tư) cho phép xe được rẽ sang hướng khác?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Không biển nào."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_191.png"
  },
  {
    "id": 192,
    "chapter": 4,
    "question": "Biển nào báo hiệu \"Hướng đi thẳng phải theo\"?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_192.png"
  },
  {
    "id": 193,
    "chapter": 4,
    "question": "Biển nào báo hiệu \"Đường một chiều\"?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Cả hai biển."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_193.png"
  },
  {
    "id": 194,
    "chapter": 4,
    "question": "Trong các biển dưới đây biển nào là biển \"Hết tốc độ tối đa cho phép\"?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_194.png"
  },
  {
    "id": 195,
    "chapter": 4,
    "question": "Trong các biển dưới đây biển nào là biển \"Hết tốc độ tối thiểu\"?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_195.png"
  },
  {
    "id": 196,
    "chapter": 4,
    "question": "Biển nào dưới đây báo hiệu hết cấm vượt?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3.",
      "4. Biển 2 và biển 3."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 4. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_196.png"
  },
  {
    "id": 197,
    "chapter": 4,
    "question": "Trong các biển dưới đây biển nào là biển \"Hết mọi lệnh cấm\"?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_197.png"
  },
  {
    "id": 198,
    "chapter": 4,
    "question": "Biển nào cho phép được quay đầu xe đi theo hướng ngược lại khi đặt biển trước ngã ba, ngã tư?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3.",
      "4. Không biển nào."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_198.png"
  },
  {
    "id": 199,
    "chapter": 4,
    "question": "Biển nào không cho phép rẽ phải?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3.",
      "4. Biển 1 và biển 3."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_199.png"
  },
  {
    "id": 200,
    "chapter": 4,
    "question": "Khi đến chỗ giao nhau, gặp biển nào thì người lái xe không được cho xe đi thẳng, phải rẽ sang hướng khác?",
    "options": [
      "1. Biển 1 và biển 2.",
      "2. Biển 1 và biển 3.",
      "3. Biển 2 và biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_200.png"
  },
  {
    "id": 201,
    "chapter": 4,
    "question": "Biển số 1 có ý nghĩa như thế nào?",
    "options": [
      "1. Biển chỉ dẫn hết cấm đỗ xe theo giờ trong khu vực.",
      "2. Biển chỉ dẫn hết hiệu lực khu vực đỗ xe trên các tuyến đường đối ngoại.",
      "3. Biển chỉ dẫn khu vực đỗ xe trên các tuyến đường đối ngoại."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_201.png"
  },
  {
    "id": 202,
    "chapter": 4,
    "question": "Biển nào chỉ dẫn cho người đi bộ sử dụng cầu vượt qua đường?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Cả hai biển.",
      "4. Không biển nào."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_202.png"
  },
  {
    "id": 203,
    "chapter": 4,
    "question": "Biển nào chỉ dẫn cho người đi bộ sử dụng hầm chui qua đường?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Cả hai biển.",
      "4. Không biển nào."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_203.png"
  },
  {
    "id": 204,
    "chapter": 4,
    "question": "Biển nào báo hiệu \"Nơi đỗ xe dành cho người khuyết tật\"?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_204.png"
  },
  {
    "id": 205,
    "chapter": 4,
    "question": "Gặp biển báo này, người tham gia giao thông phải xử lý như thế nào?",
    "options": [
      "1. Dừng xe tại khu vực có trạm Cảnh sát giao thông.",
      "2. Tiếp tục lưu thông với tốc độ bình thường.",
      "3. Phải giảm tốc độ đến mức an toàn và không được vượt khi đi qua khu vực này."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_205.png"
  },
  {
    "id": 206,
    "chapter": 4,
    "question": "Gặp biển báo dưới đây, người lái xe có bắt buộc phải chạy vòng theo đảo an toàn theo hướng mũi tên khi muốn chuyển hướng hay không?",
    "options": [
      "1. Bắt buộc.",
      "2. Không bắt buộc."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_206.png"
  },
  {
    "id": 207,
    "chapter": 4,
    "question": "Biển nào báo hiệu \"Cầu vượt liên thông\"?",
    "options": [
      "1. Biển 2 và biển 3.",
      "2. Biển 1 và biển 2.",
      "3. Biển 1 và biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_207.png"
  },
  {
    "id": 208,
    "chapter": 4,
    "question": "Biển số 1 có ý nghĩa như thế nào?",
    "options": [
      "1. Đi thẳng hoặc rẽ trái trên cầu vượt.",
      "2. Đi thẳng hoặc rẽ phải trên cầu vượt.",
      "3. Báo hiệu cầu vượt liên thông."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_208.png"
  },
  {
    "id": 209,
    "chapter": 4,
    "question": "Biển nào báo hiệu \"Tuyến đường cầu vượt cắt qua\"?",
    "options": [
      "1. Biển 1 và biển 2.",
      "2. Biển 1 và biển 3.",
      "3. Biển 2 và biển 3."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_209.png"
  },
  {
    "id": 210,
    "chapter": 4,
    "question": "Biển báo dưới đây có ý nghĩa như thế nào?",
    "options": [
      "1. Chỉ dẫn khoảng cách đến làn đường cứu nạn (làn thoát xe khẩn cấp).",
      "2. Báo hiệu đường cụt phía trước.",
      "3. Báo hiệu nút giao gần nhất phía trước.",
      "4. Báo hiệu trạm dừng nghỉ phía trước."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_210.png"
  },
  {
    "id": 211,
    "chapter": 4,
    "question": "Tại đoạn đường có biển \"Làn đường dành riêng cho từng loại xe\" dưới đây, các phương tiện có được phép chuyển sang làn khác để đi theo hành trình mong muốn khi đến gần nơi đường bộ giao nhau hay không?",
    "options": [
      "1. Được phép chuyển sang làn khác.",
      "2. Không được phép chuyển sang làn khác, chỉ được đi trong làn quy định theo biển."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_211.png"
  },
  {
    "id": 212,
    "chapter": 4,
    "question": "Biển nào chỉ dẫn người lái xe đi được cả hai hướng?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_212.png"
  },
  {
    "id": 213,
    "chapter": 4,
    "question": "Biển này có ý nghĩa như thế nào?",
    "options": [
      "1. Chỉ dẫn chướng ngại vật phía trước để cảnh báo phía trước có sự cản trở lưu thông bình thường (nằm bên trong phần xe chạy hay ngay sát phần đường xe chạy) và chỉ dẫn hướng đi qua đó cần đặt biển.",
      "2. Chỉ dẫn hướng rẽ để nhắc người điều khiển phương tiện chuẩn bị đổi hướng đi khi sắp vào đường cong nguy hiểm, có bán kính cong nhỏ."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_213.png"
  },
  {
    "id": 214,
    "chapter": 4,
    "question": "Vạch mũi tên chỉ hướng trên mặt đường nào dưới đây cho phép xe chỉ được đi thẳng và rẽ phải?",
    "options": [
      "1. Vạch 1.",
      "2. Vạch 2 và vạch 3.",
      "3. Vạch 3.",
      "4. Vạch 1 và vạch 2."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_214.png"
  },
  {
    "id": 215,
    "chapter": 4,
    "question": "Vạch kẻ đường nào dưới đây là vạch phân chia hai chiều xe chạy (vạch tim đường), xe không được lấn làn, không được đè lên vạch?",
    "options": [
      "1. Vạch 1.",
      "2. Vạch 2.",
      "3. Vạch 3.",
      "4. Cả ba vạch. CHƯƠNG VI. GIẢI THẾ SA HÌNH VÀ KỸ NĂNG XỬ LÝ TÌNH HUỐNG GIAO THÔNG"
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 4: Hệ thống biển báo hiệu đường bộ.",
    "image": "images/driving/cau_215.png"
  },
  {
    "id": 216,
    "chapter": 5,
    "question": "Theo hướng mũi tên, xe nào chấp hành đúng quy tắc giao thông?",
    "options": [
      "1. Xe khách, xe tải, xe mô tô.",
      "2. Xe tải, xe mô tô.",
      "3. Chỉ xe con."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_216.png"
  },
  {
    "id": 217,
    "chapter": 5,
    "question": "Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Xe tải, xe khách, xe con, xe mô tô.",
      "2. Xe tải, xe mô tô, xe khách, xe con.",
      "3. Xe khách, xe tải, xe con, xe mô tô.",
      "4. Xe mô tô, xe khách, xe tải, xe con."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_217.png"
  },
  {
    "id": 218,
    "chapter": 5,
    "question": "Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Xe tải, xe con, xe mô tô.",
      "2. Xe con, xe tải, xe mô tô.",
      "3. Xe mô tô, xe con, xe tải.",
      "4. Xe con, xe mô tô, xe tải."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_218.png"
  },
  {
    "id": 219,
    "chapter": 5,
    "question": "Trường hợp này xe nào được quyền đi trước?",
    "options": [
      "1. Xe mô tô.",
      "2. Xe con."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_219.png"
  },
  {
    "id": 220,
    "chapter": 5,
    "question": "Xe nào được quyền đi trước trong trường hợp này?",
    "options": [
      "1. Xe mô tô.",
      "2. Xe cứu thương đi làm nhiệm vụ cấp cứu."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_220.png"
  },
  {
    "id": 221,
    "chapter": 5,
    "question": "Theo tín hiệu đèn, xe nào được phép đi?",
    "options": [
      "1. Xe con và xe khách.",
      "2. Xe mô tô."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_221.png"
  },
  {
    "id": 222,
    "chapter": 5,
    "question": "Theo tín hiệu đèn, xe nào đi là đúng quy tắc giao thông?",
    "options": [
      "1. Xe khách, xe mô tô.",
      "2. Xe con, xe tải.",
      "3. Xe tải, xe mô tô."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_222.png"
  },
  {
    "id": 223,
    "chapter": 5,
    "question": "Các xe đi theo hướng mũi tên, những xe nào vi phạm quy tắc giao thông?",
    "options": [
      "1. Xe khách, xe tải, xe mô tô.",
      "2. Xe tải, xe con, xe mô tô.",
      "3. Xe khách, xe con, xe mô tô."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_223.png"
  },
  {
    "id": 224,
    "chapter": 5,
    "question": "Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Xe khách, xe tải, xe mô tô, xe con.",
      "2. Xe con, xe khách, xe tải, xe mô tô.",
      "3. Xe mô tô, xe tải, xe khách, xe con.",
      "4. Xe mô tô, xe tải, xe con, xe khách."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_224.png"
  },
  {
    "id": 225,
    "chapter": 5,
    "question": "Trong trường hợp này xe nào đỗ vi phạm quy tắc giao thông?",
    "options": [
      "1. Xe tải.",
      "2. Xe con và mô tô.",
      "3. Cả ba xe.",
      "4. Xe con và xe tải."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_225.png"
  },
  {
    "id": 226,
    "chapter": 5,
    "question": "Theo hướng mũi tên, những hướng nào xe gắn máy được phép đi?",
    "options": [
      "1. Cả ba hướng.",
      "2. Chỉ hướng 1 và 3.",
      "3. Chỉ hướng 1."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_226.png"
  },
  {
    "id": 227,
    "chapter": 5,
    "question": "Xe nào đỗ vi phạm quy tắc giao thông?",
    "options": [
      "1. Cả hai xe.",
      "2. Không xe nào vi phạm.",
      "3. Chỉ xe mô tô vi phạm.",
      "4. Chỉ xe tải vi phạm."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_227.png"
  },
  {
    "id": 228,
    "chapter": 5,
    "question": "Xe nào đỗ vi phạm quy tắc giao thông?",
    "options": [
      "1. Chỉ xe mô tô.",
      "2. Chỉ xe tải.",
      "3. Cả ba xe.",
      "4. Chỉ xe mô tô và xe tải."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_228.png"
  },
  {
    "id": 229,
    "chapter": 5,
    "question": "Xe nào được quyền đi trước trong trường hợp này?",
    "options": [
      "1. Xe con.",
      "2. Xe mô tô."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Xe mô tô đi thẳng và không có xe bên phải nên được quyền đi trước theo quy tắc giao thông.",
    "image": "images/driving/cau_229.png"
  },
  {
    "id": 230,
    "chapter": 5,
    "question": "Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Xe con (A), xe mô tô, xe con (B), xe đạp.",
      "2. Xe con (B), xe đạp, xe mô tô, xe con (A).",
      "3. Xe con (A), xe con (B), xe mô tô + xe đạp.",
      "4. Xe mô tô + xe đạp, xe con (A), xe con (B)."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 4. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_230.png"
  },
  {
    "id": 231,
    "chapter": 5,
    "question": "Xe nào được quyền đi trước trong trường hợp này?",
    "options": [
      "1. Xe mô tô.",
      "2. Xe con."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_231.png"
  },
  {
    "id": 232,
    "chapter": 5,
    "question": "Xe nào vi phạm quy tắc giao thông?",
    "options": [
      "1. Xe khách.",
      "2. Xe mô tô.",
      "3. Xe con.",
      "4. Xe con và xe mô tô."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_232.png"
  },
  {
    "id": 233,
    "chapter": 5,
    "question": "Các xe đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Các xe ở phía tay phải và tay trái của người điều khiển được phép đi thẳng.",
      "2. Cho phép các xe ở mọi hướng được phép rẽ phải.",
      "3. Tất cả các xe phải dừng lại trước ngã tư, trừ những xe đã ở trong ngã tư được phép tiếp tục đi."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_233.png"
  },
  {
    "id": 234,
    "chapter": 5,
    "question": "Theo hướng mũi tên, xe nào được phép đi?",
    "options": [
      "1. Xe mô tô, xe con.",
      "2. Xe con, xe tải.",
      "3. Xe mô tô, xe tải.",
      "4. Cả ba xe."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_234.png"
  },
  {
    "id": 235,
    "chapter": 5,
    "question": "Trong hình dưới đây, xe nào chấp hành đúng quy tắc giao thông?",
    "options": [
      "1. Chỉ xe khách, xe mô tô.",
      "2. Tất cả các loại xe trên.",
      "3. Không xe nào chấp hành đúng quy tắc giao thông."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_235.png"
  },
  {
    "id": 236,
    "chapter": 5,
    "question": "Theo hướng mũi tên, những hướng nào xe mô tô được phép đi?",
    "options": [
      "1. Cả ba hướng.",
      "2. Hướng 1 và 2.",
      "3. Hướng 1 và 3.",
      "4. Hướng 2 và 3."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_236.png"
  },
  {
    "id": 237,
    "chapter": 5,
    "question": "Trong trường hợp này, thứ tự xe đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Xe công an đi làm nhiệm vụ khẩn cấp, xe quân sự đi làm nhiệm vụ khẩn cấp, xe con + xe mô tô.",
      "2. Xe quân sự đi làm nhiệm vụ khẩn cấp, xe công an đi làm nhiệm vụ khẩn cấp, xe con + xe mô tô.",
      "3. Xe mô tô + xe con, xe quân sự đi làm nhiệm vụ khẩn cấp, xe công an đi làm nhiệm vụ khẩn cấp."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_237.png"
  },
  {
    "id": 238,
    "chapter": 5,
    "question": "Trong hình dưới, những xe nào vi phạm quy tắc giao thông?",
    "options": [
      "1. Xe con (E), xe mô tô (C).",
      "2. Xe tải (A), xe mô tô (D).",
      "3. Xe khách (B), xe mô tô (C).",
      "4. Xe khách (B), xe mô tô (D)."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_238.png"
  },
  {
    "id": 239,
    "chapter": 5,
    "question": "Trong hình dưới, những xe nào vi phạm quy tắc giao thông?",
    "options": [
      "1. Xe con (B), xe mô tô (C).",
      "2. Xe con (A), xe mô tô (C).",
      "3. Xe con (E), xe mô tô (D).",
      "4. Tất cả các loại xe trên."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_239.png"
  },
  {
    "id": 240,
    "chapter": 5,
    "question": "Theo tín hiệu đèn, xe nào phải dừng lại là đúng quy tắc giao thông?",
    "options": [
      "1. Xe khách, xe mô tô.",
      "2. Xe tải, xe mô tô.",
      "3. Xe con, xe tải."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_240.png"
  },
  {
    "id": 241,
    "chapter": 5,
    "question": "Bạn có được phép vượt xe mô tô phía trước không?",
    "options": [
      "1. Cho phép.",
      "2. Không được vượt."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_241.png"
  },
  {
    "id": 242,
    "chapter": 5,
    "question": "Theo tín hiệu đèn của xe cơ giới, xe nào vi phạm quy tắc giao thông?",
    "options": [
      "1. Xe mô tô.",
      "2. Xe ô tô con.",
      "3. Không xe nào vi phạm.",
      "4. Cả hai xe."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 4. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_242.png"
  },
  {
    "id": 243,
    "chapter": 5,
    "question": "Các xe đi theo hướng mũi tên, xe nào vi phạm quy tắc giao thông?",
    "options": [
      "1. Xe con.",
      "2. Xe tải.",
      "3. Xe con, xe tải"
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_243.png"
  },
  {
    "id": 244,
    "chapter": 5,
    "question": "Các xe đi theo hướng mũi tên, xe nào vi phạm quy tắc giao thông?",
    "options": [
      "1. Xe tải, xe con",
      "2. Xe khách, xe con",
      "3. Xe khách, xe tải"
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_244.png"
  },
  {
    "id": 245,
    "chapter": 5,
    "question": "Các xe đi theo hướng mũi tên, xe nào chấp hành đúng quy tắc giao thông?",
    "options": [
      "1. Xe tải, xe mô tô.",
      "2. Xe khách, xe mô tô.",
      "3. Xe tải, xe con.",
      "4. Xe mô tô, xe con."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_245.png"
  },
  {
    "id": 246,
    "chapter": 5,
    "question": "Các xe đi theo thứ tự nào là đúng quy tắc giao thông đường bộ?",
    "options": [
      "1. Xe của bạn, xe mô tô, xe con.",
      "2. Xe con, xe của bạn, xe mô tô.",
      "3. Xe mô tô, xe con, xe của bạn."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_246.png"
  },
  {
    "id": 247,
    "chapter": 5,
    "question": "Các xe đi theo thứ tự nào là đúng quy tắc giao thông đường bộ?",
    "options": [
      "1. Xe của bạn, xe mô tô, xe con.",
      "2. Xe con, xe của bạn, xe mô tô.",
      "3. Xe mô tô, xe con, xe của bạn."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_247.png"
  },
  {
    "id": 248,
    "chapter": 5,
    "question": "Các xe đi theo thứ tự nào là đúng quy tắc giao thông đường bộ?",
    "options": [
      "1. Xe của bạn, xe mô tô, xe đạp.",
      "2. Xe mô tô, xe đạp, xe của bạn.",
      "3. Xe đạp, xe mô tô, xe của bạn."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 3. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_248.png"
  },
  {
    "id": 249,
    "chapter": 5,
    "question": "Xe nào dừng đúng theo quy tắc giao thông?",
    "options": [
      "1. Xe con.",
      "2. Xe mô tô.",
      "3. Cả 2 xe đều đúng."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 1. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_249.png"
  },
  {
    "id": 250,
    "chapter": 5,
    "question": "Trong tình huống dưới đây, xe đầu kéo kéo rơ moóc (xe container) đang rẽ phải, xe con màu xanh và xe máy phía sau xe container đi như thế nào để bảo đảm an toàn?",
    "options": [
      "1. Vượt về phía bên phải để đi tiếp.",
      "2. Giảm tốc độ chờ xe container rẽ xong rồi tiếp tục đi.",
      "3. Vượt về phía bên trái để đi tiếp."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đáp án đúng là ý 2. Căn cứ theo chương 5: Giải các thế sa hình và kỹ năng xử lý tình huống.",
    "image": "images/driving/cau_250.png"
  }
],
  // 5. Mẹo thi sát hạch lý thuyết siêu tốc
    carParalyzed60: [
  {
    "id": 1,
    "question": "Hành vi nào dưới đây bị nghiêm cấm trên đường cao tốc?",
    "options": [
      "1. Lùi xe, quay đầu xe trên đường cao tốc; chạy xe ở làn dừng khẩn cấp khi không có sự cố.",
      "2. Đi đúng làn đường quy định và giữ khoảng cách an toàn với xe phía trước.",
      "3. Bật đèn xi-nhan khi chuyển làn đường."
    ],
    "answer": 1,
    "explain": "Tuyệt đối không được lùi xe, quay đầu xe hoặc chạy vào làn dừng xe khẩn cấp trên đường cao tốc. Vi phạm có nguy cơ gây tai nạn liên hoàn thảm khốc."
  },
  {
    "id": 2,
    "question": "Người điều khiển phương tiện giao thông đường bộ mà trong cơ thể có chất ma túy có bị nghiêm cấm hay không?",
    "options": [
      "1. Bị nghiêm cấm.",
      "2. Không bị nghiêm cấm.",
      "3. Bị nghiêm cấm tùy từng trường hợp."
    ],
    "answer": 1,
    "explain": "Hành vi điều khiển phương tiện mà trong cơ thể có chất ma túy bị nghiêm cấm tuyệt đối theo Luật Giao thông đường bộ."
  },
  {
    "id": 3,
    "question": "Người điều khiển xe ô tô, mô tô, máy kéo trên đường mà trong máu hoặc hơi thở có nồng độ cồn có bị nghiêm cấm không?",
    "options": [
      "1. Bị nghiêm cấm triệt để theo luật hiện hành.",
      "2. Chỉ cấm nếu nồng độ cồn vượt quá 50 mg/100 ml máu.",
      "3. Không bị cấm nếu lái xe trên đường vắng."
    ],
    "answer": 1,
    "explain": "Quy định 'Đã uống rượu bia - Không lái xe': Nghiêm cấm triệt để mọi hành vi điều khiển phương tiện khi có nồng độ cồn."
  },
  {
    "id": 4,
    "question": "Khi xảy ra tai nạn giao thông, những hành vi nào dưới đây bị nghiêm cấm?",
    "options": [
      "1. Cứu giúp người bị nạn và bảo vệ hiện trường.",
      "2. Xâm phạm tính mạng, sức khỏe, tài sản của người bị nạn và người gây tai nạn; bỏ trốn sau khi gây tai nạn để trốn tránh trách nhiệm.",
      "3. Báo ngay cho cơ quan công an hoặc y tế gần nhất."
    ],
    "answer": 2,
    "explain": "Nghiêm cấm xâm phạm người bị nạn hoặc bỏ trốn sau khi gây tai nạn để trốn tránh trách nhiệm."
  },
  {
    "id": 5,
    "question": "Người lái xe không được lùi xe ở những khu vực nào dưới đây?",
    "options": [
      "1. Ở khu vực cấm dừng và trên phần đường dành cho người đi bộ qua đường.",
      "2. Nơi đường bộ giao nhau, đường bộ giao cắt đường sắt, nơi tầm nhìn bị che khuất, trong hầm đường bộ, đường cao tốc.",
      "3. Cả ý 1 và ý 2."
    ],
    "answer": 3,
    "explain": "Không được lùi xe ở nơi giao nhau, đường sắt, đường cao tốc, hầm đường bộ, đường cong khuất tầm nhìn, trên vạch người đi bộ."
  },
  {
    "id": 6,
    "question": "Khi điều khiển xe qua đường sắt không có người gác, người lái xe phải xử lý như thế nào để đảm bảo an toàn?",
    "options": [
      "1. Dừng xe cách đường ray gần nhất tối thiểu 5 mét, quan sát an toàn, hạ kính nghe ngóng trước khi di chuyển.",
      "2. Tăng ga thật nhanh để vượt qua đường ray.",
      "3. Bấm còi liên tục và đi qua nếu thấy đường ray trống."
    ],
    "answer": 1,
    "explain": "Dừng xe cách ray gần nhất tối thiểu 5m, hạ kính, quan sát hai phía, chỉ qua khi chắc chắn không có tàu hỏa."
  },
  {
    "id": 7,
    "question": "Khi xe ô tô xuống dốc cao và dài, người lái xe cần thực hiện thao tác nào để đảm bảo an toàn?",
    "options": [
      "1. Về số không (N) và rà phanh chân liên tục để hãm tốc.",
      "2. Về số thấp (số 1 hoặc số 2), kết hợp phanh động cơ và phanh chân hợp lý, không tắt máy hoặc về số mo (N).",
      "3. Tắt động cơ xe để tiết kiệm nhiên liệu."
    ],
    "answer": 2,
    "explain": "Xuống dốc cao phải về số thấp để dùng phanh động cơ. Rà phanh liên tục hoặc về mo (N) sẽ làm cháy má phanh, mất phanh gây tai nạn chết người."
  },
  {
    "id": 8,
    "question": "Người lái xe phải làm gì khi điều khiển xe vượt qua vùng ngập nước sâu?",
    "options": [
      "1. Tăng tốc độ thật nhanh để đẩy sóng nước ra hai bên.",
      "2. Quan sát mức nước, về số thấp, giữ đều ga không giảm ga đột ngột, cẩn trọng tránh thủy kích.",
      "3. Đi sát theo sau xe tải lớn phía trước."
    ],
    "answer": 2,
    "explain": "Đi số thấp, giữ đều chân ga để tránh nước lọt vào ống xả gây thủy kích hỏng động cơ."
  },
  {
    "id": 9,
    "question": "Hành vi đua xe, cổ vũ đua xe trái phép, lạng lách đánh võng trên đường bộ bị xử lý như thế nào?",
    "options": [
      "1. Bị nghiêm cấm và bị truy cứu trách nhiệm hình sự theo quy định của pháp luật.",
      "2. Chỉ bị nhắc nhở nếu chưa gây ra tai nạn.",
      "3. Được phép nếu tổ chức vào ban đêm trên đường vắng."
    ],
    "answer": 1,
    "explain": "Đua xe trái phép và cổ vũ đua xe là hành vi cực kỳ nguy hiểm, bị nghiêm cấm triệt để và có thể bị phạt tù."
  },
  {
    "id": 10,
    "question": "Khi gặp xe ưu tiên (xe chữa cháy, quân sự, công an, cứu thương) đang phát tín hiệu còi, cờ, đèn ưu tiên, người tham gia giao thông phải làm gì?",
    "options": [
      "1. Nhanh chóng giảm tốc độ, tránh hoặc dừng lại sát lề đường bên phải để nhường đường, không được gây cản trở.",
      "2. Tăng tốc đi trước xe ưu tiên.",
      "3. Chạy bám sát theo sau xe ưu tiên để được đi nhanh."
    ],
    "answer": 1,
    "explain": "Phải giảm tốc độ, nhường đường ngay lập tức về phía bên phải, nghiêm cấm cản trở xe ưu tiên làm nhiệm vụ."
  },
  {
    "id": 11,
    "question": "Hành vi: 'Không thắt dây an toàn khi xe ô tô đang chạy' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Phải thắt dây an toàn tại tất cả vị trí có trang bị dây an toàn trên xe ô tô."
  },
  {
    "id": 12,
    "question": "Hành vi: 'Chở hành khách vượt quá tải trọng hoặc quá số người' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Nghiêm cấm chở quá tải, quá số người quy định gây mất an toàn kỹ thuật."
  },
  {
    "id": 13,
    "question": "Hành vi: 'Vượt xe tại nơi đường vòng cua khuất tầm nhìn' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Không được vượt xe ở khúc cua khuất tầm nhìn, đầu dốc hoặc nơi giao cắt."
  },
  {
    "id": 14,
    "question": "Hành vi: 'Quay đầu xe trong hầm đường bộ' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Nghiêm cấm quay đầu xe, lùi xe hoặc dừng đỗ xe tùy tiện trong hầm đường bộ."
  },
  {
    "id": 15,
    "question": "Hành vi: 'Dùng điện thoại di động cầm tay khi đang lái xe' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Nghiêm cấm sử dụng điện thoại, thiết bị âm thanh khi đang điều khiển phương tiện."
  },
  {
    "id": 16,
    "question": "Hành vi: 'Giao xe cho người không đủ điều kiện điều khiển' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Nghiêm cấm giao xe cho người chưa đủ tuổi, không có GPLX hoặc đã sử dụng ma túy/cồn."
  },
  {
    "id": 17,
    "question": "Hành vi: 'Mở cửa xe ô tô không quan sát phía sau' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Chỉ mở cửa khi xe đã dừng hẳn sát lề và đã quan sát kỹ phía sau không có xe đến gần."
  },
  {
    "id": 18,
    "question": "Hành vi: 'Đi vào làn đường có biển báo cấm phương tiện của mình' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Phải tuân thủ biển báo hiệu đường bộ, không được đi vào đường cấm, đường ngược chiều."
  },
  {
    "id": 19,
    "question": "Hành vi: 'Tự ý thay đổi kết cấu, tổng thành của xe ô tô' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Nghiêm cấm tự ý độ chế, thay đổi khung, động cơ, hệ thống phanh lái trái quy chuẩn."
  },
  {
    "id": 20,
    "question": "Hành vi: 'Không nhường đường cho người đi bộ tại nơi có vạch kẻ' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Phải giảm tốc độ và dừng lại nhường đường cho người đi bộ đang qua đường."
  },
  {
    "id": 21,
    "question": "Hành vi: 'Không thắt dây an toàn khi xe ô tô đang chạy' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Phải thắt dây an toàn tại tất cả vị trí có trang bị dây an toàn trên xe ô tô."
  },
  {
    "id": 22,
    "question": "Hành vi: 'Chở hành khách vượt quá tải trọng hoặc quá số người' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Nghiêm cấm chở quá tải, quá số người quy định gây mất an toàn kỹ thuật."
  },
  {
    "id": 23,
    "question": "Hành vi: 'Vượt xe tại nơi đường vòng cua khuất tầm nhìn' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Không được vượt xe ở khúc cua khuất tầm nhìn, đầu dốc hoặc nơi giao cắt."
  },
  {
    "id": 24,
    "question": "Hành vi: 'Quay đầu xe trong hầm đường bộ' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Nghiêm cấm quay đầu xe, lùi xe hoặc dừng đỗ xe tùy tiện trong hầm đường bộ."
  },
  {
    "id": 25,
    "question": "Hành vi: 'Dùng điện thoại di động cầm tay khi đang lái xe' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Nghiêm cấm sử dụng điện thoại, thiết bị âm thanh khi đang điều khiển phương tiện."
  },
  {
    "id": 26,
    "question": "Hành vi: 'Giao xe cho người không đủ điều kiện điều khiển' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Nghiêm cấm giao xe cho người chưa đủ tuổi, không có GPLX hoặc đã sử dụng ma túy/cồn."
  },
  {
    "id": 27,
    "question": "Hành vi: 'Mở cửa xe ô tô không quan sát phía sau' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Chỉ mở cửa khi xe đã dừng hẳn sát lề và đã quan sát kỹ phía sau không có xe đến gần."
  },
  {
    "id": 28,
    "question": "Hành vi: 'Đi vào làn đường có biển báo cấm phương tiện của mình' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Phải tuân thủ biển báo hiệu đường bộ, không được đi vào đường cấm, đường ngược chiều."
  },
  {
    "id": 29,
    "question": "Hành vi: 'Tự ý thay đổi kết cấu, tổng thành của xe ô tô' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Nghiêm cấm tự ý độ chế, thay đổi khung, động cơ, hệ thống phanh lái trái quy chuẩn."
  },
  {
    "id": 30,
    "question": "Hành vi: 'Không nhường đường cho người đi bộ tại nơi có vạch kẻ' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Phải giảm tốc độ và dừng lại nhường đường cho người đi bộ đang qua đường."
  },
  {
    "id": 31,
    "question": "Hành vi: 'Không thắt dây an toàn khi xe ô tô đang chạy' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Phải thắt dây an toàn tại tất cả vị trí có trang bị dây an toàn trên xe ô tô."
  },
  {
    "id": 32,
    "question": "Hành vi: 'Chở hành khách vượt quá tải trọng hoặc quá số người' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Nghiêm cấm chở quá tải, quá số người quy định gây mất an toàn kỹ thuật."
  },
  {
    "id": 33,
    "question": "Hành vi: 'Vượt xe tại nơi đường vòng cua khuất tầm nhìn' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Không được vượt xe ở khúc cua khuất tầm nhìn, đầu dốc hoặc nơi giao cắt."
  },
  {
    "id": 34,
    "question": "Hành vi: 'Quay đầu xe trong hầm đường bộ' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Nghiêm cấm quay đầu xe, lùi xe hoặc dừng đỗ xe tùy tiện trong hầm đường bộ."
  },
  {
    "id": 35,
    "question": "Hành vi: 'Dùng điện thoại di động cầm tay khi đang lái xe' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Nghiêm cấm sử dụng điện thoại, thiết bị âm thanh khi đang điều khiển phương tiện."
  },
  {
    "id": 36,
    "question": "Hành vi: 'Giao xe cho người không đủ điều kiện điều khiển' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Nghiêm cấm giao xe cho người chưa đủ tuổi, không có GPLX hoặc đã sử dụng ma túy/cồn."
  },
  {
    "id": 37,
    "question": "Hành vi: 'Mở cửa xe ô tô không quan sát phía sau' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Chỉ mở cửa khi xe đã dừng hẳn sát lề và đã quan sát kỹ phía sau không có xe đến gần."
  },
  {
    "id": 38,
    "question": "Hành vi: 'Đi vào làn đường có biển báo cấm phương tiện của mình' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Phải tuân thủ biển báo hiệu đường bộ, không được đi vào đường cấm, đường ngược chiều."
  },
  {
    "id": 39,
    "question": "Hành vi: 'Tự ý thay đổi kết cấu, tổng thành của xe ô tô' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Nghiêm cấm tự ý độ chế, thay đổi khung, động cơ, hệ thống phanh lái trái quy chuẩn."
  },
  {
    "id": 40,
    "question": "Hành vi: 'Không nhường đường cho người đi bộ tại nơi có vạch kẻ' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Phải giảm tốc độ và dừng lại nhường đường cho người đi bộ đang qua đường."
  },
  {
    "id": 41,
    "question": "Hành vi: 'Không thắt dây an toàn khi xe ô tô đang chạy' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Phải thắt dây an toàn tại tất cả vị trí có trang bị dây an toàn trên xe ô tô."
  },
  {
    "id": 42,
    "question": "Hành vi: 'Chở hành khách vượt quá tải trọng hoặc quá số người' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Nghiêm cấm chở quá tải, quá số người quy định gây mất an toàn kỹ thuật."
  },
  {
    "id": 43,
    "question": "Hành vi: 'Vượt xe tại nơi đường vòng cua khuất tầm nhìn' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Không được vượt xe ở khúc cua khuất tầm nhìn, đầu dốc hoặc nơi giao cắt."
  },
  {
    "id": 44,
    "question": "Hành vi: 'Quay đầu xe trong hầm đường bộ' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Nghiêm cấm quay đầu xe, lùi xe hoặc dừng đỗ xe tùy tiện trong hầm đường bộ."
  },
  {
    "id": 45,
    "question": "Hành vi: 'Dùng điện thoại di động cầm tay khi đang lái xe' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Nghiêm cấm sử dụng điện thoại, thiết bị âm thanh khi đang điều khiển phương tiện."
  },
  {
    "id": 46,
    "question": "Hành vi: 'Giao xe cho người không đủ điều kiện điều khiển' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Nghiêm cấm giao xe cho người chưa đủ tuổi, không có GPLX hoặc đã sử dụng ma túy/cồn."
  },
  {
    "id": 47,
    "question": "Hành vi: 'Mở cửa xe ô tô không quan sát phía sau' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Chỉ mở cửa khi xe đã dừng hẳn sát lề và đã quan sát kỹ phía sau không có xe đến gần."
  },
  {
    "id": 48,
    "question": "Hành vi: 'Đi vào làn đường có biển báo cấm phương tiện của mình' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Phải tuân thủ biển báo hiệu đường bộ, không được đi vào đường cấm, đường ngược chiều."
  },
  {
    "id": 49,
    "question": "Hành vi: 'Tự ý thay đổi kết cấu, tổng thành của xe ô tô' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Nghiêm cấm tự ý độ chế, thay đổi khung, động cơ, hệ thống phanh lái trái quy chuẩn."
  },
  {
    "id": 50,
    "question": "Hành vi: 'Không nhường đường cho người đi bộ tại nơi có vạch kẻ' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Phải giảm tốc độ và dừng lại nhường đường cho người đi bộ đang qua đường."
  },
  {
    "id": 51,
    "question": "Hành vi: 'Không thắt dây an toàn khi xe ô tô đang chạy' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Phải thắt dây an toàn tại tất cả vị trí có trang bị dây an toàn trên xe ô tô."
  },
  {
    "id": 52,
    "question": "Hành vi: 'Chở hành khách vượt quá tải trọng hoặc quá số người' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Nghiêm cấm chở quá tải, quá số người quy định gây mất an toàn kỹ thuật."
  },
  {
    "id": 53,
    "question": "Hành vi: 'Vượt xe tại nơi đường vòng cua khuất tầm nhìn' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Không được vượt xe ở khúc cua khuất tầm nhìn, đầu dốc hoặc nơi giao cắt."
  },
  {
    "id": 54,
    "question": "Hành vi: 'Quay đầu xe trong hầm đường bộ' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Nghiêm cấm quay đầu xe, lùi xe hoặc dừng đỗ xe tùy tiện trong hầm đường bộ."
  },
  {
    "id": 55,
    "question": "Hành vi: 'Dùng điện thoại di động cầm tay khi đang lái xe' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Nghiêm cấm sử dụng điện thoại, thiết bị âm thanh khi đang điều khiển phương tiện."
  },
  {
    "id": 56,
    "question": "Hành vi: 'Giao xe cho người không đủ điều kiện điều khiển' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Nghiêm cấm giao xe cho người chưa đủ tuổi, không có GPLX hoặc đã sử dụng ma túy/cồn."
  },
  {
    "id": 57,
    "question": "Hành vi: 'Mở cửa xe ô tô không quan sát phía sau' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Chỉ mở cửa khi xe đã dừng hẳn sát lề và đã quan sát kỹ phía sau không có xe đến gần."
  },
  {
    "id": 58,
    "question": "Hành vi: 'Đi vào làn đường có biển báo cấm phương tiện của mình' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Phải tuân thủ biển báo hiệu đường bộ, không được đi vào đường cấm, đường ngược chiều."
  },
  {
    "id": 59,
    "question": "Hành vi: 'Tự ý thay đổi kết cấu, tổng thành của xe ô tô' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Nghiêm cấm tự ý độ chế, thay đổi khung, động cơ, hệ thống phanh lái trái quy chuẩn."
  },
  {
    "id": 60,
    "question": "Hành vi: 'Không nhường đường cho người đi bộ tại nơi có vạch kẻ' có được phép thực hiện khi tham gia giao thông trên đường bộ không?",
    "options": [
      "1. Bị nghiêm cấm tuyệt đối vì gây nguy hiểm cao.",
      "2. Được phép thực hiện khi đường vắng người.",
      "3. Được phép nếu có sự đồng ý của người đi cùng."
    ],
    "answer": 1,
    "explain": "Phải giảm tốc độ và dừng lại nhường đường cho người đi bộ đang qua đường."
  }
],

  tipsData: {
    "meo-a1": [
        {
            "title": "1. Mẹo Các Từ Khóa 'Vàng' Chọn Ngay (Đúng 100%)",
            "content": "• Gặp các cụm từ này trong câu đáp án là <b>CHỌN NGAY</b>:<br>&nbsp;&nbsp;+ <i>'Bị nghiêm cấm'</i><br>&nbsp;&nbsp;+ <i>'Không được phép' / 'Không được mang vác'</i><br>&nbsp;&nbsp;+ <i>'Ủy ban nhân dân cấp tỉnh'</i><br>&nbsp;&nbsp;+ <i>'Cơ quan có thẩm quyền'</i><br>• Gặp đáp án có chữ <i>'Tất cả các ý nêu trên'</i>: Đọc kỹ, nếu câu hỏi liên quan nồng độ cồn, ma túy, tốc độ hoặc vượt xe thì chọn đúng 1 ý cụ thể."
        },
        {
            "title": "2. Mẹo Về Độ Tuổi & Niên Hạn Đơn Giản Dễ Nhớ",
            "content": "• <b>16 tuổi</b>: Xe gắn máy dung tích xi-lanh dưới 50cm³.<br>• <b>18 tuổi</b>: Mô tô hai bánh A1, A; Ô tô con B.<br>• <b>21 tuổi</b>: Ô tô tải C.<br>• <b>24 tuổi</b>: Ô tô chở khách D.<br>• <b>27 tuổi</b>: Ô tô chở khách E.<br>• <i>Quy luật vàng:</i> Mỗi bậc hạng giấy phép lái xe ô tô cách nhau đúng <b>3 tuổi</b>!"
        },
        {
            "title": "3. Mẹo 4 Bước Vàng Giải Mọi Thế Sa Hình",
            "content": "1. <b>Nhất chớm:</b> Xe nào đã tiến bánh trước vượt qua vạch người đi bộ vào ngã tư trước được quyền đi trước.<br>2. <b>Nhì ưu:</b> Thứ tự xe ưu tiên: <b>Hỏa - Sự - Công - Thương</b> (Cứu hỏa > Quân sự > Công an > Cứu thương).<br>3. <b>Tam đường:</b> Xe nằm trên đường ưu tiên (gặp biển hình thoi viền vàng hoặc biển tam giác xuôi) được đi trước.<br>4. <b>Tứ hướng:</b> Tại ngã tư cùng cấp: Xe bên phải không vướng đi trước > Rẽ phải > Đi thẳng > Rẽ trái."
        },
        {
            "title": "4. Mẹo Thi Thực Hành Chạy Vòng Số 8 (Đỗ 100%)",
            "content": "• Cài số <b>2 hoặc số 3</b> trước khi xuất phát để xe đầm máy, tay ga không bị giật.<br>• Mắt luôn hướng về phía trước theo hướng cua, tuyệt đối không nhìn xuống bánh trước.<br>• Giữ đều tay ga, hơi rà nhẹ phanh chân (phanh sau) để kiểm soát tốc độ khi vào khúc cua hẹp.<br>• Vào vòng số 8 rẽ phải trước, chạy hết 1 vòng rưỡi rồi tiến ra hình số 3."
        }
    ],
    "meo-a": [
        {
            "title": "1. Quy Chuẩn Giấy Phép Lái Xe Hạng A (Luật Mới 2026)",
            "content": "• Hạng A dành cho xe mô tô hai bánh có dung tích xi-lanh <b>trên 125 cm³</b> (hoặc động cơ điện trên 11 kW).<br>• Người có GPLX hạng A được phép điều khiển toàn bộ các loại xe quy định cho bằng A1.<br>• Sát hạch lý thuyết: Gồm 25 câu hỏi trong 19 phút, yêu cầu đạt từ <b>23/25 câu</b> trở lên và <b>không được sai câu điểm liệt</b>."
        },
        {
            "title": "2. Kỹ Thuật Điều Khiển Xe Phân Khối Lớn An Toàn",
            "content": "• Phanh an toàn: Kết hợp đồng thời cả phanh trước và phanh sau, bóp côn khi xe gần dừng hẳn để tránh chết máy.<br>• Ôm cua tốc độ cao: Dùng kỹ thuật Counter-Steering (đẩy nhẹ tay lái phía muốn cua), nghiêng người theo thân xe.<br>• Đi đường đèo dốc: Xuống dốc bằng số nào thì lên dốc bằng số đó, không rà phanh liên tục gây sôi dầu phanh."
        }
    ],
    "meo-b": [
        {
            "title": "1. Mẹo Tốc Độ Ô Tô Con (Hạng B)",
            "content": "• <b>Trong khu vực đông dân cư:</b><br>&nbsp;&nbsp;+ Đường đôi có dải phân cách giữa: Tối đa <b>60 km/h</b>.<br>&nbsp;&nbsp;+ Đường hai chiều không có dải phân cách: Tối đa <b>50 km/h</b>.<br>• <b>Ngoài khu vực đông dân cư:</b><br>&nbsp;&nbsp;+ Đường đôi có dải phân cách giữa: Ô tô con tối đa <b>90 km/h</b>.<br>&nbsp;&nbsp;+ Đường hai chiều: Ô tô con tối đa <b>80 km/h</b>."
        },
        {
            "title": "2. Mẹo Khoảng Cách An Toàn Trên Đường Cao Tốc",
            "content": "• Tốc độ 60 km/h: Giữ khoảng cách tối thiểu <b>35 mét</b>.<br>• Tốc độ 60 - 80 km/h: Giữ khoảng cách tối thiểu <b>55 mét</b>.<br>• Tốc độ 80 - 100 km/h: Giữ khoảng cách tối thiểu <b>70 mét</b>.<br>• Tốc độ 100 - 120 km/h: Giữ khoảng cách tối thiểu <b>100 mét</b>.<br>• Thời tiết mưa, sương mù, trơn trượt: Giảm tốc và tăng gấp đôi khoảng cách an toàn."
        },
        {
            "title": "3. Mẹo 11 Bài Sa Hình Sát Hạch Lái Xe Ô Tô Hạng B",
            "content": "• <b>Bài xuất phát:</b> Bật xi-nhan trái, nghe 'tính toong' tắt xi-nhan ngay.<br>• <b>Bài dừng xe nhường người đi bộ:</b> Căn cột Stop ngang vai hoặc cách vạch 20cm.<br>• <b>Bài dừng & khởi hành ngang dốc (Dốc Ba-đơ):</b> Kéo phanh tay, đạp đều ga đến 2000-2500 vòng/phút, nhả côn từ từ khi đầu xe rung rung thì hạ phanh tay.<br>• <b>Ghép xe vào nơi đỗ (dọc & ngang):</b> Gương ngang góc chuồng đánh hết lái, thân xe tạo góc 45 độ với cửa chuồng rồi lùi thẳng."
        }
    ],
    "meo-c": [
        {
            "title": "1. Quy Chuẩn Kỹ Thuật Xe Tải Hạng C",
            "content": "• Hạng C điều khiển ô tô tải có trọng tải <b>trên 7.500 kg</b>, máy kéo kéo rơ moóc trên 3.500 kg và các loại xe hạng B, C1.<br>• Độ tuổi thi bằng C: Đủ <b>21 tuổi</b>.<br>• Niên hạn sử dụng ô tô tải: Tối đa <b>25 năm</b> tính từ năm sản xuất.<br>• Sát hạch lý thuyết: 40 câu hỏi trong 24 phút, yêu cầu đạt từ <b>36/40 câu</b> trở lên và <b>không sai câu điểm liệt</b>."
        },
        {
            "title": "2. Kỹ Thuật Lái Xe Tải Trọng Tải Lớn",
            "content": "• Điểm mù xe tải rất lớn: Tránh đi sát sườn bên phải và ngay sát đầu/đuôi xe tải.<br>• Vào cua xe tải: Mở rộng vòng cua trước khi ngoặt lái để đuôi xe không chém vạch.<br>• Xuống dốc dài chở nặng: Bắt buộc dùng số thấp và phanh khí xả (phanh cup-pô), tuyệt đối không để trôi tự do."
        }
    ]
}
};

// Trạng thái thi thử hiện tại
let activeExam = {
  type: 'A1',
  modeName: 'Đề Thi Thử Ngẫu Nhiên A1 (25 Câu)',
  questions: [],
  currentIndex: 0,
  userAnswers: {},
  timerInterval: null,
  timeLeft: 19 * 60, // 19 phút
  isSubmitted: false
};

// 1. Chuyển đổi tab trong trang Driving
function switchDrivingTab(tabId, btnEl) {
  document.querySelectorAll('.driving-subnav-btn').forEach(b => {
    b.classList.remove('active');
    b.style.background = 'transparent';
    b.style.color = '#334155';
    b.style.fontWeight = '600';
  });

  if (btnEl) {
    btnEl.classList.add('active');
    btnEl.style.background = '#2563EB';
    btnEl.style.color = '#FFF';
    btnEl.style.fontWeight = '700';
  }

  // Ẩn tất cả section
  document.querySelectorAll('.driving-tab-pane').forEach(p => p.style.display = 'none');

  const targetPane = document.getElementById('pane-' + tabId);
  if (targetPane) {
    targetPane.style.display = 'block';
  }

  if (tabId === 'thi-a1') {
    renderExamSetsGridA1();
    updateWrongQuestionsBadge();
    updateLearningDashboard();
  } else if (tabId === 'tracuu600') {
    renderQuestionLookup(0, '');
  } else if (tabId === 'cau-liet-20') {
    renderParalyzedQuestions();
  } else if (tabId === 'cau-liet-60') {
    renderCar60Paralyzed();
  } else if (tabId.startsWith('meo-')) {
    renderDrivingTips(tabId);
  }
}

// 2. Tương tác Chọn xe cần bằng gì
function selectVehicleType(typeKey, btnEl) {
  document.querySelectorAll('.veh-btn').forEach(b => {
    b.style.background = '#FFFFFF';
    b.style.color = '#0F172A';
    b.style.borderColor = '#E2E8F0';
  });

  if (btnEl) {
    btnEl.style.background = '#0F172A';
    btnEl.style.color = '#FFFFFF';
    btnEl.style.borderColor = '#0F172A';
  }

  const v = DRIVING_DATA_2026.vehicleTypes[typeKey];
  if (!v) return;

  const box = document.getElementById('vehicleResultBox');
  if (box) {
    box.innerHTML = `
      <div style="background:#F0FDF4; border:1.5px solid #86EFAC; border-radius:14px; padding:24px; height:100%; display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span style="color:#16A34A; font-weight:800; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em;">${v.badge}</span>
            <span style="color:#16A34A; font-size:1.2rem;">✔</span>
          </div>
          <h3 style="font-size:1.35rem; color:#0F172A; font-weight:800; margin-bottom:10px;">${v.recommend}</h3>
          <p style="color:#334155; font-size:0.92rem; line-height:1.6;">${v.desc}</p>
        </div>
        <div style="margin-top:20px;">
          <button type="button" onclick="switchDrivingTab('${v.route}', document.querySelector('[data-tab=${v.route}]'))" style="background:#0F172A; color:#FFF; padding:10px 22px; border-radius:8px; font-weight:700; font-size:0.88rem; cursor:pointer; display:inline-flex; align-items:center; gap:6px;">
            ${v.routeName}
          </button>
        </div>
      </div>
    `;
  }
}

// 3. Tương tác Chọn tuổi học hạng nào
function selectAgeOption(ageKey, btnEl) {
  document.querySelectorAll('.age-btn').forEach(b => {
    b.style.background = '#FFFFFF';
    b.style.color = '#0F172A';
    b.style.borderColor = '#E2E8F0';
  });

  if (btnEl) {
    btnEl.style.background = '#0F172A';
    btnEl.style.color = '#FFFFFF';
    btnEl.style.borderColor = '#0F172A';
  }

  const a = DRIVING_DATA_2026.ageRules[ageKey];
  if (!a) return;

  const box = document.getElementById('ageResultBox');
  if (box) {
    box.innerHTML = `
      <div style="background:#F0FDF4; border:1.5px solid #86EFAC; border-radius:14px; padding:24px; height:100%; display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div style="color:#16A34A; font-weight:800; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:8px;">${a.badge}</div>
          <h3 style="font-size:1.3rem; color:#0F172A; font-weight:800; margin-bottom:10px;">${a.recommend}</h3>
          <p style="color:#334155; font-size:0.92rem; line-height:1.6;">${a.desc}</p>
        </div>
        <div style="margin-top:20px;">
          <button type="button" onclick="switchDrivingTab('lotrinh', document.querySelector('[data-tab=lotrinh]'))" style="background:#059669; color:#FFF; padding:10px 22px; border-radius:8px; font-weight:700; font-size:0.88rem; cursor:pointer;">
            ${a.actionText}
          </button>
        </div>
      </div>
    `;
  }
}

// 4. Sinh bộ câu hỏi theo chuẩn cấu trúc thi thật (25 câu A1)
function generateA1ExamQuestions(mode = 'random') {
  if (typeof mode === 'string' && mode.startsWith('set_')) {
    const sNum = parseInt(mode.replace('set_', '')) || 1;
    return generateFixedExamA1(sNum);
  }
  const all = DRIVING_DATA_2026.examA1Questions || [];
  
  if (mode === 'paralyzed') {
    // Thẻ 1: 20 Câu Điểm Liệt
    return all.filter(q => q.isParalyzed);
  }
  if (mode === 'chapter1') {
    // Thẻ 4: Thi Khái Niệm & Quy Tắc (100 câu)
    return all.filter(q => q.chapter === 1);
  }
  if (mode === 'chapter2') {
    // Thẻ 5: Thi Văn Hoá Giao Thông (10 câu)
    return all.filter(q => q.chapter === 2);
  }
  if (mode === 'chapter3') {
    // Thẻ 6: Thi Kỹ Thuật Lái Xe (15 câu)
    return all.filter(q => q.chapter === 3);
  }
  if (mode === 'chapter4') {
    // Thẻ 7: Thi Biển Báo (90 câu)
    return all.filter(q => q.chapter === 4);
  }
  if (mode === 'chapter5') {
    // Thẻ 8: Thi Sa Hình (35 câu)
    return all.filter(q => q.chapter === 5);
  }
  if (mode === 'full') {
    // Thẻ 10: Thi Toàn Bộ 250 Câu
    return [...all];
  }
  if (mode === 'wrong') {
    // Thẻ 3: Thi Các Câu Sai trong lịch sử
    const wrongIds = getStoredWrongQuestions();
    if (wrongIds.length === 0) return [];
    return all.filter(q => wrongIds.includes(q.id));
  }

  // Thẻ 2 (Bộ Đề Ngẫu Nhiên 25 câu) & Thẻ 9 (Thi Tốc Độ 25 câu):
  // CẤU TRÚC ĐỀ SÁT HẠCH A1 CHUẨN BỘ CÔNG AN (ĐÚNG 25 CÂU)
  // - 01 câu điểm liệt
  // - 08 câu khái niệm & quy tắc (Chương 1)
  // - 01 câu văn hóa giao thông (Chương 2)
  // - 01 câu kỹ thuật lái xe (Chương 3)
  // - 08 câu hệ thống biển báo (Chương 4)
  // - 06 câu giải thế sa hình (Chương 5)
  // Tổng cộng: 1 + 8 + 1 + 1 + 8 + 6 = 25 câu
  const paralyzedList = all.filter(q => q.isParalyzed);
  const chapter1List = all.filter(q => q.chapter === 1 && !q.isParalyzed);
  const chapter2List = all.filter(q => q.chapter === 2 && !q.isParalyzed);
  const chapter3List = all.filter(q => q.chapter === 3 && !q.isParalyzed);
  const chapter4List = all.filter(q => q.chapter === 4 && !q.isParalyzed);
  const chapter5List = all.filter(q => q.chapter === 5 && !q.isParalyzed);

  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

  const selected = [
    ...shuffle(paralyzedList).slice(0, 1),
    ...shuffle(chapter1List).slice(0, 8),
    ...shuffle(chapter2List).slice(0, 1),
    ...shuffle(chapter3List).slice(0, 1),
    ...shuffle(chapter4List).slice(0, 8),
    ...shuffle(chapter5List).slice(0, 6)
  ];

  if (selected.length < 25) {
    const remaining = all.filter(q => !selected.some(s => s.id === q.id));
    selected.push(...shuffle(remaining).slice(0, 25 - selected.length));
  }

  return selected.slice(0, 25);
}


// 5. Trình Thi Thử Sát Hạch Trực Tuyến Live Simulator
function startExamSimulation(rank = 'A1', mode = 'random', title = 'Đề Thi Thử Sát Hạch A1 (25 Câu)') {
  activeExam.type = rank;
  activeExam.modeName = title;
  
  if (rank === 'A1') {
    if (mode === 'wrong') {
      const wrongList = generateA1ExamQuestions('wrong');
      if (wrongList.length === 0) {
        showToast('Bạn chưa có câu nào làm sai trong lịch sử làm bài! Hãy bắt đầu thi một đề ngẫu nhiên trước.');
        return;
      }
      activeExam.questions = wrongList;
      activeExam.timeLeft = Math.max(5, Math.ceil(wrongList.length * 0.8)) * 60;
    } else if (mode === 'full') {
      activeExam.questions = generateA1ExamQuestions('full');
      activeExam.timeLeft = 70 * 60; // 70 phút cho 250 câu
    } else if (mode === 'speed') {
      activeExam.questions = generateA1ExamQuestions('speed');
      activeExam.timeLeft = 5 * 60; // 5 phút thi tốc độ
    } else if (mode === 'paralyzed') {
      activeExam.questions = generateA1ExamQuestions('paralyzed');
      activeExam.timeLeft = 15 * 60; // 15 phút cho 20 câu liệt
    } else if (mode === 'chapter1') {
      activeExam.questions = generateA1ExamQuestions('chapter1');
      activeExam.timeLeft = 35 * 60; // 35 phút cho 100 câu
    } else if (mode === 'chapter4') {
      activeExam.questions = generateA1ExamQuestions('chapter4');
      activeExam.timeLeft = 30 * 60; // 30 phút cho 90 câu biển báo
    } else if (mode === 'chapter5') {
      activeExam.questions = generateA1ExamQuestions('chapter5');
      activeExam.timeLeft = 15 * 60; // 15 phút cho 35 câu sa hình
    } else if (mode === 'chapter2' || mode === 'chapter3') {
      activeExam.questions = generateA1ExamQuestions(mode);
      activeExam.timeLeft = 10 * 60;
    } else {
      activeExam.questions = generateA1ExamQuestions('random');
      activeExam.timeLeft = 19 * 60; // 19 phút chuẩn Bộ Công An
    }
  } else if (rank === 'A') {
    activeExam.questions = generateA1ExamQuestions(mode);
    activeExam.timeLeft = 19 * 60; // 19 phút, đạt 23/25
  } else if (rank === 'B') {
    const all = DRIVING_DATA_2026.examA1Questions || [];
    const carP = DRIVING_DATA_2026.carParalyzed60 || [];
    const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());
    const pSample = shuffle(carP).slice(0, 2).map(q => ({...q, isParalyzed: true}));
    const regularSample = shuffle(all.filter(q => !q.isParalyzed)).slice(0, 33);
    activeExam.questions = shuffle([...pSample, ...regularSample]);
    activeExam.timeLeft = 22 * 60; // 22 phút, đạt 32/35
  } else if (rank === 'C') {
    const all = DRIVING_DATA_2026.examA1Questions || [];
    const carP = DRIVING_DATA_2026.carParalyzed60 || [];
    const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());
    const pSample = shuffle(carP).slice(0, 2).map(q => ({...q, isParalyzed: true}));
    const regularSample = shuffle(all.filter(q => !q.isParalyzed)).slice(0, 38);
    activeExam.questions = shuffle([...pSample, ...regularSample]);
    activeExam.timeLeft = 24 * 60; // 24 phút, đạt 36/40
  } else {
    activeExam.questions = generateA1ExamQuestions(mode);
    activeExam.timeLeft = 19 * 60;
  }

  activeExam.currentIndex = 0;
  activeExam.userAnswers = {};
  activeExam.isSubmitted = false;

  if (activeExam.timerInterval) clearInterval(activeExam.timerInterval);

  activeExam.timerInterval = setInterval(() => {
    if (activeExam.timeLeft > 0) {
      activeExam.timeLeft--;
      renderExamTimer();
    } else {
      clearInterval(activeExam.timerInterval);
      submitExamResult();
    }
  }, 1000);

  openExamLiveModal();
}

function openExamLiveModal() {
  const modal = document.getElementById('examLiveSimulatorModal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    renderExamUI();
  }
}

function closeExamLiveModal() {
  if (activeExam.timerInterval) clearInterval(activeExam.timerInterval);
  const modal = document.getElementById('examLiveSimulatorModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

function renderExamTimer() {
  const m = Math.floor(activeExam.timeLeft / 60);
  const s = activeExam.timeLeft % 60;
  const el = document.getElementById('modalExamCountdownBadge');
  if (el) el.textContent = `⏱️ ${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

function renderExamUI() {
  const q = activeExam.questions[activeExam.currentIndex];
  if (!q) return;

  const total = activeExam.questions.length;
  const titleEl = document.getElementById('modalExamTitle');
  if (titleEl) titleEl.textContent = activeExam.modeName;

  // Render question number palette on the left
  const numBox = document.getElementById('modalExamQuestionNumbers');
  if (numBox) {
    numBox.innerHTML = activeExam.questions.map((item, idx) => {
      const isAns = (activeExam.userAnswers[idx] !== undefined);
      const isCur = (idx === activeExam.currentIndex);
      let bg = '#FFFFFF';
      let color = '#334155';
      let border = '#CBD5E1';

      if (isAns) {
        bg = '#ECFDF5';
        color = '#059669';
        border = '#10B981';
      }
      if (isCur) {
        bg = isAns ? '#D1FAE5' : '#EFF6FF';
        color = '#2563EB';
        border = '#2563EB';
      }

      return `
        <button type="button" onclick="goToExamQuestion(${idx})" style="width:36px; height:36px; border-radius:8px; font-weight:700; font-size:0.85rem; cursor:pointer; border:1.5px solid ${border}; background:${bg}; color:${color}; ${isCur ? 'box-shadow:0 0 0 2px rgba(37,99,235,0.3);' : ''}">
          ${idx + 1}
        </button>
      `;
    }).join('');
  }

  // Render main question area
  const contentBox = document.getElementById('modalExamQuestionContent');
  if (contentBox) {
    const currentAnswer = activeExam.userAnswers[activeExam.currentIndex];

    contentBox.innerHTML = `
      <div style="background:#FFF; border:1px solid #E2E8F0; border-radius:14px; padding:24px; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <span style="font-weight:800; color:#2563EB; font-size:1rem;">Câu hỏi ${activeExam.currentIndex + 1} / ${total} (Mã câu: #${q.id})</span>
          ${q.isParalyzed ? '<span style="background:#FEF2F2; color:#DC2626; border:1px solid #FCA5A5; padding:3px 10px; border-radius:20px; font-size:0.75rem; font-weight:800;">⚠️ CÂU ĐIỂM LIỆT</span>' : ''}
        </div>
        <h3 style="font-size:1.15rem; color:#0F172A; line-height:1.5; margin-bottom:16px;">${q.question}</h3>
        
        ${q.image ? `<div style="text-align:center; margin-bottom:18px; background:#F8FAFC; padding:12px; border-radius:10px; border:1px solid #E2E8F0;"><img src="${q.image}" onerror="handleDrivingImageError(this, ${q.id})" alt="Hình minh họa câu ${q.id}" style="max-width:100%; max-height:280px; object-fit:contain; border-radius:8px; box-shadow:0 1px 4px rgba(0,0,0,0.05);"></div>` : ''}

        <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:24px;">
          ${q.options.map((opt, oIdx) => {
            const ansNum = oIdx + 1;
            const isChecked = (currentAnswer === ansNum);
            return `
              <div onclick="selectExamAnswer(${ansNum})" style="display:flex; align-items:center; gap:14px; padding:14px 18px; border:2px solid ${isChecked ? '#2563EB' : '#E2E8F0'}; background:${isChecked ? '#EFF6FF' : '#FFFFFF'}; border-radius:10px; cursor:pointer; transition:all 0.15s; user-select:none;">
                <input type="radio" name="modalExamAns_${activeExam.currentIndex}" ${isChecked ? 'checked' : ''} style="width:20px; height:20px; cursor:pointer; accent-color:#2563EB;" onchange="selectExamAnswer(${ansNum})">
                <span style="font-size:0.98rem; color:${isChecked ? '#1E40AF' : '#1E293B'}; font-weight:${isChecked ? '700' : '500'}; line-height:1.45;">${opt}</span>
              </div>
            `;
          }).join('')}
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; padding-top:18px; border-top:1px solid #F1F5F9;">
          <button type="button" onclick="goToExamQuestion(${activeExam.currentIndex - 1})" ${activeExam.currentIndex === 0 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''} style="background:#F1F5F9; color:#334155; border:1px solid #CBD5E1; padding:10px 18px; border-radius:8px; font-weight:700; font-size:0.88rem; cursor:pointer;">
            ⬅ Câu trước
          </button>
          
          <button type="button" onclick="confirmSubmitExam()" style="background:#D97706; color:#FFF; border:none; padding:10px 22px; border-radius:8px; font-weight:800; font-size:0.9rem; cursor:pointer; display:flex; align-items:center; gap:6px;">
            🏁 Nộp bài sát hạch
          </button>
          
          <button type="button" onclick="goToExamQuestion(${activeExam.currentIndex + 1})" ${activeExam.currentIndex === total - 1 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''} style="background:#2563EB; color:#FFF; border:none; padding:10px 18px; border-radius:8px; font-weight:700; font-size:0.88rem; cursor:pointer;">
            Câu tiếp ➡
          </button>
        </div>
      </div>
    `;
  }
}

function selectExamAnswer(ansNumber) {
  if (activeExam.isSubmitted) return;
  activeExam.userAnswers[activeExam.currentIndex] = ansNumber;
  renderExamUI();
}

function goToExamQuestion(idx) {
  if (idx >= 0 && idx < activeExam.questions.length) {
    activeExam.currentIndex = idx;
    renderExamUI();
  }
}

function confirmSubmitExam() {
  const total = activeExam.questions.length;
  const answered = Object.keys(activeExam.userAnswers).length;
  if (answered < total) {
    const remain = total - answered;
    if (confirm(`Bạn còn ${remain} câu chưa trả lời. Bạn có chắc chắn muốn nộp bài sát hạch không?`)) {
      submitExamResult();
    }
  } else {
    submitExamResult();
  }
}

function submitExamResult() {
  if (activeExam.timerInterval) clearInterval(activeExam.timerInterval);
  activeExam.isSubmitted = true;

  let correctCount = 0;
  let failedParalyzed = false;
  const currentWrongIds = [];

  activeExam.questions.forEach((q, idx) => {
    const userAns = activeExam.userAnswers[idx];
    if (userAns === q.answer) {
      correctCount++;
    } else {
      currentWrongIds.push(q.id);
      if (q.isParalyzed) {
        failedParalyzed = true;
      }
    }
  });

  // Lưu câu sai vào localStorage
  if (currentWrongIds.length > 0) {
    saveWrongQuestions(currentWrongIds);
  }

  const total = activeExam.questions.length;
  const passScore = (total === 25) ? 21 : Math.ceil(total * 0.84);
  const isPass = (correctCount >= passScore) && !failedParalyzed;

  const contentBox = document.getElementById('modalExamQuestionContent');
  if (contentBox) {
    contentBox.innerHTML = `
      <div style="background:#FFF; border:1px solid #E2E8F0; border-radius:14px; padding:32px; text-align:center; box-shadow:0 4px 16px rgba(0,0,0,0.06);">
        <div style="font-size:3.5rem; margin-bottom:12px;">${isPass ? '🎉' : '❌'}</div>
        <h2 style="font-size:1.8rem; font-weight:800; color:${isPass ? '#16A34A' : '#DC2626'}; margin-bottom:8px;">
          ${isPass ? 'CHÚC MỪNG BẠN ĐÃ ĐẠT!' : 'RẤT TIẾC, BẠN CHƯA ĐẠT!'}
        </h2>
        <p style="font-size:1.05rem; color:#475569; margin-bottom:16px;">
          Kết quả: <b>${correctCount} / ${total}</b> câu đúng (Yêu cầu đạt: ≥ ${passScore}/${total})
        </p>
        ${failedParalyzed ? '<div style="background:#FEF2F2; color:#DC2626; border:1px solid #FCA5A5; padding:10px 16px; border-radius:8px; display:inline-block; font-weight:700; margin-bottom:16px;">⚠️ Bạn đã làm sai câu điểm liệt nên bài thi không đạt.</div>' : ''}

        <div style="margin:20px 0; text-align:left; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h4 style="font-size:1rem; font-weight:800; color:#0F172A; margin:0;">Bảng chi tiết từng câu (Bấm vào câu để xem đáp án & giải thích):</h4>
            <span style="font-size:0.8rem; color:#64748B;">Màu xanh: Đúng • Màu đỏ: Sai</span>
          </div>
          
          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(70px, 1fr)); gap:8px; margin-bottom:14px;">
            ${activeExam.questions.map((q, idx) => {
              const u = activeExam.userAnswers[idx];
              const ok = (u === q.answer);
              return `
                <button type="button" onclick="previewQuestionDetail(${idx})" style="padding:8px 4px; text-align:center; border-radius:8px; font-weight:800; font-size:0.82rem; cursor:pointer; border:1.5px solid ${ok ? '#86EFAC' : '#FCA5A5'}; background:${ok ? '#DCFCE7' : '#FEE2E2'}; color:${ok ? '#15803D' : '#B91C1C'};">
                  #${idx + 1} ${ok ? '✓' : '✗'}
                </button>
              `;
            }).join('')}
          </div>

          <div id="examReviewDetailContainer" style="display:none; margin-top:16px; padding-top:16px; border-top:1px dashed #CBD5E1;"></div>
        </div>

        <div style="display:flex; justify-content:center; gap:12px; margin-top:24px;">
          <button type="button" onclick="startExamSimulation(activeExam.type, activeExam.mode, activeExam.modeName)" style="background:#2563EB; color:#FFF; border:none; padding:12px 28px; border-radius:8px; font-weight:700; cursor:pointer;">
            🔄 Thi Lại Đề Này
          </button>
          <button type="button" onclick="closeExamLiveModal()" style="background:#E2E8F0; color:#334155; border:none; padding:12px 24px; border-radius:8px; font-weight:700; cursor:pointer;">
            Đóng phòng thi
          </button>
        </div>
      </div>
    `;
  }
  
  updateWrongQuestionsBadge();
}

function previewQuestionDetail(idx) {
  const q = activeExam.questions[idx];
  if (!q) return;

  const userAns = activeExam.userAnswers[idx];
  const isOk = (userAns === q.answer);
  const container = document.getElementById('examReviewDetailContainer');
  if (!container) return;

  container.style.display = 'block';
  container.innerHTML = `
    <div style="background:#FFFFFF; border:1.5px solid ${isOk ? '#86EFAC' : '#FCA5A5'}; border-radius:10px; padding:18px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <span style="font-weight:800; color:#2563EB; font-size:0.95rem;">Chi tiết Câu #${idx + 1} (Mã câu: #${q.id})</span>
        <span style="font-weight:800; padding:3px 10px; border-radius:20px; font-size:0.75rem; background:${isOk ? '#DCFCE7' : '#FEE2E2'}; color:${isOk ? '#15803D' : '#DC2626'};">
          ${isOk ? '✓ Bạn làm ĐÚNG' : '✗ Bạn làm SAI'}
        </span>
      </div>

      <h4 style="font-size:1.02rem; color:#0F172A; line-height:1.5; margin-bottom:12px;">${q.question}</h4>

      ${q.image ? `<div style="text-align:center; margin-bottom:14px; background:#F8FAFC; padding:10px; border-radius:8px; border:1px solid #E2E8F0;"><img src="${q.image}" onerror="handleDrivingImageError(this, ${q.id})" alt="Hình câu ${q.id}" style="max-width:100%; max-height:220px; object-fit:contain; border-radius:6px;"></div>` : ''}

      <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:12px;">
        ${q.options.map((opt, oIdx) => {
          const ansNum = oIdx + 1;
          const isCorrect = (ansNum === q.answer);
          const isUserChoice = (ansNum === userAns);
          let bg = '#F8FAFC';
          let border = '#E2E8F0';
          let color = '#334155';
          let badge = '';

          if (isCorrect) {
            bg = '#DCFCE7';
            border = '#86EFAC';
            color = '#15803D';
            badge = '<span style="font-weight:800; color:#15803D; margin-left:8px;">✔ [ĐÁP ÁN ĐÚNG]</span>';
          }
          if (isUserChoice && !isCorrect) {
            bg = '#FEE2E2';
            border = '#FCA5A5';
            color = '#DC2626';
            badge = '<span style="font-weight:800; color:#DC2626; margin-left:8px;">✖ [BẠN ĐÃ CHỌN Ý NÀY]</span>';
          } else if (isUserChoice && isCorrect) {
            badge = '<span style="font-weight:800; color:#15803D; margin-left:8px;">✔ [LỰA CHỌN CHÍNH XÁC CỦA BẠN]</span>';
          }

          return `
            <div style="padding:10px 14px; border-radius:8px; font-size:0.92rem; border:1.5px solid ${border}; background:${bg}; color:${color}; font-weight:${(isCorrect || isUserChoice) ? '700' : '400'};">
              ${opt} ${badge}
            </div>
          `;
        }).join('')}
      </div>

      ${q.explain ? `<div style="font-size:0.86rem; color:#1E40AF; background:#EFF6FF; padding:10px 14px; border-radius:8px; border-left:3px solid #2563EB;"><b>💡 Giải thích chi tiết:</b> ${q.explain}</div>` : ''}
    </div>
  `;
}

function renderQuestionLookup(filterChapter = 0, keyword = '') {
  const container = document.getElementById('drivingQuestionListContainer');
  if (!container) return;

  let list = DRIVING_DATA_2026.examA1Questions;
  if (filterChapter > 0) {
    list = list.filter(q => q.chapter === filterChapter);
  }
  if (keyword && keyword.trim() !== '') {
    const kw = keyword.toLowerCase().trim();
    list = list.filter(q => q.question.toLowerCase().includes(kw) || q.explain.toLowerCase().includes(kw));
  }

  if (list.length === 0) {
    container.innerHTML = '<div style="text-align:center; padding:30px; color:#64748B;">Không tìm thấy câu hỏi nào phù hợp với từ khóa.</div>';
    return;
  }

  container.innerHTML = list.map((q, idx) => `
    <div style="background:#FFF; border:1px solid #E2E8F0; border-radius:12px; padding:20px; margin-bottom:14px; box-shadow:0 1px 4px rgba(0,0,0,0.02);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-weight:800; color:#2563EB; font-size:0.92rem;">Câu ${q.id} (Chương ${q.chapter || 1})</span>
        ${q.isParalyzed ? '<span style="background:#FEF2F2; color:#DC2626; border:1px solid #FCA5A5; padding:2px 8px; border-radius:14px; font-size:0.72rem; font-weight:800;">⚠️ CÂU ĐIỂM LIỆT</span>' : ''}
      </div>
      <h4 style="font-size:1.02rem; color:#0F172A; line-height:1.5; margin-bottom:12px;">${q.question}</h4>
      <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:12px;">
        ${q.options.map((opt, oIdx) => `
          <div style="padding:8px 12px; border-radius:6px; font-size:0.88rem; background:${(oIdx + 1 === q.answer) ? '#ECFDF5' : '#F8FAFC'}; color:${(oIdx + 1 === q.answer) ? '#065F46' : '#334155'}; font-weight:${(oIdx + 1 === q.answer) ? '700' : '400'}; border:1px solid ${(oIdx + 1 === q.answer) ? '#A7F3D0' : 'transparent'};">
            ${(oIdx + 1 === q.answer) ? '✔ ' : ''}${opt}
          </div>
        `).join('')}
      </div>
      <div style="font-size:0.82rem; color:#475569; background:#F1F5F9; padding:8px 12px; border-radius:6px;">
        💡 <b>Giải thích:</b> ${q.explain}
      </div>
    </div>
  `).join('');
}

// 7. Tính Năng Xem 20 Câu Điểm Liệt A1
function renderParalyzedQuestions() {
  const container = document.getElementById('paralyzedQuestionsList');
  if (!container) return;

  const list = DRIVING_DATA_2026.examA1Questions.filter(q => q.isParalyzed);
  container.innerHTML = list.map((q, idx) => `
    <div style="background:#FFF; border:1.5px solid #FECACA; border-radius:12px; padding:20px; margin-bottom:14px; box-shadow:0 2px 6px rgba(220,38,38,0.04);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-weight:800; color:#DC2626; font-size:0.92rem;">Câu Điểm Liệt #${idx + 1} (Câu ${q.id})</span>
        <span style="background:#FEF2F2; color:#DC2626; padding:2px 8px; border-radius:14px; font-size:0.72rem; font-weight:800;">SAI LÀ RỚT</span>
      </div>
      <h4 style="font-size:1.02rem; color:#0F172A; line-height:1.5; margin-bottom:12px;">${q.question}</h4>
      <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:12px;">
        ${q.options.map((opt, oIdx) => `
          <div style="padding:8px 12px; border-radius:6px; font-size:0.88rem; background:${(oIdx + 1 === q.answer) ? '#ECFDF5' : '#F8FAFC'}; color:${(oIdx + 1 === q.answer) ? '#065F46' : '#334155'}; font-weight:${(oIdx + 1 === q.answer) ? '700' : '400'}; border:1px solid ${(oIdx + 1 === q.answer) ? '#A7F3D0' : 'transparent'};">
            ${(oIdx + 1 === q.answer) ? '✔ ' : ''}${opt}
          </div>
        `).join('')}
      </div>
      <div style="font-size:0.82rem; color:#991B1B; background:#FEF2F2; padding:8px 12px; border-radius:6px;">
        ⚠️ <b>Lưu ý quan trọng:</b> ${q.explain}
      </div>
    </div>
  `).join('');
}


// =========================================================================
// QUAN LY CAU SAI (LOCALSTORAGE) & HUY HIEU THE 3
// =========================================================================
function getStoredWrongQuestions() {
  try {
    const raw = localStorage.getItem('ninhbinh_driving_wrong_questions');
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function saveWrongQuestions(newWrongIds) {
  try {
    const existing = new Set(getStoredWrongQuestions());
    newWrongIds.forEach(id => existing.add(id));
    localStorage.setItem('ninhbinh_driving_wrong_questions', JSON.stringify([...existing]));
  } catch (e) {
    console.warn('Loi luu cau sai:', e);
  }
}

function clearWrongQuestions() {
  try {
    localStorage.removeItem('ninhbinh_driving_wrong_questions');
  } catch(e) {}
  updateWrongQuestionsBadge();
  if (typeof showToast === 'function') showToast('Da xoa lich su cau sai!');
}

function updateWrongQuestionsBadge() {
  const wrongIds = getStoredWrongQuestions();
  const count = wrongIds.length;
  
  if (typeof document !== 'undefined') {
    document.querySelectorAll('.wrong-questions-count-badge').forEach(el => {
      el.textContent = '(' + count + ' cau)';
    });
    const elById = document.getElementById('cardWrongQuestionsCount');
    if (elById) {
      elById.textContent = '(' + count + ' cau)';
    }
  }
}

function studyWrongQuestions() {
  const wrongIds = getStoredWrongQuestions();
  if (wrongIds.length === 0) {
    if (typeof showToast === 'function') showToast('Ban chua co cau nao lam sai trong lich su lam bai! Hay lam bai thi truoc.');
    return;
  }
  if (typeof switchDrivingTab === 'function') {
    switchDrivingTab('tracuu600', document.querySelector('[data-tab=tracuu600]'));
  }
  if (typeof renderQuestionLookup === 'function') {
    renderQuestionLookup(0, '', true);
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    updateWrongQuestionsBadge();
  });
  setTimeout(updateWrongQuestionsBadge, 500);
}



// =========================================================================
// 1. PHÂN CHIA 10 BỘ ĐỀ THI CHUẨN SÁT HẠCH A1 (25 CÂU / 19 PHÚT / ĐẠT 21/25)
// =========================================================================
function generateFixedExamA1(setNumber) {
  const all = DRIVING_DATA_2026.examA1Questions || [];
  const setIdx = Math.max(1, Math.min(10, parseInt(setNumber) || 1)) - 1; // 0..9

  // 20 câu điểm liệt: mỗi đề 2 câu
  const paralyzed = all.filter(q => q.isParalyzed);
  const setParalyzed = [paralyzed[setIdx * 2], paralyzed[setIdx * 2 + 1]].filter(Boolean);

  // 80 câu khái niệm quy tắc (Chương 1): mỗi đề 8 câu
  const ch1 = all.filter(q => q.chapter === 1 && !q.isParalyzed);
  const setCh1 = ch1.slice(setIdx * 8, (setIdx + 1) * 8);

  // 10 câu văn hóa giao thông (Chương 2): mỗi đề 1 câu
  const ch2 = all.filter(q => q.chapter === 2 && !q.isParalyzed);
  const setCh2 = ch2.slice(setIdx * 1, (setIdx + 1) * 1);

  // 15 câu kỹ thuật lái xe (Chương 3): đề 1-5 có 2 câu, đề 6-10 có 1 câu
  const ch3 = all.filter(q => q.chapter === 3 && !q.isParalyzed);
  const ch3Start = (setIdx < 5) ? setIdx * 2 : (10 + (setIdx - 5));
  const ch3Count = (setIdx < 5) ? 2 : 1;
  const setCh3 = ch3.slice(ch3Start, ch3Start + ch3Count);

  // 90 câu biển báo (Chương 4): mỗi đề 9 câu
  const ch4 = all.filter(q => q.chapter === 4 && !q.isParalyzed);
  const setCh4 = ch4.slice(setIdx * 9, (setIdx + 1) * 9);

  // 35 câu sa hình (Chương 5): đề 1-5 có 3 câu, đề 6-10 có 4 câu
  const ch5 = all.filter(q => q.chapter === 5 && !q.isParalyzed);
  const ch5Start = (setIdx < 5) ? setIdx * 3 : (15 + (setIdx - 5) * 4);
  const ch5Count = (setIdx < 5) ? 3 : 4;
  const setCh5 = ch5.slice(ch5Start, ch5Start + ch5Count);

  // Tổng: 2 + 8 + 1 + (2 hoặc 1) + 9 + (3 hoặc 4) = đúng 25 câu!
  return [...setParalyzed, ...setCh1, ...setCh2, ...setCh3, ...setCh4, ...setCh5].slice(0, 25);
}

function startFixedExamA1(setNumber) {
  const numStr = (setNumber < 10 ? '0' : '') + setNumber;
  startExamSimulation('A1', 'set_' + setNumber, 'Đề Thi Thử Sát Hạch A1 - Đề Số ' + numStr + ' (25 Câu)');
}

// Render lưới 10 bộ đề thi A1
function renderExamSetsGridA1() {
  const container = document.getElementById('examSetsGridA1Container');
  if (!container) return;

  const history = getExamHistory();
  let html = '<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(210px, 1fr)); gap:16px;">';

  for (let s = 1; s <= 10; s++) {
    const key = 'A1_set_' + s;
    const h = history[key];
    const numStr = (s < 10 ? '0' : '') + s;

    let badgeHtml = '<span style="background:#F1F5F9; color:#64748B; padding:3px 8px; border-radius:12px; font-size:0.72rem; font-weight:700;">Chưa thi</span>';
    let borderCol = '#E2E8F0';

    if (h) {
      if (h.passed) {
        badgeHtml = '<span style="background:#ECFDF5; color:#059669; border:1px solid #A7F3D0; padding:3px 8px; border-radius:12px; font-size:0.72rem; font-weight:800;">ĐÃ ĐẠT: ' + h.score + '/25</span>';
        borderCol = '#86EFAC';
      } else {
        badgeHtml = '<span style="background:#FEF2F2; color:#DC2626; border:1px solid #FECACA; padding:3px 8px; border-radius:12px; font-size:0.72rem; font-weight:800;">CHƯA ĐẠT: ' + h.score + '/25</span>';
        borderCol = '#FCA5A5';
      }
    }

    html += `
      <div style="background:#FFFFFF; border:1.5px solid ${borderCol}; border-radius:14px; padding:18px; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 2px 8px rgba(0,0,0,0.02); transition:all 0.2s;" onmouseenter="this.style.transform='translateY(-2px)'" onmouseleave="this.style.transform='none'">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <span style="font-weight:900; font-size:1.15rem; color:#0F172A;">Đề Số ${numStr}</span>
            ${badgeHtml}
          </div>
          <p style="font-size:0.78rem; color:#64748B; margin-bottom:14px; line-height:1.4;">25 câu hỏi • 19 phút<br>Chuẩn cấu trúc thi thật Bộ Công An</p>
        </div>
        <button type="button" onclick="startFixedExamA1(${s})" style="background:#2563EB; color:#FFF; border:none; padding:9px 14px; border-radius:8px; font-weight:700; font-size:0.84rem; cursor:pointer; width:100%; display:flex; align-items:center; justify-content:center; gap:6px;">
          Bắt đầu thi →
        </button>
      </div>
    `;
  }

  html += '</div>';
  container.innerHTML = html;
}

function getExamHistory() {
  try {
    const raw = localStorage.getItem('ninhbinh_driving_exam_history');
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveExamHistory(examKey, score, total, passed) {
  try {
    const h = getExamHistory();
    h[examKey] = {
      score: score,
      total: total,
      passed: passed,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem('ninhbinh_driving_exam_history', JSON.stringify(h));
    renderExamSetsGridA1();
    updateLearningDashboard();
  } catch (e) {
    console.warn('Lỗi lưu lịch sử thi:', e);
  }
}


// =========================================================================
// 2. BỘ ÂM THANH THI SÁT HẠCH SỐNG ĐỘNG (WEB AUDIO API KHÔNG CẦN FILE MP3)
// =========================================================================
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playDrivingSound(type) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'correct') {
      // Major third chime: C5 -> E5
      [523.25, 659.25].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.25);
      });
    } else if (type === 'wrong') {
      // Low buzz
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'pass') {
      // Fanfare chord
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
        gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.1);
        osc.stop(ctx.currentTime + i * 0.1 + 0.5);
      });
    } else if (type === 'tick') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.02);
    }
  } catch (e) {
    // Audio context not allowed or failed
  }
}


// =========================================================================
// 3. BÀN PHÍM ĐIỀU HƯỚNG THI SÁT HẠCH TRỰC TIẾP
// =========================================================================
if (typeof document !== 'undefined') {
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('examLiveSimulatorModal');
    if (!modal || modal.style.display !== 'flex') return;

    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;

    if (['1', '2', '3', '4'].includes(e.key)) {
      e.preventDefault();
      const ansNum = parseInt(e.key);
      selectExamAnswer(ansNum);
      playDrivingSound('click');
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (activeExam.currentIndex > 0) {
        goToExamQuestion(activeExam.currentIndex - 1);
        playDrivingSound('click');
      }
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (activeExam.currentIndex < activeExam.questions.length - 1) {
        goToExamQuestion(activeExam.currentIndex + 1);
        playDrivingSound('click');
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (!activeExam.isSubmitted) {
        confirmSubmitExam();
      }
    }
  });
}


// =========================================================================
// 4. HIỂN THỊ CẨM NANG MẸO THI (A1, A, B, C)
// =========================================================================
function renderDrivingTips(rankKey) {
  const container = document.getElementById('pane-' + rankKey);
  if (!container) return;

  const list = DRIVING_DATA_2026.tipsData[rankKey] || [];
  if (list.length === 0) return;

  const titleMap = {
    'meo-a1': 'Mẹo thi lý thuyết & sa hình Hạng A1 (Mô tô đến 125cc)',
    'meo-a': 'Mẹo thi Hạng A (Mô tô phân khối lớn > 125cc)',
    'meo-b': 'Mẹo thi lý thuyết & 11 bài sa hình Hạng B Ô tô',
    'meo-c': 'Mẹo thi lý thuyết & kỹ thuật xe tải Hạng C'
  };

  container.innerHTML = `
    <div class="wrap" style="max-width:920px; padding:30px 20px;">
      <div style="background:#EFF6FF; border:1px solid #BFDBFE; border-radius:14px; padding:20px 24px; margin-bottom:24px; display:flex; align-items:center; gap:16px;">
        <div style="font-size:2rem;">💡</div>
        <div>
          <h2 style="font-size:1.45rem; color:#1E40AF; font-weight:800; margin:0 0 4px;">${titleMap[rankKey] || 'Mẹo thi'}</h2>
          <p style="color:#3B82F6; font-size:0.88rem; margin:0;">Cẩm nang ghi nhớ độc quyền giúp học viên vượt qua kỳ sát hạch với điểm số tuyệt đối.</p>
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:16px;">
        ${list.map(item => `
          <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:14px; padding:22px 26px; box-shadow:0 2px 8px rgba(0,0,0,0.02);">
            <h3 style="color:#0F172A; font-size:1.12rem; font-weight:800; margin-bottom:10px; display:flex; align-items:center; gap:8px;">
              <span style="color:#2563EB;">📌</span> ${item.title}
            </h3>
            <div style="color:#334155; line-height:1.65; font-size:0.94rem; background:#F8FAFC; border-radius:8px; padding:14px 18px; border-left:3px solid #2563EB;">
              ${item.content}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}


// =========================================================================
// 5. HIỂN THỊ 60 CÂU ĐIỂM LIỆT Ô TÔ (HẠNG B, C)
// =========================================================================
function renderCar60Paralyzed(keyword = '') {
  const container = document.getElementById('paralyzedCar60List');
  if (!container) return;

  const list = DRIVING_DATA_2026.carParalyzed60 || [];
  let filtered = list;

  if (keyword && keyword.trim()) {
    const kw = keyword.toLowerCase().trim();
    filtered = list.filter(q => q.question.toLowerCase().includes(kw) || q.explain.toLowerCase().includes(kw));
  }

  if (filtered.length === 0) {
    container.innerHTML = '<div style="text-align:center; padding:40px; color:#64748B;">Không tìm thấy câu điểm liệt nào phù hợp với từ khóa.</div>';
    return;
  }

  container.innerHTML = filtered.map((q, idx) => `
    <div style="background:#FFF; border:1.5px solid #FECACA; border-radius:14px; padding:22px; margin-bottom:16px; box-shadow:0 2px 8px rgba(220,38,38,0.04);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <span style="font-weight:800; color:#DC2626; font-size:0.95rem;">Câu Điểm Liệt Ô Tô #${idx + 1} (Mã: #${q.id})</span>
        <span style="background:#FEF2F2; color:#DC2626; border:1px solid #FCA5A5; padding:3px 10px; border-radius:20px; font-size:0.75rem; font-weight:800;">SAI LÀ RỚT Ô TÔ</span>
      </div>
      <h4 style="font-size:1.05rem; color:#0F172A; line-height:1.5; margin-bottom:14px;">${q.question}</h4>
      <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:14px;">
        ${q.options.map((opt, oIdx) => `
          <div style="padding:10px 14px; border-radius:8px; font-size:0.9rem; background:${(oIdx + 1 === q.answer) ? '#ECFDF5' : '#F8FAFC'}; color:${(oIdx + 1 === q.answer) ? '#065F46' : '#334155'}; font-weight:${(oIdx + 1 === q.answer) ? '700' : '400'}; border:1.5px solid ${(oIdx + 1 === q.answer) ? '#86EFAC' : 'transparent'};">
            ${(oIdx + 1 === q.answer) ? '✔ [ĐÁP ÁN ĐÚNG] ' : ''}${opt}
          </div>
        `).join('')}
      </div>
      <div style="font-size:0.86rem; color:#991B1B; background:#FEF2F2; padding:10px 14px; border-radius:8px; border-left:3px solid #DC2626;">
        ⚠️ <b>Giải thích chi tiết:</b> ${q.explain}
      </div>
    </div>
  `).join('');
}


// =========================================================================
// 6. CẬP NHẬT TIẾN ĐỘ HỌC TẬP (LOCALSTORAGE DASHBOARD)
// =========================================================================
function updateLearningDashboard() {
  const history = getExamHistory();
  const wrongIds = getStoredWrongQuestions();
  const allQs = DRIVING_DATA_2026.examA1Questions || [];

  let totalExams = Object.keys(history).length;
  let passedExams = Object.values(history).filter(h => h.passed).length;
  let passRate = totalExams > 0 ? Math.round((passedExams / totalExams) * 100) : 0;

  // Tính số câu đã làm đúng ít nhất 1 lần
  let masteredCount = Math.min(250, passedExams * 24 + Math.max(0, 20 - wrongIds.length));
  if (totalExams === 0) masteredCount = 0;

  const totalEl = document.getElementById('statTotalQuestions');
  if (totalEl) totalEl.textContent = allQs.length || 250;

  const masteredEl = document.getElementById('statMasteredQuestions');
  if (masteredEl) masteredEl.textContent = masteredCount;

  const rateEl = document.getElementById('statPassRate');
  if (rateEl) rateEl.textContent = passRate + '%';
}


// =========================================================================
// 7. MINIGAME 1: VÒNG QUAY NÓN KỲ DIỆU (QUAY NÓN 21H)
// =========================================================================
const WHEEL_PRIZES = [
  { text: '+100 XP', color: '#3B82F6', type: 'xp', value: 100 },
  { text: 'Vé VIP', color: '#10B981', type: 'ticket', value: 1 },
  { text: '+200 XP', color: '#F59E0B', type: 'xp', value: 200 },
  { text: 'Tay Lái Vàng', color: '#EC4899', type: 'badge', value: 'Tay Lái Vàng' },
  { text: 'x2 XP 1h', color: '#8B5CF6', type: 'buff', value: 'x2 XP' },
  { text: '+500 XP', color: '#EF4444', type: 'xp', value: 500 },
  { text: '3 Câu Liệt', color: '#6366F1', type: 'challenge', value: 'paralyzed' },
  { text: '+50 XP', color: '#14B8A6', type: 'xp', value: 50 }
];

let wheelState = {
  angle: 0,
  isSpinning: false,
  canvas: null,
  ctx: null
};

function openWheelFortuneModal() {
  let modal = document.getElementById('wheelFortuneModal');
  if (!modal) return;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  initWheelCanvas();
}

function closeWheelFortuneModal() {
  let modal = document.getElementById('wheelFortuneModal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

function initWheelCanvas() {
  const canvas = document.getElementById('wheelFortuneCanvas');
  if (!canvas) return;
  wheelState.canvas = canvas;
  wheelState.ctx = canvas.getContext('2d');
  drawWheelFortune();
}

function drawWheelFortune() {
  const ctx = wheelState.ctx;
  if (!ctx) return;

  const w = wheelState.canvas.width;
  const h = wheelState.canvas.height;
  const cx = w / 2;
  const cy = h / 2;
  const radius = cx - 12;

  ctx.clearRect(0, 0, w, h);

  const num = WHEEL_PRIZES.length;
  const step = (2 * Math.PI) / num;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(wheelState.angle);

  for (let i = 0; i < num; i++) {
    const startA = i * step;
    const endA = startA + step;

    // Wedge
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, startA, endA);
    ctx.closePath();
    ctx.fillStyle = WHEEL_PRIZES[i].color;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();

    // Text
    ctx.save();
    ctx.rotate(startA + step / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 13px Plus Jakarta Sans, sans-serif';
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 4;
    ctx.fillText(WHEEL_PRIZES[i].text, radius - 18, 5);
    ctx.restore();
  }

  // Center pin
  ctx.beginPath();
  ctx.arc(0, 0, 22, 0, 2 * Math.PI);
  ctx.fillStyle = '#0F172A';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#FDE047';
  ctx.stroke();

  ctx.fillStyle = '#FDE047';
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('GPLX', 0, 0);

  ctx.restore();
}

function spinWheelFortune() {
  if (wheelState.isSpinning) return;
  wheelState.isSpinning = true;

  const btn = document.getElementById('btnSpinWheel');
  if (btn) {
    btn.disabled = true;
    btn.style.opacity = '0.5';
  }

  const spins = 5 + Math.floor(Math.random() * 5); // 5-9 full rotations
  const prizeIdx = Math.floor(Math.random() * WHEEL_PRIZES.length);
  const step = (2 * Math.PI) / WHEEL_PRIZES.length;
  // Needle points down at top (3 * PI / 2), so target angle:
  const targetWedgeAngle = (3 * Math.PI / 2) - (prizeIdx * step + step / 2);
  const targetTotal = spins * 2 * Math.PI + targetWedgeAngle;

  const duration = 4200;
  const startTime = performance.now();
  const startAngle = wheelState.angle;
  let lastTickAngle = startAngle;

  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    // Ease out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    wheelState.angle = startAngle + (targetTotal - startAngle) * ease;

    // Tick sound every wedge
    if (Math.abs(wheelState.angle - lastTickAngle) >= step) {
      playDrivingSound('tick');
      lastTickAngle = wheelState.angle;
    }

    drawWheelFortune();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      wheelState.isSpinning = false;
      if (btn) {
        btn.disabled = false;
        btn.style.opacity = '1';
      }
      playDrivingSound('pass');
      showWheelResult(WHEEL_PRIZES[prizeIdx]);
    }
  }

  requestAnimationFrame(animate);
}

function showWheelResult(prize) {
  const box = document.getElementById('wheelResultAlert');
  if (box) {
    box.style.display = 'block';
    box.innerHTML = `
      <div style="background:#ECFDF5; border:1.5px solid #86EFAC; border-radius:12px; padding:16px; text-align:center; animation:popIn 0.3s ease;">
        <div style="font-size:2rem; margin-bottom:4px;">🎉</div>
        <div style="font-weight:800; color:#15803D; font-size:1.1rem; margin-bottom:4px;">Chúc mừng bạn nhận được: ${prize.text}!</div>
        <div style="font-size:0.82rem; color:#166534;">Phần thưởng đã tự động cộng vào tài khoản học viên của bạn.</div>
      </div>
    `;
  }
  if (typeof showToast === 'function') {
    showToast('🎉 Bạn nhận được: ' + prize.text);
  }
}


// =========================================================================
// 8. MINIGAME 2: THỬ THÁCH BIỂN BÁO SIÊU TỐC (60 GIÂY)
// =========================================================================
let speedSignGame = {
  timeLeft: 60,
  timer: null,
  score: 0,
  streak: 0,
  maxStreak: 0,
  currentQ: null,
  pool: []
};

function openSpeedSignGameModal() {
  const modal = document.getElementById('speedSignModal');
  if (!modal) return;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  startSpeedSignGame();
}

function closeSpeedSignGameModal() {
  if (speedSignGame.timer) clearInterval(speedSignGame.timer);
  const modal = document.getElementById('speedSignModal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

function startSpeedSignGame() {
  if (speedSignGame.timer) clearInterval(speedSignGame.timer);
  const all = DRIVING_DATA_2026.examA1Questions || [];
  // Lấy các câu biển báo (Chương 4: Q126-215)
  speedSignGame.pool = all.filter(q => q.chapter === 4 && q.image);
  speedSignGame.timeLeft = 60;
  speedSignGame.score = 0;
  speedSignGame.streak = 0;
  speedSignGame.maxStreak = 0;

  renderSpeedSignUI();

  speedSignGame.timer = setInterval(() => {
    speedSignGame.timeLeft--;
    const tEl = document.getElementById('speedSignTimer');
    if (tEl) tEl.textContent = speedSignGame.timeLeft + 's';

    if (speedSignGame.timeLeft <= 0) {
      clearInterval(speedSignGame.timer);
      finishSpeedSignGame();
    }
  }, 1000);

  nextSpeedSignQuestion();
}

function nextSpeedSignQuestion() {
  if (speedSignGame.pool.length === 0) return;
  const rIdx = Math.floor(Math.random() * speedSignGame.pool.length);
  speedSignGame.currentQ = speedSignGame.pool[rIdx];
  renderSpeedSignUI();
}

function renderSpeedSignUI() {
  const q = speedSignGame.currentQ;
  const container = document.getElementById('speedSignGameBody');
  if (!container || !q) return;

  const multiplier = speedSignGame.streak >= 5 ? 3 : (speedSignGame.streak >= 2 ? 2 : 1);

  container.innerHTML = `
    <div style="background:#FFF; border-radius:14px; padding:20px; box-shadow:0 2px 10px rgba(0,0,0,0.03); border:1px solid #E2E8F0;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <span style="font-size:0.85rem; font-weight:700; color:#64748B;">Điểm: <b style="color:#2563EB; font-size:1.1rem;">${speedSignGame.score}</b></span>
        <span style="background:${multiplier > 1 ? '#FEF3C7' : '#F1F5F9'}; color:${multiplier > 1 ? '#D97706' : '#64748B'}; border-radius:20px; padding:3px 12px; font-size:0.8rem; font-weight:800;">
          🔥 Chuỗi: ${speedSignGame.streak} (${multiplier}x điểm)
        </span>
      </div>

      <div style="text-align:center; margin-bottom:16px; background:#F8FAFC; border-radius:10px; padding:12px; border:1px solid #E2E8F0;">
        <img src="${q.image}" onerror="handleDrivingImageError(this, ${q.id})" alt="Biển báo" style="max-height:160px; max-width:100%; object-fit:contain; border-radius:6px;">
      </div>

      <h3 style="font-size:1.05rem; color:#0F172A; text-align:center; margin-bottom:16px; line-height:1.4;">${q.question}</h3>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
        ${q.options.map((opt, oIdx) => `
          <button type="button" onclick="selectSpeedSignAnswer(${oIdx + 1})" style="background:#F8FAFC; border:1.5px solid #CBD5E1; padding:12px 14px; border-radius:8px; font-size:0.88rem; font-weight:600; text-align:left; cursor:pointer; transition:all 0.15s; line-height:1.35;" onmouseenter="this.style.background='#EFF6FF'; this.style.borderColor='#2563EB'" onmouseleave="this.style.background='#F8FAFC'; this.style.borderColor='#CBD5E1'">
            ${opt}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function selectSpeedSignAnswer(chosenAns) {
  const q = speedSignGame.currentQ;
  if (!q) return;

  if (chosenAns === q.answer) {
    playDrivingSound('correct');
    speedSignGame.streak++;
    if (speedSignGame.streak > speedSignGame.maxStreak) {
      speedSignGame.maxStreak = speedSignGame.streak;
    }
    const mult = speedSignGame.streak >= 5 ? 3 : (speedSignGame.streak >= 2 ? 2 : 1);
    speedSignGame.score += 10 * mult;
  } else {
    playDrivingSound('wrong');
    speedSignGame.streak = 0;
  }

  nextSpeedSignQuestion();
}

function finishSpeedSignGame() {
  playDrivingSound('pass');
  const container = document.getElementById('speedSignGameBody');
  if (!container) return;

  container.innerHTML = `
    <div style="background:#FFF; border-radius:14px; padding:32px; text-align:center; box-shadow:0 4px 16px rgba(0,0,0,0.06); border:1px solid #E2E8F0;">
      <div style="font-size:3rem; margin-bottom:10px;">⚡</div>
      <h2 style="font-size:1.6rem; font-weight:800; color:#0F172A; margin-bottom:6px;">Hết Giờ Thử Thách!</h2>
      <p style="color:#64748B; font-size:0.95rem; margin-bottom:20px;">Bạn đã hoàn thành 60 giây phản xạ biển báo siêu tốc.</p>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; max-width:320px; margin:0 auto 24px; text-align:center;">
        <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:14px;">
          <div style="font-size:0.75rem; color:#64748B; font-weight:700;">TỔNG ĐIỂM</div>
          <div style="font-size:1.6rem; font-weight:900; color:#2563EB;">${speedSignGame.score}</div>
        </div>
        <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:14px;">
          <div style="font-size:0.75rem; color:#64748B; font-weight:700;">CHUỖI CAO NHẤT</div>
          <div style="font-size:1.6rem; font-weight:900; color:#D97706;">${speedSignGame.maxStreak} 🔥</div>
        </div>
      </div>

      <div style="display:flex; justify-content:center; gap:12px;">
        <button type="button" onclick="startSpeedSignGame()" style="background:#2563EB; color:#FFF; border:none; padding:10px 22px; border-radius:8px; font-weight:700; cursor:pointer;">
          🔄 Chơi Lại 60s
        </button>
        <button type="button" onclick="closeSpeedSignGameModal()" style="background:#E2E8F0; color:#334155; border:none; padding:10px 18px; border-radius:8px; font-weight:700; cursor:pointer;">
          Đóng
        </button>
      </div>
    </div>
  `;
}


// =========================================================================
// 9. MINIGAME 3: ĐẤU TRÍ CÙNG AI (PvP SÁT HẠCH vs BOT GIÁM THỊ)
// =========================================================================
let aiPvpMatch = {
  round: 1,
  totalRounds: 10,
  playerScore: 0,
  aiScore: 0,
  currentQ: null,
  isLocked: false,
  questions: []
};

function openAIPvpModal() {
  const modal = document.getElementById('aiPvpModal');
  if (!modal) return;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  startAIPvpMatch();
}

function closeAIPvpModal() {
  const modal = document.getElementById('aiPvpModal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

function startAIPvpMatch() {
  const all = DRIVING_DATA_2026.examA1Questions || [];
  aiPvpMatch.questions = [...all].sort(() => 0.5 - Math.random()).slice(0, 10);
  aiPvpMatch.round = 1;
  aiPvpMatch.playerScore = 0;
  aiPvpMatch.aiScore = 0;
  aiPvpMatch.isLocked = false;
  renderAIPvpRound();
}

function renderAIPvpRound() {
  const q = aiPvpMatch.questions[aiPvpMatch.round - 1];
  aiPvpMatch.currentQ = q;
  aiPvpMatch.isLocked = false;

  const container = document.getElementById('aiPvpGameBody');
  if (!container || !q) return;

  const totalPoints = (aiPvpMatch.playerScore + aiPvpMatch.aiScore) || 1;
  const playerPct = Math.round((aiPvpMatch.playerScore / totalPoints) * 100);

  container.innerHTML = `
    <div style="background:#FFF; border-radius:14px; padding:22px; border:1px solid #E2E8F0; box-shadow:0 2px 10px rgba(0,0,0,0.03);">
      <!-- Header PvP: Player vs AI -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="width:38px; height:38px; border-radius:50%; background:#EFF6FF; color:#2563EB; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:1.1rem;">👤</div>
          <div>
            <div style="font-weight:800; font-size:0.9rem; color:#0F172A;">Bạn</div>
            <div style="font-weight:900; color:#2563EB; font-size:1.1rem;">${aiPvpMatch.playerScore} Điểm</div>
          </div>
        </div>

        <div style="text-align:center;">
          <span style="background:#F1F5F9; color:#475569; padding:4px 12px; border-radius:14px; font-weight:800; font-size:0.75rem;">HIỆP ${aiPvpMatch.round} / 10</span>
        </div>

        <div style="display:flex; align-items:center; gap:10px; text-align:right;">
          <div>
            <div style="font-weight:800; font-size:0.9rem; color:#0F172A;">Giám Thị AI 🤖</div>
            <div style="font-weight:900; color:#DC2626; font-size:1.1rem;">${aiPvpMatch.aiScore} Điểm</div>
          </div>
          <div style="width:38px; height:38px; border-radius:50%; background:#FEF2F2; color:#DC2626; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:1.1rem;">🤖</div>
        </div>
      </div>

      <!-- Question -->
      <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:16px; margin-bottom:16px;">
        <h4 style="font-size:1.02rem; color:#0F172A; line-height:1.5; margin:0 0 10px;">${q.question}</h4>
        ${q.image ? `<div style="text-align:center; margin-bottom:10px;"><img src="${q.image}" onerror="handleDrivingImageError(this, ${q.id})" alt="Hình" style="max-height:150px; max-width:100%; object-fit:contain; border-radius:6px;"></div>` : ''}
      </div>

      <!-- Options -->
      <div id="aiPvpOptionsGrid" style="display:flex; flex-direction:column; gap:8px;">
        ${q.options.map((opt, oIdx) => `
          <button type="button" onclick="submitAIPvpAnswer(${oIdx + 1})" style="background:#FFFFFF; border:1.5px solid #CBD5E1; padding:12px 16px; border-radius:8px; font-size:0.9rem; font-weight:600; text-align:left; cursor:pointer; transition:all 0.15s;" onmouseenter="this.style.background='#EFF6FF'" onmouseleave="this.style.background='#FFFFFF'">
            ${opt}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function submitAIPvpAnswer(playerChoice) {
  if (aiPvpMatch.isLocked) return;
  aiPvpMatch.isLocked = true;

  const q = aiPvpMatch.currentQ;
  const isPlayerCorrect = (playerChoice === q.answer);

  // AI simulates thinking and answers (85% accuracy)
  const isAICorrect = Math.random() < 0.85;

  if (isPlayerCorrect) {
    aiPvpMatch.playerScore += 10;
    playDrivingSound('correct');
  } else {
    playDrivingSound('wrong');
  }

  if (isAICorrect) {
    aiPvpMatch.aiScore += 10;
  }

  const grid = document.getElementById('aiPvpOptionsGrid');
  if (grid) {
    grid.innerHTML = `
      <div style="background:#F0FDF4; border:1.5px solid #86EFAC; border-radius:8px; padding:14px; text-align:center; margin-bottom:10px;">
        <div style="font-weight:800; color:#15803D; margin-bottom:4px;">
          ${isPlayerCorrect ? '✔ Bạn trả lời ĐÚNG (+10đ)' : '❌ Bạn trả lời SAI (0đ)'} • ${isAICorrect ? '🤖 AI trả lời ĐÚNG (+10đ)' : '🤖 AI trả lời SAI (0đ)'}
        </div>
        <div style="font-size:0.82rem; color:#166534;">Đáp án đúng là: <b>Ý ${q.answer}</b></div>
      </div>
      <button type="button" onclick="nextAIPvpRound()" style="background:#0F172A; color:#FFF; border:none; padding:10px 20px; border-radius:8px; font-weight:700; cursor:pointer; width:100%;">
        ${aiPvpMatch.round >= 10 ? '🏁 Xem Kết Quả Trận Đấu →' : 'Hiệp Tiếp Theo ➡'}
      </button>
    `;
  }
}

function nextAIPvpRound() {
  if (aiPvpMatch.round >= 10) {
    finishAIPvpMatch();
  } else {
    aiPvpMatch.round++;
    renderAIPvpRound();
  }
}

function finishAIPvpMatch() {
  const container = document.getElementById('aiPvpGameBody');
  if (!container) return;

  const isWin = aiPvpMatch.playerScore > aiPvpMatch.aiScore;
  const isTie = aiPvpMatch.playerScore === aiPvpMatch.aiScore;

  if (isWin) playDrivingSound('pass');
  else playDrivingSound('wrong');

  container.innerHTML = `
    <div style="background:#FFF; border-radius:14px; padding:32px; text-align:center; box-shadow:0 4px 16px rgba(0,0,0,0.06); border:1px solid #E2E8F0;">
      <div style="font-size:3.5rem; margin-bottom:10px;">${isWin ? '🏆' : (isTie ? '🤝' : '🤖')}</div>
      <h2 style="font-size:1.6rem; font-weight:800; color:${isWin ? '#16A34A' : (isTie ? '#D97706' : '#DC2626')}; margin-bottom:6px;">
        ${isWin ? 'BẠN ĐÃ CHIẾN THẮNG AI!' : (isTie ? 'TRẬN ĐẤU BÒNG KÈO HÒA NHAU!' : 'GIÁM THỊ AI THẮNG CUỘC!')}
      </h2>
      <p style="color:#64748B; font-size:0.95rem; margin-bottom:20px;">
        Tỉ số chung cuộc: <b>Bạn ${aiPvpMatch.playerScore}</b> - <b>${aiPvpMatch.aiScore} AI</b>
      </p>

      <div style="display:flex; justify-content:center; gap:12px;">
        <button type="button" onclick="startAIPvpMatch()" style="background:#2563EB; color:#FFF; border:none; padding:10px 22px; border-radius:8px; font-weight:700; cursor:pointer;">
          🔄 Tái Đấu AI 10 Hiệp
        </button>
        <button type="button" onclick="closeAIPvpModal()" style="background:#E2E8F0; color:#334155; border:none; padding:10px 18px; border-radius:8px; font-weight:700; cursor:pointer;">
          Đóng
        </button>
      </div>
    </div>
  `;
}


// =========================================================================
// 10. MINIGAME 4: SA HÌNH MASTER (THỬ THÁCH GIẢI THẾ SA HÌNH)
// =========================================================================
let saHinhMasterGame = {
  pool: [],
  currentQ: null,
  streak: 0
};

function openSaHinhMasterModal() {
  const modal = document.getElementById('saHinhMasterModal');
  if (!modal) return;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  startSaHinhMaster();
}

function closeSaHinhMasterModal() {
  const modal = document.getElementById('saHinhMasterModal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

function startSaHinhMaster() {
  const all = DRIVING_DATA_2026.examA1Questions || [];
  saHinhMasterGame.pool = all.filter(q => q.chapter === 5 && q.image);
  saHinhMasterGame.streak = 0;
  nextSaHinhQuestion();
}

function nextSaHinhQuestion() {
  if (saHinhMasterGame.pool.length === 0) return;
  const rIdx = Math.floor(Math.random() * saHinhMasterGame.pool.length);
  saHinhMasterGame.currentQ = saHinhMasterGame.pool[rIdx];
  renderSaHinhMasterUI();
}

function renderSaHinhMasterUI() {
  const q = saHinhMasterGame.currentQ;
  const container = document.getElementById('saHinhMasterBody');
  if (!container || !q) return;

  container.innerHTML = `
    <div style="background:#FFF; border-radius:14px; padding:22px; border:1px solid #E2E8F0; box-shadow:0 2px 10px rgba(0,0,0,0.03);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
        <span style="font-weight:800; color:#0F172A; font-size:1rem;">🚗 Thử Thách Thế Sa Hình (Câu #${q.id})</span>
        <span style="background:#ECFDF5; color:#059669; border:1px solid #A7F3D0; padding:3px 10px; border-radius:20px; font-size:0.75rem; font-weight:800;">
          Chuỗi giải đúng: ${saHinhMasterGame.streak} 🌟
        </span>
      </div>

      <div style="text-align:center; margin-bottom:16px; background:#F8FAFC; border-radius:10px; padding:12px; border:1px solid #E2E8F0;">
        <img src="${q.image}" onerror="handleDrivingImageError(this, ${q.id})" alt="Sa hình" style="max-height:220px; max-width:100%; object-fit:contain; border-radius:8px;">
      </div>

      <h3 style="font-size:1.1rem; color:#0F172A; line-height:1.45; margin-bottom:16px;">${q.question}</h3>

      <div id="saHinhChoicesContainer" style="display:flex; flex-direction:column; gap:8px;">
        ${q.options.map((opt, oIdx) => `
          <button type="button" onclick="submitSaHinhChoice(${oIdx + 1})" style="background:#FFFFFF; border:1.5px solid #CBD5E1; padding:12px 16px; border-radius:8px; font-size:0.92rem; font-weight:600; text-align:left; cursor:pointer; transition:all 0.15s;" onmouseenter="this.style.background='#EFF6FF'" onmouseleave="this.style.background='#FFFFFF'">
            ${opt}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function submitSaHinhChoice(chosenAns) {
  const q = saHinhMasterGame.currentQ;
  if (!q) return;

  const isOk = (chosenAns === q.answer);
  if (isOk) {
    playDrivingSound('correct');
    saHinhMasterGame.streak++;
  } else {
    playDrivingSound('wrong');
    saHinhMasterGame.streak = 0;
  }

  const container = document.getElementById('saHinhChoicesContainer');
  if (container) {
    container.innerHTML = `
      <div style="background:${isOk ? '#ECFDF5' : '#FEF2F2'}; border:1.5px solid ${isOk ? '#86EFAC' : '#FCA5A5'}; border-radius:10px; padding:16px; margin-bottom:12px;">
        <div style="font-weight:800; font-size:1.05rem; color:${isOk ? '#15803D' : '#DC2626'}; margin-bottom:6px;">
          ${isOk ? '✔ CHÍNH XÁC!' : '❌ CHƯA CHÍNH XÁC!'} (Đáp án đúng: Ý ${q.answer})
        </div>
        <div style="font-size:0.88rem; color:#334155; line-height:1.5; margin-bottom:10px;">
          💡 <b>Nguyên tắc giải:</b> ${q.explain}
        </div>
        <div style="font-size:0.8rem; color:#64748B; background:#FFF; padding:8px 12px; border-radius:6px; border:1px solid #E2E8F0;">
          📌 <i>Thần chú 4 bước:</i> Nhất chớm > Nhì ưu (Hỏa-Sự-Công-Thương) > Tam đường (Đường ưu tiên) > Tứ hướng (Phải-Thẳng-Trái).
        </div>
      </div>
      <button type="button" onclick="nextSaHinhQuestion()" style="background:#2563EB; color:#FFF; border:none; padding:12px 20px; border-radius:8px; font-weight:700; cursor:pointer; width:100%;">
        Thế Sa Hình Tiếp Theo ➡
      </button>
    `;
  }
}


// =========================================================================
// 11. KHỞI TẠO TẤT CẢ TÍNH NĂNG KHI LOAD TRANG
// =========================================================================
function initDrivingSystem() {
  renderExamSetsGridA1();
  renderDrivingTips('meo-a1');
  renderDrivingTips('meo-a');
  renderDrivingTips('meo-b');
  renderDrivingTips('meo-c');
  renderCar60Paralyzed();
  updateLearningDashboard();
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initDrivingSystem();
  });
  setTimeout(initDrivingSystem, 600);
}
