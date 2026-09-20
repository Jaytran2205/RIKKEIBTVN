import sys
import pymupdf as fitz
from PIL import Image
import os

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"C:\Users\Admin\Downloads\250-cau-hoi-thi-ly-thuyet-lai-xe-moto-tt.pdf"
doc = fitz.open(pdf_path)

# Page 58 (0-based index 57)
p58 = doc[57]
pix58 = p58.get_pixmap(matrix=fitz.Matrix(2.0, 2.0))
img58 = Image.frombytes("RGB", [pix58.width, pix58.height], pix58.samples)
print("Page 58 dimensions:", img58.size)

# Let's crop the bottom half of page 58 where the second 155 (156) is located
# Bounding box roughly: y from 0.55 to 0.85
w, h = img58.size
cropped_156 = img58.crop((int(w * 0.05), int(h * 0.58), int(w * 0.95), int(h * 0.82)))
cropped_156.save(r"c:\Users\Admin\Downloads\Allinone\images\driving\cau_156.png", "PNG")
print("Saved images/driving/cau_156.png")

# Page 95 (0-based index 94)
# On page 95, let's see where the second question on page 95 is
p95 = doc[94]
pix95 = p95.get_pixmap(matrix=fitz.Matrix(2.0, 2.0))
img95 = Image.frombytes("RGB", [pix95.width, pix95.height], pix95.samples)
w95, h95 = img95.size
cropped_229 = img95.crop((int(w95 * 0.05), int(h95 * 0.55), int(w95 * 0.95), int(h95 * 0.82)))
cropped_229.save(r"c:\Users\Admin\Downloads\Allinone\images\driving\cau_229.png", "PNG")
print("Saved images/driving/cau_229.png")
