import { assert, test } from '@codemod-utils/tests';

import { analyzeComponent } from '../../../../src/utils/find-packages-with-hbs/index.js';

test('utils | find-packages-with-hbs | analyze-component > Glimmer (JavaScript)', function () {
  const file = [
    `import Component from '@glimmer/component';`,
    ``,
    `export default class HelloWorld extends Component {}`,
    ``,
  ].join('\n');

  assert.deepStrictEqual(analyzeComponent(file), {
    baseComponentName: 'Component',
    componentName: 'HelloWorld',
    componentType: 'glimmer',
  });
});
