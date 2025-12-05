import {
  assertFixture,
  createFile,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { findEntities, updateTests } from '../../../src/steps/index.js';
import {
  inputProject,
  options,
  packages,
} from '../../helpers/shared-test-setups/my-v2-addon.js';

test('steps | update-tests > v2-addon', function () {
  const outputProject = {
    src: {
      components: {
        'navigation-menu.hbs': '',
        'navigation-menu.ts': createFile([
          `import templateOnlyComponent from '@ember/component/template-only';`,
          ``,
          `interface NavigationMenuSignature {}`,
          ``,
          `const NavigationMenu = templateOnlyComponent<NavigationMenuSignature>();`,
          ``,
          `export default NavigationMenu;`,
          ``,
        ]),
        'select-locale.hbs': '',
        'select-locale.ts': createFile([
          `import Component from '@glimmer/component';`,
          ``,
          `interface SelectLocaleSignature {}`,
          ``,
          `export default class SelectLocale extends Component<SelectLocaleSignature> {}`,
          ``,
        ]),
      },
    },
    'package.json': JSON.stringify({
      name: 'my-v2-addon',
      version: '1.0.0',
      keywords: ['ember-addon'],
      devDependencies: {
        'ember-source': '^6.0.0',
      },
      'ember-addon': {
        version: 2,
      },
    }),
  };

  loadFixture(inputProject, options);

  const entities = findEntities(options);

  updateTests(packages, entities);

  assertFixture(outputProject, options);
});
