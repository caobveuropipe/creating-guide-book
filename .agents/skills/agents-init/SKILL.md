---
name: agents-init
description: Cài, nâng cấp, hoặc kiểm tra drift của Multi Agent Skills pack trong một repository. Dùng khi repo mới chỉ có duy nhất folder này và cần dựng đủ `.agents/skills/`, `.claude/`, `.agents/rules/`, `.agents/decisions/` từ template source; khi cần nâng pack lên version mới mà không đè mất nội dung dự án; hoặc khi cần biết file pack nào đã bị sửa tại chỗ. Skill này chỉ chạm tầng PACK và tạo file tầng BINDING còn thiếu — không sinh nội dung tài liệu, không quét nghiệp vụ, không lập plan. Sinh `CONTEXT.md`/`KNOWLEDGE_BASE.md`/`PROJECT_STRUCTURE.md` và điền gate là việc của `project-init`.
---

# Agents Init

Installer của pack. Nó là **file duy nhất bạn cần copy** vào một repo mới: copy folder `agents-init/` này vào `<repo>/.agents/skills/agents-init/`, rồi gọi nó.

## Mục tiêu

- Dựng đủ tầng PACK trong repo đích, đúng đường dẫn, đúng version, theo `pack.manifest.json` của template source.
- Tạo file tầng BINDING **còn thiếu** từ template, và **không bao giờ** ghi đè bản đã có nội dung.
- Ghi `.agents/.pack-manifest.json` để lần sau biết đang ở version nào và file nào đã bị sửa tại chỗ.
- Bàn giao cho `project-init` để điền nội dung.

## Không dùng skill này khi

- Cần sinh hoặc chuẩn hóa nội dung tài liệu, điền gate `G1`..`G9`, quét tech stack. Khi đó dùng `project-init`.
- Cần dọn docs stale/orphan. Khi đó dùng `docs-hygiene`.
- Chỉ muốn biết pack có gì. Khi đó đọc `.agents/skills/README.md`.

## Ba tầng — luật chi phối toàn bộ skill này

| Tầng | Đường dẫn | Quyền của skill này |
|---|---|---|
| **PACK** | `.agents/skills/**` (trừ `agents-init/` khi đang tự cập nhật), `.claude/**` | Ghi đè tự do sau khi user duyệt |
| **BINDING** | `AGENTS.md`, `CLAUDE.md`, `.agents/rules/**`, `.agents/decisions/README.md`, `.agents/decisions/_template.md`, `.agents/.gitignore` | Chỉ tạo khi **chưa tồn tại**. Đã tồn tại thì báo cáo, không sửa |
| **CONTENT** | mọi thứ còn lại dưới `.agents/` | **Không chạm.** Kể cả không đọc, trừ `.agents/.pack-manifest.json` |

## Nguyên tắc nạp ngữ cảnh

Skill này cố tình **không** đọc `CONTEXT.md`, `KNOWLEDGE_BASE.md`, code, hay tài liệu nghiệp vụ. Nó chỉ cần:

1. `<template-source>/VERSION` và `<template-source>/pack/pack.manifest.json`
2. `.agents/.pack-manifest.json` của repo đích, nếu có
3. Cây file thực tế của repo đích (`ls`/`Get-ChildItem`), không cần nội dung

## Workflow

### Bước 1: Xác định template source

Thứ tự thử:

1. Đường dẫn user đưa trong lượt hiện tại.
2. Đường dẫn ghi ở `.agents/.pack-manifest.json` trường `source` (nếu repo đã cài trước đó).
3. `D:\template-agents` — vị trí mặc định trên máy dev.
4. Nếu không có: **hỏi user** đường dẫn local hoặc URL Git của template repo. Nếu user đưa URL, clone vào scratch dir của session (không clone vào repo đích) rồi dùng bản clone làm source.

Xác nhận source hợp lệ bằng cách kiểm tra tồn tại `<source>/pack/pack.manifest.json`. Không có file đó thì đây không phải template repo — dừng và báo user, đừng đoán tiếp.

### Bước 2: Xác định mode

- `install`: repo đích chưa có `.agents/.pack-manifest.json`.
- `upgrade`: đã có manifest, và `version` của source **khác** version đã cài.
- `check`: user chỉ muốn báo cáo, hoặc version trùng nhau. Không ghi gì.

User nói rõ mode thì theo user.

### Bước 3: Dựng bảng đối chiếu

Đọc `<source>/pack/pack.manifest.json`. Nó có dạng:

```json
{
  "packVersion": "X.Y.Z",
  "files": [
    { "path": ".agents/skills/README.md", "target": ".agents/skills/README.md", "tier": "pack",    "sha256": "…" },
    { "path": "root/AGENTS.template.md", "target": "AGENTS.md",                  "tier": "binding", "sha256": "…" },
    { "path": "root/gitignore-snippet.txt", "target": ".gitignore",              "tier": "snippet", "sha256": "…" }
  ]
}
```

`path` là đường dẫn trong `<source>/pack/`; `target` là đường dẫn ở root repo đích. Hai giá trị này khác nhau ở các file trong `pack/root/` — đừng copy theo `path`.

Với **từng** entry, xác định một trong các trạng thái:

| Trạng thái | Điều kiện | Hành động mặc định |
|---|---|---|
| `NEW` | file chưa có ở repo đích | copy |
| `SAME` | hash file đích khớp hash trong manifest source | bỏ qua |
| `PACK_UPDATED` | hash đích khớp hash đã ghi ở `.agents/.pack-manifest.json`, nhưng khác hash source | copy (pack có bản mới, bản local chưa bị sửa) |
| `LOCAL_DRIFT` | hash đích **khác** hash đã ghi ở `.agents/.pack-manifest.json` | **KHÔNG copy.** Báo cáo riêng, chờ user quyết |
| `BINDING_EXISTS` | file thuộc tầng BINDING và đã tồn tại | bỏ qua, báo cáo |
| `ORPHAN` | file có ở đích, thuộc tầng PACK, nhưng không còn trong manifest source | đề xuất xoá, chỉ xoá khi user duyệt |
| `SNIPPET` | entry có `tier: "snippet"` (hiện chỉ có `.gitignore`) | **không** dùng hash. Kiểm tra bằng cách file đích đã chứa nguyên văn khối đánh dấu (`# ==== Agent docs pack ... ====`) hay chưa: có → bỏ qua; chưa có và file đích đã tồn tại → append; file đích chưa tồn tại → tạo mới chỉ với khối đó |

`SNIPPET` **không phải một biến thể của `BINDING_EXISTS`.** Khác biệt quan trọng: một file BINDING đã tồn tại thì bỏ qua toàn bộ file; một file SNIPPET đã tồn tại (với nội dung khác) vẫn phải được **append** khối vào, chỉ bỏ qua khi chính khối đó đã có sẵn. Gộp `.gitignore` vào logic BINDING sẽ khiến agent bỏ qua luôn việc append khi `.gitignore` đã có nội dung khác — im lặng bỏ sót guard chống commit nhầm `scratch/`, `tmp/`, secrets.

Cách lấy hash (dùng cho mọi entry trừ tier `snippet`):

```powershell
Get-FileHash -Algorithm SHA256 <path> | Select-Object -ExpandProperty Hash
```

```bash
sha256sum <path> | cut -d' ' -f1
```

`LOCAL_DRIFT` là trạng thái quan trọng nhất của skill này. Với mỗi file drift, báo cáo `diff` tóm tắt (số dòng lệch, vài dòng tiêu biểu) và đưa user đúng ba lựa chọn:

1. **Giữ bản local** — bỏ qua file này, ghi vào `.agents/.pack-manifest.json` trường `pinned: true` để lần sau không hỏi lại.
2. **Lấy bản pack** — ghi đè, mất thay đổi local.
3. **Đưa thay đổi local lên template** — user tự merge vào template repo rồi chạy lại `upgrade`. Đây là lựa chọn đúng khi thay đổi đó có giá trị cho mọi dự án.

Nếu nội dung drift là **đường dẫn hay lệnh riêng của dự án**, nói thẳng: chỗ đúng của nó là `.agents/rules/project-gates.md`, không phải `SKILL.md`. Đây chính là cách pack từng trôi khỏi nhau ở các repo trước.

### Bước 4: Trình bày và xin duyệt

```md
Template source: <path> · version <X.Y.Z>
Repo đích: <path> · pack đang cài: <version hoặc "chưa cài">
Mode: install / upgrade / check

Sẽ copy (NEW): n file
Sẽ cập nhật (PACK_UPDATED): n file
Giữ nguyên (SAME): n file
Tầng BINDING đã có, không chạm: <danh sách>
Tầng BINDING sẽ tạo mới: <danh sách>
Drift cần bạn quyết (LOCAL_DRIFT): <danh sách + lệch bao nhiêu dòng>
Orphan đề xuất xoá: <danh sách>

Bạn muốn tôi:
1. Chỉ báo cáo, không ghi gì
2. Copy NEW + PACK_UPDATED, giữ nguyên mọi file drift
3. Như (2), cộng xử lý từng file drift theo quyết định của bạn
```

Không tự chạy khi chưa có duyệt, kể cả ở mode `install`.

### Bước 5: Thực thi

Thứ tự copy — quan trọng, vì tầng sau tham chiếu tầng trước:

1. **PACK**: `pack/.agents/skills/**` → `.agents/skills/**`; `pack/.claude/**` → `.claude/**`
2. **BINDING trong `.agents/`** (chỉ khi thiếu): `pack/.agents/rules/00-core.md`, `pack/.agents/decisions/README.md`, `pack/.agents/decisions/_template.md`, `pack/.agents/.gitignore`
3. **BINDING ở root** (chỉ khi thiếu): `pack/root/AGENTS.template.md` → `AGENTS.md`; `pack/root/CLAUDE.md` → `CLAUDE.md`
4. **`.gitignore` root**: nếu chưa có khối agent pack, append nội dung `pack/root/gitignore-snippet.txt`. Nếu `.gitignore` chưa tồn tại, tạo file chỉ với khối đó và nói rõ đây là file mới.
5. **Manifest**: ghi `.agents/.pack-manifest.json`

Lệnh copy, chạy từ repo đích:

```powershell
$src = "<template-source>"
New-Item -ItemType Directory -Force .agents, .claude | Out-Null
Copy-Item "$src\pack\.agents\skills\*" .agents\skills\ -Recurse -Force
Copy-Item "$src\pack\.claude\*"        .claude\        -Recurse -Force
```

```bash
src="<template-source>"
mkdir -p .agents .claude
cp -r "$src/pack/.agents/skills/." .agents/skills/
cp -r "$src/pack/.claude/."        .claude/
```

Với file `LOCAL_DRIFT` mà user chọn giữ bản local: copy xong rồi **restore lại** file đó, hoặc loại nó khỏi lệnh copy. Đừng copy trước rồi mới nhớ ra.

Cấu trúc `.agents/.pack-manifest.json` phải ghi:

```json
{
  "packVersion": "X.Y.Z",
  "installedAt": "YYYY-MM-DDTHH:mm:ssZ",
  "source": "<đường dẫn hoặc URL template source>",
  "files": {
    ".agents/skills/README.md":               { "sha256": "…", "tier": "pack" },
    ".agents/skills/agents-init/SKILL.md":    { "sha256": "…", "tier": "pack" },
    "AGENTS.md":                               { "sha256": "…", "tier": "binding", "pinned": true }
  }
}
```

**`files` phải ghi ĐỦ mọi entry tier `pack` và `binding` trong `pack.manifest.json`, không riêng những file vừa copy.** Kể cả file ở trạng thái `SAME` — bao gồm chính `agents-init/SKILL.md` và `agents-init/agents/openai.yaml`. Bỏ sót file `SAME` khỏi manifest nghĩa là lần `upgrade` sau không có baseline để so sánh cho đúng file đó, và mọi hành vi `SAME`/`PACK_UPDATED`/`LOCAL_DRIFT` ở Bước 3 sụp đổ về đúng file này — kể cả khi đó là file skill đang tự cài chính nó.

**Không ghi entry cho tier `snippet`** (`.gitignore`) vào `files`. Nó không phải một file được sở hữu toàn phần nên hash cả file sẽ tạo false positive drift ngay khi user thêm dòng ignore riêng của họ. `SNIPPET` được kiểm tra lại bằng cách đọc nội dung, không bằng hash — xem bảng trạng thái ở Bước 3.

Hash ghi vào manifest là hash của file **sau khi copy ở repo đích**, không phải hash ở source — nhờ vậy lần sau phát hiện được drift do người sửa tay.

### Bước 6: Kiểm tra sau khi cài

Chạy verify của template nếu có:

```powershell
pwsh <template-source>\scripts\verify-pack.ps1 -Root .
```

Nếu không chạy được (thiếu pwsh, source là bản clone tạm), tự kiểm bốn thứ tối thiểu:

1. Không file `.md` nào trong `.agents/skills/` và `.claude/` mở đầu bằng BOM UTF-8.
2. Mọi `SKILL.md` có frontmatter với `name` và `description`.
3. `.claude/agents/*.md` có `name`, `description`, `tools`.
4. Không file nào trong tầng PACK chứa đường dẫn riêng của dự án — nếu có, đó là drift chưa được phát hiện ở Bước 3.

### Bước 7: Bàn giao

Báo cáo:

- Version pack đã cài, số file copy / bỏ qua / giữ theo yêu cầu.
- Tầng BINDING: file nào vừa tạo từ template (còn nguyên placeholder), file nào đã có.
- Kết quả verify.
- **Bước tiếp theo, luôn luôn:** chạy `project-init` để điền `AGENTS.md`, sinh `.agents/rules/project-gates.md`, và tạo core docs. Pack chưa có `project-gates.md` thì mục 4 của `REVIEW_CORE.md` rỗng và mọi skill review sẽ chạy thiếu gate.
- Nếu bạn đã copy folder này vào `.claude/skills/agents-init/` để có slash command: sau khi cài xong, bản canonical đã nằm ở `.agents/skills/agents-init/`. Xoá bản trong `.claude/skills/` để không có hai bản trôi khỏi nhau.

## Output kỳ vọng

- Tầng PACK trong repo đích khớp `pack.manifest.json` của source, trừ đúng những file user chủ động pin.
- `.agents/.pack-manifest.json` tồn tại, ghi đúng version và hash sau cài.
- Không file nội dung nào của dự án bị ghi đè.
- User biết chính xác việc tiếp theo là chạy `project-init`.
