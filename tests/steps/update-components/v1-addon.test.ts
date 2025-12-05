import {
  assertFixture,
  createFile,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { findEntities, updateComponents } from '../../../src/steps/index.js';
import {
  inputProject,
  options,
  packages,
} from '../../helpers/shared-test-setups/my-v1-addon.js';

test('steps | update-components > v1-addon', function () {
  const outputProject = {
    addon: {
      components: {
        'navigation-menu.d.ts': '',
        'navigation-menu.gjs': createFile([
          `const NavigationMenu = <template>`,
          ``,
          `</template>;`,
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

  loadFixture(inputProject, options);

  const entities = findEntities(options);

  updateComponents(packages, entities);

  assertFixture(outputProject, options);
});
