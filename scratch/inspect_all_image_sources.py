import os, sys, time
sys.stdout.reconfigure(encoding='utf-8')

img_dir = r"c:\Users\Admin\Downloads\Allinone\images\driving"
now = time.time()

recent = []
older = []

all_required = [29, 30] + list(range(126, 251))
for q_id in all_required:
    f = os.path.join(img_dir, f"cau_{q_id}.png")
    mtime = os.path.getmtime(f)
    if now - mtime < 120:
        recent.append(q_id)
    else:
        older.append(q_id)

print(f"Recently updated: {len(recent)}")
print(f"Older (not updated in last run): {len(older)}: {older}")
