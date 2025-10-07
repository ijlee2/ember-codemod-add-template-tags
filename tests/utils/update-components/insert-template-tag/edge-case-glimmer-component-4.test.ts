import { assert, test } from '@codemod-utils/tests';

import { insertTemplateTag } from '../../../../src/utils/update-components/index.js';

test('utils | update-components | insert-template-tag > edge case (Glimmer component) (4)', function () {
  const oldFile = [
    `import Component from '@glimmer/component';`,
    ``,
    `interface UiFormSignature { /* ... */ }`,
    ``,
    `class UiForm extends Component<UiFormSignature> {}`,
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
      `import Component from '@glimmer/component';`,
      ``,
      `interface UiFormSignature { /* ... */ }`,
      ``,
      `class UiForm extends Component<UiFormSignature> {`,
      ``,
      `  <template></template>`,
      `}`,
      ``,
      `export default UiForm;`,
      ``,
    ].join('\n'),
  );
});
