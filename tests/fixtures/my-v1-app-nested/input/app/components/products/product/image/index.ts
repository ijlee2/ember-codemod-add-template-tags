import { isTesting, macroCondition } from '@embroider/macros';
import Component from '@glimmer/component';

import styles from './index.css';

interface ProductsProductImageSignature {
  Args: {
    src: string;
  };
}

export default class ProductsProductImage extends Component<ProductsProductImageSignature> {
  isTestEnvironment = macroCondition(isTesting()) ? true : false;
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Products::Product::Image': typeof ProductsProductImage;
    'products/product/image': typeof ProductsProductImage;
  }
}
