const fs = require('fs');

class ProductManager {

    constructor(path) {
        this.products = [];
        this.path = path;
        this.counter = 0;
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



        //Si falta algun parametro sale.
        if (arguments.length !== 6) {
            return "Todos los campos son obligatorios"
        }

        //verifica que no haya otro code igual, no valida al primero
        if (producto.id > 1) {
            const repetido = await this.getProductByCode(code)
            if (repetido) {
                return "El codigo del producto esta repetido"
            }
        }

        //genera el archivo
        try {
            const products = await this.getProducts();
            products.push(producto);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return "Se agrego satisfactoriamente"
        } catch (error) {
            return error;
        }
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const productsjs = await fs.promises.readFile(this.path, 'utf-8');
                const products = JSON.parse(productsjs);
                return products;
            } else {
                return []
            }
        } catch (error) {
            return error;
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();
            const product = products.find(producto => producto.id === id)
            if (product && typeof (product) !== 'string') {
                return product;
            } else {
                return "El producto no existe"
            }
        } catch (error) {
            return error;
        }
    }

    async getProductByCode(code) {
        try {
            const products = await this.getProducts();
            const product = products.find(producto => producto.code === code)
            if (product && typeof (product) !== 'string') {
                return product;
            }
        } catch (error) {
            return error;
        }
    }

    async updateProduct(id, campo, valorNuevo) {
        const products = await this.getProducts();
        const product = products.find(producto => producto.id === id)
        try {
            if (product && typeof (product) !== 'string') {
                products.forEach(element => {
                    if (element.id == id) {
                        element[campo] = valorNuevo;
                    }
                });
                await fs.promises.writeFile(this.path, JSON.stringify(products));
                return "El producto fue actualizado"
            } else {
                return "El producto no existe"
            }
        } catch (error) {
            return "Error con el archivo";
        }
    }

    async deleteProduct(id) {
        const product = await this.getProductById(id);
        try {
            if (product && typeof (product) !== 'string') {
                const products = await this.getProducts();
                const productsNew = products.filter(producto => producto.id !== id)
                await fs.promises.writeFile(this.path, JSON.stringify(productsNew));
                return "Se elimino satisfactoriamente"
            } else {
                return "El producto no existe"
            }
        } catch (error) {
            return "Error con el archivo", error;
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

test();