import { assert, test } from '@codemod-utils/tests';

import { insertTemplateTag } from '../../../../src/utils/update-components/index.js';

test('utils | update-components | insert-template-tag > Glimmer component (JavaScript)', function () {
  const oldFile = [
    `import Component from '@glimmer/component';`,
    ``,
    `export default class UiFormComponent extends Component {`,
    `  data = new TrackedObject(this.args.data ?? {});`,
    ``,
    `  styles = styles;`,
    ``,
    `  @action async submitForm(event) {`,
    `    event.preventDefault();`,
    ``,
    `    await this.args.onSubmit(this.data);`,
    `  }`,
    ``,
    `  @action updateData({ key, value }) {`,
    `    this.data[key] = value;`,
    `  }`,
    `}`,
    ``,
  ].join('\n');

  const newFile = insertTemplateTag(oldFile, {
    isTypeScript: false,
  });

  assert.strictEqual(
    newFile,
    [
      `import Component from '@glimmer/component';`,
      ``,
      `export default class UiFormComponent extends Component {`,
      `  data = new TrackedObject(this.args.data ?? {});`,
      ``,
      `  styles = styles;`,
      ``,
      `  @action async submitForm(event) {`,
      `    event.preventDefault();`,
      ``,
      `    await this.args.onSubmit(this.data);`,
      `  }`,
      ``,
      `  @action updateData({ key, value }) {`,
      `    this.data[key] = value;`,
      `  }`,
      ``,
      ``,
      `  <template></template>`,
      `}`,
      ``,
    ].join('\n'),
  );
});
