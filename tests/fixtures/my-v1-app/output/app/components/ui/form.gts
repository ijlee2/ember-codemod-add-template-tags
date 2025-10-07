import { concat, hash } from '@ember/helper';
import { on } from '@ember/modifier';
import UiFormCheckbox from 'docs-app/components/ui/form/checkbox';
import UiFormInformation from 'docs-app/components/ui/form/information';
import UiFormInput from 'docs-app/components/ui/form/input';
import UiFormTextarea from 'docs-app/components/ui/form/textarea';

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


  <template>
  <form
  aria-describedby={{if
  @instructions
  (concat this.formId "-instructions")
  }}
  aria-labelledby={{if @title (concat this.formId "-title")}}
  class={{this.styles.form}}
  data-test-form={{if @title @title ""}}
  {{on "submit" this.submitForm}}
  >
  <UiFormInformation
  @formId={{this.formId}}
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
        changeset=this.changeset
        isInline=true
        isWide=CQ.features.wide
        onUpdate=this.updateChangeset
      )
      Input=(component
        UiFormInput
        changeset=this.changeset
        isWide=CQ.features.wide
        onUpdate=this.updateChangeset
      )
      Textarea=(component
        UiFormTextarea
        changeset=this.changeset
        isWide=CQ.features.wide
        onUpdate=this.updateChangeset
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
  </template>
}
