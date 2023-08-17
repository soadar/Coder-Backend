import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();

const manager = new ProductManager('src/productos.json');

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Bienvenido' })
});

app.get('/products', async (req, res) => {
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

app.get('/products/:pid', async (req, res) => {
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

app.listen(8080, () => {
    console.log('server express listening on port 8080');
});
