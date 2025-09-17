import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { removeFiles } from '@codemod-utils/files';

import type { FilesCached, Packages } from '../../types/index.js';

export function moveTemplateFiles(
  packages: Packages,
  filesCached: FilesCached,
): void {
  for (const [packageName, packageData] of packages) {
    const {
      filesWithHBS,
      filesWithTemplateTag,
      hasEmberRouteTemplate,
      isEmberSourceRecent,
      packageRoot,
    } = packageData;

    if (!isEmberSourceRecent && !hasEmberRouteTemplate) {
      console.warn(
        `WARNING: You need to install \`ember-route-template\` in \`${packageName}\`.`,
      );
    }

    filesWithHBS.routes.forEach((templateFilePath) => {
      const classFilePath = templateFilePath.replace(/\.hbs$/, '.gjs');

      const templateFile = readFileSync(
        join(packageRoot, templateFilePath),
        'utf8',
      );

      let classFile = `<template>\n${templateFile}\n</template>`;

      if (!isEmberSourceRecent && hasEmberRouteTemplate) {
        classFile = [
          `import RouteTemplate from 'ember-route-template';`,
          ``,
          `export default RouteTemplate(${classFile});`,
        ].join('\n');
      }

      classFile += '\n';

      writeFileSync(join(packageRoot, classFilePath), classFile, 'utf8');
      filesCached.set(join(packageRoot, classFilePath), classFile);

      filesWithTemplateTag.routes.push(classFilePath);
    });

    removeFiles(filesWithHBS.routes, {
      projectRoot: packageRoot,
    });
  }
}
