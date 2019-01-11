let common = {
  /**
   * function filter data
   * @param haystack
   * @param needed
   */
  filter(haystack, needed) {
    let output = {};
    for (key of needed) {
      if (haystack[key]) {
        output[key] = haystack[key];
      }
    }
    return output;
  },

  /**
   * function random string
   * @param n
   * @returns {string}
   */
  randomString(n) {
    let r = "";
    while (n--) r += String.fromCharCode((r = Math.random() * 62 | 0, r += r > 9 ? (r < 36 ? 55 : 61) : 48));
    return r;
  },

  /**
   * function convert camelCase to snake_case
   * @param string
   * @returns {*}
   */
  toSnakeCase(string) {
    return string.replace(/\.?([A-Z])/g, function (x, y) {
      return "_" + y.toLowerCase()
    }).replace(/^_/, "");
  }
}

module.exports = common;
