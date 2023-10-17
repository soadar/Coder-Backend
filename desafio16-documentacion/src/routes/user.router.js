import { Router } from "express";
import passport from "passport";

import UserController from '../controllers/user.controllers.js';
const userController = new UserController();

import { HttpResponse } from "../utils/http.response.js";
const http = new HttpResponse();

const router = Router();

router.post("/login",
    passport.authenticate('login', {
        failureRedirect: "/api/users/loginMsg?error=1",
        successRedirect: "/api/users/loginMsg?error=1"
    }))

router.get('/loginMsg', (req, res) => {
    const { error } = req.query;
    if (error === '1') return http.Ok(res, 'Login ok');
    else if (error === '2') return http.Unauthorized(res, 'Unauthorized')
})
// router.get('/loginMsg', (req, res) => {
//     const { error } = req.query;
//     if (error === '1') res.json({status: 200, msg: 'Success', data:  })
//     else if (error === '2') res.status(401).json({ msg: 'Failed' })
// })

router.get('/current', userController.getByIdDTO);

router.get('/premium/:uid', userController.premium);

export default router;