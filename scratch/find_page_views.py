import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Find all page-view start tags and their line numbers
for m in re.finditer(r'<div[^>]*class="[^"]*page-view[^"]*"[^>]*>', text):
    line_num = text[:m.start()].count('\n') + 1
    tag = m.group(0)
    print(f"Line {line_num}: {tag}")
