var express = require('express');
var router = express.Router();
var {toSnakeCase} = require('../app/helpers/common');
var m = require('../app/middleware');


var {SpaceController} = require('../app/controllers');

var middlewareList = [
    'trimString',
    'hasAccessToken',
    'authenticate',
];

// middleware group
var middleware = async function (req, res, next) {
    for (var middleware of middlewareList) {
        var handling = await m[middleware].handle(req, res, next);
        if (handling.result == false) {
            res.send(handling);
            return;
        }
    }

    next();
};

Object.keys(SpaceController).forEach(funcName => {
    var arr = toSnakeCase(funcName).split('_');
    var method = arr[0];
    var routeLink = arr.slice(1, arr.length).join('');
    if (['get', 'post', 'put', 'delete'].indexOf(method) == -1) {
        return false;
    }
    router[method]('/' + routeLink, [middleware, SpaceController[funcName]]);
});

module.exports = router;