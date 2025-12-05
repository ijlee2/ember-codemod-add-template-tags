import { normalize } from 'node:path';

import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ImportStatements } from '../../../../src/utils/update-template/index.js';

test('utils | update-template | import-statements > add (imports from multiple packages)', function () {
  const importStatements = new ImportStatements();

  importStatements.add('ContainerQuery', {
    filePath: normalize('dist/components/container-query.js'),
    filePathAlias: normalize('components/container-query'),
    isDefaultExport: true,
    isTypeScript: false,
    packageName: 'ember-container-query',
  });

  importStatements.add('on', {
    filePath: normalize('.'),
    filePathAlias: normalize('.'),
    isDefaultExport: false,
    isTypeScript: true,
    packageName: '@ember/modifier',
  });

  importStatements.add('fn', {
    filePath: normalize('.'),
    filePathAlias: normalize('.'),
    isDefaultExport: false,
    isTypeScript: true,
    packageName: '@ember/helper',
  });

  importStatements.add('hash', {
    filePath: normalize('.'),
    filePathAlias: normalize('.'),
    isDefaultExport: false,
    isTypeScript: true,
    packageName: '@ember/helper',
  });

  importStatements.add('ensureSafeComponent', {
    filePath: normalize('.'),
    filePathAlias: normalize('.'),
    isDefaultExport: false,
    isTypeScript: false,
    packageName: '@embroider/util',
  });

  importStatements.add('array', {
    filePath: normalize('.'),
    filePathAlias: normalize('.'),
    isDefaultExport: false,
    isTypeScript: true,
    packageName: '@ember/helper',
  });

  importStatements.add('t', {
    filePath: normalize('addon/helpers/t.ts'),
    filePathAlias: normalize('.'),
    isDefaultExport: false,
    isTypeScript: true,
    packageName: 'ember-intl',
  });

  assert.strictEqual(importStatements.exist(), true);

  assert.strictEqual(
    importStatements.print(),
    normalizeFile([
      `import { array, fn, hash } from '@ember/helper';`,
      `import { on } from '@ember/modifier';`,
      `import { ensureSafeComponent } from '@embroider/util';`,
      `import ContainerQuery from 'ember-container-query/components/container-query';`,
      `import { t } from 'ember-intl';`,
    ]),
  );
});
