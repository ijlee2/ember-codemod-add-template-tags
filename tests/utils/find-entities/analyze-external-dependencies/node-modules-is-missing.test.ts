import { assert, loadFixture, test } from '@codemod-utils/tests';

import type { CodemodOptions, Options } from '../../../../src/types/index.js';
import { analyzeExternalDependencies } from '../../../../src/utils/find-entities/index.js';

test('utils | find-entities | analyze-external-dependencies > node_modules is missing', function () {
  const inputProject = {};

  const codemodOptions: CodemodOptions = {
    componentStructure: 'flat',
    convert: new Set(['components', 'routes', 'tests']),
    projectRoot: 'tmp/my-monorepo',
  };

  const options: Options = {
    componentStructure: 'flat',
    convert: {
      components: true,
      routes: true,
      tests: true,
    },
    projectRoot: 'tmp/my-monorepo',
  };

  loadFixture(inputProject, codemodOptions);

  const externalDependencies = analyzeExternalDependencies(options);

  assert.deepStrictEqual(externalDependencies, new Map());
});
