const path = require('path');

module.exports = {
  process(src, filename, config) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  },
};
