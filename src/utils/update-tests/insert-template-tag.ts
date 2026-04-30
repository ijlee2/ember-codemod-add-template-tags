import { EOL } from 'node:os';

import { AST as ASTJavaScript } from '@codemod-utils/ast-javascript';
import { AST as ASTTemplate } from '@codemod-utils/ast-template';

const NEW_THIS = 'self';

function indentToLeft(code: string, indent: number): string {
  return code
    .split(/\r?\n/)
    .map((line) => {
      const numSpaces = line.length - line.trimStart().length;

      if (numSpaces > indent) {
        return line.substring(indent);
      }

      return line;
    })
    .join(EOL);
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

  return [...body.slice(0, index), newNode, EOL, ...body.slice(index)];
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        node.value.callee.type !== 'Identifier' ||
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        node.value.callee.name !== 'render'
      ) {
        this.traverse(node);
        return false;
      }

      if (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        node.value.arguments.length !== 1 &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        node.value.arguments.length !== 2
      ) {
        return false;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const nodeValue = node.value.arguments[0]!;

      if (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        nodeValue?.type !== 'TaggedTemplateExpression' ||
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        nodeValue.tag.type !== 'Identifier' ||
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        nodeValue.tag.name !== 'hbs'
      ) {
        return false;
      }

      if (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        nodeValue.quasi.type !== 'TemplateLiteral' ||
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        nodeValue.quasi.quasis[0].type !== 'TemplateElement'
      ) {
        return false;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      let template = nodeValue.quasi.quasis[0].value.raw as string;

      if (!data.useLexicalThis) {
        const { code, renamedThis } = renameThis(template);

        if (renamedThis) {
          template = code;

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          switch (node.parent.parent.parent.value.type) {
            case 'BlockStatement': {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              const body = node.parent.parent.parent.value.body as unknown[];

              const index = body.findIndex((element) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                return element === node.parent.parent.value;
              });

              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              node.parent.parent.parent.value.body = updateBody(body, index);

              break;
            }

            case 'FunctionExpression': {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              const body = node.parent.parent.parent.value.body
                .body as unknown[];

              const index = body.findIndex((element) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                return element === node.parent.value;
              });

              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              node.parent.parent.parent.value.body.body = updateBody(
                body,
                index,
              );

              break;
            }
          }
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const indent = node.value.loc.indent as number;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      node.value.arguments[0] = [
        `<template>`,
        `  ${indentToLeft(template.trim(), indent)}`,
        `</template>`,
      ].join(EOL);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      node.value.typeParameters = null;

      return false;
    },
  });

  return ASTJavaScript.print(ast);
}
