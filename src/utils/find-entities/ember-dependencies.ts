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
            'textarea',
            {
              filePath: '.',
              filePathAlias: '.',
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
              filePathAlias: '.',
              isDefaultExport: false,
              isTypeScript: true,
              packageName: '@ember/helper',
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
            'unique-id',
            {
              filePath: '.',
              filePathAlias: '.',
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
              filePathAlias: '.',
              isDefaultExport: false,
              isTypeScript: true,
              packageName: '@ember/modifier',
            },
          ],
        ]),
      },
      packageRoot: '',
      packageType: 'v2-addon',
    },
  ],
]);
