import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { insertTemplateTag } from '../../../../src/utils/update-components/index.js';

test('utils | update-components | insert-template-tag > edge case (class inheritance)', function () {
  const oldFile = normalizeFile([
    `import Parent from '../parent';`,
    ``,
    `export default class Child extends Parent {}`,
    ``,
  ]);

  const newFile = insertTemplateTag(oldFile, {
    isTypeScript: false,
  });

  assert.strictEqual(newFile, undefined);
});
