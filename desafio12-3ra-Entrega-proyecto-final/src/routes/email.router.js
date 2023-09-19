import { Router } from 'express';
import { sendGmail } from '../controllers/email.controller.js';

const router = Router();

router.post('/send', sendGmail);

export default router;