import express from 'express';
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/userController.js';
import { logger } from '../middleware/logger.js';

const router = express.Router();

router.get('/', logger, getAllUsers); // route specific logger middleware for GET /users
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;