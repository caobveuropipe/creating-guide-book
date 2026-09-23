/**
 * Puppeteer Action Capture Helper
 * Chuyên dụng cho tạo ảnh tài liệu hướng dẫn người dùng:
 * 1. Zoom cận cảnh vào đúng phần tử thao tác (Bounding box crop + padding)
 * 2. Vẽ con trỏ chuột ảo và hiệu ứng vòng tròn click ripple tại điểm thao tác
 * 3. Hỗ trợ Hi-DPI (Retina 2x) giúp ảnh crop siêu nét
 */

const fs = require('fs');
const path = require('path');

// CSS & SVG Cursor / Ripple Injection
const CURSOR_INJECTION_SCRIPT = `
(function() {
  function removeOldPointer() {
    const old = document.getElementById('__puppeteer_virtual_cursor');
    if (old) old.remove();
  }

  window.__showClickPointer = function(x, y, label) {
    removeOldPointer();
    const container = document.createElement('div');
    container.id = '__puppeteer_virtual_cursor';
    container.style.cssText = \`
      position: absolute;
      left: \${x}px;
      top: \${y}px;
      z-index: 2147483647;
      pointer-events: none;
      transform: translate(-6px, -6px);
    \`;

    // Click Ripple Effect
    const ripple = document.createElement('div');
    ripple.style.cssText = \`
      position: absolute;
      left: 6px;
      top: 6px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(239, 68, 68, 0.35);
      border: 2px solid #ef4444;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 12px rgba(239, 68, 68, 0.6);
    \`;

    // Modern Red/Dark Mouse Pointer SVG
    const cursor = document.createElement('div');
    cursor.innerHTML = \`
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style="filter: drop-shadow(0 2px 5px rgba(0,0,0,0.5));">
        <path d="M4 3L11 20L14 13L21 10L4 3Z" fill="#ef4444" stroke="#ffffff" stroke-width="1.8" stroke-linejoin="round"/>
      </svg>
    \`;

    container.appendChild(ripple);
    container.appendChild(cursor);

    if (label) {
      const badge = document.createElement('div');
      badge.innerText = label;
      badge.style.cssText = \`
        position: absolute;
        left: 24px;
        top: 14px;
        background: #1e293b;
        color: #ffffff;
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 11px;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 4px;
        white-space: nowrap;
        border: 1px solid #ef4444;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      \`;
      container.appendChild(badge);
    }

    document.body.appendChild(container);
  };

  window.__clearClickPointer = function() {
    removeOldPointer();
  };
})();
`;

/**
 * Chụp ảnh zoom cận cảnh thao tác
 * @param {object} page - Puppeteer page instance
 * @param {string} selector - CSS selector của phần tử cần click/thao tác
 * @param {string} outputPath - Đường dẫn file ảnh xuất ra
 * @param {object} options - Cấu hình thêm (padding, label, mode)
 */
async function captureActionClick(page, selector, outputPath, options = {}) {
  const {
    padding = 60,
    label = 'Click tại đây',
    mode = 'zoom' // 'zoom' | 'overview' | 'both'
  } = options;

  await page.waitForSelector(selector, { visible: true, timeout: 10000 });
  const element = await page.$(selector);
  if (!element) throw new Error(`Không tìm thấy selector: ${selector}`);

  // Đảm bảo script con trỏ đã được inject
  await page.evaluate(CURSOR_INJECTION_SCRIPT);

  // Lấy tọa độ bounding box
  const box = await element.boundingBox();
  if (!box) throw new Error(`Phần tử không hiển thị tọa độ: ${selector}`);

  // Tính tâm phần tử để đặt con trỏ chuột
  const clickX = box.x + box.width / 2;
  const clickY = box.y + box.height / 2;

  // Hiển thị con trỏ ảo & ripple
  await page.evaluate((x, y, lbl) => {
    window.__showClickPointer(x, y, lbl);
  }, clickX, clickY, label);

  // Tạo thư mục nếu chưa có
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (mode === 'zoom' || mode === 'both') {
    // Tính clip area có padding
    const clipX = Math.max(0, box.x - padding);
    const clipY = Math.max(0, box.y - padding);
    const clipWidth = box.width + padding * 2;
    const clipHeight = box.height + padding * 2;

    const zoomPath = mode === 'both' ? outputPath.replace(/(\.[\w]+)$/, '_zoom$1') : outputPath;
    await page.screenshot({
      path: zoomPath,
      clip: {
        x: clipX,
        y: clipY,
        width: clipWidth,
        height: clipHeight
      }
    });
    console.log(`[Puppeteer] Đã chụp ảnh cận cảnh: ${zoomPath}`);
  }

  if (mode === 'overview' || mode === 'both') {
    const overviewPath = mode === 'both' ? outputPath.replace(/(\.[\w]+)$/, '_overview$1') : outputPath;
    await page.screenshot({
      path: overviewPath,
      fullPage: false
    });
    console.log(`[Puppeteer] Đã chụp ảnh toàn cảnh: ${overviewPath}`);
  }

  // Dọn dẹp con trỏ ảo
  await page.evaluate(() => window.__clearClickPointer());
}

module.exports = {
  CURSOR_INJECTION_SCRIPT,
  captureActionClick
};
