import UiForm from 'my-addon/components/ui/form';
import UiPage from 'my-addon/components/ui/page';

<template>
{{page-title (t "routes.form.title")}}

<UiPage @title={{t "routes.form.title"}}>
  <UiForm
    @data={{this.contactMe.initialData}}
    @instructions={{t "routes.form.contact-me-form.instructions"}}
    @onSubmit={{perform this.contactMe.submitData}}
    @title={{t "routes.form.contact-me-form.title"}}
    as |F|
  >
    <div class={{this.styles.field}}>
      <F.Input
        @isRequired={{true}}
        @key="name"
        @label={{t "routes.form.contact-me-form.fields.name.label"}}
        @placeholder={{t
          "routes.form.contact-me-form.fields.name.placeholder"
        }}
      />
    </div>

    <div class={{this.styles.field}}>
      <F.Input
        @isRequired={{true}}
        @key="email"
        @label={{t "routes.form.contact-me-form.fields.email.label"}}
        @placeholder={{t
          "routes.form.contact-me-form.fields.email.placeholder"
        }}
        @type="email"
      />
    </div>

    <div class={{this.styles.field}}>
      <F.Textarea
        @key="message"
        @label={{t "routes.form.contact-me-form.fields.message.label"}}
      />
    </div>

    {{#if this.contactMe.showSubscribe}}
      <div class={{this.styles.field}}>
        <F.Checkbox
          @key="subscribe"
          @label={{t "routes.form.contact-me-form.fields.subscribe.label"}}
        />
      </div>
    {{else}}
      <div class={{this.styles.field}}>
        <F.Number
          @key="donation"
          @label={{t "routes.form.contact-me-form.fields.donation.label"}}
          @minValue={{0}}
          @placeholder={{t
            "routes.form.contact-me-form.fields.donation.placeholder"
          }}
          @step={{10}}
        />
      </div>
    {{/if}}
  </UiForm>
</UiPage>
</template>
