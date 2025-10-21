import { hash } from '@ember/helper';
import WidgetsWidget1Item from 'docs-app/components/widgets/widget-1/item';

import Component from '@glimmer/component';

import styles from './widget-1.css';

export default class WidgetsWidget1 extends Component {
  styles = styles;


  <template>
  <ContainerQuery
  @features={{hash
  tall=(aspect-ratio max=0.8)
  square=(aspect-ratio min=0.8 max=1.25)
  wide=(aspect-ratio min=1.25)
  }}
  @tagName="section"
  class={{this.styles.container}}
  >
  <header>
  <h2>Widget 1</h2>
  </header>

  <div class={{this.styles.items}}>
  <div class={{this.styles.item-1}}>
    <WidgetsWidget1Item @title="Item 1" />
  </div>

  <div class={{this.styles.item-2}}>
    <WidgetsWidget1Item @title="Item 2" />
  </div>

  <div class={{this.styles.item-3}}>
    <WidgetsWidget1Item @title="Item 3" />
  </div>
  </div>
  </ContainerQuery>
  </template>
}
