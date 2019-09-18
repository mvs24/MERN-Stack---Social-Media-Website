const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const moongose = require("mongoose");
const User = require("../models/User");
const keys = require("../secret/keys");


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports= passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
        // console.log(jwt_payload);
        User.findById(jwt_payload.id).then(user=>{
            //console.log(user);
            if(user){
                
                return done(null, user);
            }
            return done(null, false);
        })
    }));
}
