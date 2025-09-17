import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { updateJavaScript } from '@codemod-utils/ast-template-tag';
import { doubleColonize } from '@codemod-utils/ember';

import type { AllEntities, Entities, Packages } from '../../types/index.js';
import {
  removeTemplateOnlyComponentImport,
  updateTemplateTagFile,
} from '../../utils/update-components/index.js';

export function enterStrictMode(
  packages: Packages,
  entities: AllEntities,
): void {
  const componentsDoubleColonized: Entities = new Map();

  for (const [entityName, entity] of entities.components) {
    componentsDoubleColonized.set(doubleColonize(entityName), entity);
  }

  for (const [, packageData] of packages) {
    const { filesWithTemplateTag, packageRoot } = packageData;

    filesWithTemplateTag.components.forEach((filePath) => {
      const oldFile = readFileSync(join(packageRoot, filePath), 'utf8');

      let newFile = updateJavaScript(oldFile, (code) => {
        return removeTemplateOnlyComponentImport(code, {
          isTypeScript: filePath.endsWith('.gts'),
        });
      });

      newFile = updateTemplateTagFile(newFile, {
        componentsDoubleColonized,
        entities,
      });

      writeFileSync(join(packageRoot, filePath), newFile, 'utf8');
    });
  }
}
