import { join, relative, sep } from 'node:path';

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

      let entityName = relative(
        join(source, entityFolder),
        join(dir, name),
      ).replaceAll(sep, '/');

      if (entityType === 'components') {
        if (componentStructure === 'nested') {
          entityName = entityName.replace(/\/index$/, '');
        }

        // If a component consists of 2 files (*.hbs and *.{js,ts}),
        // then use the data extracted from *.{js,ts} for imports.
        if (entities[entityType].has(entityName)) {
          const entityData = entities[entityType].get(entityName)!;

          const newData = {
            filePath: ext === '.hbs' ? entityData.filePath : filePath,
            isTypeScript: entityData.isTypeScript || isTypeScript,
          };

          entities[entityType].set(entityName, {
            ...entityData,
            ...newData,
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
