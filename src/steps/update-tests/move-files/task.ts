import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { removeFiles } from '@codemod-utils/files';

import type { PackageData } from '../../../types/index.js';
import { insertTemplateTag } from '../../../utils/update-tests/index.js';

export function task(testFilePath: string, packageData: PackageData): void {
  const { filesWithTemplateTag, packageRoot } = packageData;

  const filePathsToRemove: string[] = [testFilePath];

  let testFile = readFileSync(join(packageRoot, testFilePath), 'utf8');
  const isTypeScript = testFilePath.endsWith('.ts');

  testFile = insertTemplateTag(testFile, {
    isTypeScript,
    useLexicalThis: false,
  });

  testFilePath = isTypeScript
    ? testFilePath.replace(/\.ts$/, '.gts')
    : testFilePath.replace(/\.js$/, '.gjs');

  writeFileSync(join(packageRoot, testFilePath), testFile, 'utf8');

  filesWithTemplateTag.tests.push(testFilePath);

  removeFiles(filePathsToRemove, {
    projectRoot: packageRoot,
  });
}
