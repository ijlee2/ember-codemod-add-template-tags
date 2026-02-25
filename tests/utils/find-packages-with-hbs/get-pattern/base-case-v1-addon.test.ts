import { assert, test } from '@codemod-utils/tests';

import {
  getPatternForComponents,
  getPatternForRoutes,
  getPatternForTests,
} from '../../../../src/utils/find-packages-with-hbs/index.js';

test('utils | find-packages-with-hbs | analyze-component > base case (v1 addon)', function () {
  const packageType = 'v1-addon';
  const entity = undefined;

  let output = getPatternForComponents(packageType, {
    componentStructure: 'flat' as const,
    entity,
  });

  assert.deepStrictEqual(output, ['addon/components/**/*.hbs']);

  output = getPatternForComponents(packageType, {
    componentStructure: 'nested' as const,
    entity,
  });

  assert.deepStrictEqual(output, ['addon/components/**/index.hbs']);

  output = getPatternForRoutes(packageType, {
    entity,
  });

  assert.deepStrictEqual(output, ['addon/templates/**/*.hbs']);

  output = getPatternForTests({
    entity,
  });

  assert.deepStrictEqual(output, [
    'tests/integration/{components,helpers,modifiers}/**/*-test.{js,ts}',
  ]);
});
