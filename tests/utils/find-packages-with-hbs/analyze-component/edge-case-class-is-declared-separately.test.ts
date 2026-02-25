import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { analyzeComponent } from '../../../../src/utils/find-packages-with-hbs/index.js';

test('utils | find-packages-with-hbs | analyze-component > edge case (class is declared separately)', function () {
  const file = normalizeFile([
    `import Component from '@glimmer/component';`,
    ``,
    `interface HelloWorldSignature {`,
    `  Args: {};`,
    `}`,
    ``,
    `class HelloWorld extends Component<HelloWorldSignature> {}`,
    ``,
    `export default HelloWorld;`,
    ``,
  ]);

  assert.deepStrictEqual(analyzeComponent(file), {
    baseComponentName: 'Component',
    componentName: 'HelloWorld',
    componentType: 'glimmer',
  });
});
