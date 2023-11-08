import { Router } from "express";
import ProductManager from "../DAO/fileSystem/product.dao.js";

const router = Router();
const manager = new ProductManager();

router.get("/", async (req, res) => {
  const products = await manager.getAll();
  res.render("index", { products });
});

router.get('/chat', (req, res) => {
  res.render('chat')
});

router.get("/realtimeproducts", async (req, res) => {
  res.render("realtimeproducts");
});

export default router;
