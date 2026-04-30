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
    visitClassDeclaration(node) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const className = node.value.id?.name as string | undefined;

      if (className !== data.componentName) {
        return false;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      node.value.body.body.push(`${EOL}<template></template>`);

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
      visitVariableDeclaration(node) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (node.value.declarations.length !== 1) {
          return;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const declaration = node.value.declarations[0];

        if (
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          declaration.id.type !== 'Identifier' ||
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          declaration.id.name !== data.componentName
        ) {
          return false;
        }

        if (
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          declaration.init.typeParameters === undefined ||
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          declaration.init.typeParameters.type !==
            'TSTypeParameterInstantiation' ||
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          declaration.init.typeParameters.params[0].type !==
            'TSTypeReference' ||
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          declaration.init.typeParameters.params[0].typeName.type !==
            'Identifier'
        ) {
          return false;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const signatureName = declaration.init.typeParameters.params[0].typeName
          .name as string;

        template += ` satisfies TOC<${signatureName}>`;

        return false;
      },
    });
  }

  const ast = traverse(file, {
    visitCallExpression(node) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (node.value.callee.name !== data.baseComponentName) {
        return false;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      switch (node.parentPath.value.type) {
        case 'AssignmentExpression': {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          node.parentPath.value.right = template;
          break;
        }

        case 'ExportDefaultDeclaration': {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (node.parentPath.value.id === undefined) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            node.parentPath.value.declaration = template;
          }
          break;
        }

        case 'VariableDeclarator': {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (node.parentPath.value.id.name === data.componentName) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            node.parentPath.value.init = template;
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
