import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { updateComponents } from '../../../src/steps/index.js';
import type { Packages } from '../../../src/types/index.js';
import { entities, options } from '../../helpers/mocks/index.js';

test('steps | update-components > v2-addon', function () {
  const inputProject = {
    'my-v2-addon': {
      src: {
        components: {
          'navigation-menu.hbs': '',
          'navigation-menu.ts': [
            `import templateOnlyComponent from '@ember/component/template-only';`,
            ``,
            `interface NavigationMenuSignature {}`,
            ``,
            `const NavigationMenuComponent = templateOnlyComponent<NavigationMenuSignature>();`,
            ``,
            `export default NavigationMenuComponent;`,
            ``,
          ].join('\n'),
          'select-locale.hbs': '',
          'select-locale.ts': [
            `import Component from '@glimmer/component';`,
            ``,
            `interface SelectLocaleSignature {}`,
            ``,
            `export default class SelectLocaleComponent extends Component<SelectLocaleSignature> {}`,
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
    },
  };

  const outputProject = {
    'my-v2-addon': {
      src: {
        components: {
          'navigation-menu.gts': [
            `import type { TOC } from '@ember/component/template-only';`,
            ``,
            `interface NavigationMenuSignature {}`,
            ``,
            `const NavigationMenuComponent = <template>`,
            ``,
            `</template> satisfies TOC<NavigationMenuSignature>;`,
            ``,
            `export default NavigationMenuComponent;`,
            ``,
          ].join('\n'),
          'select-locale.gts': [
            `import Component from '@glimmer/component';`,
            ``,
            `interface SelectLocaleSignature {}`,
            ``,
            `export default class SelectLocaleComponent extends Component<SelectLocaleSignature> {`,
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
    },
  };

  const packages: Packages = new Map([
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
        packageRoot: 'tmp/my-monorepo/my-v2-addon',
        packageType: 'v2-addon',
      },
    ],
  ]);

  loadFixture(inputProject, options);

  updateComponents(packages, entities);

  assertFixture(outputProject, options);
});
