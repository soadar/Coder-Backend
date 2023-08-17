import express from "express";
import handlebars from "express-handlebars";
import morgan from "morgan";
import { Server } from "socket.io";
import ProductManager from "./managers/productManager.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import viewsRouter from "./routes/views.router.js";
import { __dirname } from "./utils.js";
const router = express.Router();
const manager = new ProductManager();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(errorHandler);

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/", viewsRouter);

// router.post("/api/products", async (req, res) => {
//   try {
//     const data = req.body;
//     const newProduct = await manager.addProduct(data);
//     res.json(newProduct);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
  console.log(`Server ok en puerto ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
  console.log(`Cliente conectado con id: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  socketServer.emit("cargaInicial", await manager.getProducts());

  socket.on("cargaPorPost", async (data) => {

    socketServer.emit("carga", await manager.addProduct(JSON.parse(data)));
  });

  socket.on("deletePorPost", async (id) => {
    console.log("acaaaaaaaaa");

    socketServer.emit("eliminado", await manager.deleteProduct(id));
  });
});
