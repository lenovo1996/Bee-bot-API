let fs = require('fs');
let path = require('path');
let basename = path.basename(__filename);

let controllers = {};

fs.readdirSync(__dirname).filter(file => {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(file => {
  let controllerPath = path.join(__dirname, file);
  let controllerName = file.slice(0, file.length - 3);
  controllers[controllerName] = require(controllerPath);
});

module.exports = controllers;
