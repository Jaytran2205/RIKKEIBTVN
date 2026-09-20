import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

print("File length:", len(content))

# Find nav links
nav_match = re.search(r'<nav class="nav-links">([\s\S]*?)</nav>', content)
if nav_match:
    print("\n--- NAV LINKS ---")
    print(nav_match.group(1))

# Find all page-view ids
page_views = re.findall(r'<div[^>]*id="([^"]+)"[^>]*class="[^"]*page-view[^"]*"', content)
print("\n--- PAGE VIEWS ---")
for pv in page_views:
    print(pv)

# Also find by id with page-
pages = re.findall(r'id="(page-[^"]+)"', content)
print("\n--- PAGE- IDs ---")
for p in pages:
    print(p)

# Find router / navigation JS
router = re.findall(r'function (?:switchPage|showPage|navigate|openTab|goToPage)[^\{]*\{[\s\S]*?\}', content)
print("\n--- ROUTER FUNCTIONS ---")
for r in router[:5]:
    print(r[:200] + "...")
