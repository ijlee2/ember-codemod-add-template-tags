import { assert, test } from '@codemod-utils/tests';

import { removeImport } from '../../../../src/utils/update-template/index.js';

test('utils | update-template | remove-import > importPath must match (default)', function () {
  let oldFile = `import templateOnlyComponent from 'some-import-path';`;

  let newFile = removeImport(oldFile, {
    importKind: 'value',
    importName: 'templateOnlyComponent',
    importPath: '@ember/component/template-only',
    isDefaultImport: true,
    isTypeScript: true,
  });

  assert.strictEqual(
    newFile,
    `import templateOnlyComponent from 'some-import-path';`,
  );

  oldFile = `import templateOnlyComponent from '@ember/component/template-only/index';`;

  newFile = removeImport(oldFile, {
    importKind: 'value',
    importName: 'templateOnlyComponent',
    importPath: '@ember/component/template-only',
    isDefaultImport: true,
    isTypeScript: true,
  });

  assert.strictEqual(
    newFile,
    `import templateOnlyComponent from '@ember/component/template-only/index';`,
  );
});
