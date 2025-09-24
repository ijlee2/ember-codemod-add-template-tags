import { assert, test } from '@codemod-utils/tests';

import { analyzeComponent } from '../../../../src/utils/find-packages-with-hbs/index.js';

test('utils | find-packages-with-hbs | analyze-component > template-only (TypeScript)', function () {
  const file = [
    `import templateOnlyComponent from '@ember/component/template-only';`,
    ``,
    `interface HelloWorldSignature {`,
    `  Args: {};`,
    `}`,
    ``,
    `const HelloWorld = templateOnlyComponent<HelloWorldSignature>();`,
    ``,
    `export default HelloWorld;`,
    ``,
  ].join('\n');

  assert.deepStrictEqual(analyzeComponent(file), {
    baseComponentName: 'templateOnlyComponent',
    componentName: 'HelloWorld',
    componentType: 'template-only',
  });
});
