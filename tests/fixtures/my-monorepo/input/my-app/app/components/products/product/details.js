import { action } from '@ember/object';
import Component from '@glimmer/component';

import styles from './details.css';

export default class ProductsProductDetailsComponent extends Component {
  styles = styles;

  @action addProductToCart(product) {
    console.log(`${product.name} has been added to the cart.`);
  }
}
