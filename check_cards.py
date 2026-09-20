import re
import json

# 1. Check driving-exam-engine.js
with open('driving-exam-engine.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Let's find examA1Questions
q_match = re.search(r'examA1Questions:\s*(\[.*?\]),\s*(?:examModes|currentExam|render|\w+:)', js_content, re.DOTALL)
if q_match:
    try:
        # try evaluating or extracting objects
        qs = re.findall(r'\{\s*["\']id["\']:\s*(\d+).*?\}', js_content, re.DOTALL)
        print(f"Total questions matched in driving-exam-engine.js: {len(qs)}")
    except Exception as e:
        print("Error parsing examA1Questions:", e)
else:
    qs = re.findall(r'\{\s*["\']id["\']:\s*(\d+).*?\}', js_content, re.DOTALL)
    print(f"Fallback regex questions count: {len(qs)}")

# 2. Let's inspect where cards are generated in index.html and driving-exam-engine.js
print("\n--- Searching for cards in driving-exam-engine.js ---")
card_keywords = ["20 Câu Điểm Liệt", "Bộ Đề Ngẫu Nhiên", "Thi Các Câu Sai", "Khái Niệm", "Văn Hoá", "Kỹ Thuật", "Biển Báo", "Sa Hình", "Thi Tốc Độ", "Full Bộ Đề"]
for kw in card_keywords:
    in_js = kw in js_content
    print(f"Keyword '{kw}' in driving-exam-engine.js: {in_js}")

with open('index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

print("\n--- Searching for cards in index.html ---")
for kw in card_keywords:
    in_html = kw in html_content
    print(f"Keyword '{kw}' in index.html: {in_html}")
