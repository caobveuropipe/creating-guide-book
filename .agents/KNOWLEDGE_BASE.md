# .agents/KNOWLEDGE_BASE.md - Bộ não của dự án creating-guide-book

Lưu trữ những **quyết định quy ước** quan trọng và **lý do chiến lược** của dự án.

> ⚠️ **QUY TẮC GHI:**
> - Chỉ ghi quyết định kiến trúc, quy ước tài liệu và lý do chiến lược (high-level decisions).
> - Tuyệt đối tránh liệt kê tính năng vụn vặt hoặc changelog chi tiết.
> - Mỗi dòng phải trả lời được câu hỏi: "Tại sao chúng ta quyết định làm vậy?"

---

## Initial Decisions From Repo Scan

- **2026-09-21: Tách riêng repository tài liệu và guide-book (`creating-guide-book`) khỏi repo ứng dụng.**
  - *Lý do chiến lược:* Giúp tập trung phát triển hệ thống cẩm nang người dùng, kịch bản test UI và slide đào tạo độc lập, tránh làm nặng và phân mảnh commit trong codebase chính của ứng dụng.
- **2026-09-21: Sử dụng Markdown làm nguồn sự thật (Canonical Source) cho cả tài liệu văn bản và kịch bản dựng Slide PPTX.**
  - *Lý do chiến lược:* Markdown cho phép AI đọc hiểu, phiên bản hóa bằng Git và dễ dàng đối chiếu, đồng thời làm cơ sở đầu vào chuẩn xác để `ppt-master` sinh ra slide PowerPoint mà không bị lệch nội dung.
- **2026-09-21: Tích hợp đầy đủ bộ Multi-Agent Skills Pack và bộ chốt chặn Quality Gates.**
  - *Lý do chiến lược:* Chuẩn hóa quy trình làm việc giữa các AI agents (Antigravity, Claude Code, Codex), đảm bảo mọi tài liệu sinh ra đều tuân thủ cấu trúc đồng bộ và có khả năng truy nguyên cao.

---

## Ongoing Decisions

*(Sẽ được bổ sung khi có thêm quyết định chiến lược mới)*
