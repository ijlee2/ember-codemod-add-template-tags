/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
      const className = node.value.id.name as string;

      if (className !== data.componentName) {
        return false;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      node.value.body.body.push('\n<template></template>');

      return false;
    },
  });

  return AST.print(ast);
}

function insertToTemplateOnlyComponent(file: string, data: Data): string {
  const traverse = AST.traverse(true);
  let template = '<template></template>';

  if (data.isTypeScript) {
    file = `import type { TOC } from '@ember/component/template-only';\n${file}`;

    traverse(file, {
      visitVariableDeclaration(node) {
        if (node.value.declarations.length !== 1) {
          return;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const declaration = node.value.declarations[0];

        if (
          declaration.id.type !== 'Identifier' ||
          declaration.id.name !== data.componentName
        ) {
          return false;
        }

        if (
          declaration.init.typeParameters === undefined ||
          declaration.init.typeParameters.type !==
            'TSTypeParameterInstantiation' ||
          declaration.init.typeParameters.params[0].type !==
            'TSTypeReference' ||
          declaration.init.typeParameters.params[0].typeName.type !==
            'Identifier'
        ) {
          return false;
        }

        const signatureName = declaration.init.typeParameters.params[0].typeName
          .name as string;

        template += ` satisfies TOC<${signatureName}>`;

        return false;
      },
    });
  }

  const ast = traverse(file, {
    visitCallExpression(node) {
      if (node.value.callee.name !== data.baseComponentName) {
        return false;
      }

      switch (node.parentPath.value.type) {
        case 'AssignmentExpression': {
          node.parentPath.value.right = template;
          break;
        }

        case 'ExportDefaultDeclaration': {
          if (node.parentPath.value.id === undefined) {
            node.parentPath.value.declaration = template;
          }
          break;
        }

        case 'VariableDeclarator': {
          if (node.parentPath.value.id.name === data.componentName) {
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
): string {
  const { baseComponentName, componentName, componentType } =
    analyzeComponent(file);

  switch (componentType) {
    case 'glimmer': {
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
      return file;
    }
  }
}
