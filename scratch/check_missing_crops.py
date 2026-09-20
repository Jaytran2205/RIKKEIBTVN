import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

img_dir = r"c:\Users\Admin\Downloads\Allinone\images\driving"

all_required = [29, 30] + list(range(126, 251))
missing = []
for q_id in all_required:
    path = os.path.join(img_dir, f"cau_{q_id}.png")
    if not os.path.exists(path):
        missing.append(q_id)

print(f"Missing question images ({len(missing)}): {missing}")
