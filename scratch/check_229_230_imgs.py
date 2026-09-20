import os, sys
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

p229 = r"c:\Users\Admin\Downloads\Allinone\images\driving\cau_229.png"
p230 = r"c:\Users\Admin\Downloads\Allinone\images\driving\cau_230.png"

im229 = Image.open(p229)
print("cau_229.png size:", im229.size)

if os.path.exists(p230):
    im230 = Image.open(p230)
    print("cau_230.png size:", im230.size)
else:
    print("cau_230.png does not exist")
