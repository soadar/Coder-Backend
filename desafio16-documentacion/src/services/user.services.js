import UserRepository from "../persistence/repository/user/user.repository.js";
const userRepository = new UserRepository();

import UserDao from "../persistence/daos/mongodb/user.dao.js";
const userDao = new UserDao();

import log from "../utils/logger.js";
import Services from "./class.services.js";

export default class UserService extends Services {
    constructor() {
        super(userDao);
    }

    loginUser = async (user) => {
        try {
            const response = await userDao.loginUser(user);
            return response;
        } catch (error) {
            log.fatal(error.message);
        }
    };

    getByEmail = async (email) => {
        try {
            const response = await userDao.getByEmail(email);
            return response;
        } catch (error) {
            log.fatal(error.message);
        }
    };

    getByCart = async (cid) => {
        try {
            const response = await userDao.getByCart(cid);
            return response;
        } catch (error) {
            log.fatal(error.message);
        }
    };

    registerUser = async (user) => {
        try {
            const response = await userDao.registerUser(user);
            return response;
        } catch (error) {
            log.fatal(error.message);
        }
    };

    getByIdDTO = async (id) => {
        try {
            const response = await userRepository.getByIdDTO(id);
            if (!response) return false;
            else return response;
        } catch (error) {
            log.fatal(error.message);
        }
    }
    recoverPass = async (email, password) => {
        try {
            const response = await userDao.recoverPass(email, password);
            return response;
        } catch (error) {
            log.fatal(error.message);
        }
    };
}

