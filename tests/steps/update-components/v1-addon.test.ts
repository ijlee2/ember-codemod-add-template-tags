import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { updateComponents } from '../../../src/steps/index.js';
import type { Packages } from '../../../src/types/index.js';
import { entities, options } from '../../helpers/mocks/index.js';

test('steps | update-components > v1-addon', function () {
  const inputProject = {
    'my-v1-addon': {
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
    },
  };

  const outputProject = {
    'my-v1-addon': {
      addon: {
        components: {
          'navigation-menu.d.ts': '',
          'navigation-menu.gjs': [
            `const NavigationMenuComponent = <template>`,
            ``,
            `</template>;`,
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
    },
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
        packageRoot: 'tmp/my-monorepo/my-v1-addon',
        packageType: 'v1-addon',
      },
    ],
  ]);

  loadFixture(inputProject, options);

  updateComponents(packages, entities);

  assertFixture(outputProject, options);
});
