const svgrTemplate = (
  { template },
  opts,
  { imports, componentName, props, jsx, exports },
) => {
  const typeScriptTpl = template.smart({ plugins: ['typescript'] });
  return typeScriptTpl.ast`
      import * as React from 'react';
      import { Svg } from "react-native-svg";
      const ${componentName} = (props: React.SVGProps<SVGSVGElement>) => ${jsx};
      
      export { ${componentName} };
    `;
};

module.exports = { svgrTemplate };
