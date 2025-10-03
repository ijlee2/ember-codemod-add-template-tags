/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
import { AST as ASTJavaScript } from '@codemod-utils/ast-javascript';
import { AST as ASTTemplate } from '@codemod-utils/ast-template';

const NEW_THIS = 'self';

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

function renameThis(template: string): {
  code: string;
  renamedThis: boolean;
} {
  const traverse = ASTTemplate.traverse();
  let renamedThis = false;

  const ast = traverse(template, {
    PathExpression(node) {
      if (node.head.type !== 'ThisHead') {
        return;
      }

      const newName = [NEW_THIS, ...node.tail].join('.');
      renamedThis = true;

      return ASTTemplate.builders.path(newName);
    },
  });

  return {
    code: ASTTemplate.print(ast),
    renamedThis,
  };
}

function updateBody(body: unknown[], index: number): unknown[] {
  const newNode = ASTJavaScript.builders.variableDeclaration('const', [
    ASTJavaScript.builders.variableDeclarator(
      ASTJavaScript.builders.identifier(NEW_THIS),
      ASTJavaScript.builders.thisExpression(),
    ),
  ]);

  return [...body.slice(0, index), newNode, '\n', ...body.slice(index)];
}

type Data = {
  isTypeScript: boolean;
  useLexicalThis: boolean;
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

      let template = nodeValue.quasi.quasis[0].value.raw as string;

      if (!data.useLexicalThis) {
        const { code, renamedThis } = renameThis(template);

        if (renamedThis) {
          template = code;

          switch (node.parent.parent.parent.value.type) {
            case 'BlockStatement': {
              const body = node.parent.parent.parent.value.body as unknown[];

              const index = body.findIndex((element) => {
                return element === node.parent.parent.value;
              });

              node.parent.parent.parent.value.body = updateBody(body, index);

              break;
            }

            case 'FunctionExpression': {
              const body = node.parent.parent.parent.value.body
                .body as unknown[];

              const index = body.findIndex((element) => {
                return element === node.parent.value;
              });

              node.parent.parent.parent.value.body.body = updateBody(
                body,
                index,
              );

              break;
            }
          }
        }
      }

      const indent = node.value.loc.indent as number;

      node.value.arguments[0] = `<template>\n  ${indentToLeft(template.trim(), indent)}\n</template>`;
      node.value.typeParameters = null;

      return false;
    },
  });

  return ASTJavaScript.print(ast);
}
