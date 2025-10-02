import { assert, loadFixture, test } from '@codemod-utils/tests';

import { findPackagesWithHBS } from '../../../src/steps/index.js';
import { options } from '../../helpers/mocks/index.js';

test('steps | find-packages-with-hbs > v1-app', function () {
  const inputProject = {
    'my-v1-app': {
      app: {
        components: {
          ui: {
            form: {
              'checkbox.hbs': ``,
              'checkbox.ts': `import Component from '@glimmer/component';`,
              'field.hbs': ``,
              'field.ts': `import Component from '@glimmer/component';`,
              'information.hbs': ``,
              'information.ts': `import templateOnlyComponent from '@ember/component/template-only-component';`,
              'input.hbs': ``,
              'input.js': `import Component from '@glimmer/component';`,
              'number.gts': ``,
              'select.hbs': ``,
              'select.ts': `import Component from '@glimmer/component';`,
              'textarea.gjs': ``,
            },
            'form.hbs': ``,
            'form.ts': `import Component from '@glimmer/component';`,
            'page.hbs': ``,
            'page.js': `import templateOnlyComponent from '@ember/component/template-only';`,
          },
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
            ui: {
              form: {
                'checkbox-test.ts': '',
                'field-test.ts': '',
                'information-test.ts': '',
                'input-test.gjs': '',
                'number-test.gts': '',
                'select-test.gts': '',
                'textarea-test.js': '',
              },
              'form-test.ts': '',
              'page-test.gjs': '',
            },
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
              'app/components/ui/form.hbs',
              'app/components/ui/form/checkbox.hbs',
              'app/components/ui/form/field.hbs',
              'app/components/ui/form/input.hbs',
              'app/components/ui/form/select.hbs',
              'app/components/ui/page.hbs',
            ],
            routes: [
              'app/templates/application.hbs',
              'app/templates/index.hbs',
            ],
            tests: [
              'tests/integration/components/navigation-menu-test.js',
              'tests/integration/components/select-locale-test.js',
              'tests/integration/components/ui/form-test.ts',
              'tests/integration/components/ui/form/checkbox-test.ts',
              'tests/integration/components/ui/form/field-test.ts',
              'tests/integration/components/ui/form/information-test.ts',
              'tests/integration/components/ui/form/textarea-test.js',
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
