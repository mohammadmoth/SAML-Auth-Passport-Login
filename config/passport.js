const { SamlStrategy } = require('passport-saml');
const fs = require("fs");

module.exports = function (passport, config) {

  passport.serializeUser(function (user, done) {
    console.log("serializeUser")
    console.log(user)
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {

    console.log("deserializeUser")
    console.log(user)
    done(null, user);
  });

  passport.use(new SamlStrategy(
    {
      issuer: config.passport.saml.issuer,
      protocol: 'http://',
      path: config.passport.saml.path,
      entryPoint: config.passport.saml.entryPoint,
      cert: fs.readFileSync(config.passport.saml.cert, 'utf-8')
    },
    function (profile, done) {

      return done(null,
        {
          id: profile.uid,
          email: profile.email,
          displayName: profile.cn,
          firstName: profile.givenName,
          lastName: profile.sn
        });
    })
  );

};
