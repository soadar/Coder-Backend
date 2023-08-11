import UserDao from "../DAO/mongodb/user.dao.js";
const userDao = new UserDao();

export const loginUser = async (req, res, next) => {
    try {
        const user = await userDao.getById(req.session.passport.user);
        res.json({
            msg: 'login ok',
            user
        })
    } catch (error) {
        next(error);
    }
};

export const registerUser = async (req, res, next) => {
    try {
        res.json({
            msg: 'register ok',
            session: req.session
        })
    } catch (error) {
        next(error);
    }
};

export const githubUser = async (req, res, next) => {
    try {
        const { first_name, last_name, email, isGithub } = req.user;
        res.json({
            msg: "Register/Login Github OK",
            session: req.session,
            userData: {
                first_name,
                last_name,
                email,
                isGithub,
            },
        });
    } catch (error) {
        next(error.message);
    }
};
