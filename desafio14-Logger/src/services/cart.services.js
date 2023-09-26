import CartManager from "../persistence/daos/mongodb/cart.dao.js";
const cartDao = new CartManager();

import UserManager from "../persistence/daos/mongodb/user.dao.js";
const userDao = new UserManager();

export const getAll = async () => {
    try {
        const response = await cartDao.getAll();
        return response;
    } catch (error) {
        next(error);
    }
}

export const getById = async (id) => {
    try {
        const response = await cartDao.getById(id);
        return response;
    } catch (error) {
        next(error);
    }
}

export const create = async () => {
    try {
        const response = await cartDao.create();
        return response;
    } catch (error) {
        next(error);
    }
}

export const update = async (cid, pic) => {
    try {
        const response = await cartDao.update(cid, pic);
        return response;
    } catch (error) {
        next(error);
    }
}

export const updateCant = async (cid, pic, cant) => {
    try {
        const response = await cartDao.updateCant(cid, pic, cant);
        return response;
    } catch (error) {
        next(error);
    }
}

export const delProdInCart = async (cid, pic) => {
    try {
        const response = await cartDao.delProdInCart(cid, pic);
        return response;
    } catch (error) {
        next(error);
    }
}

export const delProdsInCart = async (cid) => {
    try {
        const response = await cartDao.delProdsInCart(cid);
        return response;
    } catch (error) {
        next(error);
    }
}

export const purchase = async (cid) => {
    try {
        const response = await cartDao.purchase(cid);
        return response;
    } catch (error) {
        next(error);
    }
}

export const getByCart = async (cid) => {
    try {
        const response = await userDao.getByCart(cid);
        return response;
    } catch (error) {
        next(error);
    }
}