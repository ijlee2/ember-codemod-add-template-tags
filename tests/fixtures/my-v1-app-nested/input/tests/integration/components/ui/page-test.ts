import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

module('Integration | Component | ui/page', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <Ui::Page @title="Form">
        <div data-test-content>
          Content goes here.
        </div>
      </Ui::Page>
    `);

    assert.dom('[data-test-page-title]').hasTagName('h1').hasText('Form');

    assert.dom('[data-test-page-content]').hasText('Render a section here.');

    await a11yAudit();
  });
});
