import { assert, loadFixture, test } from '@codemod-utils/tests';

import { findPackagesWithHBS } from '../../../src/steps/index.js';
import { options } from '../../helpers/mocks/index.js';

test('steps | find-packages-with-hbs > v1-addon', function () {
  const inputProject = {
    'my-v1-addon': {
      addon: {
        components: {
          'navigation-menu.d.ts': '',
          'navigation-menu.hbs': '',
          'navigation-menu.js': `import templateOnlyComponent from '@ember/component/template-only';`,
        },
      },
      tests: {
        dummy: {
          app: {
            components: {
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

  loadFixture(inputProject, options);

  const packages = findPackagesWithHBS(options);

  assert.deepStrictEqual(
    packages,
    new Map([
      [
        'my-v1-addon',
        {
          filesWithHBS: {
            components: [
              'addon/components/navigation-menu.hbs',
              'tests/dummy/app/components/select-locale.hbs',
            ],
            routes: [
              'tests/dummy/app/templates/application.hbs',
              'tests/dummy/app/templates/index.hbs',
            ],
            tests: [
              'tests/dummy/tests/integration/components/navigation-menu-test.ts',
              'tests/dummy/tests/integration/components/select-locale-test.js',
            ],
          },
          filesWithTemplateTag: {
            components: [],
            routes: [],
            tests: [],
          },
          hasEmberRouteTemplate: true,
          isEmberSourceRecent: false,
          packageRoot: 'tmp/my-monorepo/my-v1-addon',
          packageType: 'v1-addon',
        },
      ],
    ]),
  );
});
