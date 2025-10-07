import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { findEntities, updateRoutes } from '../../../src/steps/index.js';
import {
  inputProject,
  options,
  packages,
} from '../../helpers/shared-test-setups/my-v1-addon.js';

test('steps | update-routes > v1-addon', function () {
  const outputProject = {
    addon: {
      components: {
        'navigation-menu.d.ts': '',
        'navigation-menu.hbs': '',
        'navigation-menu.js': [
          `import templateOnlyComponent from '@ember/component/template-only';`,
          ``,
          `const NavigationMenu = templateOnlyComponent();`,
          ``,
          `export default NavigationMenu;`,
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
              `export default class SelectLocale extends Component {}`,
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

  loadFixture(inputProject, options);

  const entities = findEntities(options);

  updateRoutes(packages, entities);

  assertFixture(outputProject, options);
});
