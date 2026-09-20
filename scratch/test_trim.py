import os, sys, glob
from PIL import Image, ImageChops

sys.stdout.reconfigure(encoding='utf-8')

img_dir = r"c:\Users\Admin\Downloads\Allinone\images\driving"

# Test trimming white borders
def get_trim_bbox(im, bg_color=(255, 255, 255), tolerance=10):
    # Convert to RGB
    rgb = im.convert('RGB')
    bg = Image.new('RGB', rgb.size, bg_color)
    diff = ImageChops.difference(rgb, bg)
    # Find bounding box where pixel diff is greater than tolerance
    # Convert diff to grayscale and threshold
    gray = diff.convert('L')
    # Thresholding
    bw = gray.point(lambda p: 255 if p > tolerance else 0)
    bbox = bw.getbbox()
    return bbox

for q_id in [126, 127, 130, 140, 156, 180, 200, 216, 229, 240, 250]:
    path = os.path.join(img_dir, f"cau_{q_id}.png")
    if os.path.exists(path):
        im = Image.open(path)
        bbox = get_trim_bbox(im)
        w, h = im.size
        print(f"cau_{q_id}.png: orig {w}x{h} -> trimmed bbox: {bbox}")
        if bbox:
            bw = bbox[2] - bbox[0]
            bh = bbox[3] - bbox[1]
            print(f"   trimmed size: {bw}x{bh} (saves {w-bw}px horiz, {h-bh}px vert)")
