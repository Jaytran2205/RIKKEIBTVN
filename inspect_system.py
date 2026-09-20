import json
import re

with open('scratch/all_250_questions_a1.json', 'r', encoding='utf-8') as f:
    qs = json.load(f)

print(f"Total in all_250_questions_a1.json: {len(qs)}")
paralyzed = [q for q in qs if q.get('isParalyzed')]
print(f"Paralyzed (diem liet) count: {len(paralyzed)}")

chapters = {}
for q in qs:
    ch = q.get('chapter', 'None')
    chapters[ch] = chapters.get(ch, 0) + 1

for ch, count in sorted(chapters.items(), key=lambda x: str(x[0])):
    print(f"Chapter {ch}: {count} questions")

# Check images
with_img = [q for q in qs if q.get('image')]
print(f"Questions with images: {len(with_img)}")

# Now check driving-exam-engine.js
with open('driving-exam-engine.js', 'r', encoding='utf-8') as f:
    engine = f.read()

# Let's see how generateA1ExamQuestions is implemented in driving-exam-engine.js
gen_func = re.search(r'function generateA1ExamQuestions[\s\S]*?\n\}', engine)
if gen_func:
    print("\n--- generateA1ExamQuestions implementation ---")
    print(gen_func.group(0))

# Let's see startExamSimulation
start_func = re.search(r'function startExamSimulation[\s\S]*?\n\}', engine)
if start_func:
    print("\n--- startExamSimulation implementation ---")
    print(start_func.group(0)[:1000])
