import { Router } from "express";
import passport from "passport";

import { uploader } from '../middlewares/multer.js';

import UserController from '../controllers/user.controllers.js';
const userController = new UserController();

import { HttpResponse } from "../utils/http.response.js";
const http = new HttpResponse();

import { validateLogin } from "../middlewares/errorHandler.js";
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

router.get('/current', validateLogin, userController.getByIdDTO);

router.get('/premium/:uid', validateLogin, userController.premium);

router.get('/:uid/documents', validateLogin, (req, res) => {
    let user = req.user
    user = user.toObject();
    res.render('documents', { user })
})

const cpUpload = uploader.fields([{ name: 'profile' }, { name: 'product', maxCount: 8 }, { name: 'document' }, { name: 'address' }, { name: 'stateAccount' }]);

router.post('/:uid/documents', validateLogin, cpUpload, async (req, res, next) => {
    try {
        const user = await userService.getByEmail(req.user.email);
        if (req.files['profile']) {
            const profile = req.files['profile'][0]
            console.log(profile);

            user.documents.push({ name: profile.filename, reference: profile.path });
        }
        if (req.files['document']) {
            const document = req.files['document'][0]
            console.log(document);

            user.documents.push({ name: `document_${document.filename}`, reference: document.path });
        }
        if (req.files['address']) {
            const address = req.files['address'][0]
            console.log(address);

            user.documents.push({ name: `address_${address.filename}`, reference: address.path });
        }
        if (req.files['stateAccount']) {
            const stateAccount = req.files['stateAccount'][0]
            console.log(stateAccount);

            user.documents.push({ name: `stateAccount_${stateAccount.filename}`, reference: stateAccount.path });
        }
        user.save();
        return http.Ok(res, user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;