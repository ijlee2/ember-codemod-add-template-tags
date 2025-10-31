import Component from '@glimmer/component';
import type { QueryResults } from 'ember-container-query';

import styles from './header.css';

interface WidgetsWidget4MemoHeaderSignature {
  Args: {
    cqFeatures?: QueryResults<'small' | 'large' | 'short'>;
  };
}

export default class WidgetsWidget4MemoHeader extends Component<WidgetsWidget4MemoHeaderSignature> {
  styles = styles;


  <template>
  {{#let
  (and @cqFeatures.large @cqFeatures.short)
  (or @cqFeatures.small @cqFeatures.short)
  as |showHorizontalLayout showMinimalLayout|
  }}
  <div
  class={{local
    this.styles
    "header"
    (if showMinimalLayout "minimal-layout")
    (if showHorizontalLayout "horizontal-layout")
  }}
  data-test-memo-header
  >
  {{#unless showMinimalLayout}}
    <div class={{this.styles.avatar-container}}>
      <img
        alt=""
        class={{this.styles.avatar}}
        data-test-image="Avatar"
        src="/images/widgets/widget-4/avatar.jpg"
      />
    </div>
  {{/unless}}

  <p class={{this.styles.name}}>
    Isaac Lee
  </p>

  <div class={{this.styles.metadata}}>
    <a class={{this.styles.handle}} href="#">@ijlee2</a>
    · 38m
  </div>
  </div>
  {{/let}}
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo::Header': typeof WidgetsWidget4MemoHeader;
    'widgets/widget-4/memo/header': typeof WidgetsWidget4MemoHeader;
  }
}
