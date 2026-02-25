import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { analyzeComponent } from '../../../../src/utils/find-packages-with-hbs/index.js';

test('utils | find-packages-with-hbs | analyze-component > edge case (class is inherited)', function () {
  const file = normalizeFile([
    `import { action } from '@ember/object';`,
    `import BaseComponent from 'my-addon/components/base-component';`,
    ``,
    `interface HelloWorldSignature {`,
    `  Args: {};`,
    `}`,
    ``,
    `export default class HelloWorld extends BaseComponent<HelloWorldSignature> {`,
    `  @action doSomething(): void {}`,
    `}`,
    ``,
  ]);

  assert.deepStrictEqual(analyzeComponent(file), {
    baseComponentName: 'BaseComponent',
    componentName: 'HelloWorld',
    componentType: 'inherited',
  });
});
