import { HttpResponse } from "../utils/http.response.js";
import log from "../utils/logger.js";
const http = new HttpResponse();

export const errorHandler = (error, req, res, next) => {
    log.fatal(`${error.stack}`);
    return http.ServerError(res, 'Internal Server Error')
}

export const noLogAgain = (req, res, next) => {
    if (req.session?.isLoggedIn) return res.redirect('/products');
    next();
};

export const validateLogin = (req, res, next) => {
    if (req.isAuthenticated() || req.user?.isGitHub) return next();
    else res.render('login', { msg: 'Debe iniciar sesion.', alert: 'danger' })
};

export const isAdmin = (req, res, next) => {
    if (req.user?.role === 'admin') next();
    else {
        log.warning('Intento de acceso no autorizado')
        http.Unauthorized(res, 'Usuario no autorizado.')
    }
};

export const adminOrPrem = (req, res, next) => {
    if (req.user?.role === 'admin' || req.user?.role === 'premium') next();
    else {
        log.warning('Intento de acceso no autorizado')
        http.Unauthorized(res, 'Usuario no autorizado.')
    }
};

export const isUser = (req, res, next) => {
    if (req.user?.role === 'user') next();
    else http.Unauthorized(res, 'Debe iniciar sesion.')
};

export const isUserOrPrem = (req, res, next) => {
    if (req.user?.role === 'user' || req.user?.role === 'premium') next();
    else http.Unauthorized(res, 'Debe iniciar sesion.')
};
