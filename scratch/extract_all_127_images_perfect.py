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

def trim_and_pad(im, padding=8, bg_color=(255, 255, 255), tolerance=12):
    if im.mode != 'RGB':
        im = im.convert('RGB')
    bg = Image.new('RGB', im.size, bg_color)
    diff = ImageChops.difference(im, bg)
    gray = diff.convert('L')
    bw = gray.point(lambda p: 255 if p > tolerance else 0)
    bbox = bw.getbbox()
    if bbox:
        w, h = im.size
        x0 = max(0, bbox[0] - padding)
        y0 = max(0, bbox[1] - padding)
        x1 = min(w, bbox[2] + padding)
        y1 = min(h, bbox[3] + padding)
        return im.crop((x0, y0, x1, y1))
    return im

def extract_pixmap_image(doc, xref):
    pix = fitz.Pixmap(doc, xref)
    if pix.n >= 5:
        pix = fitz.Pixmap(fitz.csRGB, pix)
    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    return img

print("=== PERFECT EXTRACTION FOR ALL 127 DRIVING QUESTIONS ===")

# First Q29 and Q30
im29 = trim_and_pad(extract_pixmap_image(doc, 530), 10)
im29.save(os.path.join(out_dir, "cau_29.png"), "PNG")
print("cau_29.png saved:", im29.size)

im30 = trim_and_pad(extract_pixmap_image(doc, 546), 10)
im30.save(os.path.join(out_dir, "cau_30.png"), "PNG")
print("cau_30.png saved:", im30.size)

saved_questions = {29, 30}

# For pages 44 to 105:
for p_idx in range(43, len(doc)):
    page_num = p_idx + 1
    page = doc[p_idx]
    
    # Get all non-watermark images on this page
    raw_imgs = page.get_images(full=True)
    non_wm_imgs = []
    for t in raw_imgs:
        xref = t[0]
        if xref in watermark_xrefs: continue
        for r in page.get_image_rects(xref):
            if r.width > 30 and r.height > 30:
                non_wm_imgs.append({'xref': xref, 'rect': r})
    
    # Sort images top to bottom
    non_wm_imgs.sort(key=lambda x: x['rect'].y0)
    
    # Find all question headers on this page
    # Look at each line
    lines = page.get_text().splitlines()
    found_qs = []
    for line in lines:
        line_clean = line.strip()
        # Search for Câu X or Câu hỏi X
        m = re.search(r'(?:C[aâ]u\s+h[ỏỏi]+\s+|C[aâ]u\s+)(\d+)[\s:]+', line_clean, re.IGNORECASE)
        if m:
            qid = int(m.group(1))
            # Find rect on page
            rects = page.search_for(line_clean[:20])
            y0 = rects[0].y0 if rects else 0
            found_qs.append({'id': qid, 'y0': y0, 'line': line_clean})
    
    # Handle known duplicates in original PDF:
    # Page 58 has: 154, 155, and second 155 (which is 156)
    if page_num == 58:
        if len(found_qs) >= 3:
            found_qs[2]['id'] = 156
    # Page 95 has: 228 and second question 229
    elif page_num == 95:
        if len(found_qs) >= 2:
            found_qs[1]['id'] = 229
    # Page 105 has: 249 and second question 250
    elif page_num == 105:
        if len(found_qs) >= 2:
            found_qs[1]['id'] = 250

    # Sort questions top to bottom
    found_qs.sort(key=lambda x: x['y0'])
    
    # Now associate each question with the image directly below it
    for idx, q in enumerate(found_qs):
        qid = q['id']
        if 126 <= qid <= 250:
            if idx < len(non_wm_imgs):
                img_data = non_wm_imgs[idx]
                im = extract_pixmap_image(doc, img_data['xref'])
                im = trim_and_pad(im, padding=8)
                out_p = os.path.join(out_dir, f"cau_{qid}.png")
                im.save(out_p, "PNG")
                saved_questions.add(qid)
            else:
                print(f"Warning: Page {page_num} missing image for Q{qid}")

expected = set([29, 30] + list(range(126, 251)))
missing = expected - saved_questions
print(f"\nTotal expected questions: {len(expected)}")
print(f"Total saved questions: {len(saved_questions)}")
print(f"Missing questions: {len(missing)} -> {sorted(list(missing))}")
