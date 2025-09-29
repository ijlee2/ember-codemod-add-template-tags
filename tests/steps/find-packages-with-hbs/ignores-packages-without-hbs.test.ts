import { assert, loadFixture, test } from '@codemod-utils/tests';

import { findPackagesWithHBS } from '../../../src/steps/index.js';
import { options } from '../../helpers/mocks/index.js';

test('steps | find-packages-with-hbs > ignores packages without hbs', function () {
  const inputProject = {
    'my-v1-app': {
      app: {
        components: {
          'navigation-menu.gjs': ``,
          'select-locale.gts': ``,
        },
        templates: {
          'application.gjs': ``,
          'index.gts': ``,
        },
      },
      tests: {
        integration: {
          components: {
            'navigation-menu-test.gjs': '',
            'select-locale-test.gts': '',
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

  assert.deepStrictEqual(packages, new Map());
});
