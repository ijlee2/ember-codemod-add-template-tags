/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AST } from '@codemod-utils/ast-javascript';

const componentMap = {
  '@ember/component': 'classic',
  '@ember/component/template-only': 'template-only',
  '@ember/template-compiler': 'template-tag',
  '@glimmer/component': 'glimmer',
} as const;

type ComponentImportPath = keyof typeof componentMap;

type ComponentType = (typeof componentMap)[ComponentImportPath];

export type Data = {
  baseComponentName: string | undefined;
  componentName: string | undefined;
  componentType: ComponentType | undefined;
};

export function analyzeComponent(file: string): Data {
  const traverse = AST.traverse(true);

  let baseComponentName: string | undefined;
  let componentName: string | undefined;
  let componentType: ComponentType | undefined;

  traverse(file, {
    visitExportDefaultDeclaration(node) {
      switch (node.value.declaration.type) {
        case 'AssignmentExpression': {
          componentName = node.value.declaration.left.name as string;
          break;
        }

        case 'ClassDeclaration': {
          componentName = node.value.declaration?.id.name as string | undefined;
          break;
        }

        case 'Identifier': {
          componentName = node.value.declaration.name as string;
          break;
        }
      }

      return false;
    },

    visitImportDeclaration(path) {
      const importPath = path.node.source.value as string;

      switch (importPath) {
        case '@ember/component':
        case '@ember/component/template-only':
        case '@glimmer/component': {
          const defaultImport = path.node.specifiers!.find(({ type }) => {
            return type === 'ImportDefaultSpecifier';
          });

          if (!defaultImport) {
            return false;
          }

          baseComponentName = defaultImport.local!.name as string;
          componentType = componentMap[importPath as ComponentImportPath];

          return false;
        }

        case '@ember/template-compiler': {
          const namedImport = path.node.specifiers!.find(({ type }) => {
            return type === 'ImportSpecifier';
          });

          if (!namedImport) {
            return false;
          }

          baseComponentName = namedImport.local!.name as string;
          componentType = componentMap[importPath as ComponentImportPath];

          return false;
        }
      }

      return false;
    },
  });

  return {
    baseComponentName,
    componentName,
    componentType,
  };
}
