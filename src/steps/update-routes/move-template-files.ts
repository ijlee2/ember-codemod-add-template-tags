import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { removeFiles } from '@codemod-utils/files';

import type { Packages } from '../../types/index.js';

export function moveTemplateFiles(packages: Packages): void {
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
        `WARNING: You need to install \`ember-route-template\` in \`${packageName}\`. Ember natively supports \`<template>\` tags in routes starting with v6.3.0.`,
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

      filesWithTemplateTag.routes.push(classFilePath);
    });

    removeFiles(filesWithHBS.routes, {
      projectRoot: packageRoot,
    });
  }
}
