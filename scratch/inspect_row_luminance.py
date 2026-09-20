import os, sys
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

p = r"c:\Users\Admin\Downloads\Allinone\images\driving\cau_126.png"
im = Image.open(p)
gray = im.convert('L')
w, h = im.size

print("Top 10 rows average luminance:")
for y in range(15):
    row_pixels = [gray.getpixel((x, y)) for x in range(w)]
    dark_count = sum(1 for px in row_pixels if px < 240)
    print(f"Row {y}: avg={sum(row_pixels)/w:.1f}, dark_pixels={dark_count}")

print("\nBottom 10 rows average luminance:")
for y in range(h-15, h):
    row_pixels = [gray.getpixel((x, y)) for x in range(w)]
    dark_count = sum(1 for px in row_pixels if px < 240)
    print(f"Row {y}: avg={sum(row_pixels)/w:.1f}, dark_pixels={dark_count}")
