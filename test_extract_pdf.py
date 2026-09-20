import os, sys, json, re
import fitz # PyMuPDF
import pdfplumber

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"C:\Users\Admin\Downloads\250-cau-hoi-thi-ly-thuyet-lai-xe-moto-tt.pdf"
img_dir = r"c:\Users\Admin\Downloads\Allinone\images\driving"
os.makedirs(img_dir, exist_ok=True)

print(f"Processing PDF: {pdf_path}")
doc = fitz.open(pdf_path)
print(f"Total pages: {len(doc)}")

# Test reading text with colors
for page_num in range(2, 10):
    page = doc[page_num]
    blocks = page.get_text("dict")["blocks"]
    print(f"\n--- Page {page_num+1} ---")
    for b in blocks:
        if "lines" in b:
            for line in b["lines"]:
                line_text = ""
                for span in line["spans"]:
                    color = span["color"]
                    # Color int in PyMuPDF: red is typically around 0xFF0000 or (r > 200, g < 50, b < 50)
                    r = (color >> 16) & 0xFF
                    g = (color >> 8) & 0xFF
                    b_val = color & 0xFF
                    is_red = (r > 150 and g < 60 and b_val < 60)
                    line_text += f"{'[RED]' if is_red else ''}{span['text']}{'[/RED]' if is_red else ''} "
                print(line_text)
