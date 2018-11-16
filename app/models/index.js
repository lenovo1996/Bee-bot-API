let fs = require('fs');
let path = require('path');
let basename = path.basename(__filename);

let models = {};

fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(file => {
    let modelsPath = path.join(__dirname, file);
    let modelsName = file.slice(0, file.length-3);
    models[modelsName] = require(modelsPath);
});

module.exports = models;