import express from 'express';
import cartRouter from './routes/cartRouter.js';
import productRouter from './routes/productRouter.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

const port = 8080

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})