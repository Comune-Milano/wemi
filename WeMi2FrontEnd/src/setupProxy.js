
const proxy = require('http-proxy-middleware');
/**
 * Matching with react-app-base-url
 */
const routes = [
  '/invokeLogout',
  '/autenticazioneAdmin',
  '/authentication',
  '/graphql',
  '/login',
  '/logout',
  '/assert',
  '/metadata',
  '/errorlog',
];

module.exports = function(app) {
  app.use(proxy(routes, { 
    target: process.env.REACT_APP_WEMI2_BACKEND_URL,
    secure: false,
    changeOrigin: true,
    router: {
      '^/login': '/login',
      '^/logout': '/logout',
      '^/logoutcallback': '/logoutcallback',
      '^/assert': '/assert',
      '^/metadata': '/metadata',
      '^/graphql': '/graphql',
      '^/autenticazioneAdmin': '/autenticazioneAdmin',
      '^/authentication': '/authentication',
      '^/invokeLogout': '/invokeLogout',
      '^/errorlog': '/errorlog',
    },
  }));



  /**
   * Post client errors in order to log them
   */
  app.post('/log-client-errors', (req, res) => {
      res.status(200);
  });
};
