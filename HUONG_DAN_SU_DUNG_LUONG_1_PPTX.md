# Tài Liệu Hướng Dẫn Thao Tác Người Dùng Trên UI — Luồng 1: Cơ Cấu Tổ Chức & Đơn Vị (OrgUnits)

## 1. Thông Tin File Tạo Mới
- **File PowerPoint hoàn chỉnh**: [`Huong_Dan_Thao_Tac_UI_Luong_1_OrgUnits_Official.pptx`](file:///d:/Project_VCC/Test_dev/Huong_Dan_Thao_Tac_UI_Luong_1_OrgUnits_Official.pptx)
- **Đường dẫn file**: `d:\Project_VCC\Test_dev\Huong_Dan_Thao_Tac_UI_Luong_1_OrgUnits_Official.pptx`
- **Kích thước file**: ~658 KB (Chất lượng cao, tích hợp trọn bộ 10 ảnh chụp màn hình UI sắc nét)
- **Tổng số Slide**: **14 Slides** (Tỷ lệ 16:9 chuẩn thuyết trình Executive Corporate)

---

## 2. Danh Mục 10 Bước Thao Tác Chuẩn Trên UI Đã Đưa Vào Slide

| Slide | Mã Bước | Tên Thao Tác | Nội Dung Hướng Dẫn Chi Tiết & Ảnh Minh Chứng |
|:---:|:---:|---|---|
| **Slide 4** | `Step 1` | **Xem & Điều hướng cây 5 tầng** | Click chọn Khối `Admicro` -> chọn BU `Sản phẩm lõi` -> bung 4 Phòng ban -> xem cấp Bộ phận & Nhóm/Team. Cây mở mượt mà, phản hồi < 100ms. |
| **Slide 5** | `Step 2` | **Bộ lọc Khối & Tìm kiếm** | Sử dụng dropdown chọn Khối, ô tìm kiếm gõ từ khóa `Soha`, bật switch `Hiển thị đơn vị đã vô hiệu hóa` để tra cứu lịch sử. |
| **Slide 6** | `Step 3` | **Menu 3 chấm (...) ngữ cảnh** | Rê chuột (hover) vào dòng đơn vị, nút `...` hiện ra và menu dropdown xổ xuống các nút chức năng (Thêm, Sửa, Vô hiệu hóa, Cascade). |
| **Slide 7** | `Step 4` | **Modal tạo mới 1-Click** | Hộp thoại tạo mới có Banner xanh khóa cố định Cấp tạo mới, Cha và Khối (`isContextLocked`). Người dùng chỉ cần nhập duy nhất trường Tên. |
| **Slide 8** | `Step 5` | **Xác nhận tạo thành công** | Bấm Lưu -> API POST trả 201 Created -> Toast thông báo thành công màu xanh góc trên -> Node mới xuất hiện ngay trên cây realtime. |
| **Slide 9** | `Step 6` | **Chỉnh sửa tên đơn vị** | Bấm `Sửa tên đơn vị`, đổi tên thành `Bộ Phận QA/QC Tự Động (Đã Cập Nhật)`. Trigger Backend tự động trim khoảng trắng thừa. |
| **Slide 10** | `Step 7` | **Vô hiệu hóa đơn vị lá an toàn** | Menu `Vô hiệu hóa` đơn vị rỗng. Bật switch xem đơn vị vô hiệu hóa: Tên hiển thị nét gạch ngang giữa chữ, bảo toàn lịch sử nhân sự. |
| **Slide 11** | `Step 8` | **Cảnh báo Cascade Deactivate** | Khi tắt node cha đang có nhiều con, hệ thống ngăn chặn và yêu cầu dùng `Vô hiệu hóa nhánh`. Modal hiển thị preview số lượng node con bị ảnh hưởng. |
| **Slide 12** | `Step 9` | **Xóa đơn vị tổ chức (SuperAdmin)** | Hộp thoại xác nhận Popconfirm màu đỏ dành riêng cho tài khoản SuperAdmin, bảo đảm đơn vị không còn nhân viên active trước khi xóa. |
| **Slide 13** | `Step 10` | **Quản lý Line Nhân Sự Global** | Chuyển sang Tab 2, bảng Ant Design Table nạp danh mục Line dùng chung toàn công ty (parent_id = NULL) và nút `+ Thêm Line Nhân sự`. |

---

## 3. Cấu Trúc Tổng Thể 14 Slide Trong File PPTX
1. **Slide 1**: Trang bìa trang trọng - Hướng Dẫn Thao Tác Người Dùng: Quản Trị Cơ Cấu Tổ Chức & Đơn Vị Phân Cấp (`OrgUnits`).
2. **Slide 2**: Mô hình phân cấp 6 tầng nghiệp vụ & 5 nguyên tắc vận hành bất biến (Scope Guard, Khoi Constraint, Cascade Guard, Temporal Assignment).
3. **Slide 3**: Bảng tổng hợp ma trận 10 bước thao tác chuẩn trên giao diện UI và mã ảnh đối soát.
4. **Slide 4 -> 13**: 10 Slide chi tiết tương ứng với **10 Bước thao tác thực tế**, mỗi slide gồm:
   - Ảnh chụp giao diện UI thực tế độ phân giải cao 1440x900.
   - Các điểm nhấn đồ họa chỉ dẫn sắc nét (vòng tròn click chuột, khung viền phân vùng màu sắc, số thứ tự bước, nhãn giải thích không bị đè chữ).
   - Khung thẻ các bước thực hiện chi tiết bên phải (Bước 1, Bước 2, Bước 3) và Tiêu chuẩn hoàn thành.
5. **Slide 14**: Tổng kết vận hành, phân định thẩm quyền (SuperAdmin vs Executive Admin vs Viewer) và khuyến nghị an toàn dữ liệu.
