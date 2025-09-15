import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { findFiles, removeFiles } from '@codemod-utils/files';

import type { Packages } from '../../types/index.js';
import { SOURCE_FOR_INTERNAL_PACKAGES } from '../../utils/ember.js';
import { insertTemplateTag } from '../../utils/update-components/index.js';

export function moveClassFiles(packages: Packages): void {
  for (const [, packageData] of packages) {
    const { filesWithHBS, packageRoot, packageType } = packageData;

    const source = SOURCE_FOR_INTERNAL_PACKAGES[packageType];

    const classFilePaths = findFiles(`${source}/components/**/*.{js,ts}`, {
      ignoreList: ['**/*.d.ts'],
      projectRoot: packageRoot,
    });

    const classFilePathSet = new Set(classFilePaths);

    // Add the class file to template-only components if missing
    filesWithHBS.components.forEach((templateFilePath) => {
      const classFilePathJs = templateFilePath.replace(/\.hbs$/, '.js');
      const classFilePathTs = templateFilePath.replace(/\.hbs$/, '.ts');

      if (
        classFilePathSet.has(classFilePathJs) ||
        classFilePathSet.has(classFilePathTs)
      ) {
        return;
      }

      const newFilePath = templateFilePath.replace(/\.hbs$/, '.gjs');

      const newFile = '<template></template>\n';

      writeFileSync(join(packageRoot, newFilePath), newFile, 'utf8');
    });

    classFilePaths.forEach((classFilePath) => {
      const classFile = readFileSync(join(packageRoot, classFilePath), 'utf8');

      const newFilePath = classFilePath.endsWith('.js')
        ? classFilePath.replace(/\.js$/, '.gjs')
        : classFilePath.replace(/\.ts$/, '.gts');

      const newFile = insertTemplateTag(classFile);

      writeFileSync(join(packageRoot, newFilePath), newFile, 'utf8');
    });

    removeFiles(classFilePaths, {
      projectRoot: packageRoot,
    });
  }
}
