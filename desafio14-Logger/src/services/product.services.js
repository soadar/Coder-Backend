import ProductManager from "../persistence/daos/mongodb/product.dao.js";
const prodDao = new ProductManager();

import ProductRepository from "../persistence/repository/product/product.repository.js";
import log from "../utils/logger.js";
const prodRepository = new ProductRepository();

export const getAll = async (page, limit, sort, query) => {
    try {
        const item = await prodDao.getAll(page, limit, sort, query);
        if (!item) return false;
        else return item;
    } catch (error) {
        log.fatal(error.message)
    }
}

export const getById = async (id) => {
    try {
        const item = await prodDao.getById(id);
        if (!item) return false;
        else return item;
    } catch (error) {
        log.fatal(error.message)
    }
}

export const create = async (obj) => {
    try {
        const newProd = await prodDao.create(obj);
        if (!newProd) return false;
        else return newProd;
    } catch (error) {
        log.fatal(error.message)
    }
}

export const update = async (id, obj) => {
    try {
        const item = await prodDao.update(id, obj);
        return item;
    } catch (error) {
        log.fatal(error.message)
    }
}

export const remove = async (id) => {
    try {
        const item = await prodDao.delete(id);
        return item;
    } catch (error) {
        log.fatal(error.message)
    }
}

export const getByIdDTO = async (id) => {
    try {
        const prod = await prodRepository.getByIdDTO(id);
        if (!prod) return false;
        else return prod;
    } catch (error) {
        log.fatal(error.message)
    }
}