import { fakerES as faker } from "@faker-js/faker";
import { ProductMockModel } from '../mongodb/models/product.mock.model.js';
import MongoDao from "./mongo.dao.js";

export default class ProductDaoMongo extends MongoDao {
    constructor() {
        super(ProductMockModel);
    }

    async getMockUsers(cant = 5) {
        try {
            const users = [];
            for (let i = 0; i < cant; i++) {
                const user = await generateUser();
                users.push(user);
            }
            return users;
        } catch (error) {
            console.log(error)
        }
    };
}

const generateUser = async () => {
    return {
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        code: faker.string.uuid(),
        price: faker.commerce.price(),
        status: faker.datatype.boolean(),
        stock: faker.number.int(),
        category: faker.commerce.department(),
        thumbnails: faker.image.url()
    };
}