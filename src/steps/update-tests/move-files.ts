import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { removeFiles } from '@codemod-utils/files';

import type { Packages } from '../../types/index.js';
import { insertTemplateTag } from '../../utils/update-tests/index.js';

export function moveFiles(packages: Packages): void {
  for (const [, packageData] of packages) {
    const {
      filesWithHBS,
      filesWithTemplateTag,
      isEmberSourceRecent,
      packageRoot,
    } = packageData;

    filesWithHBS.tests.forEach((testFilePath) => {
      let testFile = readFileSync(join(packageRoot, testFilePath), 'utf8');
      const isTypeScript = testFilePath.endsWith('.ts');

      testFile = insertTemplateTag(testFile, {
        isTypeScript,
        useLexicalThis: isEmberSourceRecent,
      });

      testFilePath = isTypeScript
        ? testFilePath.replace(/\.ts$/, '.gts')
        : testFilePath.replace(/\.js$/, '.gjs');

      writeFileSync(join(packageRoot, testFilePath), testFile, 'utf8');

      filesWithTemplateTag.tests.push(testFilePath);
    });

    removeFiles(filesWithHBS.tests, {
      projectRoot: packageRoot,
    });
  }
}
