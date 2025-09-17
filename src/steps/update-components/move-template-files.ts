import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import {
  findTemplateTags,
  replaceTemplateTag,
  type TemplateTag,
} from '@codemod-utils/ast-template-tag';
import { removeFiles } from '@codemod-utils/files';

import type { FilesCached, Packages } from '../../types/index.js';

export function moveTemplateFiles(
  packages: Packages,
  filesCached: FilesCached,
): void {
  for (const [, packageData] of packages) {
    const { filesWithHBS, filesWithTemplateTag, packageRoot } = packageData;

    filesWithHBS.components.forEach((templateFilePath) => {
      const classFilePathGjs = templateFilePath.replace(/\.hbs$/, '.gjs');
      const classFilePathGts = templateFilePath.replace(/\.hbs$/, '.gts');

      let classFile: string;
      let classFilePath: string;

      if (filesCached.has(classFilePathGjs)) {
        classFile = filesCached.get(classFilePathGjs)!;
        classFilePath = classFilePathGjs;
      } else if (filesCached.has(classFilePathGts)) {
        classFile = filesCached.get(classFilePathGts)!;
        classFilePath = classFilePathGts;
      } else {
        classFile = '<template></template>\n';
        classFilePath = classFilePathGjs;
      }

      const templateTags = findTemplateTags(classFile) as [TemplateTag];

      const templateFile = readFileSync(
        join(packageRoot, templateFilePath),
        'utf8',
      );

      classFile = replaceTemplateTag(classFile, {
        code: `<template>\n${templateFile}\n</template>`,
        range: templateTags[0].range,
      });

      writeFileSync(join(packageRoot, classFilePath), classFile, 'utf8');
      filesCached.set(join(packageRoot, classFilePath), classFile);

      filesWithTemplateTag.components.push(classFilePath);
    });

    removeFiles(filesWithHBS.components, {
      projectRoot: packageRoot,
    });
  }
}
