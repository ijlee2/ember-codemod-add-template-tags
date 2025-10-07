import type {
  CodemodOptions,
  Options,
  Packages,
} from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  componentStructure: 'flat',
  convert: new Set(['components', 'routes', 'tests']),
  folder: '',
  projectRoot: 'tmp/my-v2-app',
};

const inputProject = {
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
    name: 'my-v2-app',
    version: '1.0.0',
    devDependencies: {
      '@embroider/vite': '^1.2.0',
      'ember-source': '~6.7.0',
    },
  }),
};

const options: Options = {
  componentStructure: 'flat',
  convert: {
    components: true,
    routes: true,
    tests: true,
  },
  folder: '',
  projectRoot: 'tmp/my-v2-app',
};

const packages: Packages = new Map([
  [
    'my-v2-app',
    {
      filesWithHBS: {
        components: [
          'app/components/navigation-menu.hbs',
          'app/components/select-locale.hbs',
          'app/components/ui/form.hbs',
          'app/components/ui/form/checkbox.hbs',
          'app/components/ui/form/field.hbs',
          'app/components/ui/form/information.hbs',
          'app/components/ui/form/input.hbs',
          'app/components/ui/form/select.hbs',
          'app/components/ui/page.hbs',
        ],
        routes: ['app/templates/application.hbs', 'app/templates/index.hbs'],
        tests: [
          'tests/integration/components/navigation-menu-test.js',
          'tests/integration/components/select-locale-test.js',
          'tests/integration/components/ui/form-test.ts',
          'tests/integration/components/ui/form/checkbox-test.ts',
          'tests/integration/components/ui/form/field-test.ts',
          'tests/integration/components/ui/form/information-test.ts',
          'tests/integration/components/ui/form/textarea-test.js',
        ],
      },
      filesWithTemplateTag: {
        components: [],
        routes: [],
        tests: [],
      },
      hasEmberRouteTemplate: false,
      packageRoot: 'tmp/my-v2-app',
      packageType: 'v2-app',
    },
  ],
]);

export { codemodOptions, inputProject, options, packages };
