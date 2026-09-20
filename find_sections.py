import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/cleaned_lines.json', 'r', encoding='utf-8') as f:
    lines = json.load(f)

# Find all questions in cleaned_lines
found_qs = []
for idx, item in enumerate(lines):
    txt = item.get("text", "").strip()
    m = re.match(r'^(?:Câu\s+h[ỏỏi]+\s+|Câu\s+)(\d+)[\s:]+(.*)', txt, re.IGNORECASE)
    if m:
        found_qs.append((int(m.group(1)), idx, item.get('page'), m.group(2)[:60]))

print(f"Total question starts found: {len(found_qs)}")
for qnum, idx, page, snippet in found_qs:
    if qnum in [1, 2, 99, 100, 101, 102, 110, 111, 112, 125, 126, 127, 214, 215, 216, 249, 250]:
        print(f"Câu {qnum}: Page {page}, line {idx} -> {snippet}")

# Check missing question numbers between 1 and 250
existing_nums = set(q[0] for q in found_qs)
missing = [x for x in range(1, 251) if x not in existing_nums]
print(f"Missing question numbers in 1..250: {missing}")
