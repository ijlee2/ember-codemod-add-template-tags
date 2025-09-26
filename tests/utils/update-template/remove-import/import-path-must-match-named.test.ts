import { assert, test } from '@codemod-utils/tests';

import { removeImport } from '../../../../src/utils/update-template/index.js';

test('utils | update-template | remove-import > importPath must match (named)', function () {
  let oldFile = `import { hbs } from 'some-import-path';`;

  let newFile = removeImport(oldFile, {
    importKind: 'value',
    importName: 'hbs',
    importPath: 'ember-cli-htmlbars',
    isDefaultImport: false,
    isTypeScript: true,
  });

  assert.strictEqual(newFile, `import { hbs } from 'some-import-path';`);

  oldFile = `import { hbs } from 'ember-cli-htmlbars/index';`;

  newFile = removeImport(oldFile, {
    importKind: 'value',
    importName: 'hbs',
    importPath: 'ember-cli-htmlbars',
    isDefaultImport: false,
    isTypeScript: true,
  });

  assert.strictEqual(
    newFile,
    `import { hbs } from 'ember-cli-htmlbars/index';`,
  );
});
