with open("scratch/test_script_0.js", "r", encoding="utf-8") as f:
    lines = f.readlines()

stack = []
for line_idx, line in enumerate(lines, 1):
    for col_idx, char in enumerate(line, 1):
        if char == '{':
            stack.append((line_idx, line.strip()))
        elif char == '}':
            if stack:
                stack.pop()

print("Unclosed open braces stack:")
for item in stack:
    print(f"Line {item[0]}: {item[1]}")
