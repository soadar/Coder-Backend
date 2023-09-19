import { Router } from "express";
import * as controller from '../controllers/product.controllers.js';
import { isAdmin } from "../middlewares/errorHandler.js";

const router = Router();

router.get('/', controller.getAll);

router.get('/:id', controller.getById);

router.post('/', isAdmin, controller.create);

router.put('/:id', isAdmin, controller.update);

router.delete('/:id', isAdmin, controller.remove);

export default router;