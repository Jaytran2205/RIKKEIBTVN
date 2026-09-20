import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

for m in re.finditer(r'hash|addEventListener\([\'"]load|DOMContentLoaded', text):
    start = max(0, m.start() - 100)
    end = min(len(text), m.end() + 200)
    print("MATCH:", text[start:end])
    print("-" * 50)
