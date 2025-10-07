import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

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
              'index.gts': [
                `import Component from '@glimmer/component';`,
                ``,
                `interface UiFormCheckboxSignature {}`,
                ``,
                `export default class UiFormCheckboxComponent extends Component<UiFormCheckboxSignature> {`,
                `    <template>`,
                ``,
                `    </template>`,
                `}`,
                ``,
              ].join('\n'),
            },
            field: {
              'index.gts': [
                `import Component from '@glimmer/component';`,
                ``,
                `interface UiFormFieldSignature {}`,
                ``,
                `export default class UiFormFieldComponent extends Component<UiFormFieldSignature> {`,
                `    <template>`,
                ``,
                `    </template>`,
                `}`,
                ``,
              ].join('\n'),
            },
            information: {
              'index.gts': [
                `import type { TOC } from '@ember/component/template-only';`,
                ``,
                `interface UiFormInformationSignature {}`,
                ``,
                `const UiFormInformationComponent = <template>`,
                ``,
                `</template> satisfies TOC<UiFormInformationSignature>;`,
                ``,
                `export default UiFormInformationComponent;`,
                ``,
              ].join('\n'),
            },
            input: {
              'index.gjs': [
                `import Component from '@glimmer/component';`,
                ``,
                `export default class UiFormInputComponent extends Component {`,
                `    <template>`,
                ``,
                `    </template>`,
                `}`,
                ``,
              ].join('\n'),
            },
            number: {
              'index.gts': ``,
            },
            select: {
              'index.gts': [
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
              ].join('\n'),
            },
            textarea: {
              'index.gjs': ``,
            },
            'index.gts': [
              `import Component from '@glimmer/component';`,
              ``,
              `interface UiFormSignature {}`,
              ``,
              `export default class UiFormComponent extends Component<UiFormSignature> {`,
              `    <template>`,
              ``,
              `    </template>`,
              `}`,
              ``,
            ].join('\n'),
          },
          page: {
            'index.gjs': [
              `const UiPageComponent = <template>`,
              ``,
              `</template>;`,
              ``,
              `export default UiPageComponent;`,
              ``,
            ].join('\n'),
          },
        },
        'navigation-menu': {
          'index.gjs': [`<template>`, ``, `</template>`, ``].join('\n'),
        },
        'select-locale': {
          'index.gjs': [
            `import Component from '@glimmer/component';`,
            ``,
            `export default class SelectLocaleComponent extends Component {`,
            `    <template>`,
            ``,
            `    </template>`,
            `}`,
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
