import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { insertTemplateTag } from '../../../../src/utils/update-components/index.js';

test('utils | update-components | insert-template-tag > edge case (template-only component) (2)', function () {
  const oldFile = normalizeFile([
    `import templateOnlyComponent from '@ember/component/template-only';`,
    ``,
    `interface UiFormSignature { /* ... */ }`,
    ``,
    `export default templateOnlyComponent<UiFormSignature>();`,
    ``,
  ]);

  const newFile = insertTemplateTag(oldFile, {
    isTypeScript: true,
  });

  assert.strictEqual(
    newFile,
    normalizeFile([
      `import type { TOC } from '@ember/component/template-only';`,
      `import templateOnlyComponent from '@ember/component/template-only';`,
      ``,
      `interface UiFormSignature { /* ... */ }`,
      ``,
      `export default <template></template>;`,
      ``,
    ]),
  );
});
