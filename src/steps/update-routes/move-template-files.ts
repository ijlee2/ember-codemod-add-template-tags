import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { removeFiles } from '@codemod-utils/files';

import type { Packages } from '../../types/index.js';

export function moveTemplateFiles(packages: Packages): void {
  for (const [, packageData] of packages) {
    const { filesWithHBS, filesWithTemplateTag, packageRoot } = packageData;

    filesWithHBS.routes.forEach((templateFilePath) => {
      const classFilePath = templateFilePath.replace(/\.hbs$/, '.gjs');

      const templateFile = readFileSync(
        join(packageRoot, templateFilePath),
        'utf8',
      );

      let classFile = `<template>\n${templateFile}\n</template>`;

      classFile += '\n';

      writeFileSync(join(packageRoot, classFilePath), classFile, 'utf8');

      filesWithTemplateTag.routes.push(classFilePath);
    });

    removeFiles(filesWithHBS.routes, {
      projectRoot: packageRoot,
    });
  }
}
