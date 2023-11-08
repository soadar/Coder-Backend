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
            const response = await userService.loginUser(req.body)
            if (response) http.Ok(res, response);
            else return http.InvalidUser(res, response);
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
            let user = await userService.getById(uid);
            if (!user) return http.NotFound(res, dictionaryError.NOT_FOUND)

            const doc1 = user.documents.some((element) => element.name.match('document'));
            const doc2 = user.documents.some((element) => element.name.match('address'));
            const doc3 = user.documents.some((element) => element.name.match('stateAccount'));

            if (user.role === 'premium') {
                user.role = 'user';
                user.save();
                return http.Ok(res, user);
            }
            if (!(doc1 && doc2 && doc3)) {
                user = user.toObject();
                return res.render('documents', { msg: "No ha terminado de procesar su documentación", user })
            } else if (doc1 && doc2 && doc3 && user.role === 'user') user.role = 'premium';
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
                else return http.Ok(res, response);
            }
        } catch (error) {
            next(error);
        }
    }
}

