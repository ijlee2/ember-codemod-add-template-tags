import { assert, test } from '@codemod-utils/tests';

import { removeImport } from '../../../../src/utils/update-template/index.js';

test('utils | update-template | remove-import > base case', function () {
  const oldFile = '';

  const newFile = removeImport(oldFile, {
    importKind: 'value',
    importName: 'hbs',
    importPath: 'ember-cli-htmlbars',
    isDefaultImport: false,
    isTypeScript: true,
  });

  assert.strictEqual(newFile, '');
});
