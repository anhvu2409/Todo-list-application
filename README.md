Todo List Application

A full-stack Todo List web application built with React and Node.js, supporting task management with user authentication.


📁 Project Structure

Todo-list-application/
├── controllers/       # Xử lý logic nghiệp vụ
├── middleware/        # Middleware (auth, validation,...)
├── models/            # Mongoose models (User, Task)
├── routes/            # Định nghĩa API routes
├── public/            # Static files
├── src/               # React frontend source
├── server.js          # Entry point - Express server
├── package.json       # Dependencies
└── tailwind.config.js # Tailwind CSS config


Yêu cầu


Node.js >= 16
MongoDB (local hoặc MongoDB Atlas)


Cài đặt & chạy

bash# Clone repo
git clone https://github.com/anhvu2409/Todo-list-application.git
cd Todo-list-application

# Cài dependencies
npm install

# Chạy server
npm start


🔑 Biến môi trường (Environment Variables)

Tạo file .env ở thư mục gốc:

envPORT=5000
MONGODB_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=your_jwt_secret_key


🌐 API Endpoints

Auth

MethodEndpointMô tảPOST/api/auth/registerĐăng ký tài khoảnPOST/api/auth/loginĐăng nhập

Tasks

MethodEndpointMô tảGET/api/tasksLấy danh sách taskPOST/api/tasksTạo task mớiPUT/api/tasks/:idCập nhật taskDELETE/api/tasks/:idXóa task

Tính năng


Đăng ký / Đăng nhập tài khoản
Thêm, sửa, xóa task
Đánh dấu task hoàn thành
Giao diện responsive với MUI & Tailwind CSS
Xác thực JWT bảo vệ các API



