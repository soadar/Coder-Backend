import UserDao from "../DAO/mongodb/user.dao.js";
const userDao = new UserDao();

export const loginUser = async (user) => {
    try {
        const newUser = await userDao.loginUser(user);
        return newUser;
    } catch (error) {
        console.log(error);
    }
};

export const registerUser = async (user) => {
    try {
        const newUser = await userDao.registerUser(user);
        return newUser;
    } catch (error) {
        console.log(error);
    }
};

