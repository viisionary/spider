const createProxyMiddleware = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: `https://api.visionary.top/`,
	    pathRewrite: {
		    // '^/api': '/', // rewrite path
	    },
      changeOrigin: true,
      logLevel: "debug",
    })
  );
	app.use(
		createProxyMiddleware('/mock/api', {
			target: `http://10.1.29.252:3000/mock/140/`,
			pathRewrite: {
				'^/mock/api': '/', // rewrite path
			},
			changeOrigin: true,
			logLevel: "debug",
		})
	);
};
