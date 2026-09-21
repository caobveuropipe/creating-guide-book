# [Tên Dự Án] - Context for AI Assistants

---

## 1. Project Overview

- **Tên dự án**: [Tên]
- **Repo**: [URL/Tên repo]
- **Trạng thái**: [Phase hiện tại]

### Tech Stack
- Frontend: [Framework, Version]
- Backend: [Framework, Version]
- Database: [Loại DB]
- Auth: [Phương thức]
- Infrastructure: [Docker, Cloud, etc.]

---

## 2. `.agents/` Directory Navigation

### Core Maps
| File | Mô tả |
|------|------|
| [CONTEXT.md](./CONTEXT.md) | Bản đồ nhanh để onboard và resume |
| [KNOWLEDGE_BASE.md](./KNOWLEDGE_BASE.md) | Quyết định kiến trúc và lý do chiến lược |
| [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) | Snapshot cấu trúc thư mục, entry points, services và commands |

### Rules
| File | Mô tả |
|------|------|
| [rules/project-gates.md](./rules/project-gates.md) | **Tầng BINDING** — đường dẫn canonical, harness test, lệnh chuẩn, vùng cấm ghi (`G1`..`G9`) |
| [rules/00-core.md](./rules/00-core.md) | Workspace rules cho runtime kiểu Antigravity — chỉ chứa `@AGENTS.md` |

### Architecture
| File | Mô tả |
|------|------|
| [architecture/MASTER.md](./architecture/MASTER.md) | Kiến trúc tổng thể và các boundary chính |

### Decisions (ADR)
| File | Mô tả |
|------|------|
| [decisions/README.md](./decisions/README.md) | Quy ước ADR (MADR 4.0) và danh mục quyết định |
| [decisions/_template.md](./decisions/_template.md) | Template cho ADR mới |

### Changelog
| File | Mô tả |
|------|------|
| [changelog/CHANGELOG-FE.md](./changelog/CHANGELOG-FE.md) | Thay đổi frontend, UI, UX, client-side flow |
| [changelog/CHANGELOG-BE.md](./changelog/CHANGELOG-BE.md) | Thay đổi backend, API, service, worker |
| [changelog/CHANGELOG-DB.md](./changelog/CHANGELOG-DB.md) | Thay đổi schema, migration, query, dữ liệu |

### Agent Skills
| Skill | Mô tả |
|------|------|
| [skills/README.md](./skills/README.md) | Tổng quan skill pack và flow chuẩn |
| [skills/project-init/SKILL.md](./skills/project-init/SKILL.md) | Chuẩn hóa, bổ sung, hoặc audit bộ `.agents/` |
| [skills/feature-plan/SKILL.md](./skills/feature-plan/SKILL.md) | Lập kế hoạch cho feature mới |
| [skills/feature-review/SKILL.md](./skills/feature-review/SKILL.md) | Review plan về kiến trúc, bảo mật, logic và rollout |
| [skills/spawn-agent-review/SKILL.md](./skills/spawn-agent-review/SKILL.md) | Review hội đồng qua `spawn_agent` trên runtime hỗ trợ |
| [skills/expert-rebuttal/SKILL.md](./skills/expert-rebuttal/SKILL.md) | Phản biện có bằng chứng các finding từ vòng rebuttal |
| [skills/expert-rebuttal-codex/SKILL.md](./skills/expert-rebuttal-codex/SKILL.md) | Vai tấn công vòng rebuttal trên Codex Desktop |
| [skills/feature-coordinator/SKILL.md](./skills/feature-coordinator/SKILL.md) | Triển khai feature theo phase và checklist |
| [skills/update-docs/SKILL.md](./skills/update-docs/SKILL.md) | Cập nhật docs sau khi code thay đổi |
| [skills/check-issue/SKILL.md](./skills/check-issue/SKILL.md) | Điều tra root cause của bug hoặc sự cố |
| [skills/docs-hygiene/SKILL.md](./skills/docs-hygiene/SKILL.md) | Rà soát sức khỏe hệ thống tài liệu và read-path |
| [skills/git-sync/SKILL.md](./skills/git-sync/SKILL.md) | Đồng bộ Git sau khi đã chốt docs và commit message |
| [skills/codebase-audit/SKILL.md](./skills/codebase-audit/SKILL.md) | Audit codebase có định hướng, không tự sửa application code |

> Bảng trên chỉ liệt kê skill trong `.agents/skills/`. Ba skill Claude Code (`/feature-review-claude`, `/expert-rebuttal-claude`, `/check-issue-claude`) và 6 reviewer subagent nằm ở `.claude/` — xem `CLAUDE.md`.

---

## 3. Critical Files

| File | Mức độ | Ghi chú |
|------|------|---------|
| [file quan trọng] | CRITICAL | [Lý do] |

---

## 4. Quick Commands

> **Nguồn duy nhất là `.agents/rules/project-gates.md` §G6.** Không chép bảng lệnh ra đây — hai bản sẽ trôi khỏi nhau, và bản trong `CONTEXT.md` luôn là bản cũ. Chỉ ghi ở đây 2–3 lệnh hay dùng nhất, nếu thấy tiện.

```text
[lệnh dev]      # xem §G6
[lệnh test]     # xem §G6
```

---

## 5. Trạng thái

> **Một dòng, phase hiện tại, hết.** Không tích tụ danh sách feature đã hoàn thành ở đây — lịch sử nằm ở `.agents/history/features/` và changelog. Một `CONTEXT.md` dài ba dòng trạng thái là dấu hiệu file này đang mục.

[Phase hiện tại · mốc gần nhất]

---

*Last updated: [ngày] · Pack version: [đọc từ `.agents/.pack-manifest.json`]*
