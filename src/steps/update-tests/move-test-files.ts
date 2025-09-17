import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { removeFiles } from '@codemod-utils/files';

import type { FilesCached, Packages } from '../../types/index.js';
import { insertTemplateTag } from '../../utils/update-tests/index.js';

export function moveTestFiles(
  packages: Packages,
  filesCached: FilesCached,
): void {
  for (const [, packageData] of packages) {
    const {
      filesWithHBS,
      filesWithTemplateTag,
      isEmberSourceRecent,
      packageRoot,
    } = packageData;

    filesWithHBS.tests.forEach((filePath) => {
      const oldFile = readFileSync(join(packageRoot, filePath), 'utf8');
      const isTypeScript = filePath.endsWith('.ts');

      const testFile = insertTemplateTag(oldFile, {
        isTypeScript,
        useLexicalThis: isEmberSourceRecent,
      });

      const newFilePath = isTypeScript
        ? filePath.replace(/\.ts$/, '.gts')
        : filePath.replace(/\.js$/, '.gjs');

      writeFileSync(join(packageRoot, newFilePath), testFile, 'utf8');
      filesCached.set(join(packageRoot, newFilePath), testFile);

      filesWithTemplateTag.tests.push(newFilePath);
    });

    removeFiles(filesWithHBS.tests, {
      projectRoot: packageRoot,
    });
  }
}
