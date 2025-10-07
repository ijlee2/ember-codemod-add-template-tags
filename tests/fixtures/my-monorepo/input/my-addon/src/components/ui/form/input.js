import { assert } from '@ember/debug';
import { action, get } from '@ember/object';
import Component from '@glimmer/component';

import { generateErrorMessage } from '../../../utils/components/ui/form';
import styles from './input.css';

export default class UiFormInput extends Component {
  styles = styles;

  get errorMessage() {
    const { isRequired } = this.args;

    return generateErrorMessage({
      isRequired,
      value: this.value,
      valueType: 'string',
    });
  }

  get type() {
    const { type } = this.args;

    assert(
      'To render a number input, please use <Ui::Form::Number> instead.',
      type !== 'number',
    );

    return type ?? 'text';
  }

  get value() {
    const { data, key } = this.args;

    return (get(data, key) ?? '').toString();
  }

  @action updateValue(event) {
    const { key, onUpdate } = this.args;
    const { value } = event.target;

    onUpdate({ key, value });
  }
}
