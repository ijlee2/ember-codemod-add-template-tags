import { assert, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-monorepo.js';

test('steps | create-options > my-monorepo', function () {
  assert.deepStrictEqual(createOptions(codemodOptions), options);
});
