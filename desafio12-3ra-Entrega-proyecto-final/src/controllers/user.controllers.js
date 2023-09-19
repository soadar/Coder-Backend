import * as service from "../services/user.services.js";

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

export const getByIdDTO = async (req, res, next) => {
    try {
        if (req.user) {
            const { id } = req.user;
            const item = await service.getByIdDTO(id);
            if (!item)
                res.status(404).json({
                    method: "service",
                    error: "User not found",
                });
            else res.status(200).json(item);
        }
    } catch (error) {
        next(error.message);
    }
}