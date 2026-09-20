import sys, re, json, os
sys.stdout.reconfigure(encoding='utf-8')

with open('driving-exam-engine.js', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'examA1Questions:\s*(\[[\s\S]*?\n\s*\])\s*,', text)
if not m:
    print("Could not find examA1Questions array")
    sys.exit(1)

qs = json.loads(m.group(1))
print(f"Total questions in examA1Questions: {len(qs)}")

qs_with_img = [q for q in qs if q.get('image')]
print(f"Questions with image in examA1Questions: {len(qs_with_img)}")

missing_files = []
for q in qs_with_img:
    img_path = q['image']
    if not os.path.exists(img_path):
        missing_files.append((q['id'], img_path))

print(f"Missing image files: {len(missing_files)}")
if missing_files:
    print("Missing files:", missing_files)

# Check which questions from 126 to 250 have images:
no_img_126_250 = [q['id'] for q in qs if q['id'] >= 126 and not q.get('image')]
print(f"Questions 126-250 without image: {no_img_126_250}")

# Check questions < 126 that have images:
img_under_126 = [q['id'] for q in qs if q['id'] < 126 and q.get('image')]
print(f"Questions < 126 with image: {img_under_126}")
