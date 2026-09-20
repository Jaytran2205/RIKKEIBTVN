import sys
import pymupdf as fitz

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"C:\Users\Admin\Downloads\250-cau-hoi-thi-ly-thuyet-lai-xe-moto-tt.pdf"
doc = fitz.open(pdf_path)

watermark_xrefs = {110}

for p_idx in range(43): # first 43 pages (before page 44)
    page = doc[p_idx]
    imgs = [img[0] for img in page.get_images(full=True) if img[0] not in watermark_xrefs]
    if imgs:
        print(f"Page {p_idx+1} has non-watermark images: xrefs={imgs}")
