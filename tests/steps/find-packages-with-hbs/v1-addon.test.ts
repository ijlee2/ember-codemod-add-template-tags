import { assert, loadFixture, test } from '@codemod-utils/tests';

import { findPackagesWithHBS } from '../../../src/steps/index.js';
import {
  inputProject,
  options,
} from '../../helpers/shared-test-setups/my-v1-addon.js';

test('steps | find-packages-with-hbs > v1-addon', function () {
  loadFixture(inputProject, options);

  const packages = findPackagesWithHBS(options);

  assert.deepStrictEqual(
    packages,
    new Map([
      [
        'my-v1-addon',
        {
          filesWithHBS: {
            components: ['addon/components/navigation-menu.hbs'],
            routes: [],
            tests: [],
          },
          filesWithTemplateTag: {
            components: [],
            routes: [],
            tests: [],
          },
          hasEmberRouteTemplate: true,
          packageRoot: 'tmp/my-v1-addon',
          packageType: 'v1-addon',
        },
      ],
    ]),
  );
});
