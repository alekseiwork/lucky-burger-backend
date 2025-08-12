import { Router } from 'express';
import {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController';
import { adminAuth } from '../middleware/authMiddleware';

const router = Router();

router.post('/', createOrder);

router.get('/', adminAuth, getOrders);

router.patch('/:id', adminAuth, updateOrder);

router.delete('/:id', adminAuth, deleteOrder);

export default router;
