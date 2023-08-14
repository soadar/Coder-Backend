import UserDao from "../DAO/mongodb/user.dao.js";
const userDao = new UserDao();

export const loginUser = async (req, res, next) => {
    try {
        if (req.user) {
            res.redirect('/products')
        } else {
            res.render('login', { msg: 'Usuario o contraseña incorrecta.', alert: 'danger' })
        }
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
