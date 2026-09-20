import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('student-grading-engine.js', 'r', encoding='utf-8') as f:
    text = f.read()

funcs = ['preprocessImage', 'gradeStudentSubmission', 'onStudentExamChange', 'renderGradingResult', 'submitStudentGrading']
for fn in funcs:
    pos = text.find('function ' + fn)
    print(f"function {fn:25} at pos {pos}")
