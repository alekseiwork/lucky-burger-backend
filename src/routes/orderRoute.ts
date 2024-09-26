import { Router } from 'express';
import {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController'; // Импортируйте функцию updateOrder
import { adminAuth } from '../middleware/authMiddleware';

const router = Router();

// Creating new order
router.post('/', createOrder);

// Getting all orders
router.get('/', adminAuth, getOrders);

// Updating order status
router.patch('/:id', adminAuth, updateOrder);

// Deleting order
router.delete('/:id', adminAuth, deleteOrder);

export default router;
