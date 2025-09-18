import { hash } from '@ember/helper';
import LinkTo from '@ember/routing';
import ProductsProductImage from 'my-app/components/products/product/image';
import formatPrice from 'my-app/helpers/format-price';
import Component from '@glimmer/component';

import type { Product } from '../../../utils/routes/products';
import styles from './card.css';

interface ProductsProductCardSignature {
  Args: {
    product: Product;
    redirectTo?: string;
  };
}

export default class ProductsProductCardComponent extends Component<ProductsProductCardSignature> {
  styles = styles;


  <template>
  <ContainerQuery
  @features={{hash wide=(width min=320)}}
  @tagName="article"
  class={{this.styles.container}}
  data-test-product-card
  >
  <header class={{this.styles.header}}>
  <h2 class={{this.styles.name}} data-test-field="Name">
    {{@product.name}}
  </h2>
  </header>

  <div class={{this.styles.image-container}}>
  <ProductsProductImage @src={{@product.imageUrl}} />
  </div>

  <div class={{this.styles.body}}>
  <p class={{this.styles.description}} data-test-field="Short Description">
    {{@product.shortDescription}}
  </p>

  <p class={{this.styles.price}} data-test-field="Price">
    {{formatPrice @product.price}}
  </p>
  </div>

  <div class={{this.styles.actions}}>
  <LinkTo
    @model={{@product.id}}
    @route={{@redirectTo}}
    aria-label={{t
      "components.products.product.card.learn-more.aria-label"
      productName=@product.name
    }}
    class={{this.styles.link}}
    data-test-link="Learn More"
  >
    {{t "components.products.product.card.learn-more.label"}}
  </LinkTo>
  </div>
  </ContainerQuery>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Products::Product::Card': typeof ProductsProductCardComponent;
    'products/product/card': typeof ProductsProductCardComponent;
  }
}
