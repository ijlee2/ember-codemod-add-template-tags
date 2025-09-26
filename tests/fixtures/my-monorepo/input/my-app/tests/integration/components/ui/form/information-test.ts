import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | ui/form/information', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<Ui::Form::Information @formId="ember123" />`);

    assert.dom('[data-test-title]').doesNotExist();

    assert.dom('[data-test-instructions]').doesNotExist();
  });

  test('We can pass @title to display the form title', async function (assert) {
    await render(
      hbs`
        <Ui::Form::Information @formId="ember123" @title="Contact me" />
      `,
    );

    assert
      .dom('[data-test-title]')
      .hasAttribute('id', 'ember123-title')
      .hasText('Contact me');

    assert.dom('[data-test-instructions]').doesNotExist();
  });

  test('We can pass @instructions to display the form instructions', async function (assert) {
    await render(
      hbs`
        <Ui::Form::Information
          @formId="ember123"
          @instructions="Still have questions about ember-container-query? Try sending me a message."
        />
      `,
    );

    assert.dom('[data-test-title]').doesNotExist();

    assert
      .dom('[data-test-instructions]')
      .hasAttribute('id', 'ember123-instructions')
      .hasText(
        'Still have questions about ember-container-query? Try sending me a message.',
      );
  });
});
