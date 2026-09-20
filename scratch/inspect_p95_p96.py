import sys
import pymupdf as fitz

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"C:\Users\Admin\Downloads\250-cau-hoi-thi-ly-thuyet-lai-xe-moto-tt.pdf"
doc = fitz.open(pdf_path)

print("--- Page 95 text ---")
print(doc[94].get_text())

print("--- Page 96 text ---")
print(doc[95].get_text())
