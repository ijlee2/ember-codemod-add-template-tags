import UiFormTextarea from 'my-addon/components/ui/form/textarea';

import { set } from '@ember/object';
import { fillIn, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | ui/form/textarea', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.data = {
      email: 'zoey@emberjs.com',
      message: 'I 🧡 container queries!',
      name: 'Zoey',
      subscribe: false,
    };

    this.updateData = () => {
      // Do nothing
    };
  });

  test('it renders', async function (assert) {
    const self = this;




    await render(<template><UiFormTextarea
    @data={{self.data}}
    @key="message"
    @label="Message"
    @onUpdate={{self.updateData}}
    /></template>);

    assert.dom('[data-test-label]').hasText('Message');

    assert
      .dom('[data-test-field]')
      .doesNotHaveAttribute('readonly')
      .hasTagName('textarea')
      .hasValue('I 🧡 container queries!')
      .isEnabled()
      .isNotRequired();

    assert.dom('[data-test-error-message]').doesNotExist();
  });

  test('We can pass @isDisabled to disable the text area', async function (assert) {
    const self = this;




    await render(<template><UiFormTextarea
    @data={{self.data}}
    @isDisabled={{true}}
    @key="message"
    @label="Message"
    @onUpdate={{self.updateData}}
    /></template>);

    assert.dom('[data-test-field]').isDisabled();
  });

  test('We can pass @isReadOnly to display the value', async function (assert) {
    const self = this;




    await render(<template><UiFormTextarea
    @data={{self.data}}
    @isReadOnly={{true}}
    @key="message"
    @label="Message"
    @onUpdate={{self.updateData}}
    /></template>);

    assert
      .dom('[data-test-field]')
      .hasAttribute('readonly', '')
      .hasValue('I 🧡 container queries!');
  });

  test('We can pass @isRequired to require a value', async function (assert) {
    const self = this;




    await render(<template><UiFormTextarea
    @data={{self.data}}
    @isRequired={{true}}
    @key="message"
    @label="Message"
    @onUpdate={{self.updateData}}
    /></template>);

    assert.dom('[data-test-label]').hasText('Message *');

    assert.dom('[data-test-field]').isRequired();
  });

  test('We can pass @onUpdate to get the updated value', async function (assert) {
    let expectedValue = '';

    this.updateData = ({ key, value }) => {
      assert.step('onUpdate');

      assert.strictEqual(value, expectedValue);

      set(data, key, value);
    };

    const self = this;




    await render(<template><UiFormTextarea
    @data={{self.data}}
    @isRequired={{true}}
    @key="message"
    @label="Message"
    @onUpdate={{self.updateData}}
    /></template>);

    // Update the value
    await fillIn('[data-test-field]', '');

    assert.dom('[data-test-field]').hasNoValue();

    assert.dom('[data-test-error-message]').hasText('Please provide a value.');

    // Update the value again
    expectedValue = 'Keep up the good work!';

    await fillIn('[data-test-field]', 'Keep up the good work!');

    assert.dom('[data-test-field]').hasValue('Keep up the good work!');

    assert.dom('[data-test-error-message]').doesNotExist();

    assert.verifySteps(['onUpdate', 'onUpdate']);
  });
});
