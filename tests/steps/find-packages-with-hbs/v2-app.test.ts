import { assert, loadFixture, test } from '@codemod-utils/tests';

import { findPackagesWithHBS } from '../../../src/steps/index.js';
import { options } from '../../helpers/mocks/index.js';

test('steps | find-packages-with-hbs > v2-app', function () {
  const inputProject = {
    'my-v2-app': {
      app: {
        components: {
          'navigation-menu.hbs': '',
          'navigation-menu.ts': `import templateOnlyComponent from '@ember/component/template-only';`,
          'select-locale.hbs': '',
          'select-locale.ts': `import Component from '@glimmer/component';`,
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
            'select-locale-test.ts': '',
          },
        },
      },
      'package.json': JSON.stringify({
        name: 'my-v2-app',
        version: '1.0.0',
        devDependencies: {
          '@embroider/vite': '^1.2.0',
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
        'my-v2-app',
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
              'tests/integration/components/navigation-menu-test.ts',
              'tests/integration/components/select-locale-test.ts',
            ],
          },
          filesWithTemplateTag: {
            components: [],
            routes: [],
            tests: [],
          },
          hasEmberRouteTemplate: false,
          isEmberSourceRecent: true,
          packageRoot: 'tmp/my-monorepo/my-v2-app',
          packageType: 'v2-app',
        },
      ],
    ]),
  );
});
