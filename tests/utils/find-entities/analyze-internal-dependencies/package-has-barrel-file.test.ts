import { normalize } from 'node:path';

import { assert, createFile, loadFixture, test } from '@codemod-utils/tests';

import { analyzeInternalDependencies } from '../../../../src/utils/find-entities/index.js';
import {
  codemodOptions,
  options,
} from '../../../helpers/shared-test-setups/my-monorepo.js';

test('utils | find-entities | analyze-internal-dependencies > package has barrel file', function () {
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
          'index.ts': createFile([
            `export { default as ComponentFromV2Addon } from './components/component-from-v2-addon.ts';`,
            `export { default as SelectLocale } from './components/select-locale.ts';`,
            ``,
          ]),
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
          'index.ts': createFile([
            `export { default as formatDate } from './helpers/format-date';`,
            `export { default as formatDateRange } from './helpers/format-date-range';`,
            `export { default as formatList } from './helpers/format-list';`,
            `export { default as formatMessage } from './helpers/format-message';`,
            `export { default as formatNumber } from './helpers/format-number';`,
            `export { default as formatRelative } from './helpers/format-relative';`,
            `export { default as formatRelativeTime } from './helpers/format-relative-time';`,
            `export { default as formatTime } from './helpers/format-time';`,
            `export { default as t } from './helpers/t';`,
            `export type { Formats, default as IntlService } from './services/intl';`,
            ``,
          ]),
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
                  filePath: normalize('addon/helpers/format-date.ts'),
                  filePathAlias: normalize('.'),
                  isDefaultExport: false,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                'format-date-range',
                {
                  filePath: normalize('addon/helpers/format-date-range.ts'),
                  filePathAlias: normalize('.'),
                  isDefaultExport: false,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                'format-list',
                {
                  filePath: normalize('addon/helpers/format-list.ts'),
                  filePathAlias: normalize('.'),
                  isDefaultExport: false,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                'format-message',
                {
                  filePath: normalize('addon/helpers/format-message.ts'),
                  filePathAlias: normalize('.'),
                  isDefaultExport: false,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                'format-number',
                {
                  filePath: normalize('addon/helpers/format-number.ts'),
                  filePathAlias: normalize('.'),
                  isDefaultExport: false,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                'format-relative',
                {
                  filePath: normalize('addon/helpers/format-relative.ts'),
                  filePathAlias: normalize('.'),
                  isDefaultExport: false,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                'format-relative-time',
                {
                  filePath: normalize('addon/helpers/format-relative-time.ts'),
                  filePathAlias: normalize('.'),
                  isDefaultExport: false,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                'format-time',
                {
                  filePath: normalize('addon/helpers/format-time.ts'),
                  filePathAlias: normalize('.'),
                  isDefaultExport: false,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                't',
                {
                  filePath: normalize('addon/helpers/t.ts'),
                  filePathAlias: normalize('.'),
                  isDefaultExport: false,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
            ]),
            modifiers: new Map(),
          },
          packageRoot: normalize('tmp/my-monorepo/packages/ember-intl'),
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
                  filePath: normalize(
                    'src/components/component-from-v2-addon.ts',
                  ),
                  filePathAlias: normalize(
                    'components/component-from-v2-addon',
                  ),
                  isDefaultExport: true,
                  isTypeScript: true,
                  packageName: 'my-v2-addon',
                },
              ],
              [
                'select-locale',
                {
                  filePath: normalize('src/components/select-locale.ts'),
                  filePathAlias: normalize('components/select-locale'),
                  isDefaultExport: true,
                  isTypeScript: true,
                  packageName: 'my-v2-addon',
                },
              ],
            ]),
            helpers: new Map(),
            modifiers: new Map(),
          },
          packageRoot: normalize('tmp/my-monorepo/docs/my-v2-addon'),
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
                  filePath: normalize('app/components/component-from-app.gts'),
                  filePathAlias: normalize('components/component-from-app'),
                  isDefaultExport: true,
                  isTypeScript: true,
                  packageName: 'my-v2-app',
                },
              ],
              [
                'translation-with-arguments',
                {
                  filePath: normalize(
                    'app/components/translation-with-arguments.gts',
                  ),
                  filePathAlias: normalize(
                    'components/translation-with-arguments',
                  ),
                  isDefaultExport: true,
                  isTypeScript: true,
                  packageName: 'my-v2-app',
                },
              ],
            ]),
            helpers: new Map(),
            modifiers: new Map(),
          },
          packageRoot: normalize('tmp/my-monorepo/docs/my-v2-app'),
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
                  filePath: normalize('app/components/lazy-hello.ts'),
                  filePathAlias: normalize('components/lazy-hello'),
                  isDefaultExport: true,
                  isTypeScript: true,
                  packageName: 'test-app-for-ember-intl',
                },
              ],
            ]),
            helpers: new Map(),
            modifiers: new Map(),
          },
          packageRoot: normalize('tmp/my-monorepo/tests/ember-intl'),
          packageType: 'v1-app',
        },
      ],
    ]),
  );
});
