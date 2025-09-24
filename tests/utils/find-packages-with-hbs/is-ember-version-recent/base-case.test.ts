import { assert, test } from '@codemod-utils/tests';

import { isEmberSourceRecent } from '../../../../src/utils/find-packages-with-hbs/index.js';

test('utils | find-packages-with-hbs | is-ember-version-recent > base case', function () {
  assert.strictEqual(isEmberSourceRecent('5.12.0'), false);
  assert.strictEqual(isEmberSourceRecent('6.3.0'), false);
  assert.strictEqual(isEmberSourceRecent('6.3.1'), false);
  assert.strictEqual(isEmberSourceRecent('6.4.0'), true);
  assert.strictEqual(isEmberSourceRecent('6.4.1'), true);
  assert.strictEqual(isEmberSourceRecent('6.5.0'), true);
  assert.strictEqual(isEmberSourceRecent('6.10.0'), true);
  assert.strictEqual(isEmberSourceRecent('7.0.0'), true);
  assert.strictEqual(isEmberSourceRecent('10.0.0'), true);
});
