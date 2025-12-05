import {
  assertFixture,
  loadFixture,
  normalizeFile,
  test,
} from '@codemod-utils/tests';

import { findEntities, updateComponents } from '../../../src/steps/index.js';
import {
  inputProject,
  options,
  packages,
} from '../../helpers/shared-test-setups/my-v1-app-nested.js';

test('steps | update-components > v1-app (nested)', function () {
  const outputProject = {
    app: {
      components: {
        ui: {
          form: {
            checkbox: {
              'index.gts': normalizeFile([
                `import Component from '@glimmer/component';`,
                ``,
                `interface UiFormCheckboxSignature {}`,
                ``,
                `export default class UiFormCheckbox extends Component<UiFormCheckboxSignature> {`,
                `  <template>`,
                ``,
                `  </template>`,
                `}`,
                ``,
                `declare module '@glint/environment-ember-loose/registry' {`,
                `  export default interface Registry {`,
                `    'Ui::Form::Checkbox': typeof UiFormCheckbox;`,
                `    'ui/form/checkbox': typeof UiFormCheckbox;`,
                `  }`,
                `}`,
                ``,
              ]),
            },
            field: {
              'index.gts': normalizeFile([
                `import Component from '@glimmer/component';`,
                ``,
                `interface UiFormFieldSignature {}`,
                ``,
                `export default class UiFormField extends Component<UiFormFieldSignature> {`,
                `    <template>`,
                ``,
                `    </template>`,
                `}`,
                ``,
              ]),
            },
            information: {
              'index.gts': normalizeFile([
                `import type { TOC } from '@ember/component/template-only';`,
                ``,
                `interface UiFormInformationSignature {}`,
                ``,
                `const UiFormInformation = <template>`,
                ``,
                `</template> satisfies TOC<UiFormInformationSignature>;`,
                ``,
                `export default UiFormInformation;`,
                ``,
                `declare module '@glint/environment-ember-loose/registry' {`,
                `  export default interface Registry {`,
                `    'Ui::Form::Information': typeof UiFormInformation;`,
                `    'ui/form/information': typeof UiFormInformation;`,
                `  }`,
                `}`,
                ``,
              ]),
            },
            input: {
              'index.gjs': normalizeFile([
                `import Component from '@glimmer/component';`,
                ``,
                `export default class UiFormInput extends Component {`,
                `    <template>`,
                ``,
                `    </template>`,
                `}`,
                ``,
              ]),
            },
            number: {
              'index.gts': ``,
            },
            select: {
              'index.gts': normalizeFile([
                `import Component from '@glimmer/component';`,
                ``,
                `interface UiFormSelectSignature {}`,
                ``,
                `export default class UiFormSelect extends Component<UiFormSelectSignature> {`,
                `    <template>`,
                ``,
                `    </template>`,
                `}`,
                ``,
              ]),
            },
            textarea: {
              'index.gjs': ``,
            },
            'index.gts': normalizeFile([
              `import Component from '@glimmer/component';`,
              ``,
              `interface UiFormSignature {}`,
              ``,
              `export default class UiForm extends Component<UiFormSignature> {`,
              `    <template>`,
              ``,
              `    </template>`,
              `}`,
              ``,
            ]),
          },
          page: {
            'index.gjs': normalizeFile([
              `const UiPage = <template>`,
              ``,
              `</template>;`,
              ``,
              `export default UiPage;`,
              ``,
            ]),
          },
        },
        'navigation-menu': {
          'index.gjs': normalizeFile([`<template>`, ``, `</template>`, ``]),
        },
        'select-locale': {
          'index.gjs': normalizeFile([
            `import Component from '@glimmer/component';`,
            ``,
            `export default class SelectLocale extends Component {`,
            `    <template>`,
            ``,
            `    </template>`,
            `}`,
            ``,
          ]),
        },
      },
      templates: {
        'application.hbs': normalizeFile([
          `<header>`,
          `  <NavigationMenu />`,
          `</header>`,
          ``,
          `<main>`,
          `  {{outlet}}`,
          `</main>`,
        ]),
        'index.hbs': `<SelectLocale />`,
      },
    },
    tests: {
      integration: {
        components: {
          ui: {
            form: {
              'checkbox-test.ts': '',
              'field-test.ts': '',
              'information-test.ts': '',
              'input-test.gjs': '',
              'number-test.gts': '',
              'select-test.gts': '',
              'textarea-test.js': '',
            },
            'form-test.ts': '',
            'page-test.gjs': '',
          },
          'navigation-menu-test.js': '',
          'select-locale-test.js': '',
        },
      },
    },
    'package.json': JSON.stringify({
      name: 'my-v1-app-nested',
      version: '1.0.0',
      devDependencies: {
        '@embroider/webpack': '^4.1.1',
        'ember-source': '~6.7.0',
      },
    }),
  };

  loadFixture(inputProject, options);

  const entities = findEntities(options);

  updateComponents(packages, entities);

  assertFixture(outputProject, options);
});
