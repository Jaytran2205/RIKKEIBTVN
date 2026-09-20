import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/cleaned_lines.json', 'r', encoding='utf-8') as f:
    lines = json.load(f)

print(f"Total lines: {len(lines)}")
for idx, item in enumerate(lines):
    txt = item.get("text", "").strip()
    if re.search(r'CHƯƠNG|PHẦN|BIỂN BÁO|SA HÌNH|VĂN HÓA|VĂN HOÁ|KỸ THUẬT', txt, re.IGNORECASE):
        print(f"[{idx}] (Page {item.get('page')}): {txt}")
