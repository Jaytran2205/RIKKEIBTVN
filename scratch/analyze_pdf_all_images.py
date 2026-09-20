import sys, json, os
import pymupdf as fitz

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"C:\Users\Admin\Downloads\250-cau-hoi-thi-ly-thuyet-lai-xe-moto-tt.pdf"
doc = fitz.open(pdf_path)

watermark_xrefs = set()
# Find the watermark xref by checking which xref appears on > 10 pages
xref_page_count = {}
for p in doc:
    for img in p.get_images(full=True):
        xref = img[0]
        xref_page_count[xref] = xref_page_count.get(xref, 0) + 1

for xref, count in xref_page_count.items():
    if count > 5:
        watermark_xrefs.add(xref)
        print(f"Watermark/common xref: {xref} (appears on {count} pages)")

# Now check each page
print(f"\nScanning {len(doc)} pages for question illustrations...")
illustrations = []
for p_idx, page in enumerate(doc):
    page_num = p_idx + 1
    imgs = page.get_images(full=True)
    non_wm = [img for img in imgs if img[0] not in watermark_xrefs]
    if non_wm:
        # Get rects for each non_wm image on this page
        img_entries = []
        for img in non_wm:
            xref = img[0]
            rects = page.get_image_rects(xref)
            for r in rects:
                img_entries.append({'xref': xref, 'rect': r, 'page': page_num})
        # Sort by vertical position (y0)
        img_entries.sort(key=lambda x: x['rect'].y0)
        illustrations.extend(img_entries)

print(f"Total non-watermark illustration images found: {len(illustrations)}")
