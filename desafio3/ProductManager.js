import fs from "fs";

export default class ProductManager {
    constructor(path) {
        this.path = path;
        this.counter = 0;
        this.products = [];
        this.loadFile();
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        this.counter++;
        const producto = {
            id: this.counter,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        //si falta algun parametro sale.
        if (arguments.length !== 6) {
            return "Todos los campos son obligatorios"
        }

        //verifica que no haya otro code igual, no valida al primero
        if (await this.getProductByCode(code)) {
            return "El codigo del producto esta repetido"
        }

        //genera el archivo
        this.products.push(producto);
        return await this.saveFile();
    }

    async getProducts() {
        return this.products;
    }

    async getProductsLimit(limit) {
        return this.products.slice(0, limit);
    }

    async loadFile() {
        try {
            if (fs.existsSync(this.path)) {
                const productsjs = await fs.promises.readFile(this.path, 'utf-8');
                this.products = JSON.parse(productsjs);
            } else {
                this.products = []
            }
        } catch (error) {
            return error;
        }
    }

    async getProductById(id) {
        return this.products.find(producto => producto.id === id)
    }

    async getProductByCode(code) {
        return this.products.find(producto => producto.code === code)
    }

    async updateProduct(id, key, newValue) {
        const index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
            this.products[index][key] = newValue;
            return await this.saveFile();
        } else {
            return "El producto no fue encontrado"
        }
    }

    async deleteProduct(id) {
        if (await this.getProductById(id)) {
            const productsNew = this.products.filter(producto => producto.id !== id)
            this.products = productsNew;
            return await this.saveFile();
        } else {
            return "El producto no fue encontrado"
        }
    }

    async saveFile() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            return "El archivo se modifico satisfactoriamente"
        } catch (error) {
            return error;
        }
    }
}

const manager = new ProductManager('productos.json');

const test = async () => {
    console.log("-------------- 1ra consulta --------------");
    console.log(await manager.getProducts());
    console.log(await manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc120", 25));
    console.log("-------------- repetido --------------");
    console.log(await manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc120", 25));
    console.log("-------------- 2da consulta --------------");
    console.log(await manager.getProducts());
    console.log("-------------- getProductById fail --------------");
    console.log(await manager.getProductById(5));
    console.log("-------------- getProductById ok --------------");
    console.log(await manager.getProductById(1));
    console.log("-------------- updateProduct, 2 ok, 1 fail --------------");
    console.log(await manager.updateProduct(1, "code", "codigoNuevo5555"));
    console.log(await manager.updateProduct(1, "stock", 0));
    console.log(await manager.updateProduct(5, "stock", 0));
    console.log(await manager.getProducts())
    console.log("-------------- deleteProduct fail --------------");
    console.log(await manager.deleteProduct(5));
    console.log("-------------- deleteProduct ok --------------");
    console.log(await manager.deleteProduct(1));
    console.log(await manager.getProducts());


    console.log("-------------- extrasss --------------");
    console.log(await manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc121", 25));
    console.log(await manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc122", 25));
    console.log(await manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25));
    console.log(await manager.getProducts())
    console.log(await manager.deleteProduct(4));
    console.log(await manager.getProducts())
}

//test();