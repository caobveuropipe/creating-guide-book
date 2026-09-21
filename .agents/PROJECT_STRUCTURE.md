# Project Structure — creating-guide-book

> Cập nhật: 2026-09-21 · Ảnh chụp hiện trạng do `project-init` sinh.

Tài liệu này lưu ý các điểm quan trọng về mặt cấu trúc và điều hướng đọc hiểu cho AI.
Chi tiết gate kỹ thuật và quy tắc xem tại: [rules/project-gates.md](rules/project-gates.md).

---

## Trạng thái hiện tại
Repository chuyên dụng chứa tài liệu hướng dẫn kỹ thuật, tài liệu đào tạo người dùng, kịch bản test UI và slide thuyết trình (`.pptx`) cho dự án VCC. Đã tích hợp đầy đủ bộ Multi-Agent Skills (`ppt-master`, `doc-architect`, `agents-init`,...). Chưa chứa mã nguồn ứng dụng backend/frontend độc lập.

## Cấu trúc tài nguyên chính

| Nhóm | Đường dẫn | Ý nghĩa & Vai trò |
|---|---|---|
| **Tài liệu hướng dẫn (Markdown)** | `*.md` (ở thư mục gốc) | Nguồn sự thật (Canonical) cho các luồng thao tác, hướng dẫn sử dụng và kịch bản test UI. |
| **Slide thuyết trình** | `*.pptx` và `ppt_output/` | Bản trình chiếu được biên soạn cho người dùng và các bên liên quan. |
| **Ảnh minh họa UI** | `screenshots/` | Kho lưu trữ ảnh chụp màn hình UI thực tế, dùng làm tài nguyên minh họa cho `.md` và `.pptx`. |
| **Tầng AI Binding & Rules** | `AGENTS.md`, `CLAUDE.md`, `.agents/rules/` | Quy định chuẩn mực vận hành của AI agents và các chốt chặn chất lượng. |
| **Thư viện AI Skills** | `.agents/skills/` | Các skill tự động hóa: sinh slide, lập tài liệu, audit, điều phối quy trình. |

## Config cần biết

| File | Lưu ý khi sửa |
|---|---|
| `AGENTS.md` | Nguồn duy nhất cho chỉ dẫn AI. `CLAUDE.md` và `.agents/rules/00-core.md` chỉ trỏ về đây bằng `@AGENTS.md`. |
| `.agents/rules/project-gates.md` | Chứa đường dẫn thật và lệnh chuẩn của repo. Không sửa vào `.agents/skills/**` vì vùng đó thuộc tầng PACK sẽ bị ghi đè khi nâng cấp. |
| `.gitignore` | Đã cấu hình bỏ qua các thư mục tạm từ trình duyệt (`.browser_profile/`, `.test_chrome/`) và vùng nháp `.agents/scratch/`. |

## Luồng đọc nhanh cho AI

- Khi cần cập nhật hoặc soạn thêm hướng dẫn sử dụng mới: đọc [DANH_SACH_TAT_CA_THAO_TAC_NGUOI_DUNG_TREN_UI.md](../DANH_SACH_TAT_CA_THAO_TAC_NGUOI_DUNG_TREN_UI.md) và [HUONG_DAN_SU_DUNG_VCC_HR.md](../HUONG_DAN_SU_DUNG_VCC_HR.md) trước.
- Khi cần tạo hoặc chỉnh sửa slide PowerPoint: kích hoạt skill [ppt-master](skills/ppt-master/SKILL.md) và sử dụng tài nguyên trong `screenshots/`.
- Khi cần chụp ảnh giao diện ứng dụng để bổ sung tài liệu: sử dụng Chrome DevTools MCP hoặc skill [app-screenshots](skills/app-screenshots/skill.md).
