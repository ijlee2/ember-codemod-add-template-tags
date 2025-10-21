import Component from '@glimmer/component';
import config from 'docs-app/config/environment';

import styles from './index.css';

interface ProductsProductImageSignature {
  Args: {
    src: string;
  };
}

export default class ProductsProductImage extends Component<ProductsProductImageSignature> {
  isTestEnvironment = config.environment === 'test';
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Products::Product::Image': typeof ProductsProductImage;
    'products/product/image': typeof ProductsProductImage;
  }
}
