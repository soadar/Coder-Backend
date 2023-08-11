// npm i passport-github2
import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github2';
import UserDao from '../DAO/mongodb/user.dao.js';
const userDao = new UserDao();

const strategyOptions = {
    clientID: 'Iv1.aed21c624944202a',
    clientSecret: 'e51f35034b1b317d5f71285264c365e4331251b4',
    callbackURL: 'http://localhost:8080/register-github-ok',
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    const email = profile._json.email !== null ? profile._json.email : `${profile._json.id}-${profile.username}@github.com`;
    const user = await userDao.getByEmail(email);

    if (user) return done(null, user);
    const newUser = await userDao.registerUser({
        first_name: profile._json.name !== null ? profile._json.name.split(' ')[0] : profile.username,
        last_name: profile._json.name !== null ? profile._json.name.split(' ')[1] : profile.username,
        email,
        password: '',
        isGitHub: true
    });
    return done(null, newUser);
}

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));