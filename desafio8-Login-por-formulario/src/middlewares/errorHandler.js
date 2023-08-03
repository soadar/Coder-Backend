export const errorHandler = (error, req, res, next) => {
    console.log(`${error.message}`);
    const status = error.status || 404
    res.status(status).send(error.message)
}

export const noLogAgain = (req, res, next) => {
    if (req.session.info?.loggedIn) {
        return res.redirect('/products');
    }
};

export const validateLogin = (req, res, next) => {
    if (req.session.info?.loggedIn) {
        next();
    } else {
        return res.render('login', { noLoggedIn: true })
    }
};

export const isAdmin = (req, res, next) => {
    if (req.session.datos?.role === 'admin') next();
    else res.json({ msg: 'Solo pueden ingresar admins' })
};