import { assert, test } from '@codemod-utils/tests';

import { insertTemplateTag } from '../../../../src/utils/update-components/index.js';

test('utils | update-components | insert-template-tag > edge case (class inheritance)', function () {
  const oldFile = [
    `import ParentComponent from '../parent-component';`,
    ``,
    `export default class MyComponent extends ParentComponent {}`,
    ``,
  ].join('\n');

  const newFile = insertTemplateTag(oldFile, {
    isTypeScript: false,
  });

  assert.strictEqual(newFile, undefined);
});
