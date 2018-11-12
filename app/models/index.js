var fs = require('fs');
var path = require('path');
var basename = path.basename(__filename);

var models = {};

fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(file => {
    var modelsPath = path.join(__dirname, file);
    var modelsName = file.slice(0, file.length-3);
    models[modelsName] = require(modelsPath);
});

module.exports = models;