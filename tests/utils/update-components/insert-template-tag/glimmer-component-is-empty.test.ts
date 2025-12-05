import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { insertTemplateTag } from '../../../../src/utils/update-components/index.js';

test('utils | update-components | insert-template-tag > Glimmer component is empty', function () {
  const oldFile = normalizeFile([
    `import Component from '@glimmer/component';`,
    ``,
    `interface UiFormSignature { /* ... */ }`,
    ``,
    `export default class UiForm extends Component<UiFormSignature> {}`,
    ``,
  ]);

  const newFile = insertTemplateTag(oldFile, {
    isTypeScript: true,
  });

  assert.strictEqual(
    newFile,
    normalizeFile([
      `import Component from '@glimmer/component';`,
      ``,
      `interface UiFormSignature { /* ... */ }`,
      ``,
      `export default class UiForm extends Component<UiFormSignature> {`,
      ``,
      `  <template></template>`,
      `}`,
      ``,
    ]),
  );
});
