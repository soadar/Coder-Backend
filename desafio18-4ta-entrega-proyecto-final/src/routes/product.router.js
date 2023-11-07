import { Router } from "express";
import { adminOrPrem, isPrem } from "../middlewares/errorHandler.js";

import ProductController from '../controllers/product.controllers.js';
const productController = new ProductController();

const router = Router();

router
    .get('/', productController.getAll)
    .post('/', isPrem, productController.create)

    .get('/:id', productController.getById)
    .put('/:id', adminOrPrem, productController.update)
    .delete('/:id', adminOrPrem, productController.remove);

export default router;