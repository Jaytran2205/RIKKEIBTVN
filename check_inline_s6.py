import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

inline_scripts = re.findall(r'<script\b[^>]*>([\s\S]*?)</script>', text)
s6 = inline_scripts[6]
print("Inline script 6 length:", len(s6))
print("Inline script 6 start:")
print(s6[:1000])

if 'examA1Questions' in s6 or 'startExamSimulation' in s6:
    print("WARNING: Inline script 6 contains exam questions / functions!")
    matches = re.findall(r'id:\s*(\d+)|"id":\s*(\d+)', s6)
    print("Found question IDs in inline script 6:", len(matches))
    if 'generateA1ExamQuestions' in s6:
        print("Inline script 6 contains generateA1ExamQuestions!")
    if 'startExamSimulation' in s6:
        print("Inline script 6 contains startExamSimulation!")
