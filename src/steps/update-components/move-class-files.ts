import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { findFiles, removeFiles } from '@codemod-utils/files';

import type { FilesCached, Packages } from '../../types/index.js';
import { SOURCE_FOR_INTERNAL_PACKAGES } from '../../utils/ember.js';
import { insertTemplateTag } from '../../utils/update-components/index.js';

export function moveClassFiles(
  packages: Packages,
  filesCached: FilesCached,
): void {
  for (const [, packageData] of packages) {
    const { packageRoot, packageType } = packageData;

    const source = SOURCE_FOR_INTERNAL_PACKAGES[packageType];

    const classFilePaths = findFiles(`${source}/components/**/*.{js,ts}`, {
      ignoreList: ['**/*.d.ts'],
      projectRoot: packageRoot,
    });

    classFilePaths.forEach((classFilePath) => {
      const classFile = readFileSync(join(packageRoot, classFilePath), 'utf8');
      const isTypeScript = classFilePath.endsWith('.ts');

      const newFilePath = isTypeScript
        ? classFilePath.replace(/\.ts$/, '.gts')
        : classFilePath.replace(/\.js$/, '.gjs');

      const newFile = insertTemplateTag(classFile, {
        isTypeScript,
      });

      writeFileSync(join(packageRoot, newFilePath), newFile, 'utf8');
      filesCached.set(join(packageRoot, newFilePath), newFile);
    });

    removeFiles(classFilePaths, {
      projectRoot: packageRoot,
    });
  }
}
