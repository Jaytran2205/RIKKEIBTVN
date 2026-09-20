import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/cleaned_lines.json', 'r', encoding='utf-8') as f:
    lines = json.load(f)

print("--- Inspecting around Question 155-157 ---")
for idx, item in enumerate(lines):
    txt = item.get('text', '')
    if '155' in txt or '156' in txt or '157' in txt:
        print(f"Line {idx} (p.{item.get('page')}): {txt}")

print("\n--- Inspecting around Question 228-230 ---")
for idx, item in enumerate(lines):
    txt = item.get('text', '')
    if '228' in txt or '229' in txt or '230' in txt:
        print(f"Line {idx} (p.{item.get('page')}): {txt}")
