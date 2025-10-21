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
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo::Header': typeof WidgetsWidget4MemoHeader;
    'widgets/widget-4/memo/header': typeof WidgetsWidget4MemoHeader;
  }
}
