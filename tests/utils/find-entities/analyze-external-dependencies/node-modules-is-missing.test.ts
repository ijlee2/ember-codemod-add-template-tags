import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeExternalDependencies } from '../../../../src/utils/find-entities/index.js';
import { codemodOptions, options } from '../../../helpers/mocks/index.js';

test('utils | find-entities | analyze-external-dependencies > node_modules is missing', function () {
  const inputProject = {};

  loadFixture(inputProject, codemodOptions);

  const externalDependencies = analyzeExternalDependencies(options);

  assert.deepStrictEqual(externalDependencies, new Map());
});
