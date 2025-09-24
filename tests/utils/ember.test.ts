import { assert, test } from '@codemod-utils/tests';

import {
  ENTITY_FOLDERS,
  ENTITY_TYPES,
  SOURCE_FOR_EXTERNAL_PACKAGES,
  SOURCE_FOR_INTERNAL_PACKAGES,
} from '../../src/utils/ember.js';

test('utils | ember', function () {
  assert.deepStrictEqual(ENTITY_FOLDERS, {
    components: 'components',
    helpers: 'helpers',
    modifiers: 'modifiers',
  });

  assert.deepStrictEqual(ENTITY_TYPES, ['components', 'helpers', 'modifiers']);

  assert.deepStrictEqual(SOURCE_FOR_EXTERNAL_PACKAGES, {
    'v1-addon': 'addon',
    'v1-app': undefined,
    'v2-addon': 'dist',
    'v2-app': undefined,
  });

  assert.deepStrictEqual(SOURCE_FOR_INTERNAL_PACKAGES, {
    'v1-addon': 'addon',
    'v1-app': 'app',
    'v2-addon': 'src',
    'v2-app': 'app',
  });
});
