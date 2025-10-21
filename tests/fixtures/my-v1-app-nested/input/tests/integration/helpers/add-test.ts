import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

module('Integration | Helper | add', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{add 1 2 3}}`);

    assert.dom().hasText('6');
  });
});
