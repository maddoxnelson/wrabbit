const fs = require('fs');

exports.moment = require('moment');

exports.dump = (obj) => JSON.stringify(obj, null, 2);

// inserting an SVG
exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`);

exports.trimBit = (array, length) => {
  console.log(array.slice(0, length))
  console.log(length)

  return array.slice(0, length)
}

exports.processNewLines = (string) => {
  const f = string.split('\r\n');
  const g = f.filter(line => {
    return line.length > 0;
  })
  return g
}

// Some details about the site
exports.siteName = `Bit`;
