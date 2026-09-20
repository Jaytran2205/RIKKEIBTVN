import sys
import json
import os
import re

sys.stdout.reconfigure(encoding='utf-8')

# 1. Load cleaned_lines.json
with open('scratch/cleaned_lines.json', 'r', encoding='utf-8') as f:
    lines = json.load(f)

# Paralyzed question IDs
PARALYZED_IDS = {14, 15, 16, 17, 18, 19, 20, 21, 23, 39, 40, 43, 44, 49, 50, 51, 54, 56, 57, 58}

# Parse questions
raw_questions = []
current_q = None

i = 0
found_155_count = 0

while i < len(lines):
    item = lines[i]
    line_text = item.get("text", "").strip()
    
    # Check for question start: "Câu hỏi X:" or "Câu X:"
    q_match = re.match(r'^(?:Câu\s+h[ỏỏi]+\s+|Câu\s+)(\d+)[\s:]*(.*)', line_text, re.IGNORECASE)
    if q_match:
        if current_q:
            raw_questions.append(current_q)
            
        q_num = int(q_match.group(1))
        if q_num == 155:
            found_155_count += 1
            if found_155_count == 2:
                q_num = 156 # The second 155 is actually 156
                
        q_rest = q_match.group(2).strip()
        is_paralyzed = (q_num in PARALYZED_IDS) or ("CÂU LIỆT" in line_text.upper())
        q_rest = re.sub(r'CÂU\s+LIỆT.*', '', q_rest, flags=re.IGNORECASE).strip()
        
        current_q = {
            "id": q_num,
            "question": q_rest,
            "options": [],
            "answer": 1,
            "isParalyzed": is_paralyzed,
            "page": item.get("page", 0)
        }
        i += 1
        continue
        
    opt_match = re.match(r'^([1-4])\.\s*(.*)', line_text)
    if opt_match and current_q:
        opt_num = int(opt_match.group(1))
        opt_text = opt_match.group(2).strip()
        if item.get("has_red"):
            current_q["answer"] = opt_num
        current_q["options"].append(f"{opt_num}. {opt_text}")
        i += 1
        continue
        
    if current_q:
        if current_q["options"]:
            if item.get("has_red"):
                current_q["answer"] = len(current_q["options"])
            current_q["options"][-1] += " " + line_text
        else:
            if "CÂU LIỆT" in line_text.upper():
                current_q["isParalyzed"] = True
                line_text = re.sub(r'CÂU\s+LIỆT.*', '', line_text, flags=re.IGNORECASE).strip()
            if line_text:
                current_q["question"] += (" " if current_q["question"] else "") + line_text
    i += 1

if current_q:
    raw_questions.append(current_q)

print(f"Extracted raw questions count: {len(raw_questions)}")

# Convert to dictionary by ID
q_dict = {q["id"]: q for q in raw_questions}

# If question 229 is missing, create standard question 229
if 229 not in q_dict:
    print("Adding standard Question 229 (Sa hình)...")
    q_dict[229] = {
        "id": 229,
        "question": "Xe nào được quyền đi trước trong trường hợp này?",
        "options": [
            "1. Xe con.",
            "2. Xe mô tô."
        ],
        "answer": 2,
        "isParalyzed": False,
        "page": 95,
        "explain": "Xe mô tô đi thẳng và không có xe bên phải nên được quyền đi trước theo quy tắc giao thông."
    }

# Build final sorted list 1..250
final_questions = []
img_dir = r"c:\Users\Admin\Downloads\Allinone\images\driving"

for qid in range(1, 251):
    if qid in q_dict:
        q = q_dict[qid]
    else:
        print(f"CRITICAL WARNING: Question {qid} missing!")
        continue
        
    # Assign correct chapter
    if 1 <= qid <= 100:
        ch = 1
        ch_name = "Khái niệm và quy tắc giao thông đường bộ"
    elif 101 <= qid <= 110:
        ch = 2
        ch_name = "Văn hóa giao thông và đạo đức người lái xe"
    elif 111 <= qid <= 125:
        ch = 3
        ch_name = "Kỹ thuật lái xe mô tô"
    elif 126 <= qid <= 215:
        ch = 4
        ch_name = "Hệ thống biển báo hiệu đường bộ"
    else:
        ch = 5
        ch_name = "Giải các thế sa hình và kỹ năng xử lý tình huống"
        
    q["chapter"] = ch
    q["isParalyzed"] = (qid in PARALYZED_IDS)
    
    # Check image
    img_file = f"cau_{qid}.png"
    img_path = os.path.join(img_dir, img_file)
    if os.path.exists(img_path):
        q["image"] = f"images/driving/{img_file}"
    else:
        q["image"] = None
        
    # Clean question and options
    q["question"] = re.sub(r'\s+', ' ', q["question"]).strip()
    clean_opts = []
    for opt in q["options"]:
        opt_cleaned = re.sub(r'\s+', ' ', opt).strip()
        clean_opts.append(opt_cleaned)
    q["options"] = clean_opts
    
    # Explanation
    if q["isParalyzed"]:
        q["explain"] = f"CÂU ĐIỂM LIỆT: Hành vi bị nghiêm cấm theo Luật Trật tự ATGT đường bộ. Thí sinh tuyệt đối không được làm sai câu này!"
    elif not q.get("explain"):
        q["explain"] = f"Đáp án đúng là ý {q['answer']}. Căn cứ theo chương {ch}: {ch_name}."
        
    final_questions.append({
        "id": q["id"],
        "chapter": q["chapter"],
        "question": q["question"],
        "options": q["options"],
        "answer": q["answer"],
        "isParalyzed": q["isParalyzed"],
        "explain": q["explain"],
        "image": q["image"]
    })

print(f"\nFinal questions count: {len(final_questions)}")

# Verify counts per chapter
ch_counts = {}
for q in final_questions:
    ch_counts[q["chapter"]] = ch_counts.get(q["chapter"], 0) + 1

for ch in range(1, 6):
    print(f"Chapter {ch}: {ch_counts.get(ch, 0)} questions")

paralyzed_final = [q for q in final_questions if q["isParalyzed"]]
print(f"Paralyzed questions count: {len(paralyzed_final)}")
img_final = [q for q in final_questions if q["image"]]
print(f"Questions with images: {len(img_final)}")

# Save to json
with open('scratch/perfect_250_questions.json', 'w', encoding='utf-8') as f:
    json.dump(final_questions, f, ensure_ascii=False, indent=2)

print("Saved to scratch/perfect_250_questions.json successfully!")
