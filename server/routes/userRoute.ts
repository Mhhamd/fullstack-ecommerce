import express from 'express';
import {
    addToCart,
    loginUser,
    registerUser,
    removeFromCart,
} from '../controllers/userController';
import { authUser } from '../middleware/auth';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/add-to-cart', authUser, addToCart);
router.delete('/remove-from-cart', authUser, removeFromCart);

export default router;
