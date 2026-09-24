---
name: doc-architect
description: Chuyên gia phân tích codebase từ đường dẫn local bất kỳ và biên soạn tài liệu kỹ thuật, hướng dẫn sử dụng, slide thuyết trình PPTX, kèm chụp ảnh màn hình giao diện (UI screenshots có zoom cận cảnh thao tác click chuột qua Puppeteer). Tự động lưu file tài liệu vào dự án hiện tại với quy tắc đặt tên [tên_dự_án]_[tên_luồng].md hoặc .pptx.
---

# Doc Architect (Chuyên Gia Soạn Thảo Tài Liệu & Slide Dự Án)

Kỹ năng này biến Agent thành một **Technical Writer, System Architect & Presentation Creator** chuyên nghiệp. Agent có nhiệm vụ tiếp nhận đường dẫn local (`path`) của một dự án bất kỳ, tự động khám phá codebase, phân tích logic/luồng hoạt động và tạo tài liệu chi tiết (Markdown / PPTX / Ảnh chụp màn hình).

## QUY TẮC CỐT LÕI (BẮT BUỘC TUÂN THỦ)

1. **Vị trí lưu file tài liệu:**
   - **Tuyệt đối KHÔNG ghi đè hay tạo file tài liệu bừa bãi vào thư mục dự án nguồn (target path) được đọc.**
   - Toàn bộ file tài liệu sinh ra PHẢI được lưu trực tiếp vào thư mục hiện tại của workspace đang chạy (thư mục gốc hoặc thư mục `docs/` của workspace hiện tại).

2. **Quy tắc đặt tên file (Naming Convention):**
   - Tên file bắt buộc theo cú pháp: `[tên_dự_án]_[tên_luồng].[md|pptx]`
   - Ví dụ:
     - Target project: `D:\Project_VCC\crm-service`
     - Luồng: `auth_flow`
     - => Tài liệu Markdown: `crm-service_auth_flow.md`
     - => Slide thuyết trình: `crm-service_auth_flow.pptx`
     - Thư mục ảnh chụp: `./screenshots/crm-service_auth_flow/`

3. **Định dạng đầu ra hỗ trợ:**
   - **Markdown (`.md`)**: Sơ đồ Mermaid, bảng thông số API, kịch bản test UI/BE chi tiết.
   - **Slide thuyết trình PowerPoint (`.pptx`)**: Tạo file `.pptx` qua script Python (`python-pptx`) chuyên nghiệp, chia slide logic (Bối cảnh, Kiến trúc, Luồng nghiệp vụ, Kịch bản test, Rủi ro kỹ thuật).
   - **Chụp ảnh màn hình trực quan (Screenshots)**:
     - Tự động hóa qua `browser_subagent` hoặc script **Puppeteer Action Capture** (helper tại `.agents/skills/doc-architect/scripts/puppeteer_action_capture.js`).
     - Bắt buộc áp dụng tiêu chuẩn chụp zoom cận cảnh (bounding box clip + con trỏ chuột ảo + ripple click) cho các bước click nút, chọn menu, điền form để người đọc thấy rõ vị trí thao tác.

---

## QUY TRÌNH THỰC HIỆN TOÀN DIỆN

### Bước 1: Tiếp nhận và Xác định Target Project
Trích xuất từ yêu cầu của User:
- `TARGET_PATH`: Đường dẫn tuyệt đối đến dự án cần đọc.
- `PROJECT_NAME`: Tên thư mục hoặc tên trong `package.json`, `pom.xml`, v.v.
- `FLOW_NAME`: Tên luồng/tính năng cần làm tài liệu.
- `OUTPUT_FORMAT`: `md`, `pptx`, hoặc cả hai.
- `NEEDS_SCREENSHOTS`: Nếu User yêu cầu chụp ảnh màn hình hoặc kèm ảnh UI minh họa.

### Bước 2: Khám phá Codebase & Tài liệu
- `list_dir`, `grep_search`, `view_file` trên `TARGET_PATH`.
- Đọc kiến trúc, schema database, routers, controllers, services, UI components liên quan đến luồng.

### Bước 3: Chụp Ảnh Màn Hình UI & Zoom Thao Tác (Khi làm tài liệu hướng dẫn người dùng)
- Kiểm tra xem cổng Dev UI của ứng dụng có đang chạy không (hoặc lấy URL trang dev/staging, ví dụ `http://localhost:5173/admin/org-units`).
- **Tiêu chuẩn chụp ảnh tài liệu hướng dẫn (User Guide Visual Standard):**
  1. **Ảnh Toàn cảnh (Overview):** Chụp bối cảnh form/trang để người dùng biết mình đang ở đâu.
  2. **Ảnh Cận cảnh Thao tác (Action Zoom via Playwright / Puppeteer):**
     - Tuyệt đối không chỉ đưa 1 ảnh toàn trang thu nhỏ làm mất chi tiết nút bấm/icon.
     - **Quy tắc tính toán khung đỏ chính xác 100% (Pixel-Perfect Bounding Box Math):**
       + **CẤM** dùng tọa độ ước lượng thủ công (`w - 230`, `15px`) vì sẽ bị lệch vị trí, chém đứt chữ hoặc rơi vào khoảng trống khi thay đổi viewport/DPI.
       + **BẮT BUỘC** trích xuất tọa độ trực tiếp từ cây DOM: `el_box = el.bounding_box()` và `cont_box = container.bounding_box()`.
       + Tính tọa độ tương đối theo hệ số màn hình (`scale = 2` cho Retina/Hi-DPI):
         $$\text{rel\_x} = (x_{el} - x_{cont}) \times \text{scale}$$
         $$\text{rel\_y} = (y_{el} - y_{cont}) \times \text{scale}$$
         $$\text{rel\_w} = w_{el} \times \text{scale},\quad \text{rel\_h} = h_{el} \times \text{scale}$$
         $$\text{box} = [\text{rel\_x} - \text{pad},\, \text{rel\_y} - \text{pad},\, \text{rel\_x} + \text{rel\_w} + \text{pad},\, \text{rel\_y} + \text{rel\_h} + \text{pad}]$$
       + Vẽ bằng `ImageDraw.rounded_rectangle(box, radius=10, outline='#ef4444', width=4)`.
     - **Đảm bảo trạng thái giao diện (Lifecycle & State):**
       + Với các nút bấm chỉ xuất hiện sau khi thao tác (nút "Sao chép" ở màn hình hoàn tất, tab OCR, nút In), bắt buộc phải điền form hợp lệ hoặc kích hoạt đúng React/Vue state để phần tử thực tế hiện diện trên DOM trước khi chụp. Không chụp khi component còn rỗng hoặc đang unmount.
- Lưu ảnh vào thư mục: `./screenshots/[PROJECT_NAME]_[FLOW_NAME]/[step_name].png` hoặc `docs/images/steps/`.
- Nhúng đường dẫn ảnh vào Markdown: `![Mô tả ảnh](./screenshots/.../step1.png)`.

### Bước 4: Biên soạn File Tài Liệu

#### 1. Định dạng Markdown (`[PROJECT_NAME]_[FLOW_NAME].md`)
Bao gồm:
- **Tổng quan (Overview)** & Actors.
- **Sơ đồ Mermaid** (Flowchart hoặc Sequence Diagram).
- **Chi tiết API / Data Model / Invariants**.
- **Kịch bản kiểm thử (Test Scenarios)** kèm ảnh chụp màn hình minh họa (nếu có).
- **Quy chuẩn Markdown sạch (Clean Markdown Standard):**
  + **Tuyệt đối KHÔNG dùng ký tự vẽ khung viền ASCII thủ công** (`┌───`, `│`, `└───`, `+---`) trong code block markdown. Khi hiển thị bằng font chữ văn phòng thông thường (Segoe UI, Arial), chúng bị co giãn tỉ lệ gây đứt gãy, xô lệch xấu xí. Hãy dùng Markdown Callout (`> ### ...`) hoặc bảng Markdown chuẩn.
  + **Tách biệt rạch ròi thẻ in nghiêng nội tuyến (`em`) và chú thích ảnh (`.image-caption`):**
    Tuyệt đối không gán `em { display: block; text-align: center; }` trong CSS, vì nó sẽ bẻ gãy mọi từ in nghiêng nằm trong câu văn (`*Quyết định*`, `*Công văn*`...) thành các dòng riêng lẻ căn giữa, khiến người đọc tưởng nhầm là chú thích ảnh bị thiếu hình chụp. Chú thích ảnh phải có class riêng (ví dụ: `.image-caption`).

#### 2. Định dạng PDF (`.pdf`) Chuẩn Hóa
- Kết xuất qua Chrome Headless từ template HTML5/CSS3 chuyên nghiệp.
- Cấu hình trang in chuẩn A4, lề 18mm, số trang tự động ở chân trang (`@page { @bottom-center { content: "Trang " counter(page); } }`).
- Nhúng ảnh với đường dẫn tuyệt đối dạng URI `file:///` để Chrome Headless đọc mượt mà.

#### 3. Định dạng Microsoft Word (`.docx`) Cao Cấp (Phương Pháp Kế Thừa PDF)
Khi người dùng cần bản Word (`.docx`) để chỉnh sửa, lưu hành nội bộ:
- **Phương pháp tối ưu nhất:** Kết xuất bản PDF chuẩn trước, sau đó dùng thư viện `pdf2docx` trong Python để chuyển đổi trực tiếp PDF sang DOCX:
  ```python
  from pdf2docx import Converter
  cv = Converter("document.pdf")
  cv.convert("document.docx", start=0, end=None)
  cv.close()
  ```
- **Lợi thế vượt trội:** `pdf2docx` phân tích các lớp đồ họa vector và tọa độ hình học thực tế trên PDF (khung card box có viền màu bên trái, màu nền shading, bảng kẻ ô, căn lề, hình ảnh) và chuyển thẳng thành các phần tử Word Table/Shape chuẩn. Nhờ đó, file Word thừa hưởng **100% giao diện đẹp mắt của bản PDF** thay vì bị đơn điệu như khi parse text thô.
- **Quy tắc an toàn Windows File Lock:** Nếu người dùng đang mở file Word trên máy tính, hệ điều hành sẽ khóa file và báo `PermissionError [Errno 13]`. Luôn dùng cơ chế `try...except` để xuất sang file dự phòng `[file]_v2.docx` và nhắc người dùng đóng Microsoft Word trước khi ghi đè.

#### 4. Định dạng Slide PowerPoint (`[PROJECT_NAME]_[FLOW_NAME].pptx`)
Khi User yêu cầu làm slide/pptx:
- Viết một script Python tự động (dùng thư viện `python-pptx`):
  ```python
  from pptx import Presentation
  from pptx.util import Inches, Pt
  from pptx.dml.color import RGBColor
  # Tạo presentation chuẩn 16:9, màu sắc hiện đại, chèn tiêu đề, bullet points, sơ đồ, ảnh chụp
  ```
- Chạy script qua `run_command` để xuất ra file `[PROJECT_NAME]_[FLOW_NAME].pptx` ngay tại thư mục hiện tại.

### Bước 5: Báo cáo Kết quả
- Thông báo cho User tên các file Markdown, PDF, DOCX và PPTX đã sinh ra.
- Trình bày tóm tắt nội dung và cung cấp link file trực tiếp để User mở kiểm tra.

---

## BÀI HỌC THỰC CHIẾN & NGUYÊN TẮC BẤT DI BẤT DỊCH (LESSONS LEARNED)

1. **Khung đỏ minh họa nút bấm:** Bắt buộc dùng `DOM Bounding Box` + `DeviceScaleFactor` toán học để tính tọa độ relative. Tuyệt đối không phỏng đoán pixel.
2. **Không dùng ASCII Box Art trong Markdown:** Dùng Callout Card (`> ### ...`) hoặc Table để cả PDF và Word đều hiển thị khối hộp viền màu chuyên nghiệp.
3. **Giữ nguyên thẻ in nghiêng `em` là `inline`:** Chỉ dùng class riêng `.image-caption` cho dòng chú thích dưới ảnh, tránh làm rơi rụng các từ in nghiêng trong văn bản.
4. **Chuỗi chuyển đổi tối thượng cho tài liệu văn phòng:** `Markdown -> HTML5/CSS3 -> PDF (Chrome Headless) -> DOCX (pdf2docx)`. Đảm bảo cả hai định dạng đồng nhất 100% về mặt thẩm mỹ và bố cục.
