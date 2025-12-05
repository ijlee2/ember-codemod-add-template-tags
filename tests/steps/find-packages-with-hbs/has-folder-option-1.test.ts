import { normalize } from 'node:path';

import { assert, loadFixture, test } from '@codemod-utils/tests';

import { findPackagesWithHBS } from '../../../src/steps/index.js';
import type { Options } from '../../../src/types/index.js';
import { inputProject } from '../../helpers/shared-test-setups/my-v1-app.js';

test('steps | find-packages-with-hbs > has folder option (1)', function () {
  const options: Options = {
    componentStructure: 'flat',
    convert: {
      components: true,
      routes: true,
      tests: true,
    },
    folder: 'ui',
    projectRoot: 'tmp/my-v1-app',
  };

  loadFixture(inputProject, options);

  const packages = findPackagesWithHBS(options);

  assert.deepStrictEqual(
    packages,
    new Map([
      [
        'my-v1-app',
        {
          filesWithHBS: {
            components: [
              'app/components/ui/form.hbs',
              'app/components/ui/form/checkbox.hbs',
              'app/components/ui/form/field.hbs',
              'app/components/ui/form/information.hbs',
              'app/components/ui/form/input.hbs',
              'app/components/ui/form/select.hbs',
              'app/components/ui/page.hbs',
            ].map(normalize),
            routes: [],
            tests: [
              'tests/integration/components/ui/form-test.ts',
              'tests/integration/components/ui/form/checkbox-test.ts',
              'tests/integration/components/ui/form/field-test.ts',
              'tests/integration/components/ui/form/information-test.ts',
              'tests/integration/components/ui/form/textarea-test.js',
            ].map(normalize),
          },
          filesWithTemplateTag: {
            components: [],
            routes: [],
            tests: [],
          },
          hasEmberRouteTemplate: false,
          packageRoot: normalize('tmp/my-v1-app'),
          packageType: 'v1-app',
        },
      ],
    ]),
  );
});
