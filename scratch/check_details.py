import sys
import json
import re
import os

sys.stdout.reconfigure(encoding='utf-8')

with open('driving-exam-engine.js', 'r', encoding='utf-8') as f:
    text = f.read()

m156 = re.search(r'\{\s*"id":\s*156,[\s\S]*?\n\s*\}', text)
print("--- Question 156 ---")
print(m156.group(0) if m156 else "Not found 156")

m229 = re.search(r'\{\s*"id":\s*229,[\s\S]*?\n\s*\}', text)
print("--- Question 229 ---")
print(m229.group(0) if m229 else "Not found 229")
