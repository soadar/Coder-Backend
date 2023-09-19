import factory from "../../daos/factory.js";
import UserResDTO from "../../dtos/user/user.res.dto.js";
const { userDao } = factory;

export default class ProductRepository {
    constructor() {
        this.dao = userDao;
    }

    async getByIdDTO(id) {
        try {
            const response = await this.dao.getById(id);
            const aux = new UserResDTO(response)
            return new UserResDTO(response);
        } catch (error) {
            console.log(error);
        }
    }
}