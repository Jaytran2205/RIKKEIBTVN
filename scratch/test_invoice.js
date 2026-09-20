// Test invoice calculations and currency formatting
function readVietnameseCurrency(n) {
  if (!n || n <= 0) return 'Không đồng';
  const units = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ'];
  const digits = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

  function readGroup(num) {
    let h = Math.floor(num / 100);
    let t = Math.floor((num % 100) / 10);
    let o = num % 10;
    let res = '';
    if (h > 0 || num >= 100) res += digits[h] + ' trăm ';
    if (t > 1) {
      res += digits[t] + ' mươi ';
      if (o === 1) res += 'mốt ';
      else if (o === 5) res += 'lăm ';
      else if (o > 0) res += digits[o] + ' ';
    } else if (t === 1) {
      res += 'mười ';
      if (o === 5) res += 'lăm ';
      else if (o > 0) res += digits[o] + ' ';
    } else if (t === 0 && o > 0) {
      if (h > 0) res += 'lẻ ';
      res += digits[o] + ' ';
    }
    return res.trim();
  }

  let str = Math.round(n).toString();
  let groups = [];
  while (str.length > 0) {
    groups.unshift(parseInt(str.slice(-3), 10));
    str = str.slice(0, -3);
  }

  let result = '';
  for (let i = 0; i < groups.length; i++) {
    let g = groups[i];
    if (g > 0) {
      let gStr = readGroup(g);
      let u = units[groups.length - 1 - i];
      result += gStr + ' ' + u + ' ';
    }
  }
  result = result.trim() + ' đồng chẵn';
  return result.charAt(0).toUpperCase() + result.slice(1);
}

const items = [
  { name: 'Phòng VIP Deluxe view sông (2 đêm)', unit: 'Đêm', qty: 2, price: 750000 },
  { name: 'Ăn sáng đặc sản Ninh Bình', unit: 'Suất', qty: 4, price: 50000 },
  { name: 'Thuê xe máy Tam Cốc', unit: 'Xe/ngày', qty: 2, price: 120000 }
];

let subtotal = 0;
items.forEach(it => {
  it.total = it.qty * it.price;
  subtotal += it.total;
});
const discount = 100000;
const vatRate = 0.08;
const vat = Math.round((subtotal - discount) * vatRate);
const grand = subtotal - discount + vat;

console.log('Subtotal:', subtotal);
console.log('Discount:', discount);
console.log('VAT (8%):', vat);
console.log('Grand total:', grand);
console.log('In words:', readVietnameseCurrency(grand));
