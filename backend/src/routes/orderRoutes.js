import express from 'express';
import * as orderController from '../controllers/orderController.js';

const router = express.Router();

router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id/status', orderController.updateOrderStatus);
router.put('/:id/payment-status', orderController.updatePaymentStatus);
router.put('/:id/cancel', orderController.cancelOrder);
router.delete('/:id', orderController.deleteOrder);

export default router;
