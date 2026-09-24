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

2. QUY TRÌNH GIT & BẢO VỆ NHÁNH MAIN (BẮT BUỘC):
   - TUYỆT ĐỐI KHÔNG hướng dẫn commit/push trực tiếp vào nhánh `main`.
   - Bắt buộc tạo và làm việc trên branch riêng theo cú pháp: `feature/<tên-tính-năng>` hoặc `fix/<tên-lỗi>`.
   - Sau khi hoàn thành code, bạn phải TỔNG HỢP danh sách file đã thay đổi.
   - GỢI Ý ĐẦY ĐỦ CÁC LỆNH GIT theo thứ tự để tôi có thể copy và chạy ngay trên Terminal:
     + 1. Lệnh kiểm tra branch hiện tại & trạng thái (`git status`)
     + 2. Lệnh tạo branch mới nếu chưa có (`git checkout -b feature/<tên-tính-năng>`)
     + 3. Lệnh thêm file vào stage (`git add .`)
     + 4. Lệnh commit chuẩn Conventional Commits (ví dụ: `git commit -m "feat: cập nhật trang X"`)
     + 5. Lệnh đẩy branch lên GitHub (`git push -u origin feature/<tên-tính-năng>`)
     + 6. Hướng dẫn tạo Pull Request (PR) trên GitHub gửi vào `main` để Admin/Chủ dự án duyệt (Approve) trước khi merge.
```

---

## 🛠️ 2. Quy Trình Làm Việc & Bộ Lệnh Git Chuẩn (Có Xét Duyệt Pull Request)

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

### Bước 2: Bắt đầu một tính năng mới / sửa lỗi
> ⚠️ **Bắt buộc**: Luôn kéo code mới nhất từ `main` về trước, sau đó tạo branch riêng để làm việc. Không commit trực tiếp lên `main`.

```bash
# 1. Chuyển về main và kéo code mới nhất
git checkout main
git pull origin main

# 2. Tạo branch mới cho tính năng của bạn (VD: feature/hoat-dong, fix/header)
git checkout -b feature/ten-tinh-nang-moi
```

---

### Bước 3: Sau khi sửa code xong (Đẩy lên GitHub và tạo Pull Request)

```bash
# 1. Kiểm tra lại các file đã sửa
git status

# 2. Thêm toàn bộ các file đã thay đổi vào Git
git add .

# 3. Tạo commit với nội dung mô tả rõ ràng
git commit -m "feat: mô tả ngắn gọn tính năng bạn vừa làm"

# 4. Đẩy branch của bạn lên GitHub
git push -u origin feature/ten-tinh-nang-moi
```

---

### Bước 4: Tạo Pull Request & Chờ Admin Phê Duyệt

1. Truy cập vào GitHub: [https://github.com/khanhphamvn222/web2](https://github.com/khanhphamvn222/web2)
2. Bạn sẽ thấy thông báo màu vàng xuất hiện: **"feature/ten-tinh-nang-moi had recent pushes"** -> Nhấn nút **Compare & pull request**.
3. Nhập mô tả các thay đổi đã thực hiện và nhấn **Create pull request**.
4. **Admin (Chủ repo)** sẽ vào tab **Pull requests**, kiểm tra code, review và nhấn **Approve & Merge** để đưa code vào `main`.

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
1. **Không commit trực tiếp lên `main`**: Nhánh `main` đã được bật chế độ bảo vệ (Branch Protection), mọi commit đều phải thông qua Pull Request.
2. **Không commit thư mục `node_modules` hoặc `dist`** (Đã có trong `.gitignore`).
3. **Kiểm tra `npm run build` hoặc `npm run dev`** trước khi tạo PR để tránh lỗi TypeScript/Build.
