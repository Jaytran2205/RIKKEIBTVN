import os, sys, json, re
import pymupdf as fitz
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"C:\Users\Admin\Downloads\250-cau-hoi-thi-ly-thuyet-lai-xe-moto-tt.pdf"
img_dir = r"c:\Users\Admin\Downloads\Allinone\images\driving"
os.makedirs(img_dir, exist_ok=True)

doc = fitz.open(pdf_path)

with open("scratch/cleaned_lines.json", "r", encoding="utf-8") as f:
    cleaned_lines = json.load(f)

questions = []
current_q = None
current_chapter = 1

# Helper function to crop and save image for a question on a given page
def crop_question_image(page_num, bbox_top, bbox_bottom, q_id):
    try:
        page = doc[page_num - 1]
        # Check if page has images
        img_list = page.get_images(full=True)
        if not img_list:
            return None
        
        # Render page to high-res pixmap (2x zoom for crispness)
        zoom = 2.0
        mat = fitz.Matrix(zoom, zoom)
        pix = page.get_pixmap(matrix=mat)
        
        # Convert to PIL Image
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        
        # Calculate crop coordinates in pixel space
        # PDF coordinates: (x0, y0, x1, y1)
        # Margin: from top (under question title) to bottom (above options)
        # Bounding box of page:
        p_rect = page.rect
        
        y0_pt = max(0, bbox_top - 10)
        y1_pt = min(p_rect.height, bbox_bottom + 10)
        
        # If height is reasonable (between 60 and 400 pt)
        if y1_pt - y0_pt > 50:
            # Crop middle width
            x0_px = int(p_rect.width * 0.05 * zoom)
            x1_px = int(p_rect.width * 0.95 * zoom)
            y0_px = int(y0_pt * zoom)
            y1_px = int(y1_pt * zoom)
            
            cropped = img.crop((x0_px, y0_px, x1_px, y1_px))
            out_filename = f"cau_{q_id}.png"
            out_path = os.path.join(img_dir, out_filename)
            cropped.save(out_path, "PNG")
            return f"images/driving/{out_filename}"
    except Exception as e:
        print(f"Error cropping for question {q_id}: {e}")
    return None

# Parse questions from cleaned lines
i = 0
while i < len(cleaned_lines):
    item = cleaned_lines[i]
    
    if item.get("type") == "chapter":
        txt = item["text"]
        if "CHƯƠNG I" in txt: current_chapter = 1
        elif "CHƯƠNG II" in txt: current_chapter = 2
        elif "CHƯƠNG III" in txt: current_chapter = 3
        elif "CHƯƠNG IV" in txt: current_chapter = 4
        elif "CHƯƠNG V" in txt or "CHƯƠNG VI" in txt: current_chapter = 5
        i += 1
        continue
    
    line_text = item["text"].strip()
    
    # Check for question start: "Câu hỏi X:" or "Câu X:"
    q_match = re.match(r'^(?:Câu\s+h[ỏỏi]+\s+|Câu\s+)(\d+)[\s:]+(.*)', line_text, re.IGNORECASE)
    if q_match:
        # Save previous question
        if current_q:
            questions.append(current_q)
        
        q_num = int(q_match.group(1))
        q_rest = q_match.group(2).strip()
        
        is_paralyzed = "CÂU LIỆT" in line_text or "CÂU ĐIỂM LIỆT" in line_text
        if is_paralyzed:
            q_rest = re.sub(r'CÂU\s+LIỆT.*', '', q_rest, flags=re.IGNORECASE).strip()
        
        current_q = {
            "id": q_num,
            "chapter": current_chapter,
            "question": q_rest,
            "options": [],
            "answer": 1,
            "isParalyzed": is_paralyzed,
            "page": item["page"],
            "q_bbox_bottom": item["bbox"][3],
            "first_opt_top": None,
            "explain": f"Căn cứ bộ 250 câu hỏi sát hạch GPLX mô tô hạng A1 của Bộ Công An.",
            "image": None
        }
        i += 1
        continue
    
    # Check for options: "1.", "2.", "3.", "4."
    opt_match = re.match(r'^([1-4])\.\s*(.*)', line_text)
    if opt_match and current_q:
        opt_num = int(opt_match.group(1))
        opt_text = opt_match.group(2).strip()
        
        if current_q["first_opt_top"] is None:
            current_q["first_opt_top"] = item["bbox"][1]
        
        # Check if this option is the red answer
        if item.get("has_red"):
            current_q["answer"] = opt_num
        
        current_q["options"].append(f"{opt_num}. {opt_text}")
        i += 1
        continue
    
    # If it's continuation text
    if current_q:
        # If options already started, append to last option
        if current_q["options"]:
            if item.get("has_red"):
                current_q["answer"] = len(current_q["options"])
            current_q["options"][-1] += " " + line_text
        else:
            # Append to question text
            if "CÂU LIỆT" in line_text:
                current_q["isParalyzed"] = True
                line_text = re.sub(r'CÂU\s+LIỆT.*', '', line_text, flags=re.IGNORECASE).strip()
            if line_text:
                current_q["question"] += " " + line_text
            current_q["q_bbox_bottom"] = item["bbox"][3]
    
    i += 1

if current_q:
    questions.append(current_q)

print(f"Total extracted questions: {len(questions)}")

# Now process images for questions that have illustrations (especially from question 126 to 250)
for q in questions:
    q_id = q["id"]
    # If question has visual content or is in chapter 4 (biển báo) or chapter 5 (sa hình)
    # or if there's a gap between question text and first option
    page_num = q["page"]
    page = doc[page_num - 1]
    img_list = page.get_images()
    
    if img_list and (q_id >= 29 or "hình" in q["question"].lower() or "biển" in q["question"].lower() or "vạch" in q["question"].lower()):
        # Try to crop image
        bbox_top = q["q_bbox_bottom"]
        bbox_bottom = q["first_opt_top"] if q["first_opt_top"] else (bbox_top + 150)
        
        # If bbox_bottom <= bbox_top, adjust
        if bbox_bottom <= bbox_top:
            bbox_bottom = bbox_top + 180
        
        img_path = crop_question_image(page_num, bbox_top, bbox_bottom, q_id)
        if img_path:
            q["image"] = img_path
            print(f"Generated image for question {q_id}: {img_path}")

# Fix answers and paralyzed flags
for q in questions:
    if q["isParalyzed"]:
        q["explain"] = f"CÂU ĐIỂM LIỆT: Hành vi bị nghiêm cấm theo Luật Trật tự ATGT đường bộ. Thí sinh tuyệt đối không được làm sai câu này!"

print(f"\nSummary:")
print(f"- Total questions: {len(questions)}")
print(f"- Total paralyzed questions: {len([q for q in questions if q['isParalyzed']])}")
print(f"- Questions with images: {len([q for q in questions if q['image']])}")

with open("scratch/all_250_questions_a1.json", "w", encoding="utf-8") as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

print("Saved all questions to scratch/all_250_questions_a1.json")
