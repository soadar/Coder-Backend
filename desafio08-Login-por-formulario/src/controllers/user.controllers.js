import CartManager from "../DAO/mongodb/cart.dao.js";
import * as service from "../services/user.services.js";
const cartManager = new CartManager();

export const loginUser = async (req, res) => {
    try {
        const user = await service.loginUser(req.body);
        if (user) {
            req.session.info = {
                loggedIn: true,
                count: 1
            }
            req.session.datos = {
                nombre: user.first_name,
                apellido: user.last_name,
                email: user.email,
                edad: user.age,
                role: user.role,
            }
            res.redirect('products')
        }
    } catch (error) {
        console.log(error);
    }
};

export const registerUser = async (req, res, next) => {
    try {
        const newUser = await service.registerUser(req.body);
        if (newUser) {
            res.render('login', { createOk: true })
        } else {
            res.render('login', { createFail: true })
        }
    } catch (error) {
        console.log(error);
    }
};

