import { createHash, isValidPassword } from "../../utils.js";
import CartDao from '../mongodb/cart.dao.js';
import { UserModel } from "./models/user.model.js";
const cartDao = new CartDao();

export default class UserDao {
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
            console.log(error);
        }
    };

    async registerUser(user) {
        try {
            const { email, password } = user;
            const userExist = await this.getByEmail(email);
            if (!userExist) {
                if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
                    return await UserModel.create({
                        ...user,
                        password: createHash(password),
                        cart: await cartDao.create(),
                        role: 'admin'
                    });
                }
                return await UserModel.create({
                    ...user,
                    password: createHash(password),
                    cart: await cartDao.create(),
                    role: 'user'
                });
            } else return false;
        } catch (error) {
            console.log(error);
        }
    };

    async getById(id) {
        try {
            const userExist = await UserModel.findById(id).populate('cart') //propiedad
            return userExist ? userExist : false;
        } catch (error) {
            console.log(error)
        }
    };

    async getByEmail(email) {
        try {
            const userExist = await UserModel.findOne({ email });
            return userExist ? userExist : false;
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    };
}