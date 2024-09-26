import express from 'express';
import { adminLogin, registerAdmin } from '../controllers/authController';
import { adminAuth } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/login', adminLogin);
router.post('/register', adminAuth, registerAdmin);

export default router;
