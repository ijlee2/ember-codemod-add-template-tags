import { normalize } from 'node:path';

import { normalizeFile } from '@codemod-utils/tests';

import type {
  CodemodOptions,
  Options,
  Packages,
} from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  componentStructure: 'flat',
  convert: new Set(['components', 'routes', 'tests']),
  folder: '',
  projectRoot: 'tmp/my-v2-addon',
};

const inputProject = {
  src: {
    components: {
      'navigation-menu.hbs': '',
      'navigation-menu.ts': normalizeFile([
        `import templateOnlyComponent from '@ember/component/template-only';`,
        ``,
        `interface NavigationMenuSignature {}`,
        ``,
        `const NavigationMenu = templateOnlyComponent<NavigationMenuSignature>();`,
        ``,
        `export default NavigationMenu;`,
        ``,
      ]),
      'select-locale.hbs': '',
      'select-locale.ts': normalizeFile([
        `import Component from '@glimmer/component';`,
        ``,
        `interface SelectLocaleSignature {}`,
        ``,
        `export default class SelectLocale extends Component<SelectLocaleSignature> {}`,
        ``,
      ]),
    },
  },
  'package.json': JSON.stringify({
    name: 'my-v2-addon',
    version: '1.0.0',
    keywords: ['ember-addon'],
    devDependencies: {
      'ember-source': '^6.0.0',
    },
    'ember-addon': {
      version: 2,
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
  projectRoot: 'tmp/my-v2-addon',
};

const packages: Packages = new Map([
  [
    'my-v2-addon',
    {
      filesWithHBS: {
        components: [
          'src/components/navigation-menu.hbs',
          'src/components/select-locale.hbs',
        ].map(normalize),
        routes: [],
        tests: [],
      },
      filesWithTemplateTag: {
        components: [],
        routes: [],
        tests: [],
      },
      hasEmberRouteTemplate: false,
      packageRoot: 'tmp/my-v2-addon',
      packageType: 'v2-addon',
    },
  ],
]);

export { codemodOptions, inputProject, options, packages };
