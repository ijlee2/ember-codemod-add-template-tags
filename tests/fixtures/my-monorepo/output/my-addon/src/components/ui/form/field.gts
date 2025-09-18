import { hash, uniqueId } from '@ember/helper';

import Component from '@glimmer/component';

import styles from './field.css';

interface UiFormFieldSignature {
  Args: {
    errorMessage?: string;
    isInline?: boolean;
    isWide?: boolean;
  };
  Blocks: {
    field: [
      {
        inputId: string;
      },
    ];
    label: [
      {
        inputId: string;
      },
    ];
  };
}

export default class UiFormFieldComponent extends Component<UiFormFieldSignature> {
  styles = styles;


  <template>
  {{#let (uniqueId) as |inputId|}}
  <div
  class={{local
    this.styles
    "container"
    (if @isInline "is-inline")
    (if @isWide "is-wide")
    (unless @errorMessage "no-feedback")
  }}
  >
  <div class={{this.styles.label}}>
    {{yield (hash inputId=inputId) to="label"}}
  </div>

  <div class={{this.styles.field}}>
    {{yield (hash inputId=inputId) to="field"}}
  </div>

  {{#if @errorMessage}}
    <div
      class={{local this.styles "feedback" "is-error"}}
      data-test-error-message
      role="alert"
    >
      {{@errorMessage}}
    </div>
  {{/if}}
  </div>
  {{/let}}
  </template>
}
