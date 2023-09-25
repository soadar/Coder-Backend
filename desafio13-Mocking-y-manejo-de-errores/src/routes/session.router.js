import { Router } from "express";
import * as controller from '../controllers/user.controllers.js';
import { validateLogin } from "../middlewares/errorHandler.js";

const router = Router();

router.get('/current', validateLogin, controller.getByIdDTO);

export default router;