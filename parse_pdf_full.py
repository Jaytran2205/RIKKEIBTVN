import os, sys, json, re
import fitz # PyMuPDF
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"C:\Users\Admin\Downloads\250-cau-hoi-thi-ly-thuyet-lai-xe-moto-tt.pdf"
img_dir = r"c:\Users\Admin\Downloads\Allinone\images\driving"
os.makedirs(img_dir, exist_ok=True)

doc = fitz.open(pdf_path)
print(f"Total pages: {len(doc)}")

# First, let's extract all questions with spans
all_spans = []

for page_num in range(2, len(doc)):
    page = doc[page_num]
    rect = page.rect
    blocks = page.get_text("dict")["blocks"]
    
    # Check for images on page
    images = page.get_images()
    
    for b in blocks:
        if "lines" in b:
            for line in b["lines"]:
                line_spans = []
                for span in line["spans"]:
                    text = span["text"]
                    if not text.strip():
                        continue
                    color = span["color"]
                    r = (color >> 16) & 0xFF
                    g = (color >> 8) & 0xFF
                    b_val = color & 0xFF
                    is_red = (r > 150 and g < 60 and b_val < 60)
                    
                    bbox = span["bbox"] # (x0, y0, x1, y1)
                    line_spans.append({
                        "text": text,
                        "is_red": is_red,
                        "page": page_num + 1,
                        "bbox": bbox,
                        "flags": span.get("flags", 0)
                    })
                if line_spans:
                    all_spans.append(line_spans)

print(f"Total lines parsed: {len(all_spans)}")

# Now group text by line and reconstruct questions
flat_lines = []
for line in all_spans:
    # join texts
    line_text = "".join([s["text"] for s in line]).strip()
    # check if line contains red answer
    has_red = any(s["is_red"] for s in line)
    red_texts = [s["text"] for s in line if s["is_red"]]
    page = line[0]["page"]
    bbox = [min(s["bbox"][0] for s in line), min(s["bbox"][1] for s in line), max(s["bbox"][2] for s in line), max(s["bbox"][3] for s in line)]
    flat_lines.append({
        "text": line_text,
        "has_red": has_red,
        "red_texts": red_texts,
        "page": page,
        "bbox": bbox
    })

# Filter out header/footer lines
cleaned_lines = []
for l in flat_lines:
    t = l["text"].strip()
    if "TÀI LIỆU 250 CÂU HỎI" in t or "TRƯỜNG DẠY LÁI XE TÂN SƠN" in t or t.isdigit():
        continue
    if "CHƯƠNG I" in t or "CHƯƠNG II" in t or "CHƯƠNG III" in t or "CHƯƠNG IV" in t or "CHƯƠNG V" in t or "CHƯƠNG VI" in t:
        cleaned_lines.append({"type": "chapter", "text": t, "page": l["page"]})
        continue
    cleaned_lines.append(l)

print(f"Cleaned lines: {len(cleaned_lines)}")

# Save to inspect
with open("scratch/cleaned_lines.json", "w", encoding="utf-8") as f:
    json.dump(cleaned_lines, f, ensure_ascii=False, indent=2)

print("Saved cleaned lines to scratch/cleaned_lines.json")
