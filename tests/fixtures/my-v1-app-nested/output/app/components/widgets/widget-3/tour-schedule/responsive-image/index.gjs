import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { findBestFittingImage } from 'docs-app/utils/components/widgets/widget-3';

import styles from './index.css';

export default class WidgetsWidget3TourScheduleResponsiveImage extends Component {
  @tracked imageSource;

  styles = styles;

  @action setImageSource({ dimensions }) {
    const { images } = this.args;

    this.imageSource = findBestFittingImage(images, dimensions);
  }


  <template>
  <div
  class={{this.styles.image-container}}
  {{container-query debounce=300 onQuery=this.setImageSource}}
  >
  {{#if this.imageSource}}
  <img
    alt=""
    class={{this.styles.image}}
    data-test-image="Concert"
    src={{this.imageSource}}
  />
  {{/if}}
  </div>
  </template>
}
