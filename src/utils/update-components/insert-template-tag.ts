/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AST } from '@codemod-utils/ast-javascript';

import { analyzeComponent } from '../find-packages-with-hbs/index.js';

type Data = {
  baseComponentName: string | undefined;
  componentName: string | undefined;
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

  const ast = traverse(file, {
    visitCallExpression(node) {
      if (node.value.callee.name !== data.baseComponentName) {
        return false;
      }

      switch (node.parentPath.value.type) {
        case 'AssignmentExpression': {
          node.parentPath.value.right = '<template></template>';
          break;
        }

        case 'ExportDefaultDeclaration': {
          if (node.parentPath.value.id === undefined) {
            node.parentPath.value.declaration = '<template></template>';
          }
          break;
        }

        case 'VariableDeclarator': {
          if (node.parentPath.value.id.name === data.componentName) {
            node.parentPath.value.init = '<template></template>';
          }
          break;
        }
      }

      return false;
    },
  });

  return AST.print(ast);
}

export function insertTemplateTag(file: string): string {
  const data = analyzeComponent(file);

  switch (data.componentType) {
    case 'glimmer': {
      return insertToGlimmerComponent(file, data);
    }

    case 'template-only': {
      return insertToTemplateOnlyComponent(file, data);
    }

    default: {
      return file;
    }
  }
}
