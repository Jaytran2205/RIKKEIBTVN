import re
import subprocess

with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

# Tìm tất cả các đoạn script inline
scripts = re.findall(r'<script(?![^>]*src=)[^>]*>(.*?)</script>', content, re.DOTALL | re.IGNORECASE)

print(f"Total inline scripts found: {len(scripts)}")

for i, s in enumerate(scripts):
    with open(f"scratch/test_script_{i}.js", "w", encoding="utf-8") as js_file:
        js_file.write(s)
    
    # Dùng node hoặc check bracket syntax
    print(f"Script {i} length: {len(s)} chars")
