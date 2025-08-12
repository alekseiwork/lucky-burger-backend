import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io'; 
import orderRoute from './routes/orderRoute';
import menuRoute from './routes/menuRoute'; 
import adminRoute from './routes/adminRoute';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const mongoURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.qxwol.mongodb.net/luckyburger`;
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.error('Connection error to MongoDB:', err);
  });

io.on('connection', (socket) => {
  // console.log('A user connected:', socket.id);

  // Disconnecting user
  socket.on('disconnect', () => {
    // console.log('A user disconnected:', socket.id);
  });
});

app.use('/api/orders', orderRoute);
app.use('/api/menu', menuRoute);
app.use('/api/admin', adminRoute);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.send('Server is working!');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

export { server, io };
