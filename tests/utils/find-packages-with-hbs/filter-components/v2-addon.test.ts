import { normalize } from 'node:path';

import { assert, loadFixture, test } from '@codemod-utils/tests';

import type { CodemodOptions } from '../../../../src/types/index.js';
import { filterComponents } from '../../../../src/utils/find-packages-with-hbs/index.js';

test('utils | find-packages-with-hbs | filter-components > v2-addon', function () {
  const inputProject = {
    src: {
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
    folder: '',
    projectRoot: 'tmp/my-v2-addon',
  };

  loadFixture(inputProject, codemodOptions);

  const oldFilePaths = [
    'src/components/tracks.hbs',
    'src/components/tracks/list.hbs',
    'src/components/ui/form.hbs',
    'src/components/ui/form/checkbox.hbs',
    'src/components/ui/form/textarea.hbs',
    'src/components/widgets/widget-2.hbs',
    'src/components/widgets/widget-2/captions.hbs',
    'src/components/widgets/widget-3.hbs',
  ].map(normalize);

  const newFilePaths = filterComponents(oldFilePaths, {
    packageRoot: normalize('tmp/my-v2-addon'),
    packageType: 'v2-addon',
  });

  assert.deepStrictEqual(
    newFilePaths,
    [
      'src/components/tracks.hbs',
      'src/components/tracks/list.hbs',
      'src/components/ui/form.hbs',
      'src/components/ui/form/checkbox.hbs',
      'src/components/widgets/widget-2.hbs',
      'src/components/widgets/widget-2/captions.hbs',
    ].map(normalize),
  );
});
