import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { removeImport } from '../../../../src/utils/update-template/index.js';

test('utils | update-template | remove-import > import is found (named, multiple removals)', function () {
  const oldFile = normalizeFile([
    `import {`,
    `  click,`,
    `  fillIn,`,
    `  find,`,
    `  render,`,
    `  type TestContext as BaseTestContext,`,
    `} from '@ember/test-helpers';`,
    `import { hbs } from 'ember-cli-htmlbars';`,
    `import { setupIntl } from 'ember-intl/test-support';`,
    `import { setupRenderingTest } from 'my-app/tests/helpers';`,
    `import { module, test } from 'qunit';`,
  ]);

  let newFile = removeImport(oldFile, {
    importKind: 'value',
    importName: 'find',
    importPath: '@ember/test-helpers',
    isDefaultImport: false,
    isTypeScript: true,
  });

  assert.strictEqual(
    newFile,
    normalizeFile([
      `import { click, fillIn, render, type TestContext as BaseTestContext } from '@ember/test-helpers';`,
      `import { hbs } from 'ember-cli-htmlbars';`,
      `import { setupIntl } from 'ember-intl/test-support';`,
      `import { setupRenderingTest } from 'my-app/tests/helpers';`,
      `import { module, test } from 'qunit';`,
    ]),
  );

  newFile = removeImport(newFile, {
    importKind: 'type',
    importName: 'TestContext',
    importPath: '@ember/test-helpers',
    isDefaultImport: false,
    isTypeScript: true,
  });

  assert.strictEqual(
    newFile,
    normalizeFile([
      `import { click, fillIn, render } from '@ember/test-helpers';`,
      `import { hbs } from 'ember-cli-htmlbars';`,
      `import { setupIntl } from 'ember-intl/test-support';`,
      `import { setupRenderingTest } from 'my-app/tests/helpers';`,
      `import { module, test } from 'qunit';`,
    ]),
  );
});
