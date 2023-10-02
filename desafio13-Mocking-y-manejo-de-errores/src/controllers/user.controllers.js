import * as service from "../services/user.services.js";
import { HttpResponse } from "../utils/http.response.js";
const http = new HttpResponse();

export const loginUser = async (req, res, next) => {
    try {
        if (req.user) res.redirect('/products')
        return res.render('login', { msg: 'Invalid username or password.', alert: 'danger' })
    } catch (error) {
        next(error);
    }
};

export const registerUser = async (req, res, next) => {
    try {
        res.json({
            msg: 'register ok',
            session: req.session
        })
    } catch (error) {
        next(error);
    }
};

export const githubUser = async (req, res, next) => {
    try {
        const { first_name, last_name, email, isGithub } = req.user;
        res.json({
            msg: "Register/Login Github OK",
            session: req.session,
            userData: {
                first_name,
                last_name,
                email,
                isGithub,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const getByIdDTO = async (req, res, next) => {
    try {
        if (req.user) {
            const { id } = req.user;
            const response = await service.getByIdDTO(id);
            if (!response) return http.NotFound(res, dictionaryError.USER_NOT_FOUND);
            return http.Ok(res, response);
        }
    } catch (error) {
        next(error);
    }
}