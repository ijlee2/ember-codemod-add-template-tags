import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';

import { findPackagesWithHBS } from '../../../src/steps/index.js';
import { options } from '../../helpers/shared-test-setups/my-v1-app.js';

test('steps | find-packages-with-hbs > ignores packages without name', function () {
  const inputProject = {
    'my-v1-app': {
      app: {
        components: {
          'navigation-menu.hbs': '',
          'select-locale.hbs': '',
          'select-locale.js': `import Component from '@glimmer/component';`,
        },
        templates: {
          'application.hbs': normalizeFile([
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
            'navigation-menu-test.js': '',
            'select-locale-test.js': '',
          },
        },
      },
      'package.json': JSON.stringify({
        name: '',
        version: '1.0.0',
        devDependencies: {
          '@embroider/webpack': '^4.1.1',
          'ember-source': '~6.7.0',
        },
      }),
    },
  };

  loadFixture(inputProject, options);

  const packages = findPackagesWithHBS(options);

  assert.deepStrictEqual(packages, new Map());
});
