import { Router } from "express";
import ProductManager from '../managers/productManager.js';

const router = Router();
const manager = new ProductManager('src/productos.json');

router.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        if (limit) {
            res.status(200).json(await manager.getProductsLimit(limit))
        } else {
            res.status(200).json(await manager.getProducts())
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const prod = await manager.getProductById(Number(pid));
        if (prod) {
            res.json(prod)
        } else {
            res.json({ message: 'Producto no encontrado' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/', async (req, res) => {
    try {
        const { title, description, code, price, status, stock, category, thumbnails } = req.body;
        const newProduct = await manager.addProduct(title, description, code, Number(price), Boolean(status), Number(stock), category, thumbnails);
        res.json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/:pid", async (req, res) => {
    try {
        const datos = req.body;
        const { pid } = req.params;
        const product = await manager.getProductById(Number(pid));
        if (product) {
            await manager.updateProduct(Number(pid), datos);
            res.json({ message: `El producto con id: ${pid} fue actualizo` });
        } else {
            res.status(400).json({ message: `El producto con id: ${pid} no fue encontrado` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await manager.getProductById(Number(pid));
        if (product) {
            await manager.deleteProduct(Number(pid));
            res.status(200).json({ message: `El producto con id: ${pid} se elimino correctamente` });
        } else {
            res.json({ message: `El producto con id: ${pid} no fue encontrado` })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;