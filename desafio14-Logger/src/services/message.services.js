import ProductManager from "../persistence/daos/mongodb/message.dao.js";
import log from "../utils/logger.js";
const prodDao = new ProductManager();

export const getAll = async () => {
    try {
        const response = await prodDao.getAll();
        return response;
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
