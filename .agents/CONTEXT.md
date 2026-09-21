# creating-guide-book - Context for AI Assistants

---

## 1. Project Overview

- **Tên dự án**: `creating-guide-book`
- **Repo**: `https://github.com/caobveuropipe/creating-guide-book`
- **Trạng thái**: Hoàn thiện tài liệu hướng dẫn sử dụng, kịch bản test UI và slide thuyết trình cho các luồng nghiệp vụ (đặc biệt là phân hệ nhân sự - tổ chức phòng ban VCC).
- **Mục tiêu chính**: Cung cấp tài liệu đào tạo, hướng dẫn thao tác người dùng, kịch bản kiểm thử trực quan và slide thuyết minh cho dự án.

### Tài nguyên cốt lõi
- **Tài liệu hướng dẫn:**
  - [DANH_SACH_TAT_CA_THAO_TAC_NGUOI_DUNG_TREN_UI.md](../DANH_SACH_TAT_CA_THAO_TAC_NGUOI_DUNG_TREN_UI.md): Bảng tổng hợp chi tiết toàn bộ các bước thao tác trên giao diện.
  - [HUONG_DAN_SU_DUNG_VCC_HR.md](../HUONG_DAN_SU_DUNG_VCC_HR.md): Hướng dẫn sử dụng tổng quan hệ thống nhân sự VCC.
  - [HUONG_DAN_TEST_UI_LUONG_1_ORGUNITS.md](../HUONG_DAN_TEST_UI_LUONG_1_ORGUNITS.md): Kịch bản kiểm thử giao diện luồng 1 (Cơ cấu tổ chức - Org Units).
- **Slide thuyết trình & Output:**
  - `*.pptx` tại root và `ppt_output/`.
- **Kho ảnh UI thực tế:**
  - `screenshots/`: Lưu trữ ảnh chụp từng màn hình thao tác phục vụ tài liệu và slide.

---

## 2. `.agents/` Directory Navigation

### Core Maps
| File | Mô tả |
|------|------|
| [CONTEXT.md](./CONTEXT.md) | Bản đồ nhanh để onboard và resume |
| [KNOWLEDGE_BASE.md](./KNOWLEDGE_BASE.md) | Quyết định quy ước, nguyên tắc quản lý tài liệu và slide |
| [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) | Snapshot hiện trạng và hướng dẫn luồng đọc |

### Rules & Gates
| File | Mô tả |
|------|------|
| [rules/project-gates.md](./rules/project-gates.md) | **Tầng BINDING** — nguồn canonical, vùng cấm ghi, lệnh chuẩn (`G1`..`G9`) |
| [rules/00-core.md](./rules/00-core.md) | Workspace rules cho runtime — trỏ về `@AGENTS.md` |

### Multi-Agent Skills
| Skill | Mô tả |
|------|------|
| [skills/doc-architect/SKILL.md](./skills/doc-architect/SKILL.md) | Biên soạn tài liệu kỹ thuật, hướng dẫn sử dụng kèm ảnh chụp UI |
| [skills/ppt-master/SKILL.md](./skills/ppt-master/SKILL.md) | Tạo và chỉnh sửa slide trình chiếu PowerPoint tự động |
| [skills/feature-plan/SKILL.md](./skills/feature-plan/SKILL.md) | Lập kế hoạch tài liệu hoặc tính năng mới |
| [skills/feature-coordinator/SKILL.md](./skills/feature-coordinator/SKILL.md) | Điều phối và triển khai công việc theo checklist |
| [skills/agents-init/SKILL.md](./skills/agents-init/SKILL.md) | Quản lý và nâng cấp phiên bản bộ pack |
