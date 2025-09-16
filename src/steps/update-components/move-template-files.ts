import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import {
  findTemplateTags,
  replaceTemplateTag,
  type TemplateTag,
} from '@codemod-utils/ast-template-tag';
import { findFiles, removeFiles } from '@codemod-utils/files';

import type { Packages } from '../../types/index.js';
import { SOURCE_FOR_INTERNAL_PACKAGES } from '../../utils/ember.js';

export function moveTemplateFiles(packages: Packages): void {
  for (const [, packageData] of packages) {
    const { filesWithHBS, filesWithTemplateTag, packageRoot, packageType } =
      packageData;

    const source = SOURCE_FOR_INTERNAL_PACKAGES[packageType];

    const classFilePaths = findFiles(`${source}/components/**/*.{gjs,gts}`, {
      projectRoot: packageRoot,
    });

    const classFilePathSet = new Set(classFilePaths);

    filesWithHBS.components.forEach((templateFilePath) => {
      const classFilePathGjs = templateFilePath.replace(/\.hbs$/, '.gjs');
      const classFilePathGts = templateFilePath.replace(/\.hbs$/, '.gts');

      let classFile: string;
      let classFilePath: string;

      if (classFilePathSet.has(classFilePathGjs)) {
        classFile = readFileSync(join(packageRoot, classFilePathGjs), 'utf8');
        classFilePath = classFilePathGjs;
      } else if (classFilePathSet.has(classFilePathGts)) {
        classFile = readFileSync(join(packageRoot, classFilePathGts), 'utf8');
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

      filesWithTemplateTag.components.push(classFilePath);
    });

    removeFiles(filesWithHBS.components, {
      projectRoot: packageRoot,
    });
  }
}
