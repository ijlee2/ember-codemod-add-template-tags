import { normalize } from 'node:path';

import { assert, createFile, test } from '@codemod-utils/tests';

import { ImportStatements } from '../../../../src/utils/update-template/index.js';

test('utils | update-template | import-statements > add (imports from source)', function () {
  const importStatements = new ImportStatements();

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
    `import ContainerQuery from 'ember-container-query/components/container-query';`,
  );

  importStatements.add('containerQuery', {
    filePath: normalize('dist/modifiers/container-query.js'),
    filePathAlias: normalize('modifiers/container-query'),
    isDefaultExport: true,
    isTypeScript: false,
    packageName: 'ember-container-query',
  });

  assert.strictEqual(importStatements.exist(), true);

  assert.strictEqual(
    importStatements.print(),
    createFile([
      `import ContainerQuery from 'ember-container-query/components/container-query';`,
      `import containerQuery from 'ember-container-query/modifiers/container-query';`,
    ]),
  );

  importStatements.add('width', {
    filePath: normalize('dist/helpers/width.js'),
    filePathAlias: normalize('helpers/width'),
    isDefaultExport: true,
    isTypeScript: false,
    packageName: 'ember-container-query',
  });

  assert.strictEqual(importStatements.exist(), true);

  assert.strictEqual(
    importStatements.print(),
    createFile([
      `import ContainerQuery from 'ember-container-query/components/container-query';`,
      `import width from 'ember-container-query/helpers/width';`,
      `import containerQuery from 'ember-container-query/modifiers/container-query';`,
    ]),
  );

  importStatements.add('aspectRatio', {
    filePath: normalize('dist/helpers/aspect-ratio.js'),
    filePathAlias: normalize('helpers/aspect-ratio'),
    isDefaultExport: true,
    isTypeScript: false,
    packageName: 'ember-container-query',
  });

  assert.strictEqual(importStatements.exist(), true);

  assert.strictEqual(
    importStatements.print(),
    createFile([
      `import ContainerQuery from 'ember-container-query/components/container-query';`,
      `import aspectRatio from 'ember-container-query/helpers/aspect-ratio';`,
      `import width from 'ember-container-query/helpers/width';`,
      `import containerQuery from 'ember-container-query/modifiers/container-query';`,
    ]),
  );
});
