import { assert, createFile, test } from '@codemod-utils/tests';

import { removeImport } from '../../../../src/utils/update-template/index.js';

test('utils | update-template | remove-import > import is found (default, typescript)', function () {
  const oldFile = createFile([
    `import templateOnlyComponent from '@ember/component/template-only';`,
    ``,
    `import type { Product } from '../../../utils/routes/products';`,
  ]);

  const newFile = removeImport(oldFile, {
    importKind: 'value',
    importName: 'templateOnlyComponent',
    importPath: '@ember/component/template-only',
    isDefaultImport: true,
    isTypeScript: true,
  });

  assert.strictEqual(
    newFile,
    `import type { Product } from '../../../utils/routes/products';`,
  );
});
