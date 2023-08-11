import { createHash, isValidPassword } from "../../utils.js";
import { UserModel } from "./models/user.model.js";

export default class UserDao {
    async loginUser(user) {
        try {
            const { email, password } = user;
            if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
                return { email };
            };
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
                    return false;
                }
                return await UserModel.create({
                    ...user,
                    password: createHash(password),
                    role: 'usuario'
                });
            } else return false;
        } catch (error) {
            console.log(error);
        }
    };

    async getById(id) {
        try {
            const userExist = await UserModel.findById(id)
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