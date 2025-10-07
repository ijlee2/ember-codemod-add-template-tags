import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { findEntities, updateTests } from '../../../src/steps/index.js';
import {
  inputProject,
  options,
  packages,
} from '../../helpers/shared-test-setups/my-v1-app-nested.js';

test('steps | update-tests > v1-app-nested', function () {
  const outputProject = {
    app: {
      components: {
        ui: {
          form: {
            checkbox: {
              'index.hbs': ``,
              'index.ts': [
                `import Component from '@glimmer/component';`,
                ``,
                `interface UiFormCheckboxSignature {}`,
                ``,
                `export default class UiFormCheckbox extends Component<UiFormCheckboxSignature> {}`,
                ``,
                `declare module '@glint/environment-ember-loose/registry' {`,
                `  export default interface Registry {`,
                `    'Ui::Form::Checkbox': typeof UiFormCheckbox;`,
                `    'ui/form/checkbox': typeof UiFormCheckbox;`,
                `  }`,
                `}`,
                ``,
              ].join('\n'),
            },
            field: {
              'index.hbs': ``,
              'index.ts': [
                `import Component from '@glimmer/component';`,
                ``,
                `interface UiFormFieldSignature {}`,
                ``,
                `export default class UiFormField extends Component<UiFormFieldSignature> {}`,
                ``,
              ].join('\n'),
            },
            information: {
              'index.hbs': ``,
              'index.ts': [
                `import templateOnlyComponent from '@ember/component/template-only';`,
                ``,
                `interface UiFormInformationSignature {}`,
                ``,
                `const UiFormInformation = templateOnlyComponent<UiFormInformationSignature>();`,
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
              ].join('\n'),
            },
            input: {
              'index.hbs': ``,
              'index.js': [
                `import Component from '@glimmer/component';`,
                ``,
                `export default class UiFormInput extends Component {}`,
                ``,
              ].join('\n'),
            },
            number: {
              'index.gts': ``,
            },
            select: {
              'index.hbs': ``,
              'index.ts': [
                `import Component from '@glimmer/component';`,
                ``,
                `interface UiFormSelectSignature {}`,
                ``,
                `export default class UiFormSelect extends Component<UiFormSelectSignature> {}`,
                ``,
              ].join('\n'),
            },
            textarea: {
              'index.gjs': ``,
            },
            'index.hbs': ``,
            'index.ts': [
              `import Component from '@glimmer/component';`,
              ``,
              `interface UiFormSignature {}`,
              ``,
              `export default class UiForm extends Component<UiFormSignature> {}`,
              ``,
            ].join('\n'),
          },
          page: {
            'index.hbs': ``,
            'index.js': [
              `import templateOnlyComponent from '@ember/component/template-only';`,
              ``,
              `const UiPage = templateOnlyComponent();`,
              ``,
              `export default UiPage;`,
              ``,
            ].join('\n'),
          },
        },
        'navigation-menu': {
          'index.hbs': '',
        },
        'select-locale': {
          'index.hbs': '',
          'index.js': [
            `import Component from '@glimmer/component';`,
            ``,
            `export default class SelectLocale extends Component {}`,
            ``,
          ].join('\n'),
        },
      },
      templates: {
        'application.hbs': [
          `<header>`,
          `  <NavigationMenu />`,
          `</header>`,
          ``,
          `<main>`,
          `  {{outlet}}`,
          `</main>`,
        ].join('\n'),
        'index.hbs': `<SelectLocale />`,
      },
    },
    tests: {
      integration: {
        components: {
          ui: {
            form: {
              'checkbox-test.gts': '',
              'field-test.gts': '',
              'information-test.gts': '',
              'input-test.gjs': '',
              'number-test.gts': '',
              'select-test.gts': '',
              'textarea-test.gjs': '',
            },
            'form-test.gts': '',
            'page-test.gjs': '',
          },
          'navigation-menu-test.gjs': '',
          'select-locale-test.gjs': '',
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

  updateTests(packages, entities);

  assertFixture(outputProject, options);
});
