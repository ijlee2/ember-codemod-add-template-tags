import type { PackageType as _PackageType } from '@codemod-utils/package-json';

import type { ENTITY_TYPES } from '../utils/ember.js';

type CodemodOptions = {
  componentStructure: 'flat' | 'nested';
  convert: Set<'components' | 'routes' | 'tests'>;
  projectRoot: string;
};

type Options = {
  componentStructure: 'flat' | 'nested';
  convert: {
    components: boolean;
    routes: boolean;
    tests: boolean;
  };
  projectRoot: string;
};

type AllEntities = Record<EntityType, Entities>;

type Dependencies = Map<
  PackageName,
  {
    entities: AllEntities;
    packageRoot: string;
    packageType: PackageType;
  }
>;

type Entities = Map<EntityName, EntityData>;

type EntityData = {
  filePath: string;
  filePathAlias: string;
  isDefaultExport: boolean;
  isTemplateTag: boolean;
  isTypeScript: boolean;
  packageName: PackageName;
};

type EntityName = string;

type EntityType = (typeof ENTITY_TYPES)[number];

type FilesToConvert = {
  components: string[];
  routes: string[];
  tests: string[];
};

type PackageName = string;

type PackageType = Exclude<_PackageType, 'node'>;

type Packages = Map<
  PackageName,
  {
    filesWithHBS: FilesToConvert;
    filesWithTemplateTag: FilesToConvert;
    hasEmberRouteTemplate: boolean;
    isEmberSourceRecent: boolean;
    packageRoot: string;
    packageType: PackageType;
  }
>;

export type {
  AllEntities,
  CodemodOptions,
  Dependencies,
  Entities,
  EntityData,
  EntityName,
  EntityType,
  FilesToConvert,
  Options,
  PackageName,
  Packages,
  PackageType,
};
