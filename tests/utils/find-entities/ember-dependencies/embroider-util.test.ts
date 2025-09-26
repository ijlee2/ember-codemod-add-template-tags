import { assert, test } from '@codemod-utils/tests';

import { emberDependencies } from '../../../../src/utils/find-entities/index.js';

test('utils | find-entities | ember-dependencies > @embroider/util', function () {
  const { entities } = emberDependencies.get('@embroider/util')!;

  assert.deepEqual(Array.from(entities.components.keys()), []);

  assert.deepEqual(Array.from(entities.helpers.keys()), [
    'ensure-safe-component',
  ]);

  assert.deepEqual(Array.from(entities.modifiers.keys()), []);
});
