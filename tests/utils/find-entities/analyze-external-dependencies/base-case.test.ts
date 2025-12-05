import { normalize } from 'node:path';

import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeExternalDependencies } from '../../../../src/utils/find-entities/index.js';
import {
  codemodOptions,
  options,
} from '../../../helpers/shared-test-setups/my-monorepo.js';

test('utils | find-entities | analyze-external-dependencies > base case', function () {
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
                  filePathAlias: normalize('components/container-query'),
                  isDefaultExport: true,
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
                  filePathAlias: normalize('helpers/aspect-ratio'),
                  isDefaultExport: true,
                  isTypeScript: false,
                  packageName: 'ember-container-query',
                },
              ],
              [
                'height',
                {
                  filePath: normalize('dist/helpers/height.js'),
                  filePathAlias: normalize('helpers/height'),
                  isDefaultExport: true,
                  isTypeScript: false,
                  packageName: 'ember-container-query',
                },
              ],
              [
                'width',
                {
                  filePath: normalize('dist/helpers/width.js'),
                  filePathAlias: normalize('helpers/width'),
                  isDefaultExport: true,
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
                  filePathAlias: normalize('modifiers/container-query'),
                  isDefaultExport: true,
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
                  filePathAlias: normalize('helpers/format-date'),
                  isDefaultExport: true,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                'format-date-range',
                {
                  filePath: normalize('addon/helpers/format-date-range.ts'),
                  filePathAlias: normalize('helpers/format-date-range'),
                  isDefaultExport: true,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                'format-list',
                {
                  filePath: normalize('addon/helpers/format-list.ts'),
                  filePathAlias: normalize('helpers/format-list'),
                  isDefaultExport: true,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                'format-message',
                {
                  filePath: normalize('addon/helpers/format-message.ts'),
                  filePathAlias: normalize('helpers/format-message'),
                  isDefaultExport: true,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                'format-number',
                {
                  filePath: normalize('addon/helpers/format-number.ts'),
                  filePathAlias: normalize('helpers/format-number'),
                  isDefaultExport: true,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                'format-relative',
                {
                  filePath: normalize('addon/helpers/format-relative.ts'),
                  filePathAlias: normalize('helpers/format-relative'),
                  isDefaultExport: true,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                'format-relative-time',
                {
                  filePath: normalize('addon/helpers/format-relative-time.ts'),
                  filePathAlias: normalize('helpers/format-relative-time'),
                  isDefaultExport: true,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                'format-time',
                {
                  filePath: normalize('addon/helpers/format-time.ts'),
                  filePathAlias: normalize('helpers/format-time'),
                  isDefaultExport: true,
                  isTypeScript: true,
                  packageName: 'ember-intl',
                },
              ],
              [
                't',
                {
                  filePath: normalize('addon/helpers/t.ts'),
                  filePathAlias: normalize('helpers/t'),
                  isDefaultExport: true,
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
