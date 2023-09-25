import { Router } from "express";
import * as controller from '../controllers/cart.controllers.js';
import { isUser } from "../middlewares/errorHandler.js";
const router = Router();

router.get('/', controller.getAll)
    .get('/:id', controller.getById)
    .post('/', controller.create)
    .post('/:cid/products/:pid', isUser, controller.update)
    .put('/:cid/products/:pid', isUser, controller.updateCant)
    .delete('/:cid/products/:pid', controller.delProdInCart)
    .delete('/:cid', controller.delProdsInCart)
    .get('/:cid/purchase', controller.purchase);

export default router;