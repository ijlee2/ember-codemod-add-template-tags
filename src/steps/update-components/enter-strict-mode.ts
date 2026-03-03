import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { updateJavaScript } from '@codemod-utils/ast-template-tag';

import type { AllEntities, Packages } from '../../types/index.js';
import {
  removeImport,
  updateInvocations,
} from '../../utils/update-template/index.js';

export function enterStrictMode(
  packages: Packages,
  entities: AllEntities,
): void {
  for (const [, packageData] of packages) {
    const { filesWithTemplateTag, packageRoot } = packageData;

    filesWithTemplateTag.components.forEach((filePath) => {
      const oldFile = readFileSync(join(packageRoot, filePath), 'utf8');
      const isTypeScript = filePath.endsWith('.gts');

      let newFile = updateJavaScript(oldFile, (code) => {
        return removeImport(code, {
          importKind: 'value',
          importName: 'templateOnlyComponent',
          importPath: '@ember/component/template-only',
          isDefaultImport: true,
          isTypeScript,
        });
      });

      newFile = updateInvocations(newFile, {
        entities,
      });

      writeFileSync(join(packageRoot, filePath), newFile, 'utf8');
    });
  }
}
