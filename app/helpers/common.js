let common = {
  filter(haystack, needed) {
    let output = {};
    for (key of needed) {
      if (haystack[key]) {
        output[key] = haystack[key];
      }
    }
    return output;
  },

  randomString(n) {
    let r = "";
    while (n--) r += String.fromCharCode((r = Math.random() * 62 | 0, r += r > 9 ? (r < 36 ? 55 : 61) : 48));
    return r;
  },

  toSnakeCase(string) {
    return string.replace(/\.?([A-Z])/g, function (x, y) {
      return "_" + y.toLowerCase()
    }).replace(/^_/, "");
  }
}

module.exports = common;
