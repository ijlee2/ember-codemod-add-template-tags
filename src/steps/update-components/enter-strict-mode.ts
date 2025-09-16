import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { doubleColonize } from '@codemod-utils/ember';

import type { AllEntities, Packages } from '../../types/index.js';
import { updateTemplateTagFile } from '../../utils/update-components/index.js';

export function enterStrictMode(
  packages: Packages,
  entities: AllEntities,
): void {
  const componentsDoubleColonized = new Set<string>();

  for (const [entityName] of entities.components) {
    componentsDoubleColonized.add(doubleColonize(entityName));
  }

  for (const [, packageData] of packages) {
    const { filesWithTemplateTag, packageRoot } = packageData;

    filesWithTemplateTag.components.forEach((filePath) => {
      const oldFile = readFileSync(join(packageRoot, filePath), 'utf8');

      const newFile = updateTemplateTagFile(oldFile, {
        componentsDoubleColonized,
        entities,
      });

      writeFileSync(join(packageRoot, filePath), newFile, 'utf8');
    });
  }
}
