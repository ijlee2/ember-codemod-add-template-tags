import { assert, test } from '@codemod-utils/tests';

import { ImportStatements } from '../../../../src/utils/update-template/index.js';

test('utils | update-template | import-statements > add (imports from multiple packages)', function () {
  const importStatements = new ImportStatements();

  importStatements.add('ContainerQuery', {
    filePath: 'dist/components/container-query.js',
    filePathAlias: 'components/container-query',
    isDefaultExport: true,
    isTypeScript: false,
    packageName: 'ember-container-query',
  });

  importStatements.add('on', {
    filePath: '.',
    filePathAlias: '.',
    isDefaultExport: false,
    isTypeScript: true,
    packageName: '@ember/modifier',
  });

  importStatements.add('fn', {
    filePath: '.',
    filePathAlias: '.',
    isDefaultExport: false,
    isTypeScript: true,
    packageName: '@ember/helper',
  });

  importStatements.add('hash', {
    filePath: '.',
    filePathAlias: '.',
    isDefaultExport: false,
    isTypeScript: true,
    packageName: '@ember/helper',
  });

  importStatements.add('ensureSafeComponent', {
    filePath: '.',
    filePathAlias: '.',
    isDefaultExport: false,
    isTypeScript: false,
    packageName: '@embroider/util',
  });

  importStatements.add('array', {
    filePath: '.',
    filePathAlias: '.',
    isDefaultExport: false,
    isTypeScript: true,
    packageName: '@ember/helper',
  });

  importStatements.add('t', {
    filePath: 'addon/helpers/t.ts',
    filePathAlias: '.',
    isDefaultExport: false,
    isTypeScript: true,
    packageName: 'ember-intl',
  });

  assert.strictEqual(importStatements.exist(), true);

  assert.strictEqual(
    importStatements.print(),
    [
      `import { array, fn, hash } from '@ember/helper';`,
      `import { on } from '@ember/modifier';`,
      `import { ensureSafeComponent } from '@embroider/util';`,
      `import ContainerQuery from 'ember-container-query/components/container-query';`,
      `import { t } from 'ember-intl';`,
    ].join('\n'),
  );
});
