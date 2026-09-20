import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Search for navigateTo
m = re.search(r'function navigateTo[\s\S]*?^}', content, re.MULTILINE)
if m:
    print("--- navigateTo ---")
    print(m.group(0))

# Search for tools list or modal systems
tools = re.findall(r'<div class="tool-card"[^>]*onclick="([^"]+)"[\s\S]*?<h3>([^<]+)</h3>', content)
print(f"\n--- TOOLS FOUND ({len(tools)}) ---")
for fn, title in tools:
    print(f"Tool: {title.strip()} -> {fn}")
