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

export function removeImport(file: string, data: Data): string {
  const traverse = AST.traverse(data.isTypeScript);

  const ast = traverse(file, {
    visitImportDeclaration(path) {
      if (data.importKind === 'value' && path.node.importKind === 'type') {
        return false;
      }

      const sourceType = path.node.source?.type as string | undefined;

      if (sourceType !== 'Literal' && sourceType !== 'StringLiteral') {
        return false;
      }

      const importPath = path.node.source.value as string;

      if (importPath !== data.importPath) {
        return false;
      }

      path.node.specifiers = (path.node.specifiers ?? []).filter(
        (specifier) => {
          if (data.isDefaultImport) {
            return keepDefaultImport(specifier as SpecifierDefault);
          }

          // @ts-expect-error: Incorrect type
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          let importKind = specifier.importKind;

          if (
            path.node.importKind === 'type' ||
            // @ts-expect-error: Incorrect type
            specifier.importKind === 'type'
          ) {
            importKind = 'type';
          }

          const specifierModified: SpecifierNamed = {
            ...(specifier as SpecifierNamed),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            importKind,
          };

          return keepNamedImport(specifierModified, data);
        },
      );

      if (path.node.specifiers.length === 0) {
        return null;
      }

      return false;
    },
  });

  return AST.print(ast);
}
