import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { runCodemod } from '../../src/index.js';
import { inputProject, outputProject } from '../fixtures/my-monorepo/index.js';
import { codemodOptions } from '../helpers/shared-test-setups/my-monorepo.js';

test('index > my-monorepo', function () {
  loadFixture(inputProject, codemodOptions);

  runCodemod(codemodOptions);

  assertFixture(outputProject, codemodOptions);

  // TODO: Check idempotence
  // runCodemod(codemodOptions);

  // assertFixture(outputProject, codemodOptions);
});
