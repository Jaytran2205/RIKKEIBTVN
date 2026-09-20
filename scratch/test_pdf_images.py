import sys
import pymupdf as fitz

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"C:\Users\Admin\Downloads\250-cau-hoi-thi-ly-thuyet-lai-xe-moto-tt.pdf"
doc = fitz.open(pdf_path)

print(f"Total pages: {len(doc)}")

# Check page with question 126
# In cleaned_lines or let's search for "126"
for page_num in range(len(doc)):
    page = doc[page_num]
    text = page.get_text()
    if "Câu 126:" in text or "Câu hỏi 126:" in text or "126." in text:
        print(f"Question 126 on page {page_num + 1} (rect: {page.rect})")
        # Get image rects on this page
        img_info = page.get_images(full=True)
        print(f"Image info: {img_info}")
        for img in img_info:
            xref = img[0]
            rects = page.get_image_rects(xref)
            print(f"  xref {xref}: rects={rects}")
        break
