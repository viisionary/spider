const { dir2Tar, upload2Server } = require('deploy2server');
// 10.1.62.80
// 19222
// meeting
// EBupt!@#123
//
const config = {
    // 服务器ip:10.1.29.249, 端口：22,账号：mp 密码：1qaz@WSX/
    // host: '10.1.29.249',
    host: '10.1.62.80',
    port: '19222',
    username: 'meeting',
    password: 'EBupt!@#123',
    // ⚠️：windows system path different from linux
    serverBaseCodePath: '/home/meeting/code/',
    serverWebPath: '/home/meeting/wwwroot/',
    projectName: 'web-mediaC',
    version: '',
    outputPath: './',
    codePath: './build',
};
const packageCallback = () => {
    console.info('Package Succeed ！\n');
};
const uploadCallback = () => {
    console.info('Upload Succeed ！');
};
(async () => {
    await dir2Tar(config);
    packageCallback();
    await upload2Server(config);
    uploadCallback();
})();
