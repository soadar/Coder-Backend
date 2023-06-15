import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();

const manager = new ProductManager('./productos.json');

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Bienvenido' })
});

app.get('/products', async (req, res) => {
    try {
        const { limit } = req.query;
        //console.log(req.params);
        //console.log(req.query);
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
        //console.log(req.params);
        const { pid } = req.params;
        //console.log(pid);
        const prod = await manager.getProductById(Number(pid));
        if (prod) {
            res.json(prod)
        } else {
            res.json({ msg: 'Producto no encontrado' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


//! PRECIO MAYOR A: --- |BUSCAR| ---> GET a /products?value=`${value}`

app.listen(8090, () => {
    console.log('server express listening on port 8090');
});

// app.listen(0, function(){
//     console.log(`server express listening on port ${this.address().port}`);
// });