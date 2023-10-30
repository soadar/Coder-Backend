import fs from 'fs';
import { __dirname } from '../../../utils.js';
const pathFile = __dirname + "/db/productos.json";

export default class ProductDaoFS {
  constructor() {
    this.path = pathFile;
    this.loadFile();
    this.products = [];
  }

  async create(obj) {
    this.counter++;

    const producto = {
      id: this.counter,
      title: obj.title,
      description: obj.description,
      code: obj.code,
      price: Number(obj.price),
      status: obj.status,
      stock: Number(obj.stock),
      category: obj.category,
      thumbnails: obj.thumbnails
    };

    //checkea que las propiedades contengan algun valor, menos thumbnails
    let sinthumbs = Object.values(producto).slice(0, 8);
    let check = Object.values(sinthumbs).some(
      (element) => element === null || element === "" || element === undefined
    );
    if (check) {
      return "Todos los cambos son obligatorios";
    }

    //verifica que no haya otro code igual, no valida al primero
    if (await this.getProductByCode(producto.code)) {
      this.counter--;
      return "El codigo del producto esta repetido";
    }

    //genera el archivo
    this.products.push(producto);
    await this.saveFile();
    return `El producto con id: ${producto.id} fue dado de alta`;
  }

  async getAll() {
    return this.products;
  }

  async getAllLimit(limit) {
    return this.products.slice(0, limit);
  }

  async loadFile() {
    try {
      if (fs.existsSync(this.path)) {
        const productsjs = await fs.promises.readFile(this.path, "utf-8");
        this.products = JSON.parse(productsjs);
        this.counter = this.products[this.products.length - 1]["id"];
      } else {
        this.counter = 0;
        this.products = [];
      }
    } catch (error) {
      return error;
    }
  }

  async getById(id) {
    return this.products.find((producto) => producto.id === id);
  }

  async getProductByCode(code) {
    return this.products.find((producto) => producto.code === code);
  }

  async update(id, datos) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...datos, id };
      return await this.saveFile();
    } else {
      return "El producto no fue encontrado";
    }
  }

  async delete(id) {
    id = Number(id);
    if (await this.getById(id)) {
      const productsNew = this.products.filter(
        (producto) => producto.id !== id
      );
      this.products = productsNew;
      await this.saveFile();
      return `El producto con id: ${id} fue eliminado`;
    } else {
      return "El producto no fue encontrado";
    }
  }

  async saveFile() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.products));
      return "El archivo se modifico satisfactoriamente";
    } catch (error) {
      return error;
    }
  }
}
