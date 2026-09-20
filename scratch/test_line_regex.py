import sys, re
import pymupdf as fitz

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"C:\Users\Admin\Downloads\250-cau-hoi-thi-ly-thuyet-lai-xe-moto-tt.pdf"
doc = fitz.open(pdf_path)

p44 = doc[43]
# Use get_text("words") or regex on line level:
lines = p44.get_text().splitlines()
for line in lines:
    m = re.search(r'(?:C[aâ]u\s+h[ỏỏi]+\s+|C[aâ]u\s+)(\d+)[\s:]+', line, re.IGNORECASE)
    if m:
        print("Found line:", line.strip())
