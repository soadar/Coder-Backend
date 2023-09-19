import { Router } from "express";
import * as controller from '../controllers/cart.controllers.js';
import { isUser } from "../middlewares/errorHandler.js";
const router = Router();

router.get('/', controller.getAll);

router.get('/:id', controller.getById);

router.post('/', controller.create);

router.post('/:cid/products/:pid', isUser, controller.update)

router.put('/:cid/products/:pid', isUser, controller.updateCant)

router.delete('/:cid/products/:pid', controller.delProdInCart)

router.delete('/:cid', controller.delProdsInCart)

router.get('/:cid/purchase', controller.purchase);

export default router;