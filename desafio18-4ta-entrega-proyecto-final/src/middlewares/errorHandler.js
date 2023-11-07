import { HttpResponse } from "../utils/http.response.js";
import log from "../utils/logger.js";
const http = new HttpResponse();

export const errorHandler = (error, req, res, next) => {
    log.fatal(`${error.stack}`);
    return http.ServerError(res, 'Internal Server Error')
}

export const noLogAgain = (req, res, next) => {
    if (req.session?.isLoggedIn) return res.redirect('/products');
    return next();
};

export const validateLogin = (req, res, next) => {
    if (req.isAuthenticated() || req.user?.isGitHub) return next();
    else return res.render('login', { msg: 'Debe iniciar sesion.', alert: 'danger' })
};

export const isAdmin = (req, res, next) => {
    if (req.user?.role === 'admin') return next();
    else {
        log.warning('Intento de acceso no autorizado')
        return http.Unauthorized(res, 'Usuario no autorizado.')
    }
};

export const isUser = (req, res, next) => {
    if (req.user?.role === 'user') return next();
    else return http.Unauthorized(res, 'Debe iniciar sesion.')
};

export const adminOrPrem = (req, res, next) => {
    if (process.env.MODE === 'dev') return next();
    if (req.user?.role === 'admin' || req.user?.role === 'premium') return next();
    else {
        log.warning('Intento de acceso no autorizado')
        return http.Unauthorized(res, 'Usuario no autorizado.')
    }
};

export const isUserOrPrem = (req, res, next) => {
    if (process.env.MODE === 'dev') return next();
    if (req.user?.role === 'user' || req.user?.role === 'premium') return next();
    else return http.Unauthorized(res, 'Debe iniciar sesion.')
};

export const isPrem = (req, res, next) => {
    if (process.env.MODE === 'dev') return next();
    if (req.user?.role === 'premium') return next();
    else return http.Unauthorized(res, 'Debe iniciar sesion.')
};
