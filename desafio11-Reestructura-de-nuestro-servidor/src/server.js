import MongoStore from 'connect-mongo';
import cookieParser from "cookie-parser";
import express, { json, urlencoded } from "express";
import handlebars from "express-handlebars";
import session from 'express-session';
import morgan from "morgan";
import passport from 'passport';
import { Server } from 'socket.io';
import config from "../config.js";
import './DAO/mongodb/connection.js';
import { errorHandler } from "./middlewares/errorHandler.js";
import './passport/github-strategy.js';
import "./passport/local-strategy.js";
import cartRouter from './routes/cart.router.js';
import productRouter from './routes/product.router.js';
import sessionRouter from './routes/session.router.js';
import viewsRouter from "./routes/views.router.js";
import * as messageService from "./services/message.services.js";
import * as productService from "./services/product.services.js";
import { __dirname } from "./utils.js";

const mongoStoreOptions = {
  store: MongoStore.create({
    mongoUrl: config.MONGO_ATLAS_URL,
    crypto: {
      secret: '1234'
    }
  }),
  secret: '1234',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000
  }
};

const app = express();

app.use(json())
  .use(urlencoded({ extended: true }))
  .use(express.static(__dirname + "/public"))
  .use(morgan("dev"))
  .use(errorHandler)

  .engine("handlebars", handlebars.engine())
  .set("view engine", "handlebars")
  .set("views", __dirname + "/views")

  .use(cookieParser())
  .use(session(mongoStoreOptions))

  .use(passport.initialize())
  .use(passport.session())

  .use('/api/products', productRouter)
  .use('/api/carts', cartRouter)
  .use('/api/sessions', sessionRouter)
  .use("/", viewsRouter)

const PORT = config.PORT || 8080

const httpServer = app.listen(PORT, () => {
  console.log(`Server ok en puerto ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {

  socketServer.emit('messages', await messageService.getAll());

  socket.on('disconnect', () => {
    console.log('¡User disconnect!', socket.id);
  })

  socket.on('newUser', (user) => {
    console.log(`>${user} inició sesión`);
  })

  socket.on('chat:message', async (msg) => {
    await messageService.create(msg);
    socketServer.emit('messages', await messageService.getAll());
  })

  socket.emit('msg', 'bienvenido al chat');

  socket.on('newUser', (user) => {
    socket.broadcast.emit('newUser', user); //llega a todos, menos al que inició sesión
  })

  socket.on('chat:typing', (user) => {
    socket.broadcast.emit('chat:typing', user)
  })

  console.log(`Cliente conectado con id: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  socketServer.emit("cargaInicial", await productService.getAll());

  socket.on("cargaPorPost", async (msg) => {
    const products = await productService.getAll();
    socketServer.emit("carga", { msg, products });
  });

  socket.on("delete", async (msg) => {
    const products = await productService.getAll();
    socketServer.emit("eliminado", { msg, products });
  });
})