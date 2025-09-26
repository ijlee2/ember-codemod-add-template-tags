import { assert, test } from '@codemod-utils/tests';

import { sortEntities } from '../../../../src/utils/find-entities/index.js';

test('utils | find-entities | sort-entities > entities is empty', function () {
  const entities = {
    components: new Map(),
    helpers: new Map(),
    modifiers: new Map(),
  };

  sortEntities(entities);

  assert.deepEqual(entities, {
    components: new Map(),
    helpers: new Map(),
    modifiers: new Map(),
  });
});
