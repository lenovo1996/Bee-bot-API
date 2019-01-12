const express = require('express');
const router = express.Router();
let {toSnakeCase} = require('../app/helpers/common');

const {FacebookController} = require('../app/controllers');

Object.keys(FacebookController).forEach(funcName => {
  let arr = toSnakeCase(funcName).split('_');
  let method = arr[0];
  let routeLink = arr.slice(1, arr.length).join('');
  if (['get', 'post', 'put', 'delete'].indexOf(method) === -1) {
    return false;
  }
  router[method]('/' + routeLink, [middleware, FacebookController[funcName]]);
});