import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

checks = [
    'student-grading-engine.js',
    'id="nav-grading"',
    'id="page-grading"',
    'id="gradingTab_teacher"',
    'id="gradingTab_student"',
    'id="gradingTab_aiconfig"',
    'id="gradingQrModal"',
    'id="gradingImportModal"',
    'StudentGradingEngine'
]

all_ok = True
for c in checks:
    found = c in text
    print(f"{c:30} -> {'FOUND' if found else 'MISSING!'}")
    if not found:
        all_ok = False

if all_ok:
    print("\nALL 9 REQUIRED ELEMENTS VERIFIED SUCCESSFULLY IN INDEX.HTML!")
else:
    print("\nSOME ELEMENTS ARE MISSING!")
