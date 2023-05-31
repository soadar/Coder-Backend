class ProductManager {
    products = [];

    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        let mensaje = ''
        const producto = {
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        if (this.products.length === 0) {
            this.products.push(producto);
            return "Producto cargado"
        }

        if (arguments.length !== 6) {
            return "Todos los campos son obligatorios"
        }

        this.products.forEach(() => {
            if (!this.buscarProducto(producto.code)) {
                this.products.push(producto);
                mensaje = "Producto cargado"
            } else {
                mensaje = "El producto esta repetido"
            }
        })
        return mensaje
    }

    getProducts() {
        return this.products;
    }

    buscarProducto(codigo) {
        return this.products.find(producto => producto.code === codigo);
    }

    checkParameters(producto) {
        for (const prop in producto) {
            console.log(prop);
        }
    }
    getProductById(id) {
        let product = this.products.find(producto => producto.id === id)
        if (product) {
            return product
        } else {
            return "Not found"
        }
    }
}

//title, description, price, thumbnail,code, stock
const producto = new ProductManager();

console.log("--------------- Start ---------------");
console.log("--------------- getProducts vacio ---------------");
console.log(producto.getProducts());
console.log(producto.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25));

console.log("--------------- getProducts ---------------");
console.log(producto.getProducts());

console.log("--------------- addProduct repetido ---------------");
console.log(producto.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25));

console.log("--------------- getProductById ok ---------------");
console.log(producto.getProductById(1));

console.log("--------------- getProductById no existe ---------------");
console.log(producto.getProductById(2));

console.log("--------------- Extra addProduct sin algun parametro ---------------");
console.log(producto.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", 25));

console.log("--------------- End ---------------");



// producto.addProduct("nombre del producto2", "descripcion del prod2", 9002, "sasa2.jpg", 0002, 82)
// producto.addProduct("nombre del producto3", "descripcion del prod3", 9003, "sasa3.jpg", 0003, 83)
// producto.addProduct("nombre del producto4", "descripcion del prod4", 9003, "sasa4.jpg", 0003, 84)
// producto.addProduct("nombre del producto5", "descripcion del prod4", 9003, "sasa4.jpg", 0003) //falta un parametro, no se agrega