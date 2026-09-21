<<<<<<< HEAD
# Project Structure - [Tên Dự Án]

> Tạo ngày: [YYYY-MM-DD]
> Cập nhật gần nhất: [YYYY-MM-DD]
> Mục đích: Lưu snapshot cấu trúc codebase để AI có thể onboard và resume nhanh.

---

## 1. Snapshot cây thư mục

```text
[root]/
|-- [folder-a]/
|   |-- ...
|-- [folder-b]/
|-- [file-quan-trong]
```

## 2. Entry Points

| Loại | File/Path | Vai trò | Ghi chú |
|------|-----------|---------|---------|
| Frontend | `[src/main.tsx]` | Bootstrap ứng dụng | [nếu có] |
| Backend | `[src/server.ts]` | Khởi động API/server | [nếu có] |
| Worker/Cron | `[workers/sync.ts]` | Tác vụ nền | [nếu có] |
| Router chính | `[src/router.ts]` | Điều phối route/module | [nếu có] |

## 3. Services / Modules chính

| Module/Service | Path | Trách nhiệm | Phụ thuộc chính |
|----------------|------|-------------|------------------|
| [Auth] | `[src/modules/auth]` | [Mô tả ngắn] | [DB, API, SDK...] |
| [Billing] | `[src/modules/billing]` | [Mô tả ngắn] | [DB, queue...] |

## 4. Config / Infra quan trọng

| File | Nhóm | Ý nghĩa | Lưu ý khi chỉnh sửa |
|------|------|---------|---------------------|
| `[package.json]` | Build/Deps | [Mô tả ngắn] | [Lưu ý] |
| `[docker-compose.yml]` | Infra | [Mô tả ngắn] | [Lưu ý] |
| `[.env.example]` | Runtime config | [Mô tả ngắn] | [Lưu ý] |

## 5. Commands

| Mục đích | Lệnh | Điều kiện | Ghi chú |
|----------|------|-----------|---------|
| Chạy local | `[npm run dev]` | [Cần .env / service nào] | [Ghi chú] |
| Build | `[npm run build]` | [Điều kiện] | [Ghi chú] |
| Test | `[npm test]` | [Điều kiện] | [Ghi chú] |
| Lint | `[npm run lint]` | [Điều kiện] | [Ghi chú] |
| Deploy | `[./deploy.sh]` | [Điều kiện] | [Ghi chú] |

## 6. Luồng đọc nhanh cho AI

- Khi sửa UI: đọc [path/module] trước.
- Khi sửa Backend/API: đọc [path/module] trước.
- Khi sửa auth/data flow: đọc [path/module] trước.
- Khi sửa infra/deploy: đọc [path/module] trước.

## 7. Ghi chú từ lần quét đầu

- Package manager: [npm/pnpm/yarn/pip/go...]
- Kiểu repo: [single app / monorepo]
- Test framework: [jest/vitest/pytest/...]
- Điểm dễ nhầm: [nếu có]
=======
# Project Structure — [Tên dự án]

> Cập nhật: [YYYY-MM-DD] · Ảnh chụp hiện trạng, do `update-docs` duy trì.

**Tài liệu này chỉ ghi thứ không suy ra được từ codebase.** Cây thư mục, danh sách module, danh sách dependency và bảng lệnh **cố tình không có ở đây** — agent tự đọc từ repo, và lệnh chuẩn nằm ở `.agents/rules/project-gates.md` §G6. Nạp sẵn những thứ đó chỉ tốn token, làm loãng ngữ cảnh, mà lại là phần đi lệch hiện trạng nhanh nhất.

- Vì sao cấu trúc repo như hiện tại → ADR tương ứng trong [decisions/README.md](decisions/README.md) *(nếu đã có)*
- Đường dẫn canonical, harness test, vùng cấm ghi → [rules/project-gates.md](rules/project-gates.md)

---

## Trạng thái hiện tại

[Một đoạn: dự án đang ở đâu, phần nào đã dựng, phần nào chưa. Nếu repo mới chỉ có tài liệu thì nói thẳng "chưa có mã nguồn ứng dụng".]

## Entry point

Chỉ những file mà đọc tên thư mục **không** đoán ra được, hoặc có ràng buộc khởi tạo đặc biệt.

| Loại | File | Ghi chú |
|---|---|---|
| [Web] | `[đường dẫn]` | [ràng buộc khởi tạo cần biết, ví dụ locale provider, offline store] |
| [API] | `[đường dẫn]` | [validation pipe toàn cục, docs generator…] |
| [Worker] | `[đường dẫn]` | [ví dụ: mọi job phải idempotent] |
| [Logic dùng chung] | `[đường dẫn]` | [ai được import, ai không] |

## Config cần biết

Chỉ file mà **sửa sai sẽ tốn công tìm**, kèm đúng cái bẫy đó.

| File | Lưu ý khi sửa |
|---|---|
| `AGENTS.md` | Nguồn duy nhất cho chỉ dẫn AI. `CLAUDE.md` và `.agents/rules/00-core.md` chỉ trỏ về đây bằng `@AGENTS.md` — **sửa nội dung ở `AGENTS.md`**, không sửa ở hai file trỏ. |
| `.agents/rules/project-gates.md` | Đường dẫn thật và lệnh thật của dự án. Sửa ở đây, **không** sửa vào `.agents/skills/**` — vùng đó thuộc tầng PACK và sẽ bị ghi đè khi nâng cấp. |
| `.agents/skills/update-docs/SKILL.md` | Phạm vi ghi của tài liệu. Thêm thư mục tài liệu mới thì phải khai báo ở đó, nếu không tài liệu đó sẽ mục. |
| `[file config của dự án]` | [cái bẫy cụ thể: file nào phải commit dù trông như artifact, flag nào đổi là phá build…] |

## Luồng đọc nhanh cho AI

Chỉ ghi khi thứ tự đọc **không hiển nhiên** từ tên thư mục.

- Khi sửa [vùng]: đọc `[đường dẫn]` trước, vì [lý do].

## Ghi chú vận hành

- [Ngôn ngữ tài liệu/commit vs ngôn ngữ code — nếu khác nhau.]
- [Ràng buộc tooling không hiển nhiên: monorepo runner không hỗ trợ gì, package lồng nhau, v.v.]
- [Điểm dễ nhầm mà người mới vào repo hay mắc.]
>>>>>>> 301089a0141b6b491eb86952afcb843492685d91
