import ProductRepository from "../persistence/repository/product/product.repository.js";
const prodRepository = new ProductRepository();

import ProductManager from "../persistence/daos/mongodb/product.dao.js";
const prodDao = new ProductManager();

import log from "../utils/logger.js";
import Services from "./class.services.js";

export default class ProductService extends Services {
    constructor() {
        super(prodDao);
    }

    getAll = async (page, limit, sort, query) => {
        try {
            const item = await prodDao.getAll(page, limit, sort, query);
            if (!item) return false;
            else return item;
        } catch (error) {
            log.fatal(error.message);
        }
    }

    getByIdDTO = async (id) => {
        try {
            const prod = await prodRepository.getByIdDTO(id);
            if (!prod) return false;
            else return prod;
        } catch (error) {
            log.fatal(error.message);
        }
    }
}

