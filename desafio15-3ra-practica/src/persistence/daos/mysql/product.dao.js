import { ProductModel } from "./models/product.model.js";
import MySQLDao from "./mysql.dao.js";

export default class ProductDaoMySql extends MySQLDao {
    constructor() {
        super(ProductModel)
    }
};

