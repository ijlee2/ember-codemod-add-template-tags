import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { updateJavaScript } from '@codemod-utils/ast-template-tag';
import { doubleColonize } from '@codemod-utils/ember';

import type { AllEntities, Packages } from '../../types/index.js';
import {
  removeHbsImport,
  updateTemplateTagFile,
} from '../../utils/update-tests/index.js';

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

    filesWithTemplateTag.tests.forEach((filePath) => {
      const oldFile = readFileSync(join(packageRoot, filePath), 'utf8');

      let newFile = updateTemplateTagFile(oldFile, {
        componentsDoubleColonized,
        entities,
      });

      newFile = updateJavaScript(newFile, (code) => {
        return removeHbsImport(code, {
          isTypeScript: filePath.endsWith('.gts'),
        });
      });

      writeFileSync(join(packageRoot, filePath), newFile, 'utf8');
    });
  }
}
