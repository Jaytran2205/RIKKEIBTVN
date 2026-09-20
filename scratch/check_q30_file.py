import os, sys
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

p30 = r"images/driving/cau_30.png"
print("Exists:", os.path.exists(p30))
print("Size on disk:", os.path.getsize(p30), "bytes")

im = Image.open(p30)
print("Image format:", im.format, "size:", im.size, "mode:", im.mode)
