const svgrTemplate = ({ template }, opts, { componentName, jsx }) => {
  const typeScriptTpl = template.smart({ plugins: ['typescript'] });
  return typeScriptTpl.ast`
      import * as React from 'react';
      import { Svg, SvgProps } from "react-native-svg";
      const ${componentName} = (props: SvgProps) => ${jsx};
      
      export default ${componentName};
    `;
};

module.exports = { svgrTemplate };
