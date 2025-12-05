import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { insertTemplateTag } from '../../../../src/utils/update-components/index.js';

test('utils | update-components | insert-template-tag > edge case (Glimmer component) (3)', function () {
  const oldFile = normalizeFile([
    `import Foo from '@glimmer/component';`,
    ``,
    `export default class UiForm extends Foo<UiFormSignature> {}`,
    ``,
  ]);

  const newFile = insertTemplateTag(oldFile, {
    isTypeScript: true,
  });

  assert.strictEqual(
    newFile,
    normalizeFile([
      `import Foo from '@glimmer/component';`,
      ``,
      `export default class UiForm extends Foo<UiFormSignature> {`,
      ``,
      `  <template></template>`,
      `}`,
      ``,
    ]),
  );
});
