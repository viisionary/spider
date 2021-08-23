// module.exports = { serverAddress: process.env.NODE_ENV === 'development' ? '/' : 'https://spider-api-visionary.herokuapp.com/' }
// export const serverAddress = 'https://api.visionary.top'
const local = 'http://localhost:8083/';
const lan ='http://192.168.3.131:3000/';
const server = 'https://spider-api-visionary.herokuapp.com/'
const dnsServer = 'https://spider-api.visionary.top/'
module.exports = { serverAddress: server,local }
