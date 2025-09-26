import type { AllEntities } from '../../../src/types/index.js';

/**
 * We may use this constant to test code that runs after `find-entities`.
 * The code should not mutate the constant.
 */
export const entities: AllEntities = {
  components: new Map([
    [
      'container-query',
      {
        filePath: 'dist/components/container-query.js',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: false,
        packageName: 'ember-container-query',
      },
    ],
    [
      'input',
      {
        filePath: '.',
        filePathAlias: '.',
        isDefaultExport: true,
        isTypeScript: true,
        packageName: '@ember/component',
      },
    ],
    [
      'link-to',
      {
        filePath: '.',
        filePathAlias: '.',
        isDefaultExport: true,
        isTypeScript: true,
        packageName: '@ember/routing',
      },
    ],
    [
      'navigation-menu',
      {
        filePath: 'src/components/navigation-menu.ts',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'my-addon',
      },
    ],
    [
      'products/product/card',
      {
        filePath: 'app/components/products/product/card.ts',
        filePathAlias: 'components/products/product/card',
        isDefaultExport: true,
        isTypeScript: true,
        packageName: 'my-app',
      },
    ],
    [
      'products/product/details',
      {
        filePath: 'app/components/products/product/details.js',
        filePathAlias: 'components/products/product/details',
        isDefaultExport: true,
        isTypeScript: false,
        packageName: 'my-app',
      },
    ],
    [
      'products/product/image',
      {
        filePath: 'app/components/products/product/image.gts',
        filePathAlias: 'components/products/product/image',
        isDefaultExport: true,
        isTypeScript: true,
        packageName: 'my-app',
      },
    ],
    [
      'textarea',
      {
        filePath: '.',
        filePathAlias: '.',
        isDefaultExport: true,
        isTypeScript: true,
        packageName: '@ember/component',
      },
    ],
    [
      'ui/form',
      {
        filePath: 'src/components/ui/form.ts',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'my-addon',
      },
    ],
    [
      'ui/form/checkbox',
      {
        filePath: 'src/components/ui/form/checkbox.ts',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'my-addon',
      },
    ],
    [
      'ui/form/field',
      {
        filePath: 'src/components/ui/form/field.ts',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'my-addon',
      },
    ],
    [
      'ui/form/information',
      {
        filePath: 'src/components/ui/form/information.ts',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'my-addon',
      },
    ],
    [
      'ui/form/input',
      {
        filePath: 'src/components/ui/form/input.js',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: false,
        packageName: 'my-addon',
      },
    ],
    [
      'ui/form/number',
      {
        filePath: 'src/components/ui/form/number.gts',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'my-addon',
      },
    ],
    [
      'ui/form/select',
      {
        filePath: 'src/components/ui/form/select.ts',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'my-addon',
      },
    ],
    [
      'ui/form/textarea',
      {
        filePath: 'src/components/ui/form/textarea.gjs',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: false,
        packageName: 'my-addon',
      },
    ],
    [
      'ui/page',
      {
        filePath: 'src/components/ui/page.js',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: false,
        packageName: 'my-addon',
      },
    ],
  ]),
  helpers: new Map([
    [
      'array',
      {
        filePath: '.',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: true,
        packageName: '@ember/helper',
      },
    ],
    [
      'aspect-ratio',
      {
        filePath: 'dist/helpers/aspect-ratio.js',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: false,
        packageName: 'ember-container-query',
      },
    ],
    [
      'concat',
      {
        filePath: '.',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: true,
        packageName: '@ember/helper',
      },
    ],
    [
      'ensure-safe-component',
      {
        filePath: '.',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: false,
        packageName: '@embroider/util',
      },
    ],
    [
      'experiment',
      {
        filePath: 'app/helpers/experiment.ts',
        filePathAlias: 'helpers/experiment',
        isDefaultExport: true,
        isTypeScript: true,
        packageName: 'my-app',
      },
    ],
    [
      'fn',
      {
        filePath: '.',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: true,
        packageName: '@ember/helper',
      },
    ],
    [
      'format-date',
      {
        filePath: 'addon/helpers/format-date.ts',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'ember-intl',
      },
    ],
    [
      'format-date-range',
      {
        filePath: 'addon/helpers/format-date-range.ts',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'ember-intl',
      },
    ],
    [
      'format-list',
      {
        filePath: 'addon/helpers/format-list.ts',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'ember-intl',
      },
    ],
    [
      'format-message',
      {
        filePath: 'addon/helpers/format-message.ts',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'ember-intl',
      },
    ],
    [
      'format-number',
      {
        filePath: 'addon/helpers/format-number.ts',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'ember-intl',
      },
    ],
    [
      'format-price',
      {
        filePath: 'app/helpers/format-price.js',
        filePathAlias: 'helpers/format-price',
        isDefaultExport: true,
        isTypeScript: false,
        packageName: 'my-app',
      },
    ],
    [
      'format-relative',
      {
        filePath: 'addon/helpers/format-relative.ts',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'ember-intl',
      },
    ],
    [
      'format-relative-time',
      {
        filePath: 'addon/helpers/format-relative-time.ts',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'ember-intl',
      },
    ],
    [
      'format-time',
      {
        filePath: 'addon/helpers/format-time.ts',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'ember-intl',
      },
    ],
    [
      'get',
      {
        filePath: '.',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: true,
        packageName: '@ember/helper',
      },
    ],
    [
      'hash',
      {
        filePath: '.',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: true,
        packageName: '@ember/helper',
      },
    ],
    [
      'height',
      {
        filePath: 'dist/helpers/height.js',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: false,
        packageName: 'ember-container-query',
      },
    ],
    [
      'htmlSafe',
      {
        filePath: '.',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: true,
        packageName: '@ember/template',
      },
    ],
    [
      't',
      {
        filePath: 'addon/helpers/t.ts',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'ember-intl',
      },
    ],
    [
      'unique-id',
      {
        filePath: '.',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: true,
        packageName: '@ember/helper',
      },
    ],
    [
      'width',
      {
        filePath: 'dist/helpers/width.js',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: false,
        packageName: 'ember-container-query',
      },
    ],
  ]),
  modifiers: new Map([
    [
      'autofocus',
      {
        filePath: 'src/modifiers/autofocus.ts',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'my-addon',
      },
    ],
    [
      'container-query',
      {
        filePath: 'dist/modifiers/container-query.js',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: false,
        packageName: 'ember-container-query',
      },
    ],
    [
      'on',
      {
        filePath: '.',
        filePathAlias: '.',
        isDefaultExport: false,
        isTypeScript: true,
        packageName: '@ember/modifier',
      },
    ],
  ]),
};
