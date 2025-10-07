import type {
  CodemodOptions,
  Options,
  Packages,
} from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  componentStructure: 'flat',
  convert: new Set(['components', 'routes', 'tests']),
  folder: '',
  projectRoot: 'tmp/my-v1-addon',
};

const inputProject = {
  addon: {
    components: {
      'navigation-menu.d.ts': '',
      'navigation-menu.hbs': '',
      'navigation-menu.js': [
        `import templateOnlyComponent from '@ember/component/template-only';`,
        ``,
        `const NavigationMenuComponent = templateOnlyComponent();`,
        ``,
        `export default NavigationMenuComponent;`,
        ``,
      ].join('\n'),
    },
  },
  tests: {
    dummy: {
      app: {
        components: {
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
            'navigation-menu-test.ts': '',
            'select-locale-test.js': '',
          },
        },
      },
    },
  },
  'package.json': JSON.stringify({
    name: 'my-v1-addon',
    version: '1.0.0',
    keywords: ['ember-addon'],
    devDependencies: {
      'ember-route-template': '^4.0.0',
      'ember-source': '~5.12.0',
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
  projectRoot: 'tmp/my-v1-addon',
};

const packages: Packages = new Map([
  [
    'my-v1-addon',
    {
      filesWithHBS: {
        components: ['addon/components/navigation-menu.hbs'],
        routes: [],
        tests: [],
      },
      filesWithTemplateTag: {
        components: [],
        routes: [],
        tests: [],
      },
      hasEmberRouteTemplate: true,
      packageRoot: 'tmp/my-v1-addon',
      packageType: 'v1-addon',
    },
  ],
]);

export { codemodOptions, inputProject, options, packages };
