import { concat, hash, uniqueId } from '@ember/helper';
import { on } from '@ember/modifier';
import { ContainerQuery, width } from 'ember-container-query';
import { t } from 'ember-intl';
import UiFormCheckbox from 'my-addon/components/ui/form/checkbox';
import UiFormInformation from 'my-addon/components/ui/form/information';
import UiFormInput from 'my-addon/components/ui/form/input';
import UiFormNumber from 'my-addon/components/ui/form/number';
import UiFormSelect from 'my-addon/components/ui/form/select';
import UiFormTextarea from 'my-addon/components/ui/form/textarea';
import autofocus from 'my-addon/modifiers/autofocus';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import type { WithBoundArgs } from '@glint/template';
import { TrackedObject } from 'tracked-built-ins';

import styles from './form.css';
import type UiFormCheckbox from './form/checkbox.gts';
import type UiFormInput from './form/input.gts';
import type UiFormNumber from './form/number.gts';
import type UiFormSelect from './form/select.gts';
import type UiFormTextarea from './form/textarea.gts';

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
        Select: WithBoundArgs<
          typeof UiFormSelect,
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


  <template>
  {{#let (uniqueId) as |formId|}}
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
        Number=(component
          UiFormNumber
          changeset=this.changeset
          isWide=CQ.features.wide
          onUpdate=this.updateChangeset
        )
        Select=(component
          UiFormSelect
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
      {{t "components.ui.form.submit"}}
    </button>
  </div>
  </form>
  {{/let}}
  </template>
}
