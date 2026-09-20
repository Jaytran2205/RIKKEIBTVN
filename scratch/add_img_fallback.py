import sys, re

sys.stdout.reconfigure(encoding='utf-8')

with open('driving-exam-engine.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Add handleDrivingImageError function if not exists
helper_func = """
function handleDrivingImageError(imgEl, qId) {
  if (!imgEl.dataset.retryCount) {
    imgEl.dataset.retryCount = '1';
    setTimeout(() => {
      imgEl.src = './images/driving/cau_' + qId + '.png?v=' + Date.now();
    }, 400);
  } else if (imgEl.dataset.retryCount === '1') {
    imgEl.dataset.retryCount = '2';
    setTimeout(() => {
      imgEl.src = '../images/driving/cau_' + qId + '.png?v=' + Date.now();
    }, 400);
  }
}
"""

if 'function handleDrivingImageError' not in text:
    text = helper_func + '\n' + text
    print("Added handleDrivingImageError helper function.")

# Update img tags to have onerror="handleDrivingImageError(this, ...)"
# 1. in renderExamUI:
text = text.replace(
    'src="${q.image}" alt="Hình minh họa câu ${q.id}"',
    'src="${q.image}" onerror="handleDrivingImageError(this, ${q.id})" alt="Hình minh họa câu ${q.id}"'
)

# 2. in previewQuestionDetail:
text = text.replace(
    'src="${q.image}" alt="Hình câu ${q.id}"',
    'src="${q.image}" onerror="handleDrivingImageError(this, ${q.id})" alt="Hình câu ${q.id}"'
)

# 3. in SpeedSign:
text = text.replace(
    'src="${q.image}" alt="Biển báo"',
    'src="${q.image}" onerror="handleDrivingImageError(this, ${q.id})" alt="Biển báo"'
)

# 4. in AIPvp:
text = text.replace(
    'src="${q.image}" alt="Hình"',
    'src="${q.image}" onerror="handleDrivingImageError(this, ${q.id})" alt="Hình"'
)

# 5. in SaHinhMaster:
text = text.replace(
    'src="${q.image}" alt="Sa hình"',
    'src="${q.image}" onerror="handleDrivingImageError(this, ${q.id})" alt="Sa hình"'
)

with open('driving-exam-engine.js', 'w', encoding='utf-8') as f:
    f.write(text)

# Also sync to Allinone\driving-exam-engine.js
with open('Allinone/driving-exam-engine.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Saved driving-exam-engine.js and synced to Allinone/!")
