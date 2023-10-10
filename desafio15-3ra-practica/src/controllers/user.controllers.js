import dictionaryError from "../utils/errors.dictionary.js";

import { HttpResponse } from "../utils/http.response.js";
const http = new HttpResponse();

import UserService from "../services/user.services.js";
const userService = new UserService();

import Controllers from "./class.controller.js";

export default class userController extends Controllers {
    constructor() {
        super(userService);
    }

    loginUser = async (req, res, next) => {
        try {
            if (req.user) res.redirect('/products')
            return res.render('login', { msg: 'Invalid username or password.', alert: 'danger' })
        } catch (error) {
            next(error);
        }
    };

    registerUser = async (req, res, next) => {
        try {
            res.json({
                msg: 'register ok',
                session: req.session
            })
        } catch (error) {
            next(error);
        }
    };

    githubUser = async (req, res, next) => {
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

    premium = async (req, res, next) => {
        try {
            const { uid } = req.params;
            const user = await userService.getById(uid);
            if (!user) return http.NotFound(res, dictionaryError.NOT_FOUND)
            if (user.role === 'user') user.role = 'premium';
            else if (user.role === 'premium') user.role = 'user';
            user.save();
            return http.Ok(res, user);
        } catch (error) {
            next(error);
        }
    };

    getByIdDTO = async (req, res, next) => {
        try {
            if (req.user) {
                const { id } = req.user;
                const response = await userService.getByIdDTO(id);
                if (!response) return http.NotFound(res, dictionaryError.NOT_FOUND);
                return http.Ok(res, response);
            }
        } catch (error) {
            next(error);
        }
    }
}

