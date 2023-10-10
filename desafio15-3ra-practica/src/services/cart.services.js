import UserManager from "../persistence/daos/mongodb/user.dao.js";
const userDao = new UserManager();

import CartManager from "../persistence/daos/mongodb/cart.dao.js";
const cartDao = new CartManager();

import log from "../utils/logger.js";
import Services from "./class.services.js";

export default class CartService extends Services {
    constructor() {
        super(cartDao);
    }

    update = async (cid, pid, owner) => {
        try {
            const response = await cartDao.update(cid, pid, owner);
            return response;
        } catch (error) {
            log.fatal(error.message);
        }
    }

    updateCant = async (cid, pic, cant) => {
        try {
            const response = await cartDao.updateCant(cid, pic, cant);
            return response;
        } catch (error) {
            log.fatal(error.message);
        }
    }

    delProdInCart = async (cid, pic) => {
        try {
            const response = await cartDao.delProdInCart(cid, pic);
            return response;
        } catch (error) {
            log.fatal(error.message);
        }
    }

    delProdsInCart = async (cid) => {
        try {
            const response = await cartDao.delProdsInCart(cid);
            return response;
        } catch (error) {
            log.fatal(error.message);
        }
    }

    purchase = async (cid) => {
        try {
            const response = await cartDao.purchase(cid);
            return response;
        } catch (error) {
            log.fatal(error.message);
        }
    }

    getByCart = async (cid) => {
        try {
            const response = await userDao.getByCart(cid);
            return response;
        } catch (error) {
            log.fatal(error.message);
        }
    }
}
