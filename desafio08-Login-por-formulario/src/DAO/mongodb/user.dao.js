import { UserModel } from "./models/user.model.js";

export default class UserDao {
    async loginUser(user) {
        try {
            const { email, password } = user;
            if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
                return user = {
                    email: 'adminCoder@coder.com',
                    password: 'adminCod3r123',
                    role: 'admin'
                }
            }
            const userExist = await UserModel.findOne({ email });
            if (userExist) return userExist;
            else return false;
        } catch (error) {
            console.log(error);
        }
    };

    async registerUser(user) {
        try {
            const { email, password } = user;
            const existUser = await UserModel.findOne({ email });
            if (!existUser) {
                const newUser = await UserModel.create({ ...user, role: 'usuario' });
                return newUser;
            } else return false;
        } catch (error) {
            console.log(error);
        }
    };
}