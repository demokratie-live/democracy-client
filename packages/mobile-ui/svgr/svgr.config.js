/* eslint-disable @typescript-eslint/no-var-requires */
const { svgrTemplate } = require('./template');

module.exports = {
  template: svgrTemplate,
  icon: true,
  native: true,
  // expandProps: true,
  replaceAttrValues: {
    '#000': '{props.color}',
  },
  svgoConfig: {
    plugins: {
      cleanupIDs: false,
    },
  },
};
