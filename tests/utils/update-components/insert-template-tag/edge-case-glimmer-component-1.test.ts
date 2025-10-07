import { assert, test } from '@codemod-utils/tests';

import { insertTemplateTag } from '../../../../src/utils/update-components/index.js';

test('utils | update-components | insert-template-tag > edge case (Glimmer component) (1)', function () {
  const oldFile = [
    `import Component from '@glimmer/component';`,
    ``,
    `interface UiFormSignature { /* ... */ }`,
    ``,
    `export default class UiForm extends Component {`,
    `  data = new TrackedObject<Record<string, unknown>>(this.args.data ?? {});`,
    ``,
    `  styles = styles;`,
    ``,
    `  @action async submitForm(event: SubmitEvent): Promise<void> {`,
    `    event.preventDefault();`,
    ``,
    `    await this.args.onSubmit(this.data);`,
    `  }`,
    ``,
    `  @action updateData({ key, value }: { key: string; value: unknown }): void {`,
    `    this.data[key] = value;`,
    `  }`,
    `}`,
    ``,
  ].join('\n');

  const newFile = insertTemplateTag(oldFile, {
    isTypeScript: true,
  });

  assert.strictEqual(
    newFile,
    [
      `import Component from '@glimmer/component';`,
      ``,
      `interface UiFormSignature { /* ... */ }`,
      ``,
      `export default class UiForm extends Component {`,
      `  data = new TrackedObject<Record<string, unknown>>(this.args.data ?? {});`,
      ``,
      `  styles = styles;`,
      ``,
      `  @action async submitForm(event: SubmitEvent): Promise<void> {`,
      `    event.preventDefault();`,
      ``,
      `    await this.args.onSubmit(this.data);`,
      `  }`,
      ``,
      `  @action updateData({ key, value }: { key: string; value: unknown }): void {`,
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
