import { assert, test } from '@codemod-utils/tests';

import { insertTemplateTag } from '../../../../src/utils/update-components/index.js';

test('utils | update-components | insert-template-tag > template-only component (JavaScript)', function () {
  const oldFile = [
    `import templateOnlyComponent from '@ember/component/template-only';`,
    ``,
    `const UiFormComponent = templateOnlyComponent();`,
    ``,
    `export default UiFormComponent;`,
    ``,
  ].join('\n');

  const newFile = insertTemplateTag(oldFile, {
    isTypeScript: false,
  });

  assert.strictEqual(
    newFile,
    [
      `import templateOnlyComponent from '@ember/component/template-only';`,
      ``,
      `const UiFormComponent = <template></template>;`,
      ``,
      `export default UiFormComponent;`,
      ``,
    ].join('\n'),
  );
});
