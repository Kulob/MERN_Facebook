import express from 'express';
import { getLike, addLike, deleteLike } from '../controllers/likeControllers.js';

const router = express.Router();

router.get('/', getLike);
router.post('/', addLike);
router.delete('/', deleteLike);

export default router;
