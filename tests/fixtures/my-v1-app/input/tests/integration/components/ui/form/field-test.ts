import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

module('Integration | Component | ui/form/field', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <Ui::Form::Field>
        <:label as |l|>
          <label data-test-label for={{l.inputId}}>
            Name
          </label>
        </:label>

        <:field as |f|>
          <input data-test-field="Name" id={{f.inputId}} type="text" />
        </:field>
      </Ui::Form::Field>
    `);

    assert.dom('[data-test-label]').hasText('Name');

    assert.dom('[data-test-field="Name"]').hasNoValue();

    assert.dom('[data-test-error-message]').doesNotExist();

    await a11yAudit();
  });

  test('We can pass @errorMessage to show an error message', async function (assert) {
    await render(hbs`
      <Ui::Form::Field @errorMessage="Please provide a value.">
        <:label as |l|>
          <label data-test-label for={{l.inputId}}>
            Name
          </label>
        </:label>

        <:field as |f|>
          <input data-test-field="Name" id={{f.inputId}} required type="text" />
        </:field>
      </Ui::Form::Field>
    `);

    assert.dom('[data-test-error-message]').hasText('Please provide a value.');
  });
});
