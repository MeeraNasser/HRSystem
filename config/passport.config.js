
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/Users')
require('dotenv').config();
require('dotenv').config({path: __dirname + '/.env'});
const JWT_SECRET = process.env.JWT_SECRET ;

module.exports = (passport) => {
    const opts = {};
    // console.log(process.env.JWT_SECRET);
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = JWT_SECRET;
    passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
        // console.log(jwt_payload);
        User.findOne({where: {Email: jwt_payload.user.Email}}).then(user => {
            if(!user) {
                return done(null,false);
            }
            user.Password = undefined;
            delete user.Password;
            return done(null,user);
        }).catch(err => {
            return done(err, false);
        })
    }));

};
