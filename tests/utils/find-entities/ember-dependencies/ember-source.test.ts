import { assert, test } from '@codemod-utils/tests';

import { emberDependencies } from '../../../../src/utils/find-entities/index.js';

test('utils | find-entities | ember-dependencies > ember-source', function () {
  const { entities } = emberDependencies.get('ember-source')!;

  assert.deepEqual(Array.from(entities.components.keys()), [
    'input',
    'link-to',
    'textarea',
  ]);

  assert.deepEqual(Array.from(entities.helpers.keys()), [
    'array',
    'concat',
    'fn',
    'get',
    'hash',
    'htmlSafe',
    'unique-id',
  ]);

  assert.deepEqual(Array.from(entities.modifiers.keys()), ['on']);
});
