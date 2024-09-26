import { Router } from 'express';
import { adminAuth } from '../middleware/authMiddleware';
import { createMenu, getMenu, deleteMenu } from '../controllers/menuController';
// import { createMenu, getMenu, uploadMenu } from '../controllers/menuController';

const router = Router();

// Creating new menu
router.post('/', adminAuth, createMenu);

// Getting the menu
router.get('/', getMenu);

// Deleting the menu
router.delete('/:id', adminAuth, deleteMenu);

// Uploading menu
// router.post('/upload', adminAuth, uploadMenu);

export default router;
