import express from 'express';
import { getUserProfile, loginUser, registerUser } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', protect, getUserProfile);

export default userRouter;
