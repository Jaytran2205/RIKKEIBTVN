import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

modals = re.findall(r'<div[^>]*id="[^"]*modal[^"]*"[^>]*>', text, re.IGNORECASE)
print("Modals found:", modals)

toasts = re.findall(r'<div[^>]*id="[^"]*toast[^"]*"[^>]*>', text, re.IGNORECASE)
print("Toast container:", toasts)

# Let's see modal CSS
m = re.search(r'\.modal[^{]*\{[^}]*\}', text)
if m:
    print("Modal CSS snippet:", m.group(0))
