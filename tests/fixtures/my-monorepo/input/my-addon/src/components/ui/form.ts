import { action } from '@ember/object';
import Component from '@glimmer/component';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
import { TrackedObject } from 'tracked-built-ins';

import styles from './form.css';
import type UiFormCheckbox from './form/checkbox.ts';
import type UiFormInput from './form/input.ts';
import type UiFormSelect from './form/select.ts';

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
        // @ts-expect-error: Incorrect type
        Number: ComponentLike;
        Select: WithBoundArgs<
          typeof UiFormSelect,
          'data' | 'isWide' | 'onUpdate'
        >;
        // @ts-expect-error: Incorrect type
        Textarea: ComponentLike;
      },
    ];
  };
}

export default class UiFormComponent extends Component<UiFormSignature> {
  data = new TrackedObject<Record<string, unknown>>(this.args.data ?? {});

  styles = styles;

  @action async submitForm(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    await this.args.onSubmit(this.data);
  }

  @action updateData({ key, value }: { key: string; value: unknown }): void {
    this.data[key] = value;
  }
}
