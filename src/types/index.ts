import type { PackageType } from '@codemod-utils/package-json';

type CodemodOptions = {
  componentStructure: 'flat' | 'nested';
  projectRoot: string;
};

type Options = {
  componentStructure: 'flat' | 'nested';
  projectRoot: string;
};

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
    packageRoot: string;
    packageType: Exclude<PackageType, 'node'>;
  }
>;

export type {
  CodemodOptions,
  FilesToConvert,
  Options,
  PackageName,
  Packages,
  PackageType,
};
