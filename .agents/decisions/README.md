# Quyết định kiến trúc (ADR)

Mỗi file ở đây ghi lại **một quyết định kiến trúc** cùng lý do và các phương án đã loại bỏ.

## Vì sao cần

Sáu tháng sau, không ai nhớ vì sao chọn A thay vì B. Không có bản ghi thì hoặc phải tranh luận lại từ đầu, hoặc tệ hơn — có người lặng lẽ đổi sang B vì "trông hợp lý hơn", không biết B đã bị loại vì một lý do cụ thể.

ADR là bản ghi **bất biến**. Quyết định sai thì viết ADR mới thay thế nó, **không sửa ADR cũ** — vì lịch sử lập luận chính là thứ có giá trị.

## Quy ước

- **Định dạng:** [MADR 4.0](https://adr.github.io/madr/) (bản mới nhất, phát hành 17/09/2024)
- **Tên file:** `NNNN-tieu-de-tieng-anh-gach-noi.md` — 4 chữ số tuần tự, không tái sử dụng số
- **Nội dung:** viết tiếng Việt (tên file tiếng Anh)
- **Trạng thái:** `proposed` · `accepted` · `rejected` · `deprecated` · `superseded by NNNN`

*Lưu ý về vị trí:* MADR quy định `docs/decisions/`. Bộ tài liệu này đặt ở `.agents/decisions/` để gộp toàn bộ tài liệu agent về một cây — lệch đặc tả về vị trí, giữ nguyên về format và đặt tên.

## Khi nào viết ADR

**Viết** khi quyết định: khó đảo ngược, ảnh hưởng nhiều module, có phương án thay thế hợp lý mà bạn đã cân nhắc rồi loại, hoặc ai đó sau này có thể muốn đổi mà không biết lý do.

**Không viết** cho: lựa chọn hiển nhiên không có phương án thay thế, chi tiết triển khai nội bộ một module, hoặc thứ đọc code là thấy.

## Danh mục

| # | Quyết định | Trạng thái | Ngày |
|---|---|---|---|
| — | *Chưa có ADR nào. File đầu tiên đặt tên `0001-….md`.* | — | — |

Nếu dự án đã có một tài liệu gộp nhiều quyết định kiến trúc (một file gộp trong `.agents/architecture/`) viết trước khi lập thư mục này, **không cần tách lại** — chỉ cần trỏ tới nó ở đây, và từ nay mỗi quyết định mới là một file riêng.

## Template

Dùng [_template.md](_template.md).
