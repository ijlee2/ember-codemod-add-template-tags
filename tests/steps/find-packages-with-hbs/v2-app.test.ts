import { assert, loadFixture, test } from '@codemod-utils/tests';

import { findPackagesWithHBS } from '../../../src/steps/index.js';
import {
  inputProject,
  options,
} from '../../helpers/shared-test-setups/my-v2-app.js';

test('steps | find-packages-with-hbs > v2-app', function () {
  loadFixture(inputProject, options);

  const packages = findPackagesWithHBS(options);

  assert.deepStrictEqual(
    packages,
    new Map([
      [
        'my-v2-app',
        {
          filesWithHBS: {
            components: [
              'app/components/navigation-menu.hbs',
              'app/components/select-locale.hbs',
              'app/components/ui/form.hbs',
              'app/components/ui/form/checkbox.hbs',
              'app/components/ui/form/field.hbs',
              'app/components/ui/form/information.hbs',
              'app/components/ui/form/input.hbs',
              'app/components/ui/form/select.hbs',
              'app/components/ui/page.hbs',
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
          packageRoot: 'tmp/my-v2-app',
          packageType: 'v2-app',
        },
      ],
    ]),
  );
});
