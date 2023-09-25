import { ProductModel } from "./models/product.model.js";
import MongoDao from "./mongo.dao.js";

export default class ProductDaoMongo extends MongoDao {
    constructor() {
        super(ProductModel);
    }

    async getAll(page = 1, limit = 10, sort, query) {
        try {
            let options = { page, limit }
            options.sort = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};
            let filter = {};
            for (const key in query) {
                if (query[key]) {
                    filter[key] = query[key];
                }
            }
            const response = await this.model.paginate(filter, options);
            return response;
        } catch (error) {
            next(error);
        }
    }
}