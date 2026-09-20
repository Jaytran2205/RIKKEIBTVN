import os
import sys
import re
import pymupdf as fitz
from PIL import Image, ImageChops

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"C:\Users\Admin\Downloads\250-cau-hoi-thi-ly-thuyet-lai-xe-moto-tt.pdf"
out_dir = r"c:\Users\Admin\Downloads\Allinone\images\driving"
os.makedirs(out_dir, exist_ok=True)

doc = fitz.open(pdf_path)
watermark_xrefs = {110}

# Autocrop helper: trims solid background with small padding
def trim_and_pad(im, padding=8, bg_color=(255, 255, 255), tolerance=12):
    # Convert to RGB if needed
    if im.mode != 'RGB':
        im = im.convert('RGB')
    
    bg = Image.new('RGB', im.size, bg_color)
    diff = ImageChops.difference(im, bg)
    gray = diff.convert('L')
    bw = gray.point(lambda p: 255 if p > tolerance else 0)
    bbox = bw.getbbox()
    
    if bbox:
        # Add padding safely within original bounds
        w, h = im.size
        x0 = max(0, bbox[0] - padding)
        y0 = max(0, bbox[1] - padding)
        x1 = min(w, bbox[2] + padding)
        y1 = min(h, bbox[3] + padding)
        return im.crop((x0, y0, x1, y1))
    return im

def extract_pixmap_image(doc, xref):
    pix = fitz.Pixmap(doc, xref)
    if pix.n >= 5: # CMYK or with alpha
        pix = fitz.Pixmap(fitz.csRGB, pix)
    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    return img

print("=== STEP 1: EXTRACTING ALL 127 DRIVING QUESTION IMAGES ===")

extracted_count = 0

# 1. Question 29: Page 11, xref 530
try:
    im29 = extract_pixmap_image(doc, 530)
    im29 = trim_and_pad(im29, padding=10)
    p29 = os.path.join(out_dir, "cau_29.png")
    im29.save(p29, "PNG")
    print(f"Saved cau_29.png: {im29.size}")
    extracted_count += 1
except Exception as e:
    print(f"Error extracting Q29: {e}")

# 2. Question 30: Page 12, xref 546
try:
    im30 = extract_pixmap_image(doc, 546)
    im30 = trim_and_pad(im30, padding=10)
    p30 = os.path.join(out_dir, "cau_30.png")
    im30.save(p30, "PNG")
    print(f"Saved cau_30.png: {im30.size}")
    extracted_count += 1
except Exception as e:
    print(f"Error extracting Q30: {e}")

# 3. Questions 126 to 250: Pages 44 to 105
# Let's map each page from 44 to 105
# On each page, find all questions and all non-watermark images
for page_num in range(44, 106):
    page = doc[page_num - 1]
    
    # Find all question headings on this page
    blocks = page.get_text("blocks")
    page_questions = []
    for b in blocks:
        txt = b[4].strip()
        m = re.match(r'^(?:C[aâ]u\s+h[ỏỏi]+\s+|C[aâ]u\s+)(\d+)[\s:]+(.*)', txt, re.IGNORECASE)
        if m:
            q_id = int(m.group(1))
            page_questions.append({
                'id': q_id,
                'rect': fitz.Rect(b[0], b[1], b[2], b[3]),
                'text': txt[:40]
            })
    
    # Sort questions vertically by y0
    page_questions.sort(key=lambda q: q['rect'].y0)
    
    # If page 58: the questions are 154, 155, and the second 155 (which is 156)
    if page_num == 58:
        if len(page_questions) >= 3:
            page_questions[2]['id'] = 156
    # If page 95: question 228 and the second question 229
    elif page_num == 95:
        if len(page_questions) >= 2:
            page_questions[1]['id'] = 229
    elif page_num == 105:
        if len(page_questions) >= 2:
            page_questions[1]['id'] = 250
            
    # Find all non-watermark images on this page
    page_imgs = []
    for img_tuple in page.get_images(full=True):
        xref = img_tuple[0]
        if xref in watermark_xrefs:
            continue
        rects = page.get_image_rects(xref)
        for r in rects:
            page_imgs.append({'xref': xref, 'rect': r})
            
    # Sort images vertically by y0
    page_imgs.sort(key=lambda img: img['rect'].y0)
    
    # Filter out any tiny icon or header image (height < 30)
    page_imgs = [img for img in page_imgs if img['rect'].height > 30 and img['rect'].width > 30]
    
    # Now associate question to image based on vertical order
    # Each question followed by its image
    for idx, q in enumerate(page_questions):
        q_id = q['id']
        # If question is in range 126..250
        if 126 <= q_id <= 250:
            if idx < len(page_imgs):
                target_img = page_imgs[idx]
                try:
                    raw_im = extract_pixmap_image(doc, target_img['xref'])
                    clean_im = trim_and_pad(raw_im, padding=8)
                    out_path = os.path.join(out_dir, f"cau_{q_id}.png")
                    clean_im.save(out_path, "PNG")
                    extracted_count += 1
                except Exception as ex:
                    print(f"Error on Q{q_id} (xref {target_img['xref']}): {ex}")
            else:
                print(f"Warning: No matching image on page {page_num} for Q{q_id}")

print(f"\nSuccessfully extracted and perfectly cropped {extracted_count} images!")
