import { Router } from "express";
import { isUser, isUserOrPrem } from "../middlewares/errorHandler.js";

import CartController from '../controllers/cart.controllers.js';
const cartController = new CartController();

const router = Router();

router
    .get('/', cartController.getAll)
    .post('/', cartController.create)

    .get('/:id', cartController.getById)
    .delete('/:cid', cartController.delProdsInCart)

    .post('/:cid/products/:pid', isUserOrPrem, cartController.update)
    .put('/:cid/products/:pid', isUser, cartController.updateCant)
    .delete('/:cid/products/:pid', cartController.delProdInCart)

    .get('/:cid/purchase', cartController.purchase);

export default router;