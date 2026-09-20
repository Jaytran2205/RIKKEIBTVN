import sys

sys.stdout.reconfigure(encoding='utf-8')

# Let's inspect line count and structure of driving-exam-engine.js
with open('driving-exam-engine.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines in driving-exam-engine.js: {len(lines)}")
print("Last 10 lines:")
for l in lines[-10:]:
    print(l, end='')
