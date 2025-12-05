import { normalize } from 'node:path';

import { createFile } from '@codemod-utils/tests';

import type {
  CodemodOptions,
  Options,
  Packages,
} from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  componentStructure: 'nested',
  convert: new Set(['components', 'routes', 'tests']),
  folder: '',
  projectRoot: normalize('tmp/my-v1-app-nested'),
};

const inputProject = {
  app: {
    components: {
      ui: {
        form: {
          checkbox: {
            'index.hbs': ``,
            'index.ts': createFile([
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
            'index.ts': createFile([
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
            'index.ts': createFile([
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
            'index.js': createFile([
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
            'index.ts': createFile([
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
          'index.ts': createFile([
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
          'index.js': createFile([
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
        'index.js': createFile([
          `import Component from '@glimmer/component';`,
          ``,
          `export default class SelectLocale extends Component {}`,
          ``,
        ]),
      },
    },
    templates: {
      'application.hbs': createFile([
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

const options: Options = {
  componentStructure: 'nested',
  convert: {
    components: true,
    routes: true,
    tests: true,
  },
  folder: '',
  projectRoot: normalize('tmp/my-v1-app-nested'),
};

const packages: Packages = new Map([
  [
    'my-v1-app-nested',
    {
      filesWithHBS: {
        components: [
          'app/components/navigation-menu/index.hbs',
          'app/components/select-locale/index.hbs',
          'app/components/ui/form/checkbox/index.hbs',
          'app/components/ui/form/field/index.hbs',
          'app/components/ui/form/index.hbs',
          'app/components/ui/form/information/index.hbs',
          'app/components/ui/form/input/index.hbs',
          'app/components/ui/form/select/index.hbs',
          'app/components/ui/page/index.hbs',
        ].map(normalize),
        routes: [
          'app/templates/application.hbs',
          'app/templates/index.hbs',
        ].map(normalize),
        tests: [
          'tests/integration/components/navigation-menu-test.js',
          'tests/integration/components/select-locale-test.js',
          'tests/integration/components/ui/form-test.ts',
          'tests/integration/components/ui/form/checkbox-test.ts',
          'tests/integration/components/ui/form/field-test.ts',
          'tests/integration/components/ui/form/information-test.ts',
          'tests/integration/components/ui/form/textarea-test.js',
        ].map(normalize),
      },
      filesWithTemplateTag: {
        components: [],
        routes: [],
        tests: [],
      },
      hasEmberRouteTemplate: false,
      packageRoot: 'tmp/my-v1-app-nested',
      packageType: 'v1-app',
    },
  ],
]);

export { codemodOptions, inputProject, options, packages };
