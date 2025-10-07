import { assert, test } from '@codemod-utils/tests';

import { insertTemplateTag } from '../../../../src/utils/update-components/index.js';

test('utils | update-components | insert-template-tag > template-only component', function () {
  const oldFile = [
    `import templateOnlyComponent from '@ember/component/template-only';`,
    ``,
    `const UiForm = templateOnlyComponent<UiFormSignature>();`,
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
      `import templateOnlyComponent from '@ember/component/template-only';`,
      ``,
      `const UiForm = <template></template> satisfies TOC<UiFormSignature>;`,
      ``,
      `export default UiForm;`,
      ``,
    ].join('\n'),
  );
});
