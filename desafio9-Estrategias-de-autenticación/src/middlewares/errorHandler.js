export const errorHandler = (error, req, res, next) => {
    console.log(`${error.message}`);
    const status = error.status || 404
    res.status(status).send(error.message)
}

export const noLogAgain = (req, res, next) => {
    if (req.session.isLoggedIn) {
        return res.redirect('/products');
    } next();
};

export const validateLogin = (req, res, next) => {
    if (req.isAuthenticated() || req.user?.isGitHub) return next();
    return res.render('login', { noLoggedIn: true })
};

export const isAdmin = (req, res, next) => {
    if (req.user.role === 'admin') next();
    else res.json({ msg: 'Solo pueden ingresar admins' })
};

