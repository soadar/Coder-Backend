import fs from "fs";
import { __dirname } from '../../utils.js';
import ProductManager from './product.dao.js';
const pathFile = __dirname + "/db/carrito.json";

const manager = new ProductManager();

export default class CartManager {
    constructor() {
        this.path = pathFile;
        this.loadFile();
        this.carts = [];
    }

    async create() {
        this.idCart++;
        let aux = { id: this.idCart, products: [] };
        this.carts.push(aux);
        return await this.saveFile();
    }

    async update(idCart, idProduct) {
        try {
            const index = this.carts.findIndex((cart) => cart.id === idCart);
            if (index !== -1) {
                if (await manager.getById(idProduct)) {
                    let carroIndex = this.carts[index].products.findIndex((cart) => cart.id === idProduct);
                    if (carroIndex !== -1) {
                        let cant = this.carts[index].products[carroIndex].quantity;
                        this.carts[index].products[carroIndex].quantity = cant + 1;
                    } else {
                        let aux = { id: idProduct, quantity: 1 };
                        this.carts[index].products.push(aux);
                    }

                } else {
                    return "El producto no fue encontrado";
                }
                await this.saveFile();
                return this.carts[index];
            } else {
                return "El carrito no fue encontrado";
            }

        } catch (error) {
            return error;
        }
    }

    async getAll() {
        return this.carts;
    }

    async loadFile() {
        try {
            if (fs.existsSync(this.path)) {
                const cartsJs = await fs.promises.readFile(this.path, 'utf-8');
                if (cartsJs) {
                    this.carts = JSON.parse(cartsJs);
                    this.idCart = this.carts[this.carts.length - 1]["id"];
                } else {
                    this.idCart = 0;
                }
            }
        } catch (error) {
            return error;
        }
    }

    async getById(id) {
        id = Number(id)
        return this.carts.find(cart => cart.id === id);
    }

    async delete(id) {
        if (await this.getCartById(id)) {
            const cartsNew = this.carts.filter(cart => cart.id !== id);
            this.carts = cartsNew;
            return await this.saveFile();
        } else {
            return "El producto no fue encontrado";
        }
    }

    async saveFile() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
            return this.carts;
        } catch (error) {
            return error;
        }
    }
}