import sys
import pymupdf as fitz

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"C:\Users\Admin\Downloads\250-cau-hoi-thi-ly-thuyet-lai-xe-moto-tt.pdf"
doc = fitz.open(pdf_path)

page = doc[43]
print("Page 44 rect:", page.rect)
img_info = page.get_images(full=True)
print("Image count:", len(img_info))
for img in img_info:
    xref = img[0]
    rects = page.get_image_rects(xref)
    print(f"xref {xref}: rects={rects}")

# Let's inspect text blocks on page 44
blocks = page.get_text("blocks")
for b in blocks:
    print(f"Block: bbox=({b[0]:.1f}, {b[1]:.1f}, {b[2]:.1f}, {b[3]:.1f}) text={b[4].strip()[:60]}")
