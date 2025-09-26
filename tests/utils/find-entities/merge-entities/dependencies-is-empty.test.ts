import { assert, test } from '@codemod-utils/tests';

import type { Dependencies } from '../../../../src/types/index.js';
import { mergeEntities } from '../../../../src/utils/find-entities/index.js';

test('utils | find-entities | merge-entities > dependencies is empty', function () {
  const entities = {
    components: new Map(),
    helpers: new Map(),
    modifiers: new Map(),
  };

  const dependencies: Dependencies = new Map();

  mergeEntities(entities, dependencies, true);

  assert.deepEqual(entities, {
    components: new Map(),
    helpers: new Map(),
    modifiers: new Map(),
  });
});
