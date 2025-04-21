# Mini E-Commerce – Take Home Test Submission

This project is a mini e-commerce web application built for a take-home test. It demonstrates key features including authentication, product management, multi-role functionality, and wishlist simulation.

---

## 🌐 Live Demo

| Part     | Link                                                   |
|----------|--------------------------------------------------------|
| Frontend | [https://ecommerce-shop.vercel.app](https://simplee-commerce.vercel.app/) |
| Backend  | [https://api.yazkymaulana.my.id/api](https://api.yazkymaulana.my.id/api) |

### Account admin for test
- admin@gmail.com
- devadmin


---

## ✨ Features

### Customer
- Register & login (token-based)
- Update their profile
- Update or change password
- View product list
- Add product to wishlist
- View and manage wishlist


### Admin
- Login as admin
- Add, show, edit, delete Products 
- Add, edit, delete Users

### Multi Role User and Admin
### Responsive Design

---

## 📁 Project Structure
project-root/
├── backend/ # Laravel REST API (Sanctum + MySQL)
└── frontend/ # React App (TailwindCSS)

---

## Docs Postman
url: https://documenter.getpostman.com/view/18351570/2sB2iwEEYN
---

## ⚙️ How to Run Locally

### Backend (Laravel)
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

### Frontend (React)
cd frontend
npm install
npm start

*Make sure .env in React contains the API URL: REACT_APP_API_URL=https://api.yazkymaulana.my.id/api

🛠 Tech Stack
Frontend: React, Tailwind CSS, React Router DOM, React-icons

Backend: Laravel 11, Sanctum, MySQL

Deployment: Laravel on IDCloudHost, React on Vercel

📌 Notes
This app follows API-first architecture (frontend + backend separated)

API secured with Sanctum token-based auth

CORS and stateful domain properly configured

Simple role-based access handled via middleware

🙌 Author
Yazky Maulana Fajar Aji Saputra
Portfolio: https://yazkymaulana.my.id
