import sys, re
import pymupdf as fitz

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"C:\Users\Admin\Downloads\250-cau-hoi-thi-ly-thuyet-lai-xe-moto-tt.pdf"
doc = fitz.open(pdf_path)

for p in range(93, 105): # Page 94 to 105
    page = doc[p]
    print(f"--- Page {p+1} ---")
    for line in page.get_text().splitlines():
        if "câu" in line.lower():
            print("  ", line.strip())
