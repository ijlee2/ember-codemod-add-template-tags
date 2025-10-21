import Component from '@glimmer/component';
import type { QueryResults } from 'ember-container-query';

import styles from './actions.css';

interface WidgetsWidget4MemoActionsSignature {
  Args: {
    cqFeatures?: QueryResults<'small' | 'large' | 'short'>;
  };
}

export default class WidgetsWidget4MemoActions extends Component<WidgetsWidget4MemoActionsSignature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo::Actions': typeof WidgetsWidget4MemoActions;
    'widgets/widget-4/memo/actions': typeof WidgetsWidget4MemoActions;
  }
}
