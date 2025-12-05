import { normalize } from 'node:path';

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
        filePath: normalize('dist/components/container-query.js'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: false,
        packageName: 'ember-container-query',
      },
    ],
    [
      'input',
      {
        filePath: normalize('.'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: true,
        packageName: '@ember/component',
      },
    ],
    [
      'link-to',
      {
        filePath: normalize('.'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: true,
        packageName: '@ember/routing',
      },
    ],
    [
      'navigation-menu',
      {
        filePath: normalize('src/components/navigation-menu.ts'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'my-addon',
      },
    ],
    [
      'products/product/card',
      {
        filePath: normalize('app/components/products/product/card.ts'),
        filePathAlias: normalize('components/products/product/card'),
        isDefaultExport: true,
        isTypeScript: true,
        packageName: 'my-app',
      },
    ],
    [
      'products/product/details',
      {
        filePath: normalize('app/components/products/product/details.js'),
        filePathAlias: normalize('components/products/product/details'),
        isDefaultExport: true,
        isTypeScript: false,
        packageName: 'my-app',
      },
    ],
    [
      'products/product/image',
      {
        filePath: normalize('app/components/products/product/image.gts'),
        filePathAlias: normalize('components/products/product/image'),
        isDefaultExport: true,
        isTypeScript: true,
        packageName: 'my-app',
      },
    ],
    [
      'textarea',
      {
        filePath: normalize('.'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: true,
        packageName: '@ember/component',
      },
    ],
    [
      'ui/form',
      {
        filePath: normalize('src/components/ui/form.ts'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'my-addon',
      },
    ],
    [
      'ui/form/checkbox',
      {
        filePath: normalize('src/components/ui/form/checkbox.ts'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'my-addon',
      },
    ],
    [
      'ui/form/field',
      {
        filePath: normalize('src/components/ui/form/field.ts'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'my-addon',
      },
    ],
    [
      'ui/form/information',
      {
        filePath: normalize('src/components/ui/form/information.ts'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'my-addon',
      },
    ],
    [
      'ui/form/input',
      {
        filePath: normalize('src/components/ui/form/input.js'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: false,
        packageName: 'my-addon',
      },
    ],
    [
      'ui/form/number',
      {
        filePath: normalize('src/components/ui/form/number.gts'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'my-addon',
      },
    ],
    [
      'ui/form/select',
      {
        filePath: normalize('src/components/ui/form/select.ts'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'my-addon',
      },
    ],
    [
      'ui/form/textarea',
      {
        filePath: normalize('src/components/ui/form/textarea.gjs'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: false,
        packageName: 'my-addon',
      },
    ],
    [
      'ui/page',
      {
        filePath: normalize('src/components/ui/page.js'),
        filePathAlias: normalize('.'),
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
        filePath: normalize('.'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: true,
        packageName: '@ember/helper',
      },
    ],
    [
      'aspect-ratio',
      {
        filePath: normalize('dist/helpers/aspect-ratio.js'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: false,
        packageName: 'ember-container-query',
      },
    ],
    [
      'concat',
      {
        filePath: normalize('.'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: true,
        packageName: '@ember/helper',
      },
    ],
    [
      'ensure-safe-component',
      {
        filePath: normalize('.'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: false,
        packageName: '@embroider/util',
      },
    ],
    [
      'experiment',
      {
        filePath: normalize('app/helpers/experiment.ts'),
        filePathAlias: normalize('helpers/experiment'),
        isDefaultExport: true,
        isTypeScript: true,
        packageName: 'my-app',
      },
    ],
    [
      'fn',
      {
        filePath: normalize('.'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: true,
        packageName: '@ember/helper',
      },
    ],
    [
      'format-date',
      {
        filePath: normalize('addon/helpers/format-date.ts'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'ember-intl',
      },
    ],
    [
      'format-date-range',
      {
        filePath: normalize('addon/helpers/format-date-range.ts'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'ember-intl',
      },
    ],
    [
      'format-list',
      {
        filePath: normalize('addon/helpers/format-list.ts'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'ember-intl',
      },
    ],
    [
      'format-message',
      {
        filePath: normalize('addon/helpers/format-message.ts'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'ember-intl',
      },
    ],
    [
      'format-number',
      {
        filePath: normalize('addon/helpers/format-number.ts'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'ember-intl',
      },
    ],
    [
      'format-price',
      {
        filePath: normalize('app/helpers/format-price.js'),
        filePathAlias: normalize('helpers/format-price'),
        isDefaultExport: true,
        isTypeScript: false,
        packageName: 'my-app',
      },
    ],
    [
      'format-relative',
      {
        filePath: normalize('addon/helpers/format-relative.ts'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'ember-intl',
      },
    ],
    [
      'format-relative-time',
      {
        filePath: normalize('addon/helpers/format-relative-time.ts'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'ember-intl',
      },
    ],
    [
      'format-time',
      {
        filePath: normalize('addon/helpers/format-time.ts'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'ember-intl',
      },
    ],
    [
      'get',
      {
        filePath: normalize('.'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: true,
        packageName: '@ember/helper',
      },
    ],
    [
      'hash',
      {
        filePath: normalize('.'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: true,
        packageName: '@ember/helper',
      },
    ],
    [
      'height',
      {
        filePath: normalize('dist/helpers/height.js'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: false,
        packageName: 'ember-container-query',
      },
    ],
    [
      'htmlSafe',
      {
        filePath: normalize('.'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: true,
        packageName: '@ember/template',
      },
    ],
    [
      't',
      {
        filePath: normalize('addon/helpers/t.ts'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'ember-intl',
      },
    ],
    [
      'unique-id',
      {
        filePath: normalize('.'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: true,
        packageName: '@ember/helper',
      },
    ],
    [
      'width',
      {
        filePath: normalize('dist/helpers/width.js'),
        filePathAlias: normalize('.'),
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
        filePath: normalize('src/modifiers/autofocus.ts'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: true,
        packageName: 'my-addon',
      },
    ],
    [
      'container-query',
      {
        filePath: normalize('dist/modifiers/container-query.js'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: false,
        packageName: 'ember-container-query',
      },
    ],
    [
      'on',
      {
        filePath: normalize('.'),
        filePathAlias: normalize('.'),
        isDefaultExport: false,
        isTypeScript: true,
        packageName: '@ember/modifier',
      },
    ],
  ]),
};
