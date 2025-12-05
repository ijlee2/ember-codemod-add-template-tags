import { assert, createFile, test } from '@codemod-utils/tests';

import { insertTemplateTag } from '../../../../src/utils/update-components/index.js';

test('utils | update-components | insert-template-tag > edge case (template-only component) (1)', function () {
  const oldFile = createFile([
    `import templateOnlyComponent from '@ember/component/template-only';`,
    ``,
    `interface UiFormSignature { /* ... */ }`,
    ``,
    `const UiForm = templateOnlyComponent();`,
    ``,
    `export default UiForm;`,
    ``,
  ]);

  const newFile = insertTemplateTag(oldFile, {
    isTypeScript: true,
  });

  assert.strictEqual(
    newFile,
    createFile([
      `import type { TOC } from '@ember/component/template-only';`,
      `import templateOnlyComponent from '@ember/component/template-only';`,
      ``,
      `interface UiFormSignature { /* ... */ }`,
      ``,
      `const UiForm = <template></template>;`,
      ``,
      `export default UiForm;`,
      ``,
    ]),
  );
});
