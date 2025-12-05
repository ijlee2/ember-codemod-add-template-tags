import { normalize } from 'node:path';

import { assert, loadFixture, test } from '@codemod-utils/tests';

import { findEntities } from '../../../src/steps/index.js';
import { options } from '../../helpers/shared-test-setups/my-monorepo.js';

test('steps | find-entities > base case', function () {
  const inputProject = {};

  loadFixture(inputProject, options);

  const entities = findEntities(options);

  assert.deepStrictEqual(entities, {
    components: new Map([
      [
        'input',
        {
          filePath: normalize('.'),
          filePathAlias: normalize('.'),
          isDefaultExport: false,
          isTypeScript: true,
          packageName: '@ember/component',
        },
      ],
      [
        'link-to',
        {
          filePath: normalize('.'),
          filePathAlias: normalize('.'),
          isDefaultExport: false,
          isTypeScript: true,
          packageName: '@ember/routing',
        },
      ],
      [
        'textarea',
        {
          filePath: normalize('.'),
          filePathAlias: normalize('.'),
          isDefaultExport: false,
          isTypeScript: true,
          packageName: '@ember/component',
        },
      ],
    ]),
    helpers: new Map([
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
    ]),
  });
});
