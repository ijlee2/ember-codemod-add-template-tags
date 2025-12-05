import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { analyzeComponent } from '../../../../src/utils/find-packages-with-hbs/index.js';

test('utils | find-packages-with-hbs | analyze-component > Classic (JavaScript)', function () {
  const file = normalizeFile([
    `import Component from '@ember/component';`,
    ``,
    `export default Component.extend({});`,
    ``,
  ]);

  assert.deepStrictEqual(analyzeComponent(file), {
    baseComponentName: 'Component',
    componentName: undefined,
    componentType: 'classic',
  });
});
