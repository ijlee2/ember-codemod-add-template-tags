import { assert, test } from '@codemod-utils/tests';

import { isEmberSourceRecent } from '../../../../src/utils/find-packages-with-hbs/index.js';

test('utils | find-packages-with-hbs | is-ember-version-recent > edge case (match is partial)', function () {
  assert.strictEqual(isEmberSourceRecent(undefined), false);
  assert.strictEqual(isEmberSourceRecent(''), false);
  assert.strictEqual(isEmberSourceRecent('6'), false);
  assert.strictEqual(isEmberSourceRecent('6.4'), true);
  assert.strictEqual(isEmberSourceRecent('6.4.0.1'), true);
  assert.strictEqual(isEmberSourceRecent('6.4.0-alpha.1'), true);
  assert.strictEqual(isEmberSourceRecent('7'), true);
  assert.strictEqual(isEmberSourceRecent('7.0'), true);
  assert.strictEqual(isEmberSourceRecent('10'), true);
  assert.strictEqual(isEmberSourceRecent('10.0'), true);
});
