import { assert, createFile, test } from '@codemod-utils/tests';

import { insertTemplateTag } from '../../../../src/utils/update-components/index.js';

test('utils | update-components | insert-template-tag > edge case (template-only component) (3)', function () {
  const oldFile = createFile([
    `import foo from '@ember/component/template-only';`,
    ``,
    `const UiForm = foo<UiFormSignature>();`,
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
      `import foo from '@ember/component/template-only';`,
      ``,
      `const UiForm = <template></template> satisfies TOC<UiFormSignature>;`,
      ``,
      `export default UiForm;`,
      ``,
    ]),
  );
});
