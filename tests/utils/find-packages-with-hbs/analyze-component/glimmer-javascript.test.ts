import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { analyzeComponent } from '../../../../src/utils/find-packages-with-hbs/index.js';

test('utils | find-packages-with-hbs | analyze-component > Glimmer (JavaScript)', function () {
  const file = normalizeFile([
    `import Component from '@glimmer/component';`,
    ``,
    `export default class HelloWorld extends Component {}`,
    ``,
  ]);

  assert.deepStrictEqual(analyzeComponent(file), {
    baseComponentName: 'Component',
    componentName: 'HelloWorld',
    componentType: 'glimmer',
  });
});
