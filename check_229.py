import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/cleaned_lines.json', 'r', encoding='utf-8') as f:
    lines = json.load(f)

for idx in range(1558, 1572):
    print(f"Line {idx} (p.{lines[idx].get('page')}): {lines[idx].get('text')}")
