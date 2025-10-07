import type { TOC } from '@ember/component/template-only';

import styles from './index.css';

interface WidgetsWidget1ItemSignature {
  Args: {
    title: string;
  };
}

const WidgetsWidget1Item: TOC<WidgetsWidget1ItemSignature> =
  <template>
    <div class={{styles.container}}>
      <p data-test-title>
        {{@title}}
      </p>
    </div>
  </template>

export default WidgetsWidget1Item;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-1::Item': typeof WidgetsWidget1Item;
  }
}
