import type { TOC } from '@ember/component/template-only';

import styles from './page.css';

interface UiPageSignature {
  Args: {
    title: string;
  };
  Blocks: {
    default: [];
  };
}

const UiPage: TOC<UiPageSignature> = <template>
  <div class={{styles.container}}>
    <h1 class={{styles.title}} data-test-page-title>
      {{@title}}
    </h1>

    <div
      class={{styles.content}}
      data-test-page-content
      id="main-content"
      tabindex="-1"
    >
      {{yield}}
    </div>
  </div>
</template>;

export default UiPage;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Page': typeof UiPage;
    'ui/page': typeof UiPage;
  }
}
