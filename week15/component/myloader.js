var parseHTML = require('./parser.js');

module.exports = function (source, map) {
  console.log(source);
  console.log('loader is running!!!!!!!!!!\n', this.resourcePath);

  console.log(parseHTML(source));

  return '';
}