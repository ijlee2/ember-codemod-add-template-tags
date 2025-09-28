import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeExternalDependencies } from '../../../../src/utils/find-entities/index.js';
import { codemodOptions, options } from '../../../helpers/mocks/index.js';

test('utils | find-entities | analyze-external-dependencies > package has barrel file that renames entities', function () {
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
                'index.d.ts': [
                  `export { default as CQ } from './components/container-query';`,
                  `export { default as ar } from './helpers/aspect-ratio.ts';`,
                  `export { default as h } from './helpers/height.ts';`,
                  `export { default as w } from './helpers/width.ts';`,
                  `export type { Dimensions, Features, IndexSignatureParameter, Metadata, QueryResults, } from './modifiers/container-query.ts';`,
                  `export { default as cq } from './modifiers/container-query.ts';`,
                  ``,
                ].join('\n'),
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
                'index.js': [
                  `export { default as CQ } from './components/container-query.js';`,
                  `export { default as ar } from './helpers/aspect-ratio.js';`,
                  `export { default as h } from './helpers/height.js';`,
                  `export { default as w } from './helpers/width.js';`,
                  `export { default as cq } from './modifiers/container-query.js';`,
                  `//# sourceMappingURL=index.js.map`,
                  ``,
                ].join('\n'),
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
                'index.ts': [
                  `export { default as fdate } from './helpers/format-date';`,
                  `export { default as fdaterange } from './helpers/format-date-range';`,
                  `export { default as flist } from './helpers/format-list';`,
                  `export { default as fmessage } from './helpers/format-message';`,
                  `export { default as fnumber } from './helpers/format-number';`,
                  `export { default as frelative } from './helpers/format-relative';`,
                  `export { default as frelativetime } from './helpers/format-relative-time';`,
                  `export { default as ftime } from './helpers/format-time';`,
                  `export { default as t } from './helpers/t';`,
                  `export type { Formats, default as IntlService } from './services/intl';`,
                  ``,
                ].join('\n'),
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
                  filePath: 'dist/components/container-query.js',
                  filePathAlias: '.',
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
                  filePath: 'dist/helpers/aspect-ratio.js',
                  filePathAlias: '.',
                  isDefaultExport: false,
                  isTypeScript: false,
                  packageName: 'ember-container-query',
                },
              ],
              [
                'height',
                {
                  filePath: 'dist/helpers/height.js',
                  filePathAlias: '.',
                  isDefaultExport: false,
                  isTypeScript: false,
                  packageName: 'ember-container-query',
                },
              ],
              [
                'width',
                {
                  filePath: 'dist/helpers/width.js',
                  filePathAlias: '.',
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
                  filePath: 'dist/modifiers/container-query.js',
                  filePathAlias: '.',
                  isDefaultExport: false,
                  isTypeScript: false,
                  packageName: 'ember-container-query',
                },
              ],
            ]),
          },
          packageRoot:
            'tmp/my-monorepo/node_modules/.pnpm/ember-container-query@6.0.2/node_modules/ember-container-query',
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
                  filePath: 'addon/helpers/format-date.ts',
                  filePathAlias: '.',
                  isDefaultExport: false,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                'format-date-range',
                {
                  filePath: 'addon/helpers/format-date-range.ts',
                  filePathAlias: '.',
                  isDefaultExport: false,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                'format-list',
                {
                  filePath: 'addon/helpers/format-list.ts',
                  filePathAlias: '.',
                  isDefaultExport: false,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                'format-message',
                {
                  filePath: 'addon/helpers/format-message.ts',
                  filePathAlias: '.',
                  isDefaultExport: false,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                'format-number',
                {
                  filePath: 'addon/helpers/format-number.ts',
                  filePathAlias: '.',
                  isDefaultExport: false,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                'format-relative',
                {
                  filePath: 'addon/helpers/format-relative.ts',
                  filePathAlias: '.',
                  isDefaultExport: false,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                'format-relative-time',
                {
                  filePath: 'addon/helpers/format-relative-time.ts',
                  filePathAlias: '.',
                  isDefaultExport: false,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                'format-time',
                {
                  filePath: 'addon/helpers/format-time.ts',
                  filePathAlias: '.',
                  isDefaultExport: false,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                't',
                {
                  filePath: 'addon/helpers/t.ts',
                  filePathAlias: '.',
                  isDefaultExport: false,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
            ]),
            modifiers: new Map(),
          },
          packageRoot:
            'tmp/my-monorepo/node_modules/.pnpm/ember-intl@7.3.1/node_modules/ember-intl',
          packageType: 'v1-addon',
        },
      ],
    ]),
  );
});
