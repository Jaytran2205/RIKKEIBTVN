import urllib.request
import re

url = 'http://localhost:5000/driving-exam-engine.js?v=2026_full250'
req = urllib.request.urlopen(url)
content = req.read().decode('utf-8')
print('Downloaded length:', len(content))

ids = re.findall(r'"id":\s*(\d+)', content)
print('Total IDs in downloaded file from localhost:5000:', len(ids))
if ids:
    int_ids = list(map(int, ids))
    print('Range:', min(int_ids), 'to', max(int_ids))

paralyzed = len(re.findall(r'"isParalyzed":\s*true', content))
print('Total paralyzed questions:', paralyzed)
