import { Router } from 'express';
import { emailWelcome } from '../controllers/email.controller.js';

const router = Router();

router.post('/sendWelcome', emailWelcome);

export default router;