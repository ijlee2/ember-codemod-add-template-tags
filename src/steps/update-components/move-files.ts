import { readFileSync, writeFileSync } from 'node:fs';
import { EOL } from 'node:os';
import { join } from 'node:path';

import {
  findTemplateTags,
  replaceTemplateTag,
  type TemplateTag,
} from '@codemod-utils/ast-template-tag';
import { findFiles, removeFiles } from '@codemod-utils/files';

import type { Packages } from '../../types/index.js';
import { SOURCE_FOR_INTERNAL_PACKAGES } from '../../utils/ember.js';
import { insertTemplateTag } from '../../utils/update-components/index.js';

export function moveFiles(packages: Packages): void {
  for (const [, packageData] of packages) {
    const { filesWithHBS, filesWithTemplateTag, packageRoot, packageType } =
      packageData;

    const source = SOURCE_FOR_INTERNAL_PACKAGES[packageType];

    const classFilePaths = new Set(
      findFiles(`${source}/components/**/*.{js,ts}`, {
        ignoreList: ['**/*.d.ts'],
        projectRoot: packageRoot,
      }),
    );

    const classFilePathsToRemove: string[] = [];

    filesWithHBS.components.forEach((templateFilePath) => {
      const classFilePathJs = templateFilePath.replace(/\.hbs$/, '.js');
      const classFilePathTs = templateFilePath.replace(/\.hbs$/, '.ts');

      let classFilePath: string;
      let classFile: string;

      if (classFilePaths.has(classFilePathJs)) {
        classFilePath = classFilePathJs;
        classFile = readFileSync(join(packageRoot, classFilePath), 'utf8');
        classFilePathsToRemove.push(classFilePath);
      } else if (classFilePaths.has(classFilePathTs)) {
        classFilePath = classFilePathTs;
        classFile = readFileSync(join(packageRoot, classFilePath), 'utf8');
        classFilePathsToRemove.push(classFilePath);
      } else {
        // If a component consists of *.hbs only
        classFilePath = classFilePathJs;
        classFile = [
          `import templateOnlyComponent from '@ember/component/template-only';`,
          ``,
          `export default templateOnlyComponent();`,
          ``,
        ].join(EOL);
      }

      const isTypeScript = classFilePath.endsWith('.ts');

      classFilePath = isTypeScript
        ? classFilePath.replace(/\.ts$/, '.gts')
        : classFilePath.replace(/\.js$/, '.gjs');

      classFile = insertTemplateTag(classFile, {
        isTypeScript,
      })!;

      const templateTags = findTemplateTags(classFile) as [TemplateTag];

      const templateFile = readFileSync(
        join(packageRoot, templateFilePath),
        'utf8',
      );

      classFile = replaceTemplateTag(classFile, {
        code: [`<template>`, templateFile, `</template>`].join(EOL),
        range: templateTags[0].range,
      });

      writeFileSync(join(packageRoot, classFilePath), classFile, 'utf8');

      filesWithTemplateTag.components.push(classFilePath);
    });

    removeFiles(filesWithHBS.components, {
      projectRoot: packageRoot,
    });

    removeFiles(classFilePathsToRemove, {
      projectRoot: packageRoot,
    });
  }
}
