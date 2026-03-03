import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { runCodemod } from '../../src/index.js';
import { inputProject, outputProject } from '../fixtures/my-monorepo/index.js';
import { codemodOptions } from '../helpers/shared-test-setups/my-monorepo.js';

test('index > my-monorepo', async function () {
  loadFixture(inputProject, codemodOptions);

  await runCodemod(codemodOptions);

  assertFixture(outputProject, codemodOptions);

  // Check idempotence
  await runCodemod(codemodOptions);

  assertFixture(outputProject, codemodOptions);
});
