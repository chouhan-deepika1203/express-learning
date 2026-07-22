import express from 'express';
import { getAllUsers, getUser, createUser, updateUser, deleteUser, getProfile } from '../controllers/userController.js';
import { logger } from '../middleware/logger.js';
import { authenticateToken } from '../middleware/auth.js';
import { authorizeRole } from '../middleware/authorize.js';

const router = express.Router();

router.get('/', logger, getAllUsers); // route specific logger middleware for GET /users
router.get('/profile', authenticateToken, getProfile);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', authenticateToken, authorizeRole('admin', 'manager'), deleteUser);

export default router;
