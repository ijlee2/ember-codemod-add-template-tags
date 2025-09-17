import {
  findTemplateTags,
  replaceTemplateTag,
  type TemplateTag,
} from '@codemod-utils/ast-template-tag';

import type { AllEntities, Entities } from '../../types/index.js';
import { ImportStatements, updateTemplate } from '../update-template/index.js';

type Data = {
  componentsDoubleColonized: Entities;
  entities: AllEntities;
};

export function updateTemplateTagFile(file: string, data: Data): string {
  const templateTags = findTemplateTags(file) as [TemplateTag];
  const importStatements = new ImportStatements();

  const { contents, range } = templateTags[0];
  const template = updateTemplate(contents, importStatements, data);

  file = replaceTemplateTag(file, {
    code: `<template>${template}</template>`,
    range,
  });

  if (importStatements.exist()) {
    file = `${importStatements.print()}\n\n${file}`;
  }

  return file;
}
