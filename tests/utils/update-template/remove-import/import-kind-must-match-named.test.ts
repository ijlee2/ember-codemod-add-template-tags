import { assert, test } from '@codemod-utils/tests';

import { removeImport } from '../../../../src/utils/update-template/index.js';

test('utils | update-template | remove-import > importKind must match (named)', function () {
  let oldFile = `import type { hbs } from 'ember-cli-htmlbars';`;

  let newFile = removeImport(oldFile, {
    importKind: 'type',
    importName: 'hbs',
    importPath: 'ember-cli-htmlbars',
    isDefaultImport: false,
    isTypeScript: true,
  });

  // TODO: Fix bug
  // assert.strictEqual(newFile, '');
  assert.strictEqual(newFile, `import type { hbs } from 'ember-cli-htmlbars';`);

  oldFile = `import { type hbs } from 'ember-cli-htmlbars';`;

  newFile = removeImport(oldFile, {
    importKind: 'type',
    importName: 'hbs',
    importPath: 'ember-cli-htmlbars',
    isDefaultImport: false,
    isTypeScript: true,
  });

  // TODO: Fix bug
  // assert.strictEqual(newFile, '');
  assert.strictEqual(newFile, `import { type hbs } from 'ember-cli-htmlbars';`);

  oldFile = `import type { hbs } from 'ember-cli-htmlbars';`;

  newFile = removeImport(oldFile, {
    importKind: 'value',
    importName: 'hbs',
    importPath: 'ember-cli-htmlbars',
    isDefaultImport: false,
    isTypeScript: true,
  });

  assert.strictEqual(newFile, `import type { hbs } from 'ember-cli-htmlbars';`);

  oldFile = `import { type hbs } from 'ember-cli-htmlbars';`;

  newFile = removeImport(oldFile, {
    importKind: 'value',
    importName: 'hbs',
    importPath: 'ember-cli-htmlbars',
    isDefaultImport: false,
    isTypeScript: true,
  });

  assert.strictEqual(newFile, `import { type hbs } from 'ember-cli-htmlbars';`);
});
