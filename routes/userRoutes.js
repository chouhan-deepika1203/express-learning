import express from 'express';
import { getAllUsers, getUser, createUser, updateUser, deleteUser, getProfile } from '../controllers/userController.js';
import { logger } from '../middleware/logger.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', logger, getAllUsers); // route specific logger middleware for GET /users
router.get('/profile', authenticateToken, getProfile);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
