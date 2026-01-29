import express from 'express';
import * as wishlistController from '../controllers/wishlistController.js';

const router = express.Router();

router.post('/add', wishlistController.addToWishlist);
router.post('/remove', wishlistController.removeFromWishlist);

export default router;
