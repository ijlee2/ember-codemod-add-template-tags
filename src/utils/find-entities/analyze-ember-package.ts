import { join, relative } from 'node:path';

import { findFiles, parseFilePath } from '@codemod-utils/files';

import type { AllEntities, Options, PackageType } from '../../types/index.js';
import {
  ENTITY_SOURCE_FOLDERS,
  ENTITY_TYPES,
  SOURCE_FOR_EXTERNAL_PACKAGES,
  SOURCE_FOR_INTERNAL_PACKAGES,
} from '../ember.js';

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

  ENTITY_TYPES.forEach((entityType) => {
    const entityFolder = ENTITY_SOURCE_FOLDERS[entityType];

    const filePaths = findFiles(
      `${source}/${entityFolder}/**/*.{gjs,gts,hbs,js,ts}`,
      {
        ignoreList: ['**/*.d.ts'],
        projectRoot: packageRoot,
      },
    );

    filePaths.forEach((filePath) => {
      const { dir, ext, name } = parseFilePath(filePath);

      const filePathWithoutExtension = join(dir, name);
      let entityName = relative(
        join(source, entityType),
        filePathWithoutExtension,
      );

      if (entityType === 'components' && componentStructure === 'nested') {
        entityName = entityName.replace(/\/index$/, '');
      }

      const data = entities[entityType].get(entityName);

      if (data && packageName !== data.packageName) {
        console.warn(
          `The entity \`${entityName}\` is defined in multiple packages (e.g. ${packageName}, ${data.packageName}).`,
        );
      }

      entities[entityType].set(entityName, {
        filePath: relative(source, filePathWithoutExtension),
        isDefaultExport: true,
        isTypeScript: ext === '.gts' || ext === '.ts',
        packageName,
      });
    });
  });

  return entities;
}
