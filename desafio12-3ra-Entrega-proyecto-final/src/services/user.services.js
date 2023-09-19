import UserDao from "../persistence/daos/mongodb/user.dao.js";
import UserRepository from "../persistence/repository/user/user.repository.js";

const userDao = new UserDao();

const userRepository = new UserRepository();

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


export const getByIdDTO = async (id) => {
    try {
        const prod = await userRepository.getByIdDTO(id);
        if (!prod) return false;
        else return prod;
    } catch (error) {
        console.log(error);
    }
}
