import { assert, test } from '@codemod-utils/tests';

import { insertTemplateTag } from '../../../../src/utils/update-components/index.js';

test('utils | update-components | insert-template-tag > edge case (Glimmer component) (3)', function () {
  const oldFile = [
    `import Foo from '@glimmer/component';`,
    ``,
    `export default class UiForm extends Foo<UiFormSignature> {}`,
    ``,
  ].join('\n');

  const newFile = insertTemplateTag(oldFile, {
    isTypeScript: true,
  });

  assert.strictEqual(
    newFile,
    [
      `import Foo from '@glimmer/component';`,
      ``,
      `export default class UiForm extends Foo<UiFormSignature> {`,
      ``,
      `  <template></template>`,
      `}`,
      ``,
    ].join('\n'),
  );
});
