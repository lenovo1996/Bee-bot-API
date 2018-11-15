var fs = require('fs');
var path = require('path');
var basename = path.basename(__filename);

var middleware = {};

fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(file => {
    var middlewarePath = path.join(__dirname, file);
    var middlewareName = file.slice(0, file.length-3);
    middleware[middlewareName] = require(middlewarePath);
});

module.exports = middleware;