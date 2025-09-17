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

      const newFilePath = classFilePath.endsWith('.js')
        ? classFilePath.replace(/\.js$/, '.gjs')
        : classFilePath.replace(/\.ts$/, '.gts');

      const newFile = insertTemplateTag(classFile);

      writeFileSync(join(packageRoot, newFilePath), newFile, 'utf8');
      filesCached.set(join(packageRoot, newFilePath), newFile);
    });

    removeFiles(classFilePaths, {
      projectRoot: packageRoot,
    });
  }
}
