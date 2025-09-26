import { assert, test } from '@codemod-utils/tests';

import { ImportStatements } from '../../../../src/utils/update-template/index.js';

test('utils | update-template | import-statements > add (imports from source)', function () {
  const importStatements = new ImportStatements();

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
    `import ContainerQuery from 'ember-container-query/components/container-query';`,
  );

  importStatements.add('containerQuery', {
    filePath: 'dist/modifiers/container-query.js',
    filePathAlias: 'modifiers/container-query',
    isDefaultExport: true,
    isTypeScript: false,
    packageName: 'ember-container-query',
  });

  assert.strictEqual(importStatements.exist(), true);

  assert.strictEqual(
    importStatements.print(),
    [
      `import ContainerQuery from 'ember-container-query/components/container-query';`,
      `import containerQuery from 'ember-container-query/modifiers/container-query';`,
    ].join('\n'),
  );

  importStatements.add('width', {
    filePath: 'dist/helpers/width.js',
    filePathAlias: 'helpers/width',
    isDefaultExport: true,
    isTypeScript: false,
    packageName: 'ember-container-query',
  });

  assert.strictEqual(importStatements.exist(), true);

  assert.strictEqual(
    importStatements.print(),
    [
      `import ContainerQuery from 'ember-container-query/components/container-query';`,
      `import width from 'ember-container-query/helpers/width';`,
      `import containerQuery from 'ember-container-query/modifiers/container-query';`,
    ].join('\n'),
  );

  importStatements.add('aspectRatio', {
    filePath: 'dist/helpers/aspect-ratio.js',
    filePathAlias: 'helpers/aspect-ratio',
    isDefaultExport: true,
    isTypeScript: false,
    packageName: 'ember-container-query',
  });

  assert.strictEqual(importStatements.exist(), true);

  assert.strictEqual(
    importStatements.print(),
    [
      `import ContainerQuery from 'ember-container-query/components/container-query';`,
      `import aspectRatio from 'ember-container-query/helpers/aspect-ratio';`,
      `import width from 'ember-container-query/helpers/width';`,
      `import containerQuery from 'ember-container-query/modifiers/container-query';`,
    ].join('\n'),
  );
});
