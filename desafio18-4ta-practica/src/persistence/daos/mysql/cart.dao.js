import log from "../../../utils/logger.js";
import { CartModel } from "./models/cart.model.js";
import MySQLDao from "./mysql.dao.js";

export default class CartDaoMongoDB extends MySQLDao {
    constructor() {
        super(CartModel);
    }

    async getById(id) {
        try {
            if (id.length != 24) {
                return false;
            }
            const response = await this.model.findOne({
                where: {
                    id: id
                }
            });
            return response;
        } catch (error) {
            log.fatal(error.message);
        }
    }

    async update(cid, pid) {
        try {
            if (cid.length != 24 || pid.length != 24) {
                return false
            }
            const product = await ProductModel.findById(pid);
            if (product) {
                const idSearch = new ObjectId(pid);
                const cart = await this.model.findById(cid);
                if (cart) {
                    const found = cart.products.find(element => element["_id"].equals(idSearch));
                    if (found) {
                        found.quantity += 1;
                    } else {
                        cart.products.push({ _id: pid, quantity: 1 });
                    }
                    cart.save();
                    return cart;
                }
            }
            return false;
        } catch (error) {
            log.fatal(error.message);
        }
    }

    async delete(id) {
        try {
            if (id.length != 24) {
                return false;
            }
            const response = await this.model.destroy({
                where: {
                    id: id
                }
            });
            return response;
        } catch (error) {
            log.fatal(error.message);
        }
    }

    async updateCant(cid, pid, cant) {
        try {
            if (cid.length != 24 || pid.length != 24) {
                return false
            }
            const cart = await this.model.findById(cid);
            if (cart) {
                const prod = await ProductModel.findById(pid);
                if (prod) {
                    return await this.addProdToCart(cid, pid, cant);
                }
            }
            return false;
        } catch (error) {
            log.fatal(error.message);
        }
    }

    async addProdToCart(cid, pid, cant) {
        try {
            const cart = await this.model.findById(cid);
            const found = cart.products.find(element => element["_id"].equals(pid));
            if (found) {
                found.quantity = cant;
            } else {
                cart.products.push({ _id: pid, quantity: cant });
            }
            cart.save();
            return cart;
        } catch (error) {
            log.fatal(error.message);
        }
    }

    async delProdInCart(cid, pid) {
        try {
            if (cid.length != 24 || pid.length != 24) {
                return false
            }
            const cart = await this.model.findById(cid);
            if (cart) {
                const prod = await ProductModel.findById(pid);
                if (prod) {
                    const found = cart.products.find(element => element["_id"].equals(pid));
                    if (found) {
                        const newProducts = cart.products.filter(element => !element["_id"].equals(pid));
                        cart.products = newProducts;
                        cart.save();
                        return cart;
                    }
                }
            }
            return false;
        } catch (error) {
            log.fatal(error.message);
        }
    }

    async delProdsInCart(id) {
        try {
            if (id.length != 24) {
                return false;
            }
            const cart = await this.model.findById(id);
            if (cart) {
                if (cart.products.length) {
                    cart.products = [];
                    cart.save();
                    return cart;
                }
            }
            return false;
        } catch (error) {
            log.fatal(error.message);
        }
    }
}