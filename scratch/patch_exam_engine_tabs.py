import sys, re

sys.stdout.reconfigure(encoding='utf-8')

with open('driving-exam-engine.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update switchDrivingTab:
old_switch = """  if (tabId === 'tracuu600') {
    renderQuestionLookup(0, '');
  } else if (tabId === 'cau-liet-20') {
    renderParalyzedQuestions();
  }
}"""

new_switch = """  if (tabId === 'thi-a1') {
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
}"""

if old_switch in text:
    text = text.replace(old_switch, new_switch)
    print("Updated switchDrivingTab successfully.")
else:
    print("Warning: old_switch not found")

# 2. Update startExamSimulation for A, B, C:
old_start = """  } else {
    activeExam.questions = generateA1ExamQuestions(mode);
    activeExam.timeLeft = 19 * 60;
  }"""

new_start = """  } else if (rank === 'A') {
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
  }"""

if old_start in text:
    text = text.replace(old_start, new_start)
    print("Updated startExamSimulation for ranks A, B, C successfully.")
else:
    print("Warning: old_start not found")

with open('driving-exam-engine.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Saved driving-exam-engine.js!")
