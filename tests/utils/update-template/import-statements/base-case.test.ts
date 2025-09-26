import { assert, test } from '@codemod-utils/tests';

import { ImportStatements } from '../../../../src/utils/update-template/index.js';

test('utils | update-template | import-statements > base case', function () {
  const importStatements = new ImportStatements();

  assert.strictEqual(importStatements.exist(), false);

  assert.strictEqual(importStatements.print(), '');
});
