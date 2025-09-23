import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { doubleColonize } from '@codemod-utils/ember';

import type { AllEntities, Entities, Packages } from '../../types/index.js';
import { renameThis } from '../../utils/update-routes/rename-this.js';
import { updateInvocations } from '../../utils/update-template/index.js';

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

    filesWithTemplateTag.routes.forEach((filePath) => {
      const oldFile = readFileSync(join(packageRoot, filePath), 'utf8');

      let newFile = renameThis(oldFile);

      newFile = updateInvocations(newFile, {
        componentsDoubleColonized,
        entities,
      });

      writeFileSync(join(packageRoot, filePath), newFile, 'utf8');
    });
  }
}
