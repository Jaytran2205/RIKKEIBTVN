import os, sys
import pymupdf as fitz
from PIL import Image, ImageChops

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"C:\Users\Admin\Downloads\250-cau-hoi-thi-ly-thuyet-lai-xe-moto-tt.pdf"
out_dir = r"c:\Users\Admin\Downloads\Allinone\images\driving"
doc = fitz.open(pdf_path)

def trim_and_pad(im, padding=8, bg_color=(255, 255, 255), tolerance=12):
    if im.mode != 'RGB':
        im = im.convert('RGB')
    bg = Image.new('RGB', im.size, bg_color)
    diff = ImageChops.difference(im, bg)
    gray = diff.convert('L')
    bw = gray.point(lambda p: 255 if p > tolerance else 0)
    bbox = bw.getbbox()
    if bbox:
        w, h = im.size
        x0 = max(0, bbox[0] - padding)
        y0 = max(0, bbox[1] - padding)
        x1 = min(w, bbox[2] + padding)
        y1 = min(h, bbox[3] + padding)
        return im.crop((x0, y0, x1, y1))
    return im

def extract_pixmap(xref):
    pix = fitz.Pixmap(doc, xref)
    if pix.n >= 5:
        pix = fitz.Pixmap(fitz.csRGB, pix)
    return Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

# Save Q230 (xref 2687 on page 95)
im230 = trim_and_pad(extract_pixmap(2687), 8)
im230.save(os.path.join(out_dir, "cau_230.png"), "PNG")
print("cau_230.png saved perfectly:", im230.size)

# Save Q229 (same diagram as Q231: xref 2714 on page 96)
im229 = trim_and_pad(extract_pixmap(2714), 8)
im229.save(os.path.join(out_dir, "cau_229.png"), "PNG")
print("cau_229.png saved perfectly:", im229.size)
