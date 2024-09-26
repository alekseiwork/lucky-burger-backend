import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import http from 'http'; // Adding http module
import { Server } from 'socket.io'; // Importing socket.io
import orderRoute from './routes/orderRoute'; // Import Order route
import menuRoute from './routes/menuRoute'; // Import Menu route
import adminRoute from './routes/adminRoute'; // Import Admin route

// Loading .env variables
dotenv.config();

// Creating Express-app
const app = express();
app.use(cors());
app.use(express.json());

// Creating HTTP server
const server = http.createServer(app); // Creating server using http

// Creating Socket.io server
const io = new Server(server, {
  cors: {
    origin: '*', // Specifying allowed origins, you can specify a specific domain
  },
});

// Connecting to MongoDB
const mongoURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.qxwol.mongodb.net/luckyburger`;
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.error('Connection error to MongoDB:', err);
  });

// Connecting socket to track new orders
io.on('connection', (socket) => {
  // console.log('A user connected:', socket.id);

  // Disconnecting user
  socket.on('disconnect', () => {
    // console.log('A user disconnected:', socket.id);
  });
});

// Connecting routes
app.use('/api/orders', orderRoute);
app.use('/api/menu', menuRoute);
app.use('/api/admin', adminRoute);

// Static files (if your React-frontend is collected to build-folder)
app.use(express.static(path.join(__dirname, 'build')));

// Easiest route
app.get('/', (req, res) => {
  res.send('Server is working!');
});

// Handling all other routes and sending index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Exporting server and io
export { server, io };
