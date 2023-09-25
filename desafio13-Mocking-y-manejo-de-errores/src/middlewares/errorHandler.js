import { HttpResponse } from "../utils/http.response.js";
const http = new HttpResponse();

export const errorHandler = (error, req, res, next) => {
    console.log(`${error.message}`);
    const status = error.status || 404
    res.status(status).send(error.message)
}

export const noLogAgain = (req, res, next) => {
    if (req.session?.isLoggedIn) return res.redirect('/products');
    next();
};

export const validateLogin = (req, res, next) => {
    if (req.isAuthenticated() || req.user?.isGitHub) return next();
    res.render('login', { msg: 'Debe iniciar sesion.', alert: 'danger' })
};

export const isAdmin = (req, res, next) => {
    if (req.user?.role === 'admin') next();
    http.Unauthorized(res, 'Usuario no autorizado.')
};

export const isUser = (req, res, next) => {
    if (req.user?.role === 'user') next();
    http.Unauthorized(res, 'Debe iniciar sesion.')
};

