import os, sys
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

# Let's inspect rows/columns of cau_126.png to see if the top 10px or bottom 10px have text or border lines
img_dir = r"c:\Users\Admin\Downloads\Allinone\images\driving"

for name in ["cau_126.png", "cau_156.png", "cau_229.png"]:
    p = os.path.join(img_dir, name)
    im = Image.open(p)
    w, h = im.size
    print(f"--- {name} ({w}x{h}) ---")
    # Let's check first non-white pixel in top 20 rows
    gray = im.convert('L')
    top_non_white = None
    for y in range(h):
        for x in range(w):
            if gray.getpixel((x, y)) < 245:
                top_non_white = y
                break
        if top_non_white is not None:
            break
    
    bottom_non_white = None
    for y in range(h-1, -1, -1):
        for x in range(w):
            if gray.getpixel((x, y)) < 245:
                bottom_non_white = y
                break
        if bottom_non_white is not None:
            break
            
    print(f"Top non-white at y={top_non_white}, bottom non-white at y={bottom_non_white} (total h={h})")
