import sys
import json
import pymupdf as fitz
import re

sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/all_250_questions_a1.json', 'r', encoding='utf-8') as f:
    qs = json.load(f)

print(f"Total in all_250_questions_a1.json: {len(qs)}")
ids = [q['id'] for q in qs]
from collections import Counter
counts = Counter(ids)
duplicates = [k for k, v in counts.items() if v > 1]
print("Duplicates in json:", duplicates)
missing = [i for i in range(1, 251) if i not in counts]
print("Missing in range 1..250:", missing)
