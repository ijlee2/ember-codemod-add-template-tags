import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { insertTemplateTag } from '../../../../src/utils/update-components/index.js';

test('utils | update-components | insert-template-tag > edge case (classic component)', function () {
  const oldFile = normalizeFile([
    `import Component from '@ember/component';`,
    ``,
    `export default Component.extend({});`,
    ``,
  ]);

  const newFile = insertTemplateTag(oldFile, {
    isTypeScript: false,
  });

  assert.strictEqual(newFile, undefined);
});
