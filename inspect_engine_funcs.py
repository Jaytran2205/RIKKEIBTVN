import sys
sys.stdout.reconfigure(encoding='utf-8')
import re

with open('driving-exam-engine.js', 'r', encoding='utf-8') as f:
    js = f.read()

def print_function(name):
    pattern = rf'(function\s+{name}[\s\S]*?\n\s*\}}\n)'
    m = re.search(pattern, js)
    if m:
        print(f"=== {name} ===")
        print(m.group(1))
    else:
        print(f"=== {name} NOT FOUND ===")

print_function('generateA1ExamQuestions')
print_function('startExamSimulation')
print_function('renderQuestionLookup')
