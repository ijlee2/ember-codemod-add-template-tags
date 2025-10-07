import { assert, test } from '@codemod-utils/tests';

import { insertTemplateTag } from '../../../../src/utils/update-components/index.js';

test('utils | update-components | insert-template-tag > edge case (template-only component) (3)', function () {
  const oldFile = [
    `import foo from '@ember/component/template-only';`,
    ``,
    `const UiForm = foo<UiFormSignature>();`,
    ``,
    `export default UiForm;`,
    ``,
  ].join('\n');

  const newFile = insertTemplateTag(oldFile, {
    isTypeScript: true,
  });

  assert.strictEqual(
    newFile,
    [
      `import type { TOC } from '@ember/component/template-only';`,
      `import foo from '@ember/component/template-only';`,
      ``,
      `const UiForm = <template></template> satisfies TOC<UiFormSignature>;`,
      ``,
      `export default UiForm;`,
      ``,
    ].join('\n'),
  );
});
