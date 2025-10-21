import Controller from '@ember/controller';
import { action } from '@ember/object';

import styles from './form.css';

export default class FormController extends Controller {
  styles = styles;

  @action submitData(data: Record<string, unknown>): void {
    console.table(data);
  }
}
