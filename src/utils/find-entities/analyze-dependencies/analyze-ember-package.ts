import { join, relative } from 'node:path';

import { findFiles, parseFilePath } from '@codemod-utils/files';

import type {
  AllEntities,
  Options,
  PackageType,
} from '../../../types/index.js';
import {
  ENTITY_FOLDERS,
  ENTITY_TYPES,
  SOURCE_FOR_EXTERNAL_PACKAGES,
  SOURCE_FOR_INTERNAL_PACKAGES,
} from '../../ember.js';
import { analyzeBarrelFile } from './analyze-barrel-file.js';

export function analyzeEmberPackage({
  componentStructure,
  isExternal,
  packageName,
  packageRoot,
  packageType,
}: {
  componentStructure: Options['componentStructure'];
  isExternal: boolean;
  packageName: string;
  packageRoot: string;
  packageType: PackageType;
}): AllEntities {
  const source = isExternal
    ? SOURCE_FOR_EXTERNAL_PACKAGES[packageType]
    : SOURCE_FOR_INTERNAL_PACKAGES[packageType];

  const entities: AllEntities = {
    components: new Map(),
    helpers: new Map(),
    modifiers: new Map(),
  };

  if (source === undefined) {
    return entities;
  }

  const entitiesExported = analyzeBarrelFile({ packageRoot, packageType });

  ENTITY_TYPES.forEach((entityType) => {
    const entityFolder = ENTITY_FOLDERS[entityType];

    const filePaths = findFiles(
      `${source}/${entityFolder}/**/*.{gjs,gts,hbs,js,ts}`,
      {
        ignoreList: ['**/*.d.ts'],
        projectRoot: packageRoot,
      },
    );

    filePaths.forEach((filePath) => {
      const { dir, ext, name } = parseFilePath(filePath);

      const isTypeScript = ext === '.gts' || ext === '.ts';

      let entityName = relative(join(source, entityFolder), join(dir, name));

      if (entityType === 'components') {
        if (componentStructure === 'nested') {
          entityName = entityName.replace(/\/index$/, '');
        }

        // A component may consist of 2 files
        if (entities[entityType].has(entityName)) {
          const entityData = entities[entityType].get(entityName)!;

          entities[entityType].set(entityName, {
            ...entityData,
            isTypeScript: entityData.isTypeScript || isTypeScript,
          });

          return;
        }
      }

      // Prefer importing from the barrel file
      if (entitiesExported && entitiesExported[entityType].has(entityName)) {
        entities[entityType].set(entityName, {
          filePath,
          filePathAlias: '.',
          isDefaultExport: false,
          isTypeScript,
          packageName,
        });

        return;
      }

      entities[entityType].set(entityName, {
        filePath,
        filePathAlias: relative(source, join(dir, name)),
        isDefaultExport: true,
        isTypeScript,
        packageName,
      });
    });
  });

  return entities;
}
