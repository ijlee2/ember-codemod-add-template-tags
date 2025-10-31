import { assert, test } from '@codemod-utils/tests';

import { ImportStatements } from '../../../../src/utils/update-template/index.js';

test('utils | update-template | import-statements > relative imports (1)', function () {
  const importStatements = new ImportStatements({
    filePath: 'src/components/ui/form/checkbox.gts',
    packageName: 'my-addon',
    packageType: 'v2-addon',
  });

  importStatements.add('UiFormField', {
    filePath: 'src/components/ui/form/field.ts',
    filePathAlias: 'components/ui/form/field',
    isDefaultExport: true,
    isTypeScript: true,
    packageName: 'my-addon',
  });

  assert.strictEqual(importStatements.exist(), true);

  assert.strictEqual(
    importStatements.print(),
    `import UiFormField from '../field.gts';`,
  );
}).only();
