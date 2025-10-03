import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import type { Concert } from '../../../data/concert';
import concertData from '../../../data/concert';
import styles from './index.css';

interface WidgetsWidget3Signature {
  // eslint-disable-next-line @typescript-eslint/ban-types
  Args: {};
}

export default class WidgetsWidget3Component extends Component<WidgetsWidget3Signature> {
  styles = styles;

  @tracked concertData = {} as Concert;

  constructor(owner: unknown, args: WidgetsWidget3Signature['Args']) {
    super(owner, args);

    this.loadData();
  }

  loadData(): void {
    this.concertData = concertData;
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
  <Widgets::Widget-3::TourSchedule
    @concert={{this.concertData}}
  />
  </div>
  </section>
  </template>
}
