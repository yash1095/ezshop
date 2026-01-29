import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/currentUser', userController.getCurrentUser);
router.post('/auth/login', userController.loginUser);
router.post('/auth/register', userController.registerUser);

export default router;
