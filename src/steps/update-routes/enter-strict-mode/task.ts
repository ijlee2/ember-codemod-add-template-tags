import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import type { AllEntities } from '../../../types/index.js';
import { renameThis } from '../../../utils/update-routes/rename-this.js';
import { updateInvocations } from '../../../utils/update-template/index.js';

export function task(
  filePath: string,
  packageRoot: string,
  entities: AllEntities,
): void {
  const oldFile = readFileSync(join(packageRoot, filePath), 'utf8');

  let newFile = renameThis(oldFile);

  newFile = updateInvocations(newFile, {
    entities,
  });

  writeFileSync(join(packageRoot, filePath), newFile, 'utf8');
}
