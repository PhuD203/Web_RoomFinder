# Web_RoomFinder

Web_RoomFinder là hệ thống tìm kiếm và quản lý phòng trọ và đăng tin thuê trọ, giúp người dùng dễ dàng tìm kiếm phòng phù hợp, xem thông tin chi tiết, xem vị trí trên bản đồ và liên hệ với chủ phòng.

## 🚀 Công nghệ sử dụng

### Frontend

- ReactJS
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- React Leaflet
- Leaflet

### Backend

- Java 17
- Spring Boot
- Spring Data JPA
- Spring Security
- JWT

### Database

- MySQL

## ⚙️ Cài đặt và chạy

### 1. Clone project

```bash
git clone <repository-url>
cd TroFinder
```

### 2. Cấu hình Frontend

Tạo file `.env` trong thư mục `frontend`.

Các biến môi trường:

```env
VITE_PORT
VITE_SERVER_URL
VITE_API_URL
```

Ví dụ:

```env
VITE_PORT=3000
VITE_SERVER_URL=http://localhost:507
VITE_API_URL=http://localhost:507/api
```

> Có thể thay đổi các giá trị trên tùy theo cấu hình môi trường.

Cài đặt thư viện:

```bash
cd frontend
npm install
```

Chạy Frontend:

```bash
npm run dev
```

### 3. Cấu hình Backend

Tạo file `.env` trong thư mục `backend`.

Các biến môi trường:

```env
SERVER_PORT
FRONTEND_URL
DB_URL
DB_USERNAME
DB_PASSWORD
JWT_SECRET
JWT_EXPIRATION
```

Ví dụ:

```env
SERVER_PORT=507
FRONTEND_URL=http://localhost:3000

DB_URL=jdbc:mysql://localhost:3306/findrentalroom?useSSL=false&serverTimezone=Asia/Ho_Chi_Minh&allowPublicKeyRetrieval=true
DB_USERNAME=root
DB_PASSWORD=

JWT_SECRET=your-secret-key
JWT_EXPIRATION=your-expiration-time
```

> Thay đổi `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET` và các giá trị cấu hình khác theo môi trường của bạn.

### 4. Cấu hình Database

Tạo database MySQL:

```sql
CREATE DATABASE findrentalroom;
```

Sau đó cấu hình thông tin kết nối MySQL trong file `.env` của Backend.

### 5. Chạy Backend

Mở thư mục `backend` bằng IntelliJ IDEA hoặc IDE hỗ trợ Spring Boot và chạy ứng dụng.

## 📁 Cấu trúc project

```text
TroFinder/
├── .gitignore
│
├── frontend/
│   ├── .env
│   └── ...
│
└── backend/
    ├── .env
    └── ...
```
