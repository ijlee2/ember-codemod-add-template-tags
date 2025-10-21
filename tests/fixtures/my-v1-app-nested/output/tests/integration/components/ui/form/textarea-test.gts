import UiFormTextarea from 'docs-app/components/ui/form/textarea/index';

import { set } from '@ember/object';
import {
  fillIn,
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  data: Record<string, unknown>;
  updateData: ({ key, value }: { key: string; value: unknown }) => void;
}

module('Integration | Component | ui/form/textarea', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.data = {
      email: 'zoey@emberjs.com',
      message: 'I 🧡 CSS modules!',
      name: 'Zoey',
      subscribe: false,
    };

    this.updateData = () => {
      // Do nothing
    };
  });

  test('it renders', async function (this: TestContext, assert) {
    const self = this;




    await render(<template>
    <UiFormTextarea
    @data={{self.data}}
    @key="message"
    @label="Message"
    @onUpdate={{self.updateData}}
    />
    </template>);

    assert.dom('[data-test-label]').hasText('Message');

    assert
      .dom('[data-test-field]')
      .doesNotHaveAttribute('readonly')
      .hasTagName('textarea')
      .hasValue('I 🧡 CSS modules!')
      .isEnabled()
      .isNotRequired();

    assert.dom('[data-test-error-message]').doesNotExist();
  });

  test('We can pass @isDisabled to disable the text area', async function (this: TestContext, assert) {
    const self = this;




    await render(<template>
    <UiFormTextarea
    @data={{self.data}}
    @isDisabled={{true}}
    @key="message"
    @label="Message"
    @onUpdate={{self.updateData}}
    />
    </template>);

    assert.dom('[data-test-field]').isDisabled();
  });

  test('We can pass @isReadOnly to display the value', async function (this: TestContext, assert) {
    const self = this;




    await render(<template>
    <UiFormTextarea
    @data={{self.data}}
    @isReadOnly={{true}}
    @key="message"
    @label="Message"
    @onUpdate={{self.updateData}}
    />
    </template>);

    assert
      .dom('[data-test-field]')
      .hasAttribute('readonly', '')
      .hasValue('I 🧡 CSS modules!');
  });

  test('We can pass @isRequired to require a value', async function (this: TestContext, assert) {
    const self = this;




    await render(<template>
    <UiFormTextarea
    @data={{self.data}}
    @isRequired={{true}}
    @key="message"
    @label="Message"
    @onUpdate={{self.updateData}}
    />
    </template>);

    assert.dom('[data-test-label]').hasText('Message *');

    assert.dom('[data-test-field]').isRequired();
  });

  test('We can pass @onUpdate to get the updated value', async function (this: TestContext, assert) {
    let expectedValue = '';

    this.updateData = ({ key, value }: { key: string; value: unknown }) => {
      assert.step('onUpdate');

      assert.strictEqual(value, expectedValue);

      set(this.data, key, value);
    };

    const self = this;




    await render(<template>
    <UiFormTextarea
    @data={{self.data}}
    @isRequired={{true}}
    @key="message"
    @label="Message"
    @onUpdate={{self.updateData}}
    />
    </template>);

    // Update the value
    await fillIn('[data-test-field="Message"]', '');

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
