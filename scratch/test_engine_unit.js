// Test unit script for student-grading-engine.js
const fs = require('fs');

// Mock browser environment for node
const window = {};
global.window = window;
global.localStorage = {
  store: {},
  getItem(k) { return this.store[k] || null; },
  setItem(k, v) { this.store[k] = v; },
  removeItem(k) { delete this.store[k]; }
};

// Load student-grading-engine.js
const code = fs.readFileSync('student-grading-engine.js', 'utf8');
eval(code);

const engine = window.StudentGradingEngine;
console.log('Engine loaded successfully!');

// Test 1: Check exams have fullContentHtml
const exams = engine.getExams();
console.log(`Loaded ${exams.length} exams.`);
exams.forEach(e => {
  const hasFull = e.fullContentHtml && e.fullContentHtml.length > 50;
  console.log(`- Exam [${e.id}]: ${e.title.slice(0, 40)}... -> FullContent: ${hasFull ? 'YES (' + e.fullContentHtml.length + ' chars)' : 'NO'}`);
  if (!hasFull) throw new Error(`Exam ${e.id} is missing fullContentHtml!`);
});

// Helper to create mock canvas
function createMockCanvas(width, height, pixelGenerator) {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const [r, g, b, a] = pixelGenerator(x, y);
      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = a !== undefined ? a : 255;
    }
  }

  return {
    width,
    height,
    getContext(type) {
      return {
        getImageData(x, y, w, h) {
          return { data, width: w, height: h };
        }
      };
    },
    toDataURL() {
      return 'data:image/jpeg;base64,/9j/fake';
    }
  };
}

// Test 2: Random colorful photo (like user's bronze workshop photo with blue sky, red shirts, trees)
const randomPhotoCanvas = createMockCanvas(200, 200, (x, y) => {
  if (y < 60) return [100, 180, 240, 255]; // blue sky
  if (y < 120) return [30, 150, 40, 255];   // green trees
  if (y < 160) return [220, 30, 30, 255];   // bright red shirts
  return [190, 140, 50, 255];               // bronze statue
});

// Test 3: Real handwritten white paper test
const realPaperCanvas = createMockCanvas(200, 200, (x, y) => {
  // Mostly white/off-white notebook paper (245, 245, 242)
  // With some dark blue/black ink lines (20, 30, 60)
  const isInk = (y % 15 === 0 && x > 20 && x < 180) || (x % 30 === 0 && y > 30 && y < 150);
  if (isInk) return [20, 30, 60, 255]; // blue pen
  return [245, 245, 240, 255]; // white paper
});

async function runTests() {
  console.log('\n--- TESTING IMAGE VALIDATION ---');
  
  // Test random photo
  console.log('\nTesting Random Scene Photo:');
  const subRandom = await engine.gradeStudentSubmission(
    exams[0],
    { code: 'HS01', name: 'Nguyễn Văn An', class: '12A1' },
    'data:image/jpeg;base64,fake',
    '',
    randomPhotoCanvas
  );
  console.log('Result for Random Scene Photo:');
  console.log('Score:', subRandom.score);
  console.log('Grade:', subRandom.gradeLevel);
  console.log('isInvalidPhoto:', subRandom.isInvalidPhoto);
  console.log('Feedback:', subRandom.feedback.slice(0, 100) + '...');
  if (subRandom.score !== 0 || !subRandom.isInvalidPhoto) {
    throw new Error('FAIL: Random photo was not rejected with 0 points!');
  }
  console.log('✔ PASS: Random photo correctly REJECTED with 0 points!');

  // Test real test paper
  console.log('\nTesting Real Test Paper:');
  const subPaper = await engine.gradeStudentSubmission(
    exams[0],
    { code: 'HS01', name: 'Nguyễn Văn An', class: '12A1' },
    'data:image/jpeg;base64,fake',
    '',
    realPaperCanvas
  );
  console.log('Result for Real Exam Paper:');
  console.log('Score:', subPaper.score);
  console.log('Grade:', subPaper.gradeLevel);
  console.log('isInvalidPhoto:', subPaper.isInvalidPhoto);
  console.log('Feedback:', subPaper.feedback.slice(0, 100) + '...');
  if (subPaper.score === 0 || subPaper.isInvalidPhoto) {
    throw new Error('FAIL: Real test paper was incorrectly rejected!');
  }
  console.log('✔ PASS: Real test paper correctly ACCEPTED and GRADED with score ' + subPaper.score + '!');

  console.log('\n=============================================');
  console.log('ALL UNIT TESTS PASSED WITH 100% SUCCESS!');
  console.log('=============================================');
}

runTests();
