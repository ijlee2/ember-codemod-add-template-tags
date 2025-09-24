import { assert, test } from '@codemod-utils/tests';

import { analyzeComponent } from '../../../../src/utils/find-packages-with-hbs/index.js';

test('utils | find-packages-with-hbs | analyze-component > base case', function () {
  const file = '';

  assert.deepStrictEqual(analyzeComponent(file), {
    baseComponentName: undefined,
    componentName: undefined,
    componentType: undefined,
  });
});
