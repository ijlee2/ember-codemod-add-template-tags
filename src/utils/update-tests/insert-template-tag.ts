/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
import { AST as ASTJavaScript } from '@codemod-utils/ast-javascript';

function indentToLeft(code: string, indent: number): string {
  return code
    .split('\n')
    .map((line) => {
      const numSpaces = line.length - line.trimStart().length;

      if (numSpaces > indent) {
        return line.substring(indent);
      }

      return line;
    })
    .join('\n');
}

type Data = {
  isTypeScript: boolean;
};

export function insertTemplateTag(file: string, data: Data): string {
  const traverse = ASTJavaScript.traverse(data.isTypeScript);

  const ast = traverse(file, {
    visitCallExpression(node) {
      if (
        node.value.callee.type !== 'Identifier' ||
        node.value.callee.name !== 'render'
      ) {
        this.traverse(node);
        return false;
      }

      if (
        node.value.arguments.length !== 1 &&
        node.value.arguments.length !== 2
      ) {
        return false;
      }

      const nodeValue = node.value.arguments[0]!;

      if (
        nodeValue?.type !== 'TaggedTemplateExpression' ||
        nodeValue.tag.type !== 'Identifier' ||
        nodeValue.tag.name !== 'hbs'
      ) {
        return false;
      }

      if (
        nodeValue.quasi.type !== 'TemplateLiteral' ||
        nodeValue.quasi.quasis[0].type !== 'TemplateElement'
      ) {
        return false;
      }

      const template = nodeValue.quasi.quasis[0].value.raw as string;
      const indent = node.value.loc.indent as number;

      node.value.arguments[0] = `<template>\n  ${indentToLeft(template.trim(), indent)}\n</template>`;

      return false;
    },
  });

  return ASTJavaScript.print(ast);
}
