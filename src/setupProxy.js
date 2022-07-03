const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(myApp) {
    myApp.use(
        '/oauth',
        createProxyMiddleware({
            target: 'http://api.pixlpark.com',
            changeOrigin: true
        })
    );

    myApp.use(
        '/orders',
        createProxyMiddleware({
            target: 'http://api.pixlpark.com',
            changeOrigin: true
        })
    );
};