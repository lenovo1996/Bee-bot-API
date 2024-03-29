let fs = require('fs');
let path = require('path');
let basename = path.basename(__filename);

let middleware = {};

fs.readdirSync(__dirname).filter(file => {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(file => {
  let middlewarePath = path.join(__dirname, file);
  let middlewareName = file.slice(0, file.length - 3);
  middleware[middlewareName] = require(middlewarePath);
});

module.exports = middleware;
