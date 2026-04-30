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
    visitCallExpression(path) {
      if (
        path.node.callee.type !== 'Identifier' ||
        path.node.callee.name !== 'render'
      ) {
        this.traverse(path);
        return false;
      }

      if (
        path.node.arguments.length !== 1 &&
        path.node.arguments.length !== 2
      ) {
        return false;
      }

      const nodeValue = path.node.arguments[0]!;

      if (
        nodeValue?.type !== 'TaggedTemplateExpression' ||
        nodeValue.tag.type !== 'Identifier' ||
        nodeValue.tag.name !== 'hbs'
      ) {
        return false;
      }

      if (
        nodeValue.quasi.type !== 'TemplateLiteral' ||
        nodeValue.quasi.quasis[0]?.type !== 'TemplateElement'
      ) {
        return false;
      }

      let template = nodeValue.quasi.quasis[0].value.raw;

      if (!data.useLexicalThis) {
        const { code, renamedThis } = renameThis(template);

        if (renamedThis) {
          template = code;

          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          const testFunctionPath = path.parent.parent.parent;

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          switch (testFunctionPath.value.type) {
            case 'BlockStatement': {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              const body = testFunctionPath.value.body as unknown[];

              const index = body.findIndex((element) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                return element === path.parent.parent.value;
              });

              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              testFunctionPath.value.body = updateBody(body, index);

              break;
            }

            case 'FunctionExpression': {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              const body = testFunctionPath.value.body.body as unknown[];

              const index = body.findIndex((element) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                return element === path.parent.value;
              });

              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              testFunctionPath.value.body.body = updateBody(body, index);

              break;
            }
          }
        }
      }

      // @ts-expect-error: Incorrect type
      const indent = path.node.loc!.indent as number;

      // @ts-expect-error: Incorrect type
      path.node.arguments[0] = [
        `<template>`,
        `  ${indentToLeft(template.trim(), indent)}`,
        `</template>`,
      ].join(EOL);

      // @ts-expect-error: Incorrect type
      path.node.typeParameters = null;

      return false;
    },
  });

  return ASTJavaScript.print(ast);
}
