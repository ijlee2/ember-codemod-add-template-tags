import { assert, test } from '@codemod-utils/tests';

import { isRecent } from '../../../../src/utils/find-packages-with-hbs/index.js';

test('utils | find-packages-with-hbs | is-recent > edge case (version is incomplete)', function () {
  assert.strictEqual(isRecent(undefined, '6.4.0'), false);
  assert.strictEqual(isRecent('', '6.4.0'), false);
  assert.strictEqual(isRecent('6', '6.4.0'), false);
  assert.strictEqual(isRecent('6.4', '6.4.0'), true);
  assert.strictEqual(isRecent('6.4.0.1', '6.4.0'), true);
  assert.strictEqual(isRecent('6.4.0-alpha.1', '6.4.0'), true);
  assert.strictEqual(isRecent('7', '6.4.0'), true);
  assert.strictEqual(isRecent('7.0', '6.4.0'), true);
  assert.strictEqual(isRecent('10', '6.4.0'), true);
  assert.strictEqual(isRecent('10.0', '6.4.0'), true);
});
