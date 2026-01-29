import express from 'express';
import { submitContactForm } from '../controllers/contactController.js';

const router = express.Router();

/**
 * POST /api/contact
 * Submit contact form
 * Body: { name, email, subject, message }
 */
router.post('/', submitContactForm);

export default router;
