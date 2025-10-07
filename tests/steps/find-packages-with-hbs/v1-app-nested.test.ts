import { assert, loadFixture, test } from '@codemod-utils/tests';

import { findPackagesWithHBS } from '../../../src/steps/index.js';
import {
  inputProject,
  options,
} from '../../helpers/shared-test-setups/my-v1-app-nested.js';

test('steps | find-packages-with-hbs > v1-app (nested)', function () {
  loadFixture(inputProject, options);

  const packages = findPackagesWithHBS(options);

  assert.deepStrictEqual(
    packages,
    new Map([
      [
        'my-v1-app-nested',
        {
          filesWithHBS: {
            components: [
              'app/components/navigation-menu/index.hbs',
              'app/components/select-locale/index.hbs',
              'app/components/ui/form/checkbox/index.hbs',
              'app/components/ui/form/field/index.hbs',
              'app/components/ui/form/index.hbs',
              'app/components/ui/form/information/index.hbs',
              'app/components/ui/form/input/index.hbs',
              'app/components/ui/form/select/index.hbs',
              'app/components/ui/page/index.hbs',
            ],
            routes: [
              'app/templates/application.hbs',
              'app/templates/index.hbs',
            ],
            tests: [
              'tests/integration/components/navigation-menu-test.js',
              'tests/integration/components/select-locale-test.js',
              'tests/integration/components/ui/form-test.ts',
              'tests/integration/components/ui/form/checkbox-test.ts',
              'tests/integration/components/ui/form/field-test.ts',
              'tests/integration/components/ui/form/information-test.ts',
              'tests/integration/components/ui/form/textarea-test.js',
            ],
          },
          filesWithTemplateTag: {
            components: [],
            routes: [],
            tests: [],
          },
          hasEmberRouteTemplate: false,
          packageRoot: 'tmp/my-v1-app-nested',
          packageType: 'v1-app',
        },
      ],
    ]),
  );
});
