import { assert, test } from '@codemod-utils/tests';

import { updateInvocations } from '../../../../src/utils/update-template/index.js';
import {
  componentsDoubleColonized,
  entities,
} from '../../../helpers/mocks/index.js';

test('utils | update-template | update-invocations > file is empty', function () {
  const oldFile = '';

  const newFile = updateInvocations(oldFile, {
    componentsDoubleColonized,
    entities,
    filePath: 'components/ui/form.gts',
    packageName: 'my-addon',
    packageType: 'v2-addon',
  });

  assert.strictEqual(newFile, '');
});
