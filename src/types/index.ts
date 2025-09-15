import type { PackageType } from '@codemod-utils/package-json';

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
  isDefaultExport: boolean;
  isTypeScript: boolean;
  packageName: PackageName;
};

type EntityName = string;

type EntityType = 'components' | 'helpers' | 'modifiers' | 'services';

type FilesToConvert = {
  components: string[];
  routes: string[];
  tests: string[];
};

type PackageName = string;

type Packages = Map<
  PackageName,
  {
    filesWithHBS: FilesToConvert;
    filesWithTemplateTag: FilesToConvert;
    hasEmberRouteTemplate: boolean;
    isEmberSourceRecent: boolean;
    packageRoot: string;
    packageType: Exclude<PackageType, 'node'>;
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
