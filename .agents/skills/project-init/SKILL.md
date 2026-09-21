<<<<<<< HEAD
﻿---
name: project-init
description: Chuẩn hóa, bổ sung, hoặc audit bộ tài liệu `.agents/` cho một repository ở bất kỳ giai đoạn nào. Dùng khi cần quét codebase để xác định tech stack, entry points, commands, Git/GitHub status, đưa skill pack vào áp dụng, rồi tạo hoặc cập nhật các file core như `.agents/CONTEXT.md`, `.agents/PROJECT_STRUCTURE.md`, `.agents/KNOWLEDGE_BASE.md`, cùng các tài liệu tùy chọn như `.agents/architecture/MASTER.md` và `.agents/changelog/*` khi có đủ căn cứ. Không dùng skill này để lập kế hoạch feature, thực thi code, sửa bug, hay cập nhật docs cho một thay đổi code nhỏ.
=======
---
name: project-init
description: Chuẩn hóa, bổ sung, hoặc audit bộ tài liệu `.agents/` cho một repository ở bất kỳ giai đoạn nào. Dùng khi cần quét codebase để xác định tech stack, entry points, commands, Git/GitHub status, rồi sinh tầng BINDING (`AGENTS.md`, `.agents/rules/project-gates.md`) và các file core như `.agents/CONTEXT.md`, `.agents/PROJECT_STRUCTURE.md`, `.agents/KNOWLEDGE_BASE.md`, cùng các tài liệu tùy chọn như `.agents/architecture/MASTER.md` và `.agents/changelog/*` khi có đủ căn cứ. Không dùng skill này để cài hoặc nâng cấp skill pack (dùng `agents-init`), lập kế hoạch feature, thực thi code, sửa bug, hay cập nhật docs cho một thay đổi code nhỏ.
>>>>>>> 301089a0141b6b491eb86952afcb843492685d91
---

# Project Init

## Mục tiêu
- Chuẩn hóa bộ tài liệu `.agents/` để agent khác có thể onboard và resume nhanh.
<<<<<<< HEAD
- Đưa skill pack hiện tại vào áp dụng khi repo chưa có hoặc đang thiếu `.agents/skills/`.
=======
- **Sinh tầng BINDING**: `AGENTS.md` và `.agents/rules/project-gates.md`. Đây là việc quan trọng nhất của skill này — không có `project-gates.md` thì mục 4 của `REVIEW_CORE.md` rỗng, và mọi skill sẽ phải đoán đường dẫn.
>>>>>>> 301089a0141b6b491eb86952afcb843492685d91
- Tạo các file core còn thiếu.
- Giữ lại tài liệu đang dùng tốt, chỉ chuẩn hóa khi có lý do rõ ràng.
- Phát hiện khoảng trống tài liệu và nêu đề xuất có căn cứ.

## Không dùng skill này khi
<<<<<<< HEAD
=======
- Cần cài, nâng cấp, hoặc kiểm tra drift của skill pack. Khi đó dùng `agents-init`.
>>>>>>> 301089a0141b6b491eb86952afcb843492685d91
- Cần lập kế hoạch cho một feature cụ thể. Khi đó dùng `feature-plan`.
- Cần thực thi code theo checklist đã có. Khi đó dùng `feature-coordinator`.
- Cần cập nhật docs sau một thay đổi code nhỏ. Khi đó dùng `update-docs`.
- Cần tìm root cause của bug. Khi đó dùng `check-issue`.

## Nguyên tắc nạp ngữ cảnh
- Không sweep toàn bộ `.agents/` chỉ để "cho chắc".
- Nếu `.agents/` đã tồn tại, chỉ đọc các file core trước:
  - `.agents/CONTEXT.md`
  - `.agents/PROJECT_STRUCTURE.md`
  - `.agents/KNOWLEDGE_BASE.md`
- Chỉ đọc thêm `.agents/architecture/*`, `.agents/changelog/*`, `.agents/testing/*`, `.agents/planning/*`, `.agents/workflows/*` khi:
  - Cần kế thừa nội dung cũ
  - Phát hiện link lỗi thời
  - Phát hiện format cần chuẩn hóa
  - User yêu cầu audit sâu
- Luôn đọc template từ `.agents/skills/templates/...`, không giả định template nằm cạnh file skill.

## Workflow

### Bước 0: Xác định mode
Xác định một trong ba mode sau:

- `bootstrap`: `.agents/` chưa có hoặc thiếu gần hết file core.
- `reconcile`: `.agents/` đã có nhưng còn thiếu file, thiếu skill pack, link cũ, format lệch, hoặc cần bổ sung tài liệu.
- `audit`: `.agents/` đã khá đầy đủ; mục tiêu là review và nêu đề xuất, không tự tạo thêm nếu chưa được duyệt.

### Bước 1: Quét codebase
1. Quét cấu trúc thư mục mức cao của repo.
2. Tìm file đặc trưng để suy ra stack và cách chạy dự án:
   - `package.json`, `pnpm-workspace.yaml`, `turbo.json`
   - `requirements.txt`, `pyproject.toml`
   - `go.mod`
   - `Dockerfile`, `docker-compose.yml`
   - `firebase.json`, `.firebaserc`
   - `nginx.conf`
   - `deploy.ps1`, `deploy.sh`
3. Ghi lại:
   - Repo type: single app hay monorepo
   - Frontend, backend, database, auth, infra
   - Entry points chính
   - Module/service chính
   - File config quan trọng
   - Commands `dev`, `test`, `build`, `lint`, `deploy` nếu có

### Bước 2: Kiểm tra Git và GitHub
1. Kiểm tra repo có phải git worktree không.
2. Kiểm tra `git remote -v`.
3. Kiểm tra `.github/` và `.github/workflows/` nếu tồn tại.
4. Phân biệt rõ:
   - Có `origin` nhưng không có `.github/workflows/`: repo đã kết nối, chỉ là chưa có CI workflow.
   - Không có `origin`: cần user cung cấp `owner/repo` hoặc URL repo nếu muốn kết nối.
   - Không có `.git`: chỉ báo trạng thái, không tự thiết lập git nếu user chưa yêu cầu.
5. Nếu là git repo nhưng chưa có `origin`, dừng ở bước hỏi user trước khi đề xuất `git remote add origin`.

### Bước 3: Kiểm tra `.agents/` hiện tại
<<<<<<< HEAD
=======
0. Kiểm tra tầng BINDING trước, vì mọi thứ khác phụ thuộc nó:
   - `AGENTS.md` (root)
   - `.agents/rules/project-gates.md`
   - `.agents/rules/00-core.md`
   - `.agents/.pack-manifest.json` — nếu thiếu, pack chưa được cài bằng `agents-init`; báo user và đề xuất chạy `agents-init` trước
>>>>>>> 301089a0141b6b491eb86952afcb843492685d91
1. Kiểm tra các file core:
   - `.agents/CONTEXT.md`
   - `.agents/PROJECT_STRUCTURE.md`
   - `.agents/KNOWLEDGE_BASE.md`
2. Kiểm tra tài liệu tùy chọn nếu có:
   - `.agents/architecture/MASTER.md`
   - `.agents/changelog/*`
   - `.agents/testing/*`
   - `.agents/planning/*`
   - `.agents/workflows/*`
<<<<<<< HEAD
3. Kiểm tra `.agents/skills/` và `.agents/skills/templates/` để bảo đảm skill pack có mặt và path đang đúng.
4. Phân loại:
   - Thiếu và nên tạo
   - Đã có và dùng được
   - Đã có nhưng nên chuẩn hóa
   - Skill pack thiếu / cần đồng bộ
=======
3. Kiểm tra `.agents/skills/` và `.agents/skills/templates/` có mặt và path đúng. **Không tự sửa file trong đó** — chúng thuộc tầng PACK; thiếu hoặc lệch thì báo user chạy `agents-init`.
4. Phân loại:
   - Tầng BINDING: thiếu / đã có nhưng gate lệch thực tế / đã đúng
   - Thiếu và nên tạo
   - Đã có và dùng được
   - Đã có nhưng nên chuẩn hóa
>>>>>>> 301089a0141b6b491eb86952afcb843492685d91
   - Optional có thể thêm

### Bước 4: Đọc template
Luôn đọc các template bắt buộc sau từ `.agents/skills/templates/`:
<<<<<<< HEAD
=======
- `.agents/skills/templates/PROJECT_GATES.template.md`
>>>>>>> 301089a0141b6b491eb86952afcb843492685d91
- `.agents/skills/templates/CONTEXT.template.md`
- `.agents/skills/templates/KNOWLEDGE_BASE.template.md`
- `.agents/skills/templates/PROJECT_STRUCTURE.template.md`

Chỉ đọc template tùy chọn khi thực sự cần tạo file tương ứng:
- `.agents/skills/templates/ARCHITECTURE.template.md`
- `.agents/skills/templates/CHANGELOG-FE.template.md`
- `.agents/skills/templates/CHANGELOG-BE.template.md`
- `.agents/skills/templates/CHANGELOG-DB.template.md`

<<<<<<< HEAD
=======
### Bước 4b: Sinh tầng BINDING

Làm bước này **trước** khi tạo core docs: `CONTEXT.md` và `PROJECT_STRUCTURE.md` sẽ trỏ vào các gate vừa khai, và mọi skill review đọc `project-gates.md` cho mục 4.

1. Với **từng gate** `G1`..`G9` của `PROJECT_GATES.template.md`, chỉ điền khi tìm được bằng chứng trong repo:
   - `G1` canonical source: suy từ vị trí thật của schema, thư mục migration, package contract dùng chung, config môi trường.
   - `G2` test harness: suy từ config test, compose file, `.env.example`, script test trong manifest.
   - `G3` replay/baseline: chỉ khai khi có thư mục migration tuần tự. Không có thì ghi `N/A`.
   - `G4` vùng cấm ghi: suy từ config lint/CI/guardrail đang tồn tại. Nếu repo chưa có guardrail nào máy cưỡng chế, ghi `N/A` **và nêu đó là khoảng trống** trong báo cáo — đừng bịa vùng cấm cho một luật không tồn tại.
   - `G5` ranh giới module: chỉ khai khi repo thật sự có ràng buộc tầng/ownership; nếu chưa có, `N/A`.
   - `G6` lệnh chuẩn: lấy nguyên văn từ manifest/script của repo. Đây là gate dễ điền nhất và được dùng nhiều nhất.
   - `G7` chính sách migration: hỏi user nếu không suy được từ lịch sử Git.
   - `G8` bí mật và dữ liệu thật: suy từ `.gitignore`, `.env.example`, secret manager đang dùng.
   - `G9` ngôn ngữ và quy ước: suy từ tài liệu và commit history hiện có.
2. **Không đoán.** Gate không có bằng chứng thì ghi `N/A` kèm một câu lý do, hoặc đưa vào danh sách câu hỏi cho user ở Bước 6. Một gate sai còn tệ hơn một gate trống: reviewer sẽ chặn plan dựa trên luật không tồn tại.
3. Nếu `AGENTS.md` chưa tồn tại hoặc vẫn còn nguyên placeholder: điền phần suy được (tên dự án, ngôn ngữ, bảng read-path theo tài liệu thực có), rồi **liệt kê rõ những mục còn để trống** — nguyên tắc bất di bất dịch và nền nghiệp vụ là thứ user phải tự chốt, không phải thứ suy ra từ codebase.
4. Bảo đảm `CLAUDE.md` và `.agents/rules/00-core.md` chỉ chứa `@AGENTS.md` cộng phần riêng của runtime đó. Nếu phát hiện chúng đang chép lại nội dung `AGENTS.md`, nêu ra như một finding: ba bản sẽ trôi khỏi nhau.

>>>>>>> 301089a0141b6b491eb86952afcb843492685d91
### Bước 5: Xử lý Knowledge Base
1. Nếu `.agents/KNOWLEDGE_BASE.md` đã tồn tại:
   - Đọc để kế thừa.
   - Không tự append chỉ để ghi nhận "đã init".
2. Nếu `.agents/KNOWLEDGE_BASE.md` chưa tồn tại:
   - Tạo từ template.
   - Cố seed từ `1-3` quyết định ban đầu nếu có đủ bằng chứng từ code/config/repo scan.
3. Chỉ ghi decision khi trả lời được câu hỏi: "Tại sao hệ thống chọn hướng này?"
4. Không bịa decision nếu không đủ bằng chứng. Trong trường hợp đó, tạo scaffold và báo rõ là chưa đủ evidence để seed decision ban đầu.

Ví dụ decision có thể seed:
- Repo dùng monorepo/workspaces để chia sẻ package và thống nhất build.
- Frontend đang dùng Vite hoặc Next như nền build chính.
- Auth phụ thuộc Firebase/Auth0 thay vì local auth.
- Deployment đang xoay quanh Docker, Firebase, hoặc một platform cụ thể.

### Bước 6: Trình bày đề xuất cho user
Trước khi tạo hoặc chuẩn hóa, luôn báo cáo theo format sau:

```md
Kết quả quét:
- Tech stack: ...
- Repo type: ...
- Git: ...
- GitHub/CI: ...
<<<<<<< HEAD
- Skill pack: đầy đủ / thiếu / cần đồng bộ
- Mode: bootstrap / reconcile / audit

=======
- Skill pack: version ... (từ .agents/.pack-manifest.json) / chưa cài -> cần `agents-init`
- Mode: bootstrap / reconcile / audit

Tầng BINDING:
- AGENTS.md: thiếu / còn placeholder ... / đã đủ
- project-gates.md: G1..G9 — gate nào điền được, gate nào N/A, gate nào cần user trả lời
- Câu hỏi cần user chốt: ...

>>>>>>> 301089a0141b6b491eb86952afcb843492685d91
Tình trạng tài liệu `.agents/`:
- Thiếu và nên tạo: ...
- Đã có và dùng được: ...
- Đã có nhưng nên chuẩn hóa: ...
- Optional có thể thêm: ...

Nếu repo là git repo nhưng chưa có `origin`, vui lòng cung cấp `owner/repo` hoặc URL repo để tôi thiết lập kết nối.

Bạn muốn tôi:
1. Chỉ review và đề xuất
2. Tạo hoặc bổ sung các file thiếu
3. Tạo hoặc bổ sung và chuẩn hóa luôn các file lệch format
```

### Bước 7: Thực thi sau khi user duyệt
1. Chỉ tạo hoặc chuẩn hóa đúng các mục đã được duyệt.
<<<<<<< HEAD
2. Nếu `.agents/skills/` chưa có hoặc đang thiếu file bắt buộc, ưu tiên đưa skill pack vào đúng vị trí trước khi tạo tiếp core docs.
3. File core luôn được ưu tiên:
   - `.agents/CONTEXT.md`
   - `.agents/PROJECT_STRUCTURE.md`
   - `.agents/KNOWLEDGE_BASE.md`
4. File optional chỉ tạo khi có template và có đủ căn cứ:
=======
2. Nếu `.agents/skills/` chưa có hoặc đang thiếu file bắt buộc: **dừng và báo user chạy `agents-init`**, không tự copy từng file — skill này không quản version pack.
3. Tầng BINDING được ưu tiên trước core docs:
   - `AGENTS.md`
   - `.agents/rules/project-gates.md`
   - `.agents/rules/00-core.md` và `CLAUDE.md` (chỉ kiểm tra chúng đúng dạng file trỏ)
4. File core sau đó:
   - `.agents/CONTEXT.md`
   - `.agents/PROJECT_STRUCTURE.md`
   - `.agents/KNOWLEDGE_BASE.md`
5. File optional chỉ tạo khi có template và có đủ căn cứ:
>>>>>>> 301089a0141b6b491eb86952afcb843492685d91
   - `.agents/architecture/MASTER.md`
   - `.agents/changelog/CHANGELOG-FE.md`
   - `.agents/changelog/CHANGELOG-BE.md`
   - `.agents/changelog/CHANGELOG-DB.md`
<<<<<<< HEAD
5. Không tự tạo từ skill này các nhóm sau nếu repo chưa có khung rõ ràng:
=======
6. Không tự tạo từ skill này các nhóm sau nếu repo chưa có khung rõ ràng:
>>>>>>> 301089a0141b6b491eb86952afcb843492685d91
   - `.agents/testing/*`
   - `.agents/workflows/*`
   - `.agents/planning/*`

### Bước 8: Kết thúc
Báo cáo rõ:
- Đã tạo
- Đã bổ sung
- Đã chuẩn hóa
- Đã giữ nguyên
<<<<<<< HEAD
- Skill pack status
=======
- Tầng BINDING: gate nào đã khai, gate nào `N/A`, gate nào còn chờ user
- Skill pack version và trạng thái drift (nếu đọc được `.agents/.pack-manifest.json`)
>>>>>>> 301089a0141b6b491eb86952afcb843492685d91
- Git/GitHub status
- Đề xuất tiếp theo nếu có

Không handoff cứng sang skill khác. Chỉ gợi ý skill tiếp theo khi có nhu cầu thực tế.

## Output kỳ vọng
- Bộ tài liệu `.agents/` được bootstrap, reconcile, hoặc audit đúng theo mode.
<<<<<<< HEAD
- Các file core phản ánh đúng codebase hiện tại.
- Knowledge Base chỉ chứa architectural decisions có căn cứ.
- Các path/link trong tài liệu trỏ đúng tới `.agents/...`.
=======
- `.agents/rules/project-gates.md` tồn tại, mọi gate hoặc đã khai bằng giá trị kiểm chứng được, hoặc ghi `N/A` có lý do.
- `AGENTS.md` là nguồn duy nhất; `CLAUDE.md` và `.agents/rules/00-core.md` chỉ trỏ về nó.
- Các file core phản ánh đúng codebase hiện tại.
- Knowledge Base chỉ chứa architectural decisions có căn cứ.
- Các path/link trong tài liệu trỏ đúng tới `.agents/...`.
- **Không có file nào thuộc tầng PACK bị sửa.**
>>>>>>> 301089a0141b6b491eb86952afcb843492685d91
