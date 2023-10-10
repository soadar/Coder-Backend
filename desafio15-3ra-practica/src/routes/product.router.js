import { Router } from "express";
import { adminOrPrem, isAdmin } from "../middlewares/errorHandler.js";

import ProductController from '../controllers/product.controllers.js';
const productController = new ProductController();

const router = Router();

router.get('/', productController.getAll);

router.get('/:id', productController.getById);

router.post('/', adminOrPrem, productController.create);

router.put('/:id', isAdmin, productController.update);

router.delete('/:id', adminOrPrem, productController.remove);

export default router;