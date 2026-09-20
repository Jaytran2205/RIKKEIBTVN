import sys, json
import pymupdf as fitz

sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/cleaned_lines.json', 'r', encoding='utf-8') as f:
    lines = json.load(f)

for idx, item in enumerate(lines):
    txt = item.get('text', '')
    if '126' in txt:
        print(f"Line {idx}, page {item.get('page')}: {txt}")
