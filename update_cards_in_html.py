import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

old_card3_pattern = r'<!-- Card 3: Thi Các Câu Sai -->[\s\S]*?<!-- Card 4:'

new_card3 = """<!-- Card 3: Thi Các Câu Sai -->
          <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:14px; padding:22px; text-align:center; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <h3 style="font-size:1.1rem; font-weight:800; color:#0F172A; margin-bottom:2px;">Thi Các Câu Sai</h3>
              <div id="cardWrongQuestionsCount" class="wrong-questions-count-badge" style="font-size:0.78rem; color:#64748B; margin-bottom:10px;">(0 câu)</div>
              <p style="font-size:0.8rem; color:#64748B; line-height:1.4; margin-bottom:16px;">Tự động lưu các câu bạn từng làm sai trong các lần thi trước để ôn luyện lại.</p>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
              <button type="button" onclick="studyWrongQuestions()" class="btn btn-outline btn-sm">Học</button>
              <button type="button" onclick="startExamSimulation('A1', 'wrong', 'Thi Ôn Luyện Lại Các Câu Đã Làm Sai')" class="btn btn-primary btn-sm">Thi</button>
            </div>
          </div>

          <!-- Card 4:"""

for fname in ['index.html', 'landingpages.html', 'alo.html']:
    with open(fname, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content, count = re.subn(old_card3_pattern, new_card3, content)
    if count > 0:
        with open(fname, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated Card 3 in {fname}!")
    else:
        print(f"Pattern for Card 3 not matched in {fname}")
