import fs from "fs";

export default class ProductManager {
    constructor(path) {
        this.path = path;
        this.loadFile();
        this.products = [];
    }

    async addProduct(title, description, code, price, status = true, stock, category, thumbnails) {
        this.counter++;
        const producto = {
            id: this.counter,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails,
        };

        //checkea que las propiedades contengan algun valor, menos thumbnails
        let sinThubs = Object.values(producto).slice(0, 8);
        let check = Object.values(sinThubs).some((element) => element === null || element === "" || element === undefined)
        if (check) {
            return "Todos los cambos son obligatorios"
        }

        //verifica que no haya otro code igual, no valida al primero
        if (await this.getProductByCode(code)) {
            this.counter--;
            return "El codigo del producto esta repetido";
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
                this.counter = this.products[this.products.length - 1]["id"]
            } else {
                this.counter = 0;
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

    async updateProduct(id, datos) {
        const index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...datos, id };
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