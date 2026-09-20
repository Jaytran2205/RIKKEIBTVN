import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/cleaned_lines.json', 'r', encoding='utf-8') as f:
    lines = json.load(f)

for idx in range(len(lines)):
    txt = lines[idx].get('text', '').strip()
    page = lines[idx].get('page', 0)
    if 'CHƯƠNG' in txt.upper():
        print(f"Index {idx} | Page {page} | Type: {lines[idx].get('type')} | Text: {txt}")
