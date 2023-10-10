export default class ProductResDTO {
    constructor(product) {
        this.nombre = product.title
        this.precio = product.price
        this.disponibilidad = product.stock
    }
};