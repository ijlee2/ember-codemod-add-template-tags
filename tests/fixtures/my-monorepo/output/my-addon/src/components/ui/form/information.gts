import { concat } from '@ember/helper';

import type { TOC } from '@ember/component/template-only';

interface UiFormInformationSignature {
  Args: {
    formId: string;
    instructions?: string;
    title?: string;
  };
}

const UiFormInformationComponent = <template>
{{#if (or @title @instructions)}}
  <div class="ui-form-information-container">
    {{#if @title}}
      <div
        class="ui-form-information-title"
        data-test-title
        id={{concat @formId "-title"}}
      >
        {{@title}}
      </div>
    {{/if}}

    {{#if @instructions}}
      <p
        class="ui-form-information-instructions"
        data-test-instructions
        id={{concat @formId "-instructions"}}
      >
        {{@instructions}}
      </p>
    {{/if}}
  </div>
{{/if}}
</template> satisfies TOC<UiFormInformationSignature>;

export default UiFormInformationComponent;
