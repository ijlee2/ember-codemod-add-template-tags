import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { findEntities, updateComponents } from '../../../src/steps/index.js';
import {
  inputProject,
  options,
  packages,
} from '../../helpers/shared-test-setups/my-v2-addon.js';

test('steps | update-components > v2-addon', function () {
  const outputProject = {
    src: {
      components: {
        'navigation-menu.gts': [
          `import type { TOC } from '@ember/component/template-only';`,
          ``,
          `interface NavigationMenuSignature {}`,
          ``,
          `const NavigationMenu = <template>`,
          ``,
          `</template> satisfies TOC<NavigationMenuSignature>;`,
          ``,
          `export default NavigationMenu;`,
          ``,
        ].join('\n'),
        'select-locale.gts': [
          `import Component from '@glimmer/component';`,
          ``,
          `interface SelectLocaleSignature {}`,
          ``,
          `export default class SelectLocale extends Component<SelectLocaleSignature> {`,
          `    <template>`,
          ``,
          `    </template>`,
          `}`,
          ``,
        ].join('\n'),
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

  updateComponents(packages, entities);

  assertFixture(outputProject, options);
});
