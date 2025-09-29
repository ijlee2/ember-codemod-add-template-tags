import { assert, loadFixture, test } from '@codemod-utils/tests';

import { findPackagesWithHBS } from '../../../src/steps/index.js';
import { options } from '../../helpers/mocks/index.js';

test('steps | find-packages-with-hbs > v1-app', function () {
  const inputProject = {
    'my-v1-app': {
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
        name: 'my-v1-app',
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

  assert.deepStrictEqual(
    packages,
    new Map([
      [
        'my-v1-app',
        {
          filesWithHBS: {
            components: [
              'app/components/navigation-menu.hbs',
              'app/components/select-locale.hbs',
            ],
            routes: [
              'app/templates/application.hbs',
              'app/templates/index.hbs',
            ],
            tests: [
              'tests/integration/components/navigation-menu-test.js',
              'tests/integration/components/select-locale-test.js',
            ],
          },
          filesWithTemplateTag: {
            components: [],
            routes: [],
            tests: [],
          },
          hasEmberRouteTemplate: false,
          isEmberSourceRecent: true,
          packageRoot: 'tmp/my-monorepo/my-v1-app',
          packageType: 'v1-app',
        },
      ],
    ]),
  );
});
