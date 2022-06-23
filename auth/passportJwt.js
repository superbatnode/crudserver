const { TOKEN_KEY } = require('../config');
const { User } = require('../database');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
    const passport  = require("passport");
const passportJwt = () => {
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = TOKEN_KEY;
    // opts.issuer = 'accounts.examplesoft.com';
    // opts.audience = 'yoursite.net';
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({ id: jwt_payload.sub }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
}
module.exports = passportJwt; 

//will impletment it later