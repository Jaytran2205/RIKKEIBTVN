/**
 * Comprehensive Automated Test Suite for Student Grading Engine
 * Tests all subjects and rejection scenarios
 */
const fs = require('fs');
const path = require('path');

// Mock browser globals for Node.js
global.window = {
  location: {
    origin: 'http://127.0.0.1:3000',
    pathname: '/index.html'
  }
};
global.localStorage = {
  store: {},
  getItem(k) { return this.store[k] || null; },
  setItem(k, v) { this.store[k] = String(v); },
  removeItem(k) { delete this.store[k]; },
  clear() { this.store = {}; }
};
global.document = {
  getElementById(id) { return null; },
  querySelectorAll() { return []; }
};

// Load engine
const engineCode = fs.readFileSync(path.join(__dirname, '../student-grading-engine.js'), 'utf8');
eval(engineCode);
const StudentGradingEngine = window.StudentGradingEngine || global.StudentGradingEngine;

async function runTests() {
  console.log('=== BẮT ĐẦU CHẠY THỬ TOÀN DIỆN CÁC TÍNH NĂNG CHẤM ĐIỂM AI ===\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition, message) {
    totalTests++;
    if (condition) {
      console.log(`  ✅ [PASS] ${message}`);
      passedTests++;
    } else {
      console.error(`  ❌ [FAIL] ${message}`);
    }
  }

  const exams = StudentGradingEngine.getExams();
  const examVan = exams.find(e => e.id === 'EXAM-VAN-01');
  const examEng = exams.find(e => e.id === 'EXAM-ENG-01');
  const examToan = exams.find(e => e.id === 'EXAM-TOAN-01');
  const examOpen = exams.find(e => e.id === 'EXAM-OPEN-VAN');

  const student = { code: 'HS01', name: 'Nguyễn Văn An', class: '12A1' };

  // Helper canvas mocks
  function createSceneryCanvas() {
    return {
      width: 400,
      height: 300,
      getContext(type) {
        return {
          getImageData(x, y, w, h) {
            const data = new Uint8ClampedArray(w * h * 4);
            // Saturated outdoor scene (blue sky and green trees)
            for (let i = 0; i < data.length; i += 4) {
              data[i] = 40;      // R
              data[i + 1] = 160; // G (high sat green)
              data[i + 2] = 220; // B (sky blue)
              data[i + 3] = 255;
            }
            return { data };
          }
        };
      }
    };
  }

  function createLogoCanvas() {
    return {
      width: 500,
      height: 300,
      getContext(type) {
        return {
          getImageData(x, y, w, h) {
            const data = new Uint8ClampedArray(w * h * 4);
            // White background with small logo
            for (let i = 0; i < data.length; i += 4) {
              data[i] = 250;
              data[i + 1] = 250;
              data[i + 2] = 250;
              data[i + 3] = 255;
            }
            // Small logo mark in center (dark purple/red)
            for (let i = Math.floor(data.length * 0.45); i < Math.floor(data.length * 0.50); i += 4) {
              data[i] = 60;
              data[i + 1] = 20;
              data[i + 2] = 80;
            }
            return { data };
          }
        };
      }
    };
  }

  function createExamPaperCanvas() {
    return {
      width: 600,
      height: 800,
      getContext(type) {
        return {
          getImageData(x, y, w, h) {
            const data = new Uint8ClampedArray(w * h * 4);
            // Crisp white paper background
            for (let i = 0; i < data.length; i += 4) {
              data[i] = 245;
              data[i + 1] = 245;
              data[i + 2] = 245;
              data[i + 3] = 255;
            }
            // Handwritten lines (approx 2% dark ink)
            for (let i = 0; i < data.length; i += 160) {
              data[i] = 20;
              data[i + 1] = 20;
              data[i + 2] = 30;
            }
            return { data };
          }
        };
      }
    };
  }

  // TEST 1: Chặn ảnh ngoại cảnh / phong cảnh
  console.log('--- TEST 1: Kiểm định quang học ảnh phong cảnh / ngoại cảnh ---');
  const sceneryCanvas = createSceneryCanvas();
  const res1 = await StudentGradingEngine.gradeStudentSubmission(examVan, student, 'data:image/jpeg;base64,mock', '', sceneryCanvas);
  assert(res1.isInvalidPhoto === true, 'Ảnh phong cảnh bị phát hiện không hợp lệ (isInvalidPhoto = true)');
  assert(res1.score === 0, 'Ảnh phong cảnh bị chấm 0 điểm');
  assert(res1.gradeLevel.includes('Không Hợp Lệ'), 'Xếp loại: Không Hợp Lệ (0 Điểm)');

  // TEST 2: Chặn Logo thương hiệu "XTÉCO BUILD BEYOND STANDARDS" (User Test Case)
  console.log('\n--- TEST 2: Chặn ảnh Logo / Slogan thương hiệu (XTÉCO) ---');
  const logoCanvas = createLogoCanvas();
  const ocrLogo = {
    success: true,
    text: 'XTÉCO BUILD BEYOND STANDARDS',
    wordCount: 4
  };

  const res2 = await StudentGradingEngine.gradeStudentSubmission(examEng, student, 'data:image/jpeg;base64,mock', '', logoCanvas, ocrLogo);
  assert(res2.isInvalidPhoto === true, 'Logo XTÉCO bị phát hiện là biểu trưng thương hiệu (isInvalidPhoto = true)');
  assert(res2.score === 0, 'Logo XTÉCO bị chấm 0 điểm tuyệt đối');
  assert(res2.rejectionReason.includes('logo') || res2.feedback.includes('LOGO'), 'Thông báo từ chối nêu rõ nguyên nhân logo thương hiệu');

  // TEST 3: Bài thi Tự luận Ngữ Văn Hợp Lệ (200 từ chuẩn chủ đề)
  console.log('\n--- TEST 3: Chấm bài Tự luận Ngữ Văn đạt chuẩn ---');
  const paperCanvas = createExamPaperCanvas();
  const ocrVan = {
    success: true,
    text: `Ý chí và nghị lực là ngọn đuốc soi đường cho con người vượt qua mọi nghịch cảnh trong cuộc sống. Trong xã hội hiện đại, đứng trước những khó khăn và thử thách, nếu không có lòng kiên trì và tinh thần vượt khó, chúng ta sẽ rất dễ rơi vào thất bại và gục ngã. Thầy cô và cha mẹ luôn dạy dỗ chúng ta bài học về sự nỗ lực vươn lên. Một người có ý chí nghị lực sẽ luôn biết biến nghịch cảnh thành bàn đạp để trưởng thành và đạt đến thành công. Ngược lại, những kẻ sống ỷ lại, thiếu rèn luyện sẽ tự đánh mất tương lai tươi sáng của chính mình. Vì vậy, mỗi học sinh chúng ta cần không ngừng trau dồi tri thức, tôi luyện ý chí và hành động cụ thể để xây dựng quê hương Ninh Bình ngày càng phát triển.`,
    wordCount: 145
  };

  const res3 = await StudentGradingEngine.gradeStudentSubmission(examVan, student, 'data:image/jpeg;base64,mock', '', paperCanvas, ocrVan);
  assert(res3.isInvalidPhoto === false, 'Bài thi Ngữ Văn hợp lệ không bị từ chối');
  assert(res3.score >= 7.5 && res3.score <= 9.5, `Điểm bài Văn đạt mức khá/giỏi: ${res3.score}/10`);
  assert(res3.rubricScores && res3.rubricScores.length === 4, 'Có đủ 4 tiêu chí barem chấm điểm chi tiết');
  assert(res3.feedback.includes('hoàn chỉnh') || res3.feedback.includes('mạch lạc'), 'Có nhận xét sư phạm chi tiết');

  // TEST 4: Bài thi Tiếng Anh Hỗn Hợp (Mixed: MCQ 10 câu + Essay 130 từ)
  console.log('\n--- TEST 4: Chấm bài Tiếng Anh kết hợp (Trắc nghiệm + Tự luận) ---');
  const ocrEng = {
    success: true,
    text: `Artificial intelligence (AI) has become an indispensable learning tool for high school students in modern classrooms. Firstly, AI provides personalized learning experiences, allowing students to study at their own pace and review difficult concepts easily. Furthermore, automated grammar checkers and smart apps help teenagers improve their English writing skills effectively. However, students should not rely entirely on AI to do homework, as critical thinking remains essential. In conclusion, using AI responsibly will prepare students well for the future digital era.`,
    wordCount: 82
  };

  const res4 = await StudentGradingEngine.gradeStudentSubmission(examEng, student, 'data:image/jpeg;base64,mock', '', paperCanvas, ocrEng);
  assert(res4.isInvalidPhoto === false, 'Bài thi Tiếng Anh hợp lệ');
  assert(res4.details && res4.details.length === 10, 'Có kết quả chi tiết 10 câu trắc nghiệm');
  assert(res4.rubricScores && res4.rubricScores.length > 0, 'Có barem đánh giá bài viết luận');
  assert(res4.score >= 5.0 && res4.score <= 10.0, `Tổng điểm hỗn hợp hợp lý: ${res4.score}/10`);

  // TEST 5: Bài thi Trắc nghiệm Toán 12 (20 câu OMR)
  console.log('\n--- TEST 5: Chấm bài Trắc nghiệm Toán 12 (20 câu) ---');
  const ocrToan = {
    success: true,
    text: '1A 2B 3D 4C 5A 6C 7B 8D 9A 10A 11B 12C 13D 14A 15B 16C 17A 18D 19B 20C',
    wordCount: 20
  };

  const res5 = await StudentGradingEngine.gradeStudentSubmission(examToan, student, 'data:image/jpeg;base64,mock', '', paperCanvas, ocrToan);
  assert(res5.isInvalidPhoto === false, 'Phiếu trắc nghiệm Toán hợp lệ');
  assert(res5.details && res5.details.length === 20, 'Đầy đủ 20 câu trắc nghiệm');
  assert(res5.correctCount >= 14, `Số câu đúng cao (${res5.correctCount}/20)`);
  assert(res5.score >= 7.0, `Điểm số trắc nghiệm tương ứng: ${res5.score}/10`);

  // TEST 6: Bài thi Tự luận Lạc Đề (Off-topic)
  console.log('\n--- TEST 6: Phát hiện bài thi lạc đề ---');
  const ocrOffTopic = {
    success: true,
    text: `Hôm nay trời rất đẹp tôi đi câu cá ở bờ sông cùng với bạn bè. Sau đó chúng tôi vào bếp nấu món cá kho tộ rất thơm ngon và ăn cùng cơm nóng. Buổi chiều chúng tôi đi đá bóng và đá cầu ngoài công viên rất vui vẻ thoải mái.`,
    wordCount: 50
  };

  const res6 = await StudentGradingEngine.gradeStudentSubmission(examVan, student, 'data:image/jpeg;base64,mock', '', paperCanvas, ocrOffTopic);
  assert(res6.score <= 2.0, `Bài lạc đề bị trừ điểm nặng (Điểm: ${res6.score}/10)`);
  assert(res6.feedback.includes('LẠC ĐỀ'), 'Có cảnh báo lạc đề trong lời nhận xét');

  // TEST 7: Đường link cá nhân hóa & Danh sách lớp
  console.log('\n--- TEST 7: Sinh đường link cá nhân hóa & Nạp danh sách học sinh ---');
  const link = StudentGradingEngine.generateStudentLink('EXAM-VAN-01', 'HS99', 'Trần Thị Thảo');
  assert(link.includes('exam=EXAM-VAN-01') && link.includes('student=HS99'), 'Đường link cá nhân chuẩn xác');

  const importResult = StudentGradingEngine.importStudentsFromText(`
    HS101 - Lê Văn Cường - 12A2 - 0988111222
    HS102 - Vũ Thùy Dung - 12A2 - 0988333444
  `);
  assert(importResult.count === 2, `Nạp thành công ${importResult.count} học sinh vào hệ thống`);

  // TEST 8: Parse chuỗi đáp án trắc nghiệm OMR ("Nạp vào")
  console.log('\n--- TEST 8: Kiểm tra tính năng nạp nhanh đáp án trắc nghiệm ---');
  const key1 = StudentGradingEngine.parseAnswerKeyString('1A 2B 3C 4D 5A');
  assert(key1 && key1.length === 5 && key1[0] === 'A' && key1[4] === 'A', 'Parse chuỗi "1A 2B 3C 4D 5A" chính xác');
  const key2 = StudentGradingEngine.parseAnswerKeyString('ABCDABCD');
  assert(key2 && key2.length === 8 && key2[0] === 'A' && key2[3] === 'D', 'Parse chuỗi liền "ABCDABCD" chính xác');

  // TEST 9: AI Config Provider switching & storage
  console.log('\n--- TEST 9: Kiểm tra cấu hình và chuyển đổi nhà cung cấp AI ---');
  const initialConfig = StudentGradingEngine.getAiConfig();
  assert(initialConfig && initialConfig.provider, 'Cấu hình AI mặc định hợp lệ');
  StudentGradingEngine.saveAiConfig({ ...initialConfig, provider: 'groq', groqKey: 'gsk_test123' });
  const updatedConfig = StudentGradingEngine.getAiConfig();
  assert(updatedConfig.provider === 'groq' && updatedConfig.groqKey === 'gsk_test123', 'Lưu và nạp cấu hình Groq AI thành công');

  console.log(`\n==============================================`);
  console.log(`KẾT QUẢ KIỂM THỬ: ${passedTests}/${totalTests} TESTS PASSED (${Math.round(passedTests/totalTests*100)}%)`);
  console.log(`==============================================\n`);
}

runTests().catch(console.error);
