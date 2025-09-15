import {
  findTemplateTags,
  replaceTemplateTag,
} from '@codemod-utils/ast-template-tag';

import type { AllEntities, Entities } from '../../types/index.js';
import { ImportStatements, updateTemplate } from '../update-template/index.js';

type Data = {
  componentsDoubleColonized: Entities;
  entities: AllEntities;
};

export function updateTemplateTagFile(file: string, data: Data): string {
  const templateTags = findTemplateTags(file);
  const importStatements = new ImportStatements();

  templateTags.reverse().forEach(({ contents, range }) => {
    const template = updateTemplate(contents, importStatements, data);

    file = replaceTemplateTag(file, {
      code: `<template>${template}</template>`,
      range,
    });
  });

  if (importStatements.exist()) {
    file = `${importStatements.print()}\n${file}`;
  }

  return file;
}
