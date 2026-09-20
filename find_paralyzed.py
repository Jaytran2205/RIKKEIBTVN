import sys
import pymupdf as fitz
import re

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"C:\Users\Admin\Downloads\250-cau-hoi-thi-ly-thuyet-lai-xe-moto-tt.pdf"
doc = fitz.open(pdf_path)

paralyzed_list = []
for pnum, page in enumerate(doc):
    text = page.get_text()
    for m in re.finditer(r'(?:Câu\s+h[ỏỏi]+\s+|Câu\s+)(\d+)[\s:]+([^\n]+)', text, re.IGNORECASE):
        qnum = int(m.group(1))
        # check surrounding 200 chars for liệt or điểm liệt
        start = max(0, m.start() - 50)
        end = min(len(text), m.end() + 200)
        sub = text[start:end]
        if re.search(r'CÂU\s+LIỆT|ĐIỂM\s+LIỆT|\(CÂU LIỆT\)', sub, re.IGNORECASE):
            paralyzed_list.append((qnum, pnum + 1, m.group(0).strip()))

print(f"Total paralyzed questions detected from PDF: {len(paralyzed_list)}")
for q in paralyzed_list:
    print(q)
