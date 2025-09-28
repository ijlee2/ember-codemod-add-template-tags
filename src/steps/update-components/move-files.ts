import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { findFiles, removeFiles } from '@codemod-utils/files';

import type { Packages } from '../../types/index.js';
import { SOURCE_FOR_INTERNAL_PACKAGES } from '../../utils/ember.js';
import { insertTemplateTag } from '../../utils/update-components/index.js';

export function moveFiles(packages: Packages): void {
  for (const [, packageData] of packages) {
    const { filesWithHBS, packageRoot, packageType } = packageData;

    const source = SOURCE_FOR_INTERNAL_PACKAGES[packageType];

    const classFilePaths = findFiles(`${source}/components/**/*.{js,ts}`, {
      ignoreList: ['**/*.d.ts'],
      projectRoot: packageRoot,
    });

    const classFilePathSet = new Set(classFilePaths);
    const classFilePathsToRemove: string[] = [];

    filesWithHBS.components.forEach((templateFilePath) => {
      const classFilePathJs = templateFilePath.replace(/\.hbs$/, '.js');
      const classFilePathTs = templateFilePath.replace(/\.hbs$/, '.ts');

      let classFilePath: string | undefined;

      if (classFilePathSet.has(classFilePathJs)) {
        classFilePath = classFilePathJs;
      } else if (classFilePathSet.has(classFilePathTs)) {
        classFilePath = classFilePathTs;
      }

      if (!classFilePath) {
        return;
      }

      const classFile = readFileSync(join(packageRoot, classFilePath), 'utf8');
      const isTypeScript = classFilePath.endsWith('.ts');

      const newFilePath = isTypeScript
        ? classFilePath.replace(/\.ts$/, '.gts')
        : classFilePath.replace(/\.js$/, '.gjs');

      const newFile = insertTemplateTag(classFile, {
        isTypeScript,
      });

      if (!newFile) {
        return;
      }

      classFilePathsToRemove.push(classFilePath);
      writeFileSync(join(packageRoot, newFilePath), newFile, 'utf8');
    });

    removeFiles(classFilePathsToRemove, {
      projectRoot: packageRoot,
    });
  }
}
