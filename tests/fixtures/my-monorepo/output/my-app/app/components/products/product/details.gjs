import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import formatPrice from 'my-app/helpers/format-price';

import { action } from '@ember/object';
import Component from '@glimmer/component';

import styles from './details.css';

export default class ProductsProductDetails extends Component {
  styles = styles;

  @action addProductToCart(product) {
    console.log(`${product.name} has been added to the cart.`);
  }


  <template>
  <article class={{this.styles.container}} data-test-product-details>
  <header class={{this.styles.header}}>
  <h2 class={{this.styles.name}} data-test-field="Name">
    {{@product.name}}
  </h2>
  </header>

  <div class={{this.styles.image-container}}>
  <ProductsProductImage @src={{@product.imageUrl}} />
  </div>

  <div class={{this.styles.body}}>
  <section class={{this.styles.field}}>
    <h3>
      {{t "components.products.product.details.description"}}
    </h3>

    <p data-test-field="Description">
      {{@product.description}}
    </p>
  </section>

  <section class={{this.styles.field}}>
    <h3>
      {{t "components.products.product.details.price"}}
    </h3>

    <p data-test-field="Price">
      {{formatPrice @product.price}}
    </p>
  </section>

  <section class={{this.styles.field}}>
    <h3>
      {{t "components.products.product.details.rating"}}
    </h3>

    <p data-test-field="Rating">
      {{t
        "components.products.product.details.rating-value"
        productRating=@product.rating
      }}
    </p>
  </section>

  <section class={{this.styles.field}}>
    <h3>
      {{t "components.products.product.details.seller"}}
    </h3>

    <p data-test-field="Seller">{{@product.seller}}</p>
  </section>
  </div>

  <div class={{this.styles.actions}}>
  <button
    data-test-button="Add to Cart"
    type="button"
    {{on "click" (fn this.addProductToCart @product)}}
  >
    {{t "components.products.product.details.add-to-cart"}}
  </button>
  </div>
  </article>
  </template>
}
