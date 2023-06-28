import { Router } from "express";
import cartManager from '../managers/cartManager.js';

const router = Router();
const manager = new cartManager('src/carts.json');

router.get('/', async (req, res) => {
    res.json(await manager.getCarts());
});

router.post('/', async (req, res) => {
    res.json(await manager.addCart());
});

router.get('/:cid', async (req, res) => {
    try {
        //        const product = await manager.getProductById(id);
        //if (product) {
        const { cid } = req.params;
        const cart = await manager.getCartById(Number(cid))
        if (cart) {
            res.status(200).json(cart)
            //res.json({ message: `El producto con id: ${id} fue actualizo` });
        } else {
            res.status(400).json({ message: `El producto con id: ${cid} no fue encontrado` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        if (!isNaN(Number(cid)) && !isNaN(Number(pid))) {
            //console.log(Number(cid), Number(pid));
            //({ message: 'Cart found', cart })
            res.json(await manager.updateCart(Number(cid), Number(pid)))
        }
        else {
            res.status(400).json({ message: `los parametros no son numericos` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

export default router;