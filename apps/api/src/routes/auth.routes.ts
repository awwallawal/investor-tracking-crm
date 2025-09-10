import { Router } from 'express';
import { loginUser } from '../controllers/auth.controller';

const router = Router();

// @route   POST /api/v1/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginUser);

export default router;
