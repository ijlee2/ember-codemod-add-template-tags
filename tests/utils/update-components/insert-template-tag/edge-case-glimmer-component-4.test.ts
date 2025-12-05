import { assert, createFile, test } from '@codemod-utils/tests';

import { insertTemplateTag } from '../../../../src/utils/update-components/index.js';

test('utils | update-components | insert-template-tag > edge case (Glimmer component) (4)', function () {
  const oldFile = createFile([
    `import Component from '@glimmer/component';`,
    ``,
    `interface UiFormSignature { /* ... */ }`,
    ``,
    `class UiForm extends Component<UiFormSignature> {}`,
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
    ]),
  );
});
