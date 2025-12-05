import { normalize } from 'node:path';

import { assert, test } from '@codemod-utils/tests';

import { sortEntities } from '../../../../src/utils/find-entities/index.js';

test('utils | find-entities | sort-entities > base case', function () {
  const entities = {
    components: new Map([
      [
        'input',
        {
          filePath: normalize('.'),
          filePathAlias: normalize('.'),
          isDefaultExport: true,
          isTypeScript: true,
          packageName: '@ember/component',
        },
      ],
      [
        'link-to',
        {
          filePath: normalize('.'),
          filePathAlias: normalize('.'),
          isDefaultExport: true,
          isTypeScript: true,
          packageName: '@ember/routing',
        },
      ],
      [
        'textarea',
        {
          filePath: normalize('.'),
          filePathAlias: normalize('.'),
          isDefaultExport: true,
          isTypeScript: true,
          packageName: '@ember/component',
        },
      ],
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
        'ensure-safe-component',
        {
          filePath: normalize('.'),
          filePathAlias: normalize('.'),
          isDefaultExport: false,
          isTypeScript: false,
          packageName: '@embroider/util',
        },
      ],
      [
        'array',
        {
          filePath: normalize('.'),
          filePathAlias: normalize('.'),
          isDefaultExport: false,
          isTypeScript: true,
          packageName: '@ember/helper',
        },
      ],
      [
        'concat',
        {
          filePath: normalize('.'),
          filePathAlias: normalize('.'),
          isDefaultExport: false,
          isTypeScript: true,
          packageName: '@ember/helper',
        },
      ],
      [
        'fn',
        {
          filePath: normalize('.'),
          filePathAlias: normalize('.'),
          isDefaultExport: false,
          isTypeScript: true,
          packageName: '@ember/helper',
        },
      ],
      [
        'get',
        {
          filePath: normalize('.'),
          filePathAlias: normalize('.'),
          isDefaultExport: false,
          isTypeScript: true,
          packageName: '@ember/helper',
        },
      ],
      [
        'hash',
        {
          filePath: normalize('.'),
          filePathAlias: normalize('.'),
          isDefaultExport: false,
          isTypeScript: true,
          packageName: '@ember/helper',
        },
      ],
      [
        'htmlSafe',
        {
          filePath: normalize('.'),
          filePathAlias: normalize('.'),
          isDefaultExport: false,
          isTypeScript: true,
          packageName: '@ember/template',
        },
      ],
      [
        'unique-id',
        {
          filePath: normalize('.'),
          filePathAlias: normalize('.'),
          isDefaultExport: false,
          isTypeScript: true,
          packageName: '@ember/helper',
        },
      ],
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
    modifiers: new Map([
      [
        'on',
        {
          filePath: normalize('.'),
          filePathAlias: normalize('.'),
          isDefaultExport: false,
          isTypeScript: true,
          packageName: '@ember/modifier',
        },
      ],
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
  };

  sortEntities(entities);

  assert.deepEqual(Object.keys(entities), [
    'components',
    'helpers',
    'modifiers',
  ]);

  assert.deepEqual(Array.from(entities.components.keys()), [
    'container-query',
    'input',
    'link-to',
    'textarea',
  ]);

  assert.deepEqual(Array.from(entities.helpers.keys()), [
    'array',
    'aspect-ratio',
    'concat',
    'ensure-safe-component',
    'fn',
    'format-date',
    'format-date-range',
    'format-list',
    'format-message',
    'format-number',
    'format-relative',
    'format-relative-time',
    'format-time',
    'get',
    'hash',
    'height',
    'htmlSafe',
    't',
    'unique-id',
    'width',
  ]);

  assert.deepEqual(Array.from(entities.modifiers.keys()), [
    'container-query',
    'on',
  ]);

  sortEntities(entities);

  assert.deepEqual(Object.keys(entities), [
    'components',
    'helpers',
    'modifiers',
  ]);

  assert.deepEqual(Array.from(entities.components.keys()), [
    'container-query',
    'input',
    'link-to',
    'textarea',
  ]);

  assert.deepEqual(Array.from(entities.helpers.keys()), [
    'array',
    'aspect-ratio',
    'concat',
    'ensure-safe-component',
    'fn',
    'format-date',
    'format-date-range',
    'format-list',
    'format-message',
    'format-number',
    'format-relative',
    'format-relative-time',
    'format-time',
    'get',
    'hash',
    'height',
    'htmlSafe',
    't',
    'unique-id',
    'width',
  ]);

  assert.deepEqual(Array.from(entities.modifiers.keys()), [
    'container-query',
    'on',
  ]);
});
