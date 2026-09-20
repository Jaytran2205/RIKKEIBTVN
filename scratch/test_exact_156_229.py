import sys
import pymupdf as fitz
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"C:\Users\Admin\Downloads\250-cau-hoi-thi-ly-thuyet-lai-xe-moto-tt.pdf"
doc = fitz.open(pdf_path)

# Test xref 1800 (cau_156) and xref 2687 (cau_229)
pix156 = fitz.Pixmap(doc, 1800)
print(f"Xref 1800 (cau_156): {pix156.width}x{pix156.height}, n={pix156.n}, colorspace={pix156.colorspace}")
if pix156.n >= 5: # CMYK
    pix156 = fitz.Pixmap(fitz.csRGB, pix156)
pix156.save("scratch/test_cau_156_exact.png")

pix229 = fitz.Pixmap(doc, 2687)
print(f"Xref 2687 (cau_229): {pix229.width}x{pix229.height}, n={pix229.n}, colorspace={pix229.colorspace}")
if pix229.n >= 5:
    pix229 = fitz.Pixmap(fitz.csRGB, pix229)
pix229.save("scratch/test_cau_229_exact.png")

print("Saved scratch/test_cau_156_exact.png and test_cau_229_exact.png successfully!")
