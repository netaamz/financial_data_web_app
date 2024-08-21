import express from 'express';

const router = express.Router();

import { signupUser, loginUser } from '../controllers/userController.js';


// Routes
router.post('/', signupUser);

router.post('/login', loginUser);


export default router;
