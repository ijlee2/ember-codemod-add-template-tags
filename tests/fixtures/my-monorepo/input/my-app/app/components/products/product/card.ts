import Component from '@glimmer/component';
import type { Product } from 'my-app/utils/routes/products';

import styles from './card.module.css';

interface ProductsProductCardSignature {
  Args: {
    product: Product;
    redirectTo?: string;
  };
}

export default class ProductsProductCard extends Component<ProductsProductCardSignature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Products::Product::Card': typeof ProductsProductCard;
    'products/product/card': typeof ProductsProductCard;
  }
}
