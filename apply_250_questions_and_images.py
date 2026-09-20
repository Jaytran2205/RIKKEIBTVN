import json, re

with open('scratch/all_250_questions_a1.json', 'r', encoding='utf-8') as f:
    questions = json.load(f)

print(f"Loaded {len(questions)} questions from extracted JSON.")

# Read existing driving-exam-engine.js
with open('driving-exam-engine.js', 'r', encoding='utf-8') as f:
    js_code = f.read()

# Replace examA1Questions array
js_questions_str = json.dumps(questions, ensure_ascii=False, indent=2)
js_code = re.sub(r'examA1Questions:\s*\[[\s\S]*?\],\s*// 5\. Mẹo', f'examA1Questions: {js_questions_str},\n\n  // 5. Mẹo', js_code)

# Ensure startExamSimulation handles full 250 questions with 70 minutes
full_exam_handling = """
  if (rank === 'A1') {
    if (mode === 'full') {
      activeExam.questions = [...DRIVING_DATA_2026.examA1Questions];
      activeExam.timeLeft = 70 * 60; // 70 PHÚT ĐÚNG THEO YÊU CẦU
    } else if (mode === 'speed') {
      activeExam.questions = generateA1ExamQuestions('speed');
      activeExam.timeLeft = 5 * 60;
    } else if (mode === 'paralyzed') {
      activeExam.questions = generateA1ExamQuestions('paralyzed');
      activeExam.timeLeft = 15 * 60;
    } else {
      activeExam.questions = generateA1ExamQuestions(mode);
      activeExam.timeLeft = 19 * 60;
    }
  }
"""

js_code = re.sub(r'if\s*\(rank === \'A1\'\)\s*\{[\s\S]*?activeExam\.timeLeft = \(mode === \'speed\'\)\s*\?\s*5 \* 60\s*:\s*19 \* 60;\s*\}', full_exam_handling.strip(), js_code)

# Ensure renderExamUI renders image if present
render_image_logic = """
        <h3 style="font-size:1.15rem; color:#0F172A; line-height:1.5; margin-bottom:16px;">${q.question}</h3>
        ${q.image ? `<div style="text-align:center; margin-bottom:18px; background:#F8FAFC; padding:10px; border-radius:10px; border:1px solid #E2E8F0;"><img src="${q.image}" alt="Hình minh họa câu ${q.id}" style="max-width:100%; max-height:280px; object-fit:contain; border-radius:8px;"></div>` : ''}
"""

js_code = re.sub(r'<h3 style="font-size:1\.15rem; color:#0F172A; line-height:1\.5; margin-bottom:20px;">\$\{q\.question\}<\/h3>', render_image_logic.strip(), js_code)

with open('driving-exam-engine.js', 'w', encoding='utf-8') as f:
    f.write(js_code)

print("Updated driving-exam-engine.js with full 250 questions, 70-minute timer for full exam, and image rendering!")
