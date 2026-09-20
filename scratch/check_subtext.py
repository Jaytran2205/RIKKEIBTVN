import sys
import pymupdf as fitz

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"C:\Users\Admin\Downloads\250-cau-hoi-thi-ly-thuyet-lai-xe-moto-tt.pdf"
doc = fitz.open(pdf_path)
page = doc[43] # Page 44

# Find all text between y=98 and y=254
words = page.get_text("words")
between_words = [w for w in words if 95 <= w[1] <= 254]
print("Words between question and options on page 44:")
for w in between_words:
    print(f"  '{w[4]}' at bbox=({w[0]:.1f}, {w[1]:.1f}, {w[2]:.1f}, {w[3]:.1f})")
