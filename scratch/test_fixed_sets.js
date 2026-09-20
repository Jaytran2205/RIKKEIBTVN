const fs = require('fs');

const code = fs.readFileSync('driving-exam-engine.js', 'utf8');
const data = (new Function(code + '; return DRIVING_DATA_2026;'))();
const all = data.examA1Questions;

function generateFixedExamA1(setNumber) {
  const setIdx = Math.max(1, Math.min(10, parseInt(setNumber) || 1)) - 1; // 0..9
  
  const paralyzed = all.filter(q => q.isParalyzed);
  const setParalyzed = [paralyzed[setIdx * 2], paralyzed[setIdx * 2 + 1]].filter(Boolean);
  
  const ch1 = all.filter(q => q.chapter === 1 && !q.isParalyzed);
  const setCh1 = ch1.slice(setIdx * 8, (setIdx + 1) * 8);
  
  const ch2 = all.filter(q => q.chapter === 2 && !q.isParalyzed);
  const setCh2 = ch2.slice(setIdx * 1, (setIdx + 1) * 1);
  
  const ch3 = all.filter(q => q.chapter === 3 && !q.isParalyzed);
  const ch3Start = (setIdx < 5) ? setIdx * 2 : (10 + (setIdx - 5));
  const ch3Count = (setIdx < 5) ? 2 : 1;
  const setCh3 = ch3.slice(ch3Start, ch3Start + ch3Count);
  
  const ch4 = all.filter(q => q.chapter === 4 && !q.isParalyzed);
  const setCh4 = ch4.slice(setIdx * 9, (setIdx + 1) * 9);
  
  const ch5 = all.filter(q => q.chapter === 5 && !q.isParalyzed);
  const ch5Start = (setIdx < 5) ? setIdx * 3 : (15 + (setIdx - 5) * 4);
  const ch5Count = (setIdx < 5) ? 3 : 4;
  const setCh5 = ch5.slice(ch5Start, ch5Start + ch5Count);
  
  const result = [...setParalyzed, ...setCh1, ...setCh2, ...setCh3, ...setCh4, ...setCh5];
  return result;
}

const seen = new Set();
for (let s = 1; s <= 10; s++) {
  const qs = generateFixedExamA1(s);
  console.log(`Set ${s}: ${qs.length} questions (Paralyzed: ${qs.filter(q => q.isParalyzed).length})`);
  qs.forEach(q => seen.add(q.id));
}

console.log('Total unique questions across 10 sets:', seen.size);
console.log('Missing from 250:', 250 - seen.size);
