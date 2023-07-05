import { Router } from "express";
import ProductManager from '../managers/productManager.js';

const router = Router();
const manager = new ProductManager();

router.get('/', async (req, res) => {
    const products = await manager.getProducts();
    res.render('index', { products })
});

router.get('/realtimeproducts', async (req, res) => {
    res.render('realtimeproducts',);
});

export default router