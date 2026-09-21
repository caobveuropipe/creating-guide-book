# HƯỚNG DẪN SỬ DỤNG HỆ THỐNG QUẢN TRỊ NHÂN SỰ (VCC HR TOOL)
*Tài liệu hướng dẫn thao tác chi tiết dựa trên ảnh chụp thực tế từ hệ thống Cloud Run Dev.*

---

## MỤC LỤC
1. [Tổng quan Giao diện & Đăng nhập](#1-tổng-quan-giao-diện--đăng-nhập)
2. [Quản lý Cơ cấu Tổ chức & Đơn vị (Org Units)](#2-quản-lý-cơ-cấu-tổ-chức--đơn-vị-org-units)
3. [Quản lý Danh sách Nhân sự & Tìm kiếm](#3-quản-lý-danh-sách-nhân-sự--tìm-kiếm)
4. [Quy trình Tiếp nhận & Onboarding Nhân sự mới](#4-quy-trình-tiếp-nhận--onboarding-nhân-sự-mới)
5. [Quy trình Rà soát & Phê duyệt tại Phòng Chờ (Pending Room)](#5-quy-trình-rà-soát--phê-duyệt-tại-phòng-chờ-pending-room)
6. [Quản lý Lương, Thưởng & Chốt Kỳ Dữ liệu](#6-quản-lý-lương-thưởng--chốt-kỳ-dữ-liệu)

---

## 1. Tổng quan Giao diện & Đăng nhập

Hệ thống **VCC HR Tool** sử dụng cơ chế bảo mật xác thực một chạm qua Google Workspace SSO.

![Màn hình Đăng nhập](file:///d:/Project_VCC/Test_dev/screenshots/annotated/01_login_annotated.png)

### Các bước đăng nhập:
1. **Truy cập hệ thống**: Mở trình duyệt và truy cập liên kết: `https://vcc-hr-frontend-dev-69050732080.asia-southeast1.run.app`.
2. **Đăng nhập Google**: Click vào nút **"Đăng nhập bằng Google"** (được khoanh đỏ trên màn hình).
3. **Phân quyền**: Sau khi đăng nhập bằng email doanh nghiệp được cấp quyền, hệ thống sẽ tự động chuyển hướng vào màn hình làm việc tương ứng với Role của bạn (SuperAdmin, Admin Khối, Reviewer, Viewer).

---

## 2. Quản lý Cơ cấu Tổ chức & Đơn vị (Org Units)

Menu: **Quản trị hệ thống** ➔ **Cơ cấu tổ chức & Đơn vị** (`/admin/org-units`)

Giao diện quản lý mô hình tổ chức dạng **Cây phân cấp 5 tầng (Khối ➔ BU ➔ Phòng ban ➔ Bộ phận ➔ Nhóm team)** theo cơ chế Cascade thông minh:

![Cơ cấu Tổ chức Phân cấp](file:///d:/Project_VCC/Test_dev/screenshots/annotated/02_org_units_annotated.png)

### Thao tác chi tiết:
1. **Xem phân cấp trực thuộc**:
   * **Bước ① (Xanh dương)**: Click vào tên **Khối** cần xem (ví dụ: *Admicro*).
   * **Bước ② (Xanh lá)**: Cột **BU** sẽ tự động kích hoạt và hiển thị danh sách tất cả các BU trực thuộc Khối đã chọn (*Sản phẩm lõi, KINH DOANH, Kỹ thuật & Công nghệ...*).
   * Tiếp tục click vào từng BU để xem các **Phòng ban** con tương ứng.

2. **Tìm kiếm & Lọc đơn vị**:
   * **Tìm kiếm theo tên**: Gõ tên đơn vị vào ô *"Tìm kiếm tên..."* ở thanh công cụ trên cùng để lọc nhanh mà không cần duyệt cây.
   * **Lọc đơn vị vô hiệu hóa**: Gạt nút switch *"Hiển thị đơn vị đã vô hiệu hóa"* để xem lại các phòng ban/đơn vị đã ngừng hoạt động trong lịch sử.

3. **Thêm mới đơn vị con**:
   * **Bước ③ (Vàng)**: Tại cột tương ứng, click vào nút **`+`** trên tiêu đề cột hoặc nút **`+ Thêm Phòng ban`** / **`+ Thêm Bộ phận`** / **`+ Thêm Nhóm team`**.
   * Điền thông tin trong Modal: *Tên đơn vị, Mã đơn vị, Đơn vị cha* rồi bấm **Lưu**.

---

## 3. Quản lý Danh sách Nhân sự & Tìm kiếm

Menu: **Danh sách nhân sự** (`/employees`)

Đây là trung tâm quản lý toàn bộ hồ sơ nhân viên trong tổ chức.

![Danh sách Nhân sự](file:///d:/Project_VCC/Test_dev/screenshots/guide_annotated/guide_01_employee_list.png)

### Thao tác chi tiết:
1. **Tìm kiếm nhân sự**:
   * **Vị trí ① (Xanh dương)**: Nhập Tên nhân viên, Mã nhân sự (Mã NS), hoặc Email vào ô tìm kiếm và bấm nút tìm kiếm (icon kính lúp màu xanh).
   * Bảng dữ liệu sẽ lọc tức thì theo từ khóa.
2. **Lọc dữ liệu đa chiều**:
   * Click vào icon lọc (hình phễu) tại từng cột tiêu đề:
     * Lọc theo **Khối**.
     * Lọc theo **Trạng thái công tác** (*Thử việc, Chính thức, Thai sản, Đã nghỉ việc*).
     * Lọc theo **Line nhân sự** (*Sale, Tech, Đào tạo, Pháp chế...*).
3. **Thao tác nhanh**:
   * **Vị trí ② (Xanh lá)**: Nút **`+ Thêm NS mới`** dùng để bắt đầu quy trình Onboarding.
   * Nút **`Xuất Excel`**: Tải toàn bộ danh sách nhân sự hiện tại về máy tính.
   * Nút **`Import nghỉ việc`**: Nạp danh sách biến động nhân sự hàng loạt bằng file Excel.

---

## 4. Quy trình Tiếp nhận & Onboarding Nhân sự mới

Khi có nhân sự mới gia nhập tổ chức:

![Form Onboarding](file:///d:/Project_VCC/Test_dev/screenshots/all_features/05_onboarding_form.png)

### Các bước thực hiện:
1. Tại trang **Danh sách nhân sự**, nhấn nút **`+ Thêm NS mới`**.
2. **Điền thông tin cơ bản**:
   * Họ và tên, Ngày sinh, Giới tính, CMND/CCCD, Mã số thuế cá nhân.
   * Email công việc, Số điện thoại cá nhân.
3. **Gán vị trí công tác (Org Assignment)**:
   * Chọn Khối ➔ Chọn BU ➔ Chọn Phòng ban ➔ Chọn Vị trí/Chức danh công việc.
   * Chọn *Người nghiệm thu (NNT)* trực tiếp.
4. **Cấu hình 2 bộ lương khởi điểm**:
   * *Bộ lương 1*: Mức lương đóng BHXH theo quy định nhà nước.
   * *Bộ lương 2*: Lương kinh doanh, lương hiệu quả, các khoản phụ cấp cố định.
5. **Lưu dữ liệu**:
   * Bấm **Lưu nháp** nếu hồ sơ chưa đủ giấy tờ. Hồ sơ sẽ được chuyển vào **Phòng Chờ**.
   * Bấm **Gửi phê duyệt** để chuyển sang bước kiểm duyệt chính thức.

---

## 5. Quy trình Rà soát & Phê duyệt tại Phòng Chờ (Pending Room)

Menu: **Phòng chờ** (`/pending-room`)

Dành cho HR và Quản lý để rà soát các hồ sơ chưa hoàn thiện thông tin trước khi đẩy vào danh sách nhân sự chính thức.

![Phòng Chờ Phê Duyệt](file:///d:/Project_VCC/Test_dev/screenshots/guide_annotated/guide_02_pending_room.png)

### Thao tác chi tiết:
1. **Theo dõi số lượng hồ sơ tồn đọng**:
   * **Vị trí ① (Đỏ)**: Badge màu đỏ trên menu hiển thị số lượng hồ sơ đang chờ duyệt (hiện tại là **32** hồ sơ).
2. **Nhận diện trạng thái hồ sơ**:
   * Các nhân sự chưa có mã chính thức sẽ hiển thị *(Chưa cập nhật)*.
   * Tag màu đỏ có biểu tượng PDF kèm theo đại diện cho các hồ sơ **đã có file tài liệu đính kèm** (Hợp đồng lao động, CV, Bằng cấp scan).
3. **Phê duyệt & Đẩy vào hệ thống**:
   * **Vị trí ② (Xanh lá)**: Bấm nút **`submit`** ở cột Hành động để xác nhận duyệt hồ sơ vào danh sách nhân sự chính thức.
   * Menu ba chấm `...`: Chọn để *Chỉnh sửa thông tin nháp*, *Yêu cầu bổ sung giấy tờ* hoặc *Hủy yêu cầu*.

---

## 6. Quản lý Lương, Thưởng & Chốt Kỳ Dữ liệu

### 6.1 Quản lý Lương (`/salaries`)
* Hiển thị chi tiết bảng tính lương, thu nhập thực tế, các khoản trích đóng bảo hiểm và thuế TNCN.
* Hỗ trợ cấu hình các khoản thưởng động (`salary_bonus_items`) theo từng dự án hoặc tháng đánh giá.

### 6.2 Chốt Kỳ Dữ liệu & Snapshot (`/snapshots`)
* **Khóa kỳ lương**: Quản trị viên sử dụng tính năng này để chốt dữ liệu cuối tháng, ngăn chặn việc sửa đổi hồ sơ và lương ngoài ý muốn.
* **Lịch sử Snapshot**: Cho phép xem lại dữ liệu nhân sự và lương của bất kỳ tháng nào trong quá khứ, hỗ trợ xuất báo cáo kiểm toán và phục hồi dữ liệu khi cần thiết.

---

*Tài liệu được biên soạn tự động và cập nhật theo phiên bản mới nhất của VCC HR Tool.*
