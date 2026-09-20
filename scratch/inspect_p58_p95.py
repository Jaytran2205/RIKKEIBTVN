import sys
import pymupdf as fitz

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"C:\Users\Admin\Downloads\250-cau-hoi-thi-ly-thuyet-lai-xe-moto-tt.pdf"
doc = fitz.open(pdf_path)

print("--- Page 58 (index 57) ---")
p58 = doc[57]
for img in p58.get_images(full=True):
    xref = img[0]
    rects = p58.get_image_rects(xref)
    print(f"p58 xref {xref}: rects={rects}")

print("\n--- Page 95 (index 94) ---")
p95 = doc[94]
for img in p95.get_images(full=True):
    xref = img[0]
    rects = p95.get_image_rects(xref)
    print(f"p95 xref {xref}: rects={rects}")
