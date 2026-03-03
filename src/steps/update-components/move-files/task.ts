import { readFileSync, writeFileSync } from 'node:fs';
import { EOL } from 'node:os';
import { join } from 'node:path';

import {
  findTemplateTags,
  replaceTemplateTag,
  type TemplateTag,
} from '@codemod-utils/ast-template-tag';
import { removeFiles } from '@codemod-utils/files';

import type { PackageData } from '../../../types/index.js';
import { insertTemplateTag } from '../../../utils/update-components/index.js';

export function task(
  templateFilePath: string,
  classFilePath: string | undefined,
  packageData: PackageData,
): void {
  const { filesWithTemplateTag, packageRoot } = packageData;

  const filePathsToRemove: string[] = [templateFilePath];

  let classFile: string;

  if (classFilePath) {
    filePathsToRemove.push(classFilePath);
    classFile = readFileSync(join(packageRoot, classFilePath), 'utf8');
  } else {
    // If a component consists of *.hbs only
    classFilePath = templateFilePath.replace(/\.hbs$/, '.js');
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

  removeFiles(filePathsToRemove, {
    projectRoot: packageRoot,
  });
}
