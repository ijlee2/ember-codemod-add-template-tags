/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

import { AST } from '@codemod-utils/ast-javascript';
import { findFiles, parseFilePath } from '@codemod-utils/files';

import type {
  EntityName,
  EntityType,
  PackageType,
} from '../../../types/index.js';
import {
  ENTITY_SOURCE_FOLDERS,
  SOURCE_FOR_EXTERNAL_PACKAGES,
} from '../../ember.js';

type Data = {
  isTypeScript: boolean;
};

type EntitiesExported = Record<EntityType, Set<EntityName>>;

function analyze(file: string, data: Data): EntitiesExported | undefined {
  const traverse = AST.traverse(data.isTypeScript);

  const entitiesExported: EntitiesExported = {
    components: new Set(),
    helpers: new Set(),
    modifiers: new Set(),
  };

  traverse(file, {
    visitExportNamedDeclaration(node) {
      if (data.isTypeScript && node.value.exportKind !== 'value') {
        return false;
      }

      const sourceType = node.value.source?.type as string | undefined;

      if (sourceType !== 'Literal' && sourceType !== 'StringLiteral') {
        return false;
      }

      const exportPath = node.value.source.value as string;

      for (const [entityType, entityFolder] of Object.entries(
        ENTITY_SOURCE_FOLDERS,
      )) {
        if (!exportPath.startsWith(`./${entityFolder}/`)) {
          continue;
        }

        const { dir, name } = parseFilePath(exportPath);
        const entityName = relative(`./${entityFolder}/`, join(dir, name));

        entitiesExported[entityType as EntityType].add(entityName);
      }

      return false;
    },
  });

  if (
    entitiesExported.components.size === 0 &&
    entitiesExported.helpers.size === 0 &&
    entitiesExported.modifiers.size === 0
  ) {
    return;
  }

  return entitiesExported;
}

export function analyzeBarrelFile({
  packageRoot,
  packageType,
}: {
  packageRoot: string;
  packageType: PackageType;
}): EntitiesExported | undefined {
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

  return analyze(barrelFile, {
    isTypeScript: barrelFilePath.endsWith('.ts'),
  });
}
