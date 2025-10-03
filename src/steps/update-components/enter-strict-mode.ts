import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { updateJavaScript } from '@codemod-utils/ast-template-tag';
import { doubleColonize } from '@codemod-utils/ember';

import type { AllEntities, Entities, Packages } from '../../types/index.js';
import { removeGlintRegistry } from '../../utils/update-components/index.js';
import {
  removeImport,
  updateInvocations,
} from '../../utils/update-template/index.js';

export function enterStrictMode(
  packages: Packages,
  entities: AllEntities,
): void {
  const componentsDoubleColonized: Entities = new Map();

  for (const [entityName, entity] of entities.components) {
    componentsDoubleColonized.set(doubleColonize(entityName), entity);
  }

  for (const [, packageData] of packages) {
    const { filesWithTemplateTag, packageRoot, packageType } = packageData;

    filesWithTemplateTag.components.forEach((filePath) => {
      const oldFile = readFileSync(join(packageRoot, filePath), 'utf8');
      const isTypeScript = filePath.endsWith('.gts');

      let newFile = updateJavaScript(oldFile, (code) => {
        code = removeImport(code, {
          importKind: 'value',
          importName: 'templateOnlyComponent',
          importPath: '@ember/component/template-only',
          isDefaultImport: true,
          isTypeScript,
        });

        code = removeGlintRegistry(code, {
          isTypeScript,
          packageType,
        });

        return code;
      });

      newFile = updateInvocations(newFile, {
        componentsDoubleColonized,
        entities,
      });

      writeFileSync(join(packageRoot, filePath), newFile, 'utf8');
    });
  }
}
