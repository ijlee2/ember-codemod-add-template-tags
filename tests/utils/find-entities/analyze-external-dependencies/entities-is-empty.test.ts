import { assert, loadFixture, test } from '@codemod-utils/tests';

import type { CodemodOptions, Options } from '../../../../src/types/index.js';
import { analyzeExternalDependencies } from '../../../../src/utils/find-entities/index.js';

test('utils | find-entities | analyze-external-dependencies > entities is empty', function () {
  const inputProject = {
    node_modules: {
      '.pnpm': {
        'ember-container-query@6.0.2': {
          node_modules: {
            'ember-container-query': {
              declarations: {},
              dist: {},
              'package.json': JSON.stringify({
                name: 'ember-container-query',
                version: '6.0.2',
                keywords: ['ember-addon'],
                'ember-addon': {
                  'app-js': {},
                  main: 'addon-main.cjs',
                  type: 'addon',
                  version: 2,
                },
              }),
            },
          },
        },
        'ember-intl@7.3.1': {
          node_modules: {
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
        },
        'type-css-modules@2.0.4': {
          node_modules: {
            'type-css-modules': {
              dist: {
                bin: {
                  'type-css-modules.js': '',
                },
                src: {
                  'index.js': '',
                },
              },
              'package.json': JSON.stringify({
                name: 'type-css-modules',
                version: '2.0.4',
              }),
            },
          },
        },
      },
    },
  };

  const codemodOptions: CodemodOptions = {
    componentStructure: 'flat',
    convert: new Set(['components', 'routes', 'tests']),
    projectRoot: 'tmp/my-monorepo',
  };

  const options: Options = {
    componentStructure: 'flat',
    convert: {
      components: true,
      routes: true,
      tests: true,
    },
    projectRoot: 'tmp/my-monorepo',
  };

  loadFixture(inputProject, codemodOptions);

  const externalDependencies = analyzeExternalDependencies(options);

  assert.deepStrictEqual(externalDependencies, new Map());
});
