import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { insertTemplateTag } from '../../../../src/utils/update-components/index.js';

test('utils | update-components | insert-template-tag > template-only component (JavaScript)', function () {
  const oldFile = normalizeFile([
    `import templateOnlyComponent from '@ember/component/template-only';`,
    ``,
    `const UiForm = templateOnlyComponent();`,
    ``,
    `export default UiForm;`,
    ``,
  ]);

  const newFile = insertTemplateTag(oldFile, {
    isTypeScript: false,
  });

  assert.strictEqual(
    newFile,
    normalizeFile([
      `import templateOnlyComponent from '@ember/component/template-only';`,
      ``,
      `const UiForm = <template></template>;`,
      ``,
      `export default UiForm;`,
      ``,
    ]),
  );
});
