import { assert, test } from '@codemod-utils/tests';

import { insertTemplateTag } from '../../../../src/utils/update-components/index.js';

test('utils | update-components | insert-template-tag > edge case (template-only component) (1)', function () {
  const oldFile = [
    `import templateOnlyComponent from '@ember/component/template-only';`,
    ``,
    `interface UiFormSignature { /* ... */ }`,
    ``,
    `const UiFormComponent = templateOnlyComponent();`,
    ``,
    `export default UiFormComponent;`,
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
      `interface UiFormSignature { /* ... */ }`,
      ``,
      `const UiFormComponent = <template></template>;`,
      ``,
      `export default UiFormComponent;`,
      ``,
    ].join('\n'),
  );
});
