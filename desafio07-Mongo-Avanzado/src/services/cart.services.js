//import ProductManager from "../DAO/FileSystem/cart.dao.js";
//const prodDao = new ProductManager();

import ProductManager from "../DAO/mongodb/cart.dao.js";
const prodDao = new ProductManager();

export const getAll = async () => {
    try {
        const response = await prodDao.getAll();
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getById = async (id) => {
    try {
        const response = await prodDao.getById(id);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const create = async (obj) => {
    try {
        const response = await prodDao.create(obj);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const update = async (cid, pic) => {
    try {
        const response = await prodDao.update(cid, pic);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const updateCant = async (cid, pic, cant) => {
    try {
        const response = await prodDao.updateCant(cid, pic, cant);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const delProdInCart = async (cid, pic) => {
    try {
        const response = await prodDao.delProdInCart(cid, pic);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const delProdsInCart = async (cid) => {
    try {
        const response = await prodDao.delProdsInCart(cid);
        return response;
    } catch (error) {
        console.log(error);
    }
}