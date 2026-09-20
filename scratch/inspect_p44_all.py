import sys, json, re
import pymupdf as fitz

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"C:\Users\Admin\Downloads\250-cau-hoi-thi-ly-thuyet-lai-xe-moto-tt.pdf"
doc = fitz.open(pdf_path)

page44 = doc[43]
print("--- Page 44 full text ---")
print(page44.get_text())
