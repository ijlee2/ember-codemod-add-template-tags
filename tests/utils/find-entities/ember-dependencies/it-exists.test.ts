import { assert, test } from '@codemod-utils/tests';

import { emberDependencies } from '../../../../src/utils/find-entities/index.js';

test('utils | find-entities | ember-dependencies > it exists', function () {
  assert.ok(emberDependencies);
});
