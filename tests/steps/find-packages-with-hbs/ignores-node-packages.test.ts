import { assert, loadFixture, test } from '@codemod-utils/tests';

import { findPackagesWithHBS } from '../../../src/steps/index.js';
import { options } from '../../helpers/mocks/index.js';

test('steps | find-packages-with-hbs > ignores node packages', function () {
  const inputProject = {
    'my-node-package': {
      app: {
        components: {
          'navigation-menu.hbs': '',
          'select-locale.hbs': '',
          'select-locale.js': `import Component from '@glimmer/component';`,
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
            'navigation-menu-test.js': '',
            'select-locale-test.js': '',
          },
        },
      },
      'package.json': JSON.stringify({
        name: 'my-node-package',
        version: '1.0.0',
      }),
    },
  };

  loadFixture(inputProject, options);

  const packages = findPackagesWithHBS(options);

  assert.deepStrictEqual(packages, new Map());
});
