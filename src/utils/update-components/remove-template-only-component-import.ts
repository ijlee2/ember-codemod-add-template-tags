/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AST } from '@codemod-utils/ast-javascript';

type Data = {
  isTypeScript: boolean;
};

export function removeTemplateOnlyComponentImport(
  file: string,
  data: Data,
): string {
  const traverse = AST.traverse(data.isTypeScript);

  const ast = traverse(file, {
    visitImportDeclaration(node) {
      if (data.isTypeScript && node.value.importKind !== 'value') {
        return false;
      }

      const sourceType = node.value.source?.type as string | undefined;

      if (sourceType !== 'Literal' && sourceType !== 'StringLiteral') {
        return false;
      }

      const importPath = node.value.source.value as string;

      if (importPath !== '@ember/component/template-only') {
        return false;
      }

      return false;
    },
  });

  return AST.print(ast);
}
