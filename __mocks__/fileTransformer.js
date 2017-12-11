const path = require('path');

module.exports = {
  process(/*src*/null, filename, /*config*/null, /*options*/null) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  },
};
