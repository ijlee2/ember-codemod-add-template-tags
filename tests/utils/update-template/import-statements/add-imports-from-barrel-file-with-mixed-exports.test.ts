import { assert, test } from '@codemod-utils/tests';

import { ImportStatements } from '../../../../src/utils/update-template/index.js';

test('utils | update-template | import-statements > add (imports from barrel file with mixed exports)', function () {
  const importStatements = new ImportStatements();

  importStatements.add('ContainerQuery', {
    filePath: 'dist/components/container-query.js',
    filePathAlias: '.',
    isDefaultExport: true,
    isTypeScript: false,
    packageName: 'ember-container-query',
  });

  assert.strictEqual(importStatements.exist(), true);

  assert.strictEqual(
    importStatements.print(),
    `import ContainerQuery from 'ember-container-query';`,
  );

  importStatements.add('containerQuery', {
    filePath: 'dist/modifiers/container-query.js',
    filePathAlias: '.',
    isDefaultExport: false,
    isTypeScript: false,
    packageName: 'ember-container-query',
  });

  assert.strictEqual(importStatements.exist(), true);

  assert.strictEqual(
    importStatements.print(),
    `import ContainerQuery, { containerQuery } from 'ember-container-query';`,
  );

  importStatements.add('width', {
    filePath: 'dist/helpers/width.js',
    filePathAlias: '.',
    isDefaultExport: false,
    isTypeScript: false,
    packageName: 'ember-container-query',
  });

  assert.strictEqual(importStatements.exist(), true);

  assert.strictEqual(
    importStatements.print(),
    `import ContainerQuery, { containerQuery, width } from 'ember-container-query';`,
  );

  importStatements.add('aspectRatio', {
    filePath: 'dist/helpers/aspect-ratio.js',
    filePathAlias: '.',
    isDefaultExport: false,
    isTypeScript: false,
    packageName: 'ember-container-query',
  });

  assert.strictEqual(importStatements.exist(), true);

  assert.strictEqual(
    importStatements.print(),
    `import ContainerQuery, { aspectRatio, containerQuery, width } from 'ember-container-query';`,
  );
});
