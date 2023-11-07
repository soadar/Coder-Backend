import { Router } from "express";
import passport from "passport";

import { uploader } from '../middlewares/multer.js';

import UserController from '../controllers/user.controllers.js';
const userController = new UserController();

import { HttpResponse } from "../utils/http.response.js";
const http = new HttpResponse();

import UserService from "../services/user.services.js";
const userService = new UserService();


const router = Router();

router.post("/login", (req, res, next) => {
    passport.authenticate('login', (err, user) => {
        if (!user) {
            return http.Unauthorized(res, 'Unauthorized')
        } else {
            return http.Ok(res, 'Login ok');
        }
    })(req, res, next)
})

router.get('/current', userController.getByIdDTO);

router.get('/premium/:uid', userController.premium);

router.get('/:uid/documents', (req, res) => {
    let user = req.user
    user = user.toObject();
    res.render('documents', { user })
})

const cpUpload = uploader.fields([{ name: 'profile', maxCount: 1 }, { name: 'product', maxCount: 8 }, { name: 'document', maxCount: 8 }]);

router.post('/:uid/documents', cpUpload, async (req, res, next) => {
    try {
        const user = await userService.getByEmail(req.user.email);
        req.files['document'].forEach((e) => {
            user.documents.push({ name: e.filename, reference: e.path });
        })
        user.save();
        return http.Ok(res, user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;