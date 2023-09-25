import { createTransport } from 'nodemailer';
import config from '../../config.js';


export const transporter = createTransport({
    service: 'gmail',
    // host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.GMAIL_EMAIL,
        pass: config.GMAIL_PASSWORD
    }
});