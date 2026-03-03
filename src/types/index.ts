import type { PackageType as _PackageType } from '@codemod-utils/package-json';

import type { ENTITY_TYPES } from '../utils/ember.js';

type CodemodOptions = {
  componentStructure: 'flat' | 'nested';
  convert: Set<'components' | 'routes' | 'tests'>;
  entity: string | undefined;
  projectRoot: string;
};

type Options = {
  componentStructure: 'flat' | 'nested';
  convert: {
    components: boolean;
    routes: boolean;
    tests: boolean;
  };
  entity: string | undefined;
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

type PackageData = {
  filesWithHbs: FilesToConvert;
  filesWithTemplateTag: FilesToConvert;
  hasEmberRouteTemplate: boolean;
  packageRoot: string;
  packageType: PackageType;
};

type PackageName = string;

type PackageType = Exclude<_PackageType, 'node'>;

type Packages = Map<PackageName, PackageData>;

export type {
  AllEntities,
  CodemodOptions,
  Dependencies,
  EntityData,
  EntityName,
  EntityType,
  FilesToConvert,
  Options,
  PackageData,
  Packages,
  PackageType,
};
