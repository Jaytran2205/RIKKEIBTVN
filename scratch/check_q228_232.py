import sys, re

sys.stdout.reconfigure(encoding='utf-8')

with open('driving-exam-engine.js', 'r', encoding='utf-8') as f:
    text = f.read()

for qid in [228, 229, 230, 231, 232]:
    m = re.search(r'\{\s*"id":\s*' + str(qid) + r',[\s\S]*?\n\s*\}', text)
    print(f"--- Q{qid} ---")
    print(m.group(0) if m else "Not found")
