import type { TOC } from '@ember/component/template-only';
import config from 'docs-app/config/environment';

import styles from './index.css';

const isTestEnvironment = config.environment === 'test';

interface ProductsProductImageSignature {
  Args: {
    src: string;
  };
}

const ProductsProductImage: TOC<ProductsProductImageSignature> =
  <template>
    {{#if isTestEnvironment}}
      <div class={{styles.placeholder-image}}></div>

    {{else}}
      {{! template-lint-disable no-redundant-role }}
      <img
        alt=""
        class={{styles.image}}
        role="presentation"
        src={{@src}}
      />
      {{! template-lint-enable no-redundant-role }}

    {{/if}}
  </template>

export default ProductsProductImage;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Products::Product::Image': typeof ProductsProductImage;
  }
}
