import { Router } from 'express';
import { adminAuth } from '../middleware/authMiddleware';
import { createMenu, getMenu, deleteMenu } from '../controllers/menuController';
// import { createMenu, getMenu, uploadMenu } from '../controllers/menuController';

const router = Router();

router.post('/', adminAuth, createMenu);

router.get('/', getMenu);

router.delete('/:id', adminAuth, deleteMenu);

// Uploading menu
// router.post('/upload', adminAuth, uploadMenu);

export default router;
