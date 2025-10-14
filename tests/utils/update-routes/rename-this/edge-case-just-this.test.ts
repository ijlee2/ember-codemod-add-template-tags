import { assert, test } from '@codemod-utils/tests';

import { renameThis } from '../../../../src/utils/update-routes/index.js';

test('utils | update-routes | rename-this > edge case (just this)', function () {
  const oldFile = [
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
  ].join('\n');

  const newFile = renameThis(oldFile);

  assert.strictEqual(
    newFile,
    [
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
    ].join('\n'),
  );
});
