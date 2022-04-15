const {createProxyMiddleware} = require('http-proxy-middleware');
// export const serverAddress ='http://localhost:8083',
const { serverAddress } = require('./constant/serverAddress');
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: serverAddress,
            changeOrigin: true,
            logLevel: 'debug',
        })
    );
};
