import sys, re
import pymupdf as fitz

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"C:\Users\Admin\Downloads\250-cau-hoi-thi-ly-thuyet-lai-xe-moto-tt.pdf"
doc = fitz.open(pdf_path)

for p_idx in range(len(doc)):
    txt = doc[p_idx].get_text()
    if "230" in txt:
        print(f"Page {p_idx+1} mentions 230:")
        for line in txt.splitlines():
            if "230" in line:
                print("  ", line)
        imgs = [img[0] for img in doc[p_idx].get_images(full=True) if img[0] != 110]
        print(f"  Images on page {p_idx+1}: {imgs}")
