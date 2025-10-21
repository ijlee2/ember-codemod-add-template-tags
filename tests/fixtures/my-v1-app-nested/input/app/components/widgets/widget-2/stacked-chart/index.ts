import Component from '@glimmer/component';
import type { Data } from 'docs-app/utils/components/widgets/widget-2';

import styles from './index.css';

interface WidgetsWidget2StackedChartSignature {
  Args: {
    data: Data[];
  };
}

export default class WidgetsWidget2StackedChart extends Component<WidgetsWidget2StackedChartSignature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-2::StackedChart': typeof WidgetsWidget2StackedChart;
    'widgets/widget-2:/stacked-chart': typeof WidgetsWidget2StackedChart;
  }
}
