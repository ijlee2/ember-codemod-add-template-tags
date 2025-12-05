import { normalize } from 'node:path';

import { assert, test } from '@codemod-utils/tests';

import type { Dependencies } from '../../../../src/types/index.js';
import {
  emberDependencies,
  mergeEntities,
} from '../../../../src/utils/find-entities/index.js';

test('utils | find-entities | merge-entities > base case', function () {
  const entities = {
    components: new Map(),
    helpers: new Map(),
    modifiers: new Map(),
  };

  mergeEntities(entities, emberDependencies, true);

  assert.deepEqual(Object.keys(entities), [
    'components',
    'helpers',
    'modifiers',
  ]);

  assert.deepEqual(Array.from(entities.components.keys()), [
    'input',
    'link-to',
    'textarea',
  ]);

  assert.deepEqual(Array.from(entities.helpers.keys()), [
    'ensure-safe-component',
    'array',
    'concat',
    'fn',
    'get',
    'hash',
    'htmlSafe',
    'unique-id',
  ]);

  assert.deepEqual(Array.from(entities.modifiers.keys()), ['on']);

  const externalDependencies: Dependencies = new Map([
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
        packageRoot:
          'tmp/my-monorepo/node_modules/.pnpm/ember-intl@7.3.1/node_modules/ember-intl',
        packageType: 'v1-addon',
      },
    ],
  ]);

  mergeEntities(entities, externalDependencies, true);

  assert.deepEqual(Object.keys(entities), [
    'components',
    'helpers',
    'modifiers',
  ]);

  assert.deepEqual(Array.from(entities.components.keys()), [
    'input',
    'link-to',
    'textarea',
    'container-query',
  ]);

  assert.deepEqual(Array.from(entities.helpers.keys()), [
    'ensure-safe-component',
    'array',
    'concat',
    'fn',
    'get',
    'hash',
    'htmlSafe',
    'unique-id',
    'aspect-ratio',
    'height',
    'width',
    'format-date',
    'format-date-range',
    'format-list',
    'format-message',
    'format-number',
    'format-relative',
    'format-relative-time',
    'format-time',
    't',
  ]);

  assert.deepEqual(Array.from(entities.modifiers.keys()), [
    'on',
    'container-query',
  ]);
});
