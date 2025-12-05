import { assert, createFile, test } from '@codemod-utils/tests';

import { removeImport } from '../../../../src/utils/update-template/index.js';

test('utils | update-template | remove-import > import is found (named, javascript)', function () {
  const oldFile = createFile([
    `import { click, fillIn, find, render } from '@ember/test-helpers';`,
    `import { hbs } from 'ember-cli-htmlbars';`,
    `import { setupIntl } from 'ember-intl/test-support';`,
    `import { setupRenderingTest } from 'my-app/tests/helpers';`,
    `import { module, test } from 'qunit';`,
  ]);

  const newFile = removeImport(oldFile, {
    importKind: 'value',
    importName: 'hbs',
    importPath: 'ember-cli-htmlbars',
    isDefaultImport: false,
    isTypeScript: false,
  });

  assert.strictEqual(
    newFile,
    createFile([
      `import { click, fillIn, find, render } from '@ember/test-helpers';`,
      `import { setupIntl } from 'ember-intl/test-support';`,
      `import { setupRenderingTest } from 'my-app/tests/helpers';`,
      `import { module, test } from 'qunit';`,
    ]),
  );
});
