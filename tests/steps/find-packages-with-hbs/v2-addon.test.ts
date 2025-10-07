import { assert, loadFixture, test } from '@codemod-utils/tests';

import { findPackagesWithHBS } from '../../../src/steps/index.js';
import {
  inputProject,
  options,
} from '../../helpers/shared-test-setups/my-v2-addon.js';

test('steps | find-packages-with-hbs > v2-addon', function () {
  loadFixture(inputProject, options);

  const packages = findPackagesWithHBS(options);

  assert.deepStrictEqual(
    packages,
    new Map([
      [
        'my-v2-addon',
        {
          filesWithHBS: {
            components: [
              'src/components/navigation-menu.hbs',
              'src/components/select-locale.hbs',
            ],
            routes: [],
            tests: [],
          },
          filesWithTemplateTag: {
            components: [],
            routes: [],
            tests: [],
          },
          hasEmberRouteTemplate: false,
          packageRoot: 'tmp/my-v2-addon',
          packageType: 'v2-addon',
        },
      ],
    ]),
  );
});
