import { join } from 'node:path';

import { findFiles, parseFilePath } from '@codemod-utils/files';
import { getPackageType, readPackageJson } from '@codemod-utils/package-json';

import type { Dependencies, Options } from '../../types/index.js';
import { analyzeEmberPackage } from './analyze-ember-package.js';
import { ignoreEmberPackage } from './ignore-ember-package.js';

function getExternalPackageRoots(options: Options): string[] {
  const { projectRoot } = options;

  const filePaths = findFiles('**/node_modules/**/package.json', {
    projectRoot,
  });

  const packageRoots = filePaths.map((filePath) => {
    const { dir } = parseFilePath(filePath);

    return join(projectRoot, dir);
  });

  return packageRoots;
}

export function analyzeExternalDependencies(options: Options): Dependencies {
  const packageRoots = getExternalPackageRoots(options);
  const dependencies: Dependencies = new Map();

  packageRoots.forEach((packageRoot) => {
    const packageJson = readPackageJson({ projectRoot: packageRoot });
    const packageName = packageJson['name'];

    if (!packageName || dependencies.has(packageName)) {
      return;
    }

    const packageType = getPackageType(packageJson);

    if (packageType !== 'v1-addon' && packageType !== 'v2-addon') {
      return;
    }

    const entities = analyzeEmberPackage({
      componentStructure: 'flat' as const,
      isExternal: true,
      packageName,
      packageRoot,
      packageType,
    });

    if (ignoreEmberPackage(entities)) {
      return;
    }

    dependencies.set(packageName, {
      entities,
      packageRoot,
      packageType,
    });
  });

  return new Map([...dependencies].sort());
}
