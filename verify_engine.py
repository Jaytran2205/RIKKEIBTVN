import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

with open('driving-exam-engine.js', 'r', encoding='utf-8') as f:
    js = f.read()

matches = re.findall(r'"id":\s*(\d+)', js)
print('Total question IDs found in driving-exam-engine.js:', len(matches))
if matches:
    int_ids = list(map(int, matches))
    print('Range:', min(int_ids), 'to', max(int_ids))

paralyzed = re.findall(r'"isParalyzed":\s*true', js)
print('Paralyzed count in driving-exam-engine.js:', len(paralyzed))

images = re.findall(r'"image":\s*"images/driving/[^"]+"', js)
print('Questions with images in driving-exam-engine.js:', len(images))
