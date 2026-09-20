import sys
import pymupdf as fitz
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"C:\Users\Admin\Downloads\250-cau-hoi-thi-ly-thuyet-lai-xe-moto-tt.pdf"
doc = fitz.open(pdf_path)

page = doc[43] # Page 44 (q126 and q127)

# Let's see: xref 1470 has rect: Rect(85.05, 98.35, 435.09, 228.5)
# Render with 2.5x or 3x zoom for extreme crispness
zoom = 3.0
mat = fitz.Matrix(zoom, zoom)
pix = page.get_pixmap(matrix=mat)
img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

rect126 = fitz.Rect(85.05, 98.35, 435.09, 228.5)
# Add small 2pt padding if needed, safely inside the gap between text (97.1) and options (254.5)
crop_box = (
    int((rect126.x0 - 2) * zoom),
    int((rect126.y0 - 2) * zoom),
    int((rect126.x1 + 2) * zoom),
    int((rect126.y1 + 2) * zoom)
)
cropped = img.crop(crop_box)
print("Cropped size:", cropped.size)
cropped.save("scratch/cau_126_perfect.png")
print("Saved scratch/cau_126_perfect.png")

# Let's also check xref 1470 itself: can we extract the pixmap directly from xref?
pix_direct = fitz.Pixmap(doc, 1470)
print(f"Direct pixmap: {pix_direct.width}x{pix_direct.height}, colorspace: {pix_direct.colorspace}")
pix_direct.save("scratch/cau_126_direct.png")
print("Saved scratch/cau_126_direct.png")
