import { createHash, isValidPassword } from '../../../utils.js';
import log from '../../../utils/logger.js';
import CartDao from '../mongodb/cart.dao.js';
import { UserModel } from "./models/user.model.js";
import MongoDao from "./mongo.dao.js";
const cartDao = new CartDao();

export default class UserDaoMongo extends MongoDao {
    constructor() {
        super(UserModel);
    }

    async loginUser(user) {
        try {
            const { email, password } = user;
            const userExist = await this.getByEmail(email);
            if (userExist) {
                const validPass = isValidPassword(password, userExist);
                return validPass ? userExist : false;
            }
            else return false;
        } catch (error) {
            log.fatal(error.message)
        }
    };

    async registerUser(user) {
        try {
            const { email, password } = user;
            const userExist = await this.getByEmail(email);
            if (!userExist) {
                if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
                    return await this.model.create({
                        ...user,
                        password: createHash(password),
                        cart: await cartDao.create(),
                        role: 'admin'
                    });
                }
                return await this.model.create({
                    ...user,
                    password: createHash(password),
                    cart: await cartDao.create(),
                    role: 'user'
                });
            } else return false;
        } catch (error) {
            log.fatal(error.message)
        }
    };

    async getById(id) {
        try {
            const userExist = await this.model.findById(id).populate('cart') //propiedad - atributo
            return userExist ? userExist : false;
        } catch (error) {
            log.fatal(error.message)
        }
    };

    async getByEmail(email) {
        try {
            const userExist = await this.model.findOne({ email });
            return userExist ? userExist : false;
        } catch (error) {
            log.fatal(error.message)
        }
    };

    async getByCart(cart) {
        try {
            const userExist = await this.model.findOne({ cart });
            return userExist ? userExist : false;
        } catch (error) {
            log.fatal(error.message)
        }
    };
}