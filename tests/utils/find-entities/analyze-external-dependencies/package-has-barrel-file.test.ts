import { normalize } from 'node:path';

import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';

import { analyzeExternalDependencies } from '../../../../src/utils/find-entities/index.js';
import {
  codemodOptions,
  options,
} from '../../../helpers/shared-test-setups/my-monorepo.js';

test('utils | find-entities | analyze-external-dependencies > package has barrel file', function () {
  const inputProject = {
    node_modules: {
      '.pnpm': {
        'ember-container-query@6.0.2': {
          node_modules: {
            'ember-container-query': {
              declarations: {
                components: {
                  'container-query.d.ts': '',
                },
                helpers: {
                  'aspect-ratio.d.ts': '',
                  'height.d.ts': '',
                  'width.d.ts': '',
                },
                modifiers: {
                  'container-query.d.ts': '',
                },
                'index.d.ts': normalizeFile([
                  `export { default as ContainerQuery } from './components/container-query';`,
                  `export { default as aspectRatio } from './helpers/aspect-ratio.ts';`,
                  `export { default as height } from './helpers/height.ts';`,
                  `export { default as width } from './helpers/width.ts';`,
                  `export type { Dimensions, Features, IndexSignatureParameter, Metadata, QueryResults, } from './modifiers/container-query.ts';`,
                  `export { default as containerQuery } from './modifiers/container-query.ts';`,
                  ``,
                ]),
              },
              dist: {
                components: {
                  'container-query.css': '',
                  'container-query.js': '',
                },
                helpers: {
                  'aspect-ratio.js': '',
                  'height.js': '',
                  'width.js': '',
                },
                modifiers: {
                  'container-query.js': '',
                },
                'index.js': normalizeFile([
                  `export { default as ContainerQuery } from './components/container-query.js';`,
                  `export { default as aspectRatio } from './helpers/aspect-ratio.js';`,
                  `export { default as height } from './helpers/height.js';`,
                  `export { default as width } from './helpers/width.js';`,
                  `export { default as containerQuery } from './modifiers/container-query.js';`,
                  `//# sourceMappingURL=index.js.map`,
                  ``,
                ]),
              },
              'package.json': JSON.stringify({
                name: 'ember-container-query',
                version: '6.0.2',
                keywords: ['ember-addon'],
                'ember-addon': {
                  'app-js': {
                    './components/container-query.js':
                      './dist/_app_/components/container-query.js',
                    './helpers/aspect-ratio.js':
                      './dist/_app_/helpers/aspect-ratio.js',
                    './helpers/height.js': './dist/_app_/helpers/height.js',
                    './helpers/width.js': './dist/_app_/helpers/width.js',
                    './modifiers/container-query.js':
                      './dist/_app_/modifiers/container-query.js',
                  },
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
                'index.ts': normalizeFile([
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

  loadFixture(inputProject, codemodOptions);

  const externalDependencies = analyzeExternalDependencies(options);

  assert.deepStrictEqual(
    externalDependencies,
    new Map([
      [
        'ember-container-query',
        {
          entities: {
            components: new Map([
              [
                'container-query',
                {
                  filePath: normalize('dist/components/container-query.js'),
                  filePathAlias: normalize('.'),
                  isDefaultExport: false,
                  isTypeScript: false,
                  packageName: 'ember-container-query',
                },
              ],
            ]),
            helpers: new Map([
              [
                'aspect-ratio',
                {
                  filePath: normalize('dist/helpers/aspect-ratio.js'),
                  filePathAlias: normalize('.'),
                  isDefaultExport: false,
                  isTypeScript: false,
                  packageName: 'ember-container-query',
                },
              ],
              [
                'height',
                {
                  filePath: normalize('dist/helpers/height.js'),
                  filePathAlias: normalize('.'),
                  isDefaultExport: false,
                  isTypeScript: false,
                  packageName: 'ember-container-query',
                },
              ],
              [
                'width',
                {
                  filePath: normalize('dist/helpers/width.js'),
                  filePathAlias: normalize('.'),
                  isDefaultExport: false,
                  isTypeScript: false,
                  packageName: 'ember-container-query',
                },
              ],
            ]),
            modifiers: new Map([
              [
                'container-query',
                {
                  filePath: normalize('dist/modifiers/container-query.js'),
                  filePathAlias: normalize('.'),
                  isDefaultExport: false,
                  isTypeScript: false,
                  packageName: 'ember-container-query',
                },
              ],
            ]),
          },
          packageRoot: normalize(
            'tmp/my-monorepo/node_modules/.pnpm/ember-container-query@6.0.2/node_modules/ember-container-query',
          ),
          packageType: 'v2-addon',
        },
      ],
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
          packageRoot: normalize(
            'tmp/my-monorepo/node_modules/.pnpm/ember-intl@7.3.1/node_modules/ember-intl',
          ),
          packageType: 'v1-addon',
        },
      ],
    ]),
  );
});
