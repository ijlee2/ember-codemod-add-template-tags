import { render } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | products/product/card', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function () {
    this.product = {
      categoryId: 'cake',
      description: 'Made with organic herbs',
      id: '1',
      imageUrl: '',
      name: 'Vanilla Ice Cream Cake',
      price: 40,
      rating: 4.5,
      seller: "Amy's",
      shortDescription: 'Made with organic herbs',
    };
  });

  test('it renders', async function (assert) {
    await render(
      hbs`
        <Products::Product::Card
          @product={{this.product}}
          @redirectTo="products.product"
        />
      `,
    );

    assert.dom('[data-test-field="Name"]').hasText('Vanilla Ice Cream Cake');

    assert
      .dom('[data-test-field="Short Description"]')
      .hasText('Made with organic herbs');

    assert.dom('[data-test-field="Price"]').hasText('$40');

    assert
      .dom('[data-test-link="Learn More"]')
      .hasAria('label', 'Learn more about Vanilla Ice Cream Cake')
      .hasTagName('a')
      .hasText('Learn more');

    await a11yAudit();
  });
});
