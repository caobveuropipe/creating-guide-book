# Hướng dẫn Quản trị và Nguyên tắc Vận hành AI Agents (creating-guide-book)

Tài liệu này định nghĩa các nguyên tắc và rào chắn an toàn tối cao cho tất cả các AI Agents (Codex, Antigravity, Claude Code, Gemini CLI, v.v.) hoạt động trên repository `creating-guide-book`.

---

## 1. Nguyên tắc Cốt lõi: "Cấm Nới Lỏng Gate — Không Cấm Sửa"

> **QUY TẮC BẤT DI BẤT DỊCH**:
> Tuyệt đối **KHÔNG BAO GIỜ** được nới lỏng, vô hiệu hóa, comment out, hoặc bypass các chốt chặn kiểm thử (Quality Gates, CI Checks, Verification Scripts) nhằm mục đích làm cho bài kiểm tra chạy "xanh giả tạo".

1. **Tuyệt đối cấm Soft-skip:**
   - Không được bắt lỗi rồi âm thầm bỏ qua (`try { ... } catch { return null; }`). Mọi assertion trong test/kiểm tra phải fail-closed.
2. **Sửa code/tài liệu, không sửa gate để giấu lỗi:**
   - Bắt buộc truy nguyên root cause và sửa tận gốc; **CẤM** sửa đổi ngưỡng kiểm thử hay xóa assertion chỉ để pass gate.

---

## 2. Nguồn Sự Thật & Hệ thống Tài liệu

1. **Bản đồ dự án & Kiến trúc:**
   - Bản đồ tổng quan: [`.agents/CONTEXT.md`](.agents/CONTEXT.md)
   - Cấu trúc thư mục: [`.agents/PROJECT_STRUCTURE.md`](.agents/PROJECT_STRUCTURE.md)
   - Sổ tay bài học & Invariant: [`.agents/KNOWLEDGE_BASE.md`](.agents/KNOWLEDGE_BASE.md)
2. **Quy tắc & Chốt chặn chất lượng:**
   - Project Gates: [`.agents/rules/project-gates.md`](.agents/rules/project-gates.md)
   - Core Rules: [`.agents/rules/00-core.md`](.agents/rules/00-core.md)

---

## 3. Quy trình Triển khai Chuẩn (Task / Feature Flow)

Mọi yêu cầu phức tạp hoặc tính năng/tài liệu mới đều tuân theo chu trình Multi-Agent:

```
[Khởi tạo / Plan]         [Review]                  [Thực thi & Test]          [Đồng bộ & Lưu trữ]
/feature-plan      -->   /feature-review      -->   /feature-coordinator  -->  /update-docs
(Tạo plan & tasks)       (Hội đồng review gate)     (Code + Phase test)         (Cập nhật docs & git)
```