import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { findFiles } from '@codemod-utils/files';

import type { PackageType } from '../../types/index.js';
import { SOURCE_FOR_INTERNAL_PACKAGES } from '../ember.js';
import { analyzeComponent } from './analyze-component.js';

export function filterComponents(
  templateFilePaths: string[],
  {
    packageRoot,
    packageType,
  }: {
    packageRoot: string;
    packageType: PackageType;
  },
): string[] {
  const source = SOURCE_FOR_INTERNAL_PACKAGES[packageType];

  const classFilePaths = findFiles(`${source}/components/**/*.{js,ts}`, {
    ignoreList: ['**/*.d.ts'],
    projectRoot: packageRoot,
  });

  const classFilePathSet = new Set(classFilePaths);

  return templateFilePaths.filter((templateFilePath) => {
    const classFilePathJs = templateFilePath.replace(/\.hbs$/, '.js');
    const classFilePathTs = templateFilePath.replace(/\.hbs$/, '.ts');
    let classFile: string | undefined;

    if (classFilePathSet.has(classFilePathJs)) {
      classFile = readFileSync(join(packageRoot, classFilePathJs), 'utf8');
    } else if (classFilePathSet.has(classFilePathTs)) {
      classFile = readFileSync(join(packageRoot, classFilePathTs), 'utf8');
    }

    // Allow template-only components without a backing class
    if (!classFile) {
      return true;
    }

    const { componentType } = analyzeComponent(classFile);

    return componentType === 'glimmer' || componentType === 'template-only';
  });
}
