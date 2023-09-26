import config from '../../config.js';
import { transporter } from "../services/email.services.js";
import log from '../utils/logger.js';

export const emailWelcome = async (req, res) => {
    try {
        const { first_name, email } = req.body;
        const gmailOptions = {
            from: config.GMAIL_EMAIL,
            to: email,
            subject: 'Bienvenido/a',
            html: `<h1>Hola ${first_name}, ¡Te damos la bienvenida a la practica integradora!</h1>`
        };
        await transporter.sendMail(gmailOptions);
        log.info('email enviado!');
    } catch (error) {
        next(error)
    }
}
