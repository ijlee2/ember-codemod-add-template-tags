import { assert, test } from '@codemod-utils/tests';

import {
  getPatternForComponents,
  getPatternForRoutes,
  getPatternForTests,
} from '../../../../src/utils/find-packages-with-hbs/index.js';

test('utils | find-packages-with-hbs | analyze-component > entity is defined (v1 addon)', function () {
  const packageType = 'v1-addon';
  const entity = 'ui/form';

  let output = getPatternForComponents(packageType, {
    componentStructure: 'flat' as const,
    entity,
  });

  assert.deepStrictEqual(output, [
    'addon/components/ui/form.hbs',
    'addon/components/ui/form/**/*.hbs',
  ]);

  output = getPatternForComponents(packageType, {
    componentStructure: 'nested' as const,
    entity,
  });

  assert.deepStrictEqual(output, [
    'addon/components/ui/form/index.hbs',
    'addon/components/ui/form/**/index.hbs',
  ]);

  output = getPatternForRoutes(packageType, {
    entity,
  });

  assert.deepStrictEqual(output, [
    'addon/templates/ui/form.hbs',
    'addon/templates/ui/form/**/*.hbs',
  ]);

  output = getPatternForTests({
    entity,
  });

  assert.deepStrictEqual(output, [
    'tests/integration/{components,helpers,modifiers}/ui/form-test.{js,ts}',
    'tests/integration/{components,helpers,modifiers}/ui/form/**/*-test.{js,ts}',
  ]);
});
