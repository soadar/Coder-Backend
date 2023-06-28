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
        //console.log(Object.keys(req.body).length);

        // verificar que todos sean obligatorios
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
        const id = parseInt(pid);
        const product = await manager.getProductById(id);
        if (product) {
            await manager.updateProduct(id, datos);
            res.json({ message: `El producto con id: ${id} fue actualizo` });
        } else {
            res.status(400).json({ message: `El producto con id: ${id} no fue encontrado` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const id = parseInt(pid);
        const product = await manager.getProductById(id);
        if (product) {
            await manager.deleteProduct(id);
            res.status(200).json({ message: `El producto con id: ${id} se elimino correctamente` });
        } else {
            res.json({ message: `El producto con id: ${id} no fue encontrado` })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;