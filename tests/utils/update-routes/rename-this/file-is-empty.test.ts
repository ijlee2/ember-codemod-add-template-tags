import { assert, test } from '@codemod-utils/tests';

import { renameThis } from '../../../../src/utils/update-routes/index.js';

test('utils | update-routes | rename-this > file is empty', function () {
  const oldFile = '';

  const newFile = renameThis(oldFile);

  assert.strictEqual(newFile, '');
});
