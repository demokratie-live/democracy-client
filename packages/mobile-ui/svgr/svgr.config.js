const { svgrTemplate } = require('./template');

module.exports = {
  template: svgrTemplate,
  icon: true,
  native: true,
  expandProps: false,
  ext: 'jsx',
  replaceAttrValues: {
    '#000': '{props.color}',
  },
  svgoConfig: {
    plugins: {
      cleanupIDs: false,
    },
  },
};
