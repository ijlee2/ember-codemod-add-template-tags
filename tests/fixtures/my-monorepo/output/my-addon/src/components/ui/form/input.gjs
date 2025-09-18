import { on } from '@ember/modifier';
import { or } from 'ember-truth-helpers';
import { local } from 'embroider-css-modules';
import UiFormField from 'my-addon/components/ui/form/field';
import { assert } from '@ember/debug';
import { action, get } from '@ember/object';
import Component from '@glimmer/component';

import { generateErrorMessage } from '../../../utils/components/ui/form';
import styles from './input.css';

export default class UiFormInputComponent extends Component {
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


  <template>
  <UiFormField
  @errorMessage={{this.errorMessage}}
  @isWide={{@isWide}}
  >
  <:label as |l|>
  <label data-test-label for={{l.inputId}}>
    {{@label}}

    {{#if @isRequired}}
      <span aria-hidden="true">
        *
      </span>
    {{/if}}
  </label>
  </:label>

  <:field as |f|>
  <input
    class={{local
      this.styles
      "input"
      (if (or @isDisabled @isReadOnly) "is-disabled")
    }}
    data-test-field={{@label}}
    disabled={{@isDisabled}}
    id={{f.inputId}}
    placeholder={{@placeholder}}
    readonly={{@isReadOnly}}
    required={{@isRequired}}
    type={{this.type}}
    value={{this.value}}
    {{on "input" this.updateValue}}
  />
  </:field>
  </UiFormField>
  </template>
}
