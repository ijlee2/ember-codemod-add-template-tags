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
      if (
        node.value.source.type !== 'StringLiteral' ||
        node.value.source.value !== 'ember-cli-htmlbars'
      ) {
        return false;
      }

      node.value.specifiers = (node.value.specifiers as Specifier[]).filter(
        (specifier) => {
          const { imported, importKind, type } = specifier;

          if (type !== 'ImportSpecifier' || importKind !== 'value') {
            return true;
          }

          if (imported.type !== 'Identifier' || imported.name !== 'hbs') {
            return true;
          }

          return false;
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
