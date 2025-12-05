import { normalize } from 'node:path';

import { assert, test } from '@codemod-utils/tests';

import { filterComponents } from '../../../../src/utils/find-packages-with-hbs/index.js';

test('utils | find-packages-with-hbs | filter-components > base case', function () {
  const oldFilePaths: string[] = [];

  const newFilePaths = filterComponents(oldFilePaths, {
    packageRoot: normalize('tmp/my-v1-app'),
    packageType: 'v1-app',
  });

  assert.deepStrictEqual(newFilePaths, []);
});
