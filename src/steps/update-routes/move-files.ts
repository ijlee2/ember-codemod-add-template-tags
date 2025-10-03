import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { removeFiles } from '@codemod-utils/files';

import type { Packages } from '../../types/index.js';

export function moveFiles(packages: Packages): void {
  for (const [, packageData] of packages) {
    const {
      filesWithHBS,
      filesWithTemplateTag,
      hasEmberRouteTemplate,
      packageRoot,
    } = packageData;

    filesWithHBS.routes.forEach((templateFilePath) => {
      const classFilePath = templateFilePath.replace(/\.hbs$/, '.gjs');

      const templateFile = readFileSync(
        join(packageRoot, templateFilePath),
        'utf8',
      );

      let classFile = `<template>\n${templateFile}\n</template>`;

      if (hasEmberRouteTemplate) {
        classFile = [
          `import RouteTemplate from 'ember-route-template';`,
          ``,
          `export default RouteTemplate(${classFile});`,
        ].join('\n');
      }

      classFile += '\n';

      writeFileSync(join(packageRoot, classFilePath), classFile, 'utf8');

      filesWithTemplateTag.routes.push(classFilePath);
    });

    removeFiles(filesWithHBS.routes, {
      projectRoot: packageRoot,
    });
  }
}
