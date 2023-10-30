import { Router } from "express";
import passport from "passport";

import UserController from '../controllers/user.controllers.js';
const userController = new UserController();

import { HttpResponse } from "../utils/http.response.js";
const http = new HttpResponse();

const router = Router();

// router.post("/login",
//     passport.authenticate('login', {
//         failureRedirect: "/api/users/loginMsg?error=2",
//         successRedirect: "/api/users/loginMsg?error=1"
//     }))

router.post("/login", (req, res, next) => {
    passport.authenticate('login', (err, user) => {
        if (!user) {
            return http.Unauthorized(res, 'Unauthorized')
        } else {
            return http.Ok(res, 'Login ok');
        }
    })(req, res, next)
})

// router.get('/loginMsg', (req, res) => {
//     const { error } = req.query;
//     if (error === '1') return http.Ok(res, 'Login ok');
//     else if (error === '2') return http.Unauthorized(res, 'Unauthorized')
// })

router.get('/current', userController.getByIdDTO);

router.get('/premium/:uid', userController.premium);

export default router;