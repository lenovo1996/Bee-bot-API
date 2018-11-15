var common = {};

common.filter = function (haystack, needed) {
    var output = {};
    for (key of needed) {
        if (haystack[key]) {
            output[key] = haystack[key];
        }
    }
    return output;
};

common.randomString = function (n) {
    var r = "";
    while (n--) r += String.fromCharCode((r = Math.random() * 62 | 0, r += r > 9 ? (r < 36 ? 55 : 61) : 48));
    return r;
};

common.toSnakeCase = function (string) {
    return string.replace(/\.?([A-Z])/g, function (x,y){return "_" + y.toLowerCase()}).replace(/^_/, "");
};

module.exports = common;