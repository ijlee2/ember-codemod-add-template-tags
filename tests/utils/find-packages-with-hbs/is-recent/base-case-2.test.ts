import { assert, test } from '@codemod-utils/tests';

import { isRecent } from '../../../../src/utils/find-packages-with-hbs/index.js';

test('utils | find-packages-with-hbs | is-recent > base case (2)', function () {
  assert.strictEqual(isRecent('5.12.0', '6.4'), false);
  assert.strictEqual(isRecent('6.3.0', '6.4'), false);
  assert.strictEqual(isRecent('6.3.1', '6.4'), false);
  assert.strictEqual(isRecent('6.4.0', '6.4'), true);
  assert.strictEqual(isRecent('6.4.1', '6.4'), true);
  assert.strictEqual(isRecent('6.4.2', '6.4'), true);
  assert.strictEqual(isRecent('6.5.0', '6.4'), true);
  assert.strictEqual(isRecent('6.10.0', '6.4'), true);
  assert.strictEqual(isRecent('7.0.0', '6.4'), true);
  assert.strictEqual(isRecent('10.0.0', '6.4'), true);
});
