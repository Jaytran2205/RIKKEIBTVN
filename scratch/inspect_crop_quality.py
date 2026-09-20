import os
import sys
import glob
from PIL import Image, ImageChops

sys.stdout.reconfigure(encoding='utf-8')

img_dir = r"c:\Users\Admin\Downloads\Allinone\images\driving"
files = glob.glob(os.path.join(img_dir, "cau_*.png"))
print(f"Total image files: {len(files)}")

# Check sizes and aspect ratios
aspects = []
sizes = []
for f in files:
    try:
        with Image.open(f) as im:
            w, h = im.size
            aspects.append((os.path.basename(f), w, h, round(w/h, 2)))
            sizes.append((w, h))
    except Exception as e:
        print(f"Error opening {f}: {e}")

# Sample display
for item in aspects[:15]:
    print(f"{item[0]}: {item[1]}x{item[2]} (ratio: {item[3]})")

print("\n--- Check 156 and 229 ---")
for item in aspects:
    if "156" in item[0] or "229" in item[0]:
        print(f"{item[0]}: {item[1]}x{item[2]} (ratio: {item[3]})")
