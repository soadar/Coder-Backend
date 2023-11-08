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
        log.fatal(error.message)
    }
}

export const emailRecoverPass = async (user, token) => {
    try {
        const gmailOptions = {
            from: config.GMAIL_EMAIL,
            to: user.email,
            subject: 'Recuperar contraseña',
            html: `<h1>Hola ${user.last_name}, ${user.first_name}. 
            Para recuperar tu contraseña, ingresa al siguiente link!</h1>
            <a href="http://localhost:8080/reset-password?token=${token}" target="_blank" style="color:white; background-color:blue; text-decoration:none; font-size:22px; padding:20px; border-radius:5px" >Recuperar</a>
            `
        };

        const response = await transporter.sendMail(gmailOptions);
        return response;
    } catch (error) {
        log.fatal(error.message)
    }
}
