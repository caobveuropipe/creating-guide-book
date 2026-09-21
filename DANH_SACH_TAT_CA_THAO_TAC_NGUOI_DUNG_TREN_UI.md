# TỔNG HỢP CÁC TRƯỜNG HỢP VÀ THAO TÁC NGƯỜI DÙNG TRÊN GIAO DIỆN (UI)
## Module Nhân Sự Mới (Post P1-P9 Overhaul)
> **Căn cứ kế hoạch**: `D:\Project_VCC\Module_NhanSu_moi\.agents\active\dev-ui-workflow-testing\FEATURE_PLAN.md`  
> **Tài liệu quy trình nghiệp vụ gốc**: `docs/business-flows/` (WF-EMP-01 đến WF-EMP-09)  
> **Triển khai thực tế**: Frontend Vite React (Ant Design) + Hono Backend (Drizzle ORM)

---

## 📌 MỤC LỤC TỔNG QUAN

| STT | Luồng Nghiệp Vụ | Đường Dẫn UI (Route) | Quyền Hạn Hỗ Trợ | Tác Vụ Cốt Lõi |
|---|---|---|---|---|
| 1 | **Cơ cấu Tổ chức & Đơn vị (`OrgUnits`)** | `/admin/org-units` | SA, EA | Xem cây 5 cấp, thêm đơn vị, sửa tên, bật/tắt (deactivate guard), xem DS nhân sự |
| 2 | **Tạo mới nhân sự & Tuyển dụng (`Onboarding`)** | `/employees/new` | SA, EA | Nhập hồ sơ, chọn phòng ban, nhập 2 bộ lương, Lưu nháp, Gửi duyệt |
| 3 | **Cập nhật hồ sơ & Tài liệu (`Profile Update`)** | `/employees/:id/edit`, `/employees/:id` | SA, EA | Sửa hành chính, xóa trắng trường (`null`), upload/xóa file, xem lịch sử thay đổi |
| 4 | **Điều chuyển & Bổ nhiệm vị trí (`Transfer / Promotion`)** | `/employees/:id/edit?mode=transfer` | SA, EA | Chọn đơn vị/chức danh mới, ngày hiệu lực, đổi lương, đối soát diff phòng chờ |
| 5 | **Vòng đời trạng thái nhân sự (`Lifecycle Statuses`)** | `/employees`, `/employees/:id` | SA, EA | Nghỉ việc (quá khứ / tương lai), Nghỉ thai sản, Đánh giá thử việc đạt/không đạt |
| 6 | **Quản lý Tiền lương & Thưởng động (`Salaries & Bonus`)** | `/salaries`, Modal Lương | SA, EA, Reviewer | Xem bảng lương, lọc/tìm kiếm, sửa 2 bộ lương, thêm/sửa/xóa thưởng động |
| 7 | **Phòng chờ Phê duyệt & Quy trình Duyệt (`PendingRoom`)** | `/pending-room` | SA, EA, Reviewer | Lọc yêu cầu, đối soát diff, wizard NNT, sửa nháp, Phê duyệt, Từ chối |
| 8 | **Chốt danh sách tháng & Snapshot (`Snapshots`)** | `/snapshots` | SA, EA (Chặn VI) | Tạo snapshot, kiểm tra Future Resignation, khóa/mở khóa kỳ, xuất Excel, preview restore |
| 9 | **Phân quyền, Vai trò & Bảng quản trị (`Auth & Admin`)** | `/admin/dashboard` | SuperAdmin (SA) | Quản trị quyền Khối, SA, Reviewer, import Excel, xóa vĩnh viễn (Hard Delete) |

---

## 1. LUỒNG 1: CƠ CẤU TỔ CHỨC & ĐƠN VỊ (`OrgUnits`)
- **Route UI chính**: `/admin/org-units`
- **Các thành phần giao diện**: Tabs Khối (`KhoiTab`), Bảng phân cấp Tree-Table, Thanh tìm kiếm, Dropdown hành động (`...`), Modal thêm/sửa đơn vị.

### 1.1. Các thao tác người dùng có thể làm:
1. **Duyệt và điều hướng cây tổ chức:**
   - Chuyển đổi giữa các Khối (Khối Nội Dung, Khối Công Nghệ, Khối Kinh Doanh, v.v.).
   - Mở rộng / thu gọn (Expand / Collapse) các node con: Khối -> BU -> Phòng ban -> Bộ phận -> Tổ/Nhóm.
   - Tìm kiếm nhanh đơn vị theo tên hoặc mã phòng ban trên thanh Search.
2. **Thêm mới đơn vị tổ chức (Context-Aware 1-Click):**
   - Click nút **"+ Thêm đơn vị con"** trực tiếp tại dòng của một node cha bất kỳ (hệ thống tự động điền sẵn đơn vị cha và cấp con tương ứng).
   - Click nút **"+ Thêm đơn vị gốc/mới"** ở góc trên trang để tạo node cấp cao.
   - Chọn loại đơn vị: `BU`, `phong_ban`, `bo_phan`, `nhom_team`.
   - Nhập tên đơn vị (hệ thống tự động chuẩn hóa/trim khoảng trắng).
   - Chọn Line Nhân Sự (nếu có áp dụng line quản lý riêng).
   - Bấm **"Lưu"** / **"Xác nhận"**.
3. **Chỉnh sửa thông tin đơn vị:**
   - Bấm icon hoặc menu **"Chỉnh sửa"** tại hàng của đơn vị.
   - Sửa tên đơn vị, đổi node cha (điều chuyển cả nhánh đơn vị), cập nhật mô tả.
   - Bấm **"Cập nhật"**.
4. **Bật / Tắt trạng thái hoạt động (Activate / Deactivate Guard):**
   - Gạt công tắc `Switch` trạng thái Active/Inactive hoặc chọn **"Ngừng hoạt động"**.
   - **Trường hợp đơn vị rỗng (không có đơn vị con đang active):** Hệ thống xác nhận và deactive thành công.
   - **Trường hợp đơn vị có đơn vị con đang active:** Hệ thống bật hộp thoại cảnh báo an toàn (Cascade Deactivation Guard Preview), yêu cầu người dùng xác nhận vô hiệu hóa đồng loạt cả nhánh đơn vị con.

---

## 2. LUỒNG 2: TẠO MỚI NHÂN SỰ & TUYỂN DỤNG (`Onboarding`)
- **Route UI chính**: `/employees/new` (Hoặc nút **"Thêm NS mới"** tại `/employees`)
- **Các thành phần giao diện**: Form nhập liệu đa phần (Thông tin chung, Cơ cấu tổ chức, Tiền lương, Người nghiệm thu), Nút "Lưu nháp", Nút "Gửi duyệt tuyển mới".

### 2.1. Các thao tác người dùng có thể làm:
1. **Nhập thông tin định danh & nhân thân:**
   - Nhập Mã nhân sự (hệ thống kiểm tra format, không trùng lặp).
   - Nhập Họ và tên, Email công ty, SĐT, Ngày sinh, Giới tính.
   - Nhập CCCD/CMND, Ngày cấp, Nơi cấp, Nguyên quán, Nơi thường trú, MST cá nhân.
2. **Chọn cơ cấu tổ chức & chức danh:**
   - Chọn Khối trực thuộc.
   - Chọn cấp tổ chức đổ tầng: BU -> Phòng ban -> Bộ phận -> Nhóm/Team.
   - Chọn Chức danh chuyên môn, Loại hợp đồng (Thử việc, Chính thức, Cộng tác viên...).
   - Nhập Ngày vào công ty, Ngày ký HĐ, Ngày vào VCC.
   - Chọn Line Nhân sự, Người quản lý trực tiếp.
3. **Thiết lập 2 bộ lương khởi điểm:**
   - **Bộ lương Giấy tờ (Đóng BHXH / Hợp đồng):** Lương cố định hợp đồng (`lcd_gt`), Lương hiệu suất giấy tờ, Phụ cấp giấy tờ.
   - **Bộ lương Cơ chế (Thực chi / Mục tiêu):** Lương cơ bản cơ chế (`luong_cb`), Lương Target cơ chế (`luong_target_cc`), Phụ cấp cơ chế, Tỷ lệ hưởng lương thử việc (VD: `85%`).
   - Nhập các khoản thưởng dự kiến (nếu có).
4. **Chỉ định Người nghiệm thu (NNT) / Reviewer:**
   - Chọn người nghiệm thu hoặc tích chọn checkbox **"Không có NNT"** (nếu thuộc diện miễn nghiệm thu).
5. **Thao tác "Lưu nháp" (Draft Onboarding):**
   - Click nút **"Lưu nháp"**: Lưu tạm thông tin khi chưa đủ hồ sơ. Bản ghi được đưa vào Phòng chờ (`/pending-room`) ở trạng thái nháp (`state_phong_cho = 'nhap'`).
   - Nhân sự chưa xuất hiện trên danh sách chính thức (`/employees`).
6. **Thao tác "Gửi duyệt tuyển mới":**
   - Click nút **"Gửi duyệt"**: Hệ thống validate đầy đủ các trường bắt buộc.
   - Đóng gói toàn bộ payload (Hồ sơ + Lương) với liên kết an toàn `temp_uuid` gửi vào hàng đợi phê duyệt.

---

## 3. LUỒNG 3: CẬP NHẬT HỒ SƠ & TÀI LIỆU (`Profile Update`)
- **Route UI chính**: `/employees/:id/edit` và xem chi tiết tại `/employees/:id`
- **Các thành phần giao diện**: Form chỉnh sửa hồ sơ, Drawer/Modal xác nhận, Tab "Thông tin chung", Tab "Lịch sử thay đổi", Tab "Tài liệu đính kèm".

### 3.1. Các thao tác người dùng có thể làm:
1. **Chỉnh sửa các trường hành chính / liên lạc:**
   - Thay đổi Số điện thoại, Email cá nhân/công ty, Địa chỉ nơi trú, Mã số thuế.
   - Cập nhật số tài khoản ngân hàng, tên ngân hàng, chi nhánh.
2. **Thao tác xóa trắng trường dữ liệu (Clear/Null Field):**
   - Xóa bỏ nội dung của các trường không bắt buộc (ví dụ: Số người phụ thuộc, Ghi chú, Nơi cấp CMND cũ).
   - Bấm lưu: Giao diện gửi rõ ràng giá trị `null` (không phải undefined) để database xóa sạch dữ liệu cũ.
3. **Cập nhật Người nghiệm thu (Reviewer Card):**
   - Tại trang chi tiết nhân sự `/employees/:id`, bấm **"Chỉnh sửa NNT"** tại khung ReviewerCard.
   - Đổi danh sách người duyệt đánh giá kỳ, hoặc tích chọn "Không có NNT".
4. **Xem lịch sử biến động dữ liệu (`ChangeHistoryTab`):**
   - Chuyển sang tab **"Lịch sử thay đổi"** của nhân sự.
   - Xem bảng timeline từng lần sửa đổi: Cột Tên trường, Giá trị cũ (Old Value), Giá trị mới (New Value), Người thực hiện (Author), Thời gian thực hiện.
   - Lọc lịch sử theo nhóm: Thông tin nhân sự vs Thông tin lương.
5. **Quản lý hồ sơ, tài liệu đính kèm (`DocumentUpload`):**
   - Chuyển sang tab **"Tài liệu đính kèm"**.
   - Bấm **"Tải lên tài liệu"**: Chọn file (PDF, PNG, JPG), chọn loại tài liệu (Hợp đồng lao động, Bằng cấp, Giấy tờ cam kết...).
   - Bấm xem trực tiếp / tải xuống file đã upload.
   - Bấm icon thùng rác để xóa tài liệu (hệ thống yêu cầu xác nhận trước khi xóa).

---

## 4. LUỒNG 4: ĐIỀU CHUYỂN & BỔ NHIỆM VỊ TRÍ (`Transfer / Promotion`)
- **Route UI chính**: `/employees/:id/edit?mode=transfer` (Hoặc chọn "Điều chuyển bổ nhiệm" từ menu hành động nhân sự)
- **Các thành phần giao diện**: Banner chế độ điều chuyển, Form chọn đơn vị mới, Form chọn chức danh mới, DatePicker ngày hiệu lực, Checkbox điều chỉnh lương đi kèm.

### 4.1. Các thao tác người dùng có thể làm:
1. **Thiết lập đơn vị và vị trí mới:**
   - Chọn Khối mới, BU mới, Phòng ban mới, Bộ phận/Tổ nhóm mới.
   - Chọn Chức danh/Chức vụ mới (VD: Chuyên viên -> Trưởng nhóm / Phó phòng).
2. **Chọn ngày hiệu lực điều chuyển (`effective_date`):**
   - Chọn ngày bắt đầu có hiệu lực (có thể chọn ngày hiện tại hoặc ngày trong tương lai).
   - Mô hình dữ liệu gán thời gian (`employee_org_assignments`) sẽ lưu vết khoảng thời gian `valid_from` - `valid_to`, không ghi đè mất phòng ban cũ.
3. **Điều chỉnh gói đãi ngộ đi kèm điều chuyển (nếu có thăng chức/đổi lương):**
   - Tích chọn mục cập nhật lương theo chức danh mới.
   - Nhập mức Lương cố định mới, Lương mục tiêu mới.
4. **Gửi yêu cầu điều chuyển vào phòng chờ:**
   - Bấm **"Gửi yêu cầu điều chuyển"**.
   - Thông tin điều chuyển xuất hiện tại `/pending-room` với trạng thái chờ duyệt.
   - Kiểm tra hiển thị diff trực quan: `[Đơn vị cũ -> Đơn vị mới]`, `[Chức danh cũ -> Chức danh mới]`.

---

## 5. LUỒNG 5: VÒNG ĐỜI TRẠNG THÁI NHÂN SỰ (`Lifecycle Statuses`)
- **Route UI chính**: `/employees`, `/employees/:id`, Modal Chuyển trạng thái
- **Các thành phần giao diện**: Modal "Nghỉ việc", Modal "Nghỉ sinh / Thai sản", Modal "Đánh giá thử việc", Nút "Import nghỉ việc hàng loạt".

### 5.1. Các thao tác người dùng có thể làm:
1. **Cập nhật trạng thái "Nghỉ việc" (Resignation):**
   - Bấm chọn **"Cập nhật nghỉ việc"** trên nhân sự.
   - Chọn **Ngày nghỉ việc** và nhập **Lý do nghỉ việc**.
   - **Trường hợp 1 (Nghỉ việc trong quá khứ / hiện tại):** Nhân sự chuyển ngay sang trạng thái `nghi_viec`, bị loại khỏi danh sách nhân sự đang làm việc (`active`).
   - **Trường hợp 2 (Nghỉ việc trong tương lai - Future Resignation):** Nhân sự vẫn giữ trạng thái hoạt động bình thường trên danh sách cho đến khi qua ngày hiệu lực nghỉ.
2. **Import danh sách nghỉ việc hàng loạt (`BulkResignModal`):**
   - Tại trang `/employees`, bấm nút **"Import nghỉ việc"**.
   - Bấm **"Tải file Excel mẫu"** (`template_import_nghi_viec.xlsx`).
   - Chọn file Excel từ máy tính lên: Hệ thống tự động parse dữ liệu, validate danh sách mã nhân sự và ngày nghỉ việc.
   - Xem bảng đối soát trước khi import: Báo xanh các dòng hợp lệ, báo đỏ các dòng có lỗi (mã không tồn tại, ngày sai format).
   - Bấm **"Xác nhận import"** để cập nhật trạng thái nghỉ việc đồng loạt.
3. **Cập nhật trạng thái "Nghỉ thai sản" (Maternity Leave):**
   - Chọn thao tác **"Cập nhật nghỉ sinh"**.
   - Chọn **Ngày bắt đầu nghỉ sinh** và **Ngày dự kiến quay lại làm việc**.
   - Trạng thái nhân sự chuyển sang `nghi_sinh`, giao diện gắn Tag chuyên biệt màu cam/tím.
4. **Đánh giá thử việc (`ProbationEvaluationModal`):**
   - Chọn nhân sự đang có trạng thái `thu_viec`.
   - Bấm nút **"Đánh giá thử việc"**.
   - **Trường hợp Đạt (Chính thức):**
     - Chọn kết quả "Đạt yêu cầu".
     - Nhập Ngày ký hợp đồng chính thức, Loại hợp đồng chính thức.
     - Thiết lập mức lương chính thức (Lương cố định, Lương mục tiêu mới).
     - Bấm **"Xác nhận"**: Nhân sự chuyển sang trạng thái `chinh_thuc`.
   - **Trường hợp Không đạt / Hết hạn:**
     - Chọn kết quả "Không đạt / Chấm dứt thử việc".
     - Nhập ngày dừng việc và lý do -> Nhân sự chuyển sang trạng thái nghỉ việc.

---

## 6. LUỒNG 6: QUẢN LÝ TIỀN LƯƠNG & THƯỞNG ĐỘNG (`Salaries & Bonus`)
- **Route UI chính**: `/salaries`, Modal Lương (`SalaryEditModal`)
- **Các thành phần giao diện**: Bảng tổng hợp lương, Bộ lọc Khối, Bộ lọc Trạng thái nhân sự, Search bar, Nút "Xuất Excel", Bảng chỉnh sửa 2 bộ lương, Khung cấu hình thưởng động (`DynamicBonusEditor`).

### 6.1. Các thao tác người dùng có thể làm:
1. **Tra cứu & Xem bảng lương tổng hợp:**
   - Lọc bảng lương theo Khối chuyên trách (Khối Nội Dung, Khối Kinh Doanh...).
   - Lọc theo trạng thái làm việc (Thử việc, Chính thức, Nghỉ sinh, Nghỉ việc).
   - Tìm kiếm nhân sự theo Mã hoặc Họ tên.
   - Kiểm tra định dạng tiền tệ: Đảm bảo hiển thị chuẩn VND có dấu phân cách hàng nghìn (VD: `25,000,000 đ`), không làm tròn sai số lớn (`NUMERIC(15,0)`).
2. **Xuất file Excel bảng lương:**
   - Bấm nút **"Xuất Excel"** tại `/salaries` để tải toàn bộ bảng lương hiện hành ra file `.xlsx`.
3. **Mở modal điều chỉnh tiền lương (`SalaryEditModal`):**
   - Click icon cây bút hoặc nút **"Sửa"** tại dòng nhân sự.
   - **Tab Lương Giấy Tờ:** Chỉnh sửa Lương cố định hợp đồng, Phụ cấp giấy tờ, Nhuận bút giấy tờ.
   - **Tab Lương Cơ Chế:** Chỉnh sửa Lương cơ bản, Lương mục tiêu (Target), Phụ cấp cơ chế, Tạm ứng hàng tháng.
   - Nhập **Ngày điều chỉnh lương** có hiệu lực.
4. **Thao tác với Thưởng Động (`DynamicBonusEditor`):**
   - **Thêm khoản thưởng mới:** Bấm "+ Thêm khoản thưởng", chọn danh mục thưởng (Thưởng KPI, Thưởng OKR, Thưởng Doanh số, Thưởng Dự án, Thưởng Kiêm nhiệm...), chọn chu kỳ tháng M1/M2/M3, nhập số tiền.
   - **Chỉnh sửa khoản thưởng:** Click vào ô tiền hoặc loại thưởng để đổi giá trị.
   - **Xóa khoản thưởng:** Click icon thùng rác cạnh dòng thưởng cần xóa.
   - Bấm **"Lưu thông tin lương"**: Giao diện gửi payload lên backend cập nhật bảng `salary_bonus_items`.

---

## 7. LUỒNG 7: PHÒNG CHỜ PHÊ DUYỆT & QUY TRÌNH DUYỆT (`PendingRoom`)
- **Route UI chính**: `/pending-room`
- **Các thành phần giao diện**: Bảng danh sách yêu cầu chờ duyệt, Bộ lọc loại yêu cầu (Tuyển mới, Hồ sơ, Lương, Điều chuyển, Nghỉ việc), Modal Wizard Người nghiệm thu, Modal Diff so sánh, Nút Duyệt, Nút Từ chối.

### 7.1. Các thao tác người dùng có thể làm:
1. **Tìm kiếm và lọc yêu cầu chờ duyệt:**
   - Tìm kiếm theo tên hoặc mã nhân sự đang chờ duyệt.
   - Lọc theo Khối hoặc loại biến động thông tin.
   - Nhận diện các tag cảnh báo: Nhân sự thiếu lương, nhân sự thiếu NNT, hồ sơ tuyển mới.
2. **Xem chi tiết so sánh biến động (Diff Viewer):**
   - Bấm vào hàng hoặc nút **"Xem chi tiết"** của một yêu cầu.
   - Đối chiếu trực quan 2 cột: **Dữ liệu hiện tại (Old)** vs **Dữ liệu đề xuất (New)**.
   - Đối với các trường bị xóa trắng (`null`): Hiển thị tag màu đỏ hoặc chữ "Đã xóa" trực quan.
3. **Chỉnh sửa thông tin ngay trong phòng chờ trước khi duyệt:**
   - Bấm icon Sửa hồ sơ / Sửa lương trực tiếp ngay tại dòng của phòng chờ.
   - Cập nhật lại số liệu nếu phát hiện sai sót mà không cần từ chối tạo lại từ đầu.
4. **Wizard chọn Người nghiệm thu (NNT Wizard Modal):**
   - Bấm **"Phê duyệt"** (đối với tuyển mới hoặc hồ sơ chưa chốt NNT).
   - Hệ thống tự động gợi ý danh sách Reviewer theo cây phòng ban (`suggest-reviewers`).
   - Người duyệt có thể chọn 1 hoặc nhiều Reviewer từ danh sách gợi ý, hoặc tích chọn "Không có NNT".
5. **Thực hiện Phê duyệt (Approve):**
   - Bấm nút **"Xác nhận phê duyệt"**.
   - Hệ thống chạy giao dịch nguyên tử TypeScript `db.transaction()`: Chuyển dữ liệu từ phòng chờ sang bảng chính thức (`employees`, `salaries`, `salary_bonus_items`, `employee_org_assignments`).
   - Yêu cầu tự động biến mất khỏi phòng chờ và hiển thị thông báo thành công.
6. **Thực hiện Từ chối (Reject):**
   - Bấm nút **"Từ chối"**.
   - Hộp thoại bật lên yêu cầu nhập **Lý do từ chối**.
   - Bấm **"Xác nhận từ chối"**: Bản ghi bị hủy bỏ khỏi danh sách duyệt và được lưu log lý do.

---

## 8. LUỒNG 8: CHỐT DANH SÁCH THÁNG & LỊCH SỬ SNAPSHOT (`Snapshots`)
- **Route UI chính**: `/snapshots`
- **Các thành phần giao diện**: Tab Snapshot chính thức (`official`), Tab Snapshot bổ sung (`supplemental`), Bảng danh sách các kỳ snapshot, Modal "Chốt danh sách tháng mới", Drawer/Bảng chi tiết snapshot nhân sự, Nút "Khóa kỳ", Nút "Mở khóa", Nút "Xuất Excel", Nút "Khôi phục từ Excel".

### 8.1. Các thao tác người dùng có thể làm:
1. **Xem danh sách các kỳ snapshot đã chốt:**
   - Xem danh sách theo từng tháng/năm và từng Khối.
   - Kiểm tra các chỉ số tổng hợp: Tổng số lượng nhân sự trong kỳ, Tổng quỹ lương, Trạng thái đợt chốt (`draft`, `locked`, `deleted`), Người chốt, Thời gian chốt.
2. **Thực hiện Chốt danh sách tháng mới (Tạo Snapshot):**
   - Bấm nút **"+ Chốt danh sách tháng"**.
   - Chọn **Tháng chốt** (VD: `2026-09`) và chọn **Khối**.
   - Hệ thống chạy kiểm tra điều kiện chốt: Cảnh báo nếu còn yêu cầu chưa duyệt trong phòng chờ.
   - Bấm **"Bắt đầu chốt"**: Hệ thống đóng băng trạng thái nhân sự tại thời điểm chốt.
   - **Xử lý Invariant #3 (Future Resignation 3-Branch):** Những nhân sự có ngày nghỉ việc trong tương lai vẫn được chốt với đầy đủ quyền lợi và trạng thái chính thức trong tháng chốt.
3. **Xem chi tiết bảng nhân sự của snapshot:**
   - Bấm icon con mắt **"Xem chi tiết"** tại kỳ snapshot.
   - Mở ra bảng danh sách toàn bộ nhân sự đã chốt: Hiển thị đầy đủ cây phòng ban, chức danh, lương cơ chế, lương giấy tờ, và các khoản thưởng động (bung từ JSONB `bonus_items`).
   - Tìm kiếm nhân sự trực tiếp bên trong snapshot.
4. **Khóa kỳ lương (`Lock`) và Mở khóa (`Unlock`):**
   - **Khóa kỳ:** Bấm icon ổ khóa để khóa đợt chốt (`snapshot_status = 'locked'`). Sau khi khóa, toàn bộ dữ liệu kỳ đó không thể sửa đổi hoặc chốt đè.
   - **Mở khóa kỳ:** SuperAdmin có thể bấm mở khóa để cho phép điều chỉnh khi có sai sót đặc biệt.
5. **Xuất bảng snapshot ra Excel:**
   - Bấm nút **"Xuất Excel"** tại snapshot để tải file báo cáo số liệu chốt tháng.
6. **Xem trước và Khôi phục snapshot từ file Excel (Preview & Restore):**
   - Bấm nút **"Khôi phục từ Excel"**.
   - Tải file Excel backup lên hệ thống: Giao diện mở màn hình **Preview** đối chiếu dữ liệu (so sánh từng dòng, cảnh báo dòng dữ liệu sai lệch).
   - Nếu hợp lệ, bấm **"Xác nhận Restore"** để phục hồi dữ liệu snapshot.

---

## 9. LUỒNG 9: PHÂN QUYỀN, VAI TRÒ & BẢNG ĐIỀU KHIỂN QUẢN TRỊ (`Auth & Admin`)
- **Route UI chính**: `/admin/dashboard` và các trang bảo vệ phân quyền
- **Các thành phần giao diện**: Tab "Quyền User", Tab "Super Admin", Tab "Người soát xét", Tab "Thao tác hàng loạt", Tab "Nhật ký hệ thống (Audit Log)", Tab "Phụ trách khối", Tab "Dọn dẹp".

### 9.1. Các thao tác người dùng có thể làm:
1. **Kiểm tra ranh giới phân quyền truy cập (Permission Guard):**
   - **Vai trò Viewer (VI):** Đăng nhập tài khoản VI -> Thử vào `/salaries` hoặc xem cột lương trên danh sách -> Giao diện ẩn hoàn toàn hoặc báo `403 Forbidden` (Invariant #9 bảo vệ dữ liệu lương). Thử vào `/snapshots` -> Bị chặn truy cập theo BR-PERM-004.
   - **Vai trò Enterprise Admin (EA):** Chỉ xem và quản lý nhân sự thuộc Khối mình được cấp quyền; các khối khác bị ẩn hoặc ở chế độ chỉ đọc.
   - **Vai trò SuperAdmin (SA):** Toàn quyền xem và thao tác trên mọi Khối, mọi tính năng.
2. **Quản lý quyền User & Phân quyền Khối (Tab Quyền User):**
   - Tìm kiếm người dùng theo Email.
   - Cấp quyền quản trị mới: Chọn Email người dùng, chọn Khối phụ trách, chọn Cấp độ quyền (`EA`, `VI`, `VA`).
   - Thu hồi quyền hoặc xóa quyền của người dùng.
3. **Quản lý danh sách Super Admin (Tab Super Admin):**
   - Xem danh sách các tài khoản đang nắm giữ quyền SuperAdmin cao nhất.
   - Cấp thêm quyền SuperAdmin cho nhân sự (yêu cầu xác thực bảo mật).
4. **Quản lý cấu hình Người soát xét (Tab Người Soát Xét & Thao Tác Hàng Loạt):**
   - Xem và thiết lập danh sách Reviewer phụ trách từng phòng ban/đơn vị.
   - Thao tác gán Reviewer hàng loạt cho nhiều phòng ban trực thuộc.
5. **Tra cứu Nhật ký hệ thống (Tab Audit Log Viewer):**
   - Lọc nhật ký thao tác theo thời gian, theo người thực hiện, theo loại hành động (Thêm, Sửa, Xóa, Phê duyệt).
   - Mở xem chi tiết payload log sự kiện.
6. **Xóa nhân sự vĩnh viễn (Hard Delete - WF-07):**
   - **Đặc quyền:** Chỉ tài khoản SuperAdmin mới thấy nút thao tác xóa vĩnh viễn.
   - Tại trang chi tiết nhân sự hoặc tab Dọn dẹp: Bấm **"Xóa vĩnh viễn nhân sự"**.
   - Hộp thoại Modal yêu cầu xác nhận 2 bước (gõ lại mã nhân sự hoặc xác nhận cảnh báo dữ liệu không thể phục hồi).
   - Hệ thống ghi log audit baseline trước, sau đó xóa nguyên tử toàn bộ dữ liệu liên quan (`employees`, `salaries`, `assignments`, `audit_logs`).

---

## 10. BẢNG MA TRẬN PHÂN LOẠI THAO TÁC THEO VAI TRÒ (RBAC MATRIX)

| Chức Năng / Màn Hình | Viewer (VI) | Reviewer | Enterprise Admin (EA) | SuperAdmin (SA) |
|---|:---:|:---:|:---:|:---:|
| Xem Cây Cơ Cấu Tổ Chức (`/admin/org-units`) | 👁️ Xem | 👁️ Xem | ✏️ Quản lý theo Khối | ⚡ Toàn quyền cây |
| Tạo / Sửa Đơn Vị Tổ Chức | ❌ Chặn | ❌ Chặn | ✏️ Trong Khối | ⚡ Toàn quyền mọi cấp |
| Xem Danh Sách Nhân Sự (`/employees`) | 👁️ Xem hồ sơ | 👁️ Xem | 👁️ Xem theo Khối | ⚡ Toàn quyền |
| Thêm Mới Nhân Sự (`/employees/new`) | ❌ Chặn | ❌ Chặn | ✏️ Tạo trong Khối | ⚡ Toàn quyền |
| Sửa Hồ Sơ / Điều Chuyển Nhân Sự | ❌ Chặn | ❌ Chặn | ✏️ Thao tác trong Khối | ⚡ Toàn quyền |
| Xem Bảng Lương & Thưởng (`/salaries`) | 🚫 CẤM (Ẩn/403) | 👁️ Xem nhân sự duyệt | 👁️ Xem trong Khối | ⚡ Toàn quyền |
| Điều Chỉnh Lương & Thưởng Động | 🚫 CẤM | ✏️ Sửa kỳ duyệt | ✏️ Sửa trong Khối | ⚡ Toàn quyền |
| Phòng Chờ Phê Duyệt (`/pending-room`) | ❌ Chặn | ✏️ Duyệt theo quyền | ✏️ Duyệt trong Khối | ⚡ Toàn quyền |
| Chốt Danh Sách Tháng (`/snapshots`) | 🚫 CẤM (BR-PERM-004)| ❌ Chặn | ✏️ Chốt theo Khối | ⚡ Toàn quyền (Khóa/Mở) |
| Bảng Quản Trị Hệ Thống (`/admin/dashboard`)| ❌ Chặn | ❌ Chặn | ❌ Chặn | ⚡ Toàn quyền quản trị |
| Xóa Nhân Sự Vĩnh Viễn (Hard Delete) | ❌ Chặn | ❌ Chặn | ❌ Chặn | ⚡ Duy nhất SA |

---

## 11. HƯỚNG DẪN DÀNH CHO TESTER KHI THỰC HIỆN TEST TRÊN GIAO DIỆN DEV

1. **Môi trường & Tài khoản kiểm thử:**
   - Đảm bảo Backend và Frontend local đang chạy kết nối Database có đầy đủ dữ liệu test.
   - Chuẩn bị 2 tài khoản kiểm thử:
     - **Tài khoản SA (SuperAdmin):** Để test toàn bộ luồng tạo, duyệt, chốt, phân quyền và xóa.
     - **Tài khoản VI (Viewer):** Để test xác minh các rào chắn bảo vệ dữ liệu (chặn xem lương, chặn snapshot).
2. **Kiểm tra Network Tab (F12):**
   - Khi bấm **Lưu / Duyệt / Chốt**, luôn mở tab `Network` để đối chiếu status code (`200 OK`, `201 Created`).
   - Kiểm tra payload gửi đi: đảm bảo các trường xóa trắng gửi đúng giá trị `null`, không làm rơi rụng trường liên kết `temp_uuid` hay `bonus_items`.
3. **Quy tắc khi gặp lỗi:**
   - Ghi nhận lại màn hình và log console F12.
   - Ghi mã bug vào file `BUG_TRACKER.md` theo cấu trúc chuẩn để đội ngũ xử lý dứt điểm tận gốc theo Master Plan.
