import { concat, hash, uniqueId } from '@ember/helper';
import { on } from '@ember/modifier';
import UiFormCheckbox from 'docs-app/components/ui/form/checkbox';
import UiFormInformation from 'docs-app/components/ui/form/information';
import UiFormInput from 'docs-app/components/ui/form/input';
import UiFormNumber from 'docs-app/components/ui/form/number';
import UiFormTextarea from 'docs-app/components/ui/form/textarea';

import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { WithBoundArgs } from '@glint/template';

import styles from './form.css';
import type UiFormCheckbox from './form/checkbox';
import type UiFormInput from './form/input';
import type UiFormNumber from './form/number';
import type UiFormTextarea from './form/textarea';

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


  <template>{{#let (uniqueId) as |formId|}}
  <form
  aria-describedby={{if
    @instructions
    (concat formId "-instructions")
  }}
  aria-labelledby={{if @title (concat formId "-title")}}
  class={{this.styles.form}}
  data-test-form={{if @title @title ""}}
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
      Submit
    </button>
  </div>
  </form>
  {{/let}}</template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form': typeof UiForm;
    'ui/form': typeof UiForm;
  }
}
