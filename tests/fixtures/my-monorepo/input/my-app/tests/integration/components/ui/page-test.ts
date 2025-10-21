import { render } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { hbs } from 'ember-cli-htmlbars';
import { getClassForUiPage as getClass } from 'my-addon/test-support';
import { setupRenderingTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

async function renderComponent(): Promise<void> {
  await render(
    hbs`
      <Ui::Page @title="Form">
        <div data-test-content>
          Content goes here.
        </div>
      </Ui::Page>
    `,
  );
}

module('Integration | Component | ui/page', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await renderComponent()

    assert.dom('h1').hasText('Form');

    assert.dom('[data-test-content]').exists();

    await a11yAudit();
  });

  test('CSS modules', async function (assert) {
    await renderComponent();

    assert.dom('h1').hasClass(getClass('title'));
  });
});
