import { assert, test } from '@codemod-utils/tests';

import { insertTemplateTag } from '../../../../src/utils/update-tests/index.js';

test('utils | update-tests | insert-template-tag > file is empty', function () {
  const oldFile = '';

  const newFile = insertTemplateTag(oldFile, {
    isTypeScript: true,
    useLexicalThis: true,
  });

  assert.strictEqual(newFile, '');
});
