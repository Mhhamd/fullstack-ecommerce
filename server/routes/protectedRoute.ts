import express from 'express';
import validateToken from '../controllers/validateTokenController';

const router = express.Router();

router.get('/', validateToken);

export default router;
