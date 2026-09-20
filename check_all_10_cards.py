import sys
sys.stdout.reconfigure(encoding='utf-8')
import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

pos = html.find("20 Câu Điểm Liệt")
end_pos = html.find("<!-- HẾT GRID THẺ CHỨC NĂNG -->", pos)
if end_pos == -1:
    end_pos = html.find("</section>", pos)

section = html[pos-100:pos+8000]

# Find all cards:
cards = re.split(r'<!--\s*Card\s*\d+:\s*', section)
print(f"Split count: {len(cards)}")
for i, c in enumerate(cards[1:], 1):
    header = c.split('-->')[0].strip()
    body = c.split('-->')[1] if '-->' in c else c
    # find buttons in body
    btns = re.findall(r'<button[^>]*onclick=[\'"]([^\'"]*)[\'"][^>]*>([\s\S]*?)</button>', body)
    print(f"\n[Card {i}] {header}")
    for onclick, label in btns:
        label = re.sub(r'<[^>]+>', '', label).strip()
        print(f"    Button '{label}' -> {onclick}")
