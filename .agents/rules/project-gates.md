---
description: Nơi duy nhất trong repo được ghi đường dẫn thật, lệnh thật và gate riêng của dự án creating-guide-book.
---

# Project Gates — creating-guide-book

> Cập nhật: 2026-09-21 · Do `project-init` sinh, `update-docs` và `docs-hygiene` duy trì.

**File này là tầng BINDING.** Skill pack (`.agents/skills/**`, `.claude/**`) cố tình **không** chứa một đường dẫn hay lệnh cụ thể nào của dự án — nó trỏ về đây bằng mã gate `G1`..`G9`.

---

## G1. Canonical source và đường dẫn chuẩn

**Trạng thái:** đã khai

| Thứ | Canonical source | Bản sinh tự động (không sửa tay) |
|---|---|---|
| Tài liệu hướng dẫn sử dụng / Luồng thao tác UI | `DANH_SACH_TAT_CA_THAO_TAC_NGUOI_DUNG_TREN_UI.md`, `HUONG_DAN_*.md` | `ppt_output/`, `*.pptx` |
| Ảnh chụp màn hình UI thực tế | `screenshots/` | — |
| Core Multi-Agent Rules & Decisions | `AGENTS.md`, `.agents/rules/`, `.agents/decisions/` | — |
| Cấu hình môi trường / Ignore | `.gitignore`, `.agents/.gitignore` | — |

## G2. Test harness

**Trạng thái:** N/A (Repository tài liệu & guide book, không có server backend/database runtime để chạy integration test)

| Loại test | Chạy ở đâu | Lệnh khởi động harness |
|---|---|---|
| Unit / Linter Docs | Local | Kiểm tra tính nguyên vẹn markdown & liên kết ảnh/file |
| UI Validation | Trình duyệt / Chrome DevTools MCP | Kiểm tra đối chiếu với luồng màn hình thực tế |

**Quy tắc an toàn:**
- Không commit file rác sinh ra từ trình duyệt (`.test_chrome/`, `.browser_profile/`).

## G3. Replay và Baseline Green Gate

**Trạng thái:** N/A (Không có database migration)

## G4. Vùng cấm ghi

**Trạng thái:** đã khai

- **Cấm ghi đè hoặc xóa ảnh gốc trong `screenshots/`** mà không có chỉ định rõ ràng từ người dùng.
- **Cấm tự ý sửa file tầng PACK:** `.agents/skills/**` (trừ khi nâng cấp qua `agents-init`).
- **Cấm lưu trữ thông tin nhạy cảm:** mật khẩu, session token, cookie trình duyệt vào repo.

## G5. Ranh giới module

**Trạng thái:** đã khai

- **Tài liệu hướng dẫn (Docs):** Các file markdown thuyết minh luồng nghiệp vụ và kịch bản test tại thư mục gốc.
- **Tài liệu trình chiếu (Slides):** Các file `.pptx` và thư mục `ppt_output/`.
- **Tài nguyên hình ảnh:** `screenshots/`.

## G6. Lệnh chuẩn

**Trạng thái:** đã khai

| Thao tác | Lệnh | Ghi chú |
|---|---|---|
| Kiểm tra trạng thái Git | `git status` | — |
| Chụp ảnh màn hình UI tự động | Dùng subagent `screenshotting-apps` hoặc Chrome DevTools | — |
| Sinh slide trình chiếu PPTX | Dùng skill `ppt-master` | — |
| Soạn thảo hướng dẫn kỹ thuật | Dùng skill `doc-architect` | — |

## G7. Chính sách Migration

**Trạng thái:** N/A (Không có database)

## G8. Bí mật và dữ liệu thật

**Trạng thái:** đã khai

- Tuyệt đối không commit dữ liệu mật, tài khoản đăng nhập người dùng thật hoặc cookie vào repository.
- Các thư mục nháp và cache (`.browser_profile/`, `.test_chrome/`, `.agents/scratch/`) đã được cấu hình trong `.gitignore`.

## G9. Ngôn ngữ và quy ước

**Trạng thái:** đã khai

- **Ngôn ngữ tài liệu:** Tiếng Việt chuẩn kỹ thuật.
- **Quy ước đặt tên tài liệu:** Tên file rõ nghĩa, mô tả luồng hoặc module tương ứng (ví dụ: `HUONG_DAN_SU_DUNG_*.md`, `Huong_Dan_Test_UI_*.pptx`).
