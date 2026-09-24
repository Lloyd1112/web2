# 📋 HƯỚNG DẪN QUY TRÌNH LÀM VIỆC & PHÁT TRIỂN CODE (Dành cho Thành Viên / AI Collaborator)

> **Dự án**: Làng Sinh Viên Đổi Mới Sáng Tạo Bình Mỹ  
> **Repository**: [khanhphamvn222/web2](https://github.com/khanhphamvn222/web2)  
> **Tech Stack**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Vite

---

## 🤖 1. Prompt Bắt Buộc Dành Cho AI Khi Làm Việc (Copy & Dán Cho AI Assistant)

Mỗi khi **Lloyd1112** hoặc bất kỳ thành viên nào bắt đầu code tính năng mới hoặc sửa lỗi bằng AI (Antigravity, Cursor, ChatGPT, Claude...), hãy dán đoạn prompt này vào đầu phiên làm việc:

```markdown
Bạn là trợ lý lập trình cho dự án "Làng Sinh Viên Đổi Mới Sáng Tạo Bình Mỹ" (React + TypeScript + Tailwind CSS).
Khi tôi yêu cầu chỉnh sửa hoặc viết tính năng mới, bạn BẮT BUỘC tuân thủ các quy tắc sau:

1. QUY TRÌNH CODE:
   - Trước khi sửa: Đọc và phân tích cấu trúc file hiện tại, bảo toàn các state/data/context sẵn có.
   - Khi viết code: Sử dụng React + TypeScript + Tailwind CSS, icon từ `lucide-react`. Đảm bảo code sạch, không lỗi type linter.
   - Hỗ trợ đa ngôn ngữ: Giữ nguyên cơ chế chuyển đổi ngôn ngữ qua `useLanguage()` (VI/EN) trong `src/context/LanguageContext.tsx`.

2. QUY TRÌNH GIT & BÁO CÁO (BẮT BUỘC):
   - Sau khi hoàn thành code hoặc sửa lỗi, bạn phải TỔNG HỢP danh sách file đã thay đổi.
   - GỢI Ý ĐẦY ĐỦ CÁC LỆNH GIT theo thứ tự để tôi có thể copy và chạy ngay trên Terminal:
     + Lệnh kiểm tra trạng thái (`git status`)
     + Lệnh thêm file vào stage (`git add .` hoặc từng file)
     + Lệnh commit với thông điệp rõ ràng chuẩn Conventional Commits (ví dụ: `git commit -m "feat: thêm component X"` hoặc `git commit -m "fix: sửa lỗi hiển thị Y"`)
     + Lệnh kéo code mới nhất để tránh conflict (`git pull origin main` hoặc `git pull --rebase origin main`)
     + Lệnh đẩy code lên GitHub (`git push origin <tên-branch>` hoặc `git push origin main`)
```

---

## 🛠️ 2. Quy Trình Làm Việc & Bộ Lệnh Git Chuẩn

### Bước 1: Lần đầu tiên tham gia dự án (Clone code)
```bash
# 1. Clone repository về máy
git clone https://github.com/khanhphamvn222/web2.git

# 2. Di chuyển vào thư mục dự án
cd web2

# 3. Cài đặt các thư viện phụ thuộc
npm install

# 4. Khởi chạy môi trường phát triển cục bộ
npm run dev
```

---

### Bước 2: Bắt đầu một phiên làm việc / Tính năng mới
> ⚠️ **Quan trọng**: Luôn kéo code mới nhất từ team về máy trước khi viết code để tránh bị xung đột (conflict).

```bash
# Kéo code mới nhất từ nhánh main
git pull origin main

# (Khuyến nghị) Tạo branch riêng để làm việc
git checkout -b feature/ten-tinh-nang-moi
```

---

### Bước 3: Sau khi sửa code / viết tính năng xong (Cập nhật lên GitHub)

```bash
# 1. Kiểm tra lại các file đã sửa
git status

# 2. Thêm toàn bộ các file đã thay đổi vào Git
git add .

# 3. Tạo commit với nội dung mô tả rõ ràng (VD: feat, fix, style, docs, refactor)
git commit -m "feat: mô tả ngắn gọn tính năng bạn vừa làm"

# 4. Kéo code mới nhất về một lần nữa để đảm bảo không bị đè code của người khác
git pull origin main

# 5. Đẩy code lên GitHub
# Nếu đang làm trên branch riêng:
git push -u origin feature/ten-tinh-nang-moi

# Hoặc nếu làm trực tiếp trên main:
git push origin main
```

---

## 🏷️ Quy Ước Đặt Tên Commit (Commit Convention)

| Tiền tố | Mục đích sử dụng | Ví dụ |
|---|---|---|
| `feat:` | Thêm tính năng, trang, hoặc component mới | `git commit -m "feat: thêm trang tư vấn dự án"` |
| `fix:` | Sửa lỗi giao diện hoặc logic | `git commit -m "fix: sửa lỗi vỡ khung hình trên mobile"` |
| `style:` | Chỉnh sửa CSS, màu sắc, padding/margin | `git commit -m "style: cập nhật màu chủ đạo cho header"` |
| `docs:` | Cập nhật tài liệu, README | `git commit -m "docs: cập nhật hướng dẫn collaboration"` |
| `refactor:`| Tối ưu lại code mà không đổi giao diện/chức năng | `git commit -m "refactor: tách nhỏ component Modal"` |

---

## ⚠️ Những Điều Cần Lưu Ý Khi Làm Việc Chung
1. **Không commit thư mục `node_modules` hoặc thư mục `dist`** (Đã có sẵn trong file `.gitignore`).
2. **Kiểm tra `npm run build` hoặc `npm run dev`** trước khi push để đảm bảo code không bị lỗi compile/TypeScript.
3. Nếu gặp thông báo **Merge Conflict** khi push: Hãy liên hệ ngay với người làm cùng để đối chiếu file bị trùng trước khi ghi đè!
