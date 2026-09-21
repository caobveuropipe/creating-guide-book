# HƯỚNG DẪN CHI TIẾT KIỂM THỬ THAO TÁC UI THỰC TẾ — LUỒNG 1: CƠ CẤU TỔ CHỨC & ĐƠN VỊ (`OrgUnits`)

> **Mục tiêu**: Cung cấp tài liệu quy chuẩn từng bước (Step-by-step Execution Guide) cho bất kỳ Agent AI hoặc Tester con người nào có thể mở trình duyệt, thao tác trực tiếp trên giao diện như một người dùng thực tế: **Xem/Duyệt cây, Thêm đơn vị, Sửa đơn vị, Xóa đơn vị, Đổi trạng thái hoạt động (Cascade Deactivate Guard), Quản lý Line nhân sự**.
> 
> 📌 **NGUYÊN TẮC BẤT BIẾN**: **MỖI STEP THAO TÁC ĐỀU BẮT BUỘC PHẢI CÓ 1 ẢNH CHỤP MÀN HÌNH MINH CHỨNG** ghi nhận đúng trạng thái UI tại thời điểm đó.
>
> **Môi trường & Route**:
> - URL Giao diện: `http://localhost:5173/admin/org-units` (hoặc từ Trang chủ -> Quản trị hệ thống -> Cơ cấu tổ chức & Đơn vị)
> - Quyền thực hiện: **SuperAdmin (SA)** hoặc **Enterprise Admin (EA)**

---

## 📸 TỔNG HỢP DANH MỤC 10 ẢNH CHỤP MÀN HÌNH BẮT BUỘC (MỖI STEP 1 ẢNH)

| STT | Mã Ảnh Chụp | Tên Step Kiểm Thử | Thành Phần Giao Diện & Tọa Độ Trọng Tâm Cần Chụp |
|:---:|---|---|---|
| **1** | `SHOT-01-NAV-HIERARCHY` | **Step 1: Điều hướng cây 5 cấp** | Toàn cảnh 5 cột màu sắc (Khối -> BU -> Phòng -> Bộ phận -> Tổ team) khi click chọn đổ tầng |
| **2** | `SHOT-02-SEARCH-FILTER` | **Step 2: Bộ lọc Khối & Search** | Trạng thái sau khi lọc 1 Khối + gõ từ khóa tìm kiếm + switch "Hiển thị đơn vị vô hiệu hóa" |
| **3** | `SHOT-03-HOVER-MENU` | **Step 3: Hover mở Menu 3 chấm** | Con trỏ hover vào hàng đơn vị, icon `...` hiện ra và menu dropdown xổ xuống các nút chức năng |
| **4** | `SHOT-04-ADD-CONTEXT-MODAL` | **Step 4: Modal tạo mới 1-Click** | Hộp thoại Modal thêm mới có Banner màu xanh khóa ngữ cảnh Cha (`isContextLocked`) |
| **5** | `SHOT-05-CREATE-SUCCESS` | **Step 5: Xác nhận tạo thành công** | Toast thông báo *"Tạo đơn vị thành công"* và đơn vị mới hiển thị ngay lập tức trên cột |
| **6** | `SHOT-06-EDIT-MODAL` | **Step 6: Modal Chỉnh sửa đơn vị** | Modal "Sửa Phòng ban", form đổi tên đơn vị, tự động trim khoảng trắng thừa |
| **7** | `SHOT-07-TOGGLE-LEAF` | **Step 7: Tắt đơn vị lá an toàn** | Menu "Vô hiệu hóa" đơn vị lá (không con), đơn vị chuyển sang trạng thái gạch ngang `line-through` |
| **8** | `SHOT-08-CASCADE-GUARD-MODAL`| **Step 8: Cảnh báo Cascade Guard** | Hộp thoại Modal "Xác nhận Cascade Deactivate" hiển thị preview số lượng nodes con bị ảnh hưởng |
| **9** | `SHOT-09-DELETE-CONFIRM` | **Step 9: Xác nhận Xóa đơn vị** | Hộp thoại Popconfirm / Modal xác nhận xóa đơn vị màu đỏ (quyền SuperAdmin) |
| **10** | `SHOT-10-LINE-GLOBAL-TAB` | **Step 10: Quản lý Line Nhân Sự** | Tab "Danh Mục Line Nhân Sự Global", bảng Table danh sách Line, nút "+ Thêm Line Nhân sự" |

---

## 🚀 CHI TIẾT TỪNG STEP THAO TÁC & VỊ TRÍ CHỤP ẢNH

---

### STEP 1: XEM & ĐIỀU HƯỚNG CÂY PHÂN CẤP 5 TẦNG
- **Mục đích**: Kiểm tra cây phân cấp tổ chức hiển thị liền mạch 5 cấp, không gãy nhánh, không lặp node.
- **Thao tác người dùng**:
  1. Mở trình duyệt vào route `/admin/org-units`.
  2. Tại tab *"Cấu Trúc Tổ Chức Phân Cấp (5 Tầng)"*, quan sát 5 cột màu:
     - Cột 1: Khối (Tím) -> Cột 2: BU (Xanh dương) -> Cột 3: Phòng ban (Xanh ngọc) -> Cột 4: Bộ phận (Cam) -> Cột 5: Nhóm team (Hồng).
  3. Click chọn 1 Khối ở Cột 1 (VD: `Khối Nội Dung`).
  4. Cột 2 & Cột 3 tự động bung danh sách các BU/Phòng ban trực thuộc. Click tiếp vào 1 Phòng ban -> Cột 4 bung Bộ phận -> Cột 5 bung Nhóm/Team.
- **Tiêu chuẩn đạt (Pass Criteria)**: Node được chọn có viền sáng và border-left 3px; các cột có số lượng node trong ngoặc đơn (VD: `Phòng ban (8)`).
- 📸 **BẰNG CHỨNG CHỤP ẢNH (ẢNH 1)**:
  - **Tên file**: `screenshots/annotated_steps/01_step_navigation_hierarchy.png`
  - **Khu vực chụp**: Toàn bộ khung 5 cột cascading đang mở thông suốt từ Khối -> BU -> Phòng ban -> Bộ phận -> Nhóm team.

---

### STEP 2: LỌC THEO KHỐI & TÌM KIẾM NHANH
- **Mục đích**: Xác thực bộ lọc Dropdown Khối, ô Search tên đơn vị và công tắc xem đơn vị đã vô hiệu hóa hoạt động chính xác.
- **Thao tác người dùng**:
  1. Di chuột lên thanh công cụ phía trên bảng cây.
  2. Click dropdown **"Lọc theo Khối"** -> Chọn `Khối Kinh Doanh`. Cây chỉ giữ lại các nhánh thuộc Khối này.
  3. Click vào ô input **"Tìm kiếm tên..."** -> Gõ từ khóa `Phát triển`. Quan sát các node không chứa từ khóa tự động ẩn đi.
  4. Bật công tắc switch **"Hiển thị đơn vị đã vô hiệu hóa"** -> Các đơn vị inactive hiện ra với định dạng chữ gạch ngang (`line-through`).
- **Tiêu chuẩn đạt (Pass Criteria)**: Cây lọc tức thì, không bị delay giật lag, switch toggle mượt mà.
- 📸 **BẰNG CHỨNG CHỤP ẢNH (ẢNH 2)**:
  - **Tên file**: `screenshots/annotated_steps/02_step_search_and_filters.png`
  - **Khu vực chụp**: Thanh toolbar góc trên có giá trị lọc Khối, từ khóa search và kết quả cây đã được lọc thu gọn.

---

### STEP 3: RÊ CHUỘT MỞ MENU HÀNH ĐỘNG 3 CHẤM (`...`)
- **Mục đích**: Kiểm tra tính năng ngữ cảnh (Context-Aware Action Menu) xuất hiện đúng khi hover từng dòng.
- **Thao tác người dùng**:
  1. Rê chuột (hover) vào một dòng đơn vị bất kỳ (VD: `Phòng Kỹ Thuật`).
  2. Quan sát icon nút 3 chấm `...` (MoreOutlined) xuất hiện ở phía bên phải dòng.
  3. Click chuột vào icon `...` để làm bật Menu Dropdown xổ xuống.
  4. Quan sát các action items: *"+ Thêm Bộ phận trực thuộc"*, *"Sửa tên đơn vị"*, *"Vô hiệu hóa"*, *"Vô hiệu hóa nhánh"*, *"Xóa đơn vị"*.
- **Tiêu chuẩn đạt (Pass Criteria)**: Menu xổ ra đúng vị trí dưới nút, không bị che khuất bởi cột bên cạnh.
- 📸 **BẰNG CHỨNG CHỤP ẢNH (ẢNH 3)**:
  - **Tên file**: `screenshots/annotated_steps/03_step_hover_dropdown_menu.png`
  - **Khu vực chụp**: Hàng đơn vị đang hover kèm menu ngữ cảnh 3 chấm đang mở hiển thị các nút thao tác.

---

### STEP 4: MỞ MODAL THÊM ĐƠN VỊ CON NGỮ CẢNH 1-CLICK
- **Mục đích**: Kiểm tra cơ chế tự động điền đơn vị cha và khóa ngữ cảnh (`isContextLocked`), ngăn người dùng chọn nhầm cha.
- **Thao tác người dùng**:
  1. Từ menu 3 chấm ở Step 3, click chọn item màu nổi bật: **"+ Thêm Bộ phận trực thuộc"** (hoặc click nút `+` ở đầu cột Bộ phận).
  2. Hộp thoại Modal hiện ra giữa màn hình:
     - Quan sát khung thông tin ngữ cảnh màu xanh (`#f6ffed`) ở đầu modal:
       - Tag cấp tạo mới: `Bộ phận`
       - Đơn vị cha trực thuộc: `Phòng Kỹ Thuật`
       - Khối kế thừa: `Khối Công Nghệ`
     - Các trường chọn Cấp và Đơn vị cha đã được tự động khóa ẩn an toàn.
  3. Click vào ô input **"Tên Bộ phận"** -> Nhập tên: `Bộ Phận QA/QC Tự Động`.
- **Tiêu chuẩn đạt (Pass Criteria)**: Người dùng chỉ cần gõ duy nhất trường Tên, không phải cấu hình phức tạp.
- 📸 **BẰNG CHỨNG CHỤP ẢNH (ẢNH 4)**:
  - **Tên file**: `screenshots/annotated_steps/04_step_modal_create_context.png`
  - **Khu vực chụp**: Modal tạo mới có hiển thị rõ banner màu xanh khóa ngữ cảnh cha và ô nhập tên đơn vị.

---

### STEP 5: XÁC NHẬN TẠO MỚI THÀNH CÔNG & ĐỐI SOÁT REALTIME
- **Mục đích**: Đảm bảo dữ liệu ghi vào database và cập nhật giao diện ngay lập tức mà không cần reload trang.
- **Thao tác người dùng**:
  1. Tại Modal ở Step 4, click nút màu xanh **"Lưu"** / **"OK"**.
  2. Quan sát Modal tự động đóng lại với loading spinner mượt mà.
  3. Quan sát thông báo popup góc trên bên phải màn hình: *"Tạo đơn vị thành công"*.
  4. Nhìn vào cột Bộ phận: Tên `Bộ Phận QA/QC Tự Động` vừa tạo đã xuất hiện ngay trong danh sách.
- **Tiêu chuẩn đạt (Pass Criteria)**: Network Tab (F12) ghi nhận request `POST /api/org-units` trả về mã status `201 Created`.
- 📸 **BẰNG CHỨNG CHỤP ẢNH (ẢNH 5)**:
  - **Tên file**: `screenshots/annotated_steps/05_step_create_success_toast.png`
  - **Khu vực chụp**: Góc màn hình có thông báo Toast thành công và dòng đơn vị mới tạo nằm trên cột.

---

### STEP 6: CHỈNH SỬA THÔNG TIN ĐƠN VỊ
- **Mục đích**: Kiểm tra chức năng đổi tên đơn vị, kiểm tra trigger normalize name và trim khoảng trắng.
- **Thao tác người dùng**:
  1. Rê chuột vào đơn vị vừa tạo ở Step 5 -> Click icon `...` -> Chọn **"Sửa tên đơn vị"** (icon hình cây bút `EditOutlined`).
  2. Modal **"Sửa Bộ phận"** mở lên:
     - Ô tên đang hiển thị giá trị cũ: `Bộ Phận QA/QC Tự Động`.
  3. Nhập sửa lại thành: `Bộ Phận QA/QC Tự Động (Đã Cập Nhật)`.
  4. Bấm nút **"Lưu"** / **"Cập nhật"**.
- **Tiêu chuẩn đạt (Pass Criteria)**: Tên trên bảng lập tức đổi sang tên mới; API `PATCH /api/org-units/:id` trả về `200 OK`.
- 📸 **BẰNG CHỨNG CHỤP ẢNH (ẢNH 6)**:
  - **Tên file**: `screenshots/annotated_steps/06_step_modal_edit_unit.png`
  - **Khu vực chụp**: Modal sửa tên đang mở kèm form nhập tên mới.

---

### STEP 7: VÔ HIỆU HÓA ĐƠN VỊ LÁ (AN TOÀN)
- **Mục đích**: Kiểm tra tính năng deactivate một đơn vị không có nhánh con trực thuộc.
- **Thao tác người dùng**:
  1. Rê chuột vào đơn vị lá vừa sửa (`Bộ Phận QA/QC Tự Động (Đã Cập Nhật)`).
  2. Click menu `...` -> Chọn **"Vô hiệu hóa"** (icon `StopOutlined` màu đỏ).
  3. Hệ thống chuyển đổi trạng thái đơn vị sang Inactive.
  4. Bật công tắc "Hiển thị đơn vị đã vô hiệu hóa": Tên đơn vị hiển thị nét gạch ngang giữa chữ (`text-decoration: line-through`) và mờ đi (opacity 0.6).
- **Tiêu chuẩn đạt (Pass Criteria)**: Chuyển trạng thái thành công, không gặp bất kỳ thông báo lỗi nào.
- 📸 **BẰNG CHỨNG CHỤP ẢNH (ẢNH 7)**:
  - **Tên file**: `screenshots/annotated_steps/07_step_toggle_leaf_inactive.png`
  - **Khu vực chụp**: Dòng đơn vị lá hiển thị trạng thái chữ gạch ngang và nút kích hoạt lại.

---

### STEP 8: CƠ CHẾ BẢO VỆ CASCADE DEACTIVATION GUARD
- **Mục đích**: Xác thực chốt chặn an toàn (P6 Checkpoint) — khi tắt một node cha, hệ thống bắt buộc phải tính toán số node con bị ảnh hưởng và yêu cầu xác nhận.
- **Thao tác người dùng**:
  1. Chọn một đơn vị cấp trên đang có nhiều con (VD: Một BU hoặc một Phòng ban có 3 Bộ phận trực thuộc).
  2. Thử bấm "Vô hiệu hóa" trực tiếp: Hệ thống báo cảnh báo *"Đơn vị có con đang hoạt động. Vui lòng dùng chức năng Cascade Deactivate."*
  3. Mở menu `...` của đơn vị đó -> Click chọn dòng có chữ màu cam: **"Vô hiệu hóa nhánh"** (Cascade Deactivate).
  4. Modal **"Xác nhận Cascade Deactivate"** bật lên:
     - Đọc thông báo: *"Bạn đang chọn vô hiệu hóa node [Tên Node]. Hành động này sẽ vô hiệu hóa tổng cộng [X] nodes con trong nhánh."*
     - Có nút đỏ **"Vô hiệu hóa toàn bộ"** và nút **"Hủy"**.
- **Tiêu chuẩn đạt (Pass Criteria)**: API `preview-cascade-deactivate` tính toán chính xác số lượng node con bị ảnh hưởng, đảm bảo không node nào bị mồ côi.
- 📸 **BẰNG CHỨNG CHỤP ẢNH (ẢNH 8)**:
  - **Tên file**: `screenshots/annotated_steps/08_step_cascade_deactivate_modal.png`
  - **Khu vực chụp**: Hộp thoại Modal Cascade Deactivate hiển thị rõ số lượng nodes con bị ảnh hưởng và nút bấm xác nhận màu đỏ.

---

### STEP 9: XÓA ĐƠN VỊ TỔ CHỨC (SUPER ADMIN ONLY)
- **Mục đích**: Kiểm tra chức năng xóa đơn vị và hộp thoại xác nhận cảnh báo an toàn.
- **Thao tác người dùng**:
  1. Rê chuột vào đơn vị test thử nghiệm (đã tắt).
  2. Click menu `...` -> Chọn dòng cuối cùng có chữ màu đỏ: **"Xóa đơn vị"** (icon `DeleteOutlined`).
  3. Hộp thoại Popconfirm/Modal xác nhận bật lên:
     - Tiêu đề: *"Xác nhận xóa đơn vị"*
     - Nội dung: *"Bạn có chắc chắn muốn xóa '[Tên đơn vị]' khỏi danh mục tổ chức?"*
     - Có 2 nút: **"Xóa"** (màu đỏ) và **"Hủy"**.
  4. Click nút **"Xóa"** -> Đơn vị biến mất hoàn toàn khỏi bảng cây.
- **Tiêu chuẩn đạt (Pass Criteria)**: API `DELETE /api/org-units/:id` trả về `200 OK`; chỉ tài khoản SuperAdmin mới thấy hành động này.
- 📸 **BẰNG CHỨNG CHỤP ẢNH (ẢNH 9)**:
  - **Tên file**: `screenshots/annotated_steps/09_step_delete_confirm_dialog.png`
  - **Khu vực chụp**: Hộp thoại Popconfirm/Modal xác nhận xóa màu đỏ hiển thị trên màn hình.

---

### STEP 10: QUẢN LÝ DANH MỤC LINE NHÂN SỰ GLOBAL
- **Mục đích**: Kiểm tra bảng quản lý danh mục Line nhân sự độc lập, thêm mới Line và bật/tắt trạng thái hoạt động.
- **Thao tác người dùng**:
  1. Nhìn lên đầu Card quản lý, click chuyển tab sang:
     👉 **"Danh Mục Line Nhân Sự Global"** (Tab thứ 2).
  2. Quan sát bảng Ant Design Table hiển thị danh sách các Line nhân sự:
     - Các cột: Tên Line Nhân sự, Mã định danh (Code), Cấp (`line_nhan_su`), Khối, Trạng thái (Tag xanh Hoạt động / Tag xám Vô hiệu hóa), Thao tác.
  3. Click nút màu xanh góc trên: **"+ Thêm Line Nhân sự"**.
  4. Nhập tên Line mới: `Line Test Hệ Thống Mới` -> Bấm **"Lưu"**.
  5. Thử bấm icon cấm đỏ tại cột Thao tác để vô hiệu hóa Line.
- **Tiêu chuẩn đạt (Pass Criteria)**: Bảng load nhanh, phân trang đầy đủ, thêm và sửa trạng thái Line thành công.
- 📸 **BẰNG CHỨNG CHỤP ẢNH (ẢNH 10)**:
  - **Tên file**: `screenshots/annotated_steps/10_step_line_global_management.png`
  - **Khu vực chụp**: Toàn cảnh giao diện Tab Danh Mục Line Nhân Sự Global, bảng danh sách Table và nút Thêm Line.

---

## 🤖 HƯỚNG DẪN KẾT NỐI TRÌNH DUYỆT ĐÃ LOGIN SẴN & TỰ ĐỘNG CHỤP

> ⚠️ **QUY TẮC ĐĂNG NHẬP**: Tuyệt đối **KHÔNG** mở trình duyệt trắng ẩn danh (Incognito/Fresh Session) vì sẽ bị chặn ở màn hình đăng nhập SSO/Supabase Auth hoặc thiếu token quyền SuperAdmin.
> AI Agent phải **tận dụng trình duyệt đang mở hoặc khởi chạy với Profile đã đăng nhập sẵn** của người dùng.

### Cách 1: Kết nối trực tiếp vào Chrome đang mở qua Remote Debugging (Khuyên dùng)
Trình duyệt Chrome của người dùng đã đăng nhập sẵn tài khoản quản trị:
```bash
# 1. Khởi chạy Chrome với remote debugging hoặc kết nối qua cổng debug (CDP):
# "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="C:\Users\PC1433\AppData\Local\Google\Chrome\User Data"

# 2. Agent kết nối CDP (Chrome DevTools Protocol) tới tab đang mở:
# Điều hướng tới: http://localhost:5173/admin/org-units
# (Trình duyệt giữ nguyên toàn bộ Session Cookies, Supabase Access Token, và Local Storage đã đăng nhập)
```

### Cách 2: Chạy Playwright/Puppeteer/Selenium kế thừa User Data Directory
```python
# Ví dụ cấu hình Playwright kế thừa profile đã đăng nhập:
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    # Mở persistent context với User Data thật của người dùng
    browser = p.chromium.launch_persistent_context(
        user_data_dir=r"C:\Users\PC1433\AppData\Local\Google\Chrome\User Data",
        channel="chrome",
        headless=False,
        args=["--start-maximized"]
    )
    page = browser.pages[0] if browser.pages else browser.new_page()
    page.goto("http://localhost:5173/admin/org-units")
    # Đã ở trạng thái ĐĂNG NHẬP SẴN với quyền SuperAdmin!
```

---

### Kịch bản tự động đóng vai người dùng thực hiện từng thao tác click chuột & chụp ảnh:

> 🎯 **Quy ước thao tác**: Mọi hành động của AI Agent phải mô phỏng chính xác hành vi của người dùng: Di chuyển chuột (hover) -> Click phần tử -> Nhập dữ liệu (type) -> Chờ phản hồi (wait) -> Chụp ảnh màn hình (screenshot).

```python
# ==============================================================================
# KỊCH BẢN THAO TÁC NGƯỜI DÙNG THỰC TẾ TRÊN UI (LUỒNG 1 - ORG UNITS)
# ==============================================================================

# [STEP 1] XEM & ĐIỀU HƯỚNG CÂY 5 TẦNG
# 1. Người dùng mở trang quản trị đơn vị:
page.goto("http://localhost:5173/admin/org-units")
# 2. Chờ cây 5 cột hiển thị đầy đủ (Cột Khối màu tím xuất hiện):
page.wait_for_selector("text=Khối")
# 3. Click chuột vào node Khối đầu tiên (VD: Khối Nội Dung):
page.locator(".ant-card div:has-text('Khối') ~ div >> text=Khối Nội Dung").first.click()
# 4. Click chuột tiếp vào 1 BU ở Cột 2 (VD: BU Game):
page.locator(".ant-card div:has-text('BU') ~ div >> text=BU Game").first.click()
# 5. Click chuột tiếp vào 1 Phòng ban ở Cột 3 (VD: Phòng Sản Xuất):
page.locator(".ant-card div:has-text('Phòng ban') ~ div >> text=Phòng Sản Xuất").first.click()
# 📸 CHỤP ẢNH 1:
page.screenshot(path="screenshots/annotated_steps/01_step_navigation_hierarchy.png")


# [STEP 2] SỬ DỤNG BỘ LỌC KHỐI & THANH TÌM KIẾM
# 1. Click vào dropdown "Lọc theo Khối" trên thanh công cụ:
page.locator(".ant-select:has-text('Lọc theo Khối')").click()
# 2. Click chọn item "Khối Kinh Doanh":
page.locator(".ant-select-dropdown >> text=Khối Kinh Doanh").click()
# 3. Click vào ô input tìm kiếm và gõ từ khóa:
page.locator("input[placeholder='Tìm kiếm tên...']").fill("Phát triển")
# 4. Bấm Enter để tìm kiếm:
page.locator("input[placeholder='Tìm kiếm tên...']").press("Enter")
# 5. Click gạt công tắc switch "Hiển thị đơn vị đã vô hiệu hóa":
page.locator(".ant-switch").click()
# 📸 CHỤP ẢNH 2:
page.screenshot(path="screenshots/annotated_steps/02_step_search_and_filters.png")


# [STEP 3] RÊ CHUỘT (HOVER) ĐỂ XUẤT HIỆN MENU 3 CHẤM
# 1. Xóa trắng ô tìm kiếm để reset danh sách cây:
page.locator(".ant-input-clear-icon").click()
# 2. Di chuyển con trỏ chuột (hover) vào dòng Phòng ban:
unit_row = page.locator("div[style*='cursor: pointer']:has-text('Phòng Kỹ Thuật')").first
unit_row.hover()
# 3. Nút '...' (MoreOutlined) xuất hiện bên phải dòng, click vào nút '...':
unit_row.locator("button:has(.anticon-more)").click()
# 4. Chờ Menu dropdown xổ xuống với các lựa chọn:
page.wait_for_selector(".ant-dropdown:not(.ant-dropdown-hidden)")
# 📸 CHỤP ẢNH 3:
page.screenshot(path="screenshots/annotated_steps/03_step_hover_dropdown_menu.png")


# [STEP 4] MỞ MODAL TẠO MỚI ĐƠN VỊ CON NGỮ CẢNH 1-CLICK
# 1. Click vào lựa chọn "+ Thêm Bộ phận trực thuộc" trên menu đang mở:
page.locator(".ant-dropdown-menu-item:has-text('Thêm Bộ phận trực thuộc')").click()
# 2. Chờ Modal hiện ra với Banner xanh khóa ngữ cảnh cha:
page.wait_for_selector(".ant-modal-content:has-text('Cấp tạo mới: Bộ phận')")
# 3. Click vào ô input "Tên Bộ phận" và gõ tên đơn vị mới:
page.locator(".ant-modal-content input[placeholder*='tên']").fill("Bộ Phận QA/QC Tự Động")
# 📸 CHỤP ẢNH 4:
page.screenshot(path="screenshots/annotated_steps/04_step_modal_create_context.png")


# [STEP 5] BẤM LƯU TẠO MỚI & XÁC NHẬN TOAST THÀNH CÔNG
# 1. Click nút màu xanh "Lưu" hoặc "OK" ở góc dưới Modal:
page.locator(".ant-modal-footer button.ant-btn-primary").click()
# 2. Chờ xuất hiện Toast popup thông báo thành công ở góc phải trên:
page.wait_for_selector(".ant-message-success:has-text('thành công')")
# 3. Kiểm tra tên đơn vị vừa tạo hiển thị trên cột Bộ phận:
page.wait_for_selector("text=Bộ Phận QA/QC Tự Động")
# 📸 CHỤP ẢNH 5:
page.screenshot(path="screenshots/annotated_steps/05_step_create_success_toast.png")


# [STEP 6] CHỈNH SỬA TÊN ĐƠN VỊ
# 1. Rê chuột vào đơn vị vừa tạo:
new_unit = page.locator("div[style*='cursor: pointer']:has-text('Bộ Phận QA/QC Tự Động')").first
new_unit.hover()
# 2. Click nút '...' của dòng đó:
new_unit.locator("button:has(.anticon-more)").click()
# 3. Click chọn "Sửa tên đơn vị":
page.locator(".ant-dropdown-menu-item:has-text('Sửa tên đơn vị')").click()
# 4. Chờ Modal sửa mở lên, xóa tên cũ và nhập tên mới:
name_input = page.locator(".ant-modal-content input[placeholder*='tên']")
name_input.fill("Bộ Phận QA/QC Tự Động (Đã Cập Nhật)")
# 📸 CHỤP ẢNH 6:
page.screenshot(path="screenshots/annotated_steps/06_step_modal_edit_unit.png")
# 5. Click "Lưu" để đóng modal:
page.locator(".ant-modal-footer button.ant-btn-primary").click()


# [STEP 7] VÔ HIỆU HÓA ĐƠN VỊ LÁ (AN TOÀN)
# 1. Rê chuột vào đơn vị lá vừa sửa tên:
leaf_unit = page.locator("div[style*='cursor: pointer']:has-text('Bộ Phận QA/QC Tự Động (Đã Cập Nhật)')").first
leaf_unit.hover()
# 2. Click nút '...':
leaf_unit.locator("button:has(.anticon-more)").click()
# 3. Click chọn "Vô hiệu hóa":
page.locator(".ant-dropdown-menu-item:has-text('Vô hiệu hóa')").click()
# 4. Chờ toast thành công và quan sát tên đơn vị bị gạch ngang:
page.wait_for_selector("div[style*='line-through']:has-text('Bộ Phận QA/QC Tự Động')")
# 📸 CHỤP ẢNH 7:
page.screenshot(path="screenshots/annotated_steps/07_step_toggle_leaf_inactive.png")


# [STEP 8] CƠ CHẾ BẢO VỆ CASCADE DEACTIVATION GUARD (NODE CHA)
# 1. Rê chuột vào một node cha đang có nhiều node con (VD: Phòng ban cấp trên):
parent_unit = page.locator("div[style*='cursor: pointer']:has-text('Phòng Kỹ Thuật')").first
parent_unit.hover()
# 2. Click nút '...':
parent_unit.locator("button:has(.anticon-more)").click()
# 3. Click chọn dòng chữ cam "Vô hiệu hóa nhánh":
page.locator(".ant-dropdown-menu-item:has-text('Vô hiệu hóa nhánh')").click()
# 4. Chờ Modal "Xác nhận Cascade Deactivate" hiện ra với số lượng nodes ảnh hưởng:
page.wait_for_selector(".ant-modal-title:has-text('Cascade Deactivate')")
# 📸 CHỤP ẢNH 8:
page.screenshot(path="screenshots/annotated_steps/08_step_cascade_deactivate_modal.png")
# 5. Click nút "Hủy" để bảo toàn dữ liệu:
page.locator(".ant-modal-footer button:has-text('Hủy')").click()


# [STEP 9] XÓA ĐƠN VỊ TỔ CHỨC (SUPER ADMIN)
# 1. Rê chuột vào đơn vị thử nghiệm đã tắt ở Step 7:
test_unit = page.locator("div[style*='cursor: pointer']:has-text('Bộ Phận QA/QC Tự Động')").first
test_unit.hover()
# 2. Click nút '...':
test_unit.locator("button:has(.anticon-more)").click()
# 3. Click chọn "Xóa đơn vị" (dòng màu đỏ):
page.locator(".ant-dropdown-menu-item:has-text('Xóa đơn vị')").click()
# 4. Chờ Hộp thoại Modal/Popconfirm xác nhận xóa màu đỏ hiện ra:
page.wait_for_selector(".ant-modal-confirm-body:has-text('Xác nhận xóa đơn vị')")
# 📸 CHỤP ẢNH 9:
page.screenshot(path="screenshots/annotated_steps/09_step_delete_confirm_dialog.png")
# 5. Click nút màu đỏ "Xóa" để xác nhận xóa khỏi hệ thống:
page.locator(".ant-modal-confirm-btns button.ant-btn-dangerous").click()


# [STEP 10] CHUYỂN TAB QUẢN LÝ LINE NHÂN SỰ GLOBAL
# 1. Di chuyển chuột lên đầu trang và click vào Tab "Danh Mục Line Nhân Sự Global":
page.locator(".ant-tabs-tab:has-text('Danh Mục Line Nhân Sự Global')").click()
# 2. Chờ bảng Ant Design Table nạp danh sách các Line nhân sự:
page.wait_for_selector(".ant-table-tbody tr")
# 3. Click nút màu xanh "+ Thêm Line Nhân sự" để bật Modal:
page.locator("button:has-text('Thêm Line Nhân sự')").click()
# 4. Chờ modal thêm line mở ra:
page.wait_for_selector(".ant-modal-title:has-text('Line Nhân sự')")
# 📸 CHỤP ẢNH 10:
page.screenshot(path="screenshots/annotated_steps/10_step_line_global_management.png")
```

