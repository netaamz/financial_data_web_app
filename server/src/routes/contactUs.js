import express from 'express';
import { contactUs } from '../controllers/contactUsController.js';

const router = express.Router();

// Define the endpoint for contact us
router.post('/', (req, res, next) => {
    console.log('Contact Us request received');
    next();
}, contactUs);

export default router;