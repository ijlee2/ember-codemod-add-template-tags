import { assert, loadFixture, test } from '@codemod-utils/tests';

import { findPackagesWithHBS } from '../../../src/steps/index.js';
import type { Options } from '../../../src/types/index.js';

test('steps | find-packages-with-hbs > component structure is nested', function () {
  const inputProject = {
    'my-v1-app': {
      app: {
        components: {
          ui: {
            form: {
              checkbox: {
                'index.hbs': ``,
                'index.ts': `import Component from '@glimmer/component';`,
              },
              field: {
                'index.hbs': ``,
                'index.ts': `import Component from '@glimmer/component';`,
              },
              information: {
                'index.hbs': ``,
                'index.ts': `import templateOnlyComponent from '@ember/component/template-only-component';`,
              },
              input: {
                'index.hbs': ``,
                'index.js': `import Component from '@glimmer/component';`,
              },
              number: {
                'index.gts': ``,
              },
              select: {
                'index.hbs': ``,
                'index.ts': `import Component from '@glimmer/component';`,
              },
              textarea: {
                'index.gjs': ``,
              },
              'index.hbs': ``,
              'index.ts': `import Component from '@glimmer/component';`,
            },
            page: {
              'index.hbs': ``,
              'index.js': `import templateOnlyComponent from '@ember/component/template-only';`,
            },
          },
          'navigation-menu': {
            'index.hbs': '',
          },
          'select-locale': {
            'index.hbs': '',
            'index.js': `import Component from '@glimmer/component';`,
          },
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

  const options: Options = {
    componentStructure: 'nested',
    convert: {
      components: true,
      routes: true,
      tests: true,
    },
    folder: '',
    projectRoot: 'tmp/my-monorepo',
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
              'app/components/navigation-menu/index.hbs',
              'app/components/select-locale/index.hbs',
              'app/components/ui/form/checkbox/index.hbs',
              'app/components/ui/form/field/index.hbs',
              'app/components/ui/form/index.hbs',
              'app/components/ui/form/input/index.hbs',
              'app/components/ui/form/select/index.hbs',
              'app/components/ui/page/index.hbs',
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
