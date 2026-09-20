with open("scratch/test_script_0.js", "r", encoding="utf-8") as f:
    lines = f.readlines()

open_braces = 0
open_parens = 0
open_brackets = 0

for line_idx, line in enumerate(lines, 1):
    for char in line:
        if char == '{': open_braces += 1
        elif char == '}': open_braces -= 1
        elif char == '(': open_parens += 1
        elif char == ')': open_parens -= 1
        elif char == '[': open_brackets += 1
        elif char == ']': open_brackets -= 1

print(f"Final counts -> Braces {{}}: {open_braces}, Parens (): {open_parens}, Brackets []: {open_brackets}")
