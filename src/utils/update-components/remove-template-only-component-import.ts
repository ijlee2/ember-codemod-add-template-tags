/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AST } from '@codemod-utils/ast-javascript';

type Data = {
  isTypeScript: boolean;
};

type SpecifierForJavaScript =
  | {
      importKind: undefined;
      imported: undefined;
      local: {
        name: string;
        type: string;
      };
      type: 'ImportDefaultSpecifier';
    }
  | {
      importKind: undefined;
      imported: {
        name: string;
        type: string;
      };
      local: {
        name: string;
        type: string;
      };
      type: 'ImportSpecifier';
    };

type SpecifierForTypeScript =
  | {
      importKind: undefined;
      imported: undefined;
      local: {
        name: string;
        type: string;
      };
      type: 'ImportDefaultSpecifier';
    }
  | {
      importKind: 'type' | 'value';
      imported: {
        name: string;
        type: string;
      };
      local: {
        name: string;
        type: string;
      };
      type: 'ImportSpecifier';
    };

type Specifier = SpecifierForJavaScript | SpecifierForTypeScript;

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

      node.value.specifiers = (node.value.specifiers as Specifier[]).filter(
        (specifier) => {
          const { local, type } = specifier;

          const hasTemplateOnlyComponent =
            type === 'ImportDefaultSpecifier' && local.type === 'Identifier';

          return !hasTemplateOnlyComponent;
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
