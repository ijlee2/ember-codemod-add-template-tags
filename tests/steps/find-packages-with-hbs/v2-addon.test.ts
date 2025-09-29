import { assert, loadFixture, test } from '@codemod-utils/tests';

import { findPackagesWithHBS } from '../../../src/steps/index.js';
import { options } from '../../helpers/mocks/index.js';

test('steps | find-packages-with-hbs > v2-addon', function () {
  const inputProject = {
    'my-v2-addon': {
      src: {
        components: {
          'navigation-menu.hbs': '',
          'navigation-menu.ts': `import templateOnlyComponent from '@ember/component/template-only';`,
          'select-locale.hbs': '',
          'select-locale.ts': `import Component from '@glimmer/component';`,
        },
      },
      'package.json': JSON.stringify({
        name: 'my-v2-addon',
        version: '1.0.0',
        keywords: ['ember-addon'],
        devDependencies: {
          'ember-source': '^6.0.0',
        },
        'ember-addon': {
          version: 2,
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
        'my-v2-addon',
        {
          filesWithHBS: {
            components: [
              'src/components/navigation-menu.hbs',
              'src/components/select-locale.hbs',
            ],
            routes: [],
            tests: [],
          },
          filesWithTemplateTag: {
            components: [],
            routes: [],
            tests: [],
          },
          hasEmberRouteTemplate: false,
          isEmberSourceRecent: false,
          packageRoot: 'tmp/my-monorepo/my-v2-addon',
          packageType: 'v2-addon',
        },
      ],
    ]),
  );
});
