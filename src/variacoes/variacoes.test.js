var md5 = require('md5');

var msg = 'fulano';
console.log(msg);
console.log(md5(msg));

var userId = 199;
var salt = '12';
var seed = userId.toString() + salt;

console.log('seed', seed);

var hashedSeed = md5(seed);
var quarter = hashedSeed.substring(0, 8);
console.log('quarter', quarter);
console.log('x16', parseInt(quarter, 16) / 0xffffffff);
