import { normalize } from 'node:path';

import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';

import type { CodemodOptions } from '../../../../src/types/index.js';
import { filterComponents } from '../../../../src/utils/find-packages-with-hbs/index.js';

test('utils | find-packages-with-hbs | filter-components > v2-app', function () {
  const inputProject = {
    app: {
      components: {
        tracks: {
          'list.ts': normalizeFile([
            `import templateOnlyComponent from '@ember/component/template-only';`,
            ``,
            `const TracksList = templateOnlyComponent<TracksListSignature>();`,
            ``,
            `export default TracksList;`,
          ]),
        },
        ui: {
          form: {
            'checkbox.js': normalizeFile([
              `import Component from '@glimmer/component';`,
              ``,
              `export default class UiFormCheckbox extends Component {}`,
            ]),
            'input.gts': normalizeFile([
              `import Component from '@glimmer/component';`,
              ``,
              `export default class UiFormInput extends Component<UiFormInputSignature> {`,
              `  <template></template>`,
              `}`,
            ]),
            'textarea.ts': normalizeFile([
              `import UiFormInput from './input';`,
              ``,
              `export default class UiFormTextarea extends UiFormInput<UiFormTextareaSignature> {}`,
            ]),
          },
          'form.ts': normalizeFile([
            `import { BaseForm } from 'some-addon';`,
            ``,
            `export default class UiForm extends BaseForm<UiFormSignature> {}`,
          ]),
        },
        widgets: {
          'widget-1.gjs': normalizeFile([`<template></template>`]),
          'widget-2.ts': normalizeFile([
            `import Component from '@glimmer/component';`,
            ``,
            `export default class WidgetsWidget2 extends Component<WidgetsWidget2Signature> {}`,
          ]),
          'widget-3.js': normalizeFile([
            `import Component from '@ember/component';`,
            ``,
            `export default Component.extend({});`,
          ]),
          'widget-4.js': normalizeFile([
            `import templateOnlyComponent from '@ember/component/template-only';`,
            ``,
            `const WidgetsWidget4 = templateOnlyComponent();`,
            ``,
            `export default WidgetsWidget4;`,
          ]),
        },
      },
    },
  };

  const codemodOptions: CodemodOptions = {
    componentStructure: 'flat',
    convert: new Set(['components', 'routes', 'tests']),
    folder: '',
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
    'app/components/widgets/widget-3.hbs',
    'app/components/widgets/widget-4.hbs',
  ].map(normalize);

  const newFilePaths = filterComponents(oldFilePaths, {
    packageRoot: normalize('tmp/my-v2-app'),
    packageType: 'v2-app',
  });

  assert.deepStrictEqual(
    newFilePaths,
    [
      'app/components/tracks.hbs',
      'app/components/tracks/list.hbs',
      'app/components/ui/form.hbs',
      'app/components/ui/form/checkbox.hbs',
      'app/components/ui/form/textarea.hbs',
      'app/components/widgets/widget-2.hbs',
      'app/components/widgets/widget-4.hbs',
    ].map(normalize),
  );
});
