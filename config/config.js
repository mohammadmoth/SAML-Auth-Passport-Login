module.exports = {
  development: {
    passport: {
      strategy: 'saml',
      saml: {
        path: process.env.SAML_PATH || '/login/callback',
        entryPoint: process.env.SAML_ENTRY_POINT || 'https://test.ADFD.com/app/test/test/sso/saml',
        issuer: 'http://www.ADFD.com/token',
        cert: "./okta.pam" || null,

      }
    }
  }
};
