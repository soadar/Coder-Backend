import { Router } from "express";
import CartManager from "../DAO/mongodb/cart.dao.js";
import ProductManager from "../DAO/mongodb/product.dao.js";
import * as service from "../services/product.services.js";

const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();


router.get("/", async (req, res) => {
  const products = await productManager.getAll();
  res.render("index", { products });
});

router.get('/chat', (req, res) => {
  res.render('chat')
});

router.get("/realtimeproducts", async (req, res) => {
  res.render("realtimeproducts");
});

router.get("/carts/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getById(cid);
    if (cart) {

      const prods = [];
      cart?.products?.forEach((e) => {
        prods.push(e._id);
      })
      res.render("cart", { prods });
    } else {
      res.status(500).json({
        status: 'error',
        msg: 'Ocurrio un error.',
        error: error.message
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      msg: 'Ocurrio un error.',
      error: error.message
    });
  }


});

router.get('/products', async (req, res) => {
  const { page, limit, sort, title, description, code, price, status, stock, category, thumbnails } = req.query;
  const query = {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  }

  const response = await service.getAll(page, limit, sort, query);

  let params = '';
  let flag = 0;
  for (const key in query) {
    if (query[key]) {
      params += `${key}=${query[key]}&`;
      flag = 1;
    }
  }
  let next = response.hasNextPage ? `http://localhost:8080/products?page=${response.nextPage}` : null;
  let prev = response.hasPrevPage ? `http://localhost:8080/products?page=${response.prevPage}` : null;
  if (flag === 1) {
    next = response.hasNextPage ? `http://localhost:8080/products?${params}page=${response.nextPage}` : null;
    prev = response.hasPrevPage ? `http://localhost:8080/products?${params}page=${response.prevPage}` : null;
  }
  res.render('products', {
    status: "success",
    payload: response.docs,
    count: response.totalDocs,
    pages: response.totalPages,
    totalPages: response.totalPages,
    prevPage: response.prevPage,
    nextPage: response.nextPage,
    page: Number(response.page),
    hasNextPage: response.hasNextPage,
    hasPrevPage: response.hasPrevPage,
    next,
    prev,
  })
});

export default router;
