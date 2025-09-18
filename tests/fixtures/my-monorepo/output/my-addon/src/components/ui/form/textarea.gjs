import { on } from '@ember/modifier';
import { action, get } from '@ember/object';
import Component from '@glimmer/component';
import { or } from 'ember-truth-helpers';
import { local } from 'embroider-css-modules';

import { generateErrorMessage } from '../../../utils/components/ui/form';
import UiFormField from './field';
import styles from './textarea.css';

export default class UiFormTextareaComponent extends Component {
  get errorMessage() {
    const { isRequired } = this.args;

    return generateErrorMessage({
      isRequired,
      value: this.value,
      valueType: 'string',
    });
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
    <UiFormField @errorMessage={{this.errorMessage}} @isWide={{@isWide}}>
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
        <textarea
          class={{local
            styles
            "textarea"
            (if (or @isDisabled @isReadOnly) "is-disabled")
          }}
          data-test-field={{@label}}
          disabled={{@isDisabled}}
          id={{f.inputId}}
          placeholder={{@placeholder}}
          readonly={{@isReadOnly}}
          required={{@isRequired}}
          rows="4"
          value={{this.value}}
          {{on "input" this.updateValue}}
        ></textarea>
      </:field>
    </UiFormField>
  </template>
}
