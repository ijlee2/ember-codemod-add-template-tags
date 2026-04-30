import { EOL } from 'node:os';

import { AST } from '@codemod-utils/ast-javascript';

import { analyzeComponent } from '../find-packages-with-hbs/index.js';

type Data = {
  baseComponentName: string | undefined;
  componentName: string | undefined;
  isTypeScript: boolean;
};

function insertToGlimmerComponent(file: string, data: Data): string {
  const traverse = AST.traverse(true);

  const ast = traverse(file, {
    visitClassDeclaration(path) {
      const className = path.node.id?.name as string | undefined;

      if (className !== data.componentName) {
        return false;
      }

      // @ts-expect-error: Incorrect type
      path.node.body.body.push(`${EOL}<template></template>`);

      return false;
    },
  });

  return AST.print(ast);
}

function insertToTemplateOnlyComponent(file: string, data: Data): string {
  const traverse = AST.traverse(true);
  let template = '<template></template>';

  if (data.isTypeScript) {
    file = [
      `import type { TOC } from '@ember/component/template-only';`,
      file,
    ].join(EOL);

    traverse(file, {
      visitVariableDeclaration(path) {
        if (path.node.declarations.length !== 1) {
          return;
        }

        const declaration = path.node.declarations[0]!;

        if (declaration.type !== 'VariableDeclarator') {
          return false;
        }

        if (
          declaration.id.type !== 'Identifier' ||
          declaration.id.name !== data.componentName
        ) {
          return false;
        }

        if (declaration.init?.type !== 'CallExpression') {
          return false;
        }

        // @ts-expect-error: Incorrect type
        const { typeParameters } = declaration.init;

        if (
          typeParameters === undefined ||
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          typeParameters.type !== 'TSTypeParameterInstantiation' ||
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          typeParameters.params[0].type !== 'TSTypeReference' ||
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          typeParameters.params[0].typeName.type !== 'Identifier'
        ) {
          return false;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const signatureName = typeParameters.params[0].typeName.name as string;

        template += ` satisfies TOC<${signatureName}>`;

        return false;
      },
    });
  }

  const ast = traverse(file, {
    visitCallExpression(path) {
      // @ts-expect-error: Incorrect type
      if (path.node.callee.name !== data.baseComponentName) {
        return false;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      switch (path.parent.node.type) {
        case 'AssignmentExpression': {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          path.parent.node.right = template;
          break;
        }

        case 'ExportDefaultDeclaration': {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (path.parent.node.id === undefined) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            path.parent.node.declaration = template;
          }
          break;
        }

        case 'VariableDeclarator': {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (path.parent.node.id.name === data.componentName) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            path.parent.node.init = template;
          }
          break;
        }
      }

      return false;
    },
  });

  return AST.print(ast);
}

export function insertTemplateTag(
  file: string,
  data: Pick<Data, 'isTypeScript'>,
): string | undefined {
  const { baseComponentName, componentName, componentType } =
    analyzeComponent(file);

  switch (componentType) {
    case 'glimmer':
    case 'inherited': {
      return insertToGlimmerComponent(file, {
        baseComponentName,
        componentName,
        isTypeScript: data.isTypeScript,
      });
    }

    case 'template-only': {
      return insertToTemplateOnlyComponent(file, {
        baseComponentName,
        componentName,
        isTypeScript: data.isTypeScript,
      });
    }

    default: {
      return;
    }
  }
}
