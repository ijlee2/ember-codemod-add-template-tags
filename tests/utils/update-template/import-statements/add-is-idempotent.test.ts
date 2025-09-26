import { assert, test } from '@codemod-utils/tests';

import { ImportStatements } from '../../../../src/utils/update-template/index.js';

test('utils | update-template | import-statements > add is idempotent', function () {
  const importStatements = new ImportStatements();

  importStatements.add('ContainerQuery', {
    filePath: 'dist/components/container-query.js',
    filePathAlias: '.',
    isDefaultExport: false,
    isTypeScript: false,
    packageName: 'ember-container-query',
  });

  importStatements.add('ContainerQuery', {
    filePath: 'dist/components/container-query.js',
    filePathAlias: '.',
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
    filePath: 'dist/components/container-query.js',
    filePathAlias: 'components/container-query',
    isDefaultExport: true,
    isTypeScript: false,
    packageName: 'ember-container-query',
  });

  assert.strictEqual(importStatements.exist(), true);

  assert.strictEqual(
    importStatements.print(),
    [
      `import { ContainerQuery } from 'ember-container-query';`,
      `import ContainerQuery from 'ember-container-query/components/container-query';`,
    ].join('\n'),
  );
});
