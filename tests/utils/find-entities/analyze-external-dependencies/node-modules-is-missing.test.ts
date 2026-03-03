import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeExternalDependencies } from '../../../../src/utils/find-entities/index.js';
import {
  codemodOptions,
  options,
} from '../../../helpers/shared-test-setups/my-monorepo.js';

test('utils | find-entities | analyze-external-dependencies > node_modules is missing', async function () {
  const inputProject = {};

  loadFixture(inputProject, codemodOptions);

  const externalDependencies = await analyzeExternalDependencies(options);

  assert.deepStrictEqual(externalDependencies, new Map());
});
