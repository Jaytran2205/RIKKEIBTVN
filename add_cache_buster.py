import sys

sys.stdout.reconfigure(encoding='utf-8')

for fname in ['index.html', 'landingpages.html', 'alo.html']:
    with open(fname, 'r', encoding='utf-8') as f:
        c = f.read()
    c = c.replace('src="driving-exam-engine.js"', 'src="driving-exam-engine.js?v=2026_full250"')
    with open(fname, 'w', encoding='utf-8') as f:
        f.write(c)
    print(f'Added cache buster to {fname}')
