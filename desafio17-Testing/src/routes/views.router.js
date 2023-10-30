import { Router } from "express";
import jwt from 'jsonwebtoken';
import passport from "passport";
import { isAdmin, isUser, noLogAgain, validateLogin } from "../middlewares/errorHandler.js";

import CartManager from "../persistence/daos/mongodb/cart.dao.js";
const cartManager = new CartManager();

import ProductMockManager from "../persistence/daos/mongodb/product.mock.dao.js";
const productMockManager = new ProductMockManager();

import ProductService from "../services/product.services.js";
const productService = new ProductService();

import UserService from "../services/user.services.js";
const userService = new UserService();

import { HttpResponse } from "../utils/http.response.js";
const http = new HttpResponse();

import { emailRecoverPass } from "../controllers/email.controller.js";
import dictionaryError from "../utils/errors.dictionary.js";
import log from "../utils/logger.js";

const secret = '12345'

const router = Router();

router.get("/", async (req, res) => {
  res.redirect("/login");
});

router.get('/chat', isUser, (req, res) => {
  res.render('chat')
});

router.get("/realtimeproducts", async (req, res) => {
  res.render("realtimeproducts");
});

router.get("/carts/:cid", validateLogin, async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getById(cid);
    if (!cart) return http.NotFound(res, dictionaryError.NOT_FOUND);

    const prods = [];
    cart.products.forEach((e) => {
      prods.push(e._id);
    })
    res.render("cart", { prods });
  } catch (error) {
    log.fatal(error.message);
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
    info: req.user,
    cart: req.user.cart._id
  })
});

router.get('/login', noLogAgain, (req, res) => {
  const { error } = req.query;
  if (error === 'fail') res.render('login', { msg: 'Usuario o contraseña incorrecta.', alert: 'danger' });
  res.render('login')
})

router.post("/login",
  passport.authenticate('login', {
    failureRedirect: "/login?error=fail",
    successRedirect: "/products"
  }))

router.get('/register', noLogAgain, (req, res) => {
  res.render('register')
})

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

router.get('/mockingproducts', async (req, res) => {
  const productsMock = await productMockManager.getMockUsers();
  res.json(productsMock);
});

router.get('/loggerTest', (req, res) => {
  log.debug('Debug message');
  log.http('HTTP message');
  log.info('Info message');
  log.warning('Warning message');
  log.error('Error message');
  log.fatal('Fatal message');
  res.send('probando logger')
})

router.get('/recoverPass', async (req, res) => {
  res.render('recoverPass')
});

router.post('/recoverPass', async (req, res) => {
  const { email } = req.body;
  const user = await userService.getByEmail(email)
  if (!user) return res.render('recoverPass', { msg: "El email no esta registrado." })

  const token = jwt.sign(
    { id: user._id },
    secret,
    { expiresIn: 3600 } //3600 1hora
  );

  const statusMail = await emailRecoverPass(user, token);
  if (!statusMail) return res.render('login', { msg: 'Error al enviar el email, vuelva a intentar.', alert: 'danger' })
  res.render('recoverPass', { msg: "Email enviado, verifique la su correo" })
});

router.get('/reset-password', async (req, res) => {
  try {
    const { token } = req.query;
    const decodedToken = jwt.verify(token, secret);

    const userId = decodedToken.id;
    let user = await userService.getById(userId);
    user = user.toObject();
    res.render('changePass', { user })
  } catch (error) {
    res.render('recoverPass', { msg: "El token expiró, vuelva a intentar" })
  }
});

router.post('/changePass', async (req, res) => {
  const { email, password } = req.body;

  const response = await userService.recoverPass(email, password);
  if (response === 2) return res.render('login', { msg: 'Esta ingresando la contraseña actual.', alert: 'danger' })
  if (response === 3) return res.render('login', { msg: 'El usuario no se encuentra registrado.', alert: 'success' })
  res.render('login', { msg: 'Contraseña modificada con exito, ya puedes iniciar sesion.', alert: 'success' })
});

export default router;