/**
 * DOCUMENT FORMATTER & PUNCTUATION NORMALIZER
 * Chuẩn hóa thể thức văn bản hành chính theo Nghị định 30/2020/NĐ-CP
 * All in One - Hệ thống Hành chính
 */

const DocumentFormatter = (function() {
  'use strict';

  /**
   * 1. Chuẩn hóa dấu câu & khoảng trắng
   * - Thêm khoảng trắng sau dấu phẩy, chấm phẩy, hai chấm
   * - Xóa khoảng trắng thừa trước dấu câu
   * - Xóa khoảng trắng kép
   * - Chuẩn hóa định dạng ngày tháng: dd/mm/yyyy -> ngày dd tháng mm năm yyyy
   */
  function normalizePunctuation(text) {
    if (!text) return '';
    return text
      // Xóa khoảng trắng trước dấu câu
      .replace(/\s+([,;:.!?])/g, '$1')
      // Thêm khoảng trắng sau dấu phẩy
      .replace(/,(\S)/g, ', $1')
      // Thêm khoảng trắng sau dấu chấm phẩy
      .replace(/;(\S)/g, '; $1')
      // Thêm khoảng trắng sau dấu hai chấm (ngoại trừ URL http://, https://)
      .replace(/(?<!https?):(\S)/gi, ': $1')
      // Thêm khoảng trắng sau dấu chấm câu khi tiếp nối bằng chữ cái tiếng Việt
      .replace(/(?<=[a-zA-Z\u00C0-\u024F\u1EA0-\u1EF9])\.(?=[a-zA-Z\u00C0-\u024F\u1EA0-\u1EF9])/g, '. ')
      // Chuẩn hóa ngày tháng dạng 15/09/2026 thành ngày 15 tháng 09 năm 2026
      .replace(/(\b\d{1,2})\/(\d{1,2})\/(\d{4}\b)/g, 'ngày $1 tháng $2 năm $3')
      // Gộp các khoảng trắng liên tiếp thành 1 khoảng trắng
      .replace(/[ \t]+/g, ' ')
      .trim();
  }

  /**
   * 2. Tự động định dạng in nghiêng, in đậm chuẩn thể thức hành chính
   */
  function autoFormatDocument(text) {
    if (!text) return '';
    let formatted = normalizePunctuation(text);

    // In đậm các từ khóa tiêu đề hoặc loại văn bản chính
    const docTypes = ['THÔNG BÁO', 'QUYẾT ĐỊNH', 'CÔNG VĂN', 'CHỈ THỊ', 'NGHỊ ĐỊNH', 'TỜ TRÌNH', 'BÁO CÁO', 'KẾ HOẠCH', 'BIÊN BẢN', 'QUY CHẾ', 'QUY ĐỊNH'];
    docTypes.forEach(type => {
      const regex = new RegExp(`\\b(${type})\\b`, 'g');
      formatted = formatted.replace(regex, '<strong>$1</strong>');
    });

    // In nghiêng các mệnh đề căn cứ pháp lý & mở đầu điều khoản: Căn cứ, Xét, Theo đề nghị, Nhằm...
    const italicPhrases = ['Căn cứ', 'Xét', 'Theo đề nghị', 'Nhằm', 'Thực hiện ý kiến', 'Để chủ động'];
    italicPhrases.forEach(phrase => {
      const regex = new RegExp(`(^|\\n)(\\s*)(${phrase})(\\s+|$)`, 'gm');
      formatted = formatted.replace(regex, '$1$2<em>$3</em>$4');
    });

    return formatted;
  }

  /**
   * 3. Chuyển đổi khối text thành các đoạn <p> chuẩn thụt đầu dòng 1cm, căn đều 2 bên
   */
  function formatParagraphsHtml(rawText) {
    if (!rawText) return '<p style="text-indent: 1cm; margin-bottom: 6pt; text-align: justify; line-height: 1.5; color: #94a3b8;">[Chưa có nội dung văn bản. Nhập nội dung ở bước 2 hoặc dùng AI để tạo dự thảo tự động]</p>';

    const normalized = normalizePunctuation(rawText);
    const lines = normalized.split('\n').map(l => l.trim()).filter(l => l.length > 0);

    return lines.map(line => {
      let styledLine = line;
      // 1. Kính gửi: (Đậm, thụt đầu dòng)
      if (/^Kính\s*gửi\s*:/i.test(line)) {
        styledLine = `<strong>${styledLine}</strong>`;
        return `<p style="font-family: 'Times New Roman', Times, serif; font-size: 13pt; line-height: 1.5; text-align: left; text-indent: 1cm; margin: 0 0 6pt 0;">${styledLine}</p>`;
      }
      // 2. Mệnh đề căn cứ pháp lý: Căn cứ, Xét, Theo đề nghị, Nhằm (Nghiêng theo chuẩn NĐ 30)
      if (/^(Căn cứ|Xét|Theo đề nghị|Nhằm)(\s+|$)/i.test(line)) {
        styledLine = `<em>${styledLine}</em>`;
      }
      // 3. Tiêu đề điều khoản hoặc số thứ tự đề mục: 1. Mục đích..., Điều 1...
      else if (/^(\d+\.|\bĐiều\s+\d+\.|\bChương\s+[IVXLCDM]+\.)/i.test(line)) {
        styledLine = `<strong>${styledLine}</strong>`;
      }

      return `<p style="font-family: 'Times New Roman', Times, serif; font-size: 13pt; line-height: 1.5; text-align: justify; text-justify: inter-word; text-indent: 1cm; margin: 0 0 6pt 0;">${styledLine}</p>`;
    }).join('');
  }

  return {
    normalizePunctuation: normalizePunctuation,
    autoFormatDocument: autoFormatDocument,
    formatParagraphsHtml: formatParagraphsHtml
  };
})();

// Export globally for browser and Node
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DocumentFormatter;
}
