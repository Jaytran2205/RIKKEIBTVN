import sys, re

sys.stdout.reconfigure(encoding='utf-8')

with open('driving-exam-engine.js', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'function switchDrivingTab[\s\S]*?\n\}', text)
print(m.group(0) if m else 'None')
