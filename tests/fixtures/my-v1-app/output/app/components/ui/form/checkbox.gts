import { concat } from '@ember/helper';
import { on } from '@ember/modifier';
import UiFormField from 'docs-app/components/ui/form/field';

import { action, get } from '@ember/object';
import Component from '@glimmer/component';

import styles from './checkbox.css';

interface UiFormCheckboxSignature {
  Args: {
    changeset: Record<string, any>;
    isDisabled?: boolean;
    isInline?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    isWide?: boolean;
    key: string;
    label: string;
    onUpdate: ({ key, value }: { key: string; value: any }) => void;
  };
}

export default class UiFormCheckbox extends Component<UiFormCheckboxSignature> {
  styles = styles;

  get errorMessage(): string | undefined {
    const { isRequired } = this.args;

    if (!isRequired) {
      return undefined;
    }

    if (!this.isChecked) {
      return 'Please select the checkbox.';
    }

    return undefined;
  }

  get isChecked(): boolean {
    const { changeset, key } = this.args;

    return (get(changeset, key) as boolean) ?? false;
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
    class={{local-class
      this.styles
      "checkbox"
      (if this.isChecked "is-checked")
      (if (strict-or @isDisabled @isReadOnly) "is-disabled")
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
