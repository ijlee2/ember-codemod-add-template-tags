import { normalize } from 'node:path';

import { createFile } from '@codemod-utils/tests';

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
      'navigation-menu.js': createFile([
        `import templateOnlyComponent from '@ember/component/template-only';`,
        ``,
        `const NavigationMenu = templateOnlyComponent();`,
        ``,
        `export default NavigationMenu;`,
        ``,
      ]),
    },
  },
  tests: {
    dummy: {
      app: {
        components: {
          'select-locale.hbs': '',
          'select-locale.js': createFile([
            `import Component from '@glimmer/component';`,
            ``,
            `export default class SelectLocale extends Component {}`,
            ``,
          ]),
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
        components: ['addon/components/navigation-menu.hbs'].map(normalize),
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
