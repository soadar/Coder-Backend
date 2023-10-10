import { Router } from "express";
import { validateLogin } from "../middlewares/errorHandler.js";

import UserController from '../controllers/user.controllers.js';
const userController = new UserController();

const router = Router();

router.get('/current', validateLogin, userController.getByIdDTO);

router.get('/premium/:uid', userController.premium);

export default router;