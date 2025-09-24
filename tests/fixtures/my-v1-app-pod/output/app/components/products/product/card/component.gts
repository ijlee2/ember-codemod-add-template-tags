import Component from '@glimmer/component';

import type { Product } from '../../../../data/products';
import styles from './styles.css';

interface ProductsProductCardSignature {
  Args: {
    product: Product;
    redirectTo?: string;
  };
}

export default class ProductsProductCardComponent extends Component<ProductsProductCardSignature> {
  styles = styles;


  <template></template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Products::Product::Card': typeof ProductsProductCardComponent;
  }
}
