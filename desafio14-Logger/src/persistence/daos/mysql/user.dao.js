import { createHash, isValidPassword } from '../../../utils.js';
import log from '../../../utils/logger.js';
import CartDao from './cart.dao.js';
import { UserModel } from "./models/user.model.js";
import MySQLDao from "./mysql.dao.js";

const cartDao = new CartDao();

export default class UserDaoMySql extends MySQLDao {
    constructor() {
        super(UserModel)
    }

    async loginUser(user) {
        try {
            const { email, password } = user;
            const userExist = await this.getByAttr(email)
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
            const userExist = await this.getByAttr(email)
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
            const userExist = await this.getByAttr(id)
            return userExist ? userExist : false;
        } catch (error) {
            log.fatal(error.message)
        }
    };

    async getByAttr(attr) {
        try {
            const userExist = await this.findOne({
                where: {
                    attr
                }
            });
            return userExist ? userExist : false;
        } catch (error) {
            log.fatal(error.message)
        }
    };
}