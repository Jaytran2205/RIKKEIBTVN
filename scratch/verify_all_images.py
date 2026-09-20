import os, sys
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

img_dir = r"c:\Users\Admin\Downloads\Allinone\images\driving"
expected_ids = [29, 30] + list(range(126, 251))

print(f"Verifying all {len(expected_ids)} expected driving question images...")

errors = []
sizes = []

for qid in expected_ids:
    path = os.path.join(img_dir, f"cau_{qid}.png")
    if not os.path.exists(path):
        errors.append(f"Missing file: cau_{qid}.png")
        continue
    try:
        with Image.open(path) as im:
            w, h = im.size
            if w < 50 or h < 50:
                errors.append(f"cau_{qid}.png too small: {w}x{h}")
            sizes.append((qid, w, h, im.mode))
    except Exception as e:
        errors.append(f"Failed to open cau_{qid}.png: {e}")

if errors:
    print(f"FAILED with {len(errors)} errors:")
    for err in errors:
        print("  ", err)
else:
    print(f"SUCCESS! All {len(sizes)} images verified perfectly!")
    min_w = min(s[1] for s in sizes)
    max_w = max(s[1] for s in sizes)
    min_h = min(s[2] for s in sizes)
    max_h = max(s[2] for s in sizes)
    print(f"Widths range: {min_w}px to {max_w}px, Heights range: {min_h}px to {max_h}px")
    print(f"Sample images:")
    for s in sizes[::15]:
        print(f"  cau_{s[0]}.png: {s[1]}x{s[2]} ({s[3]})")
