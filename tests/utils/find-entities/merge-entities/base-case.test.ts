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
