import UiFormCheckbox from 'my-addon/components/ui/form/checkbox';

import {
  click,
  render,
  type TestContext as BaseTestContext,
  triggerKeyEvent,
} from '@ember/test-helpers';
import { UiForm } from 'my-addon/test-support';
import { setupRenderingTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  parent: UiForm;
}

module('Integration | Component | ui/form/checkbox', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.parent = new UiForm();
  });

  test('it renders', async function (this: TestContext, assert) {
    const self = this;




    await render(<template><UiFormCheckbox
    @data={{self.parent.data}}
    @key="subscribe"
    @label="Subscribe to The Ember Times?"
    @onUpdate={{self.parent.updateData}}
    /></template>);

    assert.dom('[data-test-label]').hasText('Subscribe to The Ember Times?');

    assert
      .dom('[data-test-field]')
      .hasAria('checked', 'true')
      .hasAria('disabled', 'false')
      .hasAria('readonly', 'false')
      .hasAria('required', 'false')
      .hasAttribute('role', 'checkbox')
      .hasAttribute('tabindex', '0')
      .hasTagName('span');

    assert.dom('[data-test-error-message]').doesNotExist();
  });

  test('We can pass @isDisabled to disable the checkbox', async function (this: TestContext, assert) {
    const self = this;




    await render(<template><UiFormCheckbox
    @data={{self.parent.data}}
    @isDisabled={{true}}
    @key="subscribe"
    @label="Subscribe to The Ember Times?"
    @onUpdate={{self.parent.updateData}}
    /></template>);

    assert
      .dom('[data-test-field]')
      .doesNotHaveAttribute('tabindex')
      .hasAria('disabled', 'true');
  });

  test('We can pass @isReadOnly to display the value', async function (this: TestContext, assert) {
    const self = this;




    await render(<template><UiFormCheckbox
    @data={{self.parent.data}}
    @isReadOnly={{true}}
    @key="subscribe"
    @label="Subscribe to The Ember Times?"
    @onUpdate={{self.parent.updateData}}
    /></template>);

    assert
      .dom('[data-test-field]')
      .hasAria('checked', 'true')
      .hasAria('readonly', 'true')
      .hasAttribute('tabindex', '0');
  });

  test('We can pass @isRequired to require a value', async function (this: TestContext, assert) {
    const self = this;




    await render(<template><UiFormCheckbox
    @data={{self.parent.data}}
    @isRequired={{true}}
    @key="subscribe"
    @label="Subscribe to The Ember Times?"
    @onUpdate={{self.parent.updateData}}
    /></template>);

    assert.dom('[data-test-label]').hasText('Subscribe to The Ember Times? *');

    assert.dom('[data-test-field]').hasAria('required', 'true');
  });

  test('We can click on the checkbox to toggle the value', async function (this: TestContext, assert) {
    const self = this;




    await render(<template><UiFormCheckbox
    @data={{self.parent.data}}
    @isRequired={{true}}
    @key="subscribe"
    @label="Subscribe to The Ember Times?"
    @onUpdate={{self.parent.updateData}}
    /></template>);

    // Click the checkbox
    await click('[data-test-field]');

    assert.dom('[data-test-field]').hasAria('checked', 'false');

    assert
      .dom('[data-test-error-message]')
      .hasText('Please select the checkbox.');

    assert.false(this.parent.data['subscribe']);

    // Click the checkbox again
    await click('[data-test-field]');

    assert.dom('[data-test-field]').hasAria('checked', 'true');

    assert.dom('[data-test-error-message]').doesNotExist();

    assert.true(this.parent.data['subscribe']);
  });

  test('We can press the Space key to toggle the value', async function (this: TestContext, assert) {
    const self = this;




    await render(<template><UiFormCheckbox
    @data={{self.parent.data}}
    @isRequired={{true}}
    @key="subscribe"
    @label="Subscribe to The Ember Times?"
    @onUpdate={{self.parent.updateData}}
    /></template>);

    // Press the Space key
    await triggerKeyEvent('[data-test-field]', 'keypress', 'Space');

    assert.dom('[data-test-field]').hasAria('checked', 'false');

    assert.false(this.parent.data['subscribe']);

    assert
      .dom('[data-test-error-message]')
      .hasText('Please select the checkbox.');

    // Press the Space key again
    await triggerKeyEvent('[data-test-field]', 'keypress', 'Space');

    assert.dom('[data-test-field]').hasAria('checked', 'true');

    assert.dom('[data-test-error-message]').doesNotExist();

    assert.true(this.parent.data['subscribe']);
  });
});
