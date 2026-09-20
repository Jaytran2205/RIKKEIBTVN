import sys, json, re
import pymupdf as fitz

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"C:\Users\Admin\Downloads\250-cau-hoi-thi-ly-thuyet-lai-xe-moto-tt.pdf"
doc = fitz.open(pdf_path)

watermark_xrefs = {110}

# Parse all questions from doc text with their bounding boxes and pages
questions = []
for p_idx, page in enumerate(doc):
    page_num = p_idx + 1
    blocks = page.get_text("blocks")
    for b in blocks:
        text = b[4].strip()
        m = re.match(r'^(?:C[aâ]u\s+h[ỏỏi]+\s+|C[aâ]u\s+)(\d+)[\s:]+(.*)', text, re.IGNORECASE)
        if m:
            q_num = int(m.group(1))
            questions.append({
                'id': q_num,
                'page': page_num,
                'rect': fitz.Rect(b[0], b[1], b[2], b[3]),
                'text': text[:50]
            })

print(f"Total questions found by block: {len(questions)}")

# Now for each page, match questions on that page with non-watermark images on that page
page_q_map = {}
for q in questions:
    page_q_map.setdefault(q['page'], []).append(q)

for page_num in range(1, len(doc) + 1):
    page = doc[page_num - 1]
    imgs = page.get_images(full=True)
    non_wm = []
    for img in imgs:
        xref = img[0]
        if xref in watermark_xrefs: continue
        rects = page.get_image_rects(xref)
        for r in rects:
            non_wm.append({'xref': xref, 'rect': r})
    
    if non_wm:
        qs_on_page = page_q_map.get(page_num, [])
        # Sort both by y0
        non_wm.sort(key=lambda x: x['rect'].y0)
        qs_on_page.sort(key=lambda x: x['rect'].y0)
        print(f"\nPage {page_num}: {len(qs_on_page)} questions, {len(non_wm)} images")
        for q in qs_on_page:
            print(f"  Q{q['id']} at y={q['rect'].y0:.1f}-{q['rect'].y1:.1f}")
        for img in non_wm:
            print(f"  Img xref {img['xref']} at y={img['rect'].y0:.1f}-{img['rect'].y1:.1f}, x={img['rect'].x0:.1f}-{img['rect'].x1:.1f}")
