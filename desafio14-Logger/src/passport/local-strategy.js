import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { emailWelcome } from '../controllers/email.controller.js';
import UserDao from '../persistence/daos/mongodb/user.dao.js';
import log from '../utils/logger.js';
const userDao = new UserDao();

const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
};

const login = async (req, email, password, done) => {
    try {
        const user = { email, password };
        const userLogin = await userDao.loginUser(user);
        if (!userLogin) return done(null, false, { message: 'User not found' });
        return done(null, userLogin);
    } catch (error) {
        log.fatal(error.message)
    }
};

const register = async (req, email, aux, done) => {
    try {
        const user = await userDao.getByEmail(email);
        if (user) return done(null, false);
        const newUser = await userDao.registerUser(req.body);
        emailWelcome(req);
        return done(null, newUser);
    } catch (error) {
        log.fatal(error.message)
    }
};

const registerStrategy = new LocalStrategy(strategyOptions, register);
const loginStrategy = new LocalStrategy(strategyOptions, login);

passport.use('login', loginStrategy);
passport.use('register', registerStrategy);

passport.serializeUser((user, done) => {
    done(null, user._id)
});

passport.deserializeUser(async (id, done) => {
    const user = await userDao.getById(id);
    return done(null, user);
});
