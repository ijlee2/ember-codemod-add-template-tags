import {
  assertFixture,
  loadFixture,
  normalizeFile,
  test,
} from '@codemod-utils/tests';

import { findEntities, updateRoutes } from '../../../src/steps/index.js';
import {
  inputProject,
  options,
  packages,
} from '../../helpers/shared-test-setups/my-v1-app-nested.js';

test('steps | update-routes > v1-app-nested', function () {
  const outputProject = {
    app: {
      components: {
        ui: {
          form: {
            checkbox: {
              'index.hbs': ``,
              'index.ts': normalizeFile([
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
              ]),
            },
            field: {
              'index.hbs': ``,
              'index.ts': normalizeFile([
                `import Component from '@glimmer/component';`,
                ``,
                `interface UiFormFieldSignature {}`,
                ``,
                `export default class UiFormField extends Component<UiFormFieldSignature> {}`,
                ``,
              ]),
            },
            information: {
              'index.hbs': ``,
              'index.ts': normalizeFile([
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
              ]),
            },
            input: {
              'index.hbs': ``,
              'index.js': normalizeFile([
                `import Component from '@glimmer/component';`,
                ``,
                `export default class UiFormInput extends Component {}`,
                ``,
              ]),
            },
            number: {
              'index.gts': ``,
            },
            select: {
              'index.hbs': ``,
              'index.ts': normalizeFile([
                `import Component from '@glimmer/component';`,
                ``,
                `interface UiFormSelectSignature {}`,
                ``,
                `export default class UiFormSelect extends Component<UiFormSelectSignature> {}`,
                ``,
              ]),
            },
            textarea: {
              'index.gjs': ``,
            },
            'index.hbs': ``,
            'index.ts': normalizeFile([
              `import Component from '@glimmer/component';`,
              ``,
              `interface UiFormSignature {}`,
              ``,
              `export default class UiForm extends Component<UiFormSignature> {}`,
              ``,
            ]),
          },
          page: {
            'index.hbs': ``,
            'index.js': normalizeFile([
              `import templateOnlyComponent from '@ember/component/template-only';`,
              ``,
              `const UiPage = templateOnlyComponent();`,
              ``,
              `export default UiPage;`,
              ``,
            ]),
          },
        },
        'navigation-menu': {
          'index.hbs': '',
        },
        'select-locale': {
          'index.hbs': '',
          'index.js': normalizeFile([
            `import Component from '@glimmer/component';`,
            ``,
            `export default class SelectLocale extends Component {}`,
            ``,
          ]),
        },
      },
      templates: {
        'application.gjs': normalizeFile([
          `import NavigationMenu from 'my-v1-app-nested/components/navigation-menu/index';`,
          ``,
          `<template>`,
          `<header>`,
          `  <NavigationMenu />`,
          `</header>`,
          ``,
          `<main>`,
          `  {{outlet}}`,
          `</main>`,
          `</template>`,
          ``,
        ]),
        'index.gjs': normalizeFile([
          `import SelectLocale from 'my-v1-app-nested/components/select-locale/index';`,
          ``,
          `<template>`,
          `<SelectLocale />`,
          `</template>`,
          ``,
        ]),
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

  updateRoutes(packages, entities);

  assertFixture(outputProject, options);
});
