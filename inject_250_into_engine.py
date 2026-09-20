import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

# 1. Load the 250 questions
with open('scratch/perfect_250_questions.json', 'r', encoding='utf-8') as f:
    questions_250 = json.load(f)

print(f"Loaded {len(questions_250)} questions.")

# 2. Read driving-exam-engine.js
with open('driving-exam-engine.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# 3. Format questions JSON for JS
questions_js = json.dumps(questions_250, ensure_ascii=False, indent=2)

# 4. Replace examA1Questions array
pattern = r'examA1Questions:\s*\[[\s\S]*?\],\s*(?=\n\s*// 5\. Mẹo|\n\s*// 5\.|\n\s*tips:|\n\s*examModes:)'
replacement = f"examA1Questions: {questions_js},"

new_js, count = re.subn(pattern, replacement, js_content)
if count == 0:
    print("Direct pattern did not match, trying broader replacement...")
    # Find start of examA1Questions and end before tips or next section
    start_pos = js_content.find("examA1Questions: [")
    if start_pos != -1:
        end_marker = "// 5. Mẹo thi lý thuyết"
        end_pos = js_content.find(end_marker, start_pos)
        if end_pos != -1:
            # find the last "]," before end_pos
            last_bracket = js_content.rfind("],", start_pos, end_pos)
            if last_bracket != -1:
                new_js = js_content[:start_pos] + f"examA1Questions: {questions_js},\n\n  " + js_content[end_pos:]
                print("Broad replacement successful!")
            else:
                print("Could not find closing bracket")
                sys.exit(1)
        else:
            print("Could not find end marker")
            sys.exit(1)
    else:
        print("Could not find examA1Questions")
        sys.exit(1)
else:
    print("Pattern replacement successful!")

with open('driving-exam-engine.js', 'w', encoding='utf-8') as f:
    f.write(new_js)

print("driving-exam-engine.js updated with 250 questions!")
