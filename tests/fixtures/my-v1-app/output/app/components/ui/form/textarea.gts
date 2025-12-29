import { on } from '@ember/modifier';
import UiFormField from 'docs-app/components/ui/form/field';

import { action, get } from '@ember/object';
import Component from '@glimmer/component';
import { generateErrorMessage } from 'docs-app/utils/components/ui/form';

import styles from './textarea.css';

interface UiFormTextareaSignature {
  Args: {
    data: Record<string, unknown>;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    isWide?: boolean;
    key: string;
    label: string;
    onUpdate: ({ key, value }: { key: string; value: unknown }) => void;
    placeholder?: string;
  };
}

export default class UiFormTextarea extends Component<UiFormTextareaSignature> {
  styles = styles;

  get errorMessage(): string | undefined {
    const { isRequired } = this.args;

    return generateErrorMessage({
      isRequired,
      value: this.value,
      valueType: 'string',
    });
  }

  get value(): string {
    const { data, key } = this.args;

    return ((get(data, key) as string) ?? '').toString();
  }

  @action updateValue(event: Event): void {
    const { key, onUpdate } = this.args;
    const { value } = event.target as HTMLTextAreaElement;

    onUpdate({ key, value });
  }


  <template><UiFormField
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
  <textarea
    class={{local
      this.styles
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
  </UiFormField></template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form::Textarea': typeof UiFormTextarea;
    'ui/form/textarea': typeof UiFormTextarea;
  }
}
