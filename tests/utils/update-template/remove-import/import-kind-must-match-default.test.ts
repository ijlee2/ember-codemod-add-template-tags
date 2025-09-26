import { assert, test } from '@codemod-utils/tests';

import { removeImport } from '../../../../src/utils/update-template/index.js';

test('utils | update-template | remove-import > importKind must match (default)', function () {
  let oldFile = `import type templateOnlyComponent from '@ember/component/template-only';`;

  let newFile = removeImport(oldFile, {
    importKind: 'type',
    importName: 'templateOnlyComponent',
    importPath: '@ember/component/template-only',
    isDefaultImport: true,
    isTypeScript: true,
  });

  assert.strictEqual(newFile, '');

  oldFile = `import type templateOnlyComponent from '@ember/component/template-only';`;

  newFile = removeImport(oldFile, {
    importKind: 'value',
    importName: 'templateOnlyComponent',
    importPath: '@ember/component/template-only',
    isDefaultImport: true,
    isTypeScript: true,
  });

  assert.strictEqual(
    newFile,
    `import type templateOnlyComponent from '@ember/component/template-only';`,
  );
});
