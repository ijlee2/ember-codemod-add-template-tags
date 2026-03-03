import { assert, test } from '@codemod-utils/tests';

import { updateInvocations } from '../../../../src/utils/update-template/index.js';
import { entities } from '../../../helpers/mocks/index.js';

test('utils | update-template | update-invocations > file is empty', function () {
  const oldFile = '';

  const newFile = updateInvocations(oldFile, {
    entities,
  });

  assert.strictEqual(newFile, '');
});
