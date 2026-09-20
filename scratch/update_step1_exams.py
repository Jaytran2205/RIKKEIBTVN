import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('student-grading-engine.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update DEFAULT_EXAMS with full exam paper contents
# Let's inspect where DEFAULT_EXAMS is defined
exams_start = content.find('  const DEFAULT_EXAMS = [')
exams_end = content.find('  ];\n\n  // Danh sách học sinh mẫu')

if exams_start == -1 or exams_end == -1:
    print("Cannot find DEFAULT_EXAMS boundaries!")
    sys.exit(1)

new_default_exams = '''  const DEFAULT_EXAMS = [
    {
      id: 'EXAM-VAN-01',
      title: 'Đề Đọc hiểu & Nghị luận xã hội: "Ý nghĩa của lòng biết ơn"',
      subject: 'van',
      subjectName: 'Ngữ Văn',
      grade: 'Lớp 12',
      duration: '45 phút',
      type: 'essay',
      totalPoints: 10,
      hasPredefinedKey: true,
      description: 'Phân tích đoạn trích và viết đoạn văn nghị luận xã hội khoảng 200 chữ về giá trị của lòng biết ơn trong cuộc sống hiện đại.',
      fullContentHtml: `
        <div style="background:#F1F5F9; border-left:4px solid #0F3D6E; padding:16px 20px; border-radius:6px; margin-bottom:20px; font-size:0.95rem; line-height:1.75;">
          <b>ĐỌC ĐOẠN TRÍCH SAU VÀ THỰC HIỆN CÁC YÊU CẦU:</b><br><br>
          <i>"Lòng biết ơn là một trong những cảm xúc cao quý và đẹp đẽ nhất làm nên giá trị đích thực của con người. Biết ơn không đơn thuần chỉ là lời nói 'cảm ơn' nơi đầu môi chót lưỡi, mà là sự thấu cảm sâu sắc trước những ân tình, sự hy sinh thầm lặng mà người khác đã dành cho mình. Khi biết ơn, trái tim con người mở rộng, xua tan sự ích kỷ, đố kỵ và nuôi dưỡng những hạt mầm lương thiện. Một người biết ơn cha mẹ sẽ sống hiếu thảo, thuận hòa; một công dân biết ơn tổ quốc sẽ sống có trách nhiệm và cống hiến; một học sinh biết ơn thầy cô sẽ nỗ lực trau dồi tri thức để ngày mai xây dựng tương lai. Ngược lại, người sống vô ơn, 'ăn cháo đá bát' sẽ dần tự cô lập mình trong ốc đảo lạnh lẽo của sự ích kỷ..."</i>
          <div style="text-align:right; font-style:normal; font-size:0.84rem; color:var(--muted); margin-top:8px;">
            (Trích <i>Bài học về nhân cách và cuộc sống</i>, NXB Giáo Dục Việt Nam)
          </div>
        </div>

        <div style="margin-bottom:20px;">
          <h4 style="color:#0F3D6E; font-size:1.05rem; margin-bottom:10px; border-bottom:1px dashed var(--border); padding-bottom:6px;">
            I. PHẦN ĐỌC HIỂU (4.0 điểm)
          </h4>
          <p style="margin-bottom:8px;"><b>Câu 1 (1.0 điểm):</b> Xác định phương thức biểu đạt chính của đoạn trích trên.</p>
          <p style="margin-bottom:8px;"><b>Câu 2 (1.0 điểm):</b> Theo tác giả, khi có lòng biết ơn thì trái tim con người sẽ có những thay đổi tích cực nào?</p>
          <p style="margin-bottom:8px;"><b>Câu 3 (1.0 điểm):</b> Anh/chị hiểu như thế nào về nhận định: <i>"Biết ơn không đơn thuần chỉ là lời nói cảm ơn nơi đầu môi chót lưỡi, mà là sự thấu cảm sâu sắc trước những ân tình..."</i>?</p>
          <p style="margin-bottom:8px;"><b>Câu 4 (1.0 điểm):</b> Từ đoạn trích, hãy rút ra một thông điệp có ý nghĩa sâu sắc nhất đối với bản thân anh/chị. Vì sao?</p>
        </div>

        <div>
          <h4 style="color:#0F3D6E; font-size:1.05rem; margin-bottom:10px; border-bottom:1px dashed var(--border); padding-bottom:6px;">
            II. PHẦN LÀM VĂN (6.0 điểm)
          </h4>
          <p style="margin-bottom:8px; line-height:1.65;">
            Từ nội dung đoạn trích phần Đọc hiểu, anh/chị hãy viết một <b>đoạn văn nghị luận xã hội (khoảng 200 chữ)</b> trình bày suy nghĩ của mình về: 
            <b style="color:#B45309;">"Ý nghĩa của lòng biết ơn đối với sự hoàn thiện nhân cách của thế hệ trẻ hôm nay."</b>
          </p>
        </div>
      `,
      rubric: [
        { criterion: 'Yêu cầu hình thức & cấu trúc (Bố cục Mở - Thân - Kết, đoạn văn mạch lạc)', maxScore: 2.0, keyPoints: ['mở bài', 'kết bài', 'đoạn văn', 'mạch lạc'] },
        { criterion: 'Xác định đúng vấn đề nghị luận (Ý nghĩa & biểu hiện của lòng biết ơn)', maxScore: 2.5, keyPoints: ['biết ơn', 'trọng nghĩa', 'nguồn cội', 'cha mẹ', 'thầy cô'] },
        { criterion: 'Lập luận, dẫn chứng thực tế thuyết phục', maxScore: 3.0, keyPoints: ['dẫn chứng', 'thực tế', 'xã hội', 'tri ân', 'lan tỏa', 'hành động'] },
        { criterion: 'Bài học nhận thức, hành động & sáng tạo, không sai chính tả', maxScore: 2.5, keyPoints: ['nhận thức', 'rèn luyện', 'chính tả', 'cảm xúc', 'sáng tạo'] }
      ],
      modelAnswer: `Dàn ý chuẩn:
1. Mở đoạn: Nêu vấn đề nghị luận - lòng biết ơn là phẩm chất đạo đức cốt lõi làm nên nhân cách con người.
2. Thân đoạn:
- Giải thích: Biết ơn là thái độ ghi nhớ, trân trọng và đền đáp công ơn của những người đã cưu mang, dạy dỗ hoặc giúp đỡ mình.
- Ý nghĩa: Giúp con người sống có cội nguồn, gắn kết tình yêu thương giữa người với người; tạo dựng mối quan hệ xã hội tốt đẹp. Dẫn chứng: Những phong trào đền ơn đáp nghĩa, tri ân thầy cô, y bác sĩ.
- Phản biện: Phê phán lối sống vô ơn, "ăn cháo đá bát".
3. Kết đoạn: Bài học nhận thức và hành động - rèn luyện thái độ biết ơn từ những việc nhỏ bé nhất mỗi ngày.`
    },
    {
      id: 'EXAM-ENG-01',
      title: 'English Test: Reading Comprehension & Writing Essay',
      subject: 'english',
      subjectName: 'Tiếng Anh',
      grade: 'Lớp 12 / THPT',
      duration: '45 phút',
      type: 'mixed',
      totalPoints: 10,
      hasPredefinedKey: true,
      description: 'Part 1: 10 Multiple Choice Questions (Grammar & Reading). Part 2: Short paragraph writing about Artificial Intelligence in Education.',
      fullContentHtml: `
        <div style="margin-bottom:24px;">
          <h4 style="color:#0F3D6E; font-size:1.05rem; margin-bottom:12px; border-bottom:1px dashed var(--border); padding-bottom:6px;">
            PART I: MULTIPLE CHOICE QUESTIONS (10 Questions — 5.0 Points, 0.5 pt each)
          </h4>
          <div style="display:flex; flex-direction:column; gap:12px; font-size:0.92rem;">
            <div>
              <b>Question 1 (Pronunciation):</b> Mark the letter A, B, C, or D to indicate the word whose underlined part differs from the other three in pronunciation:<br>
              <span style="display:inline-block; margin-right:20px;">A. play<u>ed</u></span>
              <span style="display:inline-block; margin-right:20px;">B. work<u>ed</u></span>
              <span style="display:inline-block; margin-right:20px;">C. watch<u>ed</u></span>
              <span style="display:inline-block;">D. stopp<u>ed</u></span>
            </div>
            <div>
              <b>Question 2 (Conditional sentence):</b> If we ______ more green trees in our neighborhood, the air would be fresher.<br>
              <span style="display:inline-block; margin-right:20px;">A. plant</span>
              <span style="display:inline-block; margin-right:20px;">B. will plant</span>
              <span style="display:inline-block; margin-right:20px;">C. planted</span>
              <span style="display:inline-block;">D. had planted</span>
            </div>
            <div>
              <b>Question 3 (Preposition):</b> Students are extremely keen ______ applying modern technological tools in language learning.<br>
              <span style="display:inline-block; margin-right:20px;">A. about</span>
              <span style="display:inline-block; margin-right:20px;">B. on</span>
              <span style="display:inline-block; margin-right:20px;">C. with</span>
              <span style="display:inline-block;">D. at</span>
            </div>
            <div>
              <b>Question 4 (Relative clause):</b> The young teacher ______ received the outstanding educator award lives in Ninh Binh.<br>
              <span style="display:inline-block; margin-right:20px;">A. which</span>
              <span style="display:inline-block; margin-right:20px;">B. whose</span>
              <span style="display:inline-block; margin-right:20px;">C. whom</span>
              <span style="display:inline-block;">D. who</span>
            </div>
            <div>
              <b>Question 5 (Future prediction with evidence):</b> Look at those thick dark clouds! It ______ rain very heavily soon.<br>
              <span style="display:inline-block; margin-right:20px;">A. is going to</span>
              <span style="display:inline-block; margin-right:20px;">B. will</span>
              <span style="display:inline-block; margin-right:20px;">C. should</span>
              <span style="display:inline-block;">D. must</span>
            </div>
            <div>
              <b>Question 6 (Past perfect):</b> By the time the examiner arrived at the room, all candidates ______ their registration forms.<br>
              <span style="display:inline-block; margin-right:20px;">A. finish</span>
              <span style="display:inline-block; margin-right:20px;">B. had finished</span>
              <span style="display:inline-block; margin-right:20px;">C. have finished</span>
              <span style="display:inline-block;">D. will finish</span>
            </div>
            <div>
              <b>Question 7 (Gerund):</b> High school students should avoid ______ computer games until late at night.<br>
              <span style="display:inline-block; margin-right:20px;">A. to play</span>
              <span style="display:inline-block; margin-right:20px;">B. play</span>
              <span style="display:inline-block; margin-right:20px;">C. playing</span>
              <span style="display:inline-block;">D. played</span>
            </div>
            <div>
              <b>Question 8 (Conjunction):</b> He neglected his revisions, ______ he failed to pass the semester exam.<br>
              <span style="display:inline-block; margin-right:20px;">A. so</span>
              <span style="display:inline-block; margin-right:20px;">B. because</span>
              <span style="display:inline-block; margin-right:20px;">C. although</span>
              <span style="display:inline-block;">D. but</span>
            </div>
            <div>
              <b>Question 9 (Preposition + Gerund):</b> In spite of ______ exhausted after the trip, she completed her project on time.<br>
              <span style="display:inline-block; margin-right:20px;">A. be</span>
              <span style="display:inline-block; margin-right:20px;">B. was</span>
              <span style="display:inline-block; margin-right:20px;">C. been</span>
              <span style="display:inline-block;">D. being</span>
            </div>
            <div>
              <b>Question 10 (Vocabulary):</b> Artificial Intelligence has emerged as an indispensable ______ in contemporary classrooms.<br>
              <span style="display:inline-block; margin-right:20px;">A. obstacle</span>
              <span style="display:inline-block; margin-right:20px;">B. tool</span>
              <span style="display:inline-block; margin-right:20px;">C. disadvantage</span>
              <span style="display:inline-block;">D. barrier</span>
            </div>
          </div>
        </div>

        <div>
          <h4 style="color:#0F3D6E; font-size:1.05rem; margin-bottom:12px; border-bottom:1px dashed var(--border); padding-bottom:6px;">
            PART II: WRITING ESSAY (5.0 Points)
          </h4>
          <p style="margin-bottom:8px; line-height:1.65; font-size:0.92rem;">
            Write a well-organized paragraph (120 - 150 words) on the following topic:<br>
            <b style="color:#B45309;">"How Artificial Intelligence (AI) can assist high school students in their daily studies."</b><br>
            <i>Your writing should include clear advantages, real-life examples, and advice on responsible usage.</i>
          </p>
        </div>
      `,
      answerKey: ['A', 'C', 'B', 'D', 'A', 'B', 'C', 'A', 'D', 'B'],
      rubric: [
        { criterion: 'Task Achievement (Address all parts of the writing prompt)', maxScore: 1.5, keyPoints: ['ai', 'education', 'technology', 'learning', 'future'] },
        { criterion: 'Coherence & Cohesion (Logical flow, linking words: Furthermore, However, In conclusion)', maxScore: 1.5, keyPoints: ['firstly', 'furthermore', 'moreover', 'however', 'in conclusion', 'therefore'] },
        { criterion: 'Lexical Resource (Good range of vocabulary, collocations)', maxScore: 1.0, keyPoints: ['transform', 'innovative', 'interactive', 'personalized', 'efficiency'] },
        { criterion: 'Grammatical Range & Accuracy (Complex sentences, correct tenses)', maxScore: 1.0, keyPoints: ['present perfect', 'passive voice', 'conditional', 'relative clause'] }
      ],
      modelAnswer: `Model Writing:
Artificial intelligence (AI) is rapidly revolutionizing the educational landscape in profound ways. Firstly, AI-powered tools offer personalized learning experiences tailored to each student's pace and strengths, thereby boosting academic performance. Furthermore, smart grading systems and automated feedback assist teachers in saving valuable time, enabling them to focus more on interactive mentoring. However, relying excessively on technology may diminish critical thinking and face-to-face communication skills. In conclusion, when utilized ethically and constructively, AI serves as an indispensable catalyst for modern education.`
    },
    {
      id: 'EXAM-TOAN-01',
      title: 'Khảo sát Trắc nghiệm Toán 12 — Đề Thi Thử Tốt Nghiệp',
      subject: 'toan',
      subjectName: 'Toán Học',
      grade: 'Lớp 12',
      duration: '45 phút',
      type: 'mcq',
      totalPoints: 10,
      hasPredefinedKey: true,
      description: '20 câu trắc nghiệm OMR chuẩn bộ GD&ĐT. Mỗi câu 0.5 điểm.',
      fullContentHtml: `
        <div>
          <h4 style="color:#0F3D6E; font-size:1.05rem; margin-bottom:12px; border-bottom:1px dashed var(--border); padding-bottom:6px;">
            ĐỀ TRẮC NGHIỆM TOÁN HỌC 12 (20 Câu — Mỗi câu 0.5 điểm)
          </h4>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; font-size:0.9rem;">
            <div><b>Câu 1:</b> Cho hàm số y = f(x) có đạo hàm f'(x) = x(x-1). Khoảng nghịch biến của hàm số là:<br>A. (0; 1) &nbsp; B. (-∞; 0) &nbsp; C. (1; +∞) &nbsp; D. (-1; 1)</div>
            <div><b>Câu 2:</b> Đạo hàm của hàm số y = 3^x là:<br>A. 3^x / ln3 &nbsp; B. 3^x . ln3 &nbsp; C. x.3^(x-1) &nbsp; D. 3^x</div>
            <div><b>Câu 3:</b> Thể tích khối lập phương có cạnh bằng 3a là:<br>A. 9a^3 &nbsp; B. 3a^3 &nbsp; C. 18a^3 &nbsp; D. 27a^3</div>
            <div><b>Câu 4:</b> Nghiệm của phương trình log_2(x - 1) = 3 là:<br>A. x = 8 &nbsp; B. x = 7 &nbsp; C. x = 9 &nbsp; D. x = 10</div>
            <div><b>Câu 5:</b> Nguyên hàm của hàm số f(x) = cos(2x) là:<br>A. 1/2 sin(2x) + C &nbsp; B. -sin(2x) + C &nbsp; C. 2sin(2x) + C &nbsp; D. -1/2 sin(2x) + C</div>
            <div><b>Câu 6:</b> Tiệm cận đứng của đồ thị hàm số y = (2x + 1)/(x - 1) là:<br>A. x = 2 &nbsp; B. y = 2 &nbsp; C. x = 1 &nbsp; D. y = 1</div>
            <div><b>Câu 7:</b> Cho cấp số cộng (u_n) có u_1 = 3 và công sai d = 4. Giá trị của u_2 là:<br>A. 12 &nbsp; B. 7 &nbsp; C. -1 &nbsp; D. 8</div>
            <div><b>Câu 8:</b> Trong không gian Oxyz, tọa độ tâm mặt cầu (x-1)^2 + (y+2)^2 + z^2 = 9 là:<br>A. (1; 2; 0) &nbsp; B. (-1; 2; 0) &nbsp; C. (1; -2; 3) &nbsp; D. (1; -2; 0)</div>
            <div><b>Câu 9:</b> Số giao điểm của đồ thị hàm số y = x^3 - 3x và trục hoành là:<br>A. 3 &nbsp; B. 2 &nbsp; C. 1 &nbsp; D. 0</div>
            <div><b>Câu 10:</b> Giá trị lớn nhất của hàm số y = x^4 - 2x^2 + 3 trên đoạn [0; 2] là:<br>A. 11 &nbsp; B. 3 &nbsp; C. 2 &nbsp; D. 12</div>
            <div><b>Câu 11:</b> Diện tích mặt cầu bán kính R = 3 là:<br>A. 12π &nbsp; B. 36π &nbsp; C. 9π &nbsp; D. 27π</div>
            <div><b>Câu 12:</b> Tập nghiệm của bất phương trình 2^(x+1) < 8 là:<br>A. (-∞; 3) &nbsp; B. (2; +∞) &nbsp; C. (-∞; 2) &nbsp; D. (1; 3)</div>
            <div><b>Câu 13:</b> Trong không gian Oxyz, vectơ pháp tuyến của mặt phẳng 2x - y + 3z - 1 = 0 là:<br>A. (2; 1; 3) &nbsp; B. (2; -1; -1) &nbsp; C. (-2; 1; -3) &nbsp; D. (2; -1; 3)</div>
            <div><b>Câu 14:</b> Cho hình nón có bán kính đáy r = 3 và chiều cao h = 4. Độ dài đường sinh l là:<br>A. 5 &nbsp; B. 7 &nbsp; C. 1 &nbsp; D. 25</div>
            <div><b>Câu 15:</b> Số cách chọn 3 học sinh từ một nhóm 10 học sinh là:<br>A. A_10^3 &nbsp; B. C_10^3 = 120 &nbsp; C. 30 &nbsp; D. 10^3</div>
            <div><b>Câu 16:</b> Đường cong hình bên là đồ thị của hàm số nào:<br>A. y = -x^3 + 3x &nbsp; B. y = x^4 - 2x^2 &nbsp; C. y = x^3 - 3x &nbsp; D. y = -x^4 + 2x^2</div>
            <div><b>Câu 17:</b> Tích phân ∫_0^1 (2x + 1)dx có giá trị bằng:<br>A. 2 &nbsp; B. 1 &nbsp; C. 3 &nbsp; D. 0</div>
            <div><b>Câu 18:</b> Điểm cực tiểu của hàm số y = x^3 - 3x^2 + 2 là:<br>A. x = 0 &nbsp; B. x = 1 &nbsp; C. x = -1 &nbsp; D. x = 2</div>
            <div><b>Câu 19:</b> Cho log_a b = 2. Giá trị của log_a (a^2 . b) là:<br>A. 3 &nbsp; B. 4 &nbsp; C. 2 &nbsp; D. 6</div>
            <div><b>Câu 20:</b> Thể tích khối chóp có diện tích đáy B = 6 và chiều cao h = 5 là:<br>A. 30 &nbsp; B. 15 &nbsp; C. 10 &nbsp; D. 20</div>
          </div>
        </div>
      `,
      answerKey: ['A', 'B', 'D', 'C', 'A', 'C', 'B', 'D', 'A', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'A', 'D', 'B', 'C'],
      modelAnswer: 'Đáp án chi tiết 20 câu trắc nghiệm Toán: 1A, 2B, 3D, 4C, 5A, 6C, 7B, 8D, 9A, 10A, 11B, 12C, 13D, 14A, 15B, 16C, 17A, 18D, 19B, 20C.'
    },
    {
      id: 'EXAM-OPEN-VAN',
      title: 'Đề Mở Ngữ Văn: "Sức mạnh của ý chí vượt khó qua văn học và đời sống"',
      subject: 'van',
      subjectName: 'Ngữ Văn',
      grade: 'Lớp 11 - 12',
      duration: '60 phút',
      type: 'essay',
      totalPoints: 10,
      hasPredefinedKey: false,
      description: 'Đề thi mở tự do. Hệ thống chưa cài sẵn đáp án. Khi học sinh nộp bài, AI sẽ tự động phân tích đề, tự tạo barem chuẩn và chấm bài chi tiết.',
      fullContentHtml: `
        <div style="background:#FFFBEB; border-left:4px solid #D97706; padding:16px 20px; border-radius:6px; margin-bottom:20px; font-size:0.95rem; line-height:1.75;">
          <b>ĐỀ BÀI KIỂM TRA MỞ — MÔN NGỮ VĂN:</b><br><br>
          <i>"Trên con đường thành công không có dấu chân của kẻ lười biếng. Khó khăn sinh ra không phải để cản bước con người mà để thử thách và tôi luyện ý chí."</i><br><br>
          <b>YÊU CẦU LÀM BÀI:</b><br>
          Từ những trải nghiệm thực tế trong đời sống xã hội và các tấm gương vượt khó trong văn học Việt Nam, anh/chị hãy viết một bài văn nghị luận (khoảng 400 - 500 chữ) bàn về: 
          <b style="color:#B45309;">"Sức mạnh của ý chí và nghị lực sống giúp con người chiến thắng nghịch cảnh."</b>
        </div>
        <div style="font-size:0.86rem; color:var(--muted); background:#F8FAFC; padding:12px; border-radius:6px;">
          💡 <b>Ghi chú của hệ thống:</b> Đây là đề mở sáng tạo chưa có đáp án cố định. Khi nộp bài, hệ thống sẽ kết nối Free AI API để phân tích cấu trúc bài viết, hệ thống luận điểm, dẫn chứng thực tế và kỹ năng diễn đạt của em để chấm điểm.
        </div>
      `,
      rubric: [],
      modelAnswer: ''
    },
    {
      id: 'EXAM-OPEN-ENG',
      title: 'Open English Writing: "The Impact of Social Media on Teenagers"',
      subject: 'english',
      subjectName: 'Tiếng Anh',
      grade: 'THCS / THPT',
      duration: '45 phút',
      type: 'essay',
      totalPoints: 10,
      hasPredefinedKey: false,
      description: 'Write an essay (150-200 words) discussing both positive and negative effects of social media. AI will evaluate grammar, vocabulary and coherence on the fly.',
      fullContentHtml: `
        <div style="background:#EFF6FF; border-left:4px solid #2563EB; padding:16px 20px; border-radius:6px; margin-bottom:20px; font-size:0.95rem; line-height:1.75;">
          <b>OFFICIAL WRITING PROMPT:</b><br><br>
          Social media platforms (Facebook, TikTok, Instagram) have become an integral part of modern teenagers' daily routines.<br><br>
          <b>WRITING TASK:</b><br>
          Write an essay (150 - 200 words) discussing <b>both the positive opportunities and the potential risks</b> of social media for teenagers today. Conclude with practical advice on how young people can use social networks wisely.
        </div>
        <div style="font-size:0.86rem; color:var(--muted); background:#F8FAFC; padding:12px; border-radius:6px;">
          💡 <b>System Notice:</b> This open writing task is evaluated in real-time by Free AI Engine according to international CEFR/IELTS standards (Task Achievement, Coherence, Vocabulary &amp; Grammar Accuracy).
        </div>
      `,
      rubric: [],
      modelAnswer: ''
    }
  ];'''

content = content[:exams_start] + new_default_exams + content[exams_end + 4:]
print("1. Replaced DEFAULT_EXAMS with rich full exam contents.")

with open('student-grading-engine.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Saved step 1 successfully.")
