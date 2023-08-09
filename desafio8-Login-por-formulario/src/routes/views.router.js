import { Router } from "express";
import CartManager from "../DAO/mongodb/cart.dao.js";
import ProductManager from "../DAO/mongodb/product.dao.js";
import * as userController from "../controllers/user.controllers.js";
import { isAdmin, noLogAgain, validateLogin } from "../middlewares/errorHandler.js";
import * as productService from "../services/product.services.js";

const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();


router.get("/", async (req, res) => {
  const products = await productManager.getAll();
  res.render("login", { products });
});

router.get('/chat', (req, res) => {
  res.render('chat')
});

router.get("/realtimeproducts", async (req, res) => {
  res.render("realtimeproducts");
});

router.get("/carts/:cid", validateLogin, async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getById(cid);
    if (cart) {
      const prods = [];
      cart.products.forEach((e) => {
        prods.push(e._id);
      })
      res.render("cart", { prods });
    } else {
      res.status(500).json({
        status: 'error',
        msg: 'El id del carrito no existe.',
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

router.get('/products', validateLogin, async (req, res) => {
  req.session.info.count++;

  let { page, limit, sort, title, description, code, price, status, stock, category, thumbnails } = req.query;
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
  if (isNaN(page)) page = 1;
  if (isNaN(limit)) limit = 10;

  const response = await productService.getAll(page, limit, sort, query);

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
  if (flag === 1 && limit !== 10) {
    prev = response.hasPrevPage ? `http://localhost:8080/products?${params}page=${response.prevPage}&limit=${limit}` : null;
    next = response.hasNextPage ? `http://localhost:8080/products?${params}page=${response.nextPage}&limit=${limit}` : null;
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
    session: req.session
  })
});

router.get('/login', noLogAgain, (req, res) => {
  res.render('login')
})

router.get('/register', noLogAgain, (req, res) => {
  res.render('register')
})

router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);

router.get('/logout', (req, res) => {
  req.session.destroy();
  return res.render('login', { logout: true })
})

router.get('/admin', isAdmin, (req, res) => {
  return res.status(200).send('Pagina para admins')
})

export default router;
