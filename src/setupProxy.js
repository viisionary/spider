const createProxyMiddleware = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: `http://10.1.29.252:3000/mock/113/`,
	    pathRewrite: {
		    '^/api': '/', // rewrite path
	    },
      changeOrigin: true,
      logLevel: "debug",
    })
  );
};
