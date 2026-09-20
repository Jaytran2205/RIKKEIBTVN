import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

scripts = re.findall(r'<script[^>]*src=["\']([^"\']+)["\']', text)
print('Script src tags:', scripts)

# Also check for inline scripts defining questions
inline_scripts = re.findall(r'<script\b[^>]*>([\s\S]*?)</script>', text)
print(f'Total inline script tags: {len(inline_scripts)}')
for idx, s in enumerate(inline_scripts):
    if 'exam' in s.lower() or 'driving' in s.lower() or 'question' in s.lower() or 'startExamSimulation' in s:
        print(f'Inline script {idx} mentions exam/driving/question (length: {len(s)})')
        for word in ['startExamSimulation', 'generateA1ExamQuestions', 'examA1Questions', 'questions']:
            if word in s:
                print(f'   -> has {word}')
