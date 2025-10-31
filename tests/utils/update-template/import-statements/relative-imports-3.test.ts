import { assert, test } from '@codemod-utils/tests';

import { ImportStatements } from '../../../../src/utils/update-template/index.js';

test('utils | update-template | import-statements > relative imports (3)', function () {
  const importStatements = new ImportStatements({
    filePath: 'src/components/ui/form.gts',
    packageName: 'my-addon',
    packageType: 'v2-addon',
  });

  importStatements.add('UiFormCheckbox', {
    filePath: 'src/components/ui/form/checkbox.ts',
    filePathAlias: 'components/ui/form/checkbox',
    isDefaultExport: true,
    isTypeScript: true,
    packageName: 'my-addon',
  });

  importStatements.add('UiFormInput', {
    filePath: 'src/components/ui/form/input.js',
    filePathAlias: 'components/ui/form/input',
    isDefaultExport: true,
    isTypeScript: false,
    packageName: 'my-addon',
  });

  importStatements.add('UiFormSelect', {
    filePath: 'src/components/ui/form/select.ts',
    filePathAlias: 'components/ui/form/select',
    isDefaultExport: true,
    isTypeScript: true,
    packageName: 'my-addon',
  });

  importStatements.add('autofocus', {
    filePath: 'src/modifiers/autofocus.ts',
    filePathAlias: 'modifiers/autofocus',
    isDefaultExport: true,
    isTypeScript: true,
    packageName: 'my-addon',
  });

  assert.strictEqual(importStatements.exist(), true);

  assert.strictEqual(
    importStatements.print(),
    [
      `import UiFormCheckbox from './form/checkbox.gts';`,
      `import UiFormInput from './form/input.gjs';`,
      `import UiFormSelect from './form/select.gts';`,
      `import autofocus from '../../modifiers/autofocus.ts';`,
    ].join('\n'),
  );
}).only();
