with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

results = []
for i, l in enumerate(lines, 1):
    if 'ttsModal' in l or 'Chuyển Văn Bản' in l or 'openModal(\'tts' in l or 'renderTTSStudio' in l or 'Studio Giọng Nói' in l:
        results.append(f"Line {i}: {l.strip()}")

with open('scratch/tts_lines.txt', 'w', encoding='utf-8') as out:
    out.write('\n'.join(results))

print(f"Found {len(results)} occurrences.")
