import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { renameThis } from '../../../../src/utils/update-routes/index.js';

test('utils | update-routes | rename-this > edge case (just this)', function () {
  const oldFile = normalizeFile([
    `<input`,
    `  type="text"`,
    `  {{on "input" (setField this "name" "target.value")}}`,
    `/>`,
    ``,
    `<input`,
    `  type="text"`,
    `  {{on "input" (setField this.user "name" "target.value")}}`,
    `/>`,
    ``,
    `<input`,
    `  type="text"`,
    `  {{on "input" (setField thisuser "name" "target.value")}}`,
    `/>`,
    ``,
    `<input`,
    `  type="text"`,
    `  {{on "input" (setField this.thisuser "name" "target.value")}}`,
    `/>`,
  ]);

  const newFile = renameThis(oldFile);

  assert.strictEqual(
    newFile,
    normalizeFile([
      `<input`,
      `  type="text"`,
      `  {{on "input" (setField @controller "name" "target.value")}}`,
      `/>`,
      ``,
      `<input`,
      `  type="text"`,
      `  {{on "input" (setField @controller.user "name" "target.value")}}`,
      `/>`,
      ``,
      `<input`,
      `  type="text"`,
      `  {{on "input" (setField thisuser "name" "target.value")}}`,
      `/>`,
      ``,
      `<input`,
      `  type="text"`,
      `  {{on "input" (setField @controller.thisuser "name" "target.value")}}`,
      `/>`,
    ]),
  );
});
