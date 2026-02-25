import { assert, test } from '@codemod-utils/tests';

import {
  getPatternForComponents,
  getPatternForRoutes,
  getPatternForTests,
} from '../../../../src/utils/find-packages-with-hbs/index.js';

test('utils | find-packages-with-hbs | analyze-component > entity is defined (v2 app)', function () {
  const packageType = 'v2-app';
  const entity = 'ui/form';

  let output = getPatternForComponents(packageType, {
    componentStructure: 'flat' as const,
    entity,
  });

  assert.deepStrictEqual(output, [
    'app/components/ui/form.hbs',
    'app/components/ui/form/**/*.hbs',
  ]);

  output = getPatternForComponents(packageType, {
    componentStructure: 'nested' as const,
    entity,
  });

  assert.deepStrictEqual(output, [
    'app/components/ui/form/index.hbs',
    'app/components/ui/form/**/index.hbs',
  ]);

  output = getPatternForRoutes(packageType, {
    entity,
  });

  assert.deepStrictEqual(output, [
    'app/templates/ui/form.hbs',
    'app/templates/ui/form/**/*.hbs',
  ]);

  output = getPatternForTests({
    entity,
  });

  assert.deepStrictEqual(output, [
    'tests/integration/{components,helpers,modifiers}/ui/form-test.{js,ts}',
    'tests/integration/{components,helpers,modifiers}/ui/form/**/*-test.{js,ts}',
  ]);
});
