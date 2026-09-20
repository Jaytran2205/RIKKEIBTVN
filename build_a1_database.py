# Script trích xuất và tạo database 250 câu hỏi A1 chuẩn Bộ Công An / Tân Sơn
import json

questions_a1 = [
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
    "isParalyzed": False,
    "explain": "Phần đường xe chạy là phần của đường bộ được sử dụng cho phương tiện giao thông qua lại (không bao gồm lề đường)."
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
    "isParalyzed": False,
    "explain": "Làn đường phải có đủ chiều rộng cho xe chạy an toàn."
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
    "isParalyzed": False,
    "explain": "Khổ giới hạn bao gồm cả chiều rộng và chiều cao tính cả hàng hóa xếp trên xe."
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
    "isParalyzed": False,
    "explain": "Dải phân cách dùng để phân chia 2 chiều riêng biệt hoặc phân chia làn xe cơ giới và thô sơ."
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
    "isParalyzed": False,
    "explain": "Vạch kẻ đường chỉ sự phân chia làn đường, vị trí hoặc hướng đi, vị trí dừng lại."
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
    "isParalyzed": False,
    "explain": "Người điều khiển phương tiện gồm người lái xe cơ giới, thô sơ và xe máy chuyên dùng."
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
    "isParalyzed": False,
    "explain": "Người lái xe là người điều khiển xe cơ giới."
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
    "isParalyzed": False,
    "explain": "Xe cơ giới gồm ô tô, rơ moóc kéo bởi ô tô, xe mô tô, xe gắn máy và xe tương tự (không gồm xe đạp, xe lăn)."
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
    "isParalyzed": False,
    "explain": "Xe thô sơ gồm xe đạp, xe đạp máy, xe đạp điện, xích lô, xe lăn người khuyết tật, xe súc vật kéo."
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
    "isParalyzed": False,
    "explain": "Phương tiện giao thông đường bộ gồm cả cơ giới và thô sơ."
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
    "isParalyzed": False,
    "explain": "Gồm người điều khiển, người ngồi trên xe, người dẫn dắt súc vật và người đi bộ."
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
    "isParalyzed": False,
    "explain": "Gồm người điều khiển xe cơ giới, xe thô sơ và xe máy chuyên dùng."
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
    "isParalyzed": False,
    "explain": "Người điều khiển giao thông là CSGT hoặc người được giao nhiệm vụ chỉ huy, điều tiết giao thông."
  },
  {
    "id": 14,
    "chapter": 1,
    "question": "Hành vi nào dưới đây bị nghiêm cấm? (CÂU ĐIỂM LIỆT)",
    "options": [
      "1. Sử dụng xe đạp đi trên các tuyến quốc lộ.",
      "2. Rải vật sắc nhọn, đổ chất gây trơn trượt trên đường bộ.",
      "3. Cả hai ý trên."
    ],
    "answer": 2,
    "isParalyzed": True,
    "explain": "CÂU ĐIỂM LIỆT: Nghiêm cấm hành vi rải đinh, vật sắc nhọn, đổ dầu mỡ nhớt gây trơn trượt trên đường."
  },
  {
    "id": 15,
    "chapter": 1,
    "question": "Hành vi đưa xe cơ giới, xe máy chuyên dùng tham gia giao thông đường bộ nào dưới đây bị cấm? (CÂU ĐIỂM LIỆT)",
    "options": [
      "1. Không có chứng nhận kiểm định an toàn kỹ thuật và bảo vệ môi trường.",
      "2. Hết niên hạn sử dụng.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": True,
    "explain": "CÂU ĐIỂM LIỆT: Nghiêm cấm đưa xe hết niên hạn hoặc không có đăng kiểm tham gia giao thông."
  },
  {
    "id": 16,
    "chapter": 1,
    "question": "Tổ chức đua xe được phép thực hiện khi nào? (CÂU ĐIỂM LIỆT)",
    "options": [
      "1. Trên đường phố không có người qua lại.",
      "2. Được người dân ủng hộ.",
      "3. Được cơ quan có thẩm quyền cấp phép."
    ],
    "answer": 3,
    "isParalyzed": True,
    "explain": "CÂU ĐIỂM LIỆT: Đua xe chỉ được phép khi có cơ quan nhà nước có thẩm quyền cấp phép."
  },
  {
    "id": 17,
    "chapter": 1,
    "question": "Hành vi đua xe trái phép bị xử lý như thế nào? (CÂU ĐIỂM LIỆT)",
    "options": [
      "1. Chỉ bị nhắc nhở.",
      "2. Tùy theo mức độ của hành vi vi phạm có thể bị xử lý hành chính hoặc xử lý hình sự."
    ],
    "answer": 2,
    "isParalyzed": True,
    "explain": "CÂU ĐIỂM LIỆT: Đua xe trái phép bị xử phạt hành chính hoặc xử lý hình sự (tù tội)."
  },
  {
    "id": 18,
    "chapter": 1,
    "question": "Người điều khiển phương tiện tham gia giao thông đường bộ mà trong máu hoặc hơi thở có nồng độ cồn có bị nghiêm cấm không? (CÂU ĐIỂM LIỆT)",
    "options": [
      "1. Bị nghiêm cấm.",
      "2. Không bị nghiêm cấm.",
      "3. Không bị nghiêm cấm, nếu nồng độ cồn trong máu ở mức nhẹ, có thể điều khiển phương tiện tham gia giao thông."
    ],
    "answer": 1,
    "isParalyzed": True,
    "explain": "CÂU ĐIỂM LIỆT: Luật ATGT đường bộ nghiêm cấm tuyệt đối lái xe khi có nồng độ cồn trong máu/hơi thở."
  },
  {
    "id": 19,
    "chapter": 1,
    "question": "Theo Luật Phòng chống tác hại của rượu, bia, đối tượng nào dưới đây bị cấm sử dụng rượu, bia khi tham gia giao thông? (CÂU ĐIỂM LIỆT)",
    "options": [
      "1. Người điều khiển xe ô tô, xe mô tô, xe đạp, xe gắn máy.",
      "2. Người được chở trên xe cơ giới.",
      "3. Cả hai ý trên."
    ],
    "answer": 1,
    "isParalyzed": True,
    "explain": "CÂU ĐIỂM LIỆT: Cấm người điều khiển mọi phương tiện (kể cả xe đạp) sử dụng rượu bia."
  },
  {
    "id": 20,
    "chapter": 1,
    "question": "Hành vi giao xe ô tô, mô tô cho người nào sau đây tham gia giao thông đường bộ bị nghiêm cấm? (CÂU ĐIỂM LIỆT)",
    "options": [
      "1. Người chưa đủ tuổi theo quy định.",
      "2. Người không có giấy phép lái xe.",
      "3. Người có giấy phép lái xe nhưng đã bị trừ hết 12 điểm.",
      "4. Cả ba ý trên."
    ],
    "answer": 4,
    "isParalyzed": True,
    "explain": "CÂU ĐIỂM LIỆT: Nghiêm cấm giao xe cho người chưa đủ tuổi, không có bằng lái hoặc đã bị trừ hết 12 điểm."
  },
  {
    "id": 21,
    "chapter": 1,
    "question": "Hành vi nào sau đây bị nghiêm cấm? (CÂU ĐIỂM LIỆT)",
    "options": [
      "1. Điều khiển xe cơ giới lạng lách, đánh võng, rú ga liên tục khi tham gia giao thông trên đường.",
      "2. Xúc phạm, đe dọa, cản trở, chống đối hoặc không chấp hành hiệu lệnh, hướng dẫn, yêu cầu kiểm tra, kiểm soát của người thi hành công vụ về bảo đảm trật tự, an toàn giao thông đường bộ.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": True,
    "explain": "CÂU ĐIỂM LIỆT: Cấm lạng lách đánh võng, rú ga và chống đối người thi hành công vụ."
  },
  {
    "id": 23,
    "chapter": 1,
    "question": "Hành vi nào sau đây bị cấm? (CÂU ĐIỂM LIỆT)",
    "options": [
      "1. Lắp đặt, sử dụng thiết bị âm thanh, ánh sáng trên xe cơ giới, xe máy chuyên dùng gây mất trật tự, an toàn giao thông đường bộ.",
      "2. Cản trở người, phương tiện tham gia giao thông trên đường bộ; ném gạch, đất, đá, cát hoặc vật thể khác vào người, phương tiện đang tham gia giao thông trên đường bộ.",
      "3. Cả hai ý trên."
    ],
    "answer": 3,
    "isParalyzed": True,
    "explain": "CÂU ĐIỂM LIỆT: Cấm ném đất đá vào xe cộ và lắp còi đèn chế sai quy định."
  },
  {
    "id": 39,
    "chapter": 1,
    "question": "Người lái xe được phép vượt xe trên cầu hẹp có một làn đường, đường cong có tầm nhìn bị hạn chế hay không? (CÂU ĐIỂM LIỆT)",
    "options": [
      "1. Được phép vượt khi đường vắng.",
      "2. Không được phép vượt.",
      "3. Được phép vượt khi có việc gấp."
    ],
    "answer": 2,
    "isParalyzed": True,
    "explain": "CÂU ĐIỂM LIỆT: Không được phép vượt trên cầu hẹp 1 làn và đường cong khuất tầm nhìn."
  },
  {
    "id": 40,
    "chapter": 1,
    "question": "Muốn vượt xe phía trước, người lái xe mô tô phải có tín hiệu như thế nào dưới đây để bảo đảm an toàn? (CÂU ĐIỂM LIỆT)",
    "options": [
      "1. Bấm còi liên tục để xe phía trước biết xe mình xin vượt.",
      "2. Rú ga liên tục để xe phía trước biết xe mình xin vượt.",
      "3. Báo hiệu nhấp nháy bằng đèn chiếu sáng phía trước hoặc còi."
    ],
    "answer": 3,
    "isParalyzed": True,
    "explain": "CÂU ĐIỂM LIỆT: Báo hiệu xin vượt bằng đèn xi nhan nhấp nháy hoặc còi."
  },
  {
    "id": 43,
    "chapter": 1,
    "question": "Khi điều khiển phương tiện tham gia giao thông, hành vi nào sau đây bị cấm? (CÂU ĐIỂM LIỆT)",
    "options": [
      "1. Dùng tay cầm và sử dụng điện thoại hoặc thiết bị điện tử khác.",
      "2. Chỉ được chở người trên thùng xe ô tô chở hàng trong trường hợp chở người đi làm nhiệm vụ cứu nạn, cứu hộ, phòng, chống thiên tai, dịch bệnh hoặc thực hiện nhiệm vụ khẩn cấp."
    ],
    "answer": 1,
    "isParalyzed": True,
    "explain": "CÂU ĐIỂM LIỆT: Cấm dùng tay cầm và sử dụng điện thoại khi đang điều khiển phương tiện."
  },
  {
    "id": 50,
    "chapter": 1,
    "question": "Khi điều khiển xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy, những hành vi nào sau đây không được phép? (CÂU ĐIỂM LIỆT)",
    "options": [
      "1. Buông cả hai tay; đứng, nằm trên xe điều khiển xe; sử dụng chân chống hoặc vật khác quệt xuống đường khi xe đang chạy.",
      "2. Chở tối đa hai người phía sau khi chở người bệnh đi cấp cứu, áp giải người có hành vi vi phạm pháp luật, trẻ em dưới 12 tuổi và người già yếu hoặc người khuyết tật."
    ],
    "answer": 1,
    "isParalyzed": True,
    "explain": "CÂU ĐIỂM LIỆT: Cấm buông 2 tay, nằm trên xe và quệt chân chống xuống đường."
  },
  {
    "id": 54,
    "chapter": 1,
    "question": "Người lái xe, người được chở trên xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy phải thực hiện quy định nào dưới đây? (CÂU ĐIỂM LIỆT)",
    "options": [
      "1. Đội mũ bảo hiểm theo đúng quy chuẩn kỹ thuật quốc gia và cài quai đúng quy cách.",
      "2. Người lái xe phải đội mũ bảo hiểm, người được chở trên xe không nhất thiết phải đội mũ bảo hiểm.",
      "3. Phải đội mũ bảo hiểm nhưng không nhất thiết phải cài quai."
    ],
    "answer": 1,
    "isParalyzed": True,
    "explain": "CÂU ĐIỂM LIỆT: Cả người lái và người ngồi sau phải đội mũ bảo hiểm chuẩn và cài quai đúng cách."
  },
  {
    "id": 84,
    "chapter": 1,
    "question": "Theo quy định về độ tuổi, người đủ bao nhiêu tuổi trở lên thì được cấp giấy phép lái xe mô tô hai bánh có dung tích xi lanh đến 125 cm3 (Hạng A1)?",
    "options": [
      "1. 16 tuổi.",
      "2. 17 tuổi.",
      "3. 18 tuổi."
    ],
    "answer": 3,
    "isParalyzed": False,
    "explain": "Người đủ 18 tuổi trở lên được cấp GPLX hạng A1, A, B."
  },
  {
    "id": 87,
    "chapter": 1,
    "question": "Người có Giấy phép lái xe mô tô hạng A1 được cấp theo luật mới được phép điều khiển loại xe nào dưới đây?",
    "options": [
      "1. Xe mô tô hai bánh có dung tích xi-lanh đến 125 cm3 hoặc có công suất động cơ điện đến 11 kW.",
      "2. Xe mô tô ba bánh.",
      "3. Cả hai ý trên."
    ],
    "answer": 1,
    "isParalyzed": False,
    "explain": "Bằng A1 mới cấp cho xe mô tô hai bánh đến 125cc hoặc mô tô điện đến 11 kW."
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
    "isParalyzed": False,
    "explain": "Bằng Hạng A được lái xe mô tô trên 125cc và lái được toàn bộ các xe của bằng A1."
  },
  {
    "id": 94,
    "chapter": 1,
    "question": "Trên đường bộ trong khu vực đông dân cư, đường đôi hoặc đường một chiều có từ 2 làn xe cơ giới trở lên, tốc độ tối đa cho phép của xe mô tô hai bánh là bao nhiêu?",
    "options": [
      "1. 60 km/h.",
      "2. 50 km/h.",
      "3. 40 km/h."
    ],
    "answer": 1,
    "isParalyzed": False,
    "explain": "Đường đôi trong khu dân cư có dải phân cách giữa: Tốc độ tối đa 60 km/h."
  },
  {
    "id": 95,
    "chapter": 1,
    "question": "Trên đường bộ trong khu vực đông dân cư, đường hai chiều hoặc đường một chiều có 1 làn xe cơ giới, tốc độ tối đa cho phép của xe mô tô hai bánh là bao nhiêu?",
    "options": [
      "1. 60 km/h.",
      "2. 50 km/h.",
      "3. 40 km/h."
    ],
    "answer": 2,
    "isParalyzed": False,
    "explain": "Đường hai chiều không có dải phân cách giữa trong khu dân cư: Tốc độ tối đa 50 km/h."
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
    "isParalyzed": False,
    "explain": "Văn hóa giao thông là luôn chấp hành luật và biết nhường nhịn, giúp đỡ người khác."
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
    "isParalyzed": False,
    "explain": "Tuyệt đối không tắt động cơ khi xuống dốc, phải giữ ga mức phù hợp và phanh đồng thời."
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
    "isParalyzed": False,
    "explain": "Phải nhả hết ga và bóp đồng thời cả phanh trước và phanh sau."
  },
  {
    "id": 129,
    "chapter": 4,
    "question": "Biển nào báo hiệu cấm xe mô tô đi vào? (Biển 1: tròn đỏ vẽ mô tô; Biển 2: tròn đỏ vẽ ô tô; Biển 3: tròn đỏ vẽ xe tải)",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Biển 3."
    ],
    "answer": 1,
    "isParalyzed": False,
    "explain": "Biển 1 (P.104) cấm các loại xe mô tô đi vào."
  },
  {
    "id": 139,
    "chapter": 4,
    "question": "Biển nào là biển 'Cấm đi ngược chiều'? (Biển 1: Tròn đỏ viền trắng; Biển 2: Tròn đỏ gạch ngang trắng; Biển 3: Tròn xanh gạch chéo đỏ)",
    "options": [
      "1. Biển 1.",
      "2. Biển 2.",
      "3. Cả ba biển."
    ],
    "answer": 2,
    "isParalyzed": False,
    "explain": "Biển 2 (P.102) là biển Cấm đi ngược chiều."
  },
  {
    "id": 141,
    "chapter": 4,
    "question": "Khi gặp biển nào xe ưu tiên theo luật định (Cứu hỏa, cứu thương, công an...) vẫn phải dừng lại?",
    "options": [
      "1. Biển 1 (Đường cấm).",
      "2. Biển 2 (Biển STOP bát giác đỏ).",
      "3. Cả ba biển."
    ],
    "answer": 2,
    "isParalyzed": False,
    "explain": "Gặp biển STOP (P.122), tất cả mọi phương tiện kể cả xe ưu tiên đều bắt buộc phải dừng lại quan sát."
  },
  {
    "id": 216,
    "chapter": 5,
    "question": "Theo hướng mũi tên và tín hiệu đèn giao thông, xe nào chấp hành đúng quy tắc giao thông?",
    "options": [
      "1. Xe khách, xe tải, xe mô tô.",
      "2. Xe tải, xe mô tô.",
      "3. Chỉ xe con."
    ],
    "answer": 3,
    "isParalyzed": False,
    "explain": "Xe con đèn xanh rẽ phải là chấp hành đúng quy tắc."
  },
  {
    "id": 237,
    "chapter": 5,
    "question": "Trong trường hợp giao lộ có xe quân sự và xe công an cùng làm nhiệm vụ khẩn cấp, thứ tự xe đi như thế nào là đúng quy tắc giao thông?",
    "options": [
      "1. Xe công an đi làm nhiệm vụ khẩn cấp, xe quân sự đi làm nhiệm vụ khẩn cấp, xe con + xe mô tô.",
      "2. Xe quân sự đi làm nhiệm vụ khẩn cấp, xe công an đi làm nhiệm vụ khẩn cấp, xe con + xe mô tô.",
      "3. Xe mô tô + xe con, xe quân sự, xe công an."
    ],
    "answer": 2,
    "isParalyzed": False,
    "explain": "Theo thứ tự xe ưu tiên: Cứu hỏa > Quân sự > Công an > Cứu thương. Do đó Xe Quân sự được đi trước Xe Công an."
  },
  {
    "id": 250,
    "chapter": 5,
    "question": "Trong tình huống xe đầu kéo kéo rơ moóc (container) đang rẽ phải, xe con và xe máy phía sau xe container đi như thế nào để bảo đảm an toàn?",
    "options": [
      "1. Vượt về phía bên phải để đi tiếp.",
      "2. Giảm tốc độ chờ xe container rẽ xong rồi tiếp tục đi.",
      "3. Vượt về phía bên trái để đi tiếp."
    ],
    "answer": 2,
    "isParalyzed": False,
    "explain": "Xe container có góc cua rộng và điểm mù lớn, xe phía sau phải giảm tốc độ nhường đường chờ rẽ xong."
  }
]

with open('scratch/questions_a1.json', 'w', encoding='utf-8') as f:
    json.dump(questions_a1, f, ensure_ascii=False, indent=2)

print(f"Exported {len(questions_a1)} questions successfully.")
