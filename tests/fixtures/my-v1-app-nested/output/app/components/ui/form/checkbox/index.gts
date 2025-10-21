import { concat } from '@ember/helper';
import { on } from '@ember/modifier';
import UiFormField from 'docs-app/components/ui/form/field/index';

import { action, get } from '@ember/object';
import Component from '@glimmer/component';
import { generateErrorMessage } from 'docs-app/utils/components/ui/form';

import styles from './index.css';

interface UiFormCheckboxSignature {
  Args: {
    data: Record<string, unknown>;
    isDisabled?: boolean;
    isInline?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    isWide?: boolean;
    key: string;
    label: string;
    onUpdate: ({ key, value }: { key: string; value: unknown }) => void;
  };
}

export default class UiFormCheckbox extends Component<UiFormCheckboxSignature> {
  styles = styles;

  get errorMessage(): string | undefined {
    const { isRequired } = this.args;

    return generateErrorMessage({
      isRequired,
      value: this.isChecked,
      valueType: 'boolean',
    });
  }

  get isChecked(): boolean {
    const { data, key } = this.args;

    return (get(data, key) as boolean) ?? false;
  }

  @action updateValue(): void {
    const { isDisabled, isReadOnly, key, onUpdate } = this.args;

    if (isDisabled || isReadOnly) {
      return;
    }

    const value = !this.isChecked;

    onUpdate({ key, value });
  }

  @action updateValueByPressingSpace(event: KeyboardEvent): void {
    if (event.code === 'Space' || event.key === 'Space') {
      this.updateValue();
    }
  }


  <template>
  <UiFormField
  @errorMessage={{this.errorMessage}}
  @isInline={{@isInline}}
  @isWide={{@isWide}}
  >
  <:label as |l|>
  <label data-test-label id={{concat l.inputId "-label"}}>
    {{@label}}

    {{#if @isRequired}}
      <span aria-hidden="true">
        *
      </span>
    {{/if}}
  </label>
  </:label>

  <:field as |f|>
  <span
    aria-checked={{if this.isChecked "true" "false"}}
    aria-disabled={{if @isDisabled "true" "false"}}
    aria-labelledby={{concat f.inputId "-label"}}
    aria-readonly={{if @isReadOnly "true" "false"}}
    aria-required={{if @isRequired "true" "false"}}
    class={{local
      this.styles
      "checkbox"
      (if this.isChecked "is-checked")
      (if (or @isDisabled @isReadOnly) "is-disabled")
    }}
    data-test-field={{@label}}
    role="checkbox"
    tabindex={{unless @isDisabled "0"}}
    {{on "click" this.updateValue}}
    {{on "keypress" this.updateValueByPressingSpace}}
  >
    {{#if this.isChecked}}
      {{svg-jar
        "check"
        class=this.styles.checkmark-icon
        desc="A checkmark to indicate that the input field is checked"
        role="img"
      }}
    {{/if}}
  </span>
  </:field>
  </UiFormField>
  </template>
}
