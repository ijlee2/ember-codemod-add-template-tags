import { AST } from '@codemod-utils/ast-javascript';

const componentMap = {
  '@ember/component': 'classic',
  '@ember/component/template-only': 'template-only',
  '@glimmer/component': 'glimmer',
} as const;

type ComponentType = 'classic' | 'glimmer' | 'inherited' | 'template-only';

type Component = {
  baseComponentName: string | undefined;
  componentName: string | undefined;
  componentType: ComponentType | undefined;
};

type ImportSpecifier =
  | {
      [key: string]: unknown;
      local: {
        name: string;
        type: 'Identifier';
      };
      type: 'ImportDefaultSpecifier';
    }
  | {
      [key: string]: unknown;
      importKind: 'type' | 'value';
      local: {
        name: string;
        type: 'Identifier';
      };
      type: 'ImportSpecifier';
    };

export function analyzeComponent(file: string): Component {
  const traverse = AST.traverse(true);

  let baseComponentName: string | undefined;
  let componentName: string | undefined;
  let componentType: ComponentType | undefined;
  let hasDefaultExport = false;

  traverse(file, {
    visitExportDefaultDeclaration(path) {
      hasDefaultExport = true;

      switch (path.node.declaration.type) {
        case 'AssignmentExpression': {
          // @ts-expect-error: Incorrect type
          componentName = path.node.declaration.left.name as string;
          break;
        }

        case 'ClassDeclaration': {
          componentName = path.node.declaration.id?.name as string | undefined;
          break;
        }

        case 'Identifier': {
          componentName = path.node.declaration.name;
          break;
        }
      }

      return false;
    },
  });

  if (!hasDefaultExport) {
    return {
      baseComponentName,
      componentName,
      componentType,
    };
  }

  traverse(file, {
    visitClassDeclaration(path) {
      if ((path.node.id?.name as string | undefined) !== componentName) {
        return false;
      }

      if (path.node.superClass?.type !== 'Identifier') {
        return false;
      }

      baseComponentName = path.node.superClass.name;

      return false;
    },
  });

  traverse(file, {
    visitImportDeclaration(path) {
      if (path.node.importKind !== 'value') {
        return false;
      }

      const importPath = path.node.source.value as string;

      const importSpecifiers = (path.node.specifiers ??
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
            break;
          }

          baseComponentName = importSpecifierForComponent.local.name;
          componentType = componentMap[importPath];

          break;
        }

        default: {
          const importSpecifierForComponent = importSpecifiers.find(
            (specifier) => {
              if (
                specifier.type === 'ImportSpecifier' &&
                specifier.importKind !== 'value'
              ) {
                return false;
              }

              if (specifier.local.type !== 'Identifier') {
                return false;
              }

              return specifier.local.name === baseComponentName;
            },
          );

          if (!importSpecifierForComponent) {
            break;
          }

          componentType = 'inherited';
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
