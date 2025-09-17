/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AST } from '@codemod-utils/ast-javascript';

type Data = {
  isTypeScript: boolean;
};

type Specifier =
  | {
      importKind: undefined;
      imported: undefined;
      type: 'ImportDefaultSpecifier';
    }
  | {
      importKind: 'type' | 'value';
      imported: {
        [key: string]: unknown;
        name: string;
        type: string;
      };
      type: 'ImportSpecifier';
    };

export function removeHbsImport(file: string, data: Data): string {
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

      if (importPath !== 'ember-cli-htmlbars') {
        return false;
      }

      node.value.specifiers = (node.value.specifiers as Specifier[]).filter(
        (specifier) => {
          const { imported, importKind, type } = specifier;

          if (data.isTypeScript && importKind !== 'value') {
            return true;
          }

          const hasHbs =
            type === 'ImportSpecifier' &&
            imported.type === 'Identifier' &&
            imported.name === 'hbs';

          return !hasHbs;
        },
      );

      if (node.value.specifiers.length === 0) {
        return null;
      }

      return false;
    },
  });

  return AST.print(ast);
}
