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
}
