let express = require('express');
let router = express.Router();
let {toSnakeCase} = require('../app/helpers/common');
let m = require('../app/middleware');


let {UserInfoController} = require('../app/controllers');

let middlewareList = [
  'trimString',
  'hasAccessToken',
  'authenticate',
];

// middleware group
let middleware = async function (req, res, next) {
  for (let middleware of middlewareList) {
    let handling = await m[middleware].handle(req);
    if (handling.result === false) {
      res.send(handling);
      return;
    }
  }
  next();
};

Object.keys(UserInfoController).forEach(funcName => {
  let arr = toSnakeCase(funcName).split('_');
  let method = arr[0];
  let routeLink = arr.slice(1, arr.length).join('');
  if (['get', 'post', 'put', 'delete'].indexOf(method) === -1) {
    return false;
  }
  router[method]('/' + routeLink, [middleware, UserInfoController[funcName]]);
});

module.exports = router;
