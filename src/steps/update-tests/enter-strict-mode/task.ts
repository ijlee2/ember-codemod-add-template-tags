import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { updateJavaScript } from '@codemod-utils/ast-template-tag';

import type { AllEntities } from '../../../types/index.js';
import {
  removeImport,
  updateInvocations,
} from '../../../utils/update-template/index.js';

export function task(
  filePath: string,
  packageRoot: string,
  entities: AllEntities,
): void {
  const oldFile = readFileSync(join(packageRoot, filePath), 'utf8');
  const isTypeScript = filePath.endsWith('.gts');

  let newFile = updateJavaScript(oldFile, (code) => {
    return removeImport(code, {
      importKind: 'value',
      importName: 'hbs',
      importPath: 'ember-cli-htmlbars',
      isDefaultImport: false,
      isTypeScript,
    });
  });

  newFile = updateInvocations(newFile, {
    entities,
  });

  writeFileSync(join(packageRoot, filePath), newFile, 'utf8');
}
