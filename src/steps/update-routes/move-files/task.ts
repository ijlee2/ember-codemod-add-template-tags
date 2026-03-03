import { readFileSync, writeFileSync } from 'node:fs';
import { EOL } from 'node:os';
import { join } from 'node:path';

import { removeFiles } from '@codemod-utils/files';

import type { PackageData } from '../../../types/index.js';

export function task(
  templateFilePath: string,
  classFilePath: string,
  packageData: PackageData,
): void {
  const { filesWithTemplateTag, hasEmberRouteTemplate, packageRoot } =
    packageData;

  const filePathsToRemove: string[] = [templateFilePath];

  const templateFile = readFileSync(
    join(packageRoot, templateFilePath),
    'utf8',
  );

  let classFile = [`<template>`, templateFile, `</template>`].join(EOL);

  if (hasEmberRouteTemplate) {
    classFile = [
      `import RouteTemplate from 'ember-route-template';`,
      ``,
      `export default RouteTemplate(${classFile});`,
    ].join(EOL);
  }

  classFile += EOL;

  writeFileSync(join(packageRoot, classFilePath), classFile, 'utf8');

  filesWithTemplateTag.routes.push(classFilePath);

  removeFiles(filePathsToRemove, {
    projectRoot: packageRoot,
  });
}
