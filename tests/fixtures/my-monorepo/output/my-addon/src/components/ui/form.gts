import { concat, hash, uniqueId } from '@ember/helper';
import { on } from '@ember/modifier';
import UiFormCheckbox from 'my-addon/components/ui/form/checkbox';
import UiFormInformation from 'my-addon/components/ui/form/information';
import UiFormInput from 'my-addon/components/ui/form/input';
import UiFormNumber from 'my-addon/components/ui/form/number';
import UiFormSelect from 'my-addon/components/ui/form/select';
import UiFormTextarea from 'my-addon/components/ui/form/textarea';
import autofocus from 'my-addon/modifiers/autofocus';

import { action } from '@ember/object';
import Component from '@glimmer/component';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
import { TrackedObject } from 'tracked-built-ins';

import styles from './form.module.css';
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

export default class UiForm extends Component<UiFormSignature> {
  data = new TrackedObject<Record<string, unknown>>(this.args.data ?? {});

  styles = styles;

  @action async submitForm(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    await this.args.onSubmit(this.data);
  }

  @action updateData({ key, value }: { key: string; value: unknown }): void {
    this.data[key] = value;
  }


  <template>{{#let (uniqueId) as |formId|}}
  <form
  aria-describedby={{if
    @instructions
    (concat formId "-instructions")
  }}
  aria-labelledby={{if @title (concat formId "-title")}}
  class={{this.styles.form}}
  data-test-form={{if @title @title ""}}
  {{autofocus}}
  {{on "submit" this.submitForm}}
  >
  <UiFormInformation
    @formId={{formId}}
    @instructions={{@instructions}}
    @title={{@title}}
  />

  <ContainerQuery
    @features={{hash wide=(width min=480)}}
    as |CQ|
  >
    {{yield
      (hash
        Checkbox=(component
          UiFormCheckbox
          data=this.data
          isInline=true
          isWide=CQ.features.wide
          onUpdate=this.updateData
        )
        Input=(component
          UiFormInput
          data=this.data
          isWide=CQ.features.wide
          onUpdate=this.updateData
        )
        Number=(component
          UiFormNumber
          data=this.data
          isWide=CQ.features.wide
          onUpdate=this.updateData
        )
        Select=(component
          UiFormSelect
          data=this.data
          isWide=CQ.features.wide
          onUpdate=this.updateData
        )
        Textarea=(component
          UiFormTextarea
          data=this.data
          isWide=CQ.features.wide
          onUpdate=this.updateData
        )
      )
    }}
  </ContainerQuery>

  <div class={{this.styles.actions}}>
    <button
      class={{this.styles.submit-button}}
      data-test-button="Submit"
      type="submit"
    >
      {{t "components.ui.form.submit"}}
    </button>
  </div>
  </form>
  {{/let}}</template>
}
