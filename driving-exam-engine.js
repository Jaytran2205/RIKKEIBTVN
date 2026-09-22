
function handleDrivingImageError(imgEl, qId) {
  if (!imgEl.dataset.retryCount) {
    imgEl.dataset.retryCount = '1';
    setTimeout(() => {
      imgEl.src = './images/driving_a1/q_' + qId + '.jpg?v=' + Date.now();
    }, 300);
  } else if (imgEl.dataset.retryCount === '1') {
    imgEl.dataset.retryCount = '2';
    setTimeout(() => {
      imgEl.src = '../images/driving_a1/q_' + qId + '.jpg?v=' + Date.now();
    }, 300);
  } else if (imgEl.dataset.retryCount === '2') {
    imgEl.dataset.retryCount = '3';
    setTimeout(() => {
      imgEl.src = './images/driving/cau_' + qId + '.png?v=' + Date.now();
    }, 300);
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
    "question": "Phần của đường bộ được sử dụng cho phương tiện giao thông đường bộ đi lại là gì?",
    "options": [
      "1. Phần mặt đường và lề đường.",
      "2. Phần đường xe chạy.",
      "3. Phần đường xe cơ giới."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Mẹo: Phần đường = 2 chữ = Chọn đáp án 2",
    "image": null,
    "chapter": 1
  },
  {
    "id": 2,
    "question": "“Người tham gia giao thông đường bộ&quot; gồm những đối tượng nào?",
    "options": [
      "1. Người điều khiển, người được chở trên phương tiện tham gia giao thông đường bộ",
      "2. Người điều khiển, dẫn dắt vật nuôi trên đường bộ; người đi bộ trên đường bộ.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Điều khiển xe, được người khác chở, dẫn dắt súc vật hay đi bộ trên đường đều là tham gia giao thông.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 3,
    "question": "Hành vi nào sau đây bị nghiêm cấm?",
    "options": [
      "1. Điều khiển xe cơ giới lạng lách, đánh võng, rú ga liên tục khi tham gia giao thông trên đường.",
      "2. Xúc phạm, đe dọa, cản trở, chống đối hoặc không chấp hành hiệu lệnh, hướng dẫn, yêu cầu kiểm tra, kiểm soát của người thi hành công vụ về bảo đảm trật tự, an toàn giao thông đường bộ.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": true,
    "explain": "Lạng lách rú ga – Chống đối công an – Cả hai đều cấm !",
    "image": null,
    "chapter": 1
  },
  {
    "id": 4,
    "question": "Khi hiệu lệnh của người điều khiển giao thông trái với tín hiệu đèn giao thông hoặc biển báo hiệu đường bộ thì người tham gia giao thông đường bộ phải chấp hành báo hiệu đường bộ nào dưới đây?",
    "options": [
      "1. Theo hiệu lệnh của người điều khiển giao thông.",
      "2. Theo tín hiệu đèn giao thông.",
      "3. Theo biển báo hiệu đường bộ."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Tuân thủ: ̉“Người – Đèn – Biển” (Thứ tự ưu tiên từ cao xuống thấp). “Nghe người trước, nhìn đèn sau, biển báo đứng cuối hàng!”",
    "image": null,
    "chapter": 4
  },
  {
    "id": 5,
    "question": "Khi lái xe trong khu đông dân cư, khu vực cơ sở khám bệnh, chữa bệnh trừ các khu vực có biển cấm sử dụng còi, người lái xe được sử dụng còi trong thời gian nào?",
    "options": [
      "1. Từ 22 giờ ngày hôm trước đến 05 giờ ngày hôm sau.",
      "2. Từ 05 giờ đến 22 giờ.",
      "3. Từ 23 giờ ngày hôm trước đến 05 giờ sáng hôm sau."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Còi 5 đến 22 – Đêm ngủ yên, “Còi thì chỉ bấm ban ngày, 5 giờ sáng đến 10 giờ tối, ban đêm để người ta ngủ thôi!”",
    "image": null,
    "chapter": 4
  },
  {
    "id": 6,
    "question": "Khi điều khiển xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy, những hành vi nào sau đây không được phép?",
    "options": [
      "1. Buông cả hai tay; sử dụng xe để kéo, đẩy xe khác, vật khác; sử dụng chân chống hoặc vật khác quệt xuống đường khi xe đang chạy.",
      "2. Sử dụng xe để chở người hoặc hàng hóa; để chân chạm xuống đất khi khởi hành.",
      "3. Đội mũ bảo hiểm; chạy xe đúng tốc độ quy định và chấp hành đúng quy tắc giao thông đường bộ.",
      "4. Chở người ngồi sau dưới 16 tuổi."
    ],
    "answer": 1,
    "isParalyzed": true,
    "explain": "“Buông tay – Kéo đẩy – Quệt chân, dễ tai nạn, tuyệt đối cấm!”",
    "image": null,
    "chapter": 1
  },
  {
    "id": 7,
    "question": "Trường hợp người được chở trên xe mô tô, xe gắn máy, các loại xe tương tự xe mô tô và các loại xe tương tự xe gắn máy không đội &quot;mũ bảo hiểm cho người đi mô tô, xe máy&quot; hoặc không cài quai đúng quy cách (trừ trường hợp chở người bệnh đi cấp cứu, trẻ em dưới 06 tuổi, áp giải người có hành vi vi phạm pháp luật) thì việc xử phạt vi phạm hành chính được quy định như thế nào?",
    "options": [
      "1. Không bị xử phạt chỉ bị nhắc nhở.",
      "2. Người được chở không bị xử phạt, chỉ xử phạt người điều khiển xe mô tô, xe gắn máy.",
      "3. Người được chở bị xử phạt, không xử phạt người điều khiển xe mô tô, xe gắn máy.",
      "4. Xử phạt cả người điều khiển và người được chở trên xe mô tô, xe gắn máy."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Người ngồi sau không đội mũ bảo hiểm khi tham gia giao thông, sẽ bị xử phạt cả người điều khiển và người ngồi sau theo nghị định 168/2024/NĐ-CP",
    "image": null,
    "chapter": 1
  },
  {
    "id": 8,
    "question": "Tại nơi đường giao nhau không có báo hiệu đi theo vòng xuyến, người điều khiển phương tiện phải nhường đường như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Phải nhường đường cho xe đi đến từ bên phải.",
      "2. Xe báo hiệu xin đường trước, xe đó được đi trước.",
      "3. Phải nhường đường cho xe đi đến từ bên trái."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đường giao nhau không có báo hiệu đi theo vòng xuyến nhường bên phải, có báo hiệu nhường bên trái. “Có trái – không phải!”",
    "image": null,
    "chapter": 1
  },
  {
    "id": 9,
    "question": "Người lái xe được phép vượt xe khác về bên phải trong trường hợp nào dưới đây?",
    "options": [
      "1. Xe phía trước có tín hiệu rẽ trái hoặc đang rẽ trái hoặc khi xe chuyên dùng đang làm việc trên đường mà không thể vượt bên trái.",
      "2. Xe phía trước đang đi sát lề đường bên trái.",
      "3. Cả hai ý trên."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Bình thường vượt trái, khi gặp Xe rẽ trái hoặc đang làm việc (xe chuyên dùng ) mới được vượt phải.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 10,
    "question": "Người có giấy phép lái xe chưa bị trừ hết 12 điểm, được phục hồi điểm giấy phép lái xe trong trường hợp nào sau đây?",
    "options": [
      "1. Không được phục hồi.",
      "2. Được phục hồi đủ 12 điểm, nếu không bị trừ điểm trong thời hạn 12 tháng từ ngày bị trừ điểm gần nhất."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "12 tháng không bị trừ điểm → phục hồi đủ 12 điểm!",
    "image": null,
    "chapter": 1
  },
  {
    "id": 11,
    "question": "Những hành vi nào sau đây thể hiện là người có văn hóa giao thông?",
    "options": [
      "1. Luôn tuân thủ pháp luật về trật tự, an toàn giao thông đường bộ, nhường nhịn và giúp đỡ người khác.",
      "2. Đi nhanh, vượt đèn đỏ nếu không có lực lượng Công an.",
      "3. Bấm còi và nháy đèn liên tục để cảnh báo xe khác.",
      "4. Tránh nhường đường để đi nhanh hơn."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Tuân luật + Nhường nhịn + Giúp đỡ = Văn hóa giao thông!",
    "image": null,
    "chapter": 2
  },
  {
    "id": 12,
    "question": "Khi điều khiển xe mô tô tay ga xuống đường dốc dài, độ dốc cao, người lái xe cần thực hiện các thao tác nào dưới đây để bảo đảm an toàn?",
    "options": [
      "1. Giữ tay ga ở mức độ phù hợp, sử dụng phanh trước và phanh sau để giảm tốc độ.",
      "2. Nhả hết tay ga, tắt động cơ, sử dụng phanh trước và phanh sau để giảm tốc độ.",
      "3. Sử dụng phanh trước để giảm tốc độ kết hợp với tắt chìa khóa điện của xe."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Xuống dốc tay ga hợp lý, phanh trước phanh sau giảm tốc an toàn.",
    "image": null,
    "chapter": 3
  },
  {
    "id": 13,
    "question": "Khi điều khiển xe mô tô quay đầu, người lái xe cần thực hiện như thế nào để bảo đảm an toàn?",
    "options": [
      "1. Bật tín hiệu báo rẽ trước khi quay đầu, từ từ giảm tốc độ đến mức có thể dừng lại.",
      "2. Chỉ quay đầu xe tại những nơi được phép quay đầu.",
      "3. Quan sát an toàn các phương tiện tới từ phía trước, phía sau, hai bên đồng thời nhường đường cho xe từ bên phải và phía trước đi tới.",
      "4. Cả ba ý trên."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Muốn quay đầu thì nhớ bật đèn, chọn nơi cho phép, quan sát và nhường đường.",
    "image": null,
    "chapter": 3
  },
  {
    "id": 14,
    "question": "Biển nào cấm quay đầu xe?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Không biển nào.",
      "4. Cả hai biển.."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Biển 1 là biển cấm xe rẽ trái. Biển 2 là biển cấm xe quay đầu. Biển báo cấm quay đầu không có giá trị cấm rẽ trái.",
    "image": "images/driving_a1/q_14.jpg",
    "chapter": 4
  },
  {
    "id": 15,
    "question": "Khi gặp biển nào xe ưu tiên theo luật định vẫn phải dừng lại?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Cả ba biển."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Biển 1: Đường cấm không áp dụng với xe ưu tiên - Biển 2: dừng lại áp dụng với tất cả phương tiện kể cả xe ưu tiên - Biển 3: Cấm đi ngược chiều không áp dụng với xe ưu tiên. Nên đáp án 2",
    "image": "images/driving_a1/q_15.jpg",
    "chapter": 4
  },
  {
    "id": 16,
    "question": "Biển này có ý nghĩa như thế nào?",
    "options": [
      "1. Cấm dừng xe về hướng bên trái.",
      "2. Cấm dừng và đỗ xe theo hướng bên phải.",
      "3. Được phép đỗ xe và dừng xe theo hướng bên phải."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Biển chính: cấm dừng và đỗ xe - Biển phụ: hướng mũi tên chỉ bên phải - Cấm dừng và đỗ xe theo hướng bên phải.",
    "image": "images/driving_a1/q_16.jpg",
    "chapter": 4
  },
  {
    "id": 17,
    "question": "Biển nào báo hiệu &quot;Giao nhau có tín hiệu đèn&quot;?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Biển 1: Giao nhau với đường sắt có rào chắn - Biển 2: Giao nhau với đường ưu tiên - Biển 3: Giao nhau với tin hiệu đèn ( chú ý đèn giao thông trong biển). Hỏi đèn thì kiếm đèn mà chọn.",
    "image": "images/driving_a1/q_17.jpg",
    "chapter": 4
  },
  {
    "id": 18,
    "question": "Biển nào báo hiệu &quot;Đường giao nhau&quot; của các tuyến đường cùng cấp?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển 1: Giao nhau tuyến đường cùng cấp - Biển 2: Giao nhau với đường không ưu tiên - Biển 3: Giao nhau với đường ưu tiên ( biển tam giác ngược)",
    "image": "images/driving_a1/q_18.jpg",
    "chapter": 4
  },
  {
    "id": 19,
    "question": "Biển nào dưới đây là biển &quot;Cầu hẹp&quot;?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Biển 1: Cầu tạm - Biển 2: Cầu hẹp - Biển 3: Cầu quay – cầu cất.",
    "image": "images/driving_a1/q_19.jpg",
    "chapter": 4
  },
  {
    "id": 20,
    "question": "Biển nào (đặt trước ngã ba, ngã tư) cho phép xe được rẽ sang hướng khác?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Không biển nào."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Hướng đi phải theo các xe bắt buộc đi thẳng - Biển 2: Hướng đi phải theo các xe rẽ phải hoặc rẽ trái ( lưu ý biển này đặt “SAU” ngã 3, ngã 4) - Nên đáp án không có biển nào. Mẹo nhớ: đặt trước ngã ba chọn đáp án 3.",
    "image": "images/driving_a1/q_20.jpg",
    "chapter": 4
  },
  {
    "id": 21,
    "question": "Biển số 1 có ý nghĩa như thế nào?",
    "options": [
      "1. Biển chỉ dẫn hết cấm đỗ xe theo giờ trong khu vực.",
      "2. Biển chỉ dẫn hết hiệu lực khu vực đỗ xe trên các tuyến đường đối ngoại.",
      "3. Biển chỉ dẫn khu vực đỗ xe trên các tuyến đường đối ngoại."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển 1: Hết cấm đỗ xe theo giờ trong khu vực - Biển 2: Hết cấm đỗ xe trong khu vực - Biển 3: Hết khu vực đỗ xe.",
    "image": "images/driving_a1/q_21.jpg",
    "chapter": 4
  },
  {
    "id": 22,
    "question": "Tại đoạn đường có biển &quot;Làn đường dành riêng cho từng loại xe&quot; dưới đây, các phương tiện có được phép chuyển sang làn khác để đi theo hành trình mong muốn khi đến gần nơi đường bộ giao nhau hay không?",
    "options": [
      "1. Được phép chuyển sang làn khác.",
      "2. Không được phép chuyển sang làn khác, chỉ được đi trong làn quy định theo biển."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển số R.412 Làn đường dành riêng cho từng loại xe hoặc nhóm xe: Khi đến gần nơi đường bộ giao nhau, xe được phép chuyển làn để đi theo hành trình mong muốn. Việc chuyển làn phải thực hiện theo đúng quy định.",
    "image": "images/driving_a1/q_22.jpg",
    "chapter": 4
  },
  {
    "id": 23,
    "question": "Theo tín hiệu đèn, xe nào được phép đi?",
    "options": [
      "1. Xe con và xe khách.",
      "2. Xe mô tô."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Xe con và xe khách đèn xanh nên được phép đi. Xe mô tô đèn đỏ dừng lại.",
    "image": "images/driving_a1/q_23.jpg",
    "chapter": 5
  },
  {
    "id": 24,
    "question": "Xe nào được quyền đi trước trong trường hợp này?",
    "options": [
      "1. Xe mô tô.",
      "2. Xe con."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Thứ tự xét xe đi: Xe trong giao lộ – Xe ưu tiên – Đường ưu tiên – Bên phải trống – rẽ phải – đi thẳng – rẽ trái Xe mô tô đang trên đường ưu tiên và biển phụ ưu tiên rẽ trái qua đường ưu tiên nên được quyền đi trước.",
    "image": "images/driving_a1/q_24.jpg",
    "chapter": 5
  },
  {
    "id": 25,
    "question": "Bạn có được phép vượt xe mô tô phía trước không?",
    "options": [
      "1. Cho phép.",
      "2. Không được vượt."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Phía trước là đường ưu tiên (biển báo tam giác ngược), không được vượt mà phải nhường.",
    "image": "images/driving_a1/q_25.jpg",
    "chapter": 1
  },
  {
    "id": 26,
    "question": "“Làn đường” là gì?",
    "options": [
      "1. Là một phần của phần đường xe chạy được chia theo chiều dọc của đường, sử dụng cho xe chạy.",
      "2. Là một phần của phần đường xe chạy được chia theo chiều dọc của đường, có đủ chiều rộng cho xe chạy an toàn.",
      "3. Là đường cho xe ô tô chạy, dừng, đỗ an toàn."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Làn đường có chiều rộng cho xe chạy an toàn",
    "image": null,
    "chapter": 1
  },
  {
    "id": 27,
    "question": "Hành vi nào dưới đây bị nghiêm cấm?",
    "options": [
      "1. Sử dụng xe đạp đi trên các tuyến quốc lộ.",
      "2. Rải vật sắc nhọn, đổ chất gây trơn trượt trên đường bộ.",
      "3. Cả hai ý trên."
    ],
    "answer": 2,
    "isParalyzed": true,
    "explain": "Không cấm đi xe đạp trên quốc lộ, nhưng rải vật nhọn hoặc đổ chất gây trơn trượt gây nguy hiểm sẽ bị cấm.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 28,
    "question": "Các hành vi nào sau đây bị cấm đối với phương tiện tham gia giao thông đường bộ?",
    "options": [
      "1. Cải tạo xe ô tô loại khác thành xe ô tô chở người phục vụ mục đích quốc phòng, an ninh.",
      "2. Cải tạo trái phép; cố ý can thiệp làm sai lệch chỉ số trên đồng hồ báo quãng đường đã chạy của xe ô tô; cắt, hàn, tẩy xóa, đục sửa, đóng lại trái phép số khung, số động cơ của xe cơ giới, xe máy chuyên dùng."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Hễ có từ :trái phép, can thiệp sai lệch, tẩy xóa, đục sửa thì chắc chắn là hành vi bị cấm. Mục đích quốc phòng, an ninh nếu được cấp phép thì không bị cấm.",
    "image": null,
    "chapter": 3
  },
  {
    "id": 29,
    "question": "Khi ở một vị trí vừa có biển báo hiệu đặt cố định vừa có biển báo hiệu tạm thời mà hai biển có ý nghĩa khác nhau, người tham gia giao thông đường bộ phải chấp hành hiệu lệnh của biển báo hiệu nào?",
    "options": [
      "1. Biển báo hiệu đặt cố định.",
      "2. Biển báo hiệu tạm thời.",
      "3. Theo quyết định của người tham gia giao thông nhưng phải bảo đảm an toàn."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Biển tạm thời = Ưu tiên xử lý tình huống giao thông bất thường, nên phải chấp hành trước.",
    "image": null,
    "chapter": 4
  },
  {
    "id": 30,
    "question": "Người lái xe không được vượt xe khác khi gặp trường hợp nào dưới đây?",
    "options": [
      "1. Trên cầu hẹp có một làn đường; nơi đường giao nhau, đường bộ giao nhau cùng mức với đường sắt; khi gặp xe ưu tiên.",
      "2. Trên cầu có từ 02 làn xe trở lên.",
      "3. Trên đường có 02 làn đường được phân chia làn bằng vạch kẻ nét đứt."
    ],
    "answer": 1,
    "isParalyzed": true,
    "explain": "Đáp án đúng là: 1, Vì đây là những tình huống tiềm ẩn nguy cơ tai nạn cao và bị cấm vượt theo luật.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 31,
    "question": "Người được chở trên xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy khi tham gia giao thông đường bộ không được thực hiện hành vi nào sau đây?",
    "options": [
      "1. Mang, vác vật cồng kềnh.",
      "2. Bám, kéo hoặc đẩy các phương tiện khác.",
      "3. Dùng tay cầm điện thoại hoặc các thiết bị điện tử khác.",
      "4. Ý 1 và ý 2."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Người ngồi sau: không vác, bám kéo phương tiện khác nhưng Được sử dụng điện thoại nhé.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 32,
    "question": "Trong các trường hợp dưới đây, để bảo đảm an toàn khi tham gia giao thông, người lái xe mô tô cần thực hiện như thế nào?",
    "options": [
      "1. Phải đội mũ bảo hiểm theo đúng quy chuẩn kỹ thuật quốc gia và cài quai đúng quy cách, không sử dụng ô, điện thoại di động, thiết bị âm thanh (trừ thiết bị trợ thính).",
      "2. Phải đội mũ bảo hiểm khi trời mưa gió hoặc trời quá nắng; có thể sử dụng ô, điện thoại di động, thiết bị âm thanh nhưng phải bảo đảm an toàn.",
      "3. Phải đội mũ bảo hiểm khi cảm thấy mất an toàn giao thông hoặc khi chuẩn bị di chuyển quãng đường xa."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng là: 1. Vì đây là phương án phù hợp nhất với quy định pháp luật và nguyên tắc an toàn giao thông.",
    "image": null,
    "chapter": 3
  },
  {
    "id": 33,
    "question": "Người lái xe phải nhanh chóng giảm tốc độ, đi sát lề đường bên phải hoặc dừng lại để nhường đường cho các loại xe nào dưới đây?",
    "options": [
      "1. Xe chữa cháy của Cảnh sát phòng cháy, chữa cháy và cứu nạn, cứu hộ và xe chữa cháy của các lực lượng khác; xe của lực lượng quân sự, công an và kiểm sát; đoàn xe có xe Cảnh sát giao thông dẫn đường; xe cứu thương; xe hộ đê không có tín hiệu ưu tiên theo quy định.",
      "2. Xe ưu tiên gồm xe chữa cháy của Cảnh sát phòng cháy, chữa cháy và cứu nạn, cứu hộ và xe chữa cháy của các lực lượng khác được huy động đi làm nhiệm vụ chữa cháy; xe của lực lượng quân sự, công an và kiểm sát đi làm nhiệm vụ khẩn cấp; đoàn xe có xe Cảnh sát giao thông dẫn đường; xe cứu thương đi làm nhiệm vụ cấp cứu; xe hộ đê đi làm nhiệm vụ; xe đi làm nhiệm vụ cứu nạn, cứu hộ, khắc phục sự cố thiên tai, dịch bệnh hoặc xe đi làm nhiệm vụ trong tình trạng khẩn cấp theo quy định của pháp luật; đoàn xe tang.",
      "3. Xe ô tô, xe máy, đoàn xe đang diễu hành có tổ chức có báo tín hiệu xin vượt bằng còi và đèn."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Gặp Xe ưu tiên đang làm nhiệm vụ bắt buộc phải nhường!",
    "image": null,
    "chapter": 1
  },
  {
    "id": 34,
    "question": "Khi có xe xin vượt, người lái xe mô tô xử lý như thế nào nếu đủ điều kiện an toàn cho xe phía sau vượt?",
    "options": [
      "1. Giảm tốc độ, có tín hiệu rẽ phải để báo hiệu cho người điều khiển phương tiện tham gia giao thông đường bộ phía sau biết được vượt và đi sát về bên phải của phần đường xe chạy cho đến khi xe sau đã vượt qua, không được cản trở đối với xe xin vượt.",
      "2. Lái xe vào lề đường bên trái và giảm tốc độ để xe phía sau vượt qua, không được gây trở ngại đối với xe xin vượt.",
      "3. Tăng tốc độ, đi sát về bên phải của phần đường xe chạy cho đến khi xe sau đã vượt qua."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Xe sau xin vượt thi phải giảm tốc độ và đi sát về bên phải.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 35,
    "question": "Người có giấy phép lái xe đã bị trừ hết điểm phải làm gì để phục hồi điểm giấy phép lái xe?",
    "options": [
      "1. Không vi phạm pháp luật trật tự, an toàn giao thông đường bộ trong thời gian 12 tháng kể từ ngày bị trừ hết điểm.",
      "2. Sau thời hạn ít nhất là 06 tháng kể từ ngày bị trừ hết điểm, người có phép lái xe được tham gia kiểm tra nội dung kiến thức pháp luật về trật tự, an toàn giao thông đường bộ theo quy định, có kết quả đạt yêu cầu thì được phục hồi đủ 12 điểm.",
      "3. Cả hai ý trên."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "• Phục hồi điểm: Sau khi thi lại bài kiểm tra nội dung kiến thức pháp luật giao thông đường bộ. Đây là quy định.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 36,
    "question": "Khái niệm về văn hóa giao thông được hiểu như thế nào là đúng?",
    "options": [
      "1. Là sự hiểu biết và chấp hành nghiêm chỉnh pháp luật về giao thông, là ý thức trách nhiệm với cộng đồng khi tham gia giao thông.",
      "2. Là sự tôn trọng, nhường nhịn, giúp đỡ và ứng xử có văn hóa giữa những người tham gia giao thông với nhau.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đáp án đúng: 3. Vì văn hóa giao thông gồm cả ý thức pháp luật và cách ứng xử có văn hóa trên đường.",
    "image": null,
    "chapter": 2
  },
  {
    "id": 37,
    "question": "Khi điều khiển xe trên đường vòng người lái xe cần phải làm gì để bảo đảm an toàn?",
    "options": [
      "1. Quan sát cẩn thận các chướng ngại vật và báo hiệu bằng coi, đèn; giảm tốc độ tới mức cần thiết, về số thấp và thực hiện quay vòng với tốc độ phù hợp với bán kính cong của đường vòng.",
      "2. Quan sát cẩn thận các chướng ngại vật và báo hiệu bằng còi, đèn; tăng tốc để nhanh chóng qua đường vòng và giảm tốc độ sau khi qua đường vòng."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Qua đường vòng ưu tiên giảm tốc độ để đảm bảo an toàn, không nên tăng tốc vì dễ xảy ra tình huống nguy hiểm.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 38,
    "question": "Tay ga trên xe mô tô hai bánh có tác dụng gì dưới đây?",
    "options": [
      "1. Để điều khiển xe chạy về phía trước.",
      "2. Để điều tiết công suất động cơ qua đó điều khiển tốc độ của xe.",
      "3. Để điều khiển xe chạy lùi.",
      "4. Ý 1 và ý 2."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Tay ga trên xe tay ga giúp điều tiết tốc độ của xe và giúp xe đi về phía trước, không có tác dụng cho xe chạy lùi.",
    "image": null,
    "chapter": 3
  },
  {
    "id": 39,
    "question": "Biển nào cấm xe rẽ trái?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Cả hai biển."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển 1: Cấm rẽ trái không cấm quay đầu - Biển 2: Cấm quay đầu không cấm rẽ trái. Nên chọn biển 1.",
    "image": "images/driving_a1/q_39.jpg",
    "chapter": 4
  },
  {
    "id": 40,
    "question": "Biển nào cấm tất cả các loại xe cơ giới và thô sơ đi lại trên đường, trừ xe ưu tiên theo luật định (nếu đường vẫn cho xe chạy được)?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Cả hai biển."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển 1: Đường cấm không áp dụng với xe ưu tiên - Biển 2: Dừng lại áp dụng với tất cả các phương tiện với cả xe ưu tiên. Nên chọn biển 1.",
    "image": "images/driving_a1/q_40.jpg",
    "chapter": 4
  },
  {
    "id": 41,
    "question": "Biển nào là biển &quot;Tốc độ tối đa cho phép về ban đêm&quot;?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Cả hai biển."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển 1: Tốc độ tối đa cho phép về ban đêm cho các phương tiện là 70km/h/ Biển 2: Tốc độ tối đa 50km/h.",
    "image": "images/driving_a1/q_41.jpg",
    "chapter": 4
  },
  {
    "id": 42,
    "question": "Biển nào báo hiệu nguy hiểm giao nhau với đường sắt?",
    "options": [
      "1. Biển 1 và Biển 2.",
      "2. Biển 1 và Biển 3.",
      "3. Biển 2 và Biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Biển 1: Giao nhau đường sắt có rào chắm - Biển 2: Báo hiệu giao nhau đường 2 chiều - Biển 3: Giao nhau đường sắt vuông góc với đường bộ. Nên chọn biển 1 và 3.",
    "image": "images/driving_a1/q_42.jpg",
    "chapter": 4
  },
  {
    "id": 43,
    "question": "Biển nào báo hiệu &quot;Đường hai chiều&quot;?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển 1: Đường 2 chiều - Biển 2: Nhường đường cho xe cơ giới ngược chiều qua đường hẹp - Biển 3: Được ưu tiên qua nơi đường hẹp.",
    "image": "images/driving_a1/q_43.jpg",
    "chapter": 4
  },
  {
    "id": 44,
    "question": "Gặp biển nào người tham gia giao thông phải đi chậm và thận trọng đề phòng khả năng xuất hiện và di chuyển bất ngờ của trẻ em trên mặt đường?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Biển 1: Nhường đường dành cho người đi bộ - Biển 2: Báo hiệu thường có trẻ em ngang, trường học.",
    "image": "images/driving_a1/q_44.jpg",
    "chapter": 4
  },
  {
    "id": 45,
    "question": "Biển nào báo hiệu &quot;Hướng đi thẳng phải theo&quot;?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2"
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển 1: Biển báo hiệu lệnh hướng đi thẳng phải theo - Biển 2: Đường 1 chiều.",
    "image": "images/driving_a1/q_45.jpg",
    "chapter": 4
  },
  {
    "id": 46,
    "question": "Biển nào chỉ dẫn cho người đi bộ sử dụng cầu vượt qua đường?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2",
      "3. Cả hai biển",
      "4. Không biển nào."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển 1: Người đi bộ sử dụng Cầu vượt ( đi lên là cầu vượt) - Biển 2: Người đi bộ sử dụng hầm chui ( đi xuống là hầm chui).",
    "image": "images/driving_a1/q_46.jpg",
    "chapter": 4
  },
  {
    "id": 47,
    "question": "Biển nào chỉ dẫn người lái xe đi được cả hai hướng?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Biển 1: Chỉ dẫn hưỡng rẽ bên phải - Biển 2: Chỉ dẫn đi cả 2 hướng.",
    "image": "images/driving_a1/q_47.jpg",
    "chapter": 4
  },
  {
    "id": 48,
    "question": "Theo tín hiệu đèn, xe nào đi là đúng quy tắc giao thông?",
    "options": [
      "1. Xe con và xe khách.",
      "2. Xe mô tô."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Xe con và xe khách đèn xanh nên được phép đi. Xe mô tô đèn đỏ dừng lại.",
    "image": "images/driving_a1/q_48.jpg",
    "chapter": 5
  },
  {
    "id": 49,
    "question": "Khổ giới hạn của đường bộ được hiểu như thế nào là đúng?",
    "options": [
      "1. Khổ giới hạn của đường bộ là khoảng trống có kích thước giới hạn về chiều rộng, chiều cao của đường bộ để các xe, bao gồm cả hàng hoá xếp trên xe đi qua được an toàn và được xác định theo quy chuẩn, tiêu chuẩn kỹ thuật của đường bộ.",
      "2. Là khoảng trống có kích thước giới hạn về chiều rộng của đường, cầu, bến phà, hầm trên đường bộ để các xe kể cả hàng hóa xếp trên xe đi qua được an toàn.",
      "3. Là khoảng trống có kích thước giới hạn về chiều cao của cầu, bến phà, hầm trên đường bộ để các xe đi qua được an toàn."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Khổ giới hạn của đường bộ là khoảng trống có kích thước giới hạn về chiều rộng, chiều cao.",
    "image": null,
    "chapter": 3
  },
  {
    "id": 50,
    "question": "Người điều khiển giao thông đường bộ được hiểu như thế nào là đúng?",
    "options": [
      "1. Là người điều khiển phương tiện tham gia giao thông đường bộ.",
      "2. Là Cảnh sát giao thông và người được giao nhiệm vụ hướng dẫn giao thông trên đường bộ.",
      "3. Là người tham gia giao thông đường bộ."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Cảnh sát giao thông điều phối luồng xe ngoài đường.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 51,
    "question": "Hành vi nào sau đây bị cấm?",
    "options": [
      "1. Lắp đặt, sử dụng thiết bị âm thanh, ánh sáng trên xe cơ giới, xe máy chuyên dùng gây mất trật tự, an toàn giao thông đường bộ.",
      "2. Cản trở người, phương tiện tham gia giao thông trên đường bộ; ném gạch, đất, đá, cát hoặc vật thể khác vào người, phương tiện đang tham gia giao thông trên đường bộ.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": true,
    "explain": "Cả đáp 1 và 2 đều là hành vi bị nghiêm cấm.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 52,
    "question": "Tại nơi đường giao nhau, khi đèn điều khiển giao thông có tín hiệu màu vàng, người điều khiển phương tiện tham gia giao thông phải chấp hành như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Dừng lại trước vạch dừng; trường hợp đang đi trên vạch dừng hoặc đã đi qua vạch dừng mà tín hiệu đèn màu vàng thì được đi tiếp; trường hợp tín hiệu đèn màu vàng nhấp nháy, người điều khiển phương tiện tham gia giao thông đường bộ được đi nhưng phải quan sát, giảm tốc độ hoặc dừng lại nhường đường cho người đi bộ, xe lăn của người khuyết tật qua đường hoặc các phương tiện khác.",
      "2. Tăng tốc độ nhanh chóng vượt qua nút giao.",
      "3. Quan sát, giảm tốc độ, từ từ vượt qua nút giao."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Tín hiệu đèn vàng có hai trường hợp, một là đèn tín hiệu giao thông đỏ vàng xanh nếu chuyển qua giây vàng mà lỡ qua vạch dừng thì đi tiếp. Còn lại là tín hiệu vàng nhấp nháy báo đi chậm.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 53,
    "question": "Khi điều khiển phương tiện tham gia giao thông, hành vi nào sau đây bị cấm?",
    "options": [
      "1. Dùng tay cầm và sử dụng điện thoại hoặc thiết bị điện tử khác.",
      "2. Chỉ được chở người trên thùng xe ô tô chở hàng trong trường hợp chở người đi làm nhiệm vụ cứu nạn, cứu hộ, phòng, chống thiên tai, dịch bệnh hoặc thực hiện nhiệm vụ khẩn cấp."
    ],
    "answer": 1,
    "isParalyzed": true,
    "explain": "Đáp án 1 là đúng vì Hành vi sử dụng điện thoại khi tham gia giao thông là bị nghiêm cấm.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 54,
    "question": "Người được chở trên xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy khi tham gia giao thông đường bộ có được bám, kéo hoặc đẩy các phương tiện khác không?",
    "options": [
      "1. Được phép.",
      "2. Được bám trong trường hợp phương tiện của mình bị hỏng.",
      "3. Được kéo, đẩy trong trường hợp phương tiện khác bị hỏng.",
      "4. Không được phép."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Không được phép đẩy kéo các phương tiện khác.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 55,
    "question": "Thứ tự xuống phà như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Xe thô sơ, người đi bộ xuống trước, xe cơ giới, xe máy chuyên dùng xuống sau.",
      "2. Xe cơ giới, xe máy chuyên dùng xuống trước, xe thô sơ, người đi bộ xuống sau.",
      "3. Xe cơ giới, xe thô sơ xuống trước, xe máy chuyên dùng, người đi bộ xuống sau."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Khi xuống phà, xe cơ giới, xe máy chuyên dùng xuống trước, xe thô sơ, người đi bộ xuống sau; khi lên bến, người đi bộ lên trước, các phương tiện giao thông đường bộ lên sau theo hướng dẫn của người điều khiển giao thông. Đây là quy định hiện hành.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 56,
    "question": "Khi có tín hiệu của xe ưu tiên, người và phương tiện tham gia giao thông đường bộ phải tuân thủ quy định nào dưới đây?",
    "options": [
      "1. Giảm tốc độ, đi sát lề đường bên phải hoặc dừng lại để nhường đường.",
      "2. Tăng tốc độ và đi sát lề đường bên phải để nhường đường.",
      "3. Giảm tốc độ, đi sát lề đường bên trái để nhường đường."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Gặp xe ưu tiên đang phát tín hiệu ưu tiên, các phương tiện bắt buộc phải Giảm tốc độ, đi sát lề đường bên phải hoặc dừng lại để nhường đường.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 57,
    "question": "Những trường hợp nào dưới đây không được đi trên đường cao tốc, trừ người, phương tiện giao thông đường bộ và thiết bị phục vụ việc quản lý, bảo trì đường cao tốc?",
    "options": [
      "1. Xe máy chuyên dùng có tốc độ thiết kế nhỏ hơn tốc độ tối thiểu quy định đối với đường cao tốc, xe chở người bốn bánh có gắn động cơ, xe chở hàng bốn bánh có gắn động cơ, xe mô tô, xe gắn máy, các loại xe tương tự xe mô tô, xe gắn máy, xe thô sơ, người đi bộ.",
      "2. Xe máy chuyên dùng có tốc độ thiết kế lớn hơn tốc độ tối thiểu quy định đối với đường cao tốc.",
      "3. Xe ô tô và xe máy chuyên dùng có tốc độ thiết kế lớn hơn 80 km/h."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đáp án đúng: 1. Vì đây là tập hợp đầy đủ và chính xác các phương tiện và đối tượng không được phép đi vào đường cao tốc theo luật.",
    "image": null,
    "chapter": 3
  },
  {
    "id": 58,
    "question": "Trách nhiệm của tổ chức, cá nhân đứng tên trong giấy chứng nhận đăng ký xe khi chưa thực hiện thu hồi chứng nhận đăng ký xe, biển số xe được quy định như thế nào?",
    "options": [
      "1. Tiếp tục chịu trách nhiệm của chủ xe.",
      "2. Không chịu trách nhiệm sau khi đã chuyển nhượng, trao đổi, tặng, cho."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Chưa sang tên – Trách nhiệm còn nguyên. Muốn hết trách nhiệm → Phải thu hồi biển số và đăng ký xe theo đúng thủ tục. Đáp án 1 là đúng.",
    "image": null,
    "chapter": 4
  },
  {
    "id": 59,
    "question": "Người lái xe không điều khiển xe đi đúng làn đường quy định, phóng nhanh, vượt ẩu, vượt đèn đỏ, đi vào đường cấm được coi là hành vi nào trong các hành vi dưới đây?",
    "options": [
      "1. Là thiếu văn hóa giao thông, vi phạm pháp luật về trật tự, an toàn giao thông đường bộ.",
      "2. Là thiếu văn hóa giao thông."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Các hành vi trên không chỉ là hành vi thiếu văn hóa giao thông mà còn gây mất an toàn giao thông đường bộ, vi phạm pháp luật.",
    "image": null,
    "chapter": 2
  },
  {
    "id": 60,
    "question": "Khi điều khiển xe qua đường sắt, người lái xe cần phải thực hiện các thao tác nào dưới đây để bảo đảm an toàn?",
    "options": [
      "1. Khi có chuông báo hoặc thanh chắn đã hạ xuống, người lái xe phải dừng xe tạm thời đúng khoảng cách an toàn, kéo phanh tay nếu đường dốc hoặc phải chờ lâu",
      "2. Khi không có chuông báo hoặc thanh chắn không hạ xuống, người lái xe cần phải quan sát nếu thấy đủ điều kiện an toàn thì về số thấp, tăng ga nhẹ và không thay đổi số trong quá trình vượt qua đường sắt để tránh động cơ chết máy cho xe cho vượt qua.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Cả hai đáp án tương ứng với 2 tình huống đều tuân theo quy tắc đảm bảo an toàn khi qua đường sắt, đúng với Luật Trật tự, an toàn giao thông đường bộ hiện hành.",
    "image": null,
    "chapter": 3
  },
  {
    "id": 61,
    "question": "Gương chiếu hậu của xe mô tô hai bánh có tác dụng gì dưới đây?",
    "options": [
      "1. Để quan sát an toàn phía bên trái khi chuẩn bị rẽ trái.",
      "2. Để quan sát an toàn phía bên phải khi chuẩn bị rẽ phải.",
      "3. Để quan sát an toàn phía sau của bên trái và bên phải trước khi chuyển hướng.",
      "4. Để quan sát an toàn phía trước cả bên trái và bên phải trước khi chuyển hướng."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Chiếu hậu có nghĩa là phía sau, gương chiếu hậu sẽ giúp bạn quan sát được phía sau cả bên phải lẫn bên trái.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 62,
    "question": "Biển nào xe được phép rẽ trái?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Không biển nào."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Biển 1: cấm rẽ trái được quay đầu - Biển 2: cấm quay đầu được rẽ trái.",
    "image": "images/driving_a1/q_62.jpg",
    "chapter": 4
  },
  {
    "id": 63,
    "question": "Biển báo này có ý nghĩa như thế nào?",
    "options": [
      "1. Tốc độ tối đa cho phép về ban đêm cho các phương tiện là 70 km/h.",
      "2. Tốc độ tối thiểu cho phép về ban đêm cho các phương tiện là 70 km/h."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển báo có viền đỏ tương ứng với loại biển báo cấm, kèm theo ghi chú thêm 70 (có nghĩa là 70km/h), có ý nghĩa là không được vượt quá con số đó –&gt; tối đa chỉ tới 70km/h.",
    "image": "images/driving_a1/q_63.jpg",
    "chapter": 4
  },
  {
    "id": 64,
    "question": "Biển nào báo hiệu hạn chế tốc độ của phương tiện không vượt quá trị số ghi trên biển?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Biển 1: Biển báo tốc độ tối thiểu - Biển 2: Biển báo tốc độ tối đa.",
    "image": "images/driving_a1/q_64.jpg",
    "chapter": 4
  },
  {
    "id": 65,
    "question": "Biển nào báo hiệu đường bộ giao nhau với đường sắt không có rào chắn?",
    "options": [
      "1. Biển 1 và biển 2.",
      "2. Biển 1 và biển 3.",
      "3. Biển 2 và biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Biển 1: Giao nhau với đường sát có rào chắn - Biển 2: Giao nhau với đường sắt không rào chắn - Biển 3: Nơi đường sắt giao vuông góc với đường bộ.",
    "image": "images/driving_a1/q_65.jpg",
    "chapter": 4
  },
  {
    "id": 66,
    "question": "Biển nào báo hiệu phải giảm tốc độ, nhường đường cho xe cơ giới đi ngược chiều qua đường hẹp?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2",
      "3. Biển 3"
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Biển 1: Đường 2 chiều - Biển 2: Giảm tốc độ nhường đường cho xe cơ giới đi ngược chiều - Biển 3: Được ưu tiên qua nơi đường hẹp.",
    "image": "images/driving_a1/q_66.jpg",
    "chapter": 5
  },
  {
    "id": 67,
    "question": "Biển nào chỉ dẫn nơi bắt đầu đoạn đường dành cho người đi bộ?",
    "options": [
      "1. Biển 1",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Biển 1: Nhường đường dành cho người đi bộ - Biển 2: Bắt đầu đoạn đường dành (màu xanh) cho người đi bộ - Biển 3: Báo hiệu có trẻ em cắt ngang qua.",
    "image": "images/driving_a1/q_67.jpg",
    "chapter": 4
  },
  {
    "id": 68,
    "question": "Biển nào báo hiệu &quot;Đường một chiều&quot;?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Cả hai biển."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Biển 1: Hướng đi thẳng phải theo (hình tròn nền xanh phải theo) - Biển 2: Đường 1 chiều. (Một = mập, chọn mũi tên mập hơn) hơn là chọn)",
    "image": "images/driving_a1/q_68.jpg",
    "chapter": 4
  },
  {
    "id": 69,
    "question": "Biển nào chỉ dẫn cho người đi bộ sử dụng hầm chui qua đường?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Cả hai biển.",
      "4. Không biển nào."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Hầm chui đi xuống, cầu vượt đi lên.",
    "image": "images/driving_a1/q_69.jpg",
    "chapter": 4
  },
  {
    "id": 70,
    "question": "Theo tín hiệu đèn, xe nào đi là đúng quy tắc giao thông?",
    "options": [
      "1. Xe khách, xe mô tô.",
      "2. Xe con, xe tải.",
      "3. Xe tải, xe mô tô."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Xe con và xe tải đang trên làn đường có tín hiệu đèn xanh nên được phép đi. Đèn xanh được đi – đèn đỏ phải dừng.",
    "image": "images/driving_a1/q_70.jpg",
    "chapter": 5
  },
  {
    "id": 71,
    "question": "Xe nào vi phạm quy tắc giao thông?",
    "options": [
      "1. Xe khách.",
      "2. Xe mô tô.",
      "3. Xe con.",
      "4. Xe con và xe mô tô."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Vạch màu vàng nét liền không được đè. Xe con quay đầu đè vạch vàng nên sai.",
    "image": "images/driving_a1/q_71.jpg",
    "chapter": 5
  },
  {
    "id": 72,
    "question": "Theo tín hiệu đèn của xe cơ giới, xe nào vi phạm quy tắc giao thông?",
    "options": [
      "1. Xe mô tô.",
      "2. Xe ô tô con.",
      "3. Không xe nào vi phạm.",
      "4. Cả hai xe."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Biển báo hiệu lệnh hướng đi thẳng: nhưng xe con phát tín hiệu rẽ trái, xe mô tô rẽ phải nên sai cả 2 xe.",
    "image": "images/driving_a1/q_72.jpg",
    "chapter": 5
  },
  {
    "id": 73,
    "question": "Dải phân cách được lắp đặt để làm gì?",
    "options": [
      "1. Để phân chia các làn đường dành cho xe cơ giới và xe thô sơ trên đường cao tốc.",
      "2. Để phân chia phần đường xe chạy thành hai chiều riêng biệt hoặc để phân chia phần đường dành cho xe cơ giới và xe thô sơ hoặc của nhiều loại xe khác nhau trên cùng một chiều đường.",
      "3. Để phân tách phần đường xe chạy và hành lang an toàn giao thông."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Dải phân cách để phân chia 2 chiều xe chạy riêng biệt.",
    "image": "images/driving_a1/q_73.jpg",
    "chapter": 1
  },
  {
    "id": 74,
    "question": "Người điều khiển phương tiện tham gia giao thông đường bộ gồm những đối tượng nào dưới đây?",
    "options": [
      "1. Người điều khiển xe cơ giới, người điều khiển xe thô sơ.",
      "2. Người điều khiển xe máy chuyên dùng.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Người điều khiển phương tiện giao thông gồm cả xe cơ giới và xe máy chuyên dùng.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 75,
    "question": "Việc sản xuất, sử dụng, mua, bán trái phép biển số xe có bị nghiêm cấm hay không?",
    "options": [
      "1. Không bị nghiêm cấm.",
      "2. Bị nghiêm cấm.",
      "3. Bị nghiêm cấm tuỳ trường hợp."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Biển số xe là tài sản do cơ quan nhà nước có thẩm quyền cấp phát, việc làm giả, mua bán, sử dụng trái phép biển số bị nghiêm cấm.",
    "image": null,
    "chapter": 4
  },
  {
    "id": 76,
    "question": "Người lái xe trên đường cần chấp hành quy định về tốc độ tối đa như thế nào?",
    "options": [
      "1. Chỉ lớn hơn tốc độ tối đa cho phép khi đường vắng.",
      "2. Chỉ lớn hơn tốc độ tối đa cho phép khi vào ban đêm.",
      "3. Không vượt quá tốc độ tối đa cho phép."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Không được vượt quá tốc độ cho phép.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 77,
    "question": "Người lái xe sử dụng đèn như thế nào khi đi trên các đoạn đường qua khu đông dân cư có hệ thống chiếu sáng đang hoạt động?",
    "options": [
      "1. Chỉ bật đèn chiếu xa (đèn pha).",
      "2. Bật đèn chiếu xa (đèn pha) khi đường vắng, bật đèn chiếu gần (đèn cốt) khi có xe đi ngược chiều.",
      "3. Chỉ bật đèn chiếu gần (đèn cốt)."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Trong khu đông dân cư chỉ bật đèn chiếu gần (đèn cốt), tránh bật đèn pha gây ảnh hưởng người đối diện.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 78,
    "question": "Người lái xe, người được chở trên xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy phải thực hiện quy định nào dưới đây?",
    "options": [
      "1. Đội mũ bảo hiểm theo đúng quy chuẩn kỹ thuật quốc gia và cài quai đúng quy cách.",
      "2. Người lái xe phải đội mũ bảo hiểm, người được chở trên xe không nhất thiết phải đội mũ bảo hiểm.",
      "3. Phải đội mũ bảo hiểm nhưng không nhất thiết phải cài quai."
    ],
    "answer": 1,
    "isParalyzed": true,
    "explain": "Cứ đi xe mô tô, xe gắn máy: Phải đội mũ (), + cài quai = đúng luật.",
    "image": null,
    "chapter": 3
  },
  {
    "id": 79,
    "question": "Khi lái xe trong đô thị và khu đông dân cư trong thời gian từ 22 giờ ngày hôm trước đến 05 giờ ngày hôm sau, nếu cần vượt một xe khác, người lái xe phải báo hiệu như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Chỉ được báo hiệu bằng còi.",
      "2. Phải báo hiệu bằng cả còi và đèn.",
      "3. Chỉ được báo hiệu bằng đèn."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Còi 5 đến 22 – Đêm ngủ yên, “Còi thì chỉ bấm ban ngày, 5 giờ sáng đến 10 giờ tối, ban đêm để người ta ngủ thôi!”",
    "image": null,
    "chapter": 1
  },
  {
    "id": 80,
    "question": "Khi đang lái xe, phía trước có một xe Cảnh sát giao thông không phát tín hiệu ưu tiên, người lái xe có được phép vượt hay không?",
    "options": [
      "1. Không được vượt.",
      "2. Được phép vượt ở phần đường dành cho người đi bộ qua đường.",
      "3. Được vượt khi bảo đảm an toàn."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Xe ưu tiên không có tín hiệu → không có quyền ưu tiên.➡ Đáp án có chữ “bảo đảm an toàn” thường là đáp án đúng nếu không có cấm rõ ràng.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 81,
    "question": "Theo quy định về độ tuổi, người đủ bao nhiêu tuổi trở lên thì được cấp giấy phép lái xe mô tô hai bánh có dung tích xi lanh đến 125 cm3 và xe ô tô chở người đến 8 chỗ (không kể chỗ của người lái xe); xe ô tô tải và ô tô chuyên dùng có khối lượng toàn bộ theo thiết kế đến 3.500 kg?",
    "options": [
      "1. 16 tuổi.",
      "2. 17 tuổi",
      "3. 18 tuổi."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "👉18 tuổi – A1, B, C1. Đủ 18 tuổi là đủ điều kiện thi và được cấp bằng lái xe mô tô đến 125 cm³ và ô tô đến 8 chỗ hoặc tải trọng đến 3.500 kg.",
    "image": "images/driving_a1/q_81.jpg",
    "chapter": 1
  },
  {
    "id": 82,
    "question": "Trên đường bộ, trong khu vực đông dân cư, đường đôi hoặc đường một chiều có từ hai làn xe cơ giới trở lên, xe mô tô hai bánh, ô tô chở người đến 28 chỗ không kể chỗ của người lái xe tham gia giao thông với tốc độ khai thác tối đa cho phép là bao nhiêu?",
    "options": [
      "1. 60 km/h.",
      "2. 50 km/h.",
      "3. 40 km/h."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Trong khu vực đông dân cư: Đường đôi có 2 làn đường: 60km/h - Đường 1 chiều có 1 làn đường: 50km/h.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 83,
    "question": "Người lái xe có văn hóa giao thông khi tham gia giao thông đường bộ phải đáp ứng các điều kiện nào dưới đây?",
    "options": [
      "1. Hiểu biết và chấp hành nghiêm chỉnh pháp luật về giao thông đường bộ; có ý thức trách nhiệm với cộng đồng khi tham gia giao thông; tôn trọng, nhường nhịn,giúp đỡ và ứng xử có văn hóa với những người cùng tham gia giao thông.",
      "2. Điều khiển xe vượt quá tốc độ, đi không đúng làn đường."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "👉 Có văn hóa – Là phải hiểu luật, nhường nhịn và ứng xử đúng mực.",
    "image": null,
    "chapter": 2
  },
  {
    "id": 84,
    "question": "Trong các loại nhiên liệu dưới đây, loại nhiên liệu nào giảm thiểu ô nhiễm môi trường?",
    "options": [
      "1. Xăng và dầu diesel.",
      "2. Xăng sinh học và khí sinh học.",
      "3. Ý 1 và ý 2."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Cứ sinh học – là sạch môi trường.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 85,
    "question": "Để bảo đảm an toàn khi tham gia giao thông, người lái xe mô tô hai bánh cần điều khiển tay ga như thế nào?",
    "options": [
      "1. Tăng ga thật mạnh, giảm ga từ từ.",
      "2. Tăng ga thật mạnh, giảm ga thật nhanh.",
      "3. Tăng ga từ từ, giảm ga thật nhanh.",
      "4. Tăng ga từ từ, giảm ga từ từ."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Cách điều khiển tay ga an toàn: tăng ga từ từ, giảm ga thật nhanh.",
    "image": null,
    "chapter": 3
  },
  {
    "id": 86,
    "question": "Biển nào cấm các phương tiện rẽ phải?",
    "options": [
      "1. Biển 1 và 2.",
      "2. Biển 1 và 3.",
      "3. Biển 2 và 3.",
      "4. Cả ba biển."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển 1: Cấm các phương tiện rẽ phải - Biển 2: Cấm các phương tiện rẽ phải và quay đầu - Biển 3: Cấm xe ô tô rẽ phải và quay đầu - Nên chọn biển 1 và biển 2.",
    "image": "images/driving_a1/q_86.jpg",
    "chapter": 4
  },
  {
    "id": 87,
    "question": "Biển này có hiệu lực đối với xe mô tô hai bánh, ba bánh chở hàng không?",
    "options": [
      "1. Có.",
      "2. Không."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Cấm 2 bánh và 4 bánh cấm luôn cả 3 bánh.",
    "image": "images/driving_a1/q_87.jpg",
    "chapter": 4
  },
  {
    "id": 88,
    "question": "Số 50 ghi trên biển báo dưới đây có ý nghĩa như thế nào?",
    "options": [
      "1. Tốc độ tối đa các xe cơ giới được phép chạy.",
      "2. Tốc độ tối thiểu các xe cơ giới được phép chạy."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển tròn viền đỏ là biển báo cấm, kèm chú thích con số bên trong. Đây là con số không được vượt quá (tối đa).",
    "image": "images/driving_a1/q_88.jpg",
    "chapter": 4
  },
  {
    "id": 89,
    "question": "Biển nào báo hiệu sắp đến chỗ giao nhau giữa đường bộ và đường sắt?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3.",
      "4. Cả 1 và biển 3."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển 1: Giao nhau đường sắt không rào chắn - Biển 2: Giao nhau với đường ưu tiên - Biển 3: Giao nhau với tàu điện.",
    "image": "images/driving_a1/q_89.jpg",
    "chapter": 4
  },
  {
    "id": 90,
    "question": "Biển nào chỉ dẫn &quot;Được ưu tiên qua đường hẹp&quot;?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3.",
      "4. Cả 2 và biển 3."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Biển 1: Đường 2 chiều - Biển 2: Giảm tốc độ nhường đường cho xe cơ giới đi ngược chiều - Biển 3: Được ưu tiên qua nơi đường hẹp.",
    "image": "images/driving_a1/q_90.jpg",
    "chapter": 4
  },
  {
    "id": 91,
    "question": "Biển nào dưới đây báo hiệu gần đến đoạn đường thường có trẻ em đi ngang qua?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Biển 1: Nhường đường cho người đi bộ - Biển 2: Có trẻ em đi ngang qua - Biển 3: Đường người đi xe đạp cắt qua.",
    "image": "images/driving_a1/q_91.jpg",
    "chapter": 4
  },
  {
    "id": 92,
    "question": "Trong các biển dưới đây biển nào là biển &quot;Hết tốc độ tối đa cho phép&quot;?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển 1: Hết hạn chế tốc độ tối đa cho phép - Biển 2: Hết mọi lệnh cấm - Biển 3: Hết hạn chế tốc độ tối thiểu.",
    "image": "images/driving_a1/q_92.jpg",
    "chapter": 4
  },
  {
    "id": 93,
    "question": "Biển nào báo hiệu &quot;Nơi đỗ xe dành cho người khuyết tật&quot;?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Biển 1: Đường dành cho xe thô sơ - Biển 2: Nơi đỗ xe dành cho người khuyết tật - Biển 3: Dành cho người đi bộ.",
    "image": "images/driving_a1/q_93.jpg",
    "chapter": 4
  },
  {
    "id": 94,
    "question": "Vạch mũi tên chỉ hướng trên mặt đường nào dưới đây cho phép xe chỉ được đi thẳng và rẽ phải?",
    "options": [
      "1. Vạch 1.",
      "2. Vạch 2 và vạch 3.",
      "3. Vạch 3.",
      "4. Vạch 1 và vạch 2."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Vạch 1: rẽ phải - Vạch 2: đi thẳng và rẽ trái - Vạch 3: đi thẳng và rẽ phải.",
    "image": "images/driving_a1/q_94.jpg",
    "chapter": 1
  },
  {
    "id": 95,
    "question": "Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Xe khách, xe tải, xe mô tô, xe con.",
      "2. Xe con, xe khách, xe tải, xe mô tô.",
      "3. Xe mô tô, xe tải, xe khách, xe con.",
      "4. Xe mô tô, xe tải, xe con, xe khách."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Tại vòng xuyến không có biển báo nhường xe đi bên phải ( có biển báo nhường xe đi bên trái) Thứ tự: Xe mô tô – xe tải – xe khách – xe con.",
    "image": "images/driving_a1/q_95.jpg",
    "chapter": 5
  },
  {
    "id": 96,
    "question": "Theo hướng mũi tên, xe nào được phép đi?",
    "options": [
      "1. Xe mô tô, xe con.",
      "2. Xe con, xe tải.",
      "3. Xe mô tô, xe tải.",
      "4. Cả ba xe."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Gặp CSGT ưu tiên chọn đáp án 3, trừ trường hợp CSGT đừng trên bục giơ 2 tay sẽ chọn đáp án 4.",
    "image": "images/driving_a1/q_96.jpg",
    "chapter": 5
  },
  {
    "id": 97,
    "question": "Các xe đi theo hướng mũi tên, xe nào vi phạm quy tắc giao thông?",
    "options": [
      "1. Xe con, xe tải, xe khách.",
      "2. Xe tải, xe khách, xe mô tô.",
      "3. Xe khách, xe mô tô, xe con.",
      "4. Cả bốn xe."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Hướng mũi tên đỏ xe đang di chuyển, không có mũi tên đỏ là đang dừng. Xe con trên làn rẽ phải có tín hiệu đèn xanh– rẽ phải đúng -&gt; Xe tải trên làn đi thẳng có tín hiệu đèn đỏ dừng lại nhưng đi thẳng là sai -&gt; Xe khách trên làn rẽ trái có tín hiệu đèn xanh nhưng đi thẳng sai -&gt; Xe mô tô trên làn có tín hiệu đỏ dừng lại nhưng đi thẳng là sai.",
    "image": "images/driving_a1/q_97.jpg",
    "chapter": 5
  },
  {
    "id": 98,
    "question": "Vạch kẻ đường là gì?",
    "options": [
      "1. Là báo hiệu đường bộ để hỗ trợ cảnh báo nguy hiểm cho người tham gia giao thông đường bộ.",
      "2. Là vạch chỉ sự phân chia làn đường, vị trí hoặc hướng đi, vị trí dừng lại.",
      "3. Là báo hiệu cho người tham gia giao thông đường bộ về các thông tin của đường bộ.",
      "4. Cả ba ý trên."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Câu hỏi có chữ Vạch thì chọn đáp án có chữ Vạch đầu câu",
    "image": null,
    "chapter": 4
  },
  {
    "id": 99,
    "question": "Hành vi đưa xe cơ giới, xe máy chuyên dùng tham gia giao thông đường bộ nào dưới đây bị cấm?",
    "options": [
      "1. Không có chứng nhận kiểm định an toàn kỹ thuật và bảo vệ môi trường.",
      "2. Hết niên hạn sử dụng.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": true,
    "explain": "Xe không kiểm định hoặc quá hạn = cấm.",
    "image": null,
    "chapter": 3
  },
  {
    "id": 100,
    "question": "Khi điều khiển phương tiện tham gia giao thông, những hành vi nào dưới đây bị nghiêm cấm?",
    "options": [
      "1. Thay đổi tốc độ của xe nhiều lần.",
      "2. Điều khiển phương tiện sau 23 giờ trong ngày.",
      "3. Lạng lách, đánh võng, rú ga liên tục."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Các hành vi như lạng lách, đánh võng, rú ga là đặc trưng của việc phá hoại trật tự an toàn giao thông → luôn chọn là hành vi bị cấm.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 101,
    "question": "Phương tiện tham gia giao thông đường bộ di chuyển với tốc độ thấp hơn phải đi như thế nào?",
    "options": [
      "1. Đi về bên trái theo chiều đi của mình.",
      "2. Đi về bên phải theo chiều đi của mình.",
      "3. Đi ở bất cứ bên nào nhưng phải bấm đèn cảnh báo nguy hiểm để báo hiệu cho các phương tiện khác."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Chậm (nhường) phải, nhanh (vượt) trái ➡ Nhớ câu nói này để dễ dàng chọn đáp án đúng khi hỏi về vị trí di chuyển của phương tiện tốc độ thấp.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 102,
    "question": "Nơi nào cấm quay đầu xe?",
    "options": [
      "1. Ở phần đường dành cho người đi bộ qua đường, trên cầu, đầu cầu, gầm cầu vượt, ngầm.",
      "2. Tại nơi đường bộ giao nhau cùng mức với đường sắt, đường hẹp, đường dốc, đoạn đường cong tầm nhìn bị che khuất, trên đường cao tốc, trong hầm đường bộ, trên đường một chiều.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Cấm quay đầu xe trên cầu và trong hầm, đây là quy định.",
    "image": null,
    "chapter": 3
  },
  {
    "id": 103,
    "question": "Người lái xe mô tô hai bánh, xe gắn máy được phép chở tối đa hai người trong những trường hợp nào?",
    "options": [
      "1. Chở người bệnh đi cấp cứu; áp giải người có hành vi vi phạm pháp luật; trẻ em dưới 12 tuổi; người già yếu hoặc người khuyết tật.",
      "2. Người đã uống rượu, bia; người trong cơ thể có chất ma tuý.",
      "3. Cả hai ý trên."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Chở 2 khi thật cần: áp giải, người bệnh, trẻ nhỏ, người yếu. ➡ Nhớ kỹ những trường hợp đặc biệt cho phép chở 2 người.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 104,
    "question": "Khi điều khiển xe chạy trên đường, biết có xe sau xin vượt, nếu đủ điều kiện an toàn người điều khiển phương tiện phải làm gì?",
    "options": [
      "1. Tăng tốc độ và ra hiệu cho xe sau vượt, không được gây trở ngại cho xe xin vượt.",
      "2. Giảm tốc độ, có tín hiệu rẽ phải để báo hiệu cho người điều khiển phương tiện tham gia giao thông đường bộ phía sau biết được vượt và đi sát về bên phải của phần đường xe chạy cho đến khi xe sau đã vượt qua, không được cản trở đối với xe xin vượt.",
      "3. Cho xe đi sát về bên trái của phần đường xe chạy và ra hiệu cho xe sau vượt, không được gây trở ngại cho xe xin vượt."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Chậm (nhường) phải, nhanh (vượt) trái ➡ Nhớ câu nói này để dễ dàng chọn đáp án đúng khi hỏi về vị trí di chuyển của phương tiện tốc độ thấp",
    "image": null,
    "chapter": 1
  },
  {
    "id": 105,
    "question": "Khi đang lái xe, phía trước có một xe cứu thương đang phát tín hiệu ưu tiên, người lái xe có được phép vượt hay không?",
    "options": [
      "1. Không được vượt.",
      "2. Được vượt khi đang đi trên cầu.",
      "3. Được phép vượt khi đi qua nơi giao nhau có ít phương tiện cùng tham gia giao thông.",
      "4. Được vượt khi bảo đảm an toàn."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Gặp Xe ưu tiên đang làm nhiệm vụ bắt buộc phải nhường, không được vượt.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 106,
    "question": "Người đủ 16 tuổi đến dưới 18 tuổi chỉ được điều khiển các loại xe nào dưới đây?",
    "options": [
      "1. Xe mô tô hai bánh có dung tích xi-lanh đến 125 cm3.",
      "2. Xe gắn máy.",
      "3. Xe ô tô chở người đến 08 chỗ (không kể chỗ của người lái xe); xe ô tô tải và ô tô chuyên dùng có khối lượng toàn bộ theo thiết kế đến 3.500 kg; các loại xe ô tô quy định cho giấy phép lái xe hạng B kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg.",
      "4. Cả ba ý trên."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "16 - dưới 18 tuổi chỉ được điều khiển xe gắn máy.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 107,
    "question": "Trên đường bộ (trừ đường cao tốc) trong khu vực đông dân cư, đường hai chiều hoặc đường một chiều có một làn xe cơ giới, xe mô tô hai bánh, ô tô chở người đến 28 chỗ không kể chỗ của người lái xe tham gia giao thông với tốc độ khai thác tối đa cho phép là bao nhiêu?",
    "options": [
      "1. 60 km/h.",
      "2. 50 km/h.",
      "3. 40 km/h."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Trong khu vực đông dân cư: Đường đôi có 2 làn đường: 60km/h - Đường 1 chiều có 1 làn đường: 50km/h.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 108,
    "question": "Người lái xe mô tô có văn hóa giao thông khi tham gia giao thông phải tuân thủ những quy định nào dưới đây?",
    "options": [
      "1. Điều khiển xe đi bên phải theo chiều đi của mình; đi đúng phần đường, làn đường quy định; đội mũ bảo hiểm đúng quy chuẩn kỹ thuật quốc gia, cài quai đúng quy cách.",
      "2. Điều khiển xe đi trên phần đường, làn đường có ít phương tiện tham gia giao thông.",
      "3. Điều khiển xe và đội mũ bảo hiểm ở nơi có biển báo bắt buộc đội mũ bảo hiểm."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đi đúng làn, bên phải, mũ bảo hiểm chuẩn ➡ Câu trả lời đầy đủ nhất, đầy đủ các quy định cơ bản về văn hóa giao thông.",
    "image": null,
    "chapter": 3
  },
  {
    "id": 109,
    "question": "Các biện pháp tiết kiệm nhiên liệu khi chạy xe?",
    "options": [
      "1. Bảo dưỡng xe theo định kỳ và có kế hoạch lộ trình trước khi xe chạy.",
      "2. Kiểm tra áp suất lốp theo quy định và chạy xe với tốc độ phù hợp với tình trạng mặt đường và mật độ giao thông trên đường.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Chăm xe tốt + chạy hợp lý = tiết kiệm nhiên liệu. Nên chọn cả hai ý trên.",
    "image": null,
    "chapter": 3
  },
  {
    "id": 110,
    "question": "Để tránh đổ, ngã khi điều khiển xe mô tô hai bánh ở nơi đường xấu, nhỏ và hẹp, người lái xe cần xử lý như thế nào?",
    "options": [
      "1. Đi ở tốc độ thấp, quan sát liên tục khoảng cách từ 05 m đến 10 m phía trước để điều chỉnh sớm hướng di chuyển.",
      "2. Trong quá trình di chuyển không nên dùng phanh trước tránh làm khóa bánh dẫn hướng.",
      "3. Không được lắc người sang trái hoặc phải nhiều, trọng tâm cơ thể cần trùng với trọng tâm của xe.",
      "4. Cả ba ý trên."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Đi chậm, quan sát sớm, phanh nhẹ, giữ cân bằng -&gt; bình tĩnh xử lý để đảm bảo an toàn.",
    "image": null,
    "chapter": 3
  },
  {
    "id": 111,
    "question": "Biển nào cấm các phương tiện rẽ trái?",
    "options": [
      "1. Biển 1 và 2.",
      "2. Biển 1 và 3.",
      "3. Biển 2 và 3.",
      "4. Cả ba biển."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển 1: Cấm các phương tiện rẽ trái - Biển 2: Cấm các phương tiện rẽ trái và quay đầu - Biển 3: Cấm xe ô tô rẽ trái và quay đầu.",
    "image": "images/driving_a1/q_111.jpg",
    "chapter": 4
  },
  {
    "id": 112,
    "question": "Biển này có ý nghĩa như thế nào?",
    "options": [
      "1. Cấm xe cơ giới (trừ xe ưu tiên theo luật định) đi thẳng.",
      "2. Cấm các loại xe cơ giới và xe mô tô (trừ xe ưu tiên theo luật định) đi về bên trái và bên phải.",
      "3. Hướng trái và phải không cấm xe cơ giới."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Thứ nhất: Đây là loại biển báo cấm kèm chú thích xe ô tô (xe cơ giới) và xe mô tô (có người ngồi trên). Thứ 2, biển phụ chỉ định hai chiều trái phải. Vì thế chọn đáp án 2.",
    "image": "images/driving_a1/q_112.jpg",
    "chapter": 4
  },
  {
    "id": 113,
    "question": "Biển báo dưới đây có ý nghĩa như thế nào?",
    "options": [
      "1. Báo hiệu tốc độ tối đa cho phép các xe cơ giới chạy.",
      "2. Báo hiệu tốc độ tối thiểu cho phép các xe cơ giới chạy."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Đây là biển báo hiệu lệnh đi kèm số chỉ định, thể hiện rằng người lái xe cần duy trì tốc độ từ 60 trở lên -&gt; biển báo tốc độ tối thiểu.",
    "image": "images/driving_a1/q_113.jpg",
    "chapter": 4
  },
  {
    "id": 114,
    "question": "Biển nào báo hiệu &quot;Cửa chui&quot;?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Biển 1: Đường cần vòng - Biển 2: Cửa chui - Biển 3: Đường hầm (có chiều sâu).",
    "image": "images/driving_a1/q_114.jpg",
    "chapter": 4
  },
  {
    "id": 115,
    "question": "Biển nào báo hiệu &quot;Đường đôi&quot;?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đường 2 chiều (mũi tên lên xuống trước mặt) - Biển 2: Giao nhau (cắt ngang) đường 2 chiều - Biển 3: Đường đôi.",
    "image": "images/driving_a1/q_115.jpg",
    "chapter": 4
  },
  {
    "id": 116,
    "question": "Biển nào sau đây là biển &quot;Dốc xuống nguy hiểm&quot;?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "9 Lên 10 Xuống.",
    "image": "images/driving_a1/q_116.jpg",
    "chapter": 4
  },
  {
    "id": 117,
    "question": "Trong các biển dưới đây biển nào là biển &quot;Hết tốc độ tối thiểu&quot;?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Biển 1: Hết cấm tốc độ tối đa - Biển 2: Hết mọi lệnh cấm - Biển 3: Hết tốc độ tối thiểu.",
    "image": "images/driving_a1/q_117.jpg",
    "chapter": 4
  },
  {
    "id": 118,
    "question": "Gặp biển báo này, người tham gia giao thông phải xử lý như thế nào?",
    "options": [
      "1. Dừng xe tại khu vực có trạm Cảnh sát giao thông.",
      "2. Tiếp tục lưu thông với tốc độ bình thường.",
      "3. Phải giảm tốc độ đến mức an toàn và không được vượt khi đi qua khu vực này."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Biển báo này báo trước vị trí trạm Cảnh sát Giao thông đường bộ để người tham gia giao thông nhận biết khu vực có lực lượng CSGT làm nhiệm vụ kiểm tra, kiểm soát giao thông. Phải giảm tốc độ và không được vượt.",
    "image": "images/driving_a1/q_118.jpg",
    "chapter": 4
  },
  {
    "id": 119,
    "question": "Vạch kẻ đường nào dưới đây là vạch phân chia hai chiều xe chạy (vạch tim đường), xe không được lấn làn, không được đè lên vạch?",
    "options": [
      "1. Vạch 1.",
      "2. Vạch 2.",
      "3. Vạch 3.",
      "4. Cả ba vạch."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Hai chiều màu vàng, cùng chiều (một chiều) màu trắng. Vạch đứt được đè, vạch liền thì không!",
    "image": "images/driving_a1/q_119.jpg",
    "chapter": 4
  },
  {
    "id": 120,
    "question": "Trong trường hợp này xe nào đỗ vi phạm quy tắc giao thông?",
    "options": [
      "1. Xe tải.",
      "2. Xe con và mô tô.",
      "3. Cả ba xe.",
      "4. Xe con và xe tải."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển báo chính cấm dừng và cấm đỗ, biển phụ hình xe tải, nên chỉ cấm tải.",
    "image": "images/driving_a1/q_120.jpg",
    "chapter": 5
  },
  {
    "id": 121,
    "question": "Trong hình dưới đây, xe nào chấp hành đúng quy tắc giao thông?",
    "options": [
      "1. Chỉ xe khách, xe mô tô.",
      "2. Tất cả các loại xe trên.",
      "3. Không xe nào chấp hành đúng quy tắc giao thông."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Hướng mũi tên đỏ xe đang di chuyển, không có mũi tên đỏ là đang dừng. Xe con đang trên làn có tín hiệu đèn xanh làn rẽ phải – rẽ phải đúng. Xe tải trên làn đi thẳng có tín hiệu đèn xanh - đi thẳng đúng. Xe khách trên làn rẽ trái có tín hiệu đèn đỏ dừng lại đúng/ Xe mô tô trên làn rẽ trái có tín hiệu đỏ dừng lại là đúng.",
    "image": "images/driving_a1/q_121.jpg",
    "chapter": 5
  },
  {
    "id": 122,
    "question": "Các xe đi theo hướng mũi tên, xe nào chấp hành đúng quy tắc giao thông?",
    "options": [
      "1. Xe tải, xe mô tô.",
      "2. Xe khách, xe mô tô.",
      "3. Xe tải, xe con.",
      "4. Xe mô tô, xe con."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Hướng mũi tên đỏ xe đang di chuyển, không có mũi tên đỏ là đang dừng. Xe con trên làn rẽ phải có tín hiệu đèn đỏ nhưng rẽ phải sai. Xe tải trên làn đi thẳng có tín hiệu đèn đỏ - đi thẳng sai. Xe khách trên làn rẽ trái có tín hiệu đèn xanh- rẽ trái đúng. Xe mô tô trên làn rẽ trái có tín hiệu đèn xanh – rẽ trái đúng.",
    "image": "images/driving_a1/q_122.jpg",
    "chapter": 5
  },
  {
    "id": 123,
    "question": "Người điều khiển phương tiện tham gia giao thông đường bộ được hiểu như thế nào là đúng?",
    "options": [
      "1. Là người điều khiển xe cơ giới, người điều khiển xe thô sơ, người điều khiển xe máy chuyên dùng.",
      "2. Là người được giao nhiệm vụ hướng dẫn giao thông trên đường bộ.",
      "3. Cả hai ý trên."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Nếu hỏi người điều khiển phương tiện → chọn nhóm người trực tiếp cầm lái.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 124,
    "question": "Tổ chức đua xe được phép thực hiện khi nào?",
    "options": [
      "1. Trên đường phố không có người qua lại.",
      "2. Được người dân ủng hộ.",
      "3. Được cơ quan có thẩm quyền cấp phép."
    ],
    "answer": 3,
    "isParalyzed": true,
    "explain": "Đua xe phải được cấp phép – Không tự ý dù vắng người hay được ủng hộ.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 125,
    "question": "Có bao nhiêu nhóm biển báo hiệu đường bộ?",
    "options": [
      "1. Ba nhóm: Biển báo cấm, biển báo nguy hiểm và biển hiệu lệnh.",
      "2. Bốn nhóm: Biển báo cấm, biển báo nguy hiểm, biển hiệu lệnh và biển phụ.",
      "3. Năm nhóm: Biển báo cấm, biển báo nguy hiểm, biển hiệu lệnh, biển chỉ dẫn, biển phụ."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Có 5 nhóm biển báo.",
    "image": null,
    "chapter": 4
  },
  {
    "id": 126,
    "question": "Trên một chiều đường có vạch kẻ phân làn đường, người lái xe cơ giới, xe máy chuyên dùng phải điều khiển xe đi trên làn đường nào?",
    "options": [
      "1. Đi trên làn đường bên phải trong cùng.",
      "2. Đi trên làn đường bên trái.",
      "3. Đi ở bất cứ làn nào nhưng phải bảo đảm tốc độ cho phép."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Xe thô sơ đi làm bên phải trong cùng, xe cơ giới đi làn bên trái.",
    "image": null,
    "chapter": 4
  },
  {
    "id": 127,
    "question": "Trước khi cho xe chuyển hướng, người lái xe phải làm gì để bảo đảm an toàn giao thông?",
    "options": [
      "1. Phải quan sát, bảo đảm khoảng cách an toàn với xe phía sau.",
      "2. Giảm tốc độ và có tín hiệu báo hướng rẽ.",
      "3. Chuyển dần sang làn gần nhất với hướng rẽ. Khi bảo đảm an toàn, không gây trở ngại cho người và phương tiện khác mới được chuyển hướng.",
      "4. Cả ba ý trên."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Quan sát trước – Báo hiệu sau – Đi đúng làn ➡ Ba bước chuẩn: Nhìn – Xi nhan – Lấn đúng làn → mới được rẽ.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 128,
    "question": "Người lái xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy không được thực hiện các hành vi nào dưới đây?",
    "options": [
      "1. Đi xe dàn hàng ngang; buông cả hai tay.",
      "2. Sử dụng xe để kéo, đẩy xe khác, vật khác, dẫn dắt vật nuôi, mang, vác và chở vật cồng kềnh; chở người đứng trên xe, giá đèo hàng hoặc ngồi trên tay lái; xếp hàng hóa trên xe quá giới hạn quy định.",
      "3. Ngồi về một bên điều khiển xe; đứng, nằm trên xe điều khiển xe; thay người lái xe khi xe đang chạy; quay người về phía sau để điều khiển xe hoặc bịt mắt điều khiển xe; sử dụng chân chống hoặc vật khác quệt xuống đường khi xe đang chạy.",
      "4. Cả ba ý trên."
    ],
    "answer": 4,
    "isParalyzed": true,
    "explain": "👉 Dàn hàng – Kéo đẩy – Diễn xiếc ➡ Hành vi nào gây nguy hiểm, mất kiểm soát, cản trở giao thông.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 129,
    "question": "Trên đường không phân chia thành hai chiều xe chạy riêng biệt, người điều khiển phương tiện tham gia giao thông đường bộ phải tránh xe đi ngược chiều như thế nào để bảo đảm an toàn?",
    "options": [
      "1. Giảm tốc độ và cho xe đi về bên phải theo chiều xe chạy của mình.",
      "2. Một trong hai xe phải dừng lại cho xe kia đi qua mới được đi.",
      "3. Tăng tốc độ, cho xe đi về bên phải theo chiều xe chạy của mình để nhanh chóng vượt qua."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Nguyên tắc vàng: Giảm tốc độ + Đi về bên phải khi gặp xe đi ngược chiều.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 130,
    "question": "Khi tới đường ngang không có người gác, chắn đường bộ, chuông, đèn tín hiệu, người tham gia giao thông đường bộ phải làm gì để bảo đảm an toàn?",
    "options": [
      "1. Dừng lại về bên phải đường của mình, trước vạch dừng xe và quan sát hai phía, khi không có phương tiện giao thông đường sắt tới mới được đi qua.",
      "2. Quan sát hai phía, khi không có phương tiện giao thông đường sắt tới thì nhanh chóng đi qua.",
      "3. Dừng lại khoảng cách tối thiểu 3 mét tính từ ray đường sắt gần nhất, khi không có phương tiện giao thông đường sắt tới thì nhanh chóng đi qua."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Không rào chắn – Dừng bên phải – Quan sát kỹ – Tàu không đến – Mới được qua. Cứ đến đường sắt không chắn thì luôn dừng lại, quan sát, và chỉ qua khi an toàn tuyệt đối.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 131,
    "question": "Người có Giấy phép lái xe mô tô hạng A1 không được phép điều khiển loại xe nào dưới đây?",
    "options": [
      "1. Xe mô tô hai bánh có dung tích xi-lanh 125 cm3 hoặc có công suất động cơ điện đến 11 kW.",
      "2. Xe mô tô ba bánh.",
      "3. Cả hai ý trên."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Hạng A1: điều khiển xe moto 2 bánh có dung tích từ 125cc và động cơ điện 11kw",
    "image": null,
    "chapter": 3
  },
  {
    "id": 132,
    "question": "Trên đường bộ ngoài khu vực đông dân cư, đường đôi hoặc đường một chiều có từ hai làn xe cơ giới trở lên (trừ đường cao tốc) loại xe nào dưới đây được tham gia giao thông với tốc độ khai thác tối đa cho phép là 70 km/h?",
    "options": [
      "1. Xe ô tô chở người đến 28 chỗ không kể chỗ của người lái xe (trừ xe buýt); ô tô tải có trọng tải không lớn hơn 3,5 tấn.",
      "2. Xe ô tô chở người trên 28 chỗ không kể chỗ người lái xe (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc).",
      "3. Xe buýt; ô tô đầu kéo kéo sơ mi rơ moóc (trừ ô tô đầu kéo kéo sơ mi rơ moóc xi téc); xe mô tô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông lưu động).",
      "4. Ô tô kéo rơ moóc; ô tô kéo xe khác; ô tô trộn vữa, ô tô trộn bê tông lưu động, ô tô xi téc, ô tô đầu kéo kéo sơ mi rơ moóc xi téc, ô tô kéo theo rơ moóc xi téc."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Ngoài khu vực dân cư xe mô tô chạy được: Đường 2 làn đường: 70km/h .Đường 1 làn đường: 60km/h. Mẹo nhỏ: bạn đang thi bằng mô tô thấy đáp án có mô tô thì chọn nhé!",
    "image": null,
    "chapter": 1
  },
  {
    "id": 133,
    "question": "Trong các hành vi dưới đây, người lái xe có văn hóa giao thông phải ứng xử như thế nào?",
    "options": [
      "1. Điều khiển xe đi bên phải theo chiều đi của mình; đi đúng phần đường, làn đường quy định; dừng, đỗ xe đúng nơi quy định; đã uống rượu, bia thì không lái xe.",
      "2. Điều khiển xe đi trên phần đường, làn đường có ít phương tiện giao thông; dừng xe, đỗ xe ở nơi thuận tiện hoặc theo yêu cầu của hành khách, của người thân.",
      "3. Dừng và đỗ xe ở nơi thuận tiện cho việc chuyên chở hành khách và giao nhận hàng hóa; sử dụng ít rượu, bia thì có thể lái xe."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đã uống rượu bia, thì không được lái xe.",
    "image": null,
    "chapter": 2
  },
  {
    "id": 134,
    "question": "Khi tầm nhìn bị hạn chế bởi sương mù hoặc mưa to, người lái xe phải thực hiện các thao tác nào để bảo đảm an toàn?",
    "options": [
      "1. Tăng tốc độ, chạy gần xe trước, nhìn đèn hậu để định hướng.",
      "2. Giảm tốc độ, chạy cách xa xe trước với khoảng cách an toàn, bật đèn sương mù và đèn chiếu gần.",
      "3. Tăng tốc độ, bật đèn pha vượt qua xe chạy trước."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Khi tầm nhìn hạn chế thì phải giảm tốc độ.",
    "image": null,
    "chapter": 3
  },
  {
    "id": 135,
    "question": "Biển nào cấm máy kéo?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2 và biển 3.",
      "3. Biển 1 và biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Cấm nhỏ cấm luôn lớn theo thứ tự: xe con – xe khách - xe tải - xe máy kéo - xe kéo kéo rơ móc. Nên cấm tải cấm luôn máy kéo chọn cả 2 và 3.",
    "image": "images/driving_a1/q_135.jpg",
    "chapter": 4
  },
  {
    "id": 136,
    "question": "Biển nào xe được phép rẽ trái?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Không biển nào."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Biển 1: cấm rẽ trái. Biển 2: Khu vực được phép quay đầu xe, rẽ trái được.",
    "image": "images/driving_a1/q_136.jpg",
    "chapter": 4
  },
  {
    "id": 137,
    "question": "Biển phụ đặt dưới biển cấm bóp còi có ý nghĩa như thế nào?",
    "options": [
      "1. Báo khoảng cách đến nơi cấm bóp còi.",
      "2. Chiều dài đoạn đường cấm bóp còi từ nơi đặt biển.",
      "3. Báo cấm dùng còi có độ vang xa 500m."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Biển phụ báo hiệu chiều dài đoạn đường cấp bóp còi.",
    "image": "images/driving_a1/q_137.jpg",
    "chapter": 4
  },
  {
    "id": 138,
    "question": "Gặp biển nào người lái xe phải nhường đường cho người đi bộ?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển 1: Nhường đường cho người đi bộ - Biển 2: Cấm người đi bộ - Biển 3: Dành cho người đi bộ.",
    "image": "images/driving_a1/q_138.jpg",
    "chapter": 5
  },
  {
    "id": 139,
    "question": "Hai biển này có ý nghĩa như thế nào?",
    "options": [
      "1. Để chỉ nơi đường sắt giao vuông góc với đường bộ không có rào chắn.",
      "2. Để báo trước sắp đến vị trí giao cắt đường bộ với đường sắt cùng mức, không vuông góc và không có người gác, không có rào chắn.",
      "3. Nơi đường sắt giao nhau với đường bộ."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển báo nơi giao nhau vuông góc đường bộ không rào chắn.",
    "image": "images/driving_a1/q_139.jpg",
    "chapter": 4
  },
  {
    "id": 140,
    "question": "Biển nào báo hiệu &quot;Kết thúc đường đôi&quot;?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Biển 1: đường 2 chiều - Biển 2: đường đôi - Biển 3: kết thúc đường đôi.",
    "image": "images/driving_a1/q_140.jpg",
    "chapter": 4
  },
  {
    "id": 141,
    "question": "Biển báo này có ý nghĩa như thế nào?",
    "options": [
      "1. Báo hiệu đường có ổ gà, lồi lõm.",
      "2. Báo hiệu đường có gồ giảm tốc phía trước."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển báo hiệu đường ổ gà, lồi lõm ( 1 là gồ, 2 là ổ gà).",
    "image": "images/driving_a1/q_141.jpg",
    "chapter": 4
  },
  {
    "id": 142,
    "question": "Biển nào dưới đây báo hiệu hết cấm vượt?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3.",
      "4. Biển 2 và biển 3."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Biển 1: Hết tốc độ tối đa - Biển 2: Hết mọi lệnh cấm - Biển 3: Hết cấm vượt.",
    "image": "images/driving_a1/q_142.jpg",
    "chapter": 4
  },
  {
    "id": 143,
    "question": "Gặp biển báo dưới đây, người lái xe có bắt buộc phải chạy vòng theo đảo an toàn theo hướng mũi tên khi muốn chuyển hướng hay không?",
    "options": [
      "1. Bắt buộc.",
      "2. Không bắt buộc."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển báo dạng hình tròn, nền xanh là biển báo hiệu lệnh bắt buộc phải tuân thủ theo!",
    "image": "images/driving_a1/q_143.jpg",
    "chapter": 5
  },
  {
    "id": 144,
    "question": "Theo hướng mũi tên, xe nào chấp hành đúng quy tắc giao thông?",
    "options": [
      "1. Xe khách, xe tải, xe mô tô.",
      "2. Xe tải, xe mô tô.",
      "3. Chỉ xe con.",
      "4. Cả bốn xe."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Hướng mũi tên đỏ xe đang di chuyển, không có mũi tên đỏ là đang dừng. Xe con trên làn rẽ phải có tín hiệu đèn xanh - rẽ phải đúng. Xe tải trên làn đi thẳng có tín hiệu đèn đỏ dừng lại rẽ trái sai. Xe tải trên làn rẽ phải có tín hiệu đèn xanh nhưng rẽ trái sai. Xe khách trên làn rẽ trái có tín hiệu đèn xanh nhưng đi thẳng sai. Xe mô tô trên làn rẽ trái có tín hiệu đèn xanh nhưng rẽ phải sai. Nên chỉ có xe con đúng",
    "image": "images/driving_a1/q_144.jpg",
    "chapter": 5
  },
  {
    "id": 145,
    "question": "Theo hướng mũi tên, những hướng nào xe gắn máy được phép đi?",
    "options": [
      "1. Cả ba hướng.",
      "2. Chỉ hướng 1 và 3.",
      "3. Chỉ hướng 1."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "💡 Cần phân biệt rõ: - Biển ở hướng 2 là biển CẤM MÔ TÔ (xe ≥ 50 phân khối). Biển này KHÔNG cấm xe gắn máy (xe &lt; 50 phân khối). - Biển ở hướng 3 là biển CẤM Ô TÔ. Cũng KHÔNG cấm xe gắn máy. Đề bài đang hỏi xe của người lái là &quot;xe gắn máy&quot; (xe nhỏ dưới 50cc). Do đó, xe gắn máy không bị cấm ở hướng nào cả và được phép đi CẢ 3 HƯỚNG. (Mẹo dễ nhớ: Hỏi Mô tô -&gt; Chọn 2 hướng. Hỏi Gắn máy -&gt; Chọn 3 hướng).",
    "image": "images/driving_a1/q_145.jpg",
    "chapter": 5
  },
  {
    "id": 146,
    "question": "Theo hướng mũi tên, những hướng nào xe mô tô được phép đi?",
    "options": [
      "1. Cả ba hướng.",
      "2. Hướng 1 và 2.",
      "3. Hướng 1 và 3.",
      "4. Hướng 2 và 3."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Hỏi moto chọn 2 hướng, hỏi gắn máy chọn 3 hướng.",
    "image": "images/driving_a1/q_146.jpg",
    "chapter": 5
  },
  {
    "id": 147,
    "question": "Các xe đi theo thứ tự nào là đúng quy tắc giao thông đường bộ?",
    "options": [
      "1. Xe của bạn, xe mô tô, xe con.",
      "2. Xe con, xe của bạn, xe mô tô.",
      "3. Xe mô tô, xe con, xe của bạn."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Phía trước có biển báo giao nhau với đường ưu tiên (tam giác ngược) vì thế bạn phải nhường đường và đi sau cùng. Chọn đáp án số 3.",
    "image": "images/driving_a1/q_147.jpg",
    "chapter": 5
  },
  {
    "id": 148,
    "question": "Người lái xe được hiểu như thế nào là đúng?",
    "options": [
      "1. Là người điều khiển xe cơ giới.",
      "2. Là người điều khiển xe thô sơ.",
      "3. Là người điều khiển xe máy chuyên dùng."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Người lái xe là điều khiển xe cơ giới",
    "image": null,
    "chapter": 1
  },
  {
    "id": 149,
    "question": "Hành vi đua xe trái phép bị xử lý như thế nào?",
    "options": [
      "1. Chỉ bị nhắc nhở.",
      "2. Tùy theo mức độ của hành vi vi phạm có thể bị xử lý hành chính hoặc xử lý hình sự."
    ],
    "answer": 2,
    "isParalyzed": true,
    "explain": "Đua xe trái phép sẽ bị phạt hành chính hoặc hình sự nếu gây ra hậu quả nghiêm trọng (tai nạn chết người, thương tích nặng, thiệt hại tài sản lớn...).",
    "image": null,
    "chapter": 1
  },
  {
    "id": 150,
    "question": "Tại nơi có vạch kẻ đường hoặc tại nơi mà người đi bộ, xe lăn của người khuyết tật đang qua đường, người điều khiển phương tiện tham gia giao thông phải thực hiện như thế nào?",
    "options": [
      "1. Giảm tốc độ và nhường đường cho người đi bộ, xe lăn của người khuyết tật qua đường đảm bảo an toàn.",
      "2. Quan sát, giảm tốc độ hoặc dừng lại để bảo đảm an toàn cho người đi bộ, xe lăn của người khuyết tật qua đường.",
      "3. Quan sát, tăng tốc độ và điều khiển phương tiện nhanh chóng đi qua."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Tại nơi có vạch kẻ đường dành cho người đi bộ hoặc khi người đi bộ, người khuyết tật sử dụng xe lăn đang qua đường, người lái xe bắt buộc phải: • Quan sát kỹ lưỡng tình huống phía trước. • Giảm tốc độ hoặc dừng lại hẳn để nhường đường. • Bảo đảm tuyệt đối an toàn cho người đi bộ và người khuyết tật.",
    "image": null,
    "chapter": 4
  },
  {
    "id": 151,
    "question": "Người lái xe phải giảm tốc độ, có tín hiệu rẽ phải và đi sát về bên phải của phần đường xe chạy trong các trường hợp nào dưới đây?",
    "options": [
      "1. Khi xe chạy phía trước có tín hiệu vượt xe khác.",
      "2. Khi phía trước có xe chạy ngược chiều.",
      "3. Khi xe sau xin vượt nếu đủ điều kiện an toàn.",
      "4. Khi xe sau có tín hiệu vượt bên phải."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Xe sau xin vượt – nếu an toàn thì nhường.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 152,
    "question": "Khi chuyển làn đường, người lái xe phải bật đèn tín hiệu báo rẽ như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Khi bắt đầu chuyển làn đường.",
      "2. Trước khi thay đổi làn đường.",
      "3. Sau khi thay đổi làn đường."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Muốn rẽ thì phải báo trước (bật xi – nhan)",
    "image": null,
    "chapter": 1
  },
  {
    "id": 153,
    "question": "Khi tránh xe đi ngược chiều, các xe phải nhường đường như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Nơi đường hẹp chỉ đủ cho một xe chạy và có chỗ tránh xe thì xe nào ở gần chỗ tránh hơn phải vào vị trí tránh, nhường đường cho xe đi ngược chiều.",
      "2. Xe xuống dốc phải nhường đường cho xe lên dốc.",
      "3. Xe có chướng ngại vật phía trước phải nhường đường cho xe không có chướng ngại vật phía trước.",
      "4. Cả ba ý trên."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Gần chỗ tránh – phải tránh, xuống dốc – phải nhường lên dốc, có vật cản – phải dừng. Nên chọn cả ba ý trên.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 154,
    "question": "Tại đường ngang, cầu chung đường sắt, khi có hiệu lệnh của nhân viên gác chắn, đèn đỏ sáng nhấp nháy, chuông kêu, chắn đường bộ đang dịch chuyển hoặc đã đóng, người tham gia giao thông đường bộ phải làm gì để bảo đảm an toàn?",
    "options": [
      "1. Dừng lại về bên trái đường của mình, trước vạch dừng xe.",
      "2. Dừng lại giữa đường của mình, trước vạch dừng xe.",
      "3. Dừng lại về bên phải đường của mình, trước vạch dừng xe."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Hễ có đèn đỏ, chuông, chắn, là dừng bên phải trước vạch.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 155,
    "question": "Người có Giấy phép lái xe mô tô hạng A1 được cấp sau ngày 01/01/2025 được phép điều khiển loại xe nào dưới đây?",
    "options": [
      "1. Xe mô tô hai bánh có dung tích xi-lanh đến 125 cm3 hoặc có công suất động cơ điện đến 11 kW.",
      "2. Xe mô tô ba bánh.",
      "3. Cả hai ý trên."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Hạng A1: Xe mô tô hai bánh có dung tích xi-lanh “ĐẾN’’125 cm3 hoặc có công suất động cơ điện đến 11 kW. Hạng A: bao gồm hạng A1 và trên 125cc.",
    "image": null,
    "chapter": 3
  },
  {
    "id": 156,
    "question": "Trên đường bộ ngoài khu vực đông dân cư, đường hai chiều hoặc đường một chiều có một làn xe cơ giới (trừ đường cao tốc), loại xe nào dưới đây được tham gia giao thông với tốc độ khai thác tối đa cho phép là 60 km/h?",
    "options": [
      "1. Xe ô tô chở người đến 28 chỗ không kể chỗ của người lái xe (trừ xe buýt); ô tô tải có trọng tải không lớn hơn 3,5 tấn.",
      "2. Xe ô tô chở người trên 28 chỗ không kể chỗ người lái xe (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc).",
      "3. Xe buýt; ô tô đầu kéo kéo sơ mi rơ moóc (trừ ô tô đầu kéo kéo sơ mi rơ moóc xi téc); xe mô tô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông lưu động).",
      "4. Ô tô kéo rơ moóc; ô tô kéo xe khác; ô tô trộn vữa, ô tô trộn bê tông lưu động, ô tô xi téc, ô tô đầu kéo kéo sơ mi rơ moóc xi téc, ô tô kéo theo rơ moóc xi téc."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Ngoài khu vực dân cư xe mô tô chạy được: Có 2 làn đường: 70km/h - Có 1 làn đường: 60km/h Tốc độ có xe mô tô là chọn.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 157,
    "question": "Khi tham gia giao thông việc sử dụng còi xe nên dùng như thế nào để thể hiện là người có văn hóa giao thông?",
    "options": [
      "1. Chỉ bấm còi khi thật sự cần thiết, không bấm còi liên tục hoặc kéo dài, sử dụng còi với mức âm lượng theo quy định.",
      "2. Bấm còi liên tục để các xe khác nhường đường.",
      "3. Bấm còi to khi đi qua khu vực đông dân cư.",
      "4. Không cần dùng còi, tránh gây tiếng ồn là văn minh."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Còi – chỉ dùng khi cần, không kéo dài, không ồn ào.",
    "image": null,
    "chapter": 2
  },
  {
    "id": 158,
    "question": "Khi đèn pha của xe đi ngược chiều gây chói mắt, làm giảm khả năng quan sát trên đường, người lái xe xử lý như thế nào dưới đây để bảo đảm an toàn?",
    "options": [
      "1. Giảm tốc độ, giữ vững tay lái, nhìn chếch sang lề đường bên phải.",
      "2. Bật đèn pha chiếu xa và giữ nguyên tốc độ.",
      "3. Tăng tốc độ, bật đèn pha đối diện xe phía trước."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Giảm tốc độ để có thể xử lý kịp thời nếu có tình huống bất ngờ. Giữ vững tay lái tránh mất kiểm soát. Nhìn chếch sang lề đường bên phải để tránh ánh sáng chói trực tiếp, giảm mỏi mắt và đảm bảo quan sát an toàn.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 159,
    "question": "Biển nào báo hiệu cấm xe mô tô ba bánh chở hàng đi qua?",
    "options": [
      "1. Biển 1 và biển 2.",
      "2. Biển 1 và biển 3.",
      "3. Biển 2 và biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển 1: Cấm xe mô tô - Biển 2: Cấm xe oto - Biển 3: Cấm xe tải - Cấm mô tô, cấm ô tô: cấm luôn cả 3 bánh.",
    "image": "images/driving_a1/q_159.jpg",
    "chapter": 4
  },
  {
    "id": 160,
    "question": "Biển nào xe quay đầu không bị cấm?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Cả hai biển."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Biển 1: cấm rẽ trái được quay đầu. Biển 2: báo hiệu nơi quay đầu. Nên cả 2 biển.",
    "image": "images/driving_a1/q_160.jpg",
    "chapter": 4
  },
  {
    "id": 161,
    "question": "Chiều dài đoạn đường 500 m từ nơi đặt biển này, người lái xe có được phép bấm còi không?",
    "options": [
      "1. Được phép.",
      "2. Không được phép."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Gặp đáp án có “KHÔNG ĐƯỢC PHÉP” thì chọn ngay là chắc chắn đúng.",
    "image": "images/driving_a1/q_161.jpg",
    "chapter": 4
  },
  {
    "id": 162,
    "question": "Biển nào chỉ đường dành cho người đi bộ, các loại xe không được đi vào khi gặp biển này?",
    "options": [
      "1. Biển 1.",
      "2. Biển 1 và 3.",
      "3. Biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Biển 1: NHƯỜNG đường cho người đi bộ. Biển 2: CẤM người đi bộ. Biển 3: DÀNH cho người đi bộ. Đường dành là biển màu xanh!",
    "image": "images/driving_a1/q_162.jpg",
    "chapter": 4
  },
  {
    "id": 163,
    "question": "Biển nào báo hiệu &quot;Hết đoạn đường ưu tiên&quot;?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Biển 1: giao nhau đường không ưu tiên. Biển 2: giao nhau với đường ưu tiên. Biển 3: hết đoạn đường ưu tiên.",
    "image": "images/driving_a1/q_163.jpg",
    "chapter": 4
  },
  {
    "id": 164,
    "question": "Biển nào báo hiệu &quot;Giao nhau với đường hai chiều&quot;?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển 1: giao nhau đường 2 chiều. Biển 2: báo hiệu đường đôi. Biển 3: tuyến đường cùng cấp.",
    "image": "images/driving_a1/q_164.jpg",
    "chapter": 4
  },
  {
    "id": 165,
    "question": "Các biển báo này có ý nghĩa như thế nào?",
    "options": [
      "1. Để báo trước gần tới đoạn đường có hiện tượng đất đá từ trên ta luy dương sụt lở bất ngờ gây nguy hiểm cho xe cộ và người đi đường.",
      "2. Để báo trước nơi có kết cấu mặt đường rời rạc, khi phương tiện đi qua, làm cho các viên đá, sỏi văng lên gây nguy hiểm và mất an toàn cho người và phương tiện tham gia giao thông.",
      "3. Để cảnh báo những đoạn nền đường yếu, đoạn đường đang theo dõi lún mà việc vận hành xe ở tốc độ cao có thể gây nguy hiểm."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đây là biển cảnh báo trước gần tới đoạn đường có hiện tượng đất đá từ trên ta luy dương sụt lở bất ngờ gây nguy hiểm cho xe cộ và người đi đường.",
    "image": "images/driving_a1/q_165.jpg",
    "chapter": 4
  },
  {
    "id": 166,
    "question": "Trong các biển dưới đây biển nào là biển &quot;Hết mọi lệnh cấm&quot;?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Biển 1: hết tốc độ tối đa - Biển 2: hết mọi lệnh cấm - Biển 3: hết tốc độ tối thiểu.",
    "image": "images/driving_a1/q_166.jpg",
    "chapter": 4
  },
  {
    "id": 167,
    "question": "Biển nào báo hiệu &quot;Cầu vượt liên thông&quot;?",
    "options": [
      "1. Biển 2 và biển 3.",
      "2. Biển 1 và biển 2.",
      "3. Biển 1 và biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Biển 1 và Biển 3: báo hiệu cầu vượt liên thông - Biển 2: hiệu cầu vượt cắt qua hình tròn. (Cầu vượt liên thông là có chữ trên biển báo)",
    "image": "images/driving_a1/q_167.jpg",
    "chapter": 4
  },
  {
    "id": 168,
    "question": "Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Xe tải, xe khách, xe con, xe mô tô.",
      "2. Xe tải, xe mô tô, xe khách, xe con.",
      "3. Xe khách, xe tải, xe con, xe mô tô.",
      "4. Xe mô tô, xe khách, xe tải, xe con."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Thứ tự xét xe đi: Xe trong giao lộ – Xe ưu tiên – Đường ưu tiên – Bên phải trống – rẽ phải – đi thẳng – rẽ trái. Trường hợp 3 biển báo đường ưu tiên: 1. Xe tải, xe mô tô trên đường ưu tiên, xe tải đi thẳng đi trước mới đến moto rẽ trái đi sau. 2. Xe khác, xe con trên đường không ưu sẽ đi sau xe tải và moto, tương tự xe khách đi thẳng – xe con rẽ trái",
    "image": "images/driving_a1/q_168.jpg",
    "chapter": 5
  },
  {
    "id": 169,
    "question": "Xe nào đỗ vi phạm quy tắc giao thông?",
    "options": [
      "1. Cả hai xe.",
      "2. Không xe nào vi phạm.",
      "3. Chỉ xe mô tô vi phạm.",
      "4. Chỉ xe tải vi phạm."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển báo chính cấm dừng dỗ và biển phụ hướng trước sau nên cả 2 xe.",
    "image": "images/driving_a1/q_169.jpg",
    "chapter": 5
  },
  {
    "id": 170,
    "question": "Trong trường hợp này, thứ tự xe đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Xe công an đi làm nhiệm vụ khẩn cấp, xe quân sự đi làm nhiệm vụ khẩn cấp, xe con + xe mô tô.",
      "2. Xe quân sự đi làm nhiệm vụ khẩn cấp, xe công an đi làm nhiệm vụ khẩn cấp, xe con + xe mô tô.",
      "3. Xe mô tô + xe con, xe quân sự đi làm nhiệm vụ khẩn cấp, xe công an đi làm nhiệm vụ khẩn cấp."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "rong sa hình xuất hiện xe ưu tiên, chúng ta sẽ xét theo thứ tự Quân sự làm nhiệm vụ -&gt; xe công an làm nhiệm vụ, sau đó sẽ tới xe dân thường.",
    "image": "images/driving_a1/q_170.jpg",
    "chapter": 5
  },
  {
    "id": 171,
    "question": "Các xe đi theo thứ tự nào là đúng quy tắc giao thông đường bộ?",
    "options": [
      "1. Xe của bạn, xe mô tô, xe con.",
      "2. Xe con, xe của bạn, xe mô tô.",
      "3. Xe mô tô, xe con, xe của bạn."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Thứ tự xét xe đi theo từng trường hợp: Xe trong giao lộ – Xe ưu tiên – Đường ưu tiên – Bên phải trống – rẽ phải – đi thẳng – rẽ trái. Trường hợp 5: rẽ phải- đi thẳng- xe trái. Xe con rẽ phải- xe của bạn thi thẳng- xe moto cuối.",
    "image": "images/driving_a1/q_171.jpg",
    "chapter": 5
  },
  {
    "id": 172,
    "question": "Trong nhóm các phương tiện giao thông đường bộ dưới đây, nhóm phương tiện nào là xe cơ giới?",
    "options": [
      "1. Xe ô tô; máy kéo; xe mô tô hai bánh; xe mô tô ba bánh; xe gắn máy; xe cơ giới dùng cho người khuyết tật và xe máy chuyên dùng; xe đạp, xe đạp máy, xe đạp điện.",
      "2. Xe ô tô; rơ moóc được kéo bởi xe ô tô; sơ mi rơ moóc được kéo bởi ô tô đầu kéo; xe chở người bốn bánh có gắn động cơ; xe chở hàng bốn bánh có gắn động cơ; xe mô tô, xe gắn máy và các loại xe tương tự."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Hỏi thô sơ hay cơ giới đều chọn đáp án có chữ “tương tự” cuối câu",
    "image": null,
    "chapter": 3
  },
  {
    "id": 173,
    "question": "Người điều khiển phương tiện tham gia giao thông đường bộ mà trong máu hoặc hơi thở có nồng độ cồn có bị nghiêm cấm không?",
    "options": [
      "1. Bị nghiêm cấm.",
      "2. Không bị nghiêm cấm.",
      "3. Không bị nghiêm cấm, nếu nồng độ cồn trong máu ở mức nhẹ, có thể điều khiển phương tiện tham gia giao thông."
    ],
    "answer": 1,
    "isParalyzed": true,
    "explain": "Điều khiển phương tiện có nồng độ cồn đều bị nghiêm cấm.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 174,
    "question": "Người điều khiển xe mô tô phải quan sát, giảm tốc độ hoặc dừng lại để bảo đảm an toàn trong các trường hợp nào dưới đây?",
    "options": [
      "1. Đường hẹp, đường vòng, đường quanh co, đường đèo, dốc.",
      "2. Nơi cầu, cống hẹp, đập tràn, đường ngầm, hầm chui, hầm đường bộ.",
      "3. Trời mưa, gió, sương, khói, bụi, mặt đường trơn trượt, lầy lội, có nhiều đất đá, vật liệu rơi vãi ảnh hưởng đến an toàn giao thông đường bộ.",
      "4. Cả ba ý trên."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Thấy nguy hiểm – phải quan sát, giảm tốc, có thể dừng. Tất cả các trường hợp trên đều gây nguy hiểm.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 175,
    "question": "Khi gặp hiệu lệnh điều khiển của Cảnh sát giao thông như hình dưới đây thì người tham gia giao thông đường bộ phải đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Người tham gia giao thông đường bộ ở các hướng phải dừng lại.",
      "2. Người tham gia giao thông đường bộ ở các hướng được đi theo chiều gậy chỉ của Cảnh sát giao thông.",
      "3. Người tham gia giao thông đường bộ ở phía trước và phía sau người điều khiển được đi tất cả các hướng; người tham gia giao thông đường bộ ở phía bên phải và phía bên trái người điều khiển phải dừng lại.",
      "4. Người tham gia giao thông đường bộ ở phía trước và phía sau người điều khiển phải dừng lại; người tham gia giao thông đường bộ ở phía bên phải và phía bên trái người điều khiển được đi tất cả các hướng."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Gặp CSGT ưu tiên chọn đáp án 3, còn lại trường hợp CSGT đứng trên bục giơ 2 tay như hình trên sẽ chọn đáp án 4.",
    "image": "images/driving_a1/q_175.jpg",
    "chapter": 1
  },
  {
    "id": 176,
    "question": "Người điều khiển phương tiện tham gia giao thông không được dừng xe, đỗ xe ở những vị trí nào sau đây?",
    "options": [
      "1. Trên miệng cống thoát nước, miệng hầm của đường điện thoại, điện cao thế, chỗ dành riêng cho xe chữa cháy lấy nước.",
      "2. Trong phạm vi an toàn của đường sắt.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Không được dừng xe trên cống nước nơi không được phép và trong phạm vi đường sắt.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 177,
    "question": "Người lái xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy không được thực hiện hành vi nào sau đây?",
    "options": [
      "1. Đi trên phần đường, làn đường quy định, chấp hành hiệu lệnh của người điều khiển giao thông, đèn tín hiệu giao thông.",
      "2. Đi xe dàn hàng ngang, đi xe vào phần đường dành cho người đi bộ.",
      "3. Cả hai ý trên."
    ],
    "answer": 2,
    "isParalyzed": true,
    "explain": "Không đi xe dàn hàng ngang và đi xe vào phần đường người đi bộ.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 178,
    "question": "Người lái xe phải làm gì để bảo đảm an toàn khi lái xe trên đường cong có tầm nhìn bị hạn chế?",
    "options": [
      "1. Quan sát, giảm tốc độ hoặc dừng lại để bảo đảm an toàn.",
      "2. Đi sang làn đường của xe ngược chiều để mở rộng tầm nhìn và vượt xe khác.",
      "3. Cho xe đi sát bên phải làn đường, bật tín hiệu báo hiệu để vượt bên phải xe khác."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Gặp đường cong – phải giảm tốc độ, từ từ quan sát, không vượt ẩu.",
    "image": null,
    "chapter": 3
  },
  {
    "id": 179,
    "question": "Người tham gia giao thông đường bộ phải dừng lại về bên phải đường của mình trước vạch dừng xe tại đường ngang, cầu chung đường sắt khi có báo hiệu nào dưới đây?",
    "options": [
      "1. Hiệu lệnh của nhân viên gác chắn.",
      "2. Đèn đỏ sáng nhấp nháy, chuông kêu.",
      "3. Chắn đường bộ đang dịch chuyển hoặc đã đóng.",
      "4. Cả ba ý trên."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Đến đường ray gặp đèn đỏ, chuông kêu, chắn hạ – phải dừng bên phải trước vạch. Chọn cả ba ý trên.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 180,
    "question": "Người có Giấy phép lái xe mô tô hạng A được phép điều khiển loại xe nào dưới đây?",
    "options": [
      "1. Xe mô tô hai bánh có dung tích xi-lanh đến 125 cm3 hoặc có công suất động cơ điện đến 11 kW.",
      "2. Xe mô tô hai bánh có dung tích xi-lanh trên 125 cm3 hoặc có công suất động cơ điện trên 11 kW.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Hạng A: bao gồm hạng A1 và Xe mô tô hai bánh có dung tích xi-lanh trên 125 cm3 hoặc có công suất động cơ điện trên 11 kW.",
    "image": null,
    "chapter": 3
  },
  {
    "id": 181,
    "question": "Người lái xe phải giảm tốc độ thấp hơn tốc độ tối đa cho phép đến mức cần thiết, chú ý quan sát và chuẩn bị sẵn sàng những tình huống có thể xảy ra để phòng ngừa tai nạn trong các trường hợp nào dưới đây?",
    "options": [
      "1. Gặp biển báo nguy hiểm và cảnh báo trên đường.",
      "2. Gặp biển chỉ dẫn trên đường.",
      "3. Gặp biển báo hết mọi lệnh cấm.",
      "4. Gặp biển báo hết hạn chế tốc độ tối đa cho phép."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Khi thấy biển báo nguy hiểm – phải giảm tốc, quan sát kỹ.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 182,
    "question": "Người điều khiển phương tiện tham giao thông đường bộ gây ra tai nạn giao thông đường bộ, người liên quan đến vụ tai nạn giao thông đường bộ có trách nhiệm gì dưới đây?",
    "options": [
      "1. Dừng ngay phương tiện, cảnh báo nguy hiểm, giữ nguyên hiện trường, trợ giúp người bị nạn và báo tin cho cơ quan Công an, cơ sở khám bệnh, chữa bệnh.",
      "2. Ở lại hiện trường vụ tai nạn giao thông đường bộ cho đến khi người của cơ quan Công an đến, trừ trường hợp phải đi cấp cứu, đưa người bị nạn đi cấp cứu hoặc xét thấy bị đe dọa đến tính mạng, sức khỏe nhưng phải đến trình báo ngay cơ quan Công an, Ủy ban nhân dân nơi gần nhất.",
      "3. Cung cấp thông tin xác định danh tính về bản thân, người liên quan đến vụ tai nạn giao thông đường bộ và thông tin liên quan của vụ tai nạn giao thông đường bộ cho cơ quan có thẩm quyền.",
      "4. Cả ba ý trên."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Khi gặp tai nạn phía trước nên dừng lại, hỗ trợ, giữ nguyên hiện trường, trình báo đầy đủ.",
    "image": null,
    "chapter": 2
  },
  {
    "id": 183,
    "question": "Để đạt được hiệu quả phanh cao nhất, người lái xe mô tô phải sử dụng các kỹ năng như thế nào dưới đây?",
    "options": [
      "1. Sử dụng phanh trước.",
      "2. Sử dụng phanh sau.",
      "3. Giảm hết ga, sử dụng đồng thời cả phanh sau và phanh trước."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Để phanh hiệu quả cần: giảm hết ga, sử dụng cả 2 phanh trước và sau.",
    "image": null,
    "chapter": 3
  },
  {
    "id": 184,
    "question": "Biển nào dưới đây xe gắn máy được phép đi vào?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Cả hai biển."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Biển 1: cấm xe mô tô ( không cấm xe gắn máy) - Biển 2: cấm xe oto ( không cấm xe gắn máy) - Nên chọn cả 2 biển.",
    "image": "images/driving_a1/q_184.jpg",
    "chapter": 4
  },
  {
    "id": 185,
    "question": "Biển nào xe được phép quay đầu nhưng không được rẽ trái?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Cả hai biển."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển 1: Cấm rẽ trái nhưng được quay đầu xe - Biển 2: Bắt buộc rẽ trái. Nên chọn biển 1",
    "image": "images/driving_a1/q_185.jpg",
    "chapter": 4
  },
  {
    "id": 186,
    "question": "Biển nào xe mô tô hai bánh được đi vào?",
    "options": [
      "1. Biển 1 và 2.",
      "2. Biển 1 và 3.",
      "3. Biển 2 và 3."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Biển 1: cấm xe oto không cấm moto - Biển 2: cấm xe mô tô - Biển 3: cấm xe tải không cấm mô tô. Nên chọn 1 và 3",
    "image": "images/driving_a1/q_186.jpg",
    "chapter": 4
  },
  {
    "id": 187,
    "question": "Biển nào báo hiệu &quot;Đường dành cho xe thô sơ&quot;?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển 1: Đường dành cho xe thô sơ - Biển 2: cấm xe đạp - Biển 3: báo hiệu xe đạp cắt ngang. Nên chọn biển 1",
    "image": "images/driving_a1/q_187.jpg",
    "chapter": 4
  },
  {
    "id": 188,
    "question": "Biển nào báo hiệu, chỉ dẫn xe đi trên đường này được quyền ưu tiên qua nơi giao nhau?",
    "options": [
      "1. Biển 1 và biển 2.",
      "2. Biển 1 và biển 3.",
      "3. Biển 2 và biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Biển 1: giao nhau với đường không ưu tiên (bạn được ưu tiên đi trước) - Biển 2: giao nhau với đường ưu tiên (bạn phải nhường) - Biển 3: bắt đầu đường ưu tiên (bạn được ưu tiên đi trước). Nên chọn biển 1 và 3",
    "image": "images/driving_a1/q_188.jpg",
    "chapter": 4
  },
  {
    "id": 189,
    "question": "Biển nào báo hiệu &quot;Giao nhau với đường hai chiều&quot;?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Biển 1: đường 2 chiều - Biển 2: giao nhau đường 2 chiều - Biển 3: đường cùng cấp.",
    "image": "images/driving_a1/q_189.jpg",
    "chapter": 4
  },
  {
    "id": 190,
    "question": "Biển nào báo hiệu các phương tiện phải tuân thủ tốc độ tối đa cho phép trên từng làn đường?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Cả hai biển."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Biển 1: Biển ghép tốc độ tối đa cho phép trên từng làn đường - Biển 2: Biển ghép tốc độ tối đa cho phép theo phương tiện, trên từng làn đường. Nên chọn cả 2 biển quy định tốc độ tối đa trên từng làn đường.",
    "image": "images/driving_a1/q_190.jpg",
    "chapter": 4
  },
  {
    "id": 191,
    "question": "Biển nào cho phép được quay đầu xe đi theo hướng ngược lại khi đặt biển trước ngã ba, ngã tư?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3.",
      "4. Không biển nào."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Biển 1: bắt buộc rẽ trái - Biển 2: bắt buộc rẽ trái và rẽ phải (lưu ý biển đạt sau ngã 3, ngã 4) - Biển 3: bắt buộc đi thẳng hoặc rẽ trái (được phép quay đầu xe). Nên chọn biển 3",
    "image": "images/driving_a1/q_191.jpg",
    "chapter": 4
  },
  {
    "id": 192,
    "question": "Biển số 1 có ý nghĩa như thế nào?",
    "options": [
      "1. Đi thẳng hoặc rẽ trái trên cầu vượt.",
      "2. Đi thẳng hoặc rẽ phải trên cầu vượt.",
      "3. Báo hiệu cầu vượt liên thông."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Biển 1: báo hiệu cầu vượt liên thông - Biển 2, biển 3: báo hiệu cầu vượt cắt qua",
    "image": "images/driving_a1/q_192.jpg",
    "chapter": 4
  },
  {
    "id": 193,
    "question": "Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Xe tải, xe con, xe mô tô.",
      "2. Xe con, xe tải, xe mô tô.",
      "3. Xe mô tô, xe con, xe tải.",
      "4. Xe con, xe mô tô, xe tải."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Thứ tự xét xe đi: Xe trong giao lộ – Xe ưu tiên – Đường ưu tiên – Bên phải trống – rẽ phải – đi thẳng – rẽ trái. Trường hợp 4: bên phải xe nào trống xe đó đi trước Xe mô tô bên tay phải trống nên đi trước – xe con đi thẳng- xe tải rẽ trái.",
    "image": "images/driving_a1/q_193.jpg",
    "chapter": 5
  },
  {
    "id": 194,
    "question": "Xe nào đỗ vi phạm quy tắc giao thông?",
    "options": [
      "1. Chỉ xe mô tô.",
      "2. Chỉ xe tải.",
      "3. Cả ba xe.",
      "4. Chỉ xe mô tô và xe tải."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Xe tải đỗ ngược chiều, còn xe ô tô và mô tô đỗ trên vạch người đi bộ nên cả 3 đều sai.",
    "image": "images/driving_a1/q_194.jpg",
    "chapter": 5
  },
  {
    "id": 195,
    "question": "Trong hình dưới, những xe nào vi phạm quy tắc giao thông?",
    "options": [
      "1. Xe con (E), xe mô tô (C).",
      "2. Xe tải (A), xe mô tô (D).",
      "3. Xe khách (B), xe mô tô (C).",
      "4. Xe khách (B), xe mô tô (D)."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Xe con E đi và làn dành cho xe mô tô - Xe mô tô C đi vào làn danh cho xe ô tô. Mẹo thấy E là chọn!",
    "image": "images/driving_a1/q_195.jpg",
    "chapter": 5
  },
  {
    "id": 196,
    "question": "Các xe đi theo thứ tự nào là đúng quy tắc giao thông đường bộ?",
    "options": [
      "1. Xe của bạn, xe mô tô, xe đạp.",
      "2. Xe mô tô, xe đạp, xe của bạn.",
      "3. Xe đạp, xe mô tô, xe của bạn."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Thứ tự xét xe đi: Xe trong giao lộ – Xe ưu tiên – Đường ưu tiên – Bên phải trống – rẽ phải – đi thẳng – rẽ trái. Trường hợp 4: bên phải xe nào trống xe đó đi trước. Xe đạp bên tay phải trống đi trước – xe mô tô đi thẳng- xe của bạn rẽ trái đi cuối.",
    "image": "images/driving_a1/q_196.jpg",
    "chapter": 5
  },
  {
    "id": 197,
    "question": "Trong nhóm các phương tiện giao thông đường bộ dưới đây, nhóm phương tiện nào là xe thô sơ?",
    "options": [
      "1. Xe đạp, xe đạp máy, xe đạp điện; xe xích lô; xe lăn dùng cho người khuyết tật; xe vật nuôi kéo và các loại xe tương tự.",
      "2. Xe đạp (kể cả xe đạp máy, xe đạp điện), xe gắn máy, xe cơ giới dùng cho người khuyết tật và xe máy chuyên dùng.",
      "3. Xe ô tô, máy kéo, rơ moóc hoặc sơ mi rơ moóc được kéo bởi xe ô tô, máy kéo."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Hỏi thô sơ hay cơ giới đều chọn đáp án có chữ “tương tự” cuối câu",
    "image": null,
    "chapter": 3
  },
  {
    "id": 198,
    "question": "Theo Luật Phòng chống tác hại của rượu, bia, đối tượng nào dưới đây bị cấm sử dụng rượu, bia khi tham gia giao thông?",
    "options": [
      "1. Người điều khiển xe ô tô, xe mô tô, xe đạp, xe gắn máy.",
      "2. Người được chở trên xe cơ giới.",
      "3. Cả hai ý trên."
    ],
    "answer": 1,
    "isParalyzed": true,
    "explain": "Đã uống rượu bia thì không lái xe, đồng nghĩa là Người điều khiển xe ô tô, xe mô tô, xe đạp, xe gắn máy không được vi phạm. Người ngồi sau có thể là rơi vào trường hợp say và nhờ người khác chở về, không vi phạm.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 199,
    "question": "Người lái xe được phép vượt xe trên cầu hẹp có một làn đường, đường cong có tầm nhìn bị hạn chế hay không?",
    "options": [
      "1. Được phép vượt khi đường vắng.",
      "2. Không được phép vượt.",
      "3. Được phép vượt khi có việc gấp."
    ],
    "answer": 2,
    "isParalyzed": true,
    "explain": "Trên đường cong hạn chế tầm nhìn thì không được vượt vì rất nguy hiểm!",
    "image": null,
    "chapter": 3
  },
  {
    "id": 200,
    "question": "Người điều khiển xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy có được phép sử dụng xe để kéo hoặc đẩy các phương tiện khác khi tham gia giao thông không?",
    "options": [
      "1. Được phép.",
      "2. Nếu phương tiện được kéo, đẩy có khối lượng nhỏ hơn phương tiện của mình.",
      "3. Tùy trường hợp.",
      "4. Không được phép."
    ],
    "answer": 4,
    "isParalyzed": true,
    "explain": "Hành vi kéo, đẩy phương tiện khác khi tham gia giao thông cực kỳ nguy hiểm nên không được phép.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 201,
    "question": "Người được chở trên xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy khi tham gia giao thông đường bộ có được sử dụng ô khi trời mưa hay không?",
    "options": [
      "1. Được sử dụng.",
      "2. Chỉ người ngồi sau được sử dụng.",
      "3. Không được sử dụng.",
      "4. Được sử dụng nếu không có áo mưa."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Việc sử dụng ô khi ngồi trên xe máy có thể gây mất cân bằng, che khuất tầm nhìn và ảnh hưởng đến an toàn giao thông. Vì thế người ngồi sau không được phép sử dụng.",
    "image": null,
    "chapter": 3
  },
  {
    "id": 202,
    "question": "Tại nơi đường giao nhau, người lái xe đang đi trên đường không ưu tiên, đường nhánh phải nhường đường như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Nhường đường cho xe đi ở bên phải mình tới.",
      "2. Nhường đường cho xe đi ở bên trái mình tới.",
      "3. Nhường đường cho xe đi trên đường ưu tiên hoặc đường chính từ bất kỳ hướng nào tới."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đang trên đường không ưu tiên, bắt buộc phải nhường đường cho xe từ bất kỳ hướng nào tới.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 203,
    "question": "Người điều khiển phương tiện tham gia giao thông trong hầm đường bộ ngoài việc phải tuân thủ các quy tắc giao thông còn phải thực hiện những quy định nào dưới đây?",
    "options": [
      "1. Xe cơ giới, xe máy chuyên dùng phải bật đèn chiếu gần; xe thô sơ phải bật đèn hoặc có vật phát sáng báo hiệu; không dừng xe, đỗ xe trong hầm đường bộ; trường hợp gặp sự cố kỹ thuật hoặc bất khả kháng khác buộc phải dừng xe, đỗ xe, người lái xe, người điều khiển xe máy chuyên dùng phải đưa xe vào vị trí dừng xe, đỗ xe khẩn cấp, nếu không di chuyển được, phải có báo hiệu bằng đèn khẩn cấp và đặt biển hoặc đèn cảnh báo về phía sau xe khoảng cách bảo đảm an toàn.",
      "2. Xe cơ giới, xe máy chuyên dùng phải bật đèn chiếu xa; được dừng xe, đỗ xe khi cần thiết.",
      "3. Phải cho xe chạy trên một làn đường và chỉ chuyển làn ở nơi được phép; được quay đầu xe, lùi xe khi cần thiết."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Trong hầm đường bộ không được dừng đỗ xe, đây là quy định!",
    "image": null,
    "chapter": 3
  },
  {
    "id": 204,
    "question": "Người lái xe khi tham gia giao thông đường bộ phải đảm bảo các điều kiện nào dưới đây?",
    "options": [
      "1. Phải đủ tuổi, sức khỏe theo quy định của pháp luật; có giấy phép lái xe đang còn điểm, còn hiệu lực phù hợp với loại xe đang điều khiển do cơ quan có thẩm quyền cấp (trừ người lái xe gắn máy).",
      "2. Phải là người đứng tên trong đăng ký xe.",
      "3. Cả hai ý trên."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Khi tham gia giao thông yêu cầu người điều khiển phải đủ độ tuổi theo quy định, phải có GPLX còn điểm và còn thời hạn sử dụng được cấp bởi cơ quan có thẩm quyền.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 205,
    "question": "Khi gặp xe buýt đang dừng đón, trả khách, người điều khiển xe mô tô phải xử lý như thế nào dưới đây?",
    "options": [
      "1. Tăng tốc độ để nhanh chóng vượt qua xe buýt.",
      "2. Quan sát, giảm tốc độ đi qua xe buýt hoặc dừng lại để bảo đảm an toàn.",
      "3. Cả hai ý trên."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Gặp xe buýt nên dừng – quan sát, giảm tốc, đảm bảo an toàn. Không nên vượt vì rất nguy hiểm.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 206,
    "question": "Người có mặt tại nơi xảy ra vụ tai giao thông đường bộ có trách nhiệm gì dưới đây?",
    "options": [
      "1. Giúp đỡ, cứu chữa kịp thời người bị nạn; báo tin ngay cho cơ quan Công an, cơ sở khám bệnh, chữa bệnh hoặc Ủy ban nhân dân nơi gần nhất; tham gia bảo vệ hiện trường; tham gia bảo vệ tài sản của người bị nạn; cung cấp thông tin liên quan về vụ tai nạn theo yêu cầu của cơ quan có thẩm quyền.",
      "2. Chụp lại hình ảnh vụ tai nạn (nếu có thiết bị ghi hình) và nhanh chóng rời khỏi hiện trường vụ tai nạn.",
      "3. Cả hai ý trên."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Gặp tai nạn nên cứu người, báo tin, bảo vệ hiện trường, cung cấp thông tin cho cơ quan có thẩm quyền.",
    "image": null,
    "chapter": 2
  },
  {
    "id": 207,
    "question": "Khi đang lái xe mô tô hoặc ô tô, nếu có nhu cầu sử dụng điện thoại để nhắn tin hoặc gọi điện, người lái xe phải thực hiện như thế nào trong các tình huống nêu dưới đây?",
    "options": [
      "1. Giảm tốc độ để bảo đảm an toàn với xe phía trước và sử dụng điện thoại để liên lạc.",
      "2. Giảm tốc độ để dừng xe ở nơi cho phép sau đó sử dụng điện thoại để liên lạc.",
      "3. Tăng tốc độ để cách xa xe phía sau và sử dụng điện thoại để liên lạc."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Khi điều khiển phương tiện mô tô hoặc ô tô thì không được phép sử dụng điện thoại, vì thế chúng ta nên giảm tốc độ và lựa chọn nơi cho phép dừng đỗ để sử dụng theo đúng quy định.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 208,
    "question": "Biển nào báo hiệu cấm xe mô tô đi vào?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3"
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển 1: cấm xe mô tô - Biển 2: cấm xe ô tô - Biển 3: cấm xe tải.",
    "image": "images/driving_a1/q_208.jpg",
    "chapter": 4
  },
  {
    "id": 209,
    "question": "Biển nào là biển &quot;Cấm đi ngược chiều&quot;?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Cả ba biển."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Biển 1: biển báo cấm - Biển 2: cấm đi ngược chiều - Biển 3: cấm đỗ xe.",
    "image": "images/driving_a1/q_209.jpg",
    "chapter": 4
  },
  {
    "id": 210,
    "question": "Biển nào xe mô tô hai bánh không được đi vào?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Biển 1: cấm xe ô tô - Biển 2: cấm xe mô tô - Biển 3: cấm xe tải.",
    "image": "images/driving_a1/q_210.jpg",
    "chapter": 4
  },
  {
    "id": 211,
    "question": "Biển nào báo hiệu sắp đến chỗ giao nhau nguy hiểm?",
    "options": [
      "1. Biển 1.",
      "2. Biển 1 và biển 2.",
      "3. Biển 2 và biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Biển 1: giao nhau với đường sắt có rào chắn - Biển 2: giao nhau đường ưu tiên - Biển 3: giao nhau tín hiệu đèn. Biển báo hình tam giác nền vàng viền đỏ là biển báo nguy hiểm nên chọn cả 3 biển.",
    "image": "images/driving_a1/q_211.jpg",
    "chapter": 4
  },
  {
    "id": 212,
    "question": "Biển nào báo hiệu &quot;Giao nhau với đường không ưu tiên&quot;?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3.",
      "4. Biển 2 và biển 3."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển 1: giao nhau với đường không ưu tiên - Biển 2: giao nhau với đường ưu tiên (tam giác ngược) - Biển 3: bắt đầu đường ưu tiên. Nên chọn biển 1",
    "image": "images/driving_a1/q_212.jpg",
    "chapter": 4
  },
  {
    "id": 213,
    "question": "Biển nào báo hiệu &quot;Chú ý chướng ngại vật&quot;?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2 và biển 3.",
      "3. Biển 3."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Biển 1: báo hiệu kết thúc đường đôi - Biển 2, biển 3: chú ý chướng ngoại vật.",
    "image": "images/driving_a1/q_213.jpg",
    "chapter": 4
  },
  {
    "id": 214,
    "question": "Khi gặp biển nào thì các phương tiện không được đi vào, trừ xe ô tô và xe mô tô?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển 1: bắt đầu đoạn đường dành cho ô tôvà mô tô - Biển 2: kết thúc đoạn đường dành cho ô tô và mô tô.",
    "image": "images/driving_a1/q_214.jpg",
    "chapter": 4
  },
  {
    "id": 215,
    "question": "Biển nào không cho phép rẽ phải?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3.",
      "4. Biển 1 và biển 3."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển 1: bắt buộc rẽ trái - Biển 2: rẽ trái, rẽ phải - Biển 3: đi thẳng, rẽ phải. Nên chọn biển 1.",
    "image": "images/driving_a1/q_215.jpg",
    "chapter": 4
  },
  {
    "id": 216,
    "question": "Biển nào báo hiệu &quot;Tuyến đường cầu vượt cắt qua&quot;?",
    "options": [
      "1. Biển 1 và biển 2.",
      "2. Biển 1 và biển 3.",
      "3. Biển 2 và biển 3."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển 1, Biển 2: cầu vượt cắt qua - Biển 3: biển báo cầu vồng. (Cầu vượt liên thông là có chữ trên biển báo)",
    "image": "images/driving_a1/q_216.jpg",
    "chapter": 4
  },
  {
    "id": 217,
    "question": "Trường hợp này xe nào được quyền đi trước?",
    "options": [
      "1. Xe con.",
      "2. Xe mô tô."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển báo stop nên xe mô tô dừng lại xe con đi.",
    "image": "images/driving_a1/q_217.jpg",
    "chapter": 5
  },
  {
    "id": 218,
    "question": "Xe nào được quyền đi trước trong trường hợp này?",
    "options": [
      "1. Xe con.",
      "2. Xe mô tô."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Cả 2 xe đều đèn xanh: xe mô tô rẽ phải trước, xe con rẽ trái sau",
    "image": "images/driving_a1/q_218.jpg",
    "chapter": 5
  },
  {
    "id": 219,
    "question": "Trong hình dưới, những xe nào vi phạm quy tắc giao thông?",
    "options": [
      "1. Xe con (B), xe mô tô (C).",
      "2. Xe con (A), xe mô tô (C).",
      "3. Xe con (E), xe mô tô (D).",
      "4. Tất cả các loại xe trên."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Xe con E đi làn đường dành cho xe mô tô - Xe mô tô D đi vào làn dành cho xe ô tô.",
    "image": "images/driving_a1/q_219.jpg",
    "chapter": 5
  },
  {
    "id": 220,
    "question": "Xe nào dừng đúng theo quy tắc giao thông?",
    "options": [
      "1. Xe con.",
      "2. Xe mô tô.",
      "3. Cả 2 xe đều đúng."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Dừng trước vạch dừng 5m: xe con 6m đúng, xe moto 3m sai",
    "image": "images/driving_a1/q_220.jpg",
    "chapter": 5
  },
  {
    "id": 221,
    "question": "Phương tiện giao thông đường bộ gồm những loại nào?",
    "options": [
      "1. Phương tiện giao thông cơ giới đường bộ.",
      "2. Phương tiện giao thông thô sơ đường bộ, xe máy chuyên dùng và các loại xe tương tự.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Phương tiện giao thông đường bộ gồm: xe xơ giới, xe thô sơ, xe máy chuyên dùng và các loại xe tương tự.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 222,
    "question": "Hành vi giao xe ô tô, mô tô cho người nào sau đây tham gia giao thông đường bộ bị nghiêm cấm?",
    "options": [
      "1. Người chưa đủ tuổi theo quy định.",
      "2. Người không có giấy phép lái xe.",
      "3. Người có giấy phép lái xe nhưng đã bị trừ hết 12 điểm.",
      "4. Cả ba ý trên."
    ],
    "answer": 4,
    "isParalyzed": true,
    "explain": "Chưa tuổi – không bằng – hết 12 điểm, tuyệt đối không giao xe!",
    "image": null,
    "chapter": 1
  },
  {
    "id": 223,
    "question": "Khi gặp hiệu lệnh điều khiển của Cảnh sát giao thông như hình dưới đây thì người tham gia giao thông đường bộ phải đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Người tham gia giao thông đường bộ ở phía sau Cảnh sát giao thông được đi, các hướng khác phải dừng lại.",
      "2. Người tham gia giao thông đường bộ được rẽ phải theo chiều mũi tên màu xanh ở bục Cảnh sát giao thông.",
      "3. Người tham gia giao thông đường bộ ở tất cả các hướng phải dừng lại, trừ các xe đã ở trong khu vực giao nhau.",
      "4. Người tham gia giao thông đường bộ ở phía trước Cảnh sát giao thông phải dừng lại, các hướng khác được đi."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Gặp CSGT ưu tiên chọn đáp án 3, trừ trường hợp CSGT đứng trên bục giơ 2 tay sẽ chọn đáp án 4.",
    "image": "images/driving_a1/q_223.jpg",
    "chapter": 1
  },
  {
    "id": 224,
    "question": "Muốn vượt xe phía trước, người lái xe mô tô phải có tín hiệu như thế nào dưới đây để bảo đảm an toàn?",
    "options": [
      "1. Bấm còi liên tục để xe phía trước biết xe mình xin vượt.",
      "2. Rú ga liên tục để xe phía trước biết xe mình xin vượt.",
      "3. Báo hiệu nhấp nháy bằng đèn chiếu sáng phía trước hoặc còi."
    ],
    "answer": 3,
    "isParalyzed": true,
    "explain": "Muốn vượt – nháy đèn, bấm còi đúng lúc, không ga rú ồn gây mất trật tự.",
    "image": null,
    "chapter": 2
  },
  {
    "id": 225,
    "question": "Khi điều khiển xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy, những hành vi nào sau đây không được phép?",
    "options": [
      "1. Buông cả hai tay; đứng, nằm trên xe điều khiển xe; sử dụng chân chống hoặc vật khác quệt xuống đường khi xe đang chạy.",
      "2. Chở tối đa hai người phía sau khi chở người bệnh đi cấp cứu, áp giải người có hành vi vi phạm pháp luật, trẻ em dưới 12 tuổi và người già yếu hoặc người khuyết tật."
    ],
    "answer": 1,
    "isParalyzed": true,
    "explain": "Ở đáp án 1 là các hành vi bị nghiêm cấm, còn lại đáp án 2 là trường hợp được cho phép.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 226,
    "question": "Người được chở trên xe mô tô có được kéo theo người đang điều khiển xe đạp hay không?",
    "options": [
      "1. Chỉ được phép nếu cả hai đội mũ bảo hiểm.",
      "2. Không được phép.",
      "3. Chỉ được thực hiện trên đường vắng."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Người được chở trên xe mô tô không được kéo đẩy xe khác khi tham gia giao thông vì sẽ dễ gây ra tai nạn, mất an toàn.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 227,
    "question": "Tại nơi đường giao nhau có báo hiệu đi theo vòng xuyến, người lái xe phải nhường đường như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Nhường đường cho xe đi đến từ bên phải.",
      "2. Nhường đường cho xe đi đến từ bên trái.",
      "3. Không phải nhường đường."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Có báo hiệu đi theo vòng xuyến nhường đường bên trái, không có báo hiệu nhường đường bên phải. (Có trái, không phải)",
    "image": null,
    "chapter": 1
  },
  {
    "id": 228,
    "question": "Người điều khiển phương tiện tham gia giao thông đường bộ phải quan sát, giảm tốc độ hoặc dừng lại để bảo đảm an toàn trong các trường hợp nào dưới đây?",
    "options": [
      "1. Có báo hiệu cảnh báo nguy hiểm hoặc có chướng ngại vật trên đường; chuyển hướng xe chạy hoặc tầm nhìn bị hạn chế.",
      "2. Nơi cầu, cống hẹp, đập tràn, đường ngầm, hầm chui, hầm đường bộ; có vật nuôi đi trên đường hoặc chăn thả ở ven đường.",
      "3. Điểm dừng xe, đỗ xe trên đường bộ có khách đang lên, xuống xe.",
      "4. Cả ba ý trên."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Các tình huống ở 3 đáp án 1, 2, 3 đều là nguy hiểm, vì thế khi gặp các trường hợp này người lái xe nên quan sát, giảm tốc độ hoặc dừng lại để đảm bảo an toàn.",
    "image": null,
    "chapter": 3
  },
  {
    "id": 229,
    "question": "Khi tham gia giao thông đường bộ, người lái xe phải mang theo các giấy tờ gì?",
    "options": [
      "1. Chứng nhận đăng ký xe hoặc bản sao Chứng nhận đăng ký xe có chứng thực kèm bản gốc giấy tờ xác nhận của tổ chức tín dụng, chi nhánh ngân hàng nước ngoài còn hiệu lực trong trường hợp xe đang được thế chấp tại tổ chức tín dụng, chi nhánh ngân hàng nước ngoài.",
      "2. Giấy phép lái xe phù hợp với loại xe đang điều khiển; chứng nhận kiểm định an toàn kỹ thuật và bảo vệ môi trường đối với xe cơ giới theo quy định của pháp luật; chứng nhận bảo hiểm bắt buộc trách nhiệm dân sự của chủ xe cơ giới.",
      "3. Trường hợp các giấy tờ nêu trên đã được tích hợp vào tài khoản định danh điện tử thì việc xuất trình, kiểm tra có thể thực hiện thông qua tài khoản định danh điện tử.",
      "4. Cả ba ý trên."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Khi tham gia giao thông người lái xe cần có: chứng nhận đăng ký xe. Giấy phép lái xe phù hợp hoặc xuất trình vneid định danh điện tử cấp 2 trở lên.",
    "image": null,
    "chapter": 3
  },
  {
    "id": 230,
    "question": "Việc sử dụng xe mô tô, xe gắn máy, xe thô sơ để vận chuyển hành khách, hàng hóa phải thực hiện các quy định nào dưới đây để đảm bảo an toàn giao thông?",
    "options": [
      "1. Kiểm tra điều kiện bảo đảm an toàn của xe trước khi tham gia giao thông đường bộ; mang đủ giấy tờ theo quy định của pháp luật.",
      "2. Kiểm tra việc sắp xếp hàng hóa bảo đảm an toàn; không chở quá số người, chở hành lý, hàng hoá vượt quá khối lượng cho phép hoặc vượt quá khổ giới hạn của xe.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Để vận chuyển khách hoặc hàng hóa, người lái xe phải đảm bảo phương tiện đủ điều kiện an toàn đi kèm các loại giấy tờ cũng như tuân thủ theo quy định vận chuyển mà pháp luật đưa ra.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 231,
    "question": "Trong đoạn đường hai chiều tại khu đông dân cư đang ùn tắc, người điều khiển xe mô tô có văn hóa giao thông sẽ lựa chọn cách xử lý tình huống nào dưới đây?",
    "options": [
      "1. Cho xe lấn sang làn ngược chiều để nhanh chóng thoát khỏi nơi ùn tắc.",
      "2. Điều khiển xe trên vỉa hè để nhanh chóng thoát khỏi nơi ùn tắc.",
      "3. Kiên nhẫn tuân thủ hướng dẫn của người điều khiển giao thông hoặc tín hiệu đèn giao thông, di chuyển trên đúng phần đường bên phải theo chiều đi, nhường đường cho các phương tiện đi ngược chiều."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Giữ bình tĩnh, tuân thủ luật giao thông chính là cách thể hiện văn hóa, trách nhiệm và an toàn khi tham gia giao thông. Đường tắc không vội – Đúng luật là hay – Nhường nhau mới thoát!",
    "image": "images/driving_a1/q_231.jpg",
    "chapter": 5
  },
  {
    "id": 232,
    "question": "Những thói quen nào dưới đây khi điều khiển xe mô tô tay ga tham gia giao thông dễ gây tai nạn nguy hiểm?",
    "options": [
      "1. Sử dụng còi.",
      "2. Phanh đồng thời cả phanh trước và phanh sau.",
      "3. Chỉ sử dụng phanh trước."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Khi điều khiển xe mô tô tay ga, chỉ sử dụng phanh trước sẽ rất nguy hiểm vì:Gây mất cân bằng, đặc biệt khi đi trên đường trơn trượt hoặc đang chạy với tốc độ cao và Dễ khiến bánh trước bị khóa, xe bị trượt hoặc lật, gây tai nạn nghiêm trọng.",
    "image": "images/driving_a1/q_232.jpg",
    "chapter": 3
  },
  {
    "id": 233,
    "question": "Biển nào dưới đây xe mô tô hai bánh được đi vào?",
    "options": [
      "1. Không biển nào.",
      "2. Biển 1 và biển 2.",
      "3. Biển 2 và biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Biển 1: cấm xe mô tô - Biển 2: cấm xe ô tô ( xe mô tô được phép đi vào) - Biển 3: cấm xe tải ( xe mô tô được phép đi vào). Nên chọn biển 2 và biển 3.",
    "image": "images/driving_a1/q_233.jpg",
    "chapter": 4
  },
  {
    "id": 234,
    "question": "Biển nào dưới đây các phương tiện không được phép đi vào?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 1 và biển 2."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Biển 1: biển đường cấm - Biển 2: biển báo cấm đi ngược chiều - Biển 3: cấm đỗ xe. Nên chọn biển 1 và biển 2.",
    "image": "images/driving_a1/q_234.jpg",
    "chapter": 4
  },
  {
    "id": 235,
    "question": "Ba biển này có hiệu lực như thế nào?",
    "options": [
      "1. Cấm các loại xe ở biển phụ đi vào.",
      "2. Cấm các loại xe cơ giới đi vào trừ loại xe ở biển phụ."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển báo cấm các loại xe biển phụ.",
    "image": "images/driving_a1/q_235.jpg",
    "chapter": 4
  },
  {
    "id": 236,
    "question": "Biển nào báo hiệu &quot;Giao nhau với đường sắt có rào chắn&quot;?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2 và biển 3.",
      "3. Biển 3."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển 1: giao nhau đường sắt có rào chắn - Biển 2: giao nhau đường ưu tiên - Biển 3: giao nhau tín hiệu đèn.",
    "image": "images/driving_a1/q_236.jpg",
    "chapter": 4
  },
  {
    "id": 237,
    "question": "Biển nào báo hiệu &quot;Giao nhau với đường ưu tiên&quot;?",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Biển 1: giao nhau tuyến đường cùng cấp - Biển 2: giao nhau đường không ưu tiên - Biển 3: giao nhau đường ưu tiên.",
    "image": "images/driving_a1/q_237.jpg",
    "chapter": 4
  },
  {
    "id": 238,
    "question": "Biển nào báo hiệu &quot;Đường hầm&quot;?",
    "options": [
      "1. Cả ba biển.",
      "2. Biển 2.",
      "3. Biển 2 và biển 3."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Biển 1: cửa chui - Biển 2: đường hầm ( có chiều sâu) - Biển 3: cầu vồng",
    "image": "images/driving_a1/q_238.jpg",
    "chapter": 4
  },
  {
    "id": 239,
    "question": "Biển này có ý nghĩa như thế nào?",
    "options": [
      "1. Chỉ hướng đi phải theo.",
      "2. Biển báo hiệu cho người lái xe biết số lượng làn đường trên mặt đường và hướng đi trên mỗi làn đường phải theo.",
      "3. Chỉ hướng đường phải theo."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Biển báo hiệu cho người lái xe biết số lượng làn đường trên mặt đường và hướng đi trên mỗi làn đường phải theo.",
    "image": "images/driving_a1/q_239.jpg",
    "chapter": 4
  },
  {
    "id": 240,
    "question": "Khi đến chỗ giao nhau, gặp biển nào thì người lái xe không được cho xe đi thẳng, phải rẽ sang hướng khác?",
    "options": [
      "1. Biển 1 và biển 2.",
      "2. Biển 1 và biển 3.",
      "3. Biển 2 và biển 3.",
      "4. Cả ba biển."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Biển 1: bắt buộc rẽ trái - Biển 2: bắt buộc rẽ trái, rẽ phải - Biển 3: bắt buộc đi thẳng, rẽ phải.",
    "image": "images/driving_a1/q_240.jpg",
    "chapter": 4
  },
  {
    "id": 241,
    "question": "Biển báo dưới đây có ý nghĩa như thế nào?",
    "options": [
      "1. Chỉ dẫn khoảng cách đến làn đường cứu nạn (làn thoát xe khẩn cấp).",
      "2. Báo hiệu đường cụt phía trước.",
      "3. Báo hiệu nút giao gần nhất phía trước.",
      "4. Báo hiệu trạm dừng nghỉ phía trước."
    ],
    "answer": 1,
    "isParalyzed": false,
    "explain": "Đây là Chỉ dẫn khoảng cách đến làn đường cứu nạn (làn thoát xe khẩn cấp) dựa theo quy chuẩn kỹ thuật quốc gia.",
    "image": "images/driving_a1/q_241.jpg",
    "chapter": 4
  },
  {
    "id": 242,
    "question": "Xe nào được quyền đi trước trong trường hợp này?",
    "options": [
      "1. Xe mô tô.",
      "2. Xe cứu thương đi làm nhiệm vụ cấp cứu."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Gặp xe cứu thương (xe ưu tiên) đang làm nhiệm vụ bắt buộc phải nhường.",
    "image": "images/driving_a1/q_242.jpg",
    "chapter": 5
  },
  {
    "id": 243,
    "question": "Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Xe con (A), xe mô tô, xe con (B), xe đạp.",
      "2. Xe con (B), xe đạp, xe mô tô, xe con (A).",
      "3. Xe con (A), xe con (B), xe mô tô + xe đạp.",
      "4. Xe mô tô + xe đạp, xe con (A), xe con (B)."
    ],
    "answer": 4,
    "isParalyzed": false,
    "explain": "Thứ tự xét xe đi: Xe trong giao lộ – Xe ưu tiên – Đường ưu tiên – Bên phải trống – rẽ phải – đi thẳng – rẽ trái. Trường hợp 4: bên phải xe nào trống xe đó được quyền đi trước. Xe mô tô + xe đạp bên phải trống đi trước, xe ô tô A đi thẳng, xe ô tô B rẽ trái đi cuối.",
    "image": "images/driving_a1/q_243.jpg",
    "chapter": 5
  },
  {
    "id": 244,
    "question": "Theo tín hiệu đèn, xe nào phải dừng lại là đúng quy tắc giao thông?",
    "options": [
      "1. Xe khách, xe mô tô.",
      "2. Xe tải, xe mô tô.",
      "3. Xe con, xe tải."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "LƯU Ý: Rất nhiều học viên nhầm lẫn đây là Biển báo. Tuy nhiên, biển màu đen treo phía trên mỗi làn đường chính là HỆ THỐNG ĐÈN TÍN HIỆU GIAO THÔNG (nhìn kỹ sẽ thấy đèn sáng xanh/đỏ). Dựa theo tín hiệu đèn: Đèn xanh được đi, đèn đỏ phải dừng lại. Vì thế xe con và xe tải (đang gặp đèn đỏ) phải dừng lại; xe khách và mô tô (gặp đèn xanh) được đi.",
    "image": "images/driving_a1/q_244.jpg",
    "chapter": 5
  },
  {
    "id": 245,
    "question": "Trong tình huống dưới đây, xe đầu kéo kéo rơ moóc (xe container) đang rẽ phải, xe con màu xanh và xe máy phía sau xe container đi như thế nào để bảo đảm an toàn?",
    "options": [
      "1. Vượt về phía bên phải để đi tiếp.",
      "2. Giảm tốc độ chờ xe container rẽ xong rồi tiếp tục đi.",
      "3. Vượt về phía bên trái để đi tiếp."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Không đi vào góc khuất của xe đầu kéo vì đây là điểm mù, rất nhiều vụ tai nạn giao thông xảy ra vì điều do đi và điểm mù của xe đầu kéo.",
    "image": "images/driving_a1/q_245.jpg",
    "chapter": 1
  },
  {
    "id": 246,
    "question": "Muốn vượt xe phía trước, người lái xe mô tô phải có tín hiệu như thế nào dưới đây để bảo đảm an toàn?",
    "options": [
      "1. Bấm còi liên tục để xe phía trước biết xe mình xin vượt.",
      "2. Rú ga liên tục để xe phía trước biết xe mình xin vượt.",
      "3. Báo hiệu nhấp nháy bằng đèn chiếu sáng phía trước hoặc còi."
    ],
    "answer": 3,
    "isParalyzed": true,
    "explain": "Quy tắc vượt xe: chỉ vượt khi đủ điều kiện an toàn, có tín hiệu, giữ khoảng cách, không vượt ở cầu hẹp/đường cong/tầm nhìn hạn chế/giao cắt. Đáp án đúng mô tả đúng trình tự/tình huống an toàn: “Báo hiệu nhấp nháy bằng đèn chiếu sáng phía trước hoặc còi.”. (Câu điểm liệt – bắt buộc nắm chắc).",
    "image": null,
    "chapter": 3
  },
  {
    "id": 247,
    "question": "Khi lái xe trong khu đông dân cư, khu vực cơ sở khám bệnh, chữa bệnh trừ các khu vực có biển cấm sử dụng còi, người lái xe được sử dụng còi trong thời gian nào?",
    "options": [
      "1. Từ 22 giờ ngày hôm trước đến 05 giờ ngày hôm sau.",
      "2. Từ 05 giờ đến 22 giờ.",
      "3. Từ 23 giờ ngày hôm trước đến 05 giờ sáng hôm sau."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Quy tắc an toàn và pháp luật cấm tuyệt đối hành vi/điều kiện nêu trong đáp án đúng: “Từ 05 giờ đến 22 giờ.”, nhằm phòng ngừa nguy hiểm và vi phạm. Các đáp án còn lại không bao trùm đầy đủ hoặc không phù hợp.",
    "image": null,
    "chapter": 4
  },
  {
    "id": 248,
    "question": "Người lái xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy không được thực hiện các hành vi nào sau đây?",
    "options": [
      "1. Đi xe dàn hàng ngang; đi xe vào phần đường dành cho người đi bộ và phương tiện khác.",
      "2. Sử dụng ô, thiết bị âm thanh, trừ thiết bị trợ thính.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": true,
    "explain": "Chọn đáp án đúng “Cả hai ý trên.” vì phù hợp với quy tắc/định nghĩa chính thức của Luật GTĐB và quy chuẩn báo hiệu. Các lựa chọn khác thiếu, sai hoặc trái quy tắc. (Câu điểm liệt – bắt buộc nắm chắc).",
    "image": null,
    "chapter": 1
  },
  {
    "id": 249,
    "question": "Trên đường bộ ngoài khu vực đông dân cư, đường hai chiều hoặc đường một chiều có một làn xe cơ giới (trừ đường cao tốc), loại xe nào dưới đây được tham gia giao thông với tốc độ khai thác tối đa cho phép là 60 km/h?",
    "options": [
      "1. Xe ô tô chở người đến 28 chỗ không kể chỗ của người lái xe (trừ xe buýt); ô tô tải có trọng tải không lớn hơn 3,5 tấn.",
      "2. Xe ô tô chở người trên 28 chỗ không kể chỗ người lái xe (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc).",
      "3. Xe buýt; ô tô đầu kéo kéo sơ mi rơ moóc (trừ ô tô đầu kéo kéo sơ mi rơ moóc xi téc); xe mô tô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông lưu động).",
      "4. Ô tô kéo rơ moóc; ô tô kéo xe khác; ô tô trộn vữa, ô tô trộn bê tông lưu động, ô tô xi téc, ô tô đầu kéo kéo sơ mi rơ moóc xi téc, ô tô kéo theo rơ moóc xi téc."
    ],
    "answer": 3,
    "isParalyzed": false,
    "explain": "Đây là câu hỏi khái niệm/định nghĩa. Đáp án đúng chính là nội dung định nghĩa chuẩn: “Xe buýt; ô tô đầu kéo kéo sơ mi rơ moóc (trừ ô tô đầu kéo kéo sơ mi rơ moóc xi téc); xe mô tô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông lưu động).”. Hãy ghi nhớ từ khóa trong câu hỏi và so khớp với định nghĩa đầy đủ nhất.",
    "image": null,
    "chapter": 1
  },
  {
    "id": 250,
    "question": "Khái niệm “đỗ xe” được hiểu như thế nào là đúng?",
    "options": [
      "1. Là trạng thái đứng yên của phương tiện giao thông có giới hạn trong một khoảng thời gian cần thiết đủ để cho người lên, xuống phương tiện, xếp dỡ hàng hóa hoặc thực hiện công việc khác.",
      "2. Là trạng thái đứng yên của phương tiện giao thông không giới hạn thời gian.",
      "3. Cả hai ý trên."
    ],
    "answer": 2,
    "isParalyzed": false,
    "explain": "Mẹo nhớ: Đỗ xe là trạng thái đứng yên KHÔNG giới hạn thời gian. Dừng xe là trạng thái đứng yên CÓ giới hạn thời gian.",
    "image": null,
    "chapter": 1
  }
],

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
  isLearningMode: false,
  questions: [],
  currentIndex: 0,
  userAnswers: {},
  timerInterval: null,
  timeLeft: 19 * 60, // 19 phút
  isSubmitted: false
};

// 1. Chuyển đổi tab trong trang Driving (UI/UX Pro Max Edition)
function switchDrivingTab(tabId, btnEl) {
  const targetBtn = btnEl || document.querySelector(`.driving-subnav-btn[data-tab="${tabId}"]`);
  document.querySelectorAll('.driving-subnav-btn').forEach(b => {
    b.classList.remove('active');
    const isDanger = (b.dataset.tab === 'cau-liet-20' || b.dataset.tab === 'cau-liet-60');
    if (isDanger) {
      b.style.background = '#FEF2F2';
      b.style.color = '#DC2626';
      b.style.borderColor = '#FECACA';
      b.style.fontWeight = '700';
    } else {
      b.style.background = 'transparent';
      b.style.color = '#334155';
      b.style.borderColor = '#E2E8F0';
      b.style.fontWeight = '600';
    }
  });

  if (targetBtn) {
    targetBtn.classList.add('active');
    const isDanger = (tabId === 'cau-liet-20' || tabId === 'cau-liet-60');
    targetBtn.style.background = isDanger ? '#DC2626' : '#2563EB';
    targetBtn.style.color = '#FFF';
    targetBtn.style.borderColor = isDanger ? '#DC2626' : '#2563EB';
    targetBtn.style.fontWeight = '800';
    if (typeof targetBtn.scrollIntoView === 'function') {
      targetBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
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
  } else if (tabId.startsWith('meo-') && tabId !== 'meo-a1') {
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
  const all = DRIVING_DATA_2026.examA1Questions || [];
  
  if (typeof mode === 'string' && mode.startsWith('set_')) {
    const sNum = parseInt(mode.replace('set_', '')) || 1;
    return generateFixedExamA1(sNum);
  }
  
  if (mode === 'paralyzed') {
    // 21 Câu Điểm Liệt A1
    return all.filter(q => q.isParalyzed);
  }
  if (mode === 'full') {
    // Toàn bộ 250 câu hỏi
    return [...all];
  }
  if (mode === 'wrong') {
    const wrongIds = getStoredWrongQuestions();
    if (wrongIds.length === 0) return [];
    return all.filter(q => wrongIds.includes(q.id));
  }
  if (mode === 'speed') {
    const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());
    return shuffle([...all]).slice(0, 25);
  }
  if (mode === 'chapter1') {
    // Khái niệm & quy tắc giao thông (các câu lý thuyết chữ)
    return all.filter(q => !/biển/i.test(q.question) && !q.image);
  }
  if (mode === 'chapter2') {
    // Văn hóa & đạo đức lái xe
    return all.filter(q => /văn hóa|đạo đức|sơ cứu|ứng xử|trách nhiệm/i.test(q.question));
  }
  if (mode === 'chapter3') {
    // Kỹ thuật lái xe an toàn
    return all.filter(q => /kỹ thuật|kỹ năng|tay ga|xuống dốc|phanh|chuyển hướng|quay đầu|khởi hành|tầm nhìn/i.test(q.question) && !q.image);
  }
  if (mode === 'chapter4') {
    // Hệ thống biển báo hiệu đường bộ (94 câu)
    return all.filter(q => /biển/i.test(q.question));
  }
  if (mode === 'chapter5') {
    // Giải thế sa hình giao thông (35 câu chuẩn Bộ GTVT)
    const falseSaHinhIds = [73, 81, 94, 119, 231, 232];
    return all.filter(q => q.image && !/biển/i.test(q.question) && !falseSaHinhIds.includes(q.id));
  }

  // Đề Thi Ngẫu Nhiên 25 câu chuẩn cấu trúc Cục Đường Bộ:
  // - 01 câu điểm liệt
  // - 12 câu khái niệm & quy tắc
  // - 05 câu hệ thống biển báo
  // - 05 câu giải thế sa hình
  // - 01 câu văn hóa giao thông
  // - 01 câu kỹ thuật lái xe
  const paralyzedList = all.filter(q => q.isParalyzed);
  const nonParalyzed = all.filter(q => !q.isParalyzed);
  
  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());
  
  const pQ = shuffle(paralyzedList).slice(0, 1);
  const otherQs = shuffle(nonParalyzed).slice(0, 24);
  
  return shuffle([...pQ, ...otherQs]);
}


// 5. Trình Thi Thử Sát Hạch Trực Tuyến Live Simulator (Hỗ trợ cả HỌC và THI)
function startExamSimulation(rank = 'A1', mode = 'random', title = 'Đề Thi Thử Sát Hạch A1 (25 Câu)', isLearningMode = false) {
  activeExam.type = rank;
  activeExam.modeName = title;
  activeExam.isLearningMode = Boolean(isLearningMode);
  
  if (rank === 'A1') {
    if (mode === 'wrong') {
      const wrongList = generateA1ExamQuestions('wrong');
      if (wrongList.length === 0) {
        if (typeof showToast === 'function') {
          showToast('Bạn chưa có câu nào làm sai trong lịch sử làm bài! Hãy làm bài thi trước.');
        } else {
          alert('Bạn chưa có câu nào làm sai trong lịch sử làm bài!');
        }
        return;
      }
      activeExam.questions = wrongList;
      activeExam.timeLeft = Math.max(5, Math.ceil(wrongList.length * 0.8)) * 60;
    } else if (mode === 'full') {
      activeExam.questions = generateA1ExamQuestions('full');
      activeExam.timeLeft = 90 * 60;
    } else if (mode === 'speed') {
      activeExam.questions = generateA1ExamQuestions('speed');
      activeExam.timeLeft = 5 * 60;
    } else if (mode === 'paralyzed') {
      activeExam.questions = generateA1ExamQuestions('paralyzed');
      activeExam.timeLeft = 15 * 60;
    } else if (mode === 'chapter1' || mode === 'chapter4') {
      activeExam.questions = generateA1ExamQuestions(mode);
      activeExam.timeLeft = 60 * 60;
    } else if (mode === 'chapter2' || mode === 'chapter3') {
      activeExam.questions = generateA1ExamQuestions(mode);
      activeExam.timeLeft = 15 * 60;
    } else if (mode === 'chapter5') {
      activeExam.questions = generateA1ExamQuestions(mode);
      activeExam.timeLeft = 30 * 60;
    } else {
      activeExam.questions = generateA1ExamQuestions(mode);
      activeExam.timeLeft = 19 * 60; // 19 phút chuẩn Bộ Công An
    }
  } else if (rank === 'A') {
    activeExam.questions = generateA1ExamQuestions(mode);
    activeExam.timeLeft = 19 * 60;
  } else if (rank === 'B') {
    const all = DRIVING_DATA_2026.examA1Questions || [];
    const carP = DRIVING_DATA_2026.carParalyzed60 || [];
    const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());
    const pSample = shuffle(carP).slice(0, 2).map(q => ({...q, isParalyzed: true}));
    const regularSample = shuffle(all.filter(q => !q.isParalyzed)).slice(0, 33);
    activeExam.questions = shuffle([...pSample, ...regularSample]);
    activeExam.timeLeft = 22 * 60;
    activeExam.modeNotice = 'Đề thi mô phỏng cấu trúc Hạng B (35 câu, thời gian 22 phút, đạt ≥ 32/35, không sai câu liệt), kết hợp ngân hàng 60 câu điểm liệt ô tô chính thức.';
  } else if (rank === 'C') {
    const all = DRIVING_DATA_2026.examA1Questions || [];
    const carP = DRIVING_DATA_2026.carParalyzed60 || [];
    const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());
    const pSample = shuffle(carP).slice(0, 2).map(q => ({...q, isParalyzed: true}));
    const regularSample = shuffle(all.filter(q => !q.isParalyzed)).slice(0, 38);
    activeExam.questions = shuffle([...pSample, ...regularSample]);
    activeExam.timeLeft = 24 * 60;
    activeExam.modeNotice = 'Đề thi mô phỏng cấu trúc Hạng C (40 câu, thời gian 24 phút, đạt ≥ 36/40, không sai câu liệt), kết hợp ngân hàng 60 câu điểm liệt ô tô chính thức.';
  } else {
    activeExam.questions = generateA1ExamQuestions(mode);
    activeExam.timeLeft = 19 * 60;
  }

  activeExam.currentIndex = 0;
  activeExam.userAnswers = {};
  activeExam.isSubmitted = false;

  if (activeExam.timerInterval) clearInterval(activeExam.timerInterval);

  if (!activeExam.isLearningMode) {
    activeExam.timerInterval = setInterval(() => {
      if (activeExam.timeLeft > 0) {
        activeExam.timeLeft--;
        renderExamTimer();
      } else {
        clearInterval(activeExam.timerInterval);
        activeExam.timeLeft = 0;
        renderExamTimer();
        submitExamResult();
      }
    }, 1000);
  }

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
  const el = document.getElementById('modalExamCountdownBadge');
  if (!el) return;
  if (activeExam.isLearningMode) {
    el.innerHTML = `📖 Chế độ học tập`;
    el.style.background = '#EFF6FF';
    el.style.color = '#1D4ED8';
    el.style.borderColor = '#BFDBFE';
  } else {
    const m = Math.floor(activeExam.timeLeft / 60);
    const s = activeExam.timeLeft % 60;
    el.textContent = `⏱️ ${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    el.style.background = '#FEF3C7';
    el.style.color = '#D97706';
    el.style.borderColor = '#FDE68A';
  }
}

function renderExamUI() {
  const q = activeExam.questions[activeExam.currentIndex];
  if (!q) return;

  const total = activeExam.questions.length;
  const titleEl = document.getElementById('modalExamTitle');
  if (titleEl) titleEl.textContent = activeExam.modeName;
  renderExamTimer();

  // Render question number palette on the left
  const numBox = document.getElementById('modalExamQuestionNumbers');
  if (numBox) {
    numBox.innerHTML = activeExam.questions.map((item, idx) => {
      const isAns = (activeExam.userAnswers[idx] !== undefined);
      const isCur = (idx === activeExam.currentIndex);
      let bg = '#FFFFFF';
      let color = '#334155';
      let border = '#CBD5E1';

      if (activeExam.isLearningMode && isAns) {
        const isOk = (activeExam.userAnswers[idx] === item.answer);
        bg = isOk ? '#DCFCE7' : '#FEE2E2';
        color = isOk ? '#15803D' : '#DC2626';
        border = isOk ? '#86EFAC' : '#FCA5A5';
      } else if (isAns) {
        bg = '#ECFDF5';
        color = '#059669';
        border = '#10B981';
      }
      if (isCur) {
        border = '#2563EB';
        if (!isAns) {
          bg = '#EFF6FF';
          color = '#2563EB';
        }
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
    const hasAnswered = (currentAnswer !== undefined);

    contentBox.innerHTML = `
      <div style="background:#FFF; border:1px solid #E2E8F0; border-radius:14px; padding:24px; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:8px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-weight:800; color:#0F3D6E; font-size:1.02rem;">Câu hỏi ${activeExam.currentIndex + 1} / ${total} (Mã câu: #${q.id})</span>
            ${activeExam.isLearningMode ? '<span style="background:#EFF6FF; color:#1D4ED8; border:1px solid #BFDBFE; padding:3px 10px; border-radius:20px; font-size:0.75rem; font-weight:800;">📖 CHẾ ĐỘ HỌC TẬP</span>' : '<span style="background:#FEF3C7; color:#B45309; border:1px solid #FDE68A; padding:3px 10px; border-radius:20px; font-size:0.75rem; font-weight:800;">✍️ CHẾ ĐỘ THI THỬ</span>'}
          </div>
          ${q.isParalyzed ? '<span style="background:#FEF2F2; color:#DC2626; border:1.5px solid #FCA5A5; padding:3px 12px; border-radius:20px; font-size:0.75rem; font-weight:900;">⚠️ CÂU ĐIỂM LIỆT (BẮT BUỘC ĐÚNG)</span>' : ''}
        </div>

        <h3 style="font-size:1.15rem; color:#0F172A; line-height:1.5; margin-bottom:16px; font-weight:700;">${q.question}</h3>
        
        ${q.image ? `<div style="text-align:center; margin-bottom:18px; background:#F8FAFC; padding:12px; border-radius:10px; border:1px solid #E2E8F0;"><img src="${q.image}" onerror="handleDrivingImageError(this, ${q.id})" alt="Hình minh họa câu ${q.id}" style="max-width:100%; max-height:280px; object-fit:contain; border-radius:8px; box-shadow:0 1px 4px rgba(0,0,0,0.05);"></div>` : ''}

        <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:24px;">
          ${q.options.map((opt, oIdx) => {
            const ansNum = oIdx + 1;
            const isChecked = (currentAnswer === ansNum);
            
            let bg = '#FFFFFF';
            let border = '#E2E8F0';
            let color = '#1E293B';
            let badge = '';
            let indicatorBg = '#E2E8F0';
            let indicatorColor = '#475569';
            let indicatorText = `${ansNum}`;

            if (activeExam.isLearningMode && hasAnswered) {
              const isCorrectOpt = (ansNum === q.answer);
              if (isCorrectOpt) {
                bg = 'linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%)';
                border = '#10B981';
                color = '#064E3B';
                indicatorBg = '#10B981';
                indicatorColor = '#FFFFFF';
                indicatorText = '✓';
                badge = '<span style="background:#10B981; color:#FFF; font-size:0.72rem; font-weight:800; padding:4px 10px; border-radius:20px; margin-left:auto; box-shadow:0 2px 6px rgba(16,185,129,0.25);">✔ ĐÁP ÁN ĐÚNG</span>';
              } else if (isChecked && !isCorrectOpt) {
                bg = 'linear-gradient(135deg, #FEF2F2 0%, #FFF5F5 100%)';
                border = '#EF4444';
                color = '#B91C1C';
                indicatorBg = '#EF4444';
                indicatorColor = '#FFFFFF';
                indicatorText = '✕';
                badge = '<span style="background:#DC2626; color:#FFF; font-size:0.72rem; font-weight:800; padding:4px 10px; border-radius:20px; margin-left:auto; box-shadow:0 2px 6px rgba(220,38,38,0.25);">✖ BẠN ĐÃ CHỌN</span>';
              }
            } else if (isChecked) {
              bg = 'linear-gradient(135deg, #EFF6FF 0%, #F8FAFC 100%)';
              border = '#2563EB';
              color = '#1E40AF';
              indicatorBg = '#2563EB';
              indicatorColor = '#FFFFFF';
              badge = '<span style="background:#2563EB; color:#FFF; font-size:0.72rem; font-weight:800; padding:3px 8px; border-radius:12px; margin-left:auto;">ĐÃ CHỌN</span>';
            }

            return `
              <div onclick="selectExamAnswer(${ansNum})" style="display:flex; align-items:center; gap:14px; padding:14px 18px; border:2px solid ${border}; background:${bg}; border-radius:12px; cursor:pointer; transition:all 0.18s cubic-bezier(0.16,1,0.3,1); user-select:none; box-shadow:${isChecked ? '0 4px 12px rgba(37,99,235,0.08)' : 'none'};">
                <div style="width:28px; height:28px; border-radius:50%; background:${indicatorBg}; color:${indicatorColor}; font-weight:800; font-size:0.86rem; display:flex; align-items:center; justify-content:center; flex-shrink:0;">${indicatorText}</div>
                <span style="font-size:0.98rem; color:${color}; font-weight:${isChecked ? '700' : '500'}; line-height:1.5; flex:1;">${opt}</span>
                ${badge}
              </div>
            `;
          }).join('')}
        </div>

        <!-- Mẹo và Giải Thích Chi Tiết trong Chế Độ Học (ProMax Insight Box) -->
        ${(activeExam.isLearningMode && hasAnswered) ? `
          <div style="background:linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%); border:1.5px solid #FDE68A; border-radius:14px; padding:18px 22px; margin-bottom:20px; box-shadow:0 2px 8px rgba(217,119,6,0.06);">
            <div style="display:flex; align-items:center; gap:8px; color:#92400E; font-weight:800; font-size:0.88rem; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:6px;">
              <span style="font-size:1.15rem;">💡</span> LỜI GIẢI CHI TIẾT &amp; MẸO GHI NHỚ VÀNG:
            </div>
            <div style="color:#78350F; font-size:0.95rem; line-height:1.65; font-weight:500;">
              ${q.explain || 'Đáp án đúng là ý ' + q.answer}
            </div>
          </div>
        ` : ''}

        <div style="display:flex; justify-content:space-between; align-items:center; padding-top:18px; border-top:1px solid #F1F5F9; flex-wrap:wrap; gap:8px;">
          <button type="button" onclick="goToExamQuestion(${activeExam.currentIndex - 1})" ${activeExam.currentIndex === 0 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''} style="background:#F1F5F9; color:#334155; border:1px solid #CBD5E1; padding:10px 16px; border-radius:10px; font-weight:700; font-size:0.9rem; cursor:pointer; min-height:44px;">
            ⬅ Câu trước
          </button>
          
          ${activeExam.isLearningMode ? `
            <button type="button" onclick="finishLearningSession()" style="background:#059669; color:#FFF; border:none; padding:10px 18px; border-radius:10px; font-weight:800; font-size:0.92rem; cursor:pointer; display:inline-flex; align-items:center; gap:6px; min-height:44px;">
              🏁 Kết thúc buổi học
            </button>
          ` : `
            <button type="button" onclick="confirmSubmitExam()" style="background:#D97706; color:#FFF; border:none; padding:10px 18px; border-radius:10px; font-weight:800; font-size:0.92rem; cursor:pointer; display:inline-flex; align-items:center; gap:6px; min-height:44px;">
              🏁 Nộp bài sát hạch
            </button>
          `}
          
          <button type="button" onclick="goToExamQuestion(${activeExam.currentIndex + 1})" ${activeExam.currentIndex === total - 1 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''} style="background:#0F3D6E; color:#FFF; border:none; padding:10px 16px; border-radius:10px; font-weight:700; font-size:0.9rem; cursor:pointer; min-height:44px;">
            Câu tiếp ➡
          </button>
        </div>
      </div>
    `;
  }
}

function selectExamAnswer(ansNumber) {
  if (activeExam.isSubmitted && !activeExam.isLearningMode) return;
  activeExam.userAnswers[activeExam.currentIndex] = ansNumber;
  
  const q = activeExam.questions[activeExam.currentIndex];
  if (activeExam.isLearningMode) {
    if (ansNumber === q.answer) {
      if (typeof playDrivingSound === 'function') playDrivingSound('correct');
      try {
        let mastered = JSON.parse(localStorage.getItem('nb_mastered_question_ids') || '[]');
        if (!mastered.includes(q.id)) {
          mastered.push(q.id);
          localStorage.setItem('nb_mastered_question_ids', JSON.stringify(mastered));
          updateLearningDashboard();
        }
      } catch(e) {}
    } else {
      if (typeof playDrivingSound === 'function') playDrivingSound('wrong');
    }
  } else {
    if (typeof playDrivingSound === 'function') playDrivingSound('click');
  }
  
  renderExamUI();
}

function finishLearningSession() {
  if (typeof showToast === 'function') {
    showToast('Đã hoàn thành buổi học! Đang lưu tiến độ...');
  }
  closeExamLiveModal();
}

function goToExamQuestion(idx) {
  if (idx >= 0 && idx < activeExam.questions.length) {
    activeExam.currentIndex = idx;
    renderExamUI();
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

  const total = activeExam.questions.length;
  // Quy chuẩn sát hạch chính thức:
  // - Hạng A1/A: 25 câu, đạt tối thiểu 24/25, không sai câu điểm liệt
  // - Hạng B: 35 câu, đạt tối thiểu 32/35, không sai câu điểm liệt
  // - Hạng C: 40 câu, đạt tối thiểu 36/40, không sai câu điểm liệt
  let passScore = 24;
  if (activeExam.type === 'B') passScore = 32;
  else if (activeExam.type === 'C') passScore = 36;
  else if (total === 25) passScore = 24;
  else passScore = Math.ceil(total * 0.96);

  const isPass = (correctCount >= passScore) && !failedParalyzed;

  // Lưu câu sai vào localStorage
  if (currentWrongIds.length > 0) {
    saveWrongQuestions(currentWrongIds);
  }

  // Lưu các câu đã làm đúng duy nhất để thống kê chính xác thực tế
  try {
    let mastered = JSON.parse(localStorage.getItem('nb_mastered_question_ids') || '[]');
    activeExam.questions.forEach((q, idx) => {
      if (activeExam.userAnswers[idx] === q.answer) {
        if (!mastered.includes(q.id)) mastered.push(q.id);
      }
    });
    localStorage.setItem('nb_mastered_question_ids', JSON.stringify(mastered));
  } catch(e) {}

  // Lưu kết quả thi vào lịch sử nếu là bộ đề cố định
  if (activeExam.modeName && activeExam.modeName.includes('Đề Số ')) {
    const m = activeExam.modeName.match(/Đề Số (\d+)/);
    if (m) {
      const sNum = parseInt(m[1]);
      saveExamHistory('A1_set_' + sNum, correctCount, total, isPass);
    }
  }

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

function renderQuestionLookup(filterChapter = 0, keyword = '', btnEl = null) {
  const container = document.getElementById('drivingQuestionListContainer');
  if (!container) return;

  const buttonsContainer = container.previousElementSibling;
  if (buttonsContainer) {
    const btns = buttonsContainer.querySelectorAll('button');
    btns.forEach((b, idx) => {
      const isActive = btnEl ? (b === btnEl) : (idx === filterChapter);
      b.className = isActive ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm';
    });
  }

  let list = DRIVING_DATA_2026.examA1Questions || [];
  if (filterChapter > 0) {
    list = list.filter(q => q.chapter === filterChapter);
  }
  if (keyword && keyword.trim() !== '') {
    const kw = keyword.toLowerCase().trim();
    list = list.filter(q => (q.question && q.question.toLowerCase().includes(kw)) || (q.explain && q.explain.toLowerCase().includes(kw)));
  }

  if (list.length === 0) {
    container.innerHTML = '<div style="text-align:center; padding:30px; color:#64748B;">Không tìm thấy câu hỏi nào phù hợp với từ khóa hoặc chương đã chọn.</div>';
    return;
  }

  container.innerHTML = list.map((q, idx) => `
    <div style="background:#FFF; border:1px solid #E2E8F0; border-radius:12px; padding:20px; margin-bottom:14px; box-shadow:0 1px 4px rgba(0,0,0,0.02);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-weight:800; color:#2563EB; font-size:0.92rem;">Câu ${q.id} (Chương ${q.chapter || 1})</span>
        ${q.isParalyzed ? '<span style="background:#FEF2F2; color:#DC2626; border:1px solid #FCA5A5; padding:2px 8px; border-radius:14px; font-size:0.72rem; font-weight:800;">⚠️ CÂU ĐIỂM LIỆT</span>' : ''}
      </div>
      <h4 style="font-size:1.02rem; color:#0F172A; line-height:1.5; margin-bottom:12px;">${q.question}</h4>
      ${q.image ? `<div style="text-align:center; margin:12px 0; background:#F8FAFC; padding:10px; border-radius:8px; border:1px solid #E2E8F0;"><img src="${q.image}" class="question-img" alt="Hình minh họa câu ${q.id}" style="max-width:100%; max-height:280px; object-fit:contain; border-radius:6px;" onerror="this.onerror=null; handleDrivingImageError(this, ${q.id});"></div>` : ''}
      <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:12px;">
        ${q.options.map((opt, oIdx) => `
          <div style="padding:10px 14px; border-radius:8px; font-size:0.92rem; background:${(oIdx + 1 === q.answer) ? '#ECFDF5' : '#FFFFFF'}; color:${(oIdx + 1 === q.answer) ? '#065F46' : '#0F172A'}; font-weight:${(oIdx + 1 === q.answer) ? '700' : '600'}; border:1.5px solid ${(oIdx + 1 === q.answer) ? '#10B981' : '#CBD5E1'}; line-height:1.5; box-shadow:0 1px 3px rgba(15,23,42,0.03);">
            ${(oIdx + 1 === q.answer) ? '<span style="color:#10B981; font-weight:900; margin-right:6px;">✔</span>' : ''}<b style="color:${(oIdx + 1 === q.answer) ? '#059669' : '#0F172A'}; margin-right:6px;">${oIdx + 1}.</b>${opt.replace(/^(\d+[\.\)]\s*)+/, '')}
          </div>
        `).join('')}
      </div>
      <div style="font-size:0.82rem; color:#475569; background:#F1F5F9; padding:8px 12px; border-radius:6px;">
        💡 <b>Giải thích:</b> ${q.explain}
      </div>
    </div>
  `).join('');
}

// 7. Tính Năng Xem 20 Câu Điểm Liệt A1 (PROMAX UI/UX EDITION)
function playQuestionSpeech(qId) {
  const all = (DRIVING_DATA_2026.examA1Questions || []).concat(DRIVING_DATA_2026.carParalyzed60 || []);
  const q = all.find(item => item.id == qId);
  if (!q) return;

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const correctOpt = q.options[q.answer - 1] || '';
    const cleanText = `${q.question}. Đáp án đúng là: ${correctOpt}. Lưu ý: ${q.explain || ''}`;
    const u = new SpeechSynthesisUtterance(cleanText);
    u.lang = 'vi-VN';
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
    if (typeof showToast === 'function') {
      showToast('🔊 Đang phát giọng đọc câu hỏi #' + q.id);
    }
  } else {
    if (typeof showToast === 'function') {
      showToast('Trình duyệt không hỗ trợ Web Speech API.');
    }
  }
}

function renderParalyzedQuestions(keyword = '') {
  const container = document.getElementById('paralyzedQuestionsList');
  if (!container) return;

  const allParalyzed = (DRIVING_DATA_2026.examA1Questions || []).filter(q => q.isParalyzed);
  let list = allParalyzed;

  if (keyword && keyword.trim()) {
    const kw = keyword.toLowerCase().trim();
    list = allParalyzed.filter(q => 
      q.question.toLowerCase().includes(kw) || 
      (q.explain && q.explain.toLowerCase().includes(kw)) ||
      q.options.some(opt => opt.toLowerCase().includes(kw)) ||
      String(q.id).includes(kw)
    );
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div style="background:#FFF; border:1.5px solid #E2E8F0; border-radius:18px; padding:48px 24px; text-align:center; box-shadow:0 4px 18px rgba(0,0,0,0.02);">
        <div style="font-size:3rem; margin-bottom:12px;">🔍</div>
        <h3 style="color:#0F172A; font-weight:800; font-size:1.18rem; margin-bottom:6px;">Không tìm thấy câu điểm liệt phù hợp</h3>
        <p style="color:#64748B; font-size:0.92rem; margin-bottom:18px;">Thử tìm kiếm với từ khóa khác như "cồn", "ma túy", "nhường đường", "vượt", "quay đầu"...</p>
        <button type="button" onclick="const inp=document.getElementById('paralyzedSearchInput'); if(inp) inp.value=''; renderParalyzedQuestions('');" style="background:#2563EB; color:#FFF; border:none; padding:10px 22px; border-radius:8px; font-weight:700; font-size:0.88rem; cursor:pointer;">
          Xem Toàn Bộ 20 Câu Điểm Liệt
        </button>
      </div>
    `;
    return;
  }

  function highlightDangerKeywords(text, kw) {
    if (!text) return '';
    const safeText = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const dangerWords = [
      'bị nghiêm cấm', 'nghiêm cấm', 'không được phép', 'không được mang vác', 
      'không được quay đầu', 'không được vượt', 'không được lùi', 'không được đi',
      'không được', 'phải giảm tốc độ', 'nhường đường'
    ];
    
    let res = safeText;
    dangerWords.forEach(w => {
      const reg = new RegExp(`(${w})`, 'gi');
      res = res.replace(reg, '<span style="background:#FEE2E2; color:#B91C1C; font-weight:800; padding:1px 6px; border-radius:4px; border:1px solid #FECACA;">$1</span>');
    });

    if (kw && kw.trim().length > 1) {
      const cleanKw = kw.trim().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      const kwReg = new RegExp(`(${cleanKw})`, 'gi');
      res = res.replace(kwReg, '<mark style="background:#FEF08A; color:#854D0E; padding:1px 4px; border-radius:3px; font-weight:800;">$1</mark>');
    }
    return res;
  }

  const countBadge = (list.length === allParalyzed.length)
    ? `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; font-size:0.9rem; color:#64748B;">
         <span>Danh sách đầy đủ: <b style="color:#0F172A;">20 câu hỏi điểm liệt</b> (Học kỹ để đỗ 100%)</span>
         <span style="display:inline-flex; align-items:center; gap:6px; color:#DC2626; font-weight:800;">
           <span style="width:8px; height:8px; background:#DC2626; border-radius:50%; display:inline-block; box-shadow:0 0 0 3px rgba(220,38,38,0.2);"></span>
           Sai 1 câu là trượt trực tiếp
         </span>
       </div>`
    : `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; font-size:0.9rem; color:#2563EB;">
         <span>Tìm thấy <b style="color:#0F172A;">${list.length}</b> câu điểm liệt phù hợp với từ khóa "<i>${keyword}</i>"</span>
         <button type="button" onclick="const inp=document.getElementById('paralyzedSearchInput'); if(inp) inp.value=''; renderParalyzedQuestions('');" style="background:none; border:none; color:#2563EB; font-weight:700; cursor:pointer; text-decoration:underline; font-size:0.86rem;">Hiện tất cả 20 câu</button>
       </div>`;

  const cardsHtml = list.map((q, idx) => {
    const originalIndex = allParalyzed.findIndex(item => item.id === q.id);
    const orderNum = (originalIndex >= 0 ? originalIndex + 1 : idx + 1);

    const optionsHtml = q.options.map((opt, oIdx) => {
      const cleanOpt = opt.replace(/^(\d+[\.\)]\s*)+/, '');
      const isCorrect = (oIdx + 1 === q.answer);
      if (isCorrect) {
        return `
          <div style="background:linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%); border:2px solid #10B981; border-radius:12px; padding:14px 18px; display:flex; align-items:flex-start; gap:14px; box-shadow:0 4px 14px rgba(16,185,129,0.12); transition:all 0.2s;">
            <div style="width:32px; height:32px; border-radius:50%; background:#10B981; color:#FFF; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:1rem; flex-shrink:0; box-shadow:0 2px 6px rgba(16,185,129,0.35);">✓</div>
            <div style="flex:1;">
              <div style="font-size:0.98rem; color:#064E3B; font-weight:750; line-height:1.6;">
                <span style="color:#059669; font-weight:900; margin-right:6px;">${oIdx + 1}.</span> ${highlightDangerKeywords(cleanOpt, keyword)}
              </div>
            </div>
            <span style="background:#10B981; color:#FFF; font-size:0.75rem; font-weight:800; padding:5px 12px; border-radius:20px; white-space:nowrap; letter-spacing:0.04em; display:inline-flex; align-items:center; gap:4px; box-shadow:0 2px 6px rgba(16,185,129,0.25);">
              <span>✔</span> ĐÁP ÁN ĐÚNG
            </span>
          </div>
        `;
      } else {
        return `
          <div style="background:#FFFFFF; border:1.5px solid #CBD5E1; border-radius:12px; padding:14px 18px; display:flex; align-items:flex-start; gap:14px; box-shadow:0 2px 6px rgba(15,23,42,0.04); transition:all 0.15s;" onmouseenter="this.style.background='#F8FAFC'; this.style.borderColor='#94A3B8';" onmouseleave="this.style.background='#FFFFFF'; this.style.borderColor='#CBD5E1';">
            <div style="width:32px; height:32px; border-radius:50%; background:#F1F5F9; border:1.5px solid #CBD5E1; color:#0F172A; display:flex; align-items:center; justify-content:center; font-weight:850; font-size:0.92rem; flex-shrink:0;">${oIdx + 1}</div>
            <div style="flex:1; font-size:0.96rem; color:#0F172A; font-weight:600; line-height:1.6;">
              ${highlightDangerKeywords(cleanOpt, keyword)}
            </div>
          </div>
        `;
      }
    }).join('');

    const imgHtml = (q.image || q.source_image) ? `
      <div style="margin:14px 0 16px; text-align:center;">
        <img src="./images/driving_a1/q_${q.id}.jpg" alt="Minh họa câu ${q.id}" onerror="handleDrivingImageError(this, ${q.id})" style="max-height:220px; max-width:100%; border-radius:12px; border:1.5px solid rgba(0,0,0,0.1); box-shadow:0 4px 14px rgba(0,0,0,0.08);">
      </div>
    ` : '';

    return `
      <div class="promax-paralyzed-card" style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:18px; padding:24px 28px 24px 32px; margin-bottom:22px; box-shadow:0 4px 20px -2px rgba(15,23,42,0.04), 0 2px 6px -1px rgba(15,23,42,0.02); position:relative; overflow:hidden; transition:all 0.25s cubic-bezier(0.16, 1, 0.3, 1);">
        
        <!-- Dải sọc cảnh báo ProMax đỏ son bên trái -->
        <div style="position:absolute; left:0; top:0; bottom:0; width:5px; background:linear-gradient(180deg, #EF4444 0%, #DC2626 100%);"></div>

        <!-- Hàng thông tin thẻ trên cùng -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px;">
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <span style="background:#0F172A; color:#FFFFFF; font-weight:900; font-size:0.82rem; padding:4px 12px; border-radius:20px; letter-spacing:0.03em;">
              CÂU #${orderNum < 10 ? '0' + orderNum : orderNum} / 20
            </span>
            <span style="background:#F1F5F9; color:#475569; font-weight:700; font-size:0.78rem; padding:4px 10px; border-radius:8px;">
              Mã gốc: Câu ${q.id}
            </span>
            <span style="background:#E0F2FE; color:#0284C7; font-weight:700; font-size:0.78rem; padding:4px 10px; border-radius:8px;">
              Chương ${q.chapter || 1}
            </span>
          </div>

          <div style="display:flex; align-items:center; gap:8px;">
            <button type="button" onclick="playQuestionSpeech('${q.id}')" style="background:#0F172A; border:1px solid #334155; color:#F8FAFC; padding:5px 12px; border-radius:8px; font-size:0.78rem; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:5px; transition:all 0.15s;" title="Nghe giọng đọc AI">
              🔊 Đọc câu hỏi
            </button>
            <span style="display:inline-flex; align-items:center; gap:7px; background:#FEF2F2; color:#DC2626; border:1.5px solid #FCA5A5; padding:4px 12px; border-radius:30px; font-size:0.75rem; font-weight:800; letter-spacing:0.04em;">
              <span style="width:7px; height:7px; background:#DC2626; border-radius:50%; display:inline-block; box-shadow:0 0 0 3px rgba(220,38,38,0.25);"></span>
              SAI LÀ RỚT TRỰC TIẾP
            </span>
          </div>
        </div>

        <!-- Tiêu đề câu hỏi -->
        <h3 style="font-size:1.15rem; font-weight:800; color:#0F172A; line-height:1.6; margin:0 0 16px;">
          ${highlightDangerKeywords(q.question, keyword)}
        </h3>

        <!-- Ảnh minh họa nếu có -->
        ${imgHtml}

        <!-- Danh sách các lựa chọn đáp án -->
        <div style="display:flex; flex-direction:column; gap:9px; margin-bottom:16px;">
          ${optionsHtml}
        </div>

        <!-- Hộp mẹo ghi nhớ vàng & Căn cứ luật (ProMax Insight Box) -->
        <div style="background:linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%); border:1.5px solid #FCD34D; border-radius:12px; padding:14px 18px; box-shadow:0 2px 8px rgba(217,119,6,0.05);">
          <div style="display:flex; align-items:center; gap:8px; color:#92400E; font-size:0.8rem; font-weight:800; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:6px;">
            <span style="font-size:1.1rem;">💡</span> MẸO GHI NHỚ &amp; CĂN CỨ PHÁP LÝ:
          </div>
          <div style="color:#78350F; font-size:0.92rem; line-height:1.6; font-weight:600;">
            ${highlightDangerKeywords(q.explain || 'Bắt buộc tuân thủ đúng quy tắc an toàn giao thông đường bộ.', keyword)}
          </div>
        </div>

      </div>
    `;
  }).join('');

  container.innerHTML = countBadge + cardsHtml;
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
  const s = Math.max(1, Math.min(10, parseInt(setNumber) || 1));
  const start = (s - 1) * 25;
  return all.slice(start, start + 25);
}

function startFixedExamA1(setNumber, mode = 'exam') {
  const numStr = (setNumber < 10 ? '0' : '') + setNumber;
  const isLearning = (mode === 'learning');
  const title = isLearning 
    ? `Bộ Đề Số ${numStr} (Chế Độ Học Tập Có Giải Thích & Mẹo)` 
    : `Đề Thi Thử Sát Hạch A1 - Đề Số ${numStr} (25 Câu)`;
  startExamSimulation('A1', 'set_' + setNumber, title, isLearning);
}

// Render lưới 10 bộ đề thi A1 (Chuẩn 2 chế độ HỌC & THI như hoclaixemoto.com)
function renderExamSetsGridA1() {
  const container = document.getElementById('examSetsGridA1Container');
  if (!container) return;

  const history = getExamHistory();
  let html = '<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:16px;">';

  for (let s = 1; s <= 10; s++) {
    const key = 'A1_set_' + s;
    const h = history[key];
    const numStr = (s < 10 ? '0' : '') + s;

    let badgeHtml = '<span style="background:var(--badge-bg, rgba(148,163,184,0.15)); color:var(--app-text-muted, #64748B); border:1px solid var(--app-card-border, #E2E8F0); padding:3px 8px; border-radius:12px; font-size:0.72rem; font-weight:700;">Chưa thi</span>';
    let borderCol = 'var(--app-card-border, #E2E8F0)';

    if (h) {
      if (h.passed) {
        badgeHtml = '<span style="background:rgba(16,185,129,0.15); color:#10B981; border:1px solid rgba(16,185,129,0.35); padding:3px 8px; border-radius:12px; font-size:0.72rem; font-weight:800;">ĐÃ ĐẠT: ' + h.score + '/25</span>';
        borderCol = 'rgba(16,185,129,0.4)';
      } else {
        badgeHtml = '<span style="background:rgba(239,68,68,0.15); color:#EF4444; border:1px solid rgba(239,68,68,0.35); padding:3px 8px; border-radius:12px; font-size:0.72rem; font-weight:800;">CHƯA ĐẠT: ' + h.score + '/25</span>';
        borderCol = 'rgba(239,68,68,0.4)';
      }
    }

    html += `
      <div class="promax-card" style="border:1.5px solid ${borderCol} !important; padding:18px; display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <span style="font-weight:900; font-size:1.15rem; color:var(--app-text-primary, #0F172A);">Đề Số ${numStr}</span>
            ${badgeHtml}
          </div>
          <p style="font-size:0.78rem; color:var(--app-text-muted, #64748B); margin-bottom:16px; line-height:1.4;">25 câu hỏi • 19 phút<br>Chuẩn cấu trúc thi thật Cục Đường Bộ</p>
        </div>
        <div style="display:flex; gap:8px; width:100%; margin-top:auto;">
          <button type="button" onclick="startFixedExamA1(${s}, 'learning')" style="flex:1; background:rgba(56,189,248,0.1); color:#38BDF8; border:1.5px solid rgba(56,189,248,0.35); padding:9px 8px; border-radius:8px; font-weight:700; font-size:0.84rem; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:4px; transition:all 0.15s;" onmouseenter="this.style.background='rgba(56,189,248,0.2)'" onmouseleave="this.style.background='rgba(56,189,248,0.1)'">
            📖 Học
          </button>
          <button type="button" onclick="startFixedExamA1(${s}, 'exam')" style="flex:1; background:#2563EB; color:#FFF; border:none; padding:9px 8px; border-radius:8px; font-weight:700; font-size:0.84rem; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:4px; transition:all 0.15s; box-shadow:0 4px 12px rgba(37,99,235,0.35);" onmouseenter="this.style.background='#1D4ED8'" onmouseleave="this.style.background='#2563EB'">
            ✍️ Thi
          </button>
        </div>
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
  if (rankKey === 'meo-a1') return; // meo-a1 sở hữu giao diện bài viết chuyên sâu độc quyền
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
// =========================================================================
// 5. HIỂN THỊ 60 CÂU ĐIỂM LIỆT Ô TÔ (HẠNG B, C) (PROMAX UI/UX EDITION)
// =========================================================================
function renderCar60Paralyzed(keyword = '') {
  const container = document.getElementById('paralyzedCar60List');
  if (!container) return;

  const list = DRIVING_DATA_2026.carParalyzed60 || [];
  let filtered = list;

  if (keyword && keyword.trim()) {
    const kw = keyword.toLowerCase().trim();
    filtered = list.filter(q => 
      q.question.toLowerCase().includes(kw) || 
      (q.explain && q.explain.toLowerCase().includes(kw)) ||
      q.options.some(opt => opt.toLowerCase().includes(kw)) ||
      String(q.id).includes(kw)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="background:#FFF; border:1.5px solid #E2E8F0; border-radius:18px; padding:48px 24px; text-align:center; box-shadow:0 4px 18px rgba(0,0,0,0.02);">
        <div style="font-size:3rem; margin-bottom:12px;">🔍</div>
        <h3 style="color:#0F172A; font-weight:800; font-size:1.18rem; margin-bottom:6px;">Không tìm thấy câu điểm liệt ô tô phù hợp</h3>
        <p style="color:#64748B; font-size:0.92rem; margin-bottom:18px;">Vui lòng thử tìm kiếm bằng từ khóa khác như "cao tốc", "lùi xe", "dốc", "cồn", "đường ray"...</p>
      </div>
    `;
    return;
  }

  function highlightDangerKeywords(text, kw) {
    if (!text) return '';
    const safeText = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const dangerWords = [
      'bị nghiêm cấm', 'nghiêm cấm', 'không được phép', 'không được mang vác', 
      'không được quay đầu', 'không được vượt', 'không được lùi', 'không được đi',
      'không được', 'phải giảm tốc độ', 'nhường đường'
    ];
    
    let res = safeText;
    dangerWords.forEach(w => {
      const reg = new RegExp(`(${w})`, 'gi');
      res = res.replace(reg, '<span style="background:#FEE2E2; color:#B91C1C; font-weight:800; padding:1px 6px; border-radius:4px; border:1px solid #FECACA;">$1</span>');
    });

    if (kw && kw.trim().length > 1) {
      const cleanKw = kw.trim().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      const kwReg = new RegExp(`(${cleanKw})`, 'gi');
      res = res.replace(kwReg, '<mark style="background:#FEF08A; color:#854D0E; padding:1px 4px; border-radius:3px; font-weight:800;">$1</mark>');
    }
    return res;
  }

  const countBadge = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; font-size:0.9rem; color:#64748B;">
      <span>Đang hiển thị <b style="color:#0F172A;">${filtered.length} / ${list.length} câu điểm liệt ô tô</b></span>
      <span style="display:inline-flex; align-items:center; gap:6px; color:#DC2626; font-weight:800;">
        <span style="width:8px; height:8px; background:#DC2626; border-radius:50%; display:inline-block; box-shadow:0 0 0 3px rgba(220,38,38,0.2);"></span>
        Sai 1 câu là rớt ô tô ngay
      </span>
    </div>
  `;

  const cardsHtml = filtered.map((q, idx) => {
    const originalIndex = list.findIndex(item => item.id === q.id);
    const orderNum = (originalIndex >= 0 ? originalIndex + 1 : idx + 1);

    const optionsHtml = q.options.map((opt, oIdx) => {
      const cleanOpt = opt.replace(/^(\d+[\.\)]\s*)+/, '');
      const isCorrect = (oIdx + 1 === q.answer);
      if (isCorrect) {
        return `
          <div style="background:linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%); border:2px solid #10B981; border-radius:12px; padding:14px 18px; display:flex; align-items:flex-start; gap:14px; box-shadow:0 4px 14px rgba(16,185,129,0.12); transition:all 0.2s;">
            <div style="width:32px; height:32px; border-radius:50%; background:#10B981; color:#FFF; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:1rem; flex-shrink:0; box-shadow:0 2px 6px rgba(16,185,129,0.35);">✓</div>
            <div style="flex:1;">
              <div style="font-size:0.98rem; color:#064E3B; font-weight:750; line-height:1.6;">
                <span style="color:#059669; font-weight:900; margin-right:6px;">${oIdx + 1}.</span> ${highlightDangerKeywords(cleanOpt, keyword)}
              </div>
            </div>
            <span style="background:#10B981; color:#FFF; font-size:0.75rem; font-weight:800; padding:5px 12px; border-radius:20px; white-space:nowrap; letter-spacing:0.04em; display:inline-flex; align-items:center; gap:4px; box-shadow:0 2px 6px rgba(16,185,129,0.25);">
              <span>✔</span> ĐÁP ÁN ĐÚNG
            </span>
          </div>
        `;
      } else {
        return `
          <div style="background:#FFFFFF; border:1.5px solid #CBD5E1; border-radius:12px; padding:14px 18px; display:flex; align-items:flex-start; gap:14px; box-shadow:0 2px 6px rgba(15,23,42,0.04); transition:all 0.15s;" onmouseenter="this.style.background='#F8FAFC'; this.style.borderColor='#94A3B8';" onmouseleave="this.style.background='#FFFFFF'; this.style.borderColor='#CBD5E1';">
            <div style="width:32px; height:32px; border-radius:50%; background:#F1F5F9; border:1.5px solid #CBD5E1; color:#0F172A; display:flex; align-items:center; justify-content:center; font-weight:850; font-size:0.92rem; flex-shrink:0;">${oIdx + 1}</div>
            <div style="flex:1; font-size:0.96rem; color:#0F172A; font-weight:600; line-height:1.6;">
              ${highlightDangerKeywords(cleanOpt, keyword)}
            </div>
          </div>
        `;
      }
    }).join('');

    return `
      <div class="promax-paralyzed-card" style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:18px; padding:24px 28px 24px 32px; margin-bottom:22px; box-shadow:0 4px 20px -2px rgba(15,23,42,0.04), 0 2px 6px -1px rgba(15,23,42,0.02); position:relative; overflow:hidden; transition:all 0.25s cubic-bezier(0.16, 1, 0.3, 1);" onmouseenter="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 12px 30px -4px rgba(220,38,38,0.08), 0 4px 12px rgba(0,0,0,0.03)';" onmouseleave="this.style.transform='none'; this.style.boxShadow='0 4px 20px -2px rgba(15,23,42,0.04), 0 2px 6px -1px rgba(15,23,42,0.02)';">
        
        <!-- Dải sọc cảnh báo ProMax đỏ son bên trái -->
        <div style="position:absolute; left:0; top:0; bottom:0; width:5px; background:linear-gradient(180deg, #EF4444 0%, #DC2626 100%);"></div>

        <!-- Hàng thông tin thẻ trên cùng -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px;">
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <span style="background:#0F172A; color:#FFF; font-weight:900; font-size:0.82rem; padding:4px 12px; border-radius:20px; letter-spacing:0.03em;">
              CÂU #${orderNum < 10 ? '0' + orderNum : orderNum} / 60
            </span>
            <span style="background:#F1F5F9; color:#475569; font-weight:700; font-size:0.78rem; padding:4px 10px; border-radius:8px;">
              Mã đề: Câu ${q.id}
            </span>
            <span style="background:#FEF3C7; color:#B45309; font-weight:700; font-size:0.78rem; padding:4px 10px; border-radius:8px;">
              Hạng B &amp; C
            </span>
          </div>

          <div style="display:flex; align-items:center; gap:8px;">
            <button type="button" onclick="playQuestionSpeech('${q.id}')" style="background:#F8FAFC; border:1px solid #CBD5E1; color:#334155; padding:5px 12px; border-radius:8px; font-size:0.78rem; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:5px; transition:all 0.15s;" onmouseenter="this.style.background='#EFF6FF'; this.style.borderColor='#93C5FD';" onmouseleave="this.style.background='#F8FAFC'; this.style.borderColor='#CBD5E1';" title="Nghe giọng đọc AI">
              🔊 Đọc câu hỏi
            </button>
            <span style="display:inline-flex; align-items:center; gap:7px; background:#FEF2F2; color:#DC2626; border:1.5px solid #FECACA; padding:4px 12px; border-radius:30px; font-size:0.75rem; font-weight:800; letter-spacing:0.04em;">
              <span style="width:7px; height:7px; background:#DC2626; border-radius:50%; display:inline-block; box-shadow:0 0 0 3px rgba(220,38,38,0.25);"></span>
              SAI LÀ RỚT Ô TÔ
            </span>
          </div>
        </div>

        <!-- Tiêu đề câu hỏi -->
        <h3 style="font-size:1.15rem; font-weight:800; color:#0F172A; line-height:1.6; margin:0 0 16px;">
          ${highlightDangerKeywords(q.question, keyword)}
        </h3>

        <!-- Danh sách các lựa chọn đáp án -->
        <div style="display:flex; flex-direction:column; gap:9px; margin-bottom:16px;">
          ${optionsHtml}
        </div>

        <!-- Hộp mẹo ghi nhớ vàng & Căn cứ luật (ProMax Insight Box) -->
        <div style="background:linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%); border:1.5px solid #FDE68A; border-radius:12px; padding:14px 18px; box-shadow:0 2px 8px rgba(217,119,6,0.05);">
          <div style="display:flex; align-items:center; gap:8px; color:#92400E; font-size:0.8rem; font-weight:800; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:6px;">
            <span style="font-size:1.1rem;">💡</span> MẸO GHI NHỚ &amp; CĂN CỨ PHÁP LÝ:
          </div>
          <div style="color:#78350F; font-size:0.92rem; line-height:1.6; font-weight:500;">
            ${highlightDangerKeywords(q.explain || 'Bắt buộc tuân thủ đúng quy tắc an toàn giao thông đường bộ.', keyword)}
          </div>
        </div>

      </div>
    `;
  }).join('');

  container.innerHTML = countBadge + cardsHtml;
}



// =========================================================================
// 6. CẬP NHẬT TIẾN ĐỘ HỌC TẬP (LOCALSTORAGE DASHBOARD)
// =========================================================================
function updateLearningDashboard() {
  const history = getExamHistory();
  const allQs = DRIVING_DATA_2026.examA1Questions || [];
  let masteredIds = [];
  try {
    masteredIds = JSON.parse(localStorage.getItem('nb_mastered_question_ids') || '[]');
  } catch(e) {
    masteredIds = [];
  }

  let totalExams = Object.keys(history).length;
  let passedExams = Object.values(history).filter(h => h.passed).length;
  let passRate = totalExams > 0 ? Math.round((passedExams / totalExams) * 100) : 0;

  // Đếm câu duy nhất đã trả lời đúng thực tế thay vì công thức nhân ước tính
  let masteredCount = Math.min(allQs.length || 250, masteredIds.length);
  if (totalExams === 0 && masteredIds.length === 0) masteredCount = 0;

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
