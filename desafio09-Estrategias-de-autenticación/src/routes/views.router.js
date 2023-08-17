import { Router } from "express";
import passport from "passport";
import CartManager from "../DAO/mongodb/cart.dao.js";
import ProductManager from "../DAO/mongodb/product.dao.js";
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
  req.session.isLoggedIn = true
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
    info: req.user
  })
});

router.get('/login', noLogAgain, (req, res) => {
  const { error } = req.query;
  if (error === 'fail') res.render('login', { msg: 'Usuario o contraseña incorrecta.', alert: 'danger' });
  res.render('login')
})

router.get('/register', noLogAgain, (req, res) => {
  res.render('register')
})

router.post("/login",
  passport.authenticate('login', {
    failureRedirect: "/login?error=fail",
    successRedirect: "/products"
  }))

router.post("/register", (req, res, next) => {
  passport.authenticate('register', (err, user) => {
    if (!user) {
      res.render('login', { msg: 'El email ya se encuentra registrado.', alert: 'danger' })
    } else {
      res.render('login', { msg: 'Usuario creado con exito, ya puedes iniciar sesion.', alert: 'success' })
    }
  })(req, res, next)
})

router.get('/logout', (req, res) => {
  req.session.destroy();
  return res.render('login', { msg: 'Se cerro la sesion correctamente.', alert: 'success' })
})

router.get('/admin', validateLogin, isAdmin, (req, res) => {
  return res.status(200).send('Bienvenido a la pagina excluvisa para admins')
})

router.get('/register-github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/register-github-ok', passport.authenticate('github', { scope: ['user:email'] }), (req, res) => res.redirect('/products'));

export default router;
