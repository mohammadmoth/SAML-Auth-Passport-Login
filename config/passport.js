const { Strategy } = require('passport-saml');
const fs = require("fs");

module.exports = function (passport, config) {

  passport.serializeUser(function (user, done) {
    console.log(user)
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    console.log(user)
    done(null, user);
  });

  passport.use(new Strategy(
    {
      issuer: config.passport.saml.issuer,
      protocol: 'http://',
      path: config.passport.saml.path,
      entryPoint: config.passport.saml.entryPoint,
      cert: fs.readFileSync(config.passport.saml.cert, 'utf-8')
    },
    function (profile, done) {

      return done(null, profile);
    })
  );

};
