import { hash } from '@ember/helper';
import WidgetsWidget2Captions from 'docs-app/components/widgets/widget-2/captions/index';
import WidgetsWidget2StackedChart from 'docs-app/components/widgets/widget-2/stacked-chart/index';

import type Owner from '@ember/owner';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { revenues } from 'docs-app/data/music-revenue';
import {
  createDataForVisualization,
  createSummariesForCaptions,
  type Data,
  type Summary,
} from 'docs-app/utils/components/widgets/widget-2';

import styles from './index.css';

interface WidgetsWidget2Signature {
  Args: {};
}

export default class WidgetsWidget2 extends Component<WidgetsWidget2Signature> {
  @tracked data = [] as Data[];
  @tracked summaries = [] as Summary[];

  styles = styles;

  constructor(owner: Owner, args: WidgetsWidget2Signature['Args']) {
    super(owner, args);

    this.loadData();
  }

  loadData(): void {
    this.data = createDataForVisualization(revenues);
    this.summaries = createSummariesForCaptions(this.data);
  }


  <template>
  <ContainerQuery
  @features={{hash
  short=(height max=240)
  tall=(height min=240 max=480)
  very-tall=(height min=480)
  }}
  @tagName="section"
  class={{this.styles.container}}
  as |CQ|
  >
  <header>
  <h2>Widget 2</h2>
  </header>

  {{#unless CQ.features.short}}
  <div
    class={{this.styles.visualization}}
    data-test-visualization
  >
    <WidgetsWidget2StackedChart @data={{this.data}} />
  </div>
  {{/unless}}

  <div class={{this.styles.captions}} data-test-captions>
  <WidgetsWidget2Captions
    @summaries={{this.summaries}}
  />
  </div>
  </ContainerQuery>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-2': typeof WidgetsWidget2;
    'widgets/widget-2': typeof WidgetsWidget2;
  }
}
