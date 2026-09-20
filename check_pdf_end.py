import sys
import pymupdf as fitz

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"C:\Users\Admin\Downloads\250-cau-hoi-thi-ly-thuyet-lai-xe-moto-tt.pdf"
doc = fitz.open(pdf_path)

print(f"Total pages in PDF: {len(doc)}")
for p in range(100, len(doc)):
    print(f"=== Page {p+1} ===")
    print(doc[p].get_text()[:400])
