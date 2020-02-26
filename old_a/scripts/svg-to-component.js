const fs = require('fs');

const files = fs.readdirSync('./assets/constituencies').filter(x => x.includes('.js'));
const ex =
  '{\n' +
  files.map(x => `"${x.split('.js')[0]}": require("./constituencies/${x}"),`).join('\n') +
  '}';
const res = 'export default ' + ex;
fs.writeFileSync('./assets/constituencies.js', res);
