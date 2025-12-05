import { assert, createFile, test } from '@codemod-utils/tests';

import { analyzeComponent } from '../../../../src/utils/find-packages-with-hbs/index.js';

test('utils | find-packages-with-hbs | analyze-component > Glimmer (TypeScript)', function () {
  const file = createFile([
    `import Component from '@glimmer/component';`,
    ``,
    `interface HelloWorldSignature {`,
    `  Args: {};`,
    `}`,
    ``,
    `export default class HelloWorld extends Component<HelloWorldSignature> {}`,
    ``,
  ]);

  assert.deepStrictEqual(analyzeComponent(file), {
    baseComponentName: 'Component',
    componentName: 'HelloWorld',
    componentType: 'glimmer',
  });
});
