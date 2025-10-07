import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { findEntities, updateRoutes } from '../../../src/steps/index.js';
import {
  inputProject,
  options,
  packages,
} from '../../helpers/shared-test-setups/my-v2-app.js';

test('steps | update-routes > v2-app', function () {
  const outputProject = {
    app: {
      components: {
        ui: {
          form: {
            'checkbox.hbs': ``,
            'checkbox.ts': [
              `import Component from '@glimmer/component';`,
              ``,
              `interface UiFormCheckboxSignature {}`,
              ``,
              `export default class UiFormCheckboxComponent extends Component<UiFormCheckboxSignature> {}`,
              ``,
              `declare module '@glint/environment-ember-loose/registry' {`,
              `  export default interface Registry {`,
              `    'Ui::Form::Checkbox': typeof UiFormCheckboxComponent;`,
              `    'ui/form/checkbox': typeof UiFormCheckboxComponent;`,
              `  }`,
              `}`,
              ``,
            ].join('\n'),
            'field.hbs': ``,
            'field.ts': [
              `import Component from '@glimmer/component';`,
              ``,
              `interface UiFormFieldSignature {}`,
              ``,
              `export default class UiFormFieldComponent extends Component<UiFormFieldSignature> {}`,
              ``,
            ].join('\n'),
            'information.hbs': ``,
            'information.ts': [
              `import templateOnlyComponent from '@ember/component/template-only';`,
              ``,
              `interface UiFormInformationSignature {}`,
              ``,
              `const UiFormInformationComponent = templateOnlyComponent<UiFormInformationSignature>();`,
              ``,
              `export default UiFormInformationComponent;`,
              ``,
              `declare module '@glint/environment-ember-loose/registry' {`,
              `  export default interface Registry {`,
              `    'Ui::Form::Information': typeof UiFormInformationComponent;`,
              `    'ui/form/information': typeof UiFormInformationComponent;`,
              `  }`,
              `}`,
              ``,
            ].join('\n'),
            'input.hbs': ``,
            'input.js': [
              `import Component from '@glimmer/component';`,
              ``,
              `export default class UiFormInputComponent extends Component {}`,
              ``,
            ].join('\n'),
            'number.gts': ``,
            'select.hbs': ``,
            'select.ts': [
              `import Component from '@glimmer/component';`,
              ``,
              `interface UiFormSelectSignature {}`,
              ``,
              `export default class UiFormSelect extends Component<UiFormSelectSignature> {}`,
              ``,
            ].join('\n'),
            'textarea.gjs': ``,
          },
          'form.hbs': ``,
          'form.ts': [
            `import Component from '@glimmer/component';`,
            ``,
            `interface UiFormSignature {}`,
            ``,
            `export default class UiFormComponent extends Component<UiFormSignature> {}`,
            ``,
          ].join('\n'),
          'page.hbs': ``,
          'page.js': [
            `import templateOnlyComponent from '@ember/component/template-only';`,
            ``,
            `const UiPageComponent = templateOnlyComponent();`,
            ``,
            `export default UiPageComponent;`,
            ``,
          ].join('\n'),
        },
        'navigation-menu.hbs': '',
        'select-locale.hbs': '',
        'select-locale.js': [
          `import Component from '@glimmer/component';`,
          ``,
          `export default class SelectLocaleComponent extends Component {}`,
          ``,
        ].join('\n'),
      },
      templates: {
        'application.gjs': [
          `import NavigationMenu from 'my-v2-app/components/navigation-menu';`,
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
        ].join('\n'),
        'index.gjs': [
          `import SelectLocale from 'my-v2-app/components/select-locale';`,
          ``,
          `<template>`,
          `<SelectLocale />`,
          `</template>`,
          ``,
        ].join('\n'),
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
      name: 'my-v2-app',
      version: '1.0.0',
      devDependencies: {
        '@embroider/vite': '^1.2.0',
        'ember-source': '~6.7.0',
      },
    }),
  };

  loadFixture(inputProject, options);

  const entities = findEntities(options);

  updateRoutes(packages, entities);

  assertFixture(outputProject, options);
});
