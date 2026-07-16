import express from 'express';
import {
  registerUser,
  authUser,
  getUserProfile,
  sendOtp,
  verifyOtp,
  changePassword,
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/me', protect, getUserProfile);
router.put('/change-password', protect, changePassword);

export default router;
