import { AST } from '@codemod-utils/ast-javascript';

import type { PackageType } from '../../types/index.js';

type Data = {
  isTypeScript: boolean;
  packageType: PackageType;
};

export function removeGlintRegistry(file: string, data: Data): string {
  const { isTypeScript, packageType } = data;

  if (packageType !== 'v1-app' && packageType !== 'v2-app') {
    return file;
  }

  if (!isTypeScript) {
    return file;
  }

  const traverse = AST.traverse(isTypeScript);

  const ast = traverse(file, {
    // ...
  });

  return AST.print(ast);
}
