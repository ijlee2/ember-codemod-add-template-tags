import { assert, test } from '@codemod-utils/tests';

import { removeGlintRegistry } from '../../../../src/utils/update-components/index.js';

test('utils | update-components | remove-glint-registry > v2-app', function () {
  const oldFile = [
    `import Component from '@glimmer/component';`,
    ``,
    `interface UiFormSignature { /* ... */ }`,
    ``,
    `export default class UiForm extends Component<UiFormSignature> {}`,
    ``,
    `declare module '@glint/environment-ember-loose/registry' {`,
    `  export default interface Registry {`,
    `    'Ui::Form': typeof UiForm;`,
    `    'ui/form': typeof UiForm;`,
    `  }`,
    `}`,
    ``,
  ].join('\n');

  const newFile = removeGlintRegistry(oldFile, {
    isTypeScript: true,
    packageType: 'v2-app',
  });

  assert.strictEqual(
    newFile,
    [
      `import Component from '@glimmer/component';`,
      ``,
      `interface UiFormSignature { /* ... */ }`,
      ``,
      `export default class UiForm extends Component<UiFormSignature> {}`,
      ``,
    ].join('\n'),
  );
});
