import sys
sys.stdout.reconfigure(encoding='utf-8')
import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find the cards section
match = re.search(r'20 Câu Điểm Liệt[\s\S]*?Thi Full Bộ Đề[\s\S]*?</section>|20 Câu Điểm Liệt[\s\S]*?Thi Full Bộ Đề[\s\S]*?</div>\s*</div>\s*</div>', html)
if match:
    print("Found cards container!")
    print(match.group(0)[:3000])
else:
    # search for where "20 Câu Điểm Liệt" appears
    pos = html.find("20 Câu Điểm Liệt")
    if pos != -1:
        print("Surrounding HTML around 20 Câu Điểm Liệt:")
        print(html[pos-200:pos+2000])
