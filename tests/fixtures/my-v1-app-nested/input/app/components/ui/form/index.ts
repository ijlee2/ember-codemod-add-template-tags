import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { WithBoundArgs } from '@glint/template';

import styles from './index.css';
import type UiFormCheckbox from './checkbox';
import type UiFormInput from './input';
import type UiFormNumber from './number';
import type UiFormTextarea from './textarea';

interface UiFormSignature {
  Args: {
    data?: Record<string, unknown>;
    instructions?: string;
    onSubmit: (data: Record<string, unknown>) => Promise<void>;
    title?: string;
  };
  Blocks: {
    default: [
      {
        Checkbox: WithBoundArgs<
          typeof UiFormCheckbox,
          'data' | 'isInline' | 'isWide' | 'onUpdate'
        >;
        Input: WithBoundArgs<
          typeof UiFormInput,
          'data' | 'isWide' | 'onUpdate'
        >;
        Number: WithBoundArgs<
          typeof UiFormNumber,
          'data' | 'isWide' | 'onUpdate'
        >;
        Textarea: WithBoundArgs<
          typeof UiFormTextarea,
          'data' | 'isWide' | 'onUpdate'
        >;
      },
    ];
  };
}

export default class UiForm extends Component<UiFormSignature> {
  styles = styles;

  @tracked data = this.args.data ?? ({} as Record<string, unknown>);

  @action async submitForm(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    await this.args.onSubmit(this.data);
  }

  @action updateData({ key, value }: { key: string; value: unknown }): void {
    this.data = {
      ...this.data,
      [key]: value,
    };
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form': typeof UiForm;
    'ui/form': typeof UiForm;
  }
}
