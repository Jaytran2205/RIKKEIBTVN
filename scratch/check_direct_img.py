import sys
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

im_direct = Image.open("scratch/cau_126_direct.png")
print("Direct image size:", im_direct.size, im_direct.mode)

# Check colors in direct image:
colors = im_direct.getcolors(maxcolors=100000)
print(f"Number of distinct colors: {len(colors) if colors else '>100000'}")
