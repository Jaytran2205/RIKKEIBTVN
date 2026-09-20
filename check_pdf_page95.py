import sys
import pymupdf as fitz

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"C:\Users\Admin\Downloads\250-cau-hoi-thi-ly-thuyet-lai-xe-moto-tt.pdf"
doc = fitz.open(pdf_path)

# Page 95 in 1-based index is index 94
for pnum in [93, 94, 95]:
    page = doc[pnum]
    print(f"=== PDF PAGE {pnum+1} ===")
    print(page.get_text())
