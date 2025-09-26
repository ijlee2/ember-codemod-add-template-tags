/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AST } from '@codemod-utils/ast-javascript';

type Data = {
  importKind: 'type' | 'value';
  importName: string;
  importPath: string;
  isDefaultImport: boolean;
  isTypeScript: boolean;
};

type SpecifierDefaultJavaScript = {
  importKind: undefined;
  imported: undefined;
  local: {
    name: string;
    type: string;
  };
  type: 'ImportDefaultSpecifier';
};

type SpecifierDefaultTypeScript = {
  importKind: undefined;
  imported: undefined;
  local: {
    name: string;
    type: string;
  };
  type: 'ImportDefaultSpecifier';
};

type SpecifierDefault = SpecifierDefaultJavaScript | SpecifierDefaultTypeScript;

type SpecifierNamedJavaScript = {
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

type SpecifierNamedTypeScript = {
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

type SpecifierNamed = SpecifierNamedJavaScript | SpecifierNamedTypeScript;

type Specifier = SpecifierDefault | SpecifierNamed;

function keepDefaultImport(specifier: SpecifierDefault): boolean {
  const { local, type } = specifier;

  if (type !== 'ImportDefaultSpecifier' || local.type !== 'Identifier') {
    return true;
  }

  return false;
}

function keepNamedImport(specifier: SpecifierNamed, data: Data): boolean {
  const { imported, importKind, type } = specifier;

  if (data.isTypeScript && importKind !== data.importKind) {
    return true;
  }

  if (type !== 'ImportSpecifier' || imported.type !== 'Identifier') {
    return true;
  }

  return imported.name !== data.importName;
}

export function removeImport(file: string, data: Data) {
  const traverse = AST.traverse(data.isTypeScript);

  const ast = traverse(file, {
    visitImportDeclaration(node) {
      if (
        data.isTypeScript &&
        data.importKind === 'value' &&
        node.value.importKind === 'type'
      ) {
        return false;
      }

      const sourceType = node.value.source?.type as string | undefined;

      if (sourceType !== 'Literal' && sourceType !== 'StringLiteral') {
        return false;
      }

      const importPath = node.value.source.value as string;

      if (importPath !== data.importPath) {
        return false;
      }

      node.value.specifiers = (node.value.specifiers as Specifier[]).filter(
        (specifier) => {
          if (data.isDefaultImport) {
            return keepDefaultImport(specifier as SpecifierDefault);
          }

          let importKind = specifier.importKind;

          if (
            data.isTypeScript &&
            (node.value.importKind === 'type' ||
              specifier.importKind === 'type')
          ) {
            importKind = 'type';
          }

          const specifierModified: SpecifierNamed = {
            ...(specifier as SpecifierNamed),
            importKind,
          };

          return keepNamedImport(specifierModified, data);
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
