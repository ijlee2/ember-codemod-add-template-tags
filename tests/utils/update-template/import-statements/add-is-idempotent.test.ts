import { normalize } from 'node:path';

import { assert, createFile, test } from '@codemod-utils/tests';

import { ImportStatements } from '../../../../src/utils/update-template/index.js';

test('utils | update-template | import-statements > add is idempotent', function () {
  const importStatements = new ImportStatements();

  importStatements.add('ContainerQuery', {
    filePath: normalize('dist/components/container-query.js'),
    filePathAlias: normalize('.'),
    isDefaultExport: false,
    isTypeScript: false,
    packageName: 'ember-container-query',
  });

  importStatements.add('ContainerQuery', {
    filePath: normalize('dist/components/container-query.js'),
    filePathAlias: normalize('.'),
    isDefaultExport: false,
    isTypeScript: false,
    packageName: 'ember-container-query',
  });

  assert.strictEqual(importStatements.exist(), true);

  assert.strictEqual(
    importStatements.print(),
    `import { ContainerQuery } from 'ember-container-query';`,
  );

  // Edge case
  importStatements.add('ContainerQuery', {
    filePath: normalize('dist/components/container-query.js'),
    filePathAlias: normalize('components/container-query'),
    isDefaultExport: true,
    isTypeScript: false,
    packageName: 'ember-container-query',
  });

  assert.strictEqual(importStatements.exist(), true);

  assert.strictEqual(
    importStatements.print(),
    createFile([
      `import { ContainerQuery } from 'ember-container-query';`,
      `import ContainerQuery from 'ember-container-query/components/container-query';`,
    ]),
  );
});
