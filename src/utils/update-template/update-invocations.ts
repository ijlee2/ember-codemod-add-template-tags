import { updateTemplates } from '@codemod-utils/ast-template-tag';

import type { AllEntities, Entities } from '../../types/index.js';
import { ImportStatements } from './import-statements.js';
import { updateTemplate } from './update-invocations/update-template.js';

type Data = {
  componentsDoubleColonized: Entities;
  entities: AllEntities;
};

export function updateInvocations(file: string, data: Data): string {
  const importStatements = new ImportStatements();

  file = updateTemplates(file, (code) => {
    return updateTemplate(code, importStatements, data);
  });

  if (importStatements.exist()) {
    file = `${importStatements.print()}\n\n${file}`;
  }

  return file;
}
