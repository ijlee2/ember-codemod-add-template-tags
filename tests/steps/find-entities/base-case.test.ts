import { assert, loadFixture, test } from '@codemod-utils/tests';

import { findEntities } from '../../../src/steps/index.js';
import { options } from '../../helpers/mocks/index.js';

test('steps | find-entities > base case', function () {
  const inputProject = {};

  loadFixture(inputProject, options);

  const entities = findEntities(options);

  assert.deepStrictEqual(entities, {
    components: new Map([
      [
        'input',
        {
          filePath: '.',
          filePathAlias: '.',
          isDefaultExport: false,
          isTypeScript: true,
          packageName: '@ember/component',
        },
      ],
      [
        'link-to',
        {
          filePath: '.',
          filePathAlias: '.',
          isDefaultExport: false,
          isTypeScript: true,
          packageName: '@ember/routing',
        },
      ],
      [
        'textarea',
        {
          filePath: '.',
          filePathAlias: '.',
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
    ]),
  });
});
