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
    visitExportDefaultDeclaration(node) {
      hasDefaultExport = true;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      switch (node.value.declaration.type) {
        case 'AssignmentExpression': {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          componentName = node.value.declaration.left.name as string;
          break;
        }

        case 'ClassDeclaration': {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          componentName = node.value.declaration.id?.name as string | undefined;
          break;
        }

        case 'Identifier': {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          componentName = node.value.declaration.name as string;
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
    visitClassDeclaration(node) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if ((node.value.id?.name as string | undefined) !== componentName) {
        return false;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (node.value.superClass?.type !== 'Identifier') {
        return false;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      baseComponentName = node.value.superClass.name as string;

      return false;
    },
  });

  traverse(file, {
    visitImportDeclaration(node) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (node.value.importKind !== 'value') {
        return false;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const importPath = node.value.source.value as string;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
