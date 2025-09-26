import { assert, test } from '@codemod-utils/tests';

import { sortEntities } from '../../../../src/utils/find-entities/index.js';

test('utils | find-entities | sort-entities > base case', function () {
  const entities = {
    components: new Map([
      [
        'input',
        {
          filePath: '.',
          filePathAlias: '.',
          isDefaultExport: true,
          isTypeScript: true,
          packageName: '@ember/component',
        },
      ],
      [
        'link-to',
        {
          filePath: '.',
          filePathAlias: '.',
          isDefaultExport: true,
          isTypeScript: true,
          packageName: '@ember/routing',
        },
      ],
      [
        'textarea',
        {
          filePath: '.',
          filePathAlias: '.',
          isDefaultExport: true,
          isTypeScript: true,
          packageName: '@ember/component',
        },
      ],
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
        'ensure-safe-component',
        {
          filePath: '.',
          filePathAlias: '.',
          isDefaultExport: false,
          isTypeScript: false,
          packageName: '@embroider/util',
        },
      ],
      [
        'array',
        {
          filePath: '.',
          filePathAlias: '.',
          isDefaultExport: false,
          isTypeScript: true,
          packageName: '@ember/helper',
        },
      ],
      [
        'concat',
        {
          filePath: '.',
          filePathAlias: '.',
          isDefaultExport: false,
          isTypeScript: true,
          packageName: '@ember/helper',
        },
      ],
      [
        'fn',
        {
          filePath: '.',
          filePathAlias: '.',
          isDefaultExport: false,
          isTypeScript: true,
          packageName: '@ember/helper',
        },
      ],
      [
        'get',
        {
          filePath: '.',
          filePathAlias: '.',
          isDefaultExport: false,
          isTypeScript: true,
          packageName: '@ember/helper',
        },
      ],
      [
        'hash',
        {
          filePath: '.',
          filePathAlias: '.',
          isDefaultExport: false,
          isTypeScript: true,
          packageName: '@ember/helper',
        },
      ],
      [
        'htmlSafe',
        {
          filePath: '.',
          filePathAlias: '.',
          isDefaultExport: false,
          isTypeScript: true,
          packageName: '@ember/template',
        },
      ],
      [
        'unique-id',
        {
          filePath: '.',
          filePathAlias: '.',
          isDefaultExport: false,
          isTypeScript: true,
          packageName: '@ember/helper',
        },
      ],
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
    modifiers: new Map([
      [
        'on',
        {
          filePath: '.',
          filePathAlias: '.',
          isDefaultExport: false,
          isTypeScript: true,
          packageName: '@ember/modifier',
        },
      ],
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
});
