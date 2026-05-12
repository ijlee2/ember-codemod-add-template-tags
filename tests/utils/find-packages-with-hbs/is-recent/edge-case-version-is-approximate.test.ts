import { assert, test } from '@codemod-utils/tests';

import { isRecent } from '../../../../src/utils/find-packages-with-hbs/index.js';

test('utils | find-packages-with-hbs | is-recent > edge case (version is approximate)', function () {
  assert.strictEqual(isRecent('^6.3.0', '6.4.0'), false);
  assert.strictEqual(isRecent('~6.3.0', '6.4.0'), false);
  assert.strictEqual(isRecent('^6.4.0', '6.4.0'), true);
  assert.strictEqual(isRecent('~6.4.0', '6.4.0'), true);
  assert.strictEqual(isRecent('^6.5.0', '6.4.0'), true);
  assert.strictEqual(isRecent('~6.5.0', '6.4.0'), true);
  assert.strictEqual(isRecent('^7.0.0', '6.4.0'), true);
  assert.strictEqual(isRecent('~7.0.0', '6.4.0'), true);
  assert.strictEqual(isRecent('^10.0.0', '6.4.0'), true);
  assert.strictEqual(isRecent('~10.0.0', '6.4.0'), true);
});
