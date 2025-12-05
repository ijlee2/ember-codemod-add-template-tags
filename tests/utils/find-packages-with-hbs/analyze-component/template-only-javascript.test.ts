import { assert, createFile, test } from '@codemod-utils/tests';

import { analyzeComponent } from '../../../../src/utils/find-packages-with-hbs/index.js';

test('utils | find-packages-with-hbs | analyze-component > template-only (JavaScript)', function () {
  const file = createFile([
    `import templateOnlyComponent from '@ember/component/template-only';`,
    ``,
    `const HelloWorld = templateOnlyComponent();`,
    ``,
    `export default HelloWorld;`,
    ``,
  ]);

  assert.deepStrictEqual(analyzeComponent(file), {
    baseComponentName: 'templateOnlyComponent',
    componentName: 'HelloWorld',
    componentType: 'template-only',
  });
});
