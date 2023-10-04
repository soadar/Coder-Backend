import log from "../../../utils/logger.js";
import factory from "../../daos/factory.js";
import ProductResDTO from "../../dtos/product/product.res.dto.js";
const { prodDao } = factory;

export default class ProductRepository {
    constructor() {
        this.dao = prodDao;
    }

    async getByIdDTO(id) {
        try {
            const response = await this.dao.getById(id);
            return new ProductResDTO(response);
        } catch (error) {
            log.fatal(error.message)
        }
    }
}