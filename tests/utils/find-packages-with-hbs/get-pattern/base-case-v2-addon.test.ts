import { assert, test } from '@codemod-utils/tests';

import {
  getPatternForComponents,
  getPatternForRoutes,
  getPatternForTests,
} from '../../../../src/utils/find-packages-with-hbs/index.js';

test('utils | find-packages-with-hbs | analyze-component > base case (v2 addon)', function () {
  const packageType = 'v2-addon';
  const entity = undefined;

  let output = getPatternForComponents(packageType, {
    componentStructure: 'flat' as const,
    entity,
  });

  assert.deepStrictEqual(output, ['src/components/**/*.hbs']);

  output = getPatternForComponents(packageType, {
    componentStructure: 'nested' as const,
    entity,
  });

  assert.deepStrictEqual(output, ['src/components/**/index.hbs']);

  output = getPatternForRoutes(packageType, {
    entity,
  });

  assert.deepStrictEqual(output, ['src/templates/**/*.hbs']);

  output = getPatternForTests({
    entity,
  });

  assert.deepStrictEqual(output, [
    'tests/integration/{components,helpers,modifiers}/**/*-test.{js,ts}',
  ]);
});
