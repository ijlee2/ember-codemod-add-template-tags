import type Owner from '@ember/owner';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { type Concert, concert } from 'docs-app/data/concert';

import styles from './index.css';

interface WidgetsWidget3Signature {
  Args: {};
}

export default class WidgetsWidget3 extends Component<WidgetsWidget3Signature> {
  @tracked concertData = {} as Concert;

  styles = styles;

  constructor(owner: Owner, args: WidgetsWidget3Signature['Args']) {
    super(owner, args);

    this.loadData();
  }

  loadData(): void {
    this.concertData = concert;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-3': typeof WidgetsWidget3;
    'widgets/widget-3': typeof WidgetsWidget3;
  }
}
