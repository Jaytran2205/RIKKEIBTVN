import sys, json, re

sys.stdout.reconfigure(encoding='utf-8')

with open('driving-exam-engine.js', 'r', encoding='utf-8') as f:
    text = f.read()

m228 = re.search(r'\{\s*"id":\s*228,[\s\S]*?\n\s*\}', text)
m229 = re.search(r'\{\s*"id":\s*229,[\s\S]*?\n\s*\}', text)
m230 = re.search(r'\{\s*"id":\s*230,[\s\S]*?\n\s*\}', text)

print("Q228 in engine:", m228.group(0) if m228 else "None")
print("\nQ229 in engine:", m229.group(0) if m229 else "None")
print("\nQ230 in engine:", m230.group(0) if m230 else "None")
