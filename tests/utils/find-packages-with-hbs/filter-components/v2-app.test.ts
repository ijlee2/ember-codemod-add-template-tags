import { assert, loadFixture, test } from '@codemod-utils/tests';

import type { CodemodOptions } from '../../../../src/types/index.js';
import { filterComponents } from '../../../../src/utils/find-packages-with-hbs/index.js';

test('utils | find-packages-with-hbs | filter-components > v2-app', function () {
  const inputProject = {
    app: {
      components: {
        tracks: {
          'list.ts': `import templateOnlyComponent from '@ember/component/template-only';`,
        },
        ui: {
          form: {
            'checkbox.js': `import Component from '@glimmer/component';`,
            'input.gts': `import Component from '@glimmer/component';`,
            'textarea.ts': `import Input from './input';`,
          },
          'form.js': `import Component from '@glimmer/component';`,
        },
        widgets: {
          'widget-2': {
            'captions.js': `import templateOnlyComponent from '@ember/component/template-only';`,
          },
          'widget-2.ts': `import Component from '@glimmer/component';`,
          'widget-3.ts': `import Component from '@ember/component';`,
        },
      },
    },
  };

  const codemodOptions: CodemodOptions = {
    componentStructure: 'flat',
    convert: new Set(['components', 'routes', 'tests']),
    projectRoot: 'tmp/my-v2-app',
  };

  loadFixture(inputProject, codemodOptions);

  const oldFilePaths = [
    'app/components/tracks.hbs',
    'app/components/tracks/list.hbs',
    'app/components/ui/form.hbs',
    'app/components/ui/form/checkbox.hbs',
    'app/components/ui/form/textarea.hbs',
    'app/components/widgets/widget-2.hbs',
    'app/components/widgets/widget-2/captions.hbs',
    'app/components/widgets/widget-3.hbs',
  ];

  const newFilePaths = filterComponents(oldFilePaths, {
    packageRoot: 'tmp/my-v2-app',
    packageType: 'v2-app',
  });

  assert.deepStrictEqual(newFilePaths, [
    'app/components/tracks.hbs',
    'app/components/tracks/list.hbs',
    'app/components/ui/form.hbs',
    'app/components/ui/form/checkbox.hbs',
    'app/components/widgets/widget-2.hbs',
    'app/components/widgets/widget-2/captions.hbs',
  ]);
});
