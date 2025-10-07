import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { WithBoundArgs } from '@glint/template';

import styles from './form.css';
import type UiFormCheckbox from './form/checkbox';
import type UiFormInput from './form/input';
import type UiFormTextarea from './form/textarea';

interface UiFormSignature {
  Args: {
    data?: Record<string, any>;
    instructions?: string;
    title?: string;
  };
  Blocks: {
    default: [
      {
        Checkbox: WithBoundArgs<
          typeof UiFormCheckbox,
          'changeset' | 'isInline' | 'isWide' | 'onUpdate'
        >;
        Input: WithBoundArgs<
          typeof UiFormInput,
          'changeset' | 'isWide' | 'onUpdate'
        >;
        Textarea: WithBoundArgs<
          typeof UiFormTextarea,
          'changeset' | 'isWide' | 'onUpdate'
        >;
      },
    ];
  };
}

export default class UiForm extends Component<UiFormSignature> {
  formId = guidFor(this);
  styles = styles;

  @tracked changeset = this.args.data ?? ({} as Record<string, any>);

  @action submitForm(event: SubmitEvent): void {
    event.preventDefault();

    console.table(this.changeset);
  }

  @action updateChangeset({ key, value }: { key: string; value: any }): void {
    this.changeset = {
      ...this.changeset,
      [key]: value,
    };
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form': typeof UiForm;
  }
}
