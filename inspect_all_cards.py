import sys
sys.stdout.reconfigure(encoding='utf-8')
import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's find all cards between "<!-- Card 1:" and the end of the grid
pos = html.find("<!-- Card 1:")
if pos != -1:
    cards_section = html[pos:pos+10000]
    # find all card comments and buttons
    cards = re.findall(r'<!-- Card \d+: (.*?) -->([\s\S]*?)(?=<!-- Card|\n\s*</section>|\n\s*</div>\s*</div>)', cards_section)
    print(f"Total cards found: {len(cards)}")
    for title, content in cards:
        print("="*50)
        print(f"CARD: {title.strip()}")
        # extract buttons
        btns = re.findall(r'<button[^>]*onclick=["\'](.*?)["\'][^>]*>([\s\S]*?)</button>', content)
        for onclick, label in btns:
            label_clean = re.sub(r'<[^>]+>', '', label).strip()
            print(f"  Button: '{label_clean}' -> onclick: {onclick}")
