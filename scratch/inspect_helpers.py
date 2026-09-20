import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

def show_func(name):
    pattern = r'function\s+' + name + r'\s*\([^\)]*\)\s*\{'
    m = re.search(pattern, text)
    if m:
        start = m.start()
        # count braces
        brace_count = 0
        end = start
        for i in range(start, len(text)):
            if text[i] == '{':
                brace_count += 1
            elif text[i] == '}':
                brace_count -= 1
                if brace_count == 0:
                    end = i + 1
                    break
        print(f"=== {name} ===")
        print(text[start:end][:800])
    else:
        print(f"=== {name} NOT FOUND ===")

show_func('navigateTo')
show_func('showToast')
show_func('openToolModal')
