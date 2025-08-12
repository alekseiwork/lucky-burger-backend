# 🍔 Lucky Burger — Backend

**Lucky Burger Backend** is a **simplified demo version** of a complex backend application for managing online restaurant operations.  
This project is based on fragments of my previous production work, adapted and reduced for portfolio purposes.

## 🚀 Features

- **Express.js REST API** with routes for orders, menu, and admin panel  
- **MongoDB** + Mongoose for data storage  
- **Socket.IO** for real-time order tracking  
- **CORS** and JSON body parsing  
- **.env** environment configuration  
- Static file serving for the frontend build  
- SPA-friendly route handling

## 📦 Tech Stack

- **Backend:** Node.js, Express.js, TypeScript  
- **Database:** MongoDB (Mongoose)  
- **Real-time:** Socket.IO  
- **Other:** dotenv, cors, path  

## 📂 API Routes

| Method | Endpoint            | Description |
|--------|--------------------|-------------|
| GET    | `/api/menu`        | Retrieve menu items (optionally by category) |
| POST   | `/api/menu`        | Create a new menu item |
| DELETE | `/api/menu/:id`    | Delete a menu item by ID |
| GET    | `/api/orders`      | Retrieve all orders |
| POST   | `/api/orders`      | Create a new order |
| GET    | `/api/admin`       | Admin-related operations |

## ⚡ Real-time Orders

Socket.IO connects on server start and broadcasts new orders in real time.

```ts
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
});
