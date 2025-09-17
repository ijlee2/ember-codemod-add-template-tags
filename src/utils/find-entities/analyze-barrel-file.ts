import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { findFiles } from '@codemod-utils/files';

import type { PackageType } from '../../types/index.js';
import { SOURCE_FOR_EXTERNAL_PACKAGES } from '../ember.js';

export function analyzeBarrelFile({
  packageRoot,
  packageType,
}: {
  packageRoot: string;
  packageType: PackageType;
}) {
  if (packageType !== 'v1-addon' && packageType !== 'v2-addon') {
    return;
  }

  const source = SOURCE_FOR_EXTERNAL_PACKAGES[packageType];

  const barrelFilePaths = findFiles(`${source}/index.{js,ts}`, {
    ignoreList: ['**/*.d.ts'],
    projectRoot: packageRoot,
  });

  if (barrelFilePaths.length !== 1) {
    return;
  }

  const barrelFilePath = barrelFilePaths[0]!;
  const barrelFile = readFileSync(join(packageRoot, barrelFilePath), 'utf8');

  return barrelFile;
}
