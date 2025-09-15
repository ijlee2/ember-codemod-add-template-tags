import type { Dependencies } from '../../types/index.js';

export const emberDependencies: Dependencies = new Map([
  [
    'ember-source',
    {
      entities: {
        components: new Map([
          [
            'input',
            {
              filePath: '.',
              isDefaultExport: true,
              isTypeScript: true,
              packageName: '@ember/component',
            },
          ],
          [
            'link-to',
            {
              filePath: '.',
              isDefaultExport: true,
              isTypeScript: true,
              packageName: '@ember/routing',
            },
          ],
          [
            'textarea',
            {
              filePath: '.',
              isDefaultExport: true,
              isTypeScript: true,
              packageName: '@ember/component',
            },
          ],
        ]),
        helpers: new Map([
          [
            'array',
            {
              filePath: '.',
              isDefaultExport: false,
              isTypeScript: true,
              packageName: '@ember/helper',
            },
          ],
          [
            'concat',
            {
              filePath: '.',
              isDefaultExport: false,
              isTypeScript: true,
              packageName: '@ember/helper',
            },
          ],
          [
            'fn',
            {
              filePath: '.',
              isDefaultExport: false,
              isTypeScript: true,
              packageName: '@ember/helper',
            },
          ],
          [
            'get',
            {
              filePath: '.',
              isDefaultExport: false,
              isTypeScript: true,
              packageName: '@ember/helper',
            },
          ],
          [
            'hash',
            {
              filePath: '.',
              isDefaultExport: false,
              isTypeScript: true,
              packageName: '@ember/helper',
            },
          ],
          [
            'htmlSafe',
            {
              filePath: '.',
              isDefaultExport: false,
              isTypeScript: true,
              packageName: '@ember/template',
            },
          ],
          [
            'unique-id',
            {
              filePath: '.',
              isDefaultExport: false,
              isTypeScript: true,
              packageName: '@ember/helper',
            },
          ],
        ]),
        modifiers: new Map([
          [
            'on',
            {
              filePath: '.',
              isDefaultExport: false,
              isTypeScript: true,
              packageName: '@ember/modifier',
            },
          ],
        ]),
        services: new Map(),
      },
      packageRoot: '',
      packageType: 'v2-addon',
    },
  ],
]);
