// determine which credentials to return
switch(process.env.NODE_ENV) {
    case 'production':
        module.exports = require('./prod');
        break;
    case 'test':
        module.exports = require('./test');
        break;
    default:
        module.exports = require('./dev');
}