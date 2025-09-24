import Component from '@glimmer/component';
import config from 'docs-app/config/environment';

import styles from './styles.css';

export default class ProductsProductImageComponent extends Component {
  isTestEnvironment = config.environment === 'test';
  styles = styles;


  <template></template>
}
