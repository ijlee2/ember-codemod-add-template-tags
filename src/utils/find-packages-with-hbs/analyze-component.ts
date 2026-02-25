/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AST } from '@codemod-utils/ast-javascript';

const componentMap = {
  '@ember/component': 'classic',
  '@ember/component/template-only': 'template-only',
  '@glimmer/component': 'glimmer',
} as const;

type ComponentImportPath = keyof typeof componentMap;

type ComponentType = (typeof componentMap)[ComponentImportPath];

type Component = {
  baseComponentName: string | undefined;
  componentName: string | undefined;
  componentType: ComponentType | undefined;
};

type ImportSpecifier = {
  [key: string]: unknown;
  importKind: 'type' | 'value';
  local: {
    name: string;
    type: 'Identifier';
  };
  type: 'ImportDefaultSpecifier' | 'ImportSpecifier';
};

export function analyzeComponent(file: string): Component {
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
          componentName = node.value.declaration.id?.name as string | undefined;
          break;
        }

        case 'Identifier': {
          componentName = node.value.declaration.name as string;
          break;
        }
      }

      return false;
    },

    visitImportDeclaration(node) {
      const importPath = node.value.source.value as string;
      const importSpecifiers = (node.value.specifiers ??
        []) as ImportSpecifier[];

      switch (importPath) {
        case '@ember/component':
        case '@ember/component/template-only':
        case '@glimmer/component': {
          const importSpecifierForComponent = importSpecifiers.find(
            (specifier) => {
              return specifier.type === 'ImportDefaultSpecifier';
            },
          );

          if (!importSpecifierForComponent) {
            return false;
          }

          baseComponentName = importSpecifierForComponent.local.name;
          componentType = componentMap[importPath];

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
