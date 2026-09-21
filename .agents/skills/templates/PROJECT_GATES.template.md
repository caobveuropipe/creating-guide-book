---
description: Template sinh `.agents/rules/project-gates.md` — nơi duy nhất trong repo được ghi đường dẫn thật, lệnh thật và gate riêng của dự án.
---

# Project Gates — [Tên dự án]

> Cập nhật: [YYYY-MM-DD] · Do `project-init` sinh, `update-docs` và `docs-hygiene` duy trì.

**File này là tầng BINDING.** Skill pack (`.agents/skills/**`, `.claude/**`) cố tình **không** chứa một đường dẫn hay lệnh cụ thể nào của dự án — nó trỏ về đây bằng mã gate `G1`..`G9`. Nhờ vậy nâng cấp pack không bao giờ đụng nội dung dự án, và diff pack giữa các dự án luôn bằng 0.

## Cách điền

- Chỉ ghi thứ **kiểm chứng được từ repo**. Không đoán. Không copy từ dự án khác.
- Gate không áp dụng thì ghi `**Trạng thái:** N/A` kèm một câu lý do. Skill sẽ bỏ qua gate đó, không cảnh báo.
- Gate đã khai thì mọi giá trị phải là đường dẫn/lệnh **có thật ở thời điểm ghi**. Sai còn tệ hơn thiếu: reviewer sẽ chặn plan dựa trên một luật không tồn tại.
- Đổi kiến trúc thì sửa file này **trước**, không sửa trong `SKILL.md`.

---

## G1. Canonical source và đường dẫn chuẩn

**Trạng thái:** đã khai / N/A

Nơi chân lý nằm, và nơi chỉ là bản sinh ra.

| Thứ | Canonical source | Bản sinh tự động (không sửa tay) |
|---|---|---|
| Schema DB | `[đường dẫn]` | `[đường dẫn hoặc —]` |
| Migration | `[đường dẫn thư mục migration]` | `[—]` |
| Contract / type dùng chung | `[đường dẫn]` | `[client sinh từ OpenAPI/GraphQL, hoặc —]` |
| Config môi trường | `[đường dẫn]` | `[—]` |

> Ví dụ đã điền: Migration canonical `apps/api/drizzle/` · Schema gom một cửa `apps/api/src/db/schema.ts` · Contract `packages/shared/src/` · Client API sinh từ OpenAPI, không viết tay.

**Grep lịch sử một đối tượng DB** (reviewer và `check-issue` dùng): `[lệnh grep vào migration dir, ví dụ: grep -rn "<tên function>" apps/api/drizzle/]`

## G2. Test harness

**Trạng thái:** đã khai / N/A

| Loại test | Chạy ở đâu | Lệnh khởi động harness |
|---|---|---|
| Unit | `[local, không cần harness]` | `[—]` |
| Integration / DB | `[tên harness + endpoint]` | `[lệnh]` |
| E2E / UI | `[…]` | `[lệnh]` |

**Tuyệt đối cấm chạy test lên:** `[cloud DB, staging dùng chung, prod, …]`

> Ví dụ đã điền: Integration chạy trên Supabase Local Docker CLI tại `127.0.0.1:54321`/`54322`, khởi động bằng `supabase start`. Cấm chạy test lên Cloud DB — kể cả read-only, kể cả một câu `select`.

## G3. Replay và Baseline Green Gate

**Trạng thái:** đã khai / N/A

Áp dụng khi dự án có lịch sử migration tuần tự. Không có migration thì `N/A`.

- **Lệnh replay toàn bộ từ trạng thái rỗng:** `[lệnh]`
- **Bắt buộc chạy khi:** phase hiện tại tạo hoặc sửa bất kỳ file migration nào.
- **Baseline Green Gate:** trước mọi phase của feature chạm tầng dữ liệu, chạy replay trên **code chưa sửa gì** và ghi kết quả vào `Task 0` của `FEATURE_TASKS.md`. Không được dùng kết quả baseline của session cũ.
- **Sau replay, khôi phục dữ liệu để User test tay bằng:** `[lệnh seed/restore, hoặc — nếu không cần]`

> Ví dụ đã điền: `pnpm --filter api test:integration:fresh` — replay lại toàn bộ `apps/api/drizzle/` từ DB rỗng. Apply riêng migration mới lên DB đang có state **không** được coi là đã verify.

## G4. Vùng cấm ghi

**Trạng thái:** đã khai / N/A

Những đường dẫn AI **không bao giờ** được ghi vào, kể cả khi đang bị chúng chặn:

```text
[đường dẫn 1]
[đường dẫn 2]
```

**Lint hoặc CI chặn bạn = blocker, không phải việc cần sửa.** Dừng lại, ghi blocker, báo người dùng. Sửa code cho đúng luật, không sửa luật cho vừa code.

Muốn đổi luật thì viết ADR mới ở `.agents/decisions/` rồi mới sửa config. Không sửa lặng lẽ trong một PR làm việc khác.

> Ví dụ đã điền: `eslint.config.js` · `dependency-cruiser.config.js` · `.github/workflows/**` · `CODEOWNERS` · `test/guardrails/**`

## G5. Ranh giới module và quyền ghi

**Trạng thái:** đã khai / N/A

- **Đơn vị module:** `[thư mục/quy ước]`
- **Cửa vào duy nhất của một module:** `[ví dụ: index.ts — cấm import sâu vào file nội bộ]`
- **Chiều phụ thuộc:** `[ví dụ: chỉ chảy xuống theo N tầng, chiều ngược lên đi bằng event]`
- **Bảng khai báo tầng cần cập nhật khi thêm module:** `[đường dẫn file khai TIERS/layers + snapshot test]`
- **Quyền ghi dữ liệu:** `[ví dụ: chỉ repository của module sở hữu được ghi vào bảng của nó]`
- **Đường dẫn độc quyền không được mở đường thứ hai:** `[ví dụ: apps/api/src/db/schema.ts là file duy nhất được import schema nội bộ]`
- **ADR nền:** `[link tới .agents/decisions/NNNN-….md]`

## G6. Lệnh chuẩn

**Trạng thái:** đã khai / N/A

| Việc | Lệnh |
|---|---|
| Cài dependency | `[…]` |
| Dev | `[…]` |
| Build | `[…]` |
| Lint | `[…]` |
| Typecheck | `[…]` |
| Test (unit) | `[…]` |
| Test (integration) | `[…]` |
| Deploy | `[… hoặc "chỉ qua CI, AI không chạy"]` |

- **Package manager:** `[npm/pnpm/yarn/uv/go…]`
- **Shell chính của máy dev:** `[PowerShell/bash/zsh]`
- **Lệnh AI không được tự chạy:** `[danh sách lệnh phá dữ liệu, reset DB, deploy…]`

## G7. Chính sách migration và rollback

**Trạng thái:** đã khai / N/A

- **Chính sách:** `[roll-forward — vá bằng migration mới, không revert / hoặc: có rollback script cho mỗi migration]`
- **Migration đã chạy production:** `[không sửa nội dung / hoặc quy ước khác]`
- **Migration do tool sinh:** `[phải đọc và duyệt thủ công trước khi merge, đặc biệt RENAME/DROP]`
- **Luồng "sửa dữ liệu một lần"** (data fix, khác migration schema): `[đường dẫn + quy trình]`
- **Assertion phụ thuộc dữ liệu thật:** `[phải tách khỏi migration schema — cách làm cụ thể]`

## G8. Bí mật và dữ liệu thật

**Trạng thái:** đã khai / N/A

- **Secret nằm ở:** `[.env local, secret manager, CI secret…]`
- **AI không được đọc, in ra, hay commit:** `[danh sách file/pattern]`
- **Dữ liệu production:** `[ví dụ: AI và automation tuyệt đối không chạm; backup nằm ngoài repo]`
- **Xử lý PII:** `[quy ước log, mask, export]`

## G9. Ngôn ngữ và quy ước

**Trạng thái:** đã khai / N/A

- **Tài liệu, commit message, trao đổi:** `[tiếng Việt / tiếng Anh]`
- **Tên file và định danh trong code:** `[tiếng Anh]`
- **Quy ước đặt tên khác:** `[…]`

---

## Nhật ký thay đổi gate

| Ngày | Gate | Thay đổi | ADR |
|---|---|---|---|
| [YYYY-MM-DD] | — | Khởi tạo từ `project-init` | — |
