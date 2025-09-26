import { assert, loadFixture, test } from '@codemod-utils/tests';

import type { CodemodOptions, Options } from '../../../../src/types/index.js';
import { analyzeInternalDependencies } from '../../../../src/utils/find-entities/index.js';

test('utils | find-entities | analyze-internal-dependencies > base case', function () {
  const inputProject = {
    docs: {
      'my-v2-addon': {
        src: {
          components: {
            'component-from-v2-addon.hbs': '',
            'component-from-v2-addon.ts': '',
            'select-locale.hbs': '',
            'select-locale.ts': '',
          },
        },
        'package.json': JSON.stringify({
          name: 'my-v2-addon',
          version: '3.0.0',
          keywords: ['ember-addon'],
          devDependencies: {
            'ember-intl': 'workspace:*',
            'ember-source': '~6.7.0',
          },
          'ember-addon': {
            'app-js': {
              './components/component-from-v2-addon.js':
                './dist/_app_/components/component-from-v2-addon.js',
              './components/select-locale.js':
                './dist/_app_/components/select-locale.js',
            },
            main: 'addon-main.cjs',
            type: 'addon',
            version: 2,
          },
        }),
      },
      'my-v2-app': {
        app: {
          components: {
            'component-from-app.gts': '',
            'translation-with-arguments.gts': '',
          },
        },
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
          helpers: {
            'format-date-range.ts': '',
            'format-date.ts': '',
            'format-list.ts': '',
            'format-message.ts': '',
            'format-number.ts': '',
            'format-relative-time.ts': '',
            'format-relative.ts': '',
            'format-time.ts': '',
            't.ts': '',
          },
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
        app: {
          components: {
            'lazy-hello.hbs': '',
            'lazy-hello.ts': '',
          },
        },
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

  const internalDependencies = analyzeInternalDependencies(options);

  assert.deepStrictEqual(
    internalDependencies,
    new Map([
      [
        'ember-intl',
        {
          entities: {
            components: new Map(),
            helpers: new Map([
              [
                'format-date',
                {
                  filePath: 'addon/helpers/format-date.ts',
                  filePathAlias: 'helpers/format-date',
                  isDefaultExport: true,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                'format-date-range',
                {
                  filePath: 'addon/helpers/format-date-range.ts',
                  filePathAlias: 'helpers/format-date-range',
                  isDefaultExport: true,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                'format-list',
                {
                  filePath: 'addon/helpers/format-list.ts',
                  filePathAlias: 'helpers/format-list',
                  isDefaultExport: true,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                'format-message',
                {
                  filePath: 'addon/helpers/format-message.ts',
                  filePathAlias: 'helpers/format-message',
                  isDefaultExport: true,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                'format-number',
                {
                  filePath: 'addon/helpers/format-number.ts',
                  filePathAlias: 'helpers/format-number',
                  isDefaultExport: true,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                'format-relative',
                {
                  filePath: 'addon/helpers/format-relative.ts',
                  filePathAlias: 'helpers/format-relative',
                  isDefaultExport: true,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                'format-relative-time',
                {
                  filePath: 'addon/helpers/format-relative-time.ts',
                  filePathAlias: 'helpers/format-relative-time',
                  isDefaultExport: true,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                'format-time',
                {
                  filePath: 'addon/helpers/format-time.ts',
                  filePathAlias: 'helpers/format-time',
                  isDefaultExport: true,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                't',
                {
                  filePath: 'addon/helpers/t.ts',
                  filePathAlias: 'helpers/t',
                  isDefaultExport: true,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
            ]),
            modifiers: new Map(),
          },
          packageRoot: 'tmp/my-monorepo/packages/ember-intl',
          packageType: 'v1-addon',
        },
      ],
      [
        'my-v2-addon',
        {
          entities: {
            components: new Map([
              [
                'component-from-v2-addon',
                {
                  filePath: 'src/components/component-from-v2-addon.ts',
                  filePathAlias: 'components/component-from-v2-addon',
                  isDefaultExport: true,
                  isTypeScript: true,
                  packageName: 'my-v2-addon',
                },
              ],
              [
                'select-locale',
                {
                  filePath: 'src/components/select-locale.ts',
                  filePathAlias: 'components/select-locale',
                  isDefaultExport: true,
                  isTypeScript: true,
                  packageName: 'my-v2-addon',
                },
              ],
            ]),
            helpers: new Map(),
            modifiers: new Map(),
          },
          packageRoot: 'tmp/my-monorepo/docs/my-v2-addon',
          packageType: 'v2-addon',
        },
      ],
      [
        'my-v2-app',
        {
          entities: {
            components: new Map([
              [
                'component-from-app',
                {
                  filePath: 'app/components/component-from-app.gts',
                  filePathAlias: 'components/component-from-app',
                  isDefaultExport: true,
                  isTypeScript: true,
                  packageName: 'my-v2-app',
                },
              ],
              [
                'translation-with-arguments',
                {
                  filePath: 'app/components/translation-with-arguments.gts',
                  filePathAlias: 'components/translation-with-arguments',
                  isDefaultExport: true,
                  isTypeScript: true,
                  packageName: 'my-v2-app',
                },
              ],
            ]),
            helpers: new Map(),
            modifiers: new Map(),
          },
          packageRoot: 'tmp/my-monorepo/docs/my-v2-app',
          packageType: 'v2-app',
        },
      ],
      [
        'test-app-for-ember-intl',
        {
          entities: {
            components: new Map([
              [
                'lazy-hello',
                {
                  filePath: 'app/components/lazy-hello.ts',
                  filePathAlias: 'components/lazy-hello',
                  isDefaultExport: true,
                  isTypeScript: true,
                  packageName: 'test-app-for-ember-intl',
                },
              ],
            ]),
            helpers: new Map(),
            modifiers: new Map(),
          },
          packageRoot: 'tmp/my-monorepo/tests/ember-intl',
          packageType: 'v1-app',
        },
      ],
    ]),
  );
});
