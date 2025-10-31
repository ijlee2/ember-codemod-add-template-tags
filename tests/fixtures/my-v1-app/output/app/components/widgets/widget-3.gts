import WidgetsWidget3TourSchedule from 'docs-app/components/widgets/widget-3/tour-schedule';

import type Owner from '@ember/owner';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { type Concert, concert } from 'docs-app/data/concert';

import styles from './widget-3.css';

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


  <template>
  <section class={{this.styles.container}}>
  <header class={{this.styles.header}}>
  <h2>Widget 3</h2>

  <div class={{this.styles.actions}}>
    <a data-test-link="All tours" href="#">
      All tours
    </a>
  </div>
  </header>

  <div
  class={{this.styles.tour-schedule}}
  data-test-tour-schedule
  >
  <WidgetsWidget3TourSchedule
    @concert={{this.concertData}}
  />
  </div>
  </section>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-3': typeof WidgetsWidget3;
    'widgets/widget-3': typeof WidgetsWidget3;
  }
}
