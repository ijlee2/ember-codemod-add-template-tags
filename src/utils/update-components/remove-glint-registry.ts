/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
    visitTSModuleDeclaration(node) {
      if (
        node.value.id?.type !== 'StringLiteral' ||
        node.value.id.value !== '@glint/environment-ember-loose/registry'
      ) {
        return false;
      }

      return null;
    },
  });

  return AST.print(ast);
}
