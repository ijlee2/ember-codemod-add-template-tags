import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeInternalDependencies } from '../../../../src/utils/find-entities/index.js';
import { codemodOptions, options } from '../../../helpers/mocks/index.js';

test('utils | find-entities | analyze-internal-dependencies > entities is empty', function () {
  const inputProject = {
    docs: {
      'my-v2-addon': {
        src: {},
        'package.json': JSON.stringify({
          name: 'my-v2-addon',
          version: '3.0.0',
          keywords: ['ember-addon'],
          devDependencies: {
            'ember-intl': 'workspace:*',
            'ember-source': '~6.7.0',
          },
          'ember-addon': {
            'app-js': {},
            main: 'addon-main.cjs',
            type: 'addon',
            version: 2,
          },
        }),
      },
      'my-v2-app': {
        app: {},
        'package.json': JSON.stringify({
          name: 'my-v2-app',
          version: '1.0.5',
          devDependencies: {
            '@embroider/vite': '^1.2.0',
            'ember-intl': 'workspace:*',
            'ember-source': '~6.7.0',
          },
        }),
      },
    },
    packages: {
      'ember-intl': {
        addon: {
          services: {
            'intl.ts': '',
          },
        },
        'package.json': JSON.stringify({
          name: 'ember-intl',
          version: '7.3.1',
          keywords: ['ember-addon'],
          'ember-addon': {
            configPath: 'tests/dummy/config',
            demoURL: 'https://ember-intl.github.io/ember-intl/',
          },
        }),
      },
    },
    tests: {
      'ember-intl': {
        app: {},
        'package.json': JSON.stringify({
          name: 'test-app-for-ember-intl',
          version: '1.5.1',
          devDependencies: {
            'ember-intl': 'workspace:*',
            'ember-source': '~6.7.0',
          },
        }),
      },
      'ember-intl-node': {
        'package.json': JSON.stringify({
          name: 'test-ember-intl-node',
          version: '1.2.26',
          devDependencies: {
            'ember-intl': 'workspace:*',
          },
        }),
      },
    },
  };

  loadFixture(inputProject, codemodOptions);

  const internalDependencies = analyzeInternalDependencies(options);

  assert.deepStrictEqual(internalDependencies, new Map());
});
