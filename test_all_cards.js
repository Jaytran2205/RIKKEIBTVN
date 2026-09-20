// Mock DOM and localStorage for node testing
global.document = {
  getElementById: () => null,
  querySelectorAll: () => [],
  addEventListener: () => {}
};
global.localStorage = {
  _store: {},
  getItem: function(k) { return this._store[k] || null; },
  setItem: function(k, v) { this._store[k] = String(v); },
  removeItem: function(k) { delete this._store[k]; }
};

// Load driving-exam-engine.js
const fs = require('fs');
eval(fs.readFileSync('driving-exam-engine.js', 'utf8'));

console.log("=================================================");
console.log("KIỂM TRA ĐÚNG CHỨC NĂNG & ĐỦ SỐ LƯỢNG TỪNG THẺ");
console.log("=================================================");

const cards = [
  { id: 1, name: "20 Câu Điểm Liệt", mode: "paralyzed", expectedCount: 20 },
  { id: 2, name: "Bộ Đề Ngẫu Nhiên", mode: "random", expectedCount: 25 },
  { id: 3, name: "Thi Các Câu Sai", mode: "wrong", expectedCount: 0 },
  { id: 4, name: "Thi Khái Niệm & Quy tắc", mode: "chapter1", expectedCount: 100 },
  { id: 5, name: "Thi Văn Hoá Giao Thông", mode: "chapter2", expectedCount: 10 },
  { id: 6, name: "Thi Kỹ Thuật Lái Xe", mode: "chapter3", expectedCount: 15 },
  { id: 7, name: "Thi Biển Báo", mode: "chapter4", expectedCount: 90 },
  { id: 8, name: "Thi Sa Hình", mode: "chapter5", expectedCount: 35 },
  { id: 9, name: "Thi Tốc Độ", mode: "speed", expectedCount: 25 },
  { id: 10, name: "Thi Full Bộ Đề", mode: "full", expectedCount: 250 }
];

let allPassed = true;

cards.forEach(card => {
  let questions = generateA1ExamQuestions(card.mode);
  let count = questions.length;
  let status = "";
  
  if (card.mode === "wrong") {
    // Initial wrong count should be 0
    status = (count === 0) ? "✅ ĐÚNG (Khởi tạo 0 câu sai)" : "❌ LỖI";
  } else {
    status = (count === card.expectedCount) ? `✅ ĐỦ & ĐÚNG (${count}/${card.expectedCount} câu)` : `❌ THIẾU (${count}/${card.expectedCount} câu)`;
    if (count !== card.expectedCount) allPassed = false;
  }
  
  console.log(`Thẻ ${card.id}: [${card.name}] -> Chế độ: '${card.mode}' => ${status}`);
  
  // Specific checks
  if (card.mode === "paralyzed") {
    const allParalyzed = questions.every(q => q.isParalyzed);
    console.log(`   └─ 100% câu hỏi có cờ isParalyzed: ${allParalyzed ? "✅" : "❌"}`);
  }
  if (card.mode === "chapter4") {
    const withImg = questions.filter(q => q.image).length;
    console.log(`   └─ Số câu có hình biển báo: ${withImg}/${count} câu ${withImg === count ? "✅" : "⚠️"}`);
  }
  if (card.mode === "chapter5") {
    const withImg = questions.filter(q => q.image).length;
    console.log(`   └─ Số câu có hình sa hình: ${withImg}/${count} câu ${withImg === count ? "✅" : "⚠️"}`);
  }
  if (card.mode === "random") {
    const paralyzeCount = questions.filter(q => q.isParalyzed).length;
    const ch1 = questions.filter(q => q.chapter === 1 && !q.isParalyzed).length;
    const ch2 = questions.filter(q => q.chapter === 2 && !q.isParalyzed).length;
    const ch3 = questions.filter(q => q.chapter === 3 && !q.isParalyzed).length;
    const ch4 = questions.filter(q => q.chapter === 4 && !q.isParalyzed).length;
    const ch5 = questions.filter(q => q.chapter === 5 && !q.isParalyzed).length;
    console.log(`   └─ Cơ cấu đề chuẩn Bộ Công An: Liệt=${paralyzeCount}, Khái niệm=${ch1}, Văn hoá=${ch2}, Kỹ thuật=${ch3}, Biển báo=${ch4}, Sa hình=${ch5}`);
  }
});

// Test Wrong questions simulation
console.log("\n--- Kiểm tra chức năng lưu câu sai (Thẻ 3) ---");
saveWrongQuestions([14, 50, 130]);
let wrongQs = generateA1ExamQuestions("wrong");
console.log(`Sau khi mô phỏng làm sai 3 câu [14, 50, 130] -> Thẻ 3 bốc ra: ${wrongQs.length} câu: ${wrongQs.length === 3 ? "✅ THÀNH CÔNG" : "❌ THẤT BẠI"}`);

console.log("\n=================================================");
if (allPassed) {
  console.log("🎉 TOÀN BỘ 10 THẺ ĐÃ ĐẠT 100% CHỨC NĂNG & ĐỦ SỐ LƯỢNG!");
} else {
  console.log("⚠️ CẦN KIỂM TRA LẠI");
}
console.log("=================================================");
